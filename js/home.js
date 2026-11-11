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
  // Seed sample data matching master course catalog on first visit
  seedSampleReviews();

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
    const reviews     = searchReviews(query, facultyName);

    reviewsGrid.innerHTML = "";

    if (reviews.length === 0) {
      reviewsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
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

    // Course ID & Code display
    const thaiId  = r.course_id || "";
    const engCode = r.course_code || "";
    const nameTh  = r.name_th || r.courseName || "";
    const nameEn  = r.name_en || "";

    card.innerHTML = `
      <div class="review-card__header">
        <div class="review-card__badges">
          <span class="badge badge--faculty">${escHtml(r.faculty || getFacultyName(r.faculty))}</span>
          <span class="badge badge--credits">${r.credits} หน่วยกิต</span>
        </div>
        <div class="review-card__meta-right">
          <span class="review-card__date">${dateStr}</span>
        </div>
      </div>

      <div class="review-card__course">
        <div class="review-card__course-codes">
          ${thaiId ? `<span class="badge-code badge-code--th">${escHtml(thaiId)}</span>` : ""}
          ${engCode ? `<span class="badge-code badge-code--en">${escHtml(engCode)}</span>` : (!thaiId && r.courseId ? `<span class="badge-code badge-code--en">${escHtml(r.courseId)}</span>` : "")}
        </div>
        <h3 class="review-card__name">${escHtml(nameTh)}</h3>
        ${nameEn ? `<p class="review-card__name-en">${escHtml(nameEn)}</p>` : ""}
      </div>

      <div class="review-card__details">
        <span class="detail-chip detail-chip--format">${formatIcon(r.learningFormat)} ${escHtml(r.learningFormat)}</span>
        ${r.classSchedule ? `<span class="detail-chip detail-chip--schedule">🕐 ${escHtml(r.classSchedule)}</span>` : ""}
        <span class="detail-chip detail-chip--attendance">${attendanceIcon(r.attendance)} ${escHtml(r.attendance)}</span>
        <span class="detail-chip detail-chip--reviewer">👤 ${escHtml(r.displayName)}</span>
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

      <div class="review-card__written">
        <div class="written-label">💬 รีวิวจากผู้เรียน</div>
        <p class="written-text">${escHtml(r.writtenReview)}</p>
      </div>
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
    const map = { Online: "💻", Onsite: "🏫", Hybrid: "🔄" };
    return map[format] || "📚";
  }

  function attendanceIcon(att) {
    if (att === "มีการเช็คชื่อ") return "✅";
    if (att === "ไม่มีการเช็คชื่อ") return "❌";
    return "❓";
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
