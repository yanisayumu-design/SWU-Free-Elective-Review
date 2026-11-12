/**
 * courses.js — Master Course Catalog Database
 *
 * Stores the master course database separately from UI components.
 * To add or edit faculties and courses, update COURSE_DATABASE below.
 */

const COURSE_DATABASE = {
  "faculties": [
    {
      "faculty_name": "สำนักนวัตกรรมการเรียนรู้",
      "courses": [
        {
          "course_id": "สสน01",
          "course_code": "ZIL01",
          "name_th": "การจัดการงานและการเงินส่วนบุคคลเพื่อเสริมความมั่นคงในชีวิต",
          "name_en": "Job and Personal Financial Management to Reinforce Life Stability"
        },
        {
          "course_id": "สสน02",
          "course_code": "ZIL02",
          "name_th": "ออกแบบความรัก",
          "name_en": "Love Design"
        },
        {
          "course_id": "สสน03",
          "course_code": "ZIL03",
          "name_th": "การจัดการความขัดแย้งและการเจรจาต่อรองอย่างมืออาชีพ",
          "name_en": "Conflict Management and Professional Negotiation"
        },
        {
          "course_id": "สสน04",
          "course_code": "ZIL04",
          "name_th": "โลกศึกษา",
          "name_en": "Global Studies"
        },
        {
          "course_id": "สสน05",
          "course_code": "ZIL05",
          "name_th": "การบริหารโครงการ",
          "name_en": "Project Management"
        },
        {
          "course_id": "สสน06",
          "course_code": "ZIL06",
          "name_th": "การพัฒนานวัตกรรมสู่วิสาหกิจเริ่มต้น",
          "name_en": "Innovation to Startup"
        },
        {
          "course_id": "สสน07",
          "course_code": "ZIL07",
          "name_th": "การศึกษาทางสังคมด้วยกระบวนการวิจัย",
          "name_en": "Social Study by Research"
        },
        {
          "course_id": "สสน08",
          "course_code": "ZIL08",
          "name_th": "ศาสตร์และศิลป์แห่งความสำเร็จ",
          "name_en": "Science and Art of Success"
        },
        {
          "course_id": "สสน09",
          "course_code": "ZIL09",
          "name_th": "เชื่อเป็น อยู่ได้",
          "name_en": "The Literacy of Believing and Living"
        },
        {
          "course_id": "สสน10",
          "course_code": "ZIL10",
          "name_th": "การทำโพลล์",
          "name_en": "Polling"
        },
        {
          "course_id": "สสน11",
          "course_code": "ZIL11",
          "name_th": "พัฒนาอัจฉริยภาพสมอง",
          "name_en": "Smart Brain"
        },
        {
          "course_id": "สสน12",
          "course_code": "ZIL12",
          "name_th": "การรับสารอย่างทรงพลัง",
          "name_en": "Receiving the message in a powerful way"
        },
        {
          "course_id": "สสน13",
          "course_code": "ZIL13",
          "name_th": "การรับสารอย่างทรงพลัง",
          "name_en": "Receiving the message in a powerful way"
        },
        {
          "course_id": "สสน14",
          "course_code": "ZIL14",
          "name_th": "บอร์ดเกมเชิงกลยุทธ์เพื่อพัฒนาทักษะการแก้ปัญหา",
          "name_en": "Strategic Board Games for Problem-Solving Skills"
        }
      ]
    },
    {
      "faculty_name": "วิทยาลัยนวัตกรรมสื่อสารสังคม",
      "courses": [
        {
          "course_id": "สวน01",
          "course_code": "ZCO01",
          "name_th": "สื่อในชีวิตประจำวัน",
          "name_en": "Media in Daily Life"
        },
        {
          "course_id": "สวน02",
          "course_code": "ZCO02",
          "name_th": "ภาพยนตร์และสื่อดิจิทัล",
          "name_en": "Cinema and Digital Media"
        },
        {
          "course_id": "สวน03",
          "course_code": "ZCO03",
          "name_th": "พูดเด่นให้เป็นดาว",
          "name_en": "Speak Like A Super Star"
        },
        {
          "course_id": "สวน04",
          "course_code": "ZCO04",
          "name_th": "การพัฒนาภาพลักษณ์ส่วนบุคคล",
          "name_en": "Personal Image Development"
        },
        {
          "course_id": "สวน05",
          "course_code": "ZCO05",
          "name_th": "การออกแบบเพื่อธุรกิจดิจิทัล",
          "name_en": "Digital Business Design"
        },
        {
          "course_id": "สวน06",
          "course_code": "ZCO06",
          "name_th": "แนวคิดเพื่อธุรกิจดิจิทัล",
          "name_en": "Digital Business Concept"
        },
        {
          "course_id": "สวน07",
          "course_code": "ZCO07",
          "name_th": "ภาพยนตร์สารคดีในชีวิตดิจิทัล",
          "name_en": "Documentary in Digital Life"
        },
        {
          "course_id": "สวน08",
          "course_code": "ZCO08",
          "name_th": "การเขียนสคริปต์ขั้นพื้นฐานเพื่อสื่อภาพเคลื่อนไหว",
          "name_en": "Introduction to Script Writing for Moving Image Media"
        },
        {
          "course_id": "สวน09",
          "course_code": "ZCO09",
          "name_th": "ครีเอทีฟคอนเทนต์และการออกแบบสื่อดิจิทัล",
          "name_en": "Creative Content and Digital Media Design"
        },
        {
          "course_id": "สวน10",
          "course_code": "ZCO10",
          "name_th": "สังเวียนนักพูด",
          "name_en": "Speech Fighter"
        }
      ]
    },
    {
      "faculty_name": "คณะเภสัชศาสตร์",
      "courses": [
        {
          "course_id": "สภส01",
          "course_code": "ZPH01",
          "name_th": "กูรู กูรู้ ยาและสมุนไพร",
          "name_en": "Drug and Herb Guru"
        },
        {
          "course_id": "สภส02",
          "course_code": "ZPH02",
          "name_th": "อโรมาและสปาที่บ้าน",
          "name_en": "Aroma and Spa at Home"
        },
        {
          "course_id": "สภส03",
          "course_code": "ZPH03",
          "name_th": "การเดินทางของกัญชา กัญชง กระท่อมทางการแพทย์และเภสัชกรรม",
          "name_en": "Journey of Cannabis, Hemp and Kratom for medical and pharmaceutical uses"
        },
        {
          "course_id": "สภส04",
          "course_code": "ZPH04",
          "name_th": "สารพัดพิษภัย",
          "name_en": "All about poisons and dangers"
        }
      ]
    },
    {
      "faculty_name": "คณะศิลปกรรมศาสตร์",
      "courses": [
        {
          "course_id": "สศก01",
          "course_code": "ZFA01",
          "name_th": "ศิลปะสร้างสรรค์และนวัตกรรมเพื่องานศิลปะ",
          "name_en": "Creative Art and Innovation for Art"
        },
        {
          "course_id": "สศก02",
          "course_code": "ZFA02",
          "name_th": "การบรรเลงไวโอลินขั้นพื้นฐาน",
          "name_en": "Basic Violin Practicum"
        },
        {
          "course_id": "สศก03",
          "course_code": "ZFA03",
          "name_th": "การออกแบบสื่อสารที่จำเป็น",
          "name_en": "Essential Communication Design"
        },
        {
          "course_id": "สศก04",
          "course_code": "ZFA04",
          "name_th": "เสน่ห์ลูกทุ่งไทย",
          "name_en": "Charm of Thai Folk Song"
        },
        {
          "course_id": "สศก05",
          "course_code": "ZFA05",
          "name_th": "การแต่งหน้า แต่งกายนาฏศิลป์ไทย",
          "name_en": "Make-up and Costume for Thai Dance"
        },
        {
          "course_id": "สศก06",
          "course_code": "ZFA06",
          "name_th": "การสร้างสรรค์ละครเวทีในการศึกษา",
          "name_en": "Creative Theatre in Education"
        },
        {
          "course_id": "สศก07",
          "course_code": "ZFA07",
          "name_th": "การเต้นแจ๊ส",
          "name_en": "Jazz Dance"
        },
        {
          "course_id": "สศก08",
          "course_code": "ZFA08",
          "name_th": "การเต้นเพื่อการออกกำลังกายสำหรับผู้เริ่มต้น",
          "name_en": "Dance Fitness for Beginner"
        },
        {
          "course_id": "สศก09",
          "course_code": "ZFA09",
          "name_th": "ดนตรีไทยปรีดิ์เปรม",
          "name_en": "Enjoyment of Thai Music"
        },
        {
          "course_id": "สศก10",
          "course_code": "ZFA10",
          "name_th": "ศิลปศึกษาสัมพันธ์",
          "name_en": "Art Education Relations"
        },
        {
          "course_id": "สศก11",
          "course_code": "ZFA11",
          "name_th": "ศิลปะรับใช้สังคม",
          "name_en": "Art for Society"
        },
        {
          "course_id": "สศก12",
          "course_code": "ZFA12",
          "name_th": "กิจกรรมศิลปะสร้างสรรค์",
          "name_en": "Creative Arts Activities"
        },
        {
          "course_id": "สศก13",
          "course_code": "ZFA13",
          "name_th": "ศิลปบำบัด",
          "name_en": "Art Therapy"
        },
        {
          "course_id": "สศก14",
          "course_code": "ZFA14",
          "name_th": "จิตรกรรม 2 มิติ",
          "name_en": "2 Dimensions Painting"
        },
        {
          "course_id": "สศก15",
          "course_code": "ZFA15",
          "name_th": "เรื่องง่าย ๆ ของออกแบบภายใน",
          "name_en": "Simple Matters of Interior Design"
        },
        {
          "course_id": "สศก16",
          "course_code": "ZFA16",
          "name_th": "การออกแบบกิจกรรมศิลปะบำบัดและนวัตกรรมเชิงสร้างสรรค์",
          "name_en": "Designing Arts Therapeutic Activities and Creative Innovations"
        },
        {
          "course_id": "สศก17",
          "course_code": "ZFA17",
          "name_th": "ร้องประสานสร้างพลัง",
          "name_en": "Harmony Power"
        }
      ]
    },
    {
      "faculty_name": "สำนักทดสอบทางการศึกษาและจิตวิทยา",
      "courses": [
        {
          "course_id": "สทส01",
          "course_code": "ZTB01",
          "name_th": "ศาสตร์แห่งการทำนายลักษณะนิสัย",
          "name_en": "The science of character prediction"
        },
        {
          "course_id": "สทส02",
          "course_code": "ZTB02",
          "name_th": "เคล็ดลับ HR สรรหาและคัดเลือกคน",
          "name_en": "HR Tips for Recruitment and Selection"
        },
        {
          "course_id": "สทส03",
          "course_code": "ZTB03",
          "name_th": "ประเมินบุคลากรให้คนสำราญ งานสำเร็จ",
          "name_en": "Personnel Evaluation for Happiness and Successful"
        }
      ]
    },
    {
      "faculty_name": "คณะวิศวกรรมศาสตร์",
      "courses": [
        {
          "course_id": "สวศ01",
          "course_code": "ZEG01",
          "name_th": "ระบบลีนเพื่อการปรับปรุงงาน",
          "name_en": "Lean for work improvement"
        },
        {
          "course_id": "สวศ02",
          "course_code": "ZEG02",
          "name_th": "ผู้ประกอบการอุตสาหกรรมพลาสติกรุ่นเยาว์ในยุคดิจิทัล",
          "name_en": "Young Plastic Industrial Entrepreneurs in Digital Age"
        },
        {
          "course_id": "สวศ03",
          "course_code": "ZEG03",
          "name_th": "อินเทอร์เน็ตทุกสรรพสิ่งสำหรับเทคโนโลยีอัจฉริยะ",
          "name_en": "Internet of Things for Smart Technology"
        },
        {
          "course_id": "สวศ04",
          "course_code": "ZEG04",
          "name_th": "การพัฒนาและประยุกต์ใช้นวัตกรรมดูแลสุขภาพและความปลอดภัยสำหรับทุกช่วงวัย",
          "name_en": "Development and apply innovation for health and security of all age"
        },
        {
          "course_id": "สวศ05",
          "course_code": "ZEG05",
          "name_th": "การประมวลผลภาพและสัญญาณสำหรับวิศวกรรมชีวการแพทย์",
          "name_en": "Image and Signal for Biomedical Engineering"
        },
        {
          "course_id": "สวศ06",
          "course_code": "ZEG06",
          "name_th": "หลักการวิศวกรรมฟื้นฟูและการวิเคราะห์ไฟไนต์เอลิเมนต์สำหรับปัญหาทางชีวกลศาสตร์",
          "name_en": "Principle of Rehabilitation Engineering and Finite Element Analysis for Biomechanics Applications"
        },
        {
          "course_id": "สวศ07",
          "course_code": "ZEG07",
          "name_th": "เทคโนโลยีการเงินและการลงทุนในยุคดิจิทัล",
          "name_en": "Technological Finance and Investment in Digital Era"
        },
        {
          "course_id": "สวศ08",
          "course_code": "ZEG08",
          "name_th": "ก้าวแรกสู่การคิดเชิงคำนวณและโค้ดดิ้ง",
          "name_en": "First Step to Computational Thinking and Coding"
        },
        {
          "course_id": "สวศ09",
          "course_code": "ZEG09",
          "name_th": "ระบบ เครื่องมือและอุปกรณ์สำหรับบุคลากรทางการแพทย์ในสถานบริการสุขภาพ",
          "name_en": "Systems, Devices and Instruments for Medical Personnel in Health Care Center"
        },
        {
          "course_id": "สวศ10",
          "course_code": "ZEG10",
          "name_th": "พื้นฐานการสร้างนวัตกรรมทางการแพทย์",
          "name_en": "Basic Creation of Medical Innovation"
        },
        {
          "course_id": "สวศ11",
          "course_code": "ZEG11",
          "name_th": "เรียนสนุกกับเซรามิคและขนม",
          "name_en": "Learn and Play Ceramic and Bakery"
        },
        {
          "course_id": "สวศ12",
          "course_code": "ZEG12",
          "name_th": "บรรจุภัณฑ์ดินเผา รักษ์สิ่งแวดล้อม",
          "name_en": "Green Pottery Clay Packaging"
        },
        {
          "course_id": "สวศ13",
          "course_code": "ZEG13",
          "name_th": "การคิดเชิงออกแบบและการขายสำหรับธุรกิจสตาร์ทอัพ",
          "name_en": "Design Thinking and Sales for Startups"
        },
        {
          "course_id": "สวศ14",
          "course_code": "ZEG14",
          "name_th": "สร้างเป็นผู้ประกอบการในธุรกิจยานยนตร์ 1",
          "name_en": "Entrepreneurial lessons for automotive business 1"
        }
      ]
    },
    {
      "faculty_name": "วิทยาลัยนานาชาติเพื่อศึกษาความยั่งยืน",
      "courses": [
        {
          "course_id": "สวย01",
          "course_code": "ZST01",
          "name_th": "ทัวร์อร่อยย่อยให้ทัน",
          "name_en": "Foodie Tour"
        },
        {
          "course_id": "สวย02",
          "course_code": "ZST02",
          "name_th": "การสื่อสารระหว่างวัฒนธรรมอย่างมีสไตล์",
          "name_en": "Stylish Intercultural Communication"
        },
        {
          "course_id": "สวย03",
          "course_code": "ZST03",
          "name_th": "ความยั่งยืนในชีวิตประจำวัน",
          "name_en": "Sustainability for Everyday Life"
        },
        {
          "course_id": "สวย04",
          "course_code": "ZST04",
          "name_th": "ภาษาอังกฤษเพื่อการเตรียมสอบ TOEIC",
          "name_en": "English for TOEIC Preparation"
        },
        {
          "course_id": "สวย05",
          "course_code": "ZST05",
          "name_th": "ภาษาอังกฤษเชิงวิชาการ",
          "name_en": "Academic English"
        },
        {
          "course_id": "สวย06",
          "course_code": "ZST06",
          "name_th": "ภาษาอังกฤษเพื่อการเตรียมสอบ IELTS",
          "name_en": "English for IELTS Preparation"
        },
        {
          "course_id": "สวย07",
          "course_code": "ZST07",
          "name_th": "ภาษาอังกฤษเพื่อการเตรียมสอบ TOEFL",
          "name_en": "English for TOEFL Preparation"
        },
        {
          "course_id": "สวย08",
          "course_code": "ZST08",
          "name_th": "พหุพลวัตภาษาอังกฤษโลกในห้องเรียนภาษาอังกฤษ",
          "name_en": "Global Englishes in English Classroom"
        },
        {
          "course_id": "สวย09",
          "course_code": "ZST09",
          "name_th": "การเสริมสร้างสมรรถนะทางด้านภาษาอังกฤษสู่ความสำเร็จในอาชีพ",
          "name_en": "Building English Competency as a Pathway to Professional Success"
        }
      ]
    },
    {
      "faculty_name": "คณะเทคโนโลยีและนวัตกรรมผลิตภัณฑ์การเกษตร",
      "courses": [
        {
          "course_id": "สทก01",
          "course_code": "ZAI01",
          "name_th": "ผู้บริโภคอาหารมืออาชีพ",
          "name_en": "Food Prosumer"
        },
        {
          "course_id": "สทก02",
          "course_code": "ZAI02",
          "name_th": "รสชาติแห่งสวรรค์",
          "name_en": "Taste Of Paradise"
        },
        {
          "course_id": "สทก03",
          "course_code": "ZAI03",
          "name_th": "พลาสติกและการยกระดับพลาสติกรีไซเคิล",
          "name_en": "Plastics And Upcycling"
        },
        {
          "course_id": "สทก04",
          "course_code": "ZAI04",
          "name_th": "มัดย้อม DIY",
          "name_en": "DIY Tied Dyeing"
        },
        {
          "course_id": "สทก05",
          "course_code": "ZAI05",
          "name_th": "งานประดิษฐ์จากยาง",
          "name_en": "Craft from Rubber"
        },
        {
          "course_id": "สทก06",
          "course_code": "ZAI06",
          "name_th": "สูตรลับแห่งความสำเร็จในธุรกิจอาหาร",
          "name_en": "Secret Recipe for Success in Food Business"
        },
        {
          "course_id": "สทก07",
          "course_code": "ZAI07",
          "name_th": "เครื่องดื่มแห่งสวรรค์",
          "name_en": "Drinks of Paradise"
        },
        {
          "course_id": "สทก08",
          "course_code": "ZAI08",
          "name_th": "หล่อได้เรื่อง",
          "name_en": "Cast for Craft"
        },
        {
          "course_id": "สทก09",
          "course_code": "ZAI09",
          "name_th": "นักสืบอาหาร: ไขความลับอาหารในชีวิตประจำวัน",
          "name_en": "Food Detective: Unlocking the Secrets of Everyday Food"
        }
      ]
    },
    {
      "faculty_name": "คณะทันตแพทยศาสตร์",
      "courses": [
        {
          "course_id": "สทต01",
          "course_code": "ZDT01",
          "name_th": "สุขภาพและสุขภาวะช่องปาก",
          "name_en": "Oral Health and Wellness"
        },
        {
          "course_id": "สทต02",
          "course_code": "ZDT02",
          "name_th": "ยิ้มสเน่ห์",
          "name_en": "Charming smile"
        },
        {
          "course_id": "สทต03",
          "course_code": "ZDT03",
          "name_th": "การเสริมสร้างคุณค่า และพัฒนาบุคลิกภาพตนเองในศตวรรษที่ 21",
          "name_en": "Personality Empowering and Personality Development in the 21st Century"
        }
      ]
    },
    {
      "faculty_name": "คณะศึกษาศาสตร์",
      "courses": [
        {
          "course_id": "สศษ01",
          "course_code": "ZED01",
          "name_th": "จิตวิทยาแห่งความสมดุลในชีวิต",
          "name_en": "The Psychology of Life Balance"
        },
        {
          "course_id": "สศษ02",
          "course_code": "ZED02",
          "name_th": "นักสร้างเกมกระดาน",
          "name_en": "Board Game Creator"
        },
        {
          "course_id": "สศษ03",
          "course_code": "ZED03",
          "name_th": "การจัดการเรียนรู้ทางการศึกษาพิเศษ",
          "name_en": "Learning Management in Special Education"
        },
        {
          "course_id": "สศษ04",
          "course_code": "ZED04",
          "name_th": "นันทนาการ เกม และการบำบัดทางเลือกสำหรับผู้เรียนที่มีความต้องการพิเศษ",
          "name_en": "Recreation Activities, Games, and Alternative Therapies for Learners with Special Needs"
        },
        {
          "course_id": "สศษ05",
          "course_code": "ZED05",
          "name_th": "การวิจัยเพื่อพัฒนาการเรียนรู้และสังคม",
          "name_en": "Research for Learning and Social Development"
        },
        {
          "course_id": "สศษ06",
          "course_code": "ZED06",
          "name_th": "นวัตกรรมหลักสูตรเพื่อการพัฒนาที่ยั่งยืน",
          "name_en": "Curriculum Innovation for Sustainable Development"
        },
        {
          "course_id": "สศษ07",
          "course_code": "ZED07",
          "name_th": "การจัดการเรียนรู้โลกยุคดิจิทัล",
          "name_en": "Learning in the Digital Age"
        },
        {
          "course_id": "สศษ08",
          "course_code": "ZED08",
          "name_th": "การศึกษาตลอดชีวิตเพื่อการพัฒนาที่ยั่งยืน",
          "name_en": "Lifelong Education for Sustainable Development"
        },
        {
          "course_id": "สศษ09",
          "course_code": "ZED09",
          "name_th": "การออกแบบกิจกรรมการเรียนรู้สำหรับผู้ใหญ่และผู้สูงอายุ",
          "name_en": "Designing Activities for Adults and Older Learners"
        },
        {
          "course_id": "สศษ10",
          "course_code": "ZED10",
          "name_th": "โลกของธุรกิจอาหารและบริการเพื่อการเป็นผู้ประกอบการ",
          "name_en": "The world of food and service businesses for entrepreneurship"
        },
        {
          "course_id": "สศษ11",
          "course_code": "ZED11",
          "name_th": "ภาพยนตร์ การศึกษา การพัฒนา และความยั่งยืน",
          "name_en": "Movies, Education, Development and Sustainable"
        }
      ]
    },
    {
      "faculty_name": "วิทยาลัยอุตสาหกรรมสร้างสรรค์",
      "courses": [
        {
          "course_id": "สวอ01",
          "course_code": "ZCI01",
          "name_th": "เริ่มต้นธุรกิจแฟชั่นสำหรับมือใหม่",
          "name_en": "Starting Fashion Business for Beginners"
        },
        {
          "course_id": "สวอ02",
          "course_code": "ZCI02",
          "name_th": "การออกแบบเครื่องตกแต่งแฟชั่น",
          "name_en": "Fashion Accessories Design"
        },
        {
          "course_id": "สวอ03",
          "course_code": "ZCI03",
          "name_th": "การออกแบบและงานไม้สำหรับผลิตภัณฑ์แต่งบ้าน",
          "name_en": "Designing and Wooding for Home Decore Product"
        },
        {
          "course_id": "สวอ04",
          "course_code": "ZCI04",
          "name_th": "การทำธุรกิจอัญมณีและเครื่องประดับสำหรับผู้ประกอบการใหม่ในยุค",
          "name_en": "Jewelry Business for Entrepreneurs in Digital Era"
        },
        {
          "course_id": "สวอ05",
          "course_code": "ZCI05",
          "name_th": "เทคนิคอย่างง่ายการดูเพชรดูพลอย",
          "name_en": "Easy Techniques to Identify Gemstone and Diamond"
        }
      ]
    },
    {
      "faculty_name": "สถาบันวิจัยพฤติกรรมศาสตร์",
      "courses": [
        {
          "course_id": "สวจ01",
          "course_code": "ZBR01",
          "name_th": "จิตวิทยาไซเบอร์ และการประยุกต์ใช้ปัญญาประดิษฐ์ในการเรียนและการทำงาน",
          "name_en": "Cyberpsychology and Artificial Intelligence Applications for Learning and Work"
        },
        {
          "course_id": "สวจ02",
          "course_code": "ZBR02",
          "name_th": "ความรอบรู้ด้านสุขภาพจิต แนวทางการดูแลและการจัดการสุขภาพจิตตนเอง",
          "name_en": "Mental Health Literacy, Self-Help Approach and Management"
        },
        {
          "course_id": "สวจ03",
          "course_code": "ZBR03",
          "name_th": "จิตวิทยาการทำงาน และความสามารถในการมีงานทำ",
          "name_en": "Work Psychology and Employability"
        }
      ]
    },
    {
      "faculty_name": "คณะแพทยศาสตร์",
      "courses": [
        {
          "course_id": "สพท01",
          "course_code": "ZMD01",
          "name_th": "สุขภาพดี ชีวีสดใส",
          "name_en": "Good health and Well being"
        },
        {
          "course_id": "สพท02",
          "course_code": "ZMD02",
          "name_th": "โรคฮิตติดชาร์ต",
          "name_en": "Top-chart disease"
        },
        {
          "course_id": "สพท03",
          "course_code": "ZMD03",
          "name_th": "การสร้างเสริมสุขภาพเด็ก",
          "name_en": "Health Promotion in Children"
        },
        {
          "course_id": "สพท04",
          "course_code": "ZMD04",
          "name_th": "การสร้างเสริมสุขภาพผู้สูงอายุ",
          "name_en": "Health Promotion in Elderly"
        }
      ]
    },
    {
      "faculty_name": "คณะกายภาพบำบัด",
      "courses": [
        {
          "course_id": "สกภ01",
          "course_code": "ZPC01",
          "name_th": "การสื่อสารสุขภาพเพื่อสร้างเสริมสุขภาวะ",
          "name_en": "Health Communication for Promote the Well-Being"
        },
        {
          "course_id": "สกภ02",
          "course_code": "ZPC02",
          "name_th": "สูงวัยแบบพฤฒิพลังในยุคดิจิทัล",
          "name_en": "Active Aging in the Digital Era"
        },
        {
          "course_id": "สกภ03",
          "course_code": "ZPC03",
          "name_th": "การจัดการอาการปวดจากออฟฟิศซินโดรมและการทรงท่าที่ผิด",
          "name_en": "Management of Pain from Office Syndrome and Postural Syndrome"
        },
        {
          "course_id": "สกภ04",
          "course_code": "ZPC04",
          "name_th": "คนรุ่นใหม่ใส่ใจผู้สูงวัยกลุ่มเปราะบาง",
          "name_en": "The New Generation Cares about the Fragile Elderly"
        },
        {
          "course_id": "สกภ05",
          "course_code": "ZPC05",
          "name_th": "จักรวาลฮีลใจ รู้จักฉัน รู้จักเธอ",
          "name_en": "Mental Healing Verse : Insight Me & You"
        }
      ]
    },
    {
      "faculty_name": "คณะบริหารธุรกิจเพื่อสังคม",
      "courses": [
        {
          "course_id": "สบธ01",
          "course_code": "ZBS01",
          "name_th": "ถอดรหัส Start-up",
          "name_en": "Decoding Start-up"
        },
        {
          "course_id": "สบธ02",
          "course_code": "ZBS02",
          "name_th": "รู้กำไร รู้ขาดทุน ธุรกิจอยู่รอด",
          "name_en": "Know the Profit, Know the Loss, The Business Survives"
        },
        {
          "course_id": "สบธ03",
          "course_code": "ZBS03",
          "name_th": "ตรวจสุขภาพธุรกิจ",
          "name_en": "Business Health Check"
        },
        {
          "course_id": "สบธ04",
          "course_code": "ZBS04",
          "name_th": "ขายยังไงไม่ให้เจ๊ง",
          "name_en": "How to Win in Sales"
        },
        {
          "course_id": "สบธ05",
          "course_code": "ZBS05",
          "name_th": "เครื่องจักรการตลาด",
          "name_en": "Marketing Machine"
        },
        {
          "course_id": "สบธ06",
          "course_code": "ZBS06",
          "name_th": "ปั้นพอร์ตให้สวยด้วยการลงทุน",
          "name_en": "Investing Guide to Achieve an Efficient Portfolio"
        },
        {
          "course_id": "สบธ07",
          "course_code": "ZBS07",
          "name_th": "การบริการที่เป็นเลิศสำหรับกลุ่มลูกค้าระดับบน",
          "name_en": "High-end Service Excellence"
        },
        {
          "course_id": "สบธ08",
          "course_code": "ZBS08",
          "name_th": "ธุรกิจไทยก้าวไกลระดับโลก",
          "name_en": "Stepping Thai Businesses Toward Globalization"
        },
        {
          "course_id": "สบธ09",
          "course_code": "ZBS09",
          "name_th": "ธุรกิจสร้างสุข",
          "name_en": "Business for Happiness"
        },
        {
          "course_id": "สบธ10",
          "course_code": "ZBS10",
          "name_th": "การสื่อสารภาษาจีนเพื่อการเอาตัวรอด",
          "name_en": "Survival Chinese"
        },
        {
          "course_id": "สบธ11",
          "course_code": "ZBS11",
          "name_th": "ภาษาจีนเพื่ออุตสาหกรรมการบริการ",
          "name_en": "Chinese for Service Industry"
        },
        {
          "course_id": "สบธ12",
          "course_code": "ZBS12",
          "name_th": "ภาษาญี่ปุ่นเพื่ออุตสาหกรรมการบริการ",
          "name_en": "Japanese for Service Industry"
        },
        {
          "course_id": "สบธ13",
          "course_code": "ZBS13",
          "name_th": "การริเริ่มธุรกิจในประเทศจีน",
          "name_en": "Starting a Business in China"
        },
        {
          "course_id": "สบธ14",
          "course_code": "ZBS14",
          "name_th": "การใช้เครื่องดื่มและอาหารปิดเกมธุรกิจ",
          "name_en": "Mastering Business Closing through Food and Beverage"
        },
        {
          "course_id": "สบธ15",
          "course_code": "ZBS15",
          "name_th": "ศิลปะแห่งการขายและการสร้างสรรค์งานอีเวนต์",
          "name_en": "The Art of Selling & Creating Events"
        },
        {
          "course_id": "สบธ16",
          "course_code": "ZBS16",
          "name_th": "Business 101: ธุรกิจไม่ยาก ถ้าจัดการเป็น",
          "name_en": "Business 101: Business for All"
        },
        {
          "course_id": "สบธ17",
          "course_code": "ZBS17",
          "name_th": "ศิลปะแห่งความประทับใจแรกและการจัดการลูกค้าอย่างยั่งยืน",
          "name_en": "The Art of First Impressions and Sustainable Customer Management"
        },
        {
          "course_id": "สบธ18",
          "course_code": "ZBS18",
          "name_th": "เงินคือพระเจ้า",
          "name_en": "Money is God"
        }
      ]
    },
    {
      "faculty_name": "คณะวัฒนธรรมสิ่งแวดล้อมและการท่องเที่ยวเชิงนิเวศ",
      "courses": [
        {
          "course_id": "สวธ01",
          "course_code": "ZEE01",
          "name_th": "การจัดการสิ่งแวดล้อมเพื่อการดำรงชีวิตวิถีใหม่",
          "name_en": "Environmental Management for New Normal Lifestyle"
        },
        {
          "course_id": "สวธ02",
          "course_code": "ZEE02",
          "name_th": "การท่องเที่ยวเชิงอาสาสมัครเพื่อสร้างเสริมประสบการณ์",
          "name_en": "Volunteer Tourism for Enhancing Experiences"
        },
        {
          "course_id": "สวธ03",
          "course_code": "ZEE03",
          "name_th": "เรื่องเล่าของอาหารผ่านการท่องเที่ยว",
          "name_en": "Gastronomy Tourism Storytelling"
        },
        {
          "course_id": "สวธ04",
          "course_code": "ZEE04",
          "name_th": "การท่องเที่ยวเชิงผจญภัย",
          "name_en": "Adventure Tourism"
        },
        {
          "course_id": "สวธ05",
          "course_code": "ZEE05",
          "name_th": "การท่องเที่ยวคาร์บอนต่ำเพื่อความยั่งยืน",
          "name_en": "Low-Carbon Tourism for Sustainability"
        },
        {
          "course_id": "สวธ06",
          "course_code": "ZEE06",
          "name_th": "พรรณไม้เพื่อชีวิต",
          "name_en": "Plants for Life"
        },
        {
          "course_id": "สวธ07",
          "course_code": "ZEE07",
          "name_th": "รักษ์ธรรมชาติและท้องทะเล",
          "name_en": "Nature & Ocean Conservation"
        }
      ]
    },
    {
      "faculty_name": "คณะพยาบาลศาสตร์",
      "courses": [
        {
          "course_id": "สพย01",
          "course_code": "ZNS01",
          "name_th": "ความสุขของผู้สูงอายุในศตวรรษที่ 21",
          "name_en": "The Happiness of the Elderly in the 21st Century"
        },
        {
          "course_id": "สพย02",
          "course_code": "ZNS02",
          "name_th": "ธุรกิจการดูแลผู้สูงอายุ",
          "name_en": "Senior Caring Business"
        },
        {
          "course_id": "สพย03",
          "course_code": "ZNS03",
          "name_th": "ปลุกพลังฮีโร่",
          "name_en": "The Hero Awakening"
        },
        {
          "course_id": "สปพ04",
          "course_code": "ZNS04",
          "name_th": "เติมสุขผู้สูงวัย",
          "name_en": "Happiness Enrichment for the Elderly"
        }
      ]
    },
    {
      "faculty_name": "คณะพลศึกษา",
      "courses": [
        {
          "course_id": "สพล01",
          "course_code": "ZPE01",
          "name_th": "ชีวิตและครอบครัวสุขสันต์",
          "name_en": "Happy Life and Happy Family"
        },
        {
          "course_id": "สพล02",
          "course_code": "ZPE02",
          "name_th": "การจัดการสุขภาพผู้สูงอายุเชิงบูรณาการ",
          "name_en": "Integrative Elderly Health Management"
        },
        {
          "course_id": "สพล03",
          "course_code": "ZPE03",
          "name_th": "การจัดการเรียนรู้สุขศึกษาเพื่อชีวิต",
          "name_en": "Health Education Learning Management For Life"
        },
        {
          "course_id": "สพล04",
          "course_code": "ZPE04",
          "name_th": "การสื่อสารและสร้างสรรค์สื่อสุขภาพ",
          "name_en": "Health Communication And Health Media Creation"
        },
        {
          "course_id": "สพล05",
          "course_code": "ZPE05",
          "name_th": "ทักษะชีวิตเพื่อสุขภาวะ",
          "name_en": "Life Skill For Wellness"
        },
        {
          "course_id": "สพล06",
          "course_code": "ZPE06",
          "name_th": "สุขพลิกผันกับนันทนาการ",
          "name_en": "Increased Happiness Through Recreation"
        },
        {
          "course_id": "สพล07",
          "course_code": "ZPE07",
          "name_th": "การจัดการปัญหาสุขภาพทางสาธารณสุข",
          "name_en": "Public Health Problem Management"
        },
        {
          "course_id": "สพล08",
          "course_code": "ZPE08",
          "name_th": "การออกแบบโปรแกรมการออกกำลังกายเพื่อสุขภาพด้วยตนเอง",
          "name_en": "Self-Exercise Program Design For Health"
        },
        {
          "course_id": "สพล09",
          "course_code": "ZPE09",
          "name_th": "กีฬาแห่งความสุข",
          "name_en": "Happiness Sports"
        }
      ]
    },
    {
      "faculty_name": "วิทยาลัยโพธิวิชชาลัย",
      "courses": [
        {
          "course_id": "สพธ01",
          "course_code": "ZBC01",
          "name_th": "แนวพระราชดำริกับการพัฒนาคุณภาพชีวิต",
          "name_en": "His Majesty's Initiatives and The Quality of Life Development"
        },
        {
          "course_id": "สพธ02",
          "course_code": "ZBC02",
          "name_th": "ชุมชนและโลกที่ยั่งยืน",
          "name_en": "Sustainable Community and World"
        },
        {
          "course_id": "สพธ03",
          "course_code": "ZBC03",
          "name_th": "ชาติพันธุ์และสังคมพหุวัฒนธรรม",
          "name_en": "Ethnic and Multicultural Society"
        },
        {
          "course_id": "สพธ04",
          "course_code": "ZBC04",
          "name_th": "ป่าเศรษฐกิจ",
          "name_en": "Economic Forest"
        },
        {
          "course_id": "สพธ05",
          "course_code": "ZBC05",
          "name_th": "เกษตรสมัยใหม่",
          "name_en": "Modern Agriculture"
        },
        {
          "course_id": "สพธ06",
          "course_code": "ZBC06",
          "name_th": "ภูมิสารสนเทศเพื่อการพัฒนาชุมชน",
          "name_en": "Geo-Informatics for Community Development"
        },
        {
          "course_id": "สพธ07",
          "course_code": "ZBC07",
          "name_th": "สื่อและนวัตกรรมการสื่อสารเพื่อพัฒนาชุมชน",
          "name_en": "Media and Communication Innovations for Community Development"
        },
        {
          "course_id": "สพธ08",
          "course_code": "ZBC08",
          "name_th": "ของป่า",
          "name_en": "Wild products"
        },
        {
          "course_id": "สพธ09",
          "course_code": "ZBC09",
          "name_th": "เครื่องรางของขลัง",
          "name_en": "Amulets"
        },
        {
          "course_id": "สพธ10",
          "course_code": "ZBC10",
          "name_th": "ปลูกความสุขจากธรรมชาติและเกษตรบำบัด",
          "name_en": "Planting Happiness from Nature and Agro-Therapy"
        },
        {
          "course_id": "สพธ11",
          "course_code": "ZBC11",
          "name_th": "ปลูกดอกไม้ให้ใจฟู",
          "name_en": "Grow flowers, swell your heart"
        }
      ]
    },
    {
      "faculty_name": "คณะเศรษฐศาสตร์",
      "courses": [
        {
          "course_id": "สศศ01",
          "course_code": "ZEC01",
          "name_th": "รู้รอบเศรษฐกิจ",
          "name_en": "Understanding The Economy"
        },
        {
          "course_id": "สศศ02",
          "course_code": "ZEC02",
          "name_th": "นักลงทุนรุ่นเยาว์",
          "name_en": "Young Investor"
        },
        {
          "course_id": "สศศ03",
          "course_code": "ZEC03",
          "name_th": "นวัตกรรมเทคโนโลยีและผู้ประกอบการรายย่อย",
          "name_en": "Smart SMEs with Technology"
        }
      ]
    },
    {
      "faculty_name": "คณะสังคมศาสตร์",
      "courses": [
        {
          "course_id": "สสค01",
          "course_code": "ZSS01",
          "name_th": "นโยบายและการจัดการสาธารณะในยุคดิจิทัล",
          "name_en": "Policy and Public Management in The Digital Age"
        },
        {
          "course_id": "สสค02",
          "course_code": "ZSS02",
          "name_th": "ความมั่นคงผ่านวรรณกรรมและวัฒนธรรมสมัยนิยม",
          "name_en": "Security Through Literatures And Popular Culture"
        },
        {
          "course_id": "สสค03",
          "course_code": "ZSS03",
          "name_th": "รัฐศาสตร์ในชีวิตประจำวัน",
          "name_en": "Political Science In Everyday Life"
        },
        {
          "course_id": "สสค04",
          "course_code": "ZSS04",
          "name_th": "กฎหมายกับสังคม",
          "name_en": "Law And Society"
        },
        {
          "course_id": "สสค05",
          "course_code": "ZSS05",
          "name_th": "ผู้คนและสังคมในศตวรรษที่ 21",
          "name_en": "Human And Society In The 21st Century"
        },
        {
          "course_id": "สสค06",
          "course_code": "ZSS06",
          "name_th": "ประวัติศาสตร์สื่อสร้างสรรค์สมัยนิยม",
          "name_en": "History Of Popular Creative Media"
        },
        {
          "course_id": "สสค07",
          "course_code": "ZSS07",
          "name_th": "เรากับสิ่งแวดล้อม",
          "name_en": "Environment and I"
        },
        {
          "course_id": "สสค08",
          "course_code": "ZSS08",
          "name_th": "ภูมิศาสตร์ในชีวิตประจำวัน",
          "name_en": "Geography in Everyday Life"
        },
        {
          "course_id": "สสค09",
          "course_code": "ZSS09",
          "name_th": "สังคมศาสตร์การศึกษา",
          "name_en": "Social Sciences Education"
        },
        {
          "course_id": "สสค10",
          "course_code": "ZSS10",
          "name_th": "สังคม ภาพยนตร์ และตนเอง",
          "name_en": "Society, Films and Self"
        }
      ]
    },
    {
      "faculty_name": "คณะวิทยาศาสตร์",
      "courses": [
        {
          "course_id": "สวท01",
          "course_code": "ZSC01",
          "name_th": "สร้างสรรค์เครื่องดื่มแนวใหม่โดยใช้จุลินทรีย์",
          "name_en": "Create New Beverage by Microorganisms"
        },
        {
          "course_id": "สวท02",
          "course_code": "ZSC02",
          "name_th": "จุลินทรีย์ในชีวิตประจำวัน: กิน-อยู่ถูกสุขลักษณะ",
          "name_en": "Microbes in Daily Life: A Guide to Hygiene"
        },
        {
          "course_id": "สวท03",
          "course_code": "ZSC03",
          "name_th": "การโปรแกรมสำหรับบุคคลทั่วไป",
          "name_en": "Programming for Everybody"
        },
        {
          "course_id": "สวท04",
          "course_code": "ZSC04",
          "name_th": "สีสันของสิ่งทอ",
          "name_en": "Color of Textiles"
        },
        {
          "course_id": "สวท05",
          "course_code": "ZSC05",
          "name_th": "วรรณกรรมและการแสดงวิทยาศาสตร์",
          "name_en": "Literature and Science Show"
        },
        {
          "course_id": "สวท06",
          "course_code": "ZSC06",
          "name_th": "เคมียา",
          "name_en": "Medicinal Chemistry"
        },
        {
          "course_id": "สวท07",
          "course_code": "ZSC07",
          "name_th": "มือใหม่เข้าครัว",
          "name_en": "Amateur in Kitchen"
        },
        {
          "course_id": "สวท08",
          "course_code": "ZSC08",
          "name_th": "เคมีและความบันเทิง",
          "name_en": "Chemistry and Entertainment"
        },
        {
          "course_id": "สวท09",
          "course_code": "ZSC09",
          "name_th": "การเดินทางของข้อมูล: จากข้อมูลสู่ปัญญา",
          "name_en": "The Data Journey: From Raw Data to Insights"
        },
        {
          "course_id": "สวท10",
          "course_code": "ZSC10",
          "name_th": "คณิตศาสตร์เพื่อการตัดสินใจ",
          "name_en": "MATHEMATICS FOR DECISION MAKING"
        },
        {
          "course_id": "สวท11",
          "course_code": "ZSC11",
          "name_th": "เคมีดีมีสุข",
          "name_en": "Chemistry for Wellbeing"
        },
        {
          "course_id": "สวท12",
          "course_code": "ZSC12",
          "name_th": "วัสดุรักษ์โลก",
          "name_en": "Green Materials"
        },
        {
          "course_id": "สวท13",
          "course_code": "ZSC13",
          "name_th": "จากขยะสู่วัสดุชีวฐาน",
          "name_en": "From Waste to Bio-based Materials"
        },
        {
          "course_id": "สวท14",
          "course_code": "ZSC14",
          "name_th": "โลหะในชีวิตประจำวัน",
          "name_en": "Metals in Everyday Life"
        },
        {
          "course_id": "สวท15",
          "course_code": "ZSC15",
          "name_th": "ประเภทวัสดุและการใช้งาน",
          "name_en": "Types of Materials and Their Uses"
        },
        {
          "course_id": "สวท16",
          "course_code": "ZSC16",
          "name_th": "วัสดุนาโนรอบตัวกับแนวโน้มเทคโนโลยีนาโนในอนาคต",
          "name_en": "Surrounding Nanomaterials and Prospective Nanotechnology"
        },
        {
          "course_id": "สวท17",
          "course_code": "ZSC17",
          "name_th": "ผลิตภัณฑ์เซรามิก",
          "name_en": "Ceramic Products"
        },
        {
          "course_id": "สวท18",
          "course_code": "ZSC18",
          "name_th": "การชุบโลหะด้วยไฟฟ้า",
          "name_en": "Electroplating of Metals"
        },
        {
          "course_id": "สวท19",
          "course_code": "ZSC19",
          "name_th": "ดวงดาวกับการท่องเที่ยว",
          "name_en": "Stars and Tourism"
        },
        {
          "course_id": "สวท20",
          "course_code": "ZSC20",
          "name_th": "คณิตศาสตร์สำหรับทักษะชีวิต",
          "name_en": "Mathematics for Life Skills"
        },
        {
          "course_id": "สวท21",
          "course_code": "ZSC21",
          "name_th": "สนุกคณิต ผ่านการสร้างสื่อการเรียนรู้และเกม",
          "name_en": "Enjoy Mathematics Through Constructing Learning Materials and Games"
        },
        {
          "course_id": "สวท22",
          "course_code": "ZSC22",
          "name_th": "สถิติและการวิเคราะห์ข้อมูลทางธุรกิจด้วย MS Excel",
          "name_en": "Statistics and Business Data Analysis with MS Excel"
        },
        {
          "course_id": "สวท23",
          "course_code": "ZSC23",
          "name_th": "กลยุทธ์ของเกมและวิธีการตัดสินใจอย่างนักสถิติ",
          "name_en": "Game strategies and Decision Making as Statisticians"
        },
        {
          "course_id": "สวท24",
          "course_code": "ZSC24",
          "name_th": "เทคนิคทางวิทยาศาสตร์ในการถ่ายภาพ",
          "name_en": "Scientific Technique in Photography"
        },
        {
          "course_id": "สวท25",
          "course_code": "ZSC25",
          "name_th": "วัสดุเพื่อการกีฬา และเพื่อสัตว์เลี้ยง",
          "name_en": "Materials for Sports and Pets"
        },
        {
          "course_id": "สวท26",
          "course_code": "ZSC26",
          "name_th": "วิทยาศาสตร์ในบันเทิงคดี",
          "name_en": "Science in Fiction"
        },
        {
          "course_id": "สวท27",
          "course_code": "ZSC27",
          "name_th": "อยู่ดีมีสุขกับเทคโนโลยีชีวภาพ",
          "name_en": "Well-Being with Biotechnology"
        },
        {
          "course_id": "สวท28",
          "course_code": "ZSC28",
          "name_th": "ศาสตร์และศิลป์แห่งพืชพรรณในชีวิตดิจิทัล",
          "name_en": "Science and Art of Plants in Digital Life"
        },
        {
          "course_id": "สวท29",
          "course_code": "ZSC29",
          "name_th": "พฤกษาในขวดแก้วและในตลาดออนไลน์",
          "name_en": "Plants in Glass Bottles and Online Markets"
        },
        {
          "course_id": "สวท30",
          "course_code": "ZSC30",
          "name_th": "ดีเอ็นเอความลับแห่งชีวิต",
          "name_en": "DNA: The Secret of Life"
        },
        {
          "course_id": "สวท31",
          "course_code": "ZSC31",
          "name_th": "สัตว์ในเมืองและการดูนก",
          "name_en": "Urban Animals and Bird Watching"
        },
        {
          "course_id": "สวท32",
          "course_code": "ZSC32",
          "name_th": "ชีววิทยาหลังบ้านและการอนุรักษ์",
          "name_en": "Backyard Biology and Conservation"
        },
        {
          "course_id": "สวท33",
          "course_code": "ZSC33",
          "name_th": "ฟิสิกส์สมัยใหม่ ในภาพยนตร์และสื่อ กับความเชื่อ",
          "name_en": "New Physics in Movies and Media, Versus Belief"
        },
        {
          "course_id": "สวท34",
          "course_code": "ZSC34",
          "name_th": "การสื่อสารทางวิทยาศาสตร์อย่างมีประสิทธิภาพ",
          "name_en": "Effective Science Communication"
        },
        {
          "course_id": "สวท35",
          "course_code": "ZSC35",
          "name_th": "ศาสตร์พระราชาเพื่อชีวิตที่ยั่งยืน",
          "name_en": "The King's Wisdom for Sustainable Life"
        },
        {
          "course_id": "สวท36",
          "course_code": "ZSC36",
          "name_th": "Microsoft Excel สำหรับมืออาชีพ",
          "name_en": "Microsoft Excel for Professionals"
        },
        {
          "course_id": "สวท37",
          "course_code": "ZSC37",
          "name_th": "ครบเครื่องเรื่องวัสดุ",
          "name_en": "All About Materials"
        },
        {
          "course_id": "สวท38",
          "course_code": "ZSC38",
          "name_th": "ศิลปะการตกแต่งอาหารและเครื่องดื่ม",
          "name_en": "Decoration Art for Food and Beverage"
        },
        {
          "course_id": "สวท39",
          "course_code": "ZSC39",
          "name_th": "ควอนตัมเปลี่ยนโลก",
          "name_en": "A quantum-changing world"
        },
        {
          "course_id": "สวท40",
          "course_code": "ZSC40",
          "name_th": "เรื่องเล่าของสิ่งทอ",
          "name_en": "Textile talks"
        },
        {
          "course_id": "สวท41",
          "course_code": "ZSC41",
          "name_th": "ภาพยนตร์และนวนิยายไซ-ไฟ วิทยาศาสตร์ กับ ความเชื่อ",
          "name_en": "Sci-Fi Movies and Novels, Science versus Belief"
        },
        {
          "course_id": "สวท42",
          "course_code": "ZSC42",
          "name_th": "ดาราโหราศาสตร์สังเขป",
          "name_en": "Astronomy-astrology introduction"
        },
        {
          "course_id": "สวท43",
          "course_code": "ZSC43",
          "name_th": "คณิตศาสตร์โอลิมปิกเบื้องต้น",
          "name_en": "Introduction to Olympiad Mathematics"
        },
        {
          "course_id": "สวท44",
          "course_code": "ZSC44",
          "name_th": "ความบันเทิงวิทยาศาสตร์ที่บ้าน",
          "name_en": "SCIENCE ENTERTAINMENT AT HOME"
        },
        {
          "course_id": "สวท45",
          "course_code": "ZSC45",
          "name_th": "คณิตศาสตร์เพื่อการตัดสินใจทางธุรกิจและการเงิน",
          "name_en": "Mathematics for Decision Making in Business and Finance"
        },
        {
          "course_id": "สวท46",
          "course_code": "ZSC46",
          "name_th": "ผลิตภัณฑ์เซรามิก",
          "name_en": "Ceramic Products"
        },
        {
          "course_id": "สวท47",
          "course_code": "ZSC47",
          "name_th": "วัสดุพิศวง",
          "name_en": "Materials Magic"
        },
        {
          "course_id": "สวท48",
          "course_code": "ZSC48",
          "name_th": "จุลินทรีย์กับชีวิตประจำวัน: กิน-อยู่ถูกสุขลักษณะ",
          "name_en": "Microbes in daily life: A guide to hygiene"
        },
        {
          "course_id": "สวท49",
          "course_code": "ZSC49",
          "name_th": "เกมตัวตึง",
          "name_en": "Power of Game"
        },
        {
          "course_id": "สวท50",
          "course_code": "ZSC50",
          "name_th": "แกะรอยวัสดุจากทั่วโลก",
          "name_en": "Exploring materials around the world"
        },
        {
          "course_id": "สวท51",
          "course_code": "ZSC51",
          "name_th": "รู้เรื่องเงิน...ก่อนเริ่มงาน",
          "name_en": "Know about Money...Before You Work"
        },
        {
          "course_id": "สวท52",
          "course_code": "ZSC52",
          "name_th": "ปัญญาประดิษฐ์สำหรับทุกคน: จากแนวคิดสู่การประยุกต์ใช้",
          "name_en": "Artificial Intelligence for Everyone: From Concepts to Practical Applications"
        },
        {
          "course_id": "สวท53",
          "course_code": "ZSC53",
          "name_th": "วิทยาศาสตร์ของการใช้ชีวิต: ออกแบบโลก อย่างยั่งยืนและชาญฉลาด",
          "name_en": "Science of Living: Designing a Sustainable and Intelligent World"
        },
        {
          "course_id": "สวท54",
          "course_code": "ZSC54",
          "name_th": "วิถีชีวิตที่ยั่งยืนและผลิตภัณฑ์สร้างสรรค์ที่เป็นมิตรต่อสิ่งแวดล้อม",
          "name_en": "Sustainable Living and Creative E-co Products"
        }
      ]
    },
    {
      "faculty_name": "คณะมนุษยศาสตร์",
      "courses": [
        {
          "course_id": "สมน01",
          "course_code": "ZHM01",
          "name_th": "ภาษาจีนเพื่อการสื่อสารอย่างมีประสิทธิภาพ",
          "name_en": "Chinese for Effective Communication"
        },
        {
          "course_id": "สมน02",
          "course_code": "ZHM02",
          "name_th": "ภาษาฝรั่งเศสเพื่อการสื่อสารอย่างมีประสิทธิภาพ",
          "name_en": "French for Effective Communication"
        },
        {
          "course_id": "สมน03",
          "course_code": "ZHM03",
          "name_th": "ภาษาเยอรมันเพื่อการสื่อสารอย่างมีประสิทธิภาพ",
          "name_en": "German for Effective Communication"
        },
        {
          "course_id": "สมน04",
          "course_code": "ZHM04",
          "name_th": "ภาษาจีนเพื่อการเอาตัวรอด",
          "name_en": "Survival Chinese"
        },
        {
          "course_id": "สมน05",
          "course_code": "ZHM05",
          "name_th": "ทักษะการสื่อสารภาษาไทยเพื่อการศึกษาและอาชีพ",
          "name_en": "Communication Skills in Thai for Academic and Professional Purposes"
        },
        {
          "course_id": "สมน06",
          "course_code": "ZHM06",
          "name_th": "พื้นฐานการสอนภาษาอังกฤษในฐานะภาษาต่างประเทศ",
          "name_en": "Introduction to Teaching English as a Foreign Language"
        },
        {
          "course_id": "สมน07",
          "course_code": "ZHM07",
          "name_th": "จิตวิทยาเพื่อการตระหนักรู้ตนเองและผู้อื่น",
          "name_en": "Psychology for Self-Awareness and Other-Awareness"
        },
        {
          "course_id": "สมน08",
          "course_code": "ZHM08",
          "name_th": "คิดเชิงวิพากษ์เพื่อตัดสินใจด้วยตรรกะและภูมิปัญญาตะวันออก",
          "name_en": "Critical Thinking for Decision Making with Logic and Eastern Wisdom"
        },
        {
          "course_id": "สมน09",
          "course_code": "ZHM09",
          "name_th": "รู้จักกัมพูชา",
          "name_en": "Get to Know Cambodia"
        },
        {
          "course_id": "สมน10",
          "course_code": "ZHM10",
          "name_th": "มหัศจรรย์กัมพูชา",
          "name_en": "Amazing Cambodia"
        },
        {
          "course_id": "สมน11",
          "course_code": "ZHM11",
          "name_th": "ลัดเลาะรอบเวียดนาม",
          "name_en": "All Around Vietnam"
        },
        {
          "course_id": "สมน12",
          "course_code": "ZHM12",
          "name_th": "ศิลปะการเขียนสารคดีและการพูดเพื่ออาชีพ",
          "name_en": "The Art of Feature Writing and Speaking for Careers"
        },
        {
          "course_id": "สมน13",
          "course_code": "ZHM13",
          "name_th": "ภาษาจีนในชีวิตประจำวัน",
          "name_en": "Chinese in Daily Life"
        },
        {
          "course_id": "สมน14",
          "course_code": "ZHM14",
          "name_th": "ภาษาเกาหลีในชีวิตประจำวัน",
          "name_en": "Korean in Daily Life"
        },
        {
          "course_id": "สมน15",
          "course_code": "ZHM15",
          "name_th": "เจาะลึกญี่ปุ่น",
          "name_en": "Inside Japan"
        },
        {
          "course_id": "สมน16",
          "course_code": "ZHM16",
          "name_th": "ภาษาอังกฤษเพื่อการบริการทางสุขภาพ",
          "name_en": "English for Health Care Services"
        },
        {
          "course_id": "สมน17",
          "course_code": "ZHM17",
          "name_th": "สร้างสรรค์เรื่องเล่าเอาใจเด็ก",
          "name_en": "Creating Story for Children's Complacencies"
        },
        {
          "course_id": "สมน18",
          "course_code": "ZHM18",
          "name_th": "ย้อนวัยเข้าใจเด็ก",
          "name_en": "Turning Back Time for Understanding Children"
        },
        {
          "course_id": "สมน19",
          "course_code": "ZHM19",
          "name_th": "ข้อมูลและการค้นพบสารสนเทศ",
          "name_en": "Data and Information Discovery"
        },
        {
          "course_id": "สมน20",
          "course_code": "ZHM20",
          "name_th": "เสียงและระบบเสียงในภาษา",
          "name_en": "Sound and Sound Systems of Language"
        },
        {
          "course_id": "สมน21",
          "course_code": "ZHM21",
          "name_th": "เราเข้าใจและตีความภาษาอย่างไร",
          "name_en": "How Do We Understand and Interpret Language"
        },
        {
          "course_id": "สมน22",
          "course_code": "ZHM22",
          "name_th": "ภาษาและวัฒนธรรมทำงานร่วมกันอย่างไร",
          "name_en": "How Does Language and Culture Work Hand in Hand?"
        },
        {
          "course_id": "สมน23",
          "course_code": "ZHM23",
          "name_th": "เรารู้อะไรเมื่อเราบอกว่ารู้ภาษา?",
          "name_en": "What Do We Know When We Know a Language?"
        },
        {
          "course_id": "สมน24",
          "course_code": "ZHM24",
          "name_th": "ภาษาโปแลนด์เพื่อการสื่อสาร",
          "name_en": "Polish for Communication"
        },
        {
          "course_id": "สมน25",
          "course_code": "ZHM25",
          "name_th": "ภาษารัสเซียเพื่อการสื่อสาร",
          "name_en": "Russian for Communication"
        },
        {
          "course_id": "สมน26",
          "course_code": "ZHM26",
          "name_th": "ภาษาตุรกีเพื่อการสื่อสาร",
          "name_en": "Turkish for communication"
        }
      ]
    }
  ]
};

