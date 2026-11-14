/**
 * home.js — Logic for the Home page (index.html)
 *
 * Handles:
 *  - Populating the faculty filter dropdown
 *  - Live search + faculty filter
 *  - Rendering review cards
 *  - Updating hero stats counters
 */

document.addEventListener("DOMContentLoaded", () => {
  // ── DOM references ─────────────────────────────────────────────────────────
  const searchInput   = document.getElementById("searchInput");
  const facultyFilter = document.getElementById("facultyFilter");
  const reviewsGrid   = document.getElementById("reviewsGrid");
  const resultCount   = document.getElementById("resultCount");

  // ── Populate faculty dropdown ──────────────────────────────────────────────
  getAllFaculties().forEach(f => {
    const opt = document.createElement("option");
    opt.value = f.faculty_name;
    const courseCount = f.courses ? f.courses.length : 0;
    opt.textContent = courseCount > 0
      ? `${f.faculty_name} (${courseCount} วิชา)`
      : `${f.faculty_name}`;
    facultyFilter.appendChild(opt);
  });

  // ── Event listeners ────────────────────────────────────────────────────────
  searchInput.addEventListener("input", renderReviews);
  facultyFilter.addEventListener("change", renderReviews);

  // ── Initial render ─────────────────────────────────────────────────────────
  renderReviews();
  updateStatsCounters();

  // ── Cloud Sync with Google Sheets ──────────────────────────────────────────
  syncReviewsFromCloud(() => {
    renderReviews();
    updateStatsCounters();
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  RENDER FUNCTIONS
  // ══════════════════════════════════════════════════════════════════════════

  function renderReviews() {
    const query       = searchInput.value;
    const facultyName = facultyFilter.value;
    const reviews     = searchReviews(query, facultyName)
      .filter(r => (r.name_th || r.courseName || r.course_id || r.course_code));

    reviewsGrid.innerHTML = "";

    if (reviews.length === 0) {
      reviewsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">
            <svg class="ui-icon ui-icon--xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <p class="empty-state__title">ไม่พบรีวิวที่ค้นหา</p>
          <p class="empty-state__sub">ลองเปลี่ยนคำค้นหาหรือเลือกคณะอื่นดูนะ</p>
        </div>`;
      resultCount.textContent = "พบ 0 รีวิว";
      return;
    }

    resultCount.textContent = `พบ ${reviews.length} รีวิว`;
    reviews.forEach(r => {
      reviewsGrid.appendChild(buildReviewCard(r));
    });
  }

  // ── Build a single review card DOM element ─────────────────────────────────
  function buildReviewCard(r) {
    const card = document.createElement("div");
    card.className = "review-card";

    const avg = computeAvgRating(r.ratings);
    const dateStr = formatDate(r.createdAt);

    // Resolve full course info from master database (ensures BOTH Thai & English codes are shown)
    const resolved = typeof resolveCourseInfo === "function" ? resolveCourseInfo(r) : {};
    const thaiId   = resolved.course_id || r.course_id || "";
    const engCode  = resolved.course_code || r.course_code || "";
    const nameTh   = resolved.name_th || r.name_th || r.courseName || "";
    const nameEn   = resolved.name_en || r.name_en || "";
    const faculty  = resolved.faculty || (typeof getFacultyName === "function" ? getFacultyName(r.faculty) : r.faculty) || "";

    card.innerHTML = `
      <div class="review-card__header">
        <div class="review-card__badges">
          <span class="badge badge--faculty">${escHtml(faculty)}</span>
          <span class="badge badge--credits">${r.credits} หน่วยกิต</span>
        </div>
        <div class="review-card__meta-right">
          <span class="review-card__date">${dateStr}</span>
        </div>
      </div>

      <div class="review-card__course">
        <div class="review-card__course-codes">
          ${thaiId ? `<span class="badge-code badge-code--th">${escHtml(thaiId)}</span>` : ""}
          ${engCode ? `<span class="badge-code badge-code--en">${escHtml(engCode)}</span>` : ""}
        </div>
        <h3 class="review-card__name">${escHtml(nameTh)}</h3>
        ${nameEn ? `<p class="review-card__name-en">${escHtml(nameEn)}</p>` : ""}
      </div>

      <div class="review-card__details">
        <span class="detail-chip detail-chip--format">${formatIcon(r.learningFormat)} ${escHtml(r.learningFormat)}</span>
        ${r.classSchedule ? `<span class="detail-chip detail-chip--schedule">${scheduleIcon()} ${escHtml(typeof cleanScheduleString === "function" ? cleanScheduleString(r.classSchedule) : r.classSchedule)}</span>` : ""}
        <span class="detail-chip detail-chip--attendance">${attendanceIcon(r.attendance)} ${escHtml(r.attendance)}</span>
        <span class="detail-chip detail-chip--reviewer">${reviewerIcon()} ${escHtml(r.displayName)}</span>
      </div>

      <div class="review-card__ratings">
        <div class="ratings-header">
          <span class="ratings-label">คะแนนเฉลี่ย</span>
          <span class="ratings-avg">${avg}/5</span>
        </div>
        <div class="ratings-grid">
          ${ratingRow("ความเข้าใจง่ายของเนื้อหา",      r.ratings.contentClarity)}
          ${ratingRow("ความเหมาะสมของปริมาณงาน",        r.ratings.workloadAppropriateness)}
          ${ratingRow("ความง่ายของข้อสอบ",              r.ratings.examEase)}
          ${ratingRow("ความใจดีของอาจารย์",             r.ratings.instructorKindness)}
          ${ratingRow("ความง่ายของการให้เกรด",           r.ratings.gradingEase)}
        </div>
      </div>

      ${(r.writtenReview && r.writtenReview.trim()) ? `
      <div class="review-card__written">
        <div class="written-label">
          <svg class="ui-icon ui-icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          รีวิวจากผู้เรียน
        </div>
        <p class="written-text">${escHtml(r.writtenReview.trim())}</p>
      </div>` : ""}
    `;

    return card;
  }

  function ratingRow(label, score) {
    const filled = Math.round(score);
    const dots = Array.from({ length: 5 }, (_, i) =>
      `<span class="dot ${i < filled ? "dot--filled" : ""}"></span>`
    ).join("");
    return `
      <div class="rating-row">
        <span class="rating-row__label">${label}</span>
        <span class="rating-row__dots">${dots}</span>
        <span class="rating-row__score">${score}/5</span>
      </div>`;
  }

  // ── Hero stats updater ─────────────────────────────────────────────────────
  function updateStatsCounters() {
    const statReviews   = document.getElementById("statReviews");
    const statCourses   = document.getElementById("statCourses");
    const statFaculties = document.getElementById("statFaculties");

    if (statReviews)   statReviews.textContent   = getAllReviews().length;
    if (statCourses)   statCourses.textContent   = getAllCourses().length;
    if (statFaculties) statFaculties.textContent = getAllFaculties().length;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  function computeAvgRating(ratings) {
    const vals = Object.values(ratings).map(Number);
    const sum  = vals.reduce((a, b) => a + b, 0);
    return (sum / vals.length).toFixed(1);
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("th-TH", {
      year: "numeric", month: "short", day: "numeric",
    });
  }

  function formatIcon(format) {
    if (format === "Online") {
      return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;
    }
    if (format === "Onsite") {
      return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10h1v2H9zM14 10h1v2H14zM9 14h1v2H9zM14 14h1v2H14z"/></svg>`;
    }
    if (format === "Hybrid") {
      return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`;
    }
    return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
  }

  function attendanceIcon(att) {
    if (att === "มีการเช็คชื่อ") {
      return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    }
    if (att === "ไม่มีการเช็คชื่อ") {
      return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    }
    return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  }

  function scheduleIcon() {
    return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  }

  function reviewerIcon() {
    return `<svg class="ui-icon ui-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  }

  function escHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
});
