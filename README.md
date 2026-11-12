# Review SWU Free Elective (SWU Free Elective Review)

เว็บแอปพลิเคชันสำหรับนิสิต/นักศึกษา มหาวิทยาลัยศรีนครินทรวิโรฒ (มศว) ในการแบ่งปันและค้นหารีวิวรายวิชาศึกษาทั่วไปและวิชาเลือกเสรี พร้อมระบบเชื่อมต่อคลาวด์ Google Sheets แบบสองทิศทาง (Real-time Cloud Sync)

---

## ✨ ไฮไลต์ฟีเจอร์เด่น (Key Features)

1. **คลังรายวิชาเสรี มศว สมบูรณ์ (Master Course Database):**
   - รวบรวมรายวิชาจริงครบทั้ง **23 คณะ/ส่วนงาน รวม 253 รายวิชา**
   - รองรับทั้งรหัสวิชาภาษาไทย (เช่น `สสน01`, `สวน03`, `สวศ08`), รหัสภาษาอังกฤษ (เช่น `ZIL01`, `ZCO03`, `ZEG08`) พร้อมชื่อวิชาภาษาไทยและอังกฤษ
2. **ระบบค้นหาและตัวกรองแบบเรียลไทม์ (Live Search & Filter):**
   - ค้นหาได้ทันใจ ทั้งรหัสวิชา (ไทย/อังกฤษ), ชื่อวิชา (ไทย/อังกฤษ), ชื่อคณะ, คำค้นหาในเนื้อหารีวิว และชื่อผู้รีวิว
   - กรองตามคณะแบบไดนามิก พร้อมระบุจำนวนวิชาในแต่ละคณะ
3. **ระบบการให้คะแนน 5 มิติ (5-Dimension Ratings):**
   - 🎯 ความเข้าใจเนื้อหา (Content Clarity)
   - ⚖️ ภาระงานและความเหมาะสม (Workload Appropriateness)
   - 📝 ความง่ายของข้อสอบ (Exam Ease)
   - ❤️ ความใจดี/เข้าถึงง่ายของผู้สอน (Instructor Kindness)
   - 🌟 ความง่ายในการตัดเกรด/เก็บ A (Grading Ease)
4. **รายละเอียดการเรียนที่ครบถ้วน:**
   - จำนวนหน่วยกิต (4 หรือ 6 หน่วยกิต)
   - รูปแบบการเรียน (Online, Onsite, Hybrid)
   - ตัวเลือกช่วงเวลาเรียนมาตรฐาน (เช่น 09:00 - 12:00) พร้อมระบบตรวจสอบเวลาเริ่มต้น-สิ้นสุดอัตโนมัติ
   - การเช็คชื่อเข้าเรียน
5. **ระบบจัดเก็บข้อมูลแบบไฮบริด (Hybrid Storage: Cloud + Local):**
   - **Google Sheets Cloud Integration:** เชื่อมต่อกับ Google Apps Script Web App เมื่อมีผู้ส่งรีวิว ข้อมูลจะซิงก์เข้า Google Sheets อัตโนมัติ และดึงรีวิวอัปเดตตรงกันจากทุกเครื่องทันที
   - **localStorage Fallback:** มีระบบแคชบนเครื่อง ทำให้โหลดหน้าเว็บได้อย่างรวดเร็วและใช้งานแบบออฟไลน์ได้
6. **ดีไซน์ตามเอกลักษณ์ มศว (Brand Color Identity):**
   - ออกแบบตามโทนสีเอกลักษณ์ แดง-เทา-ดำ แบบสีเรียบไร้ Gradient (No Gradients) ตามมาตรฐานความคมชัดและอ่านง่าย (Accessible & Modern)

---

## 🎨 ระบบสีและธีม (Color Scheme)

เว็บไซต์ใช้ชุดสีเอกลักษณ์ตามข้อกำหนด (แบบสีเรียบ ไม่มี Gradient):
- **Red:** `#DA2128` (สีแดงหลัก มศว สำหรับปุ่ม CTA, badges เด่น, ไฮไลต์คะแนน)
- **Grey:** `#636466` (สีเทาสำหรับข้อความรอง, badges คณะ, เส้นขอบ)
- **Black:** `#231F20` (สีดำเข้มสำหรับ Navbar, Hero/Header, Footer และหัวข้อหลัก)
- **White:** `#FFFFFF` (สีขาวพื้นหลังการ์ดรีวิวและฟอร์ม)

---

## 🚀 วิธีรันเว็บไซต์บนเครื่อง (Local Development)

โปรเจกต์นี้พัฒนาด้วย **HTML5 + Vanilla CSS3 + Vanilla JavaScript** ไม่ต้องติดตั้ง Node.js หรือ build tools ใด ๆ สามารถเปิดผ่านเว็บเซิร์ฟเวอร์ใดก็ได้:

### วิธีที่ 1 — VS Code Live Server (แนะนำสำหรับพัฒนา)
1. เปิดโฟลเดอร์โปรเจกต์ใน Visual Studio Code
2. คลิกขวาที่ไฟล์ `index.html` → เลือก **"Open with Live Server"**

### วิธีที่ 2 — รันผ่าน Python
```bash
# ย้ายเข้าโฟลเดอร์โปรเจกต์
cd SWU-Free-Elective-Review

# รันคำสั่งเว็บเซิร์ฟเวอร์
python -m http.server 8000
```
เปิดเบราว์เซอร์ไปที่: **http://localhost:8000**

