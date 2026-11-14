/**
 * Google Apps Script — Review SWU Free Elective Backend (Clean Sheet Edition)
 *
 * ระบบเชื่อมต่อ Google Sheet สำหรับโปรเจกต์ Review SWU Free Elective
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🌟 วิธีตั้งค่า Google Sheet แผ่นใหม่ให้สะอาด 100% (แนะนำมาก!):
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. ไปที่ Google Drive แล้วสร้าง Google Sheet แผ่นใหม่เอี่ยม (ตั้งชื่อว่า "SWU Free Elective Reviews")
 * 2. เมนูด้านบนเลือก: "ส่วนขยาย" (Extensions) -> "Apps Script"
 * 3. ลบโค้ดเดิมในกล่องออกทั้งหมด แล้ว Copy โค้ดในไฟล์นี้ทั้งหมดไปวางแทน
 * 4. กดไอคอนแผ่นดิสก์ 💾 บันทึก (Save project)
 * 5. [สร้างตารางให้อัตโนมัติ]:
 *    - แถบเมนูด้านบนตรงคำว่า "เลือกฟังก์ชัน" ให้เลือก "setupCleanSheet"
 *    - กดปุ่ม "เรียกใช้" (Run) 1 ครั้ง
 *    - กดยอมรับสิทธิ์ (Authorize) ให้สคริปต์
 *    -> กลับไปดูที่ Google Sheet จะเห็นหัวตารางและ 6 รีวิวตัวอย่างสวยงามถูกสร้างทันที!
 * 6. [เผยแพร่เป็น Web App]:
 *    - กดปุ่มสีน้ำเงินมุมบนขวา "การทำให้ใช้งานได้" (Deploy) -> "การทำให้ใช้งานได้รายการใหม่" (New deployment)
 *    - กดรูปเฟือง ⚙️ ด้านซ้าย เลือก "เว็บแอป" (Web app)
 *    - ตั้งค่า:
 *      • คำอธิบาย: SWU Review API
 *      • ปฏิบัติการในฐานะ (Execute as): ฉัน (Me)
 *      • ผู้ที่มีสิทธิ์เข้าถึง (Who has access): ทุกคน (Anyone)  <-- สำคัญมาก!
 *    - กด "ทำให้ใช้งานได้" (Deploy)
 * 7. Copy ลิงก์ "URL ของเว็บแอป" (ลงท้ายด้วย /exec)
 * 8. นำ URL ไปวางใน js/storage.js ตรงบรรทัด:
 *    const GOOGLE_SCRIPT_URL = "URL_ที่คุณคัดลอกมา";
 * ─────────────────────────────────────────────────────────────────────────────
 */

function getTargetSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getActiveSheet() || ss.getSheets()[0];
}

