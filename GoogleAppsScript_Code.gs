/**
 * Google Apps Script — Review SWU Free Elective Backend
 *
 * เชื่อมต่อกับ Google Sheet สำหรับบันทึกและอ่านรีวิวอัตโนมัติ
 * ไม่ต้องใช้ Database หรือ PHP / ทำงานบนคลาวด์ของ Google ฟรี 100%
 *
 * ─────────────────────────────────────────────────────────────────
 * 📋 วิธีติดตั้งและเปิดใช้งาน (ใช้เวลา 2 นาที):
 * 1. เปิด Google Sheet แผ่นของคุณ:
 *    https://docs.google.com/spreadsheets/d/1GjJBbpb4Yyi4SxveuQZ7-DWzTrgZpBmqYo4siFqwF1E/
 * 2. เมนูด้านบนเลือก: "ส่วนขยาย" (Extensions) -> "Apps Script"
 * 3. ลบโค้ดเดิมทั้งหมดในกล่องข้อความออก แล้ว Copy โค้ดในไฟล์นี้ทั้งหมดไปวางแทน
 * 4. กดไอคอนแผ่นดิสก์ 💾 (บันทึก / Save project)
 * 5. กดปุ่มสีน้ำเงินมุมบนขวา "การทำให้ใช้งานได้" (Deploy) -> "การทำให้ใช้งานได้รายการใหม่" (New deployment)
 * 6. กดที่ไอคอนรูปเฟือง ⚙️ ด้านซ้าย เลือก "เว็บแอป" (Web app)
 * 7. ตั้งค่า:
 *    - คำอธิบาย (Description): SWU Review API
 *    - ปฏิบัติการในฐานะ (Execute as): ฉัน (Me)
 *    - ผู้ที่มีสิทธิ์เข้าถึง (Who has access): ทุกคน (Anyone)  <-- สำคัญมาก! ต้องเลือก Anyone
 * 8. กดปุ่ม "ทำให้ใช้งานได้" (Deploy)
 * 9. กดยอมรับสิทธิ์ (Authorize access) แล้วเลือกบัญชี Google ของคุณ -> กด Advanced -> Go to ... (unsafe) -> Allow
 * 10. Copy ลิงก์ "URL ของเว็บแอป" (Web app URL) ที่ลงท้ายด้วย /exec
 * 11. นำ URL นั้นมาใส่ในไฟล์ js/storage.js ตรงบรรทัด:
 *     const GOOGLE_SCRIPT_URL = "URL_ที่คุณคัดลอกมา";
 * ─────────────────────────────────────────────────────────────────
 */

function getTargetSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // ใช้แผ่นงานปัจจุบันหรือแผ่นแรก
  return ss.getActiveSheet() || ss.getSheets()[0];
}

