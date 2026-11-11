/**
 * courses.js — Master Course Catalog Database
 *
 * Stores the master course database separately from UI components.
 * To add or edit faculties and courses, update COURSE_DATABASE below.
 */

const COURSE_DATABASE = {
  "faculties": [
    {
      "faculty_name": "Innovative Learning Center",
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
      "faculty_name": "College of Social Communication Innovation",
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
      "faculty_name": "Faculty of Pharmacy",
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
      "faculty_name": "Faculty of Fine Arts",
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
      "faculty_name": "Educational and Psychological Test Bureau",
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
      "faculty_name": "Faculty of Engineering",
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
      "faculty_name": "International College for Sustainability Studies",
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
      "faculty_name": "Faculty of Agricultural Product Innovation and Technology",
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
      "faculty_name": "Faculty of Dentistry",
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
      "faculty_name": "Faculty of Education",
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
      "faculty_name": "College of Creative Industry",
      "courses": [
        {
          "course_id": "สศษ01",
          "course_code": "ZED01",
          "name_th": "จิตวิทยาแห่งความสมดุลในชีวิต",
          "name_en": "The Psychology of Life Balance"
        },
        {
          "course_id": "สศษ01",
          "course_code": "ZED01",
          "name_th": "จิตวิทยาแห่งความสมดุลในชีวิต",
          "name_en": "The Psychology of Life Balance"
        }
      ]
    },
    {
      "faculty_name": "Behavioral Science Research Institute",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Medicine",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Physical Therapy",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Business Administration for Society",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Environmental Culture and Ecotourism",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Nursing",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Physical Education, Sports and Health",
      "courses": []
    },
    {
      "faculty_name": "Bodhivijjalaya College",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Economics",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Social Sciences",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Science",
      "courses": []
    },
    {
      "faculty_name": "Faculty of Humanities",
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

/**
 * Returns all faculty entries from the master database.
 * @returns {Array<{faculty_name: string, courses: Array<Object>}>}
 */
function getAllFaculties() {
  return COURSE_DATABASE.faculties;
}

/**
 * Returns the faculty name string.
 * @param {string} facultyNameOrId
 * @returns {string}
 */
function getFacultyName(facultyNameOrId) {
  if (!facultyNameOrId) return "";
  const found = COURSE_DATABASE.faculties.find(
    f => f.faculty_name.toLowerCase() === String(facultyNameOrId).toLowerCase()
  );
  return found ? found.faculty_name : facultyNameOrId;
}

/**
 * Returns courses belonging to a given faculty name.
 * If no facultyName provided, returns all courses across all faculties.
 * @param {string} [facultyName]
 * @returns {Array<Object>}
 */
function getCoursesByFaculty(facultyName) {
  if (!facultyName) return getAllCourses();
  const fac = COURSE_DATABASE.faculties.find(
    f => f.faculty_name.toLowerCase() === String(facultyName).toLowerCase()
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
      if (
        c.course_id.toLowerCase() === idStr ||
        c.course_code.toLowerCase() === idStr ||
        `${c.course_id}_${c.course_code}`.toLowerCase() === idStr ||
        `${c.course_id}/${c.course_code}`.toLowerCase() === idStr
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