// ── GET: ดึงข้อมูลรีวิวทั้งหมดออกมาเป็น JSON สำหรับแสดงบนหน้าเว็บ ──────────
function doGet(e) {
  try {
    var sheet = getTargetSheet();
    var rows = sheet.getDataRange().getValues();

    // ถ้าชีตยังว่าง ให้สร้างหัวตารางและข้อมูลตัวอย่างให้อัตโนมัติ
    if (rows.length <= 1) {
      setupCleanSheet();
      rows = sheet.getDataRange().getValues();
    }

    var headers = rows[0];

    var tsCol = findCol(headers, ["timestamp", "ประทับเวลา", "วันที่"]);

    // ตรวจหาตำแหน่งคอลัมน์แบบยืดหยุ่น (ไม่ให้ซ้ำกับคอลัมน์ประทับเวลา)
    var colMap = {
      timestamp:        tsCol,
      displayName:      findCol(headers, ["displayname", "ชื่อผู้รีวิว", "ชื่อที่", "ชื่อ"]),
      faculty:          findCol(headers, ["faculty", "คณะ"]),
      courseId:         findCol(headers, ["course_id", "courseid", "รหัสวิชา (ไทย)", "รหัสวิชา"]),
      courseCode:       findCol(headers, ["course_code", "coursecode", "รหัสวิชา (อังกฤษ)", "รหัสวิชาภาษาอังกฤษ"]),
      nameTh:           findCol(headers, ["name_th", "nameth", "ชื่อวิชา (ไทย)", "ชื่อวิชา"]),
      nameEn:           findCol(headers, ["name_en", "nameen", "ชื่อวิชา (อังกฤษ)", "ชื่อภาษาอังกฤษ"]),
      credits:          findCol(headers, ["credits", "credit", "หน่วยกิต"]),
      learningFormat:   findCol(headers, ["learningformat", "format", "รูปแบบ"]),
      classSchedule:    findCol(headers, ["classschedule", "schedule", "ตารางเรียน", "เวลาเรียน", "ช่วงเวลา"], [tsCol]),
      attendance:       findCol(headers, ["attendance", "เช็คชื่อ"]),
      ratingContent:    findCol(headers, ["contentclarity", "ความเข้าใจ", "เนื้อหา"]),
      ratingWorkload:   findCol(headers, ["workload", "ปริมาณงาน", "ภาระงาน"]),
      ratingExam:       findCol(headers, ["examease", "ข้อสอบ", "การสอบ"]),
      ratingInstructor: findCol(headers, ["instructorkindness", "อาจารย์", "ผู้สอน"]),
      ratingGrading:    findCol(headers, ["gradingease", "เกรด", "ตัดเกรด"]),
      writtenReview:    findCol(headers, ["writtenreview", "รีวิวจากผู้เรียน", "รีวิว", "ความคิดเห็น", "ประสบการณ์"]),
      reviewId:         findCol(headers, ["reviewid", "รหัสอ้างอิง", "id"])
    };

    var reviews = [];

    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      if (!row || row.every(function(cell) { return String(cell).trim() === ""; })) continue;

      var rCourseId   = colMap.courseId !== -1 ? String(row[colMap.courseId]).trim() : "";
      var rCourseCode = colMap.courseCode !== -1 ? String(row[colMap.courseCode]).trim() : "";
      var rNameTh     = colMap.nameTh !== -1 ? String(row[colMap.nameTh]).trim() : "";
      var rNameEn     = colMap.nameEn !== -1 ? String(row[colMap.nameEn]).trim() : "";

      // แยกอัตโนมัติถ้ามีรหัสทั้งไทยและอังกฤษในช่องเดียว เช่น "สสน01 / ZIL01"
      if (!rCourseCode && rCourseId.indexOf("/") !== -1) {
        var parts = rCourseId.split("/");
        rCourseId   = parts[0].trim();
        rCourseCode = parts[1].trim();
      } else if (!rCourseId && rCourseCode.indexOf("/") !== -1) {
        var parts = rCourseCode.split("/");
        rCourseId   = parts[0].trim();
        rCourseCode = parts[1].trim();
      }

      // ข้ามแถวที่ไม่มีข้อมูลรายวิชา (แถวขยะ/แถวทดสอบที่ไม่ได้เลือกวิชา)
      if (!rCourseId && !rCourseCode && !rNameTh) continue;

      var rTimestamp   = colMap.timestamp !== -1 ? row[colMap.timestamp] : "";
      var rDisplayName = colMap.displayName !== -1 ? String(row[colMap.displayName]).trim() : "นักศึกษา มศว";
      var rFaculty     = colMap.faculty !== -1 ? String(row[colMap.faculty]).trim() : "";
      var rCredits     = colMap.credits !== -1 ? parseCredits(row[colMap.credits]) : 4;
      var rFormat      = colMap.learningFormat !== -1 ? String(row[colMap.learningFormat]).trim() : "Onsite";

      // ดึงเวลาเรียนและจัดรูปแบบเป็น Hr:min - Hr:min
      var rSchedule = "";
      if (colMap.classSchedule !== -1 && colMap.classSchedule !== colMap.timestamp) {
        var rawSched = row[colMap.classSchedule];
        if (rawSched instanceof Date) {
          var sh = rawSched.getHours();
          var sm = rawSched.getMinutes();
          rSchedule = (sh < 10 ? "0" : "") + sh + ":" + (sm < 10 ? "0" : "") + sm;
        } else if (rawSched !== null && rawSched !== undefined) {
          rSchedule = String(rawSched).trim();
          if (rSchedule.indexOf("GMT") !== -1 || (rSchedule.indexOf("T") !== -1 && rSchedule.length > 16)) {
            var mTimes = rSchedule.match(/(\d{1,2}):(\d{2})/g);
            if (mTimes && mTimes.length >= 2) {
              rSchedule = mTimes[0] + " - " + mTimes[1];
            } else if (mTimes && mTimes.length === 1) {
              rSchedule = mTimes[0];
            }
          }
        }
      }
      if (rSchedule) {
        rSchedule = rSchedule.replace(/(\d{1,2}:\d{2})\s*[–—\-]\s*(\d{1,2}:\d{2})/g, "$1 - $2");
      }
      var rAttendance  = colMap.attendance !== -1 ? String(row[colMap.attendance]).trim() : "มีการเช็คชื่อ";

      var rContent  = colMap.ratingContent !== -1 ? parseScore(row[colMap.ratingContent]) : 5;
      var rWorkload = colMap.ratingWorkload !== -1 ? parseScore(row[colMap.ratingWorkload]) : 5;
      var rExam     = colMap.ratingExam !== -1 ? parseScore(row[colMap.ratingExam]) : 5;
      var rInst     = colMap.ratingInstructor !== -1 ? parseScore(row[colMap.ratingInstructor]) : 5;
      var rGrading  = colMap.ratingGrading !== -1 ? parseScore(row[colMap.ratingGrading]) : 5;

      var rWritten = colMap.writtenReview !== -1 ? String(row[colMap.writtenReview]).trim() : "";
      var rId      = (colMap.reviewId !== -1 && row[colMap.reviewId]) ? String(row[colMap.reviewId]) : ("gs_row_" + (i + 1));

      var createdAtStr = rTimestamp
        ? (rTimestamp instanceof Date ? rTimestamp.toISOString() : new Date(rTimestamp).toISOString())
        : new Date().toISOString();

      reviews.push({
        reviewId:       rId,
        displayName:    rDisplayName || "นักศึกษา มศว",
        faculty:        rFaculty,
        course_id:      rCourseId,
        course_code:    rCourseCode,
        name_th:        rNameTh,
        name_en:        rNameEn,
        courseId:       rCourseId && rCourseCode ? (rCourseId + " / " + rCourseCode) : (rCourseId || rCourseCode),
        courseName:     rNameTh,
        credits:        rCredits,
        learningFormat: rFormat || "Onsite",
        classSchedule:  rSchedule,
        attendance:     rAttendance || "มีการเช็คชื่อ",
        ratings: {
          contentClarity:          rContent,
          workloadAppropriateness: rWorkload,
          examEase:                rExam,
          instructorKindness:      rInst,
          gradingEase:             rGrading
        },
        writtenReview:  rWritten,
        createdAt:      createdAtStr
      });
    }

    // เรียงรีวิวจากใหม่สุดไปเก่าสุด
    reviews.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return ContentService.createTextOutput(JSON.stringify(reviews))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ── POST: รับรีวิวใหม่จากหน้าเว็บแล้วบันทึกต่อท้าย Sheet ───────────────────
// ใช้ LockService เพื่อจัดการคิวเมื่อมีผู้ใช้กดส่งพร้อมกัน (ป้องกัน Race Condition / บันทึกทับแถว)
function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = false;

  try {
    // รอคิวขอล็อคบันทึกข้อมูลสูงสุด 30 วินาที
    hasLock = lock.tryLock(30000);
    if (!hasLock) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "busy",
        message: "Server busy, lock timeout. Please retry in a moment."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = getTargetSheet();
    var contents = e.postData ? e.postData.contents : "";
    var data = JSON.parse(contents);

    var now = new Date();
    var reviewId    = data.reviewId || ("rev_" + now.getTime().toString(36));
    var displayName = data.displayName || "นักศึกษา มศว";
    var faculty     = data.faculty || "";
    var courseId    = data.course_id || "";
    var courseCode  = data.course_code || "";
    var nameTh      = data.name_th || data.courseName || "";
    var nameEn      = data.name_en || "";
    var credits     = data.credits || 4;
    var format      = data.learningFormat || "Onsite";
    var schedule    = data.classSchedule || "";
    var attendance  = data.attendance || "มีการเช็คชื่อ";

    var ratings = data.ratings || {};
    var r1 = ratings.contentClarity || 5;
    var r2 = ratings.workloadAppropriateness || 5;
    var r3 = ratings.examEase || 5;
    var r4 = ratings.instructorKindness || 5;
    var r5 = ratings.gradingEase || 5;

    var written = data.writtenReview || "";

    sheet.appendRow([
      now,            // 1. วันที่เวลา
      displayName,    // 2. ชื่อผู้รีวิว
      faculty,        // 3. คณะ
      courseId,       // 4. รหัสวิชา (ไทย)
      courseCode,     // 5. รหัสวิชา (อังกฤษ)
      nameTh,         // 6. ชื่อวิชา (ไทย)
      nameEn,         // 7. ชื่อวิชา (อังกฤษ)
      credits,        // 8. หน่วยกิต
      format,         // 9. รูปแบบการเรียน
      schedule,       // 10. ตารางเรียน
      attendance,     // 11. การเช็คชื่อ
      r1,             // 12. ความเข้าใจง่าย
      r2,             // 13. ความเหมาะสมงาน
      r3,             // 14. ความง่ายข้อสอบ
      r4,             // 15. ความใจดีอาจารย์
      r5,             // 16. ความง่ายการให้เกรด
      written,        // 17. รีวิวจากผู้เรียน
      reviewId        // 18. รหัสอ้างอิง
    ]);

    // บังคับให้เขียนลง Sheet ทันทีเพื่อความปลอดภัยของข้อมูลก่อนปล่อยล็อค
    SpreadsheetApp.flush();

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Saved to Google Sheet!",
      reviewId: reviewId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (hasLock) {
      lock.releaseLock();
    }
  }
}