// ── GET: ดึงข้อมูลรีวิวทั้งหมดออกมาเป็น JSON สำหรับแสดงบนหน้าเว็บ ──────────
function doGet(e) {
  try {
    var sheet = getTargetSheet();
    var rows = sheet.getDataRange().getValues();

    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var headers = rows[0];

    // ค้นหาตำแหน่งคอลัมน์แบบยืดหยุ่น (รองรับทั้งภาษาไทยและอังกฤษจาก Google Form)
    var colMap = {
      timestamp:        findCol(headers, ["timestamp", "ประทับเวลา", "วันที่"]),
      displayName:      findCol(headers, ["displayname", "ชื่อที่", "ชื่อผู้รีวิว", "ชื่อ"]),
      faculty:          findCol(headers, ["faculty", "คณะ"]),
      courseId:         findCol(headers, ["course_id", "courseid", "รหัสวิชา"]),
      courseCode:       findCol(headers, ["course_code", "coursecode", "รหัสวิชาภาษาอังกฤษ"]),
      nameTh:           findCol(headers, ["name_th", "nameth", "ชื่อวิชา", "coursename"]),
      nameEn:           findCol(headers, ["name_en", "nameen", "ชื่อภาษาอังกฤษ"]),
      credits:          findCol(headers, ["credits", "credit", "หน่วยกิต"]),
      learningFormat:   findCol(headers, ["learningformat", "format", "รูปแบบ"]),
      classSchedule:    findCol(headers, ["classschedule", "schedule", "ตารางเรียน", "เวลา"]),
      attendance:       findCol(headers, ["attendance", "เช็คชื่อ"]),
      ratingContent:    findCol(headers, ["contentclarity", "ความเข้าใจ", "เนื้อหา"]),
      ratingWorkload:   findCol(headers, ["workload", "ปริมาณงาน", "ภาระงาน"]),
      ratingExam:       findCol(headers, ["examease", "ข้อสอบ", "การสอบ"]),
      ratingInstructor: findCol(headers, ["instructorkindness", "อาจารย์", "ผู้สอน"]),
      ratingGrading:    findCol(headers, ["gradingease", "เกรด", "ตัดเกรด"]),
      writtenReview:    findCol(headers, ["writtenreview", "รีวิว", "ความคิดเห็น", "ประสบการณ์", "ข้อเสนอแนะ"]),
      reviewId:         findCol(headers, ["reviewid", "id", "รหัสรีวิว"])
    };

    var reviews = [];

    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      // ข้ามแถวที่ว่างเปล่า
      if (!row || row.every(function(cell) { return cell === ""; })) continue;

      var rTimestamp   = colMap.timestamp !== -1 ? row[colMap.timestamp] : "";
      var rDisplayName = colMap.displayName !== -1 ? row[colMap.displayName] : "นักศึกษา มศว";
      var rFaculty     = colMap.faculty !== -1 ? row[colMap.faculty] : "";
      var rCourseId    = colMap.courseId !== -1 ? row[colMap.courseId] : "";
      var rCourseCode  = colMap.courseCode !== -1 ? row[colMap.courseCode] : "";
      var rNameTh      = colMap.nameTh !== -1 ? row[colMap.nameTh] : "";
      var rNameEn      = colMap.nameEn !== -1 ? row[colMap.nameEn] : "";
      var rCredits     = colMap.credits !== -1 ? parseCredits(row[colMap.credits]) : 4;
      var rFormat      = colMap.learningFormat !== -1 ? row[colMap.learningFormat] : "Onsite";
      var rSchedule    = colMap.classSchedule !== -1 ? row[colMap.classSchedule] : "";
      var rAttendance  = colMap.attendance !== -1 ? row[colMap.attendance] : "มีการเช็คชื่อ";

      var rContent  = colMap.ratingContent !== -1 ? parseScore(row[colMap.ratingContent]) : 5;
      var rWorkload = colMap.ratingWorkload !== -1 ? parseScore(row[colMap.ratingWorkload]) : 5;
      var rExam     = colMap.ratingExam !== -1 ? parseScore(row[colMap.ratingExam]) : 5;
      var rInst     = colMap.ratingInstructor !== -1 ? parseScore(row[colMap.ratingInstructor]) : 5;
      var rGrading  = colMap.ratingGrading !== -1 ? parseScore(row[colMap.ratingGrading]) : 5;

      var rWritten = colMap.writtenReview !== -1 ? row[colMap.writtenReview] : "";
      var rId      = (colMap.reviewId !== -1 && row[colMap.reviewId]) ? row[colMap.reviewId] : ("gs_row_" + (i + 1));

      var createdAtStr = rTimestamp
        ? (rTimestamp instanceof Date ? rTimestamp.toISOString() : new Date(rTimestamp).toISOString())
        : new Date().toISOString();

      reviews.push({
        reviewId:       String(rId),
        displayName:    String(rDisplayName || "นักศึกษา มศว"),
        faculty:        String(rFaculty || ""),
        course_id:      String(rCourseId || ""),
        course_code:    String(rCourseCode || ""),
        name_th:        String(rNameTh || ""),
        name_en:        String(rNameEn || ""),
        courseId:       rCourseId && rCourseCode ? (rCourseId + " / " + rCourseCode) : String(rCourseId || rCourseCode || ""),
        courseName:     String(rNameTh || ""),
        credits:        Number(rCredits) || 4,
        learningFormat: String(rFormat || "Onsite"),
        classSchedule:  String(rSchedule || ""),
        attendance:     String(rAttendance || "มีการเช็คชื่อ"),
        ratings: {
          contentClarity:          rContent,
          workloadAppropriateness: rWorkload,
          examEase:                rExam,
          instructorKindness:      rInst,
          gradingEase:             rGrading
        },
        writtenReview:  String(rWritten || ""),
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

// ── POST: รับรีวิวใหม่ที่ส่งมาจากหน้าเว็บแล้วบันทึกลง Google Sheet ────────
function doPost(e) {
  try {
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

    // บันทึกต่อท้ายแถวใหม่ใน Sheet
    sheet.appendRow([
      now,            // 1. วันที่/เวลา
      displayName,    // 2. ชื่อผู้รีวิว
      faculty,        // 3. คณะ
      courseId,       // 4. รหัสวิชาไทย
      courseCode,     // 5. รหัสวิชาอังกฤษ
      nameTh,         // 6. ชื่อวิชาไทย
      nameEn,         // 7. ชื่อวิชาอังกฤษ
      credits,        // 8. หน่วยกิต
      format,         // 9. รูปแบบการเรียน
      schedule,       // 10. ตารางเรียน
      attendance,     // 11. เช็คชื่อ
      r1,             // 12. คะแนนความเข้าใจ
      r2,             // 13. คะแนนภาระงาน
      r3,             // 14. คะแนนข้อสอบ
      r4,             // 15. คะแนนอาจารย์
      r5,             // 16. คะแนนการตัดเกรด
      written,        // 17. รีวิวเขียน
      reviewId        // 18. รหัสอ้างอิงรีวิว
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Review appended to sheet successfully!",
      reviewId: reviewId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Helpers ──────────────────────────────────────────────────────
function findCol(headers, keywords) {
  for (var i = 0; i < headers.length; i++) {
    var h = headers[i].toString().toLowerCase().trim();
    for (var j = 0; j < keywords.length; j++) {
      if (h.indexOf(keywords[j].toLowerCase()) !== -1) {
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
