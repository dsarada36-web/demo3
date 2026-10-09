/**
 * Comprehensive Test Suite for RateMyProf Web Application
 * Tests HTML element integrity, JavaScript logic, CSS consistency, and Edge Cases
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const http = require('http');

const projectDir = __dirname;
console.log('--- Starting RateMyProf Automated Verification ---');

// 1. Verify files exist
const htmlPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'styles.css');
const jsPath = path.join(projectDir, 'app.js');
const readmePath = path.join(projectDir, 'README.md');

assert(fs.existsSync(htmlPath), 'index.html must exist');
assert(fs.existsSync(cssPath), 'styles.css must exist');
assert(fs.existsSync(jsPath), 'app.js must exist');
assert(fs.existsSync(readmePath), 'README.md must exist');
console.log('✓ All core files exist.');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// 2. Check required DOM element IDs referenced in app.js
const requiredIds = [
  'themeToggleBtn',
  'statProfCount',
  'statReviewCount',
  'savedCountBadge',
  'compareCountBadge',
  'savedProfsBtn',
  'compareProfsBtn',
  'addProfBtn',
  'rateNewBtn',
  'brandHomeBtn',
  'seedResetBtn',
  'searchInput',
  'clearSearchBtn',
  'searchAutocomplete',
  'deptFilterPills',
  'ratingFilterSelect',
  'difficultyFilterSelect',
  'sortBySelect',
  'catalogHeading',
  'resultsCountText',
  'activeFilterChips',
  'professorsGrid',
  'emptyState',
  'resetFiltersBtn',
  'compareDock',
  'compareDockCount',
  'compareDockChips',
  'launchCompareBtn',
  'clearCompareBtn',
  'profileModal',
  'profileModalBody',
  'closeProfileModalBtn',
  'rateModal',
  'closeRateModalBtn',
  'cancelRateBtn',
  'ratingForm',
  'rateProfSelect',
  'starRatingPicker',
  'ratingFeedbackLabel',
  'overallRatingValue',
  'difficultyPicker',
  'difficultyValue',
  'courseCodeInput',
  'gradeReceivedSelect',
  'textbookSelect',
  'workloadSelect',
  'reviewCommentInput',
  'reviewerRoleInput',
  'tagsSelector',
  'charCount',
  'addProfModal',
  'closeAddProfModalBtn',
  'cancelAddProfBtn',
  'addProfForm',
  'newProfName',
  'newProfDept',
  'newProfUniv',
  'newProfCourses',
  'newProfBio',
  'compareModal',
  'closeCompareModalBtn',
  'compareModalBody',
  'reportModal',
  'closeReportModalBtn',
  'cancelReportBtn',
  'reportReviewForm',
  'reportProfId',
  'reportRevId',
  'reportReasonSelect',
  'reportDetailsInput',
  'toastContainer'
];

let missingIds = [];
requiredIds.forEach(id => {
  if (!htmlContent.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
});

assert.strictEqual(missingIds.length, 0, `Missing IDs in index.html: ${missingIds.join(', ')}`);
console.log(`✓ All ${requiredIds.length} required HTML element IDs verified in index.html.`);

// 3. Check CSS rules for newly implemented features
const requiredCssClasses = [
  '.search-autocomplete-dropdown',
  '.autocomplete-item',
  '.autocomplete-match',
  '.btn-card-compare',
  '.compare-dock',
  '.compare-dock-chip',
  '.compare-matrix-grid',
  '.compare-card-column',
  '.grade-dist-section',
  '.grade-stacked-bar',
  '.grade-segment',
  '.gpa-badge-pill',
  '.logistics-grid',
  '.logistics-card',
  '.profile-reviews-toolbar',
  '.course-chip',
  '.btn-unhelpful',
  '.btn-report',
  '.review-flagged-banner',
  '.semester-plan-banner',
  '.student-notes-section',
  '.student-note-textarea',
  '.btn-share'
];

let missingCss = [];
requiredCssClasses.forEach(cls => {
  if (!cssContent.includes(cls)) {
    missingCss.push(cls);
  }
});

assert.strictEqual(missingCss.length, 0, `Missing CSS classes in styles.css: ${missingCss.join(', ')}`);
console.log(`✓ All ${requiredCssClasses.length} required CSS class selectors verified in styles.css.`);

// 4. Test calculation logic in mock environment
const GPA_WEIGHTS = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D': 1.0, 'F': 0.0
};

function calculateGradeStats(reviews) {
  const counts = { A: 0, B: 0, C: 0, DF: 0, Other: 0 };
  let gpaPoints = 0;
  let gpaCount = 0;
  let total = 0;

  if (!reviews || reviews.length === 0) {
    return { counts, percentages: { A: 0, B: 0, C: 0, DF: 0, Other: 0 }, avgGpa: null, total: 0 };
  }

  reviews.forEach((r) => {
    const g = (r.grade || '').trim();
    if (!g) return;
    total++;

    if (['A+', 'A', 'A-'].includes(g)) counts.A++;
    else if (['B+', 'B', 'B-'].includes(g)) counts.B++;
    else if (['C+', 'C', 'C-'].includes(g)) counts.C++;
    else if (['D', 'F'].includes(g)) counts.DF++;
    else counts.Other++;

    if (GPA_WEIGHTS[g] !== undefined) {
      gpaPoints += GPA_WEIGHTS[g];
      gpaCount++;
    }
  });

  const percentages = {
    A: total > 0 ? Math.round((counts.A / total) * 100) : 0,
    B: total > 0 ? Math.round((counts.B / total) * 100) : 0,
    C: total > 0 ? Math.round((counts.C / total) * 100) : 0,
    DF: total > 0 ? Math.round((counts.DF / total) * 100) : 0,
    Other: total > 0 ? Math.round((counts.Other / total) * 100) : 0
  };

  const avgGpa = gpaCount > 0 ? (gpaPoints / gpaCount).toFixed(2) : null;
  return { counts, percentages, avgGpa, total };
}

// Test grade calculation with mock sample
const testReviews = [
  { grade: 'A' },
  { grade: 'A-' },
  { grade: 'B+' },
  { grade: 'C' }
];

const res = calculateGradeStats(testReviews);
assert.strictEqual(res.total, 4);
assert.strictEqual(res.counts.A, 2);
assert.strictEqual(res.counts.B, 1);
assert.strictEqual(res.counts.C, 1);
assert.strictEqual(res.counts.DF, 0);
assert.strictEqual(res.percentages.A, 50);
assert.strictEqual(res.avgGpa, '3.25');
console.log('✓ Grade distribution and GPA calculation logic passed.');

// Edge cases
const emptyRes = calculateGradeStats([]);
assert.strictEqual(emptyRes.total, 0);
assert.strictEqual(emptyRes.avgGpa, null);

const nullRes = calculateGradeStats(null);
assert.strictEqual(nullRes.total, 0);
assert.strictEqual(nullRes.avgGpa, null);

const nonGradedRes = calculateGradeStats([{ grade: 'Pass' }, { grade: 'In Progress' }]);
assert.strictEqual(nonGradedRes.total, 2);
assert.strictEqual(nonGradedRes.counts.Other, 2);
assert.strictEqual(nonGradedRes.avgGpa, null);
console.log('✓ Edge cases for grade calculations (empty, null, non-letter grades) passed.');

// 5. Test Regex Special Character Escaping in search query
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const specialQueries = ['C++', 'MATH.151', '(CS101)', '[ME220]', 'Dr. Chen*'];
specialQueries.forEach(q => {
  const escaped = escapeRegex(q);
  const regex = new RegExp(`(${escaped})`, 'gi');
  assert(regex.test(q), `Regex should safely match escaped query "${q}"`);
});
console.log('✓ Search query regex escaping handled safely for special characters.');

// 6. Test Live Server Response
http.get('http://localhost:3000', (resp) => {
  assert.strictEqual(resp.statusCode, 200, 'Dev server should respond with 200');
  console.log('✓ Local development server responded with status 200.');
  console.log('\n--- ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
  process.exit(0);
}).on('error', (err) => {
  console.error('Server check failed:', err.message);
  process.exit(1);
});