// ── ฟังก์ชันสร้างหัวตารางและ 6 รีวิวตัวอย่างเริ่มต้นให้อัตโนมัติ ───────────
function setupCleanSheet() {
  var sheet = getTargetSheet();
  sheet.clear();

  var headers = [
    "ประทับเวลา",
    "ชื่อผู้รีวิว",
    "คณะ",
    "รหัสวิชา (ไทย)",
    "รหัสวิชา (อังกฤษ)",
    "ชื่อวิชา (ไทย)",
    "ชื่อวิชา (อังกฤษ)",
    "หน่วยกิต",
    "รูปแบบการเรียน",
    "ตารางเรียน",
    "การเช็คชื่อ",
    "ความเข้าใจง่าย (1-5)",
    "ความเหมาะสมงาน (1-5)",
    "ความง่ายข้อสอบ (1-5)",
    "ความใจดีอาจารย์ (1-5)",
    "ความง่ายการให้เกรด (1-5)",
    "รีวิวจากผู้เรียน",
    "รหัสอ้างอิง"
  ];

  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#F0F1F2")
    .setHorizontalAlignment("center");
  sheet.setFrozenRows(1);

  var now = new Date();
  var sampleRows = [
    [
      new Date(now.getTime() - 1 * 86400000),
      "เด็กปี 2 สายชิล",
      "สำนักนวัตกรรมการเรียนรู้",
      "สสน01", "ZIL01",
      "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
      "Job and Personal Financial Management to Reinforce Life Stability",
      4, "Onsite", "จันทร์ 09:00 - 12:00", "มีการเช็คชื่อ",
      5, 5, 4, 5, 5,
      "วิชานี้ดีและมีประโยชน์มากครับ ได้เรียนรู้การวางแผนการเงินส่วนบุคคล การลงทุนขั้นพื้นฐาน และการบริหารเวลาในการทำงาน อาจารย์สอนสนุก ยกตัวอย่างจากชีวิตจริง งานกลุ่มไม่หนัก มีคะแนนในห้องช่วยเยอะมาก แนะนำเพื่อน ๆ ทุกคนครับ",
      "rev_sample_01"
    ],
    [
      new Date(now.getTime() - 3 * 86400000),
      "สาวนิเทศฯ คนเก๋",
      "วิทยาลัยนวัตกรรมสื่อสารสังคม",
      "สวน03", "ZCO03",
      "พูดเด่นให้เป็นดาว",
      "Speak Like A Super Star",
      4, "Hybrid", "พุธ 13:00 - 16:00", "มีการเช็คชื่อ",
      5, 4, 5, 5, 5,
      "สนุกมากกกก ได้ฝึกทักษะการพูด การใช้ภาษากาย และความมั่นใจต่อหน้าสาธารณะอย่างแท้จริง บรรยากาศในห้องเรียนเป็นกันเอง อาจารย์ให้ฟีดแบ็กตรงจุดและคอยเชียร์ตลอด ไม่มีข้อสอบเขียนแบบเครียด เน้นปฏิบัติล้วน ๆ เกรด A แน่นอนถ้าตั้งใจ",
      "rev_sample_02"
    ],
    [
      new Date(now.getTime() - 7 * 86400000),
      "เภสัชมือใหม่",
      "คณะเภสัชศาสตร์",
      "สภส01", "ZPH01",
      "กูรู กูรู้ ยาและสมุนไพร",
      "Drug and Herb Guru",
      4, "Online", "ศุกร์ 09:00 - 12:00", "ไม่มีการเช็คชื่อ",
      5, 4, 4, 5, 4,
      "เนื้อหาเน้นการนำยาและสมุนไพรไปใช้ในชีวิตประจำวันอย่างปลอดภัย เข้าใจง่ายแม้ไม่ได้เรียนสายวิทย์สุขภาพมา อาจารย์ใจดีมาก มีสไลด์ให้ทบทวนครบถ้วน ข้อสอบปรนัยตามเนื้อหาที่สอนเลยครับ",
      "rev_sample_03"
    ],
    [
      new Date(now.getTime() - 12 * 86400000),
      "สายศิลป์หัวใจอาร์ต",
      "คณะศิลปกรรมศาสตร์",
      "สศก01", "ZFA01",
      "ศิลปะสร้างสรรค์และนวัตกรรมเพื่องานศิลปะ",
      "Creative Art and Innovation for Art",
      6, "Onsite", "อังคาร 13:00 - 17:00", "มีการเช็คชื่อ",
      5, 4, 5, 5, 5,
      "ได้ปลดปล่อยความคิดสร้างสรรค์เต็มที่! ไม่จำเป็นต้องมีพื้นฐานวาดรูปมาก่อน อาจารย์เปิดกว้างรับทุกไอเดียและให้คำแนะนำดีมาก งานชิ้นสุดท้ายสนุกและได้ภูมิใจกับผลงานตัวเองค่ะ",
      "rev_sample_04"
    ],
    [
      new Date(now.getTime() - 16 * 86400000),
      "วิศวะชอบโค้ด",
      "คณะวิศวกรรมศาสตร์",
      "สวศ08", "ZEG08",
      "ก้าวแรกสู่การคิดเชิงคำนวณและโค้ดดิ้ง",
      "First Step to Computational Thinking and Coding",
      4, "Hybrid", "พฤหัสบดี 09:00 - 12:00", "ไม่แน่ใจ",
      4, 4, 4, 4, 4,
      "เหมาะมากสำหรับคนที่อยากเริ่มเขียนโปรแกรมโดยไม่มีพื้นฐานมาก่อน สอนตั้งแต่หลักคิดเชิงตรรกะไปจนถึงแบบฝึกหัดโค้ดดิ้งแบบง่าย ๆ มี TA คอยช่วยซัพพอร์ตตลอดเวลา",
      "rev_sample_05"
    ],
    [
      new Date(now.getTime() - 20 * 86400000),
      "เด็กมนุษย์ขอเมาท์",
      "คณะมนุษยศาสตร์",
      "สมน14", "ZHM14",
      "ภาษาเกาหลีในชีวิตประจำวัน",
      "Korean in Daily Life",
      4, "Onsite", "อังคาร 09:00 - 12:00", "มีการเช็คชื่อ",
      5, 5, 5, 5, 5,
      "อาจารย์สอนน่ารักมากกก สำเนียงเป๊ะ เรียนสนุก ได้ฝึกอ่านฮันกึลและบทสนทนาที่ใช้บ่อยในซีรีส์และชีวิตประจำวัน ใครชอบเกาหลีห้ามพลาดเด็ดขาด ได้ A สบาย ๆ ถ้าเข้าเรียนสม่ำเสมอค่ะ",
      "rev_sample_06"
    ]
  ];

  for (var k = 0; k < sampleRows.length; k++) {
    sheet.appendRow(sampleRows[k]);
  }
}