// รองรับการแปลงชื่อคณะเดิมที่เป็นภาษาอังกฤษให้เป็นภาษาไทยแบบอัตโนมัติ
const FACULTY_EN_TO_TH = {
  "innovative learning center": "สำนักนวัตกรรมการเรียนรู้",
  "college of social communication innovation": "วิทยาลัยนวัตกรรมสื่อสารสังคม",
  "faculty of pharmacy": "คณะเภสัชศาสตร์",
  "faculty of fine arts": "คณะศิลปกรรมศาสตร์",
  "educational and psychological test bureau": "สำนักทดสอบทางการศึกษาและจิตวิทยา",
  "faculty of engineering": "คณะวิศวกรรมศาสตร์",
  "international college for sustainability studies": "วิทยาลัยนานาชาติเพื่อศึกษาความยั่งยืน",
  "faculty of agricultural product innovation and technology": "คณะเทคโนโลยีและนวัตกรรมผลิตภัณฑ์การเกษตร",
  "faculty of dentistry": "คณะทันตแพทยศาสตร์",
  "faculty of education": "คณะศึกษาศาสตร์",
  "college of creative industry": "วิทยาลัยอุตสาหกรรมสร้างสรรค์",
  "behavioral science research institute": "สถาบันวิจัยพฤติกรรมศาสตร์",
  "faculty of medicine": "คณะแพทยศาสตร์",
  "faculty of physical therapy": "คณะกายภาพบำบัด",
  "faculty of business administration for society": "คณะบริหารธุรกิจเพื่อสังคม",
  "faculty of environmental culture and ecotourism": "คณะวัฒนธรรมสิ่งแวดล้อมและการท่องเที่ยวเชิงนิเวศ",
  "faculty of nursing": "คณะพยาบาลศาสตร์",
  "faculty of physical education, sports and health": "คณะพลศึกษา",
  "bodhivijjalaya college": "วิทยาลัยโพธิวิชชาลัย",
  "faculty of economics": "คณะเศรษฐศาสตร์",
  "faculty of social sciences": "คณะสังคมศาสตร์",
  "faculty of science": "คณะวิทยาศาสตร์",
  "faculty of humanities": "คณะมนุษยศาสตร์",
  "behavioral science research insitute": "สถาบันวิจัยพฤติกรรมศาสตร์"
};

