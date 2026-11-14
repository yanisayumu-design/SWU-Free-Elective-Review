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
  // Disabled: Clean slate for production (no sample mock data)
  return;
}
