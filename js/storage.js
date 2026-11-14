/**
 * storage.js — Review data storage layer (Hybrid localStorage + Google Sheets)
 *
 * 🔗 GOOGLE SHEETS CLOUD INTEGRATION:
 *   วาง URL ของ Google Apps Script Web App ที่ได้จากการ Deploy ในบรรทัดด้านล่าง
 *   (ดูวิธีทำอย่างละเอียดในไฟล์ GoogleAppsScript_Code.gs)
 *   เมื่อใส่ URL แล้ว:
 *     - ข้อมูลรีวิวทั้งหมดจะถูกซิงก์จาก Google Sheets แบบ Real-time
 *     - เมื่อเพื่อนคนไหนส่งรีวิว ข้อมูลจะวิ่งเข้า Google Sheets ทันที
 *     - ทุกคนที่เปิดเว็บจะเห็นรีวิวอัปเดตตรงกันจากทุกเครื่อง!
 */

// ⬇️ วาง Web App URL ที่ได้จาก Google Apps Script ที่นี่ (ถ้ายังไม่ใส่ จะทำงานผ่าน localStorage ตามปกติ)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyZ2RdY7ShRLpefBHDDh7tDf4gOa4AIamyhdNGgHj7gDGicC9jtl54ODf80E8eRydV30g/exec";

const STORAGE_KEY = "swu_reviews";
const PENDING_QUEUE_KEY = "swu_pending_reviews";

/**
 * Returns pending reviews waiting to be synced to Google Sheets.
 * @returns {Array<Object>}
 */
function getPendingReviews() {
  try {
    const raw = localStorage.getItem(PENDING_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Adds a review to the retry queue.
 * @param {Object} review
 */
function enqueuePendingReview(review) {
  try {
    const queue = getPendingReviews();
    if (!queue.some(r => r.reviewId === review.reviewId)) {
      queue.push(review);
      localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (err) {
    console.warn("Could not enqueue pending review:", err);
  }
}

/**
 * Removes a review from the retry queue after successful sync.
 * @param {string} reviewId
 */
function dequeuePendingReview(reviewId) {
  try {
    const queue = getPendingReviews().filter(r => r.reviewId !== reviewId);
    localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.warn("Could not dequeue pending review:", err);
  }
}

/**
 * Flushes all pending reviews to Google Sheets (e.g. on page load, reconnect, or retry).
 */
async function flushPendingReviews() {
  if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_URL.startsWith("http")) return;
  const queue = getPendingReviews();
  if (!queue || queue.length === 0) return;

  for (const review of queue) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(review),
      });
      // ถือว่าส่งถึงแล้ว
      dequeuePendingReview(review.reviewId);
    } catch (err) {
      console.warn("Retrying review sync failed, will keep in queue:", review.reviewId, err);
      break; // หยุดลูปไว้ก่อนถ้าเน็ตมีปัญหา
    }
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    flushPendingReviews();
  });
}

/**
 * Normalizes class schedule strings to standard "Hr:min - Hr:min" format.
 * If input contains full Date/GMT string, extracts the time portion.
 * @param {string} s
 * @returns {string}
 */
function cleanScheduleString(s) {
  if (!s || typeof s !== "string") return "";
  const str = s.trim();
  if (!str) return "";

  // ถ้าเป็น Date string เช่น "Thu Nov 12 2026 21:24:14 GMT+0700 (เวลาอินโดจีน)"
  if (str.includes("GMT") || str.includes("อินโดจีน") || str.includes("Indochina") || (str.includes("T") && str.length > 16) || /[A-Za-z]{3}\s+[A-Za-z]{3}\s+\d+/.test(str)) {
    const times = str.match(/\b(\d{1,2}):(\d{2})\b/g);
    if (times && times.length >= 2) return `${times[0]} - ${times[1]}`;
    if (times && times.length === 1) return times[0];
    return str;
  }

  // ปรับ separator ให้เป็น " - " แบบมาตรฐาน Hr:min - Hr:min
  return str.replace(/(\d{1,2}:\d{2})\s*[–—\-]\s*(\d{1,2}:\d{2})/g, "$1 - $2");
}

/**
 * Returns all stored reviews, sorted newest-first.
 * Automatically cleans any legacy or malformed class schedule strings.
 * @returns {Array<Object>}
 */
function getAllReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const reviews = raw ? JSON.parse(raw) : [];
    let hasMalformedSchedule = false;

    reviews.forEach(r => {
      if (r.classSchedule) {
        const cleaned = cleanScheduleString(r.classSchedule);
        if (cleaned !== r.classSchedule) {
          r.classSchedule = cleaned;
          hasMalformedSchedule = true;
        }
      }
    });

    if (hasMalformedSchedule) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    }

    return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch {
    return [];
  }
}

/**
 * Saves a new review locally and syncs to Google Sheets cloud.
 * Assigns a unique reviewId and createdAt timestamp automatically.
 * Supports auto-retry queue in case of network issues or server concurrency.
 * @param {Object} reviewData
 * @returns {Promise<Object>} the saved review
 */
async function saveReview(reviewData) {
  const reviews = getAllReviews();
  const newReview = {
    ...reviewData,
    reviewId: generateId(),
    createdAt: new Date().toISOString(),
  };

  // 1. บันทึกลง localStorage ทันที (Optimistic Update แสดงผลทันใจ)
  reviews.push(newReview);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));

  // 2. ใส่ลงคิวสำรอง Pending Queue เสมอเพื่อป้องกันข้อมูลตกหล่น
  enqueuePendingReview(newReview);

  // 3. ส่งข้อมูลเข้า Google Sheets แบบเบื้องหลังพร้อมระบบ Retry
  if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith("http")) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // จำเป็นสำหรับ Google Apps Script เพื่อเลี่ยง CORS
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(newReview),
      });
      // นำออกจากคิวเมื่อยิง Request สำเร็จ
      dequeuePendingReview(newReview.reviewId);
    } catch (err) {
      console.warn("Direct Google Sheets sync failed, will be retried via queue:", err);
    }
  }

  return newReview;
}

/**
 * Syncs reviews from Google Sheets in the background.
 * If data is retrieved, updates localStorage and invokes the onUpdated callback.
 * Safely merges with local pending reviews to prevent data loss.
 * @param {Function} [onUpdated]
 */
async function syncReviewsFromCloud(onUpdated) {
  if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_URL.startsWith("http")) return;

  // ลองส่งรีวิวที่ค้างอยู่ในคิวก่อนซิงก์
  flushPendingReviews();

  try {
    const resp = await fetch(GOOGLE_SCRIPT_URL);
    if (!resp.ok) return;
    const cloudReviews = await resp.json();

    if (Array.isArray(cloudReviews) && cloudReviews.length > 0) {
      // ทำความสะอาดข้อความเวลาเรียนให้เป็น Hr:min - Hr:min เสมอ
      cloudReviews.forEach(r => {
        if (r.classSchedule) r.classSchedule = cleanScheduleString(r.classSchedule);
      });

      // รวมรีวิวที่ส่งไปแล้วในเครื่องแต่ชีตอาจยังบันทึกไม่เสร็จ เพื่อไม่ให้รีวิวหายชั่วคราว
      const pending = getPendingReviews();
      const cloudIds = new Set(cloudReviews.map(r => r.reviewId));
      const unpersistedLocal = pending.filter(p => !cloudIds.has(p.reviewId));
      const mergedReviews = [...unpersistedLocal, ...cloudReviews];

      // อัปเดตข้อมูลล่าสุดลงในแคช localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedReviews));
      if (typeof onUpdated === "function") {
        onUpdated(mergedReviews);
      }
    }
  } catch (err) {
    console.warn("Could not fetch reviews from Google Sheets:", err);
  }
}

/**
 * Searches reviews by query string and/or faculty filter.
 * Search criteria:
 *   - Thai course ID (course_id)
 *   - English course code (course_code)
 *   - Thai course name (name_th)
 *   - English course name (name_en)
 *   - Faculty name (faculty)
 * Case-insensitive for English keywords, partial keyword matching.
 *
 * @param {string} query
 * @param {string} facultyFilter
 * @returns {Array<Object>} matching reviews (newest-first)
 */