/**
 * Returns all faculty entries from the master database.
 * @returns {Array<{faculty_name: string, courses: Array<Object>}>}
 */
function getAllFaculties() {
  return COURSE_DATABASE.faculties;
}

/**
 * Returns the faculty name string in Thai.
 * @param {string} facultyNameOrId
 * @returns {string}
 */
function getFacultyName(facultyNameOrId) {
  if (!facultyNameOrId) return ;
  const key = String(facultyNameOrId).trim().toLowerCase();
  if (FACULTY_EN_TO_TH[key]) {
    return FACULTY_EN_TO_TH[key];
  }
  const found = COURSE_DATABASE.faculties.find(
    f => f.faculty_name.toLowerCase() === key
  );
  return found ? found.faculty_name : facultyNameOrId;
}

/**
 * Returns courses belonging to a given faculty name (supports Thai or English).
 * If no facultyName provided, returns all courses across all faculties.
 * @param {string} [facultyName]
 * @returns {Array<Object>}
 */
function getCoursesByFaculty(facultyName) {
  if (!facultyName) return getAllCourses();
  const normalized = getFacultyName(facultyName).toLowerCase();
  const fac = COURSE_DATABASE.faculties.find(
    f => f.faculty_name.toLowerCase() === normalized
  );
  return fac ? fac.courses : [];
}