// ── Helpers ──────────────────────────────────────────────────────
function findCol(headers, keywords, excludeIndices) {
  excludeIndices = excludeIndices || [];

  // 1. ตรวจสอบแบบตรงกันเป๊ะ (Exact Match) ก่อน
  for (var j = 0; j < keywords.length; j++) {
    var kw = keywords[j].toString().toLowerCase().trim();
    for (var i = 0; i < headers.length; i++) {
      if (excludeIndices.indexOf(i) !== -1) continue;
      var h = headers[i].toString().toLowerCase().trim();
      if (h === kw) {
        return i;
      }
    }
  }

  // 2. ตรวจสอบแบบมีคำนั้นอยู่ (Partial Match) โดยข้ามคอลัมน์ประทับเวลาสำหรับข้อมูลทั่วไป
  for (var j = 0; j < keywords.length; j++) {
    var kw = keywords[j].toString().toLowerCase().trim();
    for (var i = 0; i < headers.length; i++) {
      if (excludeIndices.indexOf(i) !== -1) continue;
      var h = headers[i].toString().toLowerCase().trim();
      if (h.indexOf("ประทับเวลา") !== -1 || h.indexOf("timestamp") !== -1) continue;
      if (h.indexOf(kw) !== -1) {
        return i;
      }
    }
  }

  return -1;
}

function parseScore(val) {
  var num = parseInt(val, 10);
  if (isNaN(num) || num < 1) return 5;
  if (num > 5) return 5;
  return num;
}

function parseCredits(val) {
  var num = parseInt(val, 10);
  if (num === 6) return 6;
  return 4;
}
