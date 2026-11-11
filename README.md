# Review SWU Free Elective

เว็บไซต์สำหรับนักศึกษา มหาวิทยาลัยศรีนครินทรวิโรฒ (มศว) ในการแบ่งปันและค้นหารีวิวรายวิชาศึกษาทั่วไป / วิชาเลือกเสรี

---

## 🎨 ระบบสีและธีม (Color Scheme)

เว็บไซต์ใช้ชุดสีเอกลักษณ์ตามข้อกำหนด (แบบสีเรียบ ไม่มี Gradient / No Gradients):
- **Red:** `#DA2128` (สีแดงหลัก มศว สำหรับปุ่ม, badges, คะแนนไฮไลท์)
- **Grey:** `#636466` (สีเทาสำหรับข้อความรอง, badges, กรอบ)
- **Black:** `#231F20` (สีดำสำหรับแถบ Navigation bar, ส่วนหัว Hero/Header, Footer และหัวข้อหลัก)
- **White:** `#FFFFFF` (พื้นหลังการ์ดรีวิวและฟอร์ม)

---

## 🚀 วิธีรันเว็บไซต์บนเครื่อง (Local)

เว็บไซต์นี้พัฒนาด้วย **HTML5 + CSS3 + Vanilla JavaScript** ไม่ต้องติดตั้ง dependencies หรือ build tools ใด ๆ

### วิธีที่ 1 — Python 3 (แนะนำ)

```bash
cd /Users/yuni/SWU-Free-Elective-Review
python3 -m http.server 8000
```
เปิดเบราว์เซอร์ไปที่: **http://localhost:8000**

### วิธีที่ 2 — VS Code Live Server

คลิกขวาที่ `index.html` → เลือก **"Open with Live Server"**

---

## 📁 โครงสร้างโปรเจกต์

```
SWU-Free-Elective-Review/
│
├── index.html          ← หน้าหลัก (ค้นหา, ตัวกรองคณะ, แสดงการ์ดรีวิว)
├── review.html         ← หน้าส่งรีวิว (ฟอร์มให้คะแนน 5 มิติ + เขียนรีวิว)
├── README.md           ← คู่มือการใช้งานและเอกสารระบบ
│
├── css/
│   └── style.css       ← สไตล์ชีตหลัก (โทนสี #DA2128, #636466, #231F20 ไร้ Gradient)
│
├── js/
│   ├── courses.js      ← 📌 ฐานข้อมูลรายวิชาหลัก (Master Course Database)
│   ├── storage.js      ← ระบบค้นหาและบันทึกข้อมูล (localStorage Layer)
│   ├── home.js         ← จัดการหน้าหลัก ค้นหาแบบเรียลไทม์ และ Render การ์ด
│   └── review.js       ← จัดการฟอร์ม Dropdown คณะ→วิชา และ Validation
│
└── assets/
    └── README.txt
```

---

## 📚 ฐานข้อมูลรายวิชา (Master Course Database)

ข้อมูลรายวิชาและคณะถูกจัดเก็บแยกจากส่วนติดต่อผู้ใช้ (UI) อย่างชัดเจนในไฟล์ **`js/courses.js`** เพื่อความสะดวกในการเพิ่ม/แก้ไขในอนาคต

### โครงสร้างข้อมูลรายวิชา:
```json
{
  "course_id": "สสน01",
  "course_code": "ZIL01",
  "name_th": "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
  "name_en": "Job and Personal Financial Management to Reinforce Life Stability"
}
```

- มีรายวิชาจริงครบตามฐานข้อมูลทั้ง 23 คณะ/ส่วนงาน
- คณะที่ยังไม่มีวิชาเปิดรับรีวิวจะคง array `courses: []` ว่างไว้ตามข้อกำหนด

---

## 🔍 ฟังก์ชันการค้นหา (Search Functionality)

ผู้ใช้สามารถค้นหารีวิวได้ทันที (Live Search) โดยรองรับ:
1. **รหัสวิชาภาษาไทย** เช่น `สสน01`, `สวน03`, `สวศ08`, `สมน14`
2. **รหัสวิชาภาษาอังกฤษ** เช่น `ZIL01`, `ZCO03`, `ZEG08`, `ZHM14`
3. **ชื่อวิชาภาษาไทย** เช่น `การเงิน`, `พูดเด่น`, `โค้ดดิ้ง`, `เกาหลี`
4. **ชื่อวิชาภาษาอังกฤษ** เช่น `Financial`, `Super Star`, `Coding`, `Korean`
5. **ชื่อคณะ/ส่วนงาน** เช่น `Innovative Learning Center`, `Faculty of Engineering`
6. **คำค้นหาในเนื้อหารีวิว** และ **ชื่อผู้รีวิว**

> การค้นหารองรับทั้งตัวพิมพ์เล็ก-ใหญ่ (Case-Insensitive) สำหรับภาษาอังกฤษ และค้นหาแบบคำบางส่วน (Partial keyword matching) พร้อมทำงานร่วมกับตัวกรองคณะได้อย่างสมบูรณ์

---

## 💾 การจัดเก็บข้อมูลรีวิว (localStorage)

ข้อมูลรีวิวถูกบันทึกลงใน **`localStorage`** ของเบราว์เซอร์ ภายใต้คีย์ `swu_reviews`

```json
{
  "reviewId": "rev_m6j_abc12",
  "displayName": "เด็กปี 2 สายชิล",
  "faculty": "Innovative Learning Center",
  "course_id": "สสน01",
  "course_code": "ZIL01",
  "name_th": "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
  "name_en": "Job and Personal Financial Management to Reinforce Life Stability",
  "credits": 4,
  "learningFormat": "Onsite",
  "classSchedule": "จันทร์ 09:00–12:00",
  "attendance": "มีการเช็คชื่อ",
  "ratings": {
    "contentClarity": 5,
    "workloadAppropriateness": 5,
    "examEase": 4,
    "instructorKindness": 5,
    "gradingEase": 5
  },
  "writtenReview": "...",
  "createdAt": "2026-11-10T10:00:00.000Z"
}
```

> **หมายเหตุสำคัญ:** ข้อมูลใน `localStorage` ถูกจัดเก็บบนเครื่องและเบราว์เซอร์ปัจจุบันเท่านั้น จะไม่ซิงก์ข้ามเครื่องหรือข้ามผู้ใช้ หากต้องการแชร์รีวิวร่วมกันจริงในอนาคต สามารถเชื่อมต่อ REST API หรือ Cloud Database ได้ทันทีโดยโครงสร้างข้อมูลถูกเตรียมไว้พร้อมแล้ว