/**
 * Returns a flat list of all courses with faculty_name attached.
 * @returns {Array<Object>}
 */
function getAllCourses() {
  const result = [];
  COURSE_DATABASE.faculties.forEach(f => {
    f.courses.forEach(c => {
      result.push({
        ...c,
        faculty_name: f.faculty_name,
      });
    });
  });
  return result;
}

/**
 * Finds a course by either course_id (Thai) or course_code (English) or composite ID.
 * @param {string} identifier
 * @returns {Object|null}
 */
function getCourseById(identifier) {
  if (!identifier) return null;
  const idStr = String(identifier).trim().toLowerCase();

  for (const fac of COURSE_DATABASE.faculties) {
    for (const c of fac.courses) {
      const cId   = c.course_id.toLowerCase();
      const cCode = c.course_code.toLowerCase();
      if (
        cId === idStr ||
        cCode === idStr ||
        idStr === `${cId}/${cCode}` ||
        idStr === `${cId} / ${cCode}` ||
        idStr === `${cId}_${cCode}` ||
        idStr === `${cId} - ${cCode}` ||
        idStr === `${cCode}/${cId}` ||
        idStr === `${cCode} / ${cId}` ||
        (idStr.includes(cId) && idStr.includes(cCode))
      ) {
        return {
          ...c,
          faculty_name: fac.faculty_name,
        };
      }
    }
  }
  return null;
}