### วิธีที่ 3 — รันผ่าน Node.js (npx)
```bash
npx serve .
```

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
SWU-Free-Elective-Review/
│
├── index.html                  # หน้าหลัก (Hero, ตัวนับสถิติ, ค้นหา & ตัวกรองคณะ, การ์ดรีวิว)
├── review.html                 # หน้าฟอร์มส่งรีวิว (เลือกคณะ/วิชา, เกณฑ์ 5 มิติ, เวลาเรียน)
├── GoogleAppsScript_Code.gs    # โค้ด Google Apps Script สำหรับเชื่อมต่อ Google Sheets เป็น Backend
├── README.md                   # เอกสารคู่มือและการติดตั้งโปรเจกต์
│
├── css/
│   └── style.css               # สไตล์ชีตหลัก (ระบบสี #DA2128, #636466, #231F20 ไร้ Gradient)
│
├── js/
│   ├── courses.js              # 📌 ฐานข้อมูลรายวิชาหลัก (23 คณะ 253 รายวิชา)
│   ├── storage.js              # เลเยอร์จัดการข้อมูล (Google Sheets Web App + localStorage)
│   ├── home.js                 # จัดการการค้นหา, ตัวกรอง, การ Render การ์ดรีวิว และสถิติ
│   └── review.js               # จัดการฟอร์มส่งรีวิว, Dropdown สัมพันธ์, และ Time Picker
│
└── assets/
    └── README.txt              # โฟลเดอร์สำหรับเก็บภาพหรือไอคอนเพิ่มเติม
```

---

## ☁️ การเชื่อมต่อ Google Sheets เป็น Cloud Backend

โปรเจกต์รองรับการซิงก์ข้อมูลรีวิวจากผู้ใช้ทุกคนเข้าสู่ Google Sheets แบบ Real-time ผ่าน Google Apps Script:

### วิธีตั้งค่า Google Sheets:
1. สร้าง Google Sheet แผ่นใหม่บน Google Drive ตั้งชื่อเช่น `SWU Free Elective Reviews`
2. เมนูด้านบนเลือก: **ส่วนขยาย (Extensions)** → **Apps Script**
3. คัดลอกโค้ดทั้งหมดจากไฟล์ `GoogleAppsScript_Code.gs` ไปวางแทนที่ในโปรเจกต์ Apps Script แล้วกดบันทึก 💾
4. **สร้างโครงสร้างตารางเริ่มต้น:**
   - ตรงเมนูฟังก์ชันด้านบน เลือก `setupCleanSheet` แล้วกด **เรียกใช้ (Run)** 1 ครั้ง
   - กดยอมรับสิทธิ์ (Authorize) สคริปต์จะสร้างหัวตารางและใส่ตัวอย่างรีวิวให้ทันที
5. **เผยแพร่เป็น Web App:**
   - กดปุ่ม **การทำให้ใช้งานได้ (Deploy)** มุมบนขวา → **การทำให้ใช้งานได้รายการใหม่ (New deployment)**
   - เลือกประเภทเป็น **เว็บแอป (Web app)**
   - กำหนดสิทธิ์:
     - *ปฏิบัติการในฐานะ (Execute as):* **ฉัน (Me)**
     - *ผู้ที่มีสิทธิ์เข้าถึง (Who has access):* **ทุกคน (Anyone)** *(สำคัญมาก เพื่อให้หน้าเว็บส่งและดึงข้อมูลได้)*
   - กด **ทำให้ใช้งานได้ (Deploy)** และคัดลอก **URL ของเว็บแอป (Web App URL)** ที่ลงท้ายด้วย `/exec`
6. **ใส่ URL ในโปรเจกต์:**
   - เปิดไฟล์ `js/storage.js`
   - นำ Web App URL ไปวางที่ตัวแปร `GOOGLE_SCRIPT_URL`:
     ```javascript
     const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
     ```

---

## 📚 โครงสร้างข้อมูลรายวิชา (Course Data Schema)

ข้อมูลรายวิชาทั้งหมดถูกจัดเก็บแยกเป็นหมวดหมู่ใน `js/courses.js` เพื่อความสะดวกในการอัปเดต:

```json
{
  "course_id": "สสน01",
  "course_code": "ZIL01",
  "name_th": "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
  "name_en": "Job and Personal Financial Management to Reinforce Life Stability"
}
```

---

## 💾 โครงสร้างข้อมูลรีวิว (Review Data Schema)

ข้อมูลที่บันทึกลง Google Sheets และ `localStorage` มีฟิลด์ดังนี้:

```json
{
  "reviewId": "rev_1731435600000_abc12",
  "displayName": "เด็ก มศว ปี 2",
  "faculty": "สำนักนวัตกรรมการเรียนรู้",
  "course_id": "สสน01",
  "course_code": "ZIL01",
  "name_th": "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
  "name_en": "Job and Personal Financial Management to Reinforce Life Stability",
  "credits": 4,
  "learningFormat": "Onsite",
  "classSchedule": "09:00 - 12:00",
  "attendance": "มีการเช็คชื่อ",
  "ratings": {
    "contentClarity": 5,
    "workloadAppropriateness": 5,
    "examEase": 4,
    "instructorKindness": 5,
    "gradingEase": 5
  },
  "writtenReview": "อาจารย์ใจดีมาก งานไม่เยอะ ได้ข้อคิดการเงินที่ดี...",
  "createdAt": "2026-11-12T10:00:00.000Z"
}
```

---

## 🤝 การมีส่วนร่วมและการพัฒนาต่อยอด (Contributing)

- นิสิตและผู้สนใจสามารถ Fork หรือส่ง Pull Request เพื่อเพิ่มรายวิชาใหม่ใน `js/courses.js` หรือปรับปรุง UI/UX
- สำหรับข้อเสนอแนะหรือแจ้งปัญหา สามารถเปิด Issue ใน GitHub Repository ได้เลย!
