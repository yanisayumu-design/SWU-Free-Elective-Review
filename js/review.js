/**
 * review.js — Logic for the Review submission page (review.html)
 *
 * Handles:
 *  - Populating faculty & course dropdowns from master database
 *  - Dynamic course list update when faculty changes
 *  - Interactive rating buttons (1 to 5)
 *  - Form validation
 *  - Saving review to localStorage and handling success view
 */

document.addEventListener("DOMContentLoaded", () => {
  // ── DOM references ─────────────────────────────────────────────────────────
  const form           = document.getElementById("reviewForm");
  const facultySelect  = document.getElementById("facultySelect");
  const courseSelect   = document.getElementById("courseSelect");
  const successMessage = document.getElementById("successMessage");

  // Rating state: { categoryKey: score (1-5) }
  const ratings = {
    contentClarity:          0,
    workloadAppropriateness: 0,
    examEase:                0,
    instructorKindness:      0,
    gradingEase:             0,
  };

  // ── Populate faculties dropdown ────────────────────────────────────────────
  getAllFaculties().forEach(f => {
    const opt = document.createElement("option");
    opt.value = f.faculty_name;
    const count = f.courses ? f.courses.length : 0;
    opt.textContent = count > 0
      ? `${f.faculty_name} (${count} วิชา)`
      : `${f.faculty_name} (ยังไม่มีวิชา)`;
    facultySelect.appendChild(opt);
  });

  // ── Faculty → Course dependency ────────────────────────────────────────────
  facultySelect.addEventListener("change", () => {
    const facultyName = facultySelect.value;
    courseSelect.innerHTML = `<option value="">-- เลือกรายวิชา --</option>`;

    if (!facultyName) {
      courseSelect.disabled = true;
      return;
    }

    const courses = getCoursesByFaculty(facultyName);
    if (!courses || courses.length === 0) {
      courseSelect.innerHTML = `<option value="">-- ยังไม่มีรายวิชาในคณะนี้ --</option>`;
      courseSelect.disabled = true;
      return;
    }

    courseSelect.disabled = false;
    courses.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.course_code;
      opt.textContent = `${c.course_id} / ${c.course_code}: ${c.name_th} (${c.name_en})`;
      courseSelect.appendChild(opt);
    });

    // Clear any previous error on course selection
    courseSelect.closest(".form-group")?.classList.remove("form-group--error");
    courseSelect.closest(".form-group")?.querySelector(".error-hint")?.remove();
  });

  // ── Rating buttons ─────────────────────────────────────────────────────────
  document.querySelectorAll(".rating-group").forEach(group => {
    const key = group.dataset.ratingKey;
    const buttons = group.querySelectorAll(".rating-btn");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const val = parseInt(btn.dataset.value, 10);
        ratings[key] = val;

        // Visual update: highlight selected number
        buttons.forEach((b) => {
          const bVal = parseInt(b.dataset.value, 10);
          b.classList.toggle("rating-btn--active", bVal === val);
        });

        // Clear error state if any
        group.closest(".form-group")?.classList.remove("form-group--error");
        document.getElementById("ratingsSection")?.querySelector(".error-hint")?.remove();
      });
    });
  });

  // ── Form submission ────────────────────────────────────────────────────────
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const selectedCourse = getCourseById(courseSelect.value);
    const creditVal = form.querySelector('input[name="credits"]:checked')?.value;
    const formatVal = form.querySelector('input[name="learningFormat"]:checked')?.value;
    const attendVal = form.querySelector('input[name="attendance"]:checked')?.value;

    const reviewData = {
      displayName:   form.displayName.value.trim(),
      faculty:       selectedCourse ? selectedCourse.faculty_name : facultySelect.value,
      course_id:     selectedCourse ? selectedCourse.course_id : "",
      course_code:   selectedCourse ? selectedCourse.course_code : courseSelect.value,
      name_th:       selectedCourse ? selectedCourse.name_th : "",
      name_en:       selectedCourse ? selectedCourse.name_en : "",
      courseId:      selectedCourse ? `${selectedCourse.course_id} / ${selectedCourse.course_code}` : courseSelect.value,
      courseName:    selectedCourse ? selectedCourse.name_th : "",
      credits:       parseInt(creditVal, 10),
      learningFormat: formatVal,
      classSchedule: form.classSchedule.value.trim(),
      attendance:    attendVal,
      ratings:       { ...ratings },
      writtenReview: form.writtenReview.value.trim(),
    };

    saveReview(reviewData);
    showSuccess();
  });

  // ── Validation ─────────────────────────────────────────────────────────────
  function validateForm() {
    let valid = true;

    const markError = (el, msg) => {
      const group = el.closest(".form-group");
      if (!group) return;
      group.classList.add("form-group--error");
      let hint = group.querySelector(".error-hint");
      if (!hint) {
        hint = document.createElement("span");
        hint.className = "error-hint";
        group.appendChild(hint);
      }
      hint.textContent = msg;
      valid = false;
    };

    const clearError = el => {
      const group = el.closest(".form-group");
      if (!group) return;
      group.classList.remove("form-group--error");
      group.querySelector(".error-hint")?.remove();
    };

    // 1. Display name
    const dn = form.displayName;
    if (!dn.value.trim()) {
      markError(dn, "กรุณากรอกชื่อที่ต้องการแสดง");
    } else {
      clearError(dn);
    }

    // 2. Faculty
    if (!facultySelect.value) {
      markError(facultySelect, "กรุณาเลือกคณะ");
    } else {
      clearError(facultySelect);
    }

    // 3. Course
    if (!courseSelect.value) {
      markError(courseSelect, "กรุณาเลือกรายวิชา");
    } else {
      clearError(courseSelect);
    }

    // 4. Credits
    const creditGroup = document.getElementById("creditsGroup");
    if (!form.querySelector('input[name="credits"]:checked')) {
      creditGroup.classList.add("form-group--error");
      let hint = creditGroup.querySelector(".error-hint");
      if (!hint) {
        hint = document.createElement("span");
        hint.className = "error-hint";
        creditGroup.appendChild(hint);
      }
      hint.textContent = "กรุณาเลือกจำนวนหน่วยกิต";
      valid = false;
    } else {
      creditGroup.classList.remove("form-group--error");
      creditGroup.querySelector(".error-hint")?.remove();
    }

    // 5. Learning format
    const formatGroup = document.getElementById("formatGroup");
    if (!form.querySelector('input[name="learningFormat"]:checked')) {
      formatGroup.classList.add("form-group--error");
      let hint = formatGroup.querySelector(".error-hint");
      if (!hint) {
        hint = document.createElement("span");
        hint.className = "error-hint";
        formatGroup.appendChild(hint);
      }
      hint.textContent = "กรุณาเลือกรูปแบบการเรียน";
      valid = false;
    } else {
      formatGroup.classList.remove("form-group--error");
      formatGroup.querySelector(".error-hint")?.remove();
    }

    // 6. Attendance
    const attGroup = document.getElementById("attendanceGroup");
    if (!form.querySelector('input[name="attendance"]:checked')) {
      attGroup.classList.add("form-group--error");
      let hint = attGroup.querySelector(".error-hint");
      if (!hint) {
        hint = document.createElement("span");
        hint.className = "error-hint";
        attGroup.appendChild(hint);
      }
      hint.textContent = "กรุณาระบุการเช็คชื่อ";
      valid = false;
    } else {
      attGroup.classList.remove("form-group--error");
      attGroup.querySelector(".error-hint")?.remove();
    }

    // 7. Ratings (all 5 categories)
    const ratingKeys = Object.keys(ratings);
    let missingRating = false;
    ratingKeys.forEach(key => {
      const group = document.querySelector(`.rating-group[data-rating-key="${key}"]`)?.closest(".form-group");
      if (ratings[key] === 0) {
        group?.classList.add("form-group--error");
        missingRating = true;
        valid = false;
      } else {
        group?.classList.remove("form-group--error");
      }
    });

    if (missingRating) {
      const ratingSection = document.getElementById("ratingsSection");
      let hint = ratingSection.querySelector(".error-hint");
      if (!hint) {
        hint = document.createElement("span");
        hint.className = "error-hint";
        ratingSection.appendChild(hint);
      }
      hint.textContent = "กรุณาให้คะแนนครบทุกหัวข้อ (1–5)";
    } else {
      document.getElementById("ratingsSection")?.querySelector(".error-hint")?.remove();
    }

    // 8. Written review
    const wr = form.writtenReview;
    if (!wr.value.trim()) {
      markError(wr, "กรุณาเขียนรีวิวเพื่อแบ่งปันประสบการณ์");
    } else {
      clearError(wr);
    }

    if (!valid) {
      const firstError = form.querySelector(".form-group--error");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return valid;
  }

  // ── Success state ──────────────────────────────────────────────────────────
  function showSuccess() {
    form.style.display = "none";
    successMessage.style.display = "flex";

    document.getElementById("goHomeBtn").addEventListener("click", () => {
      window.location.href = "index.html";
    });

    document.getElementById("reviewMoreBtn").addEventListener("click", () => {
      form.reset();
      Object.keys(ratings).forEach(k => { ratings[k] = 0; });
      document.querySelectorAll(".rating-btn").forEach(b => b.classList.remove("rating-btn--active"));
      courseSelect.innerHTML = `<option value="">-- เลือกรายวิชา --</option>`;
      courseSelect.disabled = true;

      form.style.display = "block";
      successMessage.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