/**
 * Finds a course by course name (Thai or English, exact or partial match).
 * @param {string} name
 * @returns {Object|null}
 */
function findCourseByName(name) {
  if (!name) return null;
  const n = String(name).trim().toLowerCase();
  if (n.length < 3) return null;

  for (const fac of COURSE_DATABASE.faculties) {
    for (const c of fac.courses) {
      const th = c.name_th.toLowerCase();
      const en = c.name_en.toLowerCase();
      if (th === n || en === n || th.includes(n) || n.includes(th)) {
        return {
          ...c,
          faculty_name: fac.faculty_name,
        };
      }
    }
  }
  return null;
}

/**
 * Resolves full course information (Thai ID, English code, Thai name, English name, Faculty)
 * from any partial review data.
 * @param {Object} item
 * @returns {{course_id: string, course_code: string, name_th: string, name_en: string, faculty: string}}
 */
function resolveCourseInfo(item) {
  if (!item) return { course_id: "", course_code: "", name_th: "", name_en: "", faculty: "" };

  let courseId   = String(item.course_id || "").trim();
  let courseCode = String(item.course_code || "").trim();
  let nameTh     = String(item.name_th || item.courseName || "").trim();
  let nameEn     = String(item.name_en || "").trim();
  let faculty    = String(item.faculty || "").trim();

  // If composite courseId like "สสน01 / ZIL01"
  if (item.courseId && typeof item.courseId === "string") {
    const raw = item.courseId.trim();
    if (raw.includes("/")) {
      const parts = raw.split("/").map(s => s.trim());
      if (!courseId && parts[0]) courseId = parts[0];
      if (!courseCode && parts[1]) courseCode = parts[1];
    } else if (!courseId && !courseCode) {
      if (/^[A-Za-z0-9]+$/.test(raw)) courseCode = raw;
      else courseId = raw;
    }
  }

  // Lookup in database
  const matched = getCourseById(courseCode) ||
                  getCourseById(courseId) ||
                  getCourseById(item.courseId) ||
                  findCourseByName(nameTh) ||
                  findCourseByName(nameEn);

  if (matched) {
    if (!courseId)   courseId   = matched.course_id;
    if (!courseCode) courseCode = matched.course_code;
    if (!nameTh)     nameTh     = matched.name_th;
    if (!nameEn)     nameEn     = matched.name_en;
    if (!faculty)    faculty    = matched.faculty_name;
  }

  return {
    course_id:   courseId,
    course_code: courseCode,
    name_th:     nameTh,
    name_en:     nameEn,
    faculty:     getFacultyName(faculty) || faculty,
  };
}