function searchReviews(query, facultyFilter) {
  const reviews = getAllReviews();
  const q = (query || "").trim().toLowerCase();
  const fid = (facultyFilter || "").trim().toLowerCase();

  return reviews.filter(r => {
    const resolved = typeof resolveCourseInfo === "function" ? resolveCourseInfo(r) : {};

    // Faculty filter condition
    const facultyNameTh = (resolved.faculty || (typeof getFacultyName === "function" ? getFacultyName(r.faculty) : (r.faculty || ""))).toLowerCase();
    const rawFaculty = (r.faculty || "").toLowerCase();
    const matchesFaculty = !fid || facultyNameTh === fid || rawFaculty === fid;
    if (!matchesFaculty) return false;

    // Search query condition
    if (!q) return true;

    const courseId = (resolved.course_id || r.course_id || "").toLowerCase();
    const courseCode = (resolved.course_code || r.course_code || "").toLowerCase();
    const nameTh = (resolved.name_th || r.name_th || r.courseName || "").toLowerCase();
    const nameEn = (resolved.name_en || r.name_en || "").toLowerCase();
    const legacyCode = (r.courseId || "").toLowerCase();
    const written = (r.writtenReview || "").toLowerCase();
    const author = (r.displayName || "").toLowerCase();

    return (
      courseId.includes(q) ||
      courseCode.includes(q) ||
      nameTh.includes(q) ||
      nameEn.includes(q) ||
      legacyCode.includes(q) ||
      facultyNameTh.includes(q) ||
      rawFaculty.includes(q) ||
      written.includes(q) ||
      author.includes(q)
    );
  });
}

/**
 * Generates a unique review ID.
 * @returns {string}
 */
function generateId() {
  return "rev_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
}

/**
 * Seeds initial sample reviews from the master course database.
 * Only runs if localStorage is completely empty and no Google Sheets data exists yet.
 */
