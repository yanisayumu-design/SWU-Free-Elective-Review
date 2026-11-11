/**
 * storage.js — Review data storage layer (localStorage)
 *
 * ⚠️  IMPORTANT NOTE ON localStorage:
 *   Reviews saved here are stored ONLY in this browser on this device.
 *   They do NOT sync between different users, browsers, or devices.
 *   To share reviews across users, a backend/database integration is needed.
 *
 * REVIEW DATA STRUCTURE:
 * {
 *   reviewId:       string  — unique identifier
 *   displayName:    string  — public name chosen by reviewer
 *   faculty:        string  — faculty_name matching master course database
 *   course_id:      string  — Thai course ID (e.g. สสน01)
 *   course_code:    string  — English course code (e.g. ZIL01)
 *   name_th:        string  — Thai course name
 *   name_en:        string  — English course name
 *   courseId:       string  — convenience composite ID ("สสน01 / ZIL01")
 *   courseName:     string  — convenience course name (Thai)
 *   credits:        number  — 4 or 6
 *   learningFormat: string  — "Online" | "Onsite" | "Hybrid"
 *   classSchedule:  string  — e.g. "จันทร์ 09:00–12:00"
 *   attendance:     string  — "มีการเช็คชื่อ" | "ไม่มีการเช็คชื่อ" | "ไม่แน่ใจ"
 *   ratings: {
 *     contentClarity:          number (1-5),
 *     workloadAppropriateness: number (1-5),
 *     examEase:                number (1-5),
 *     instructorKindness:      number (1-5),
 *     gradingEase:             number (1-5)
 *   },
 *   writtenReview:  string  — review text
 *   createdAt:      string  — ISO 8601 timestamp
 * }
 */

const STORAGE_KEY = "swu_reviews";

/**
 * Returns all stored reviews, sorted newest-first.
 * @returns {Array<Object>}
 */
function getAllReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const reviews = raw ? JSON.parse(raw) : [];
    return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch {
    return [];
  }
}

/**
 * Saves a new review to localStorage.
 * Assigns a unique reviewId and createdAt timestamp automatically.
 * @param {Object} reviewData
 * @returns {Object} the saved review
 */
function saveReview(reviewData) {
  const reviews = getAllReviews();
  const newReview = {
    ...reviewData,
    reviewId: generateId(),
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return newReview;
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
    // Faculty filter condition
    const facultyName = (r.faculty || "").toLowerCase();
    const matchesFaculty = !fid || facultyName === fid;
    if (!matchesFaculty) return false;

    // Search query condition
    if (!q) return true;

    const courseId   = (r.course_id || "").toLowerCase();
    const courseCode = (r.course_code || "").toLowerCase();
    const nameTh     = (r.name_th || r.courseName || "").toLowerCase();
    const nameEn     = (r.name_en || "").toLowerCase();
    const legacyCode = (r.courseId || "").toLowerCase();
    const written    = (r.writtenReview || "").toLowerCase();
    const author     = (r.displayName || "").toLowerCase();

    return (
      courseId.includes(q) ||
      courseCode.includes(q) ||
      nameTh.includes(q) ||
      nameEn.includes(q) ||
      legacyCode.includes(q) ||
      facultyName.includes(q) ||
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
 * Seeds sample reviews from the master course database.
 * Upgrades previously cached old sample data if detected.
 */
function seedSampleReviews() {
  const existing = getAllReviews();
  const hasOldMockData = existing.some(
    r => r.courseId === "GEN0101" || r.faculty === "sci" || r.faculty === "hum"
  );

  // If already populated with new courses, do not overwrite user data
  if (existing.length > 0 && !hasOldMockData) return;

  const sampleReviews = [
    {
      reviewId: generateId(),
      displayName: "เด็กปี 2 สายชิล",
      faculty: "Innovative Learning Center",
      course_id: "สสน01",
      course_code: "ZIL01",
      name_th: "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
      name_en: "Job and Personal Financial Management to Reinforce Life Stability",
      courseId: "สสน01 / ZIL01",
      courseName: "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
      credits: 4,
      learningFormat: "Onsite",
      classSchedule: "จันทร์ 09:00–12:00",
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
      faculty: "College of Social Communication Innovation",
      course_id: "สวน03",
      course_code: "ZCO03",
      name_th: "พูดเด่นให้เป็นดาว",
      name_en: "Speak Like A Super Star",
      courseId: "สวน03 / ZCO03",
      courseName: "พูดเด่นให้เป็นดาว",
      credits: 4,
      learningFormat: "Hybrid",
      classSchedule: "พุธ 13:00–16:00",
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
      faculty: "Faculty of Pharmacy",
      course_id: "สภส01",
      course_code: "ZPH01",
      name_th: "กูรู กูรู้ ยาและสมุนไพร",
      name_en: "Drug and Herb Guru",
      courseId: "สภส01 / ZPH01",
      courseName: "กูรู กูรู้ ยาและสมุนไพร",
      credits: 4,
      learningFormat: "Online",
      classSchedule: "ศุกร์ 09:00–12:00",
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
      faculty: "Faculty of Fine Arts",
      course_id: "สศก01",
      course_code: "ZFA01",
      name_th: "ศิลปะสร้างสรรค์และนวัตกรรมเพื่องานศิลปะ",
      name_en: "Creative Art and Innovation for Art",
      courseId: "สศก01 / ZFA01",
      courseName: "ศิลปะสร้างสรรค์และนวัตกรรมเพื่องานศิลปะ",
      credits: 6,
      learningFormat: "Onsite",
      classSchedule: "อังคาร 13:00–17:00",
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
      faculty: "Faculty of Engineering",
      course_id: "สวศ08",
      course_code: "ZEG08",
      name_th: "ก้าวแรกสู่การคิดเชิงคำนวณและโค้ดดิ้ง",
      name_en: "First Step to Computational Thinking and Coding",
      courseId: "สวศ08 / ZEG08",
      courseName: "ก้าวแรกสู่การคิดเชิงคำนวณและโค้ดดิ้ง",
      credits: 4,
      learningFormat: "Hybrid",
      classSchedule: "พฤหัสบดี 09:00–12:00",
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
      faculty: "Faculty of Humanities",
      course_id: "สมน14",
      course_code: "ZHM14",
      name_th: "ภาษาเกาหลีในชีวิตประจำวัน",
      name_en: "Korean in Daily Life",
      courseId: "สมน14 / ZHM14",
      courseName: "ภาษาเกาหลีในชีวิตประจำวัน",
      credits: 4,
      learningFormat: "Onsite",
      classSchedule: "อังคาร 09:00–12:00",
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