function seedSampleReviews() {
  const existing = getAllReviews();
  const hasOldMockData = existing.some(
    r => r.courseId === "GEN0101" || r.faculty === "sci" || r.faculty === "hum"
  );

  // If already populated with valid reviews, do not overwrite
  if (existing.length > 0 && !hasOldMockData) return;

  const sampleReviews = [
    {
      reviewId: generateId(),
      displayName: "เด็กปี 2 สายชิล",
      faculty: "สำนักนวัตกรรมการเรียนรู้",
      course_id: "สสน01",
      course_code: "ZIL01",
      name_th: "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
      name_en: "Job and Personal Financial Management to Reinforce Life Stability",
      courseId: "สสน01 / ZIL01",
      courseName: "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
      credits: 4,
      learningFormat: "Onsite",
      classSchedule: "จันทร์ 09:00 - 12:00",
      attendance: "มีการเช็คชื่อ",
      ratings: {
        contentClarity: 5,
        workloadAppropriateness: 5,
        examEase: 4,
        instructorKindness: 5,
        gradingEase: 5,
      },
      writtenReview:
        "วิชานี้ดีและมีประโยชน์มากครับ ได้เรียนรู้การวางแผนการเงินส่วนบุคคล การลงทุนขั้นพื้นฐาน และการบริหารเวลาในการทำงาน อาจารย์สอนสนุก ยกตัวอย่างจากชีวิตจริง งานกลุ่มไม่หนัก มีคะแนนในห้องช่วยเยอะมาก แนะนำเพื่อน ๆ ทุกคนครับ",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      reviewId: generateId(),
      displayName: "สาวนิเทศฯ คนเก๋",
      faculty: "วิทยาลัยนวัตกรรมสื่อสารสังคม",
      course_id: "สวน03",
      course_code: "ZCO03",
      name_th: "พูดเด่นให้เป็นดาว",
      name_en: "Speak Like A Super Star",
      courseId: "สวน03 / ZCO03",
      courseName: "พูดเด่นให้เป็นดาว",
      credits: 4,
      learningFormat: "Hybrid",
      classSchedule: "พุธ 13:00 - 16:00",
      attendance: "มีการเช็คชื่อ",
      ratings: {
        contentClarity: 5,
        workloadAppropriateness: 4,
        examEase: 5,
        instructorKindness: 5,
        gradingEase: 5,
      },
      writtenReview:
        "สนุกมากกกก ได้ฝึกทักษะการพูด การใช้ภาษากาย และความมั่นใจต่อหน้าสาธารณะอย่างแท้จริง บรรยากาศในห้องเรียนเป็นกันเอง อาจารย์ให้ฟีดแบ็กตรงจุดและคอยเชียร์ตลอด ไม่มีข้อสอบเขียนแบบเครียด เน้นปฏิบัติล้วน ๆ เกรด A แน่นอนถ้าตั้งใจ",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      reviewId: generateId(),
      displayName: "เภสัชมือใหม่",
      faculty: "คณะเภสัชศาสตร์",
      course_id: "สภส01",
      course_code: "ZPH01",
      name_th: "กูรู กูรู้ ยาและสมุนไพร",
      name_en: "Drug and Herb Guru",
      courseId: "สภส01 / ZPH01",
      courseName: "กูรู กูรู้ ยาและสมุนไพร",
      credits: 4,
      learningFormat: "Online",
      classSchedule: "ศุกร์ 09:00 - 12:00",
      attendance: "ไม่มีการเช็คชื่อ",
      ratings: {
        contentClarity: 5,
        workloadAppropriateness: 4,
        examEase: 4,
        instructorKindness: 5,
        gradingEase: 4,
      },
      writtenReview:
        "เนื้อหาเน้นการนำยาและสมุนไพรไปใช้ในชีวิตประจำวันอย่างปลอดภัย เข้าใจง่ายแม้ไม่ได้เรียนสายวิทย์สุขภาพมา อาจารย์ใจดีมาก มีสไลด์ให้ทบทวนครบถ้วน ข้อสอบปรนัยตามเนื้อหาที่สอนเลยครับ",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      reviewId: generateId(),
      displayName: "สายศิลป์หัวใจอาร์ต",
      faculty: "คณะศิลปกรรมศาสตร์",
      course_id: "สศก01",
      course_code: "ZFA01",
      name_th: "ศิลปะสร้างสรรค์และนวัตกรรมเพื่องานศิลปะ",
      name_en: "Creative Art and Innovation for Art",
      courseId: "สศก01 / ZFA01",
      courseName: "ศิลปะสร้างสรรค์และนวัตกรรมเพื่องานศิลปะ",
      credits: 6,
      learningFormat: "Onsite",
      classSchedule: "อังคาร 13:00 - 17:00",
      attendance: "มีการเช็คชื่อ",
      ratings: {
        contentClarity: 5,
        workloadAppropriateness: 4,
        examEase: 5,
        instructorKindness: 5,
        gradingEase: 5,
      },
      writtenReview:
        "ได้ปลดปล่อยความคิดสร้างสรรค์เต็มที่! ไม่จำเป็นต้องมีพื้นฐานวาดรูปมาก่อน อาจารย์เปิดกว้างรับทุกไอเดียและให้คำแนะนำดีมาก งานชิ้นสุดท้ายสนุกและได้ภูมิใจกับผลงานตัวเองค่ะ",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      reviewId: generateId(),
      displayName: "วิศวะชอบโค้ด",
      faculty: "คณะวิศวกรรมศาสตร์",
      course_id: "สวศ08",
      course_code: "ZEG08",
      name_th: "ก้าวแรกสู่การคิดเชิงคำนวณและโค้ดดิ้ง",
      name_en: "First Step to Computational Thinking and Coding",
      courseId: "สวศ08 / ZEG08",
      courseName: "ก้าวแรกสู่การคิดเชิงคำนวณและโค้ดดิ้ง",
      credits: 4,
      learningFormat: "Hybrid",
      classSchedule: "พฤหัสบดี 09:00 - 12:00",
      attendance: "ไม่แน่ใจ",
      ratings: {
        contentClarity: 4,
        workloadAppropriateness: 4,
        examEase: 4,
        instructorKindness: 4,
        gradingEase: 4,
      },
      writtenReview:
        "เหมาะมากสำหรับคนที่อยากเริ่มเขียนโปรแกรมโดยไม่มีพื้นฐานมาก่อน สอนตั้งแต่หลักคิดเชิงตรรกะไปจนถึงแบบฝึกหัดโค้ดดิ้งแบบง่าย ๆ มี TA คอยช่วยซัพพอร์ตตลอดเวลา",
      createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      reviewId: generateId(),
      displayName: "เด็กมนุษย์ขอเมาท์",
      faculty: "คณะมนุษยศาสตร์",
      course_id: "สมน14",
      course_code: "ZHM14",
      name_th: "ภาษาเกาหลีในชีวิตประจำวัน",
      name_en: "Korean in Daily Life",
      courseId: "สมน14 / ZHM14",
      courseName: "ภาษาเกาหลีในชีวิตประจำวัน",
      credits: 4,
      learningFormat: "Onsite",
      classSchedule: "อังคาร 09:00 - 12:00",
      attendance: "มีการเช็คชื่อ",
      ratings: {
        contentClarity: 5,
        workloadAppropriateness: 5,
        examEase: 5,
        instructorKindness: 5,
        gradingEase: 5,
      },
      writtenReview:
        "อาจารย์สอนน่ารักมากกก สำเนียงเป๊ะ เรียนสนุก ได้ฝึกอ่านฮันกึลและบทสนทนาที่ใช้บ่อยในซีรีส์และชีวิตประจำวัน ใครชอบเกาหลีห้ามพลาดเด็ดขาด ได้ A สบาย ๆ ถ้าเข้าเรียนสม่ำเสมอค่ะ",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleReviews));
}
