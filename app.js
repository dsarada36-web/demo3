/**
 * RateMyProf - Student Professor Ratings Application
 * Pure Vanilla JavaScript with LocalStorage Persistence
 */

(function () {
  'use strict';

  // ================= STORAGE KEYS =================
  const STORAGE_KEYS = {
    PROFESSORS: 'profpulse_professors_data_v1',
    SAVED_PROFS: 'profpulse_saved_profs_v1',
    THEME: 'profpulse_theme_v1',
    HELPFUL_VOTES: 'profpulse_helpful_votes_v1'
  };

  // ================= SEED DATA =================
  const INITIAL_SEED_DATA = [
    {
      id: 'prof-1',
      name: 'Dr. Marcus Chen',
      department: 'Computer Science',
      university: 'State University',
      courses: ['CS 101', 'CS 201', 'CS 350'],
      bio: 'Associate Professor of Computer Science specializing in Algorithms and Distributed Computing.',
      overallRating: 4.8,
      difficulty: 2.8,
      wouldTakeAgainPercent: 96,
      tags: ['Clear Grading Criteria', 'Inspirational', 'Accessible Outside Class'],
      reviews: [
        {
          id: 'rev-101',
          overallRating: 5,
          difficulty: 3,
          course: 'CS 201',
          grade: 'A',
          takeAgain: true,
          attendanceMandatory: false,
          tags: ['Inspirational', 'Clear Grading Criteria'],
          comment: 'Dr. Chen is genuinely one of the best professors I have ever had. His slides and code walkthroughs are super clear, and his office hours are packed because he will patiently explain concepts until you get it.',
          date: 'Sep 28, 2026',
          studentRole: 'CS Sophomore',
          helpfulCount: 24
        },
        {
          id: 'rev-102',
          overallRating: 5,
          difficulty: 2,
          course: 'CS 101',
          grade: 'A+',
          takeAgain: true,
          attendanceMandatory: true,
          tags: ['Accessible Outside Class', 'Engaging Lectures'],
          comment: 'Amazing intro to programming class. No prior coding experience required. Exams are very fair and directly reflect practice midterm problems.',
          date: 'Sep 12, 2026',
          studentRole: 'Freshman',
          helpfulCount: 15
        },
        {
          id: 'rev-103',
          overallRating: 4,
          difficulty: 3,
          course: 'CS 350',
          grade: 'B+',
          takeAgain: true,
          attendanceMandatory: false,
          tags: ['Clear Grading Criteria', 'Lots of Homework'],
          comment: 'Challenging project assignments, but you learn an insane amount of real-world backend architectural skills. Start homework early and you will do well!',
          date: 'Aug 20, 2026',
          studentRole: 'Junior CS Major',
          helpfulCount: 9
        }
      ]
    },
    {
      id: 'prof-2',
      name: 'Prof. Sarah Jenkins',
      department: 'Mathematics',
      university: 'State University',
      courses: ['MATH 151', 'MATH 252', 'MATH 310'],
      bio: 'Department of Mathematics. Passionate about Multivariable Calculus and Linear Algebra pedagogy.',
      overallRating: 4.4,
      difficulty: 3.6,
      wouldTakeAgainPercent: 88,
      tags: ['Tough Grader', 'Engaging Lectures', 'Extra Credit Offered'],
      reviews: [
        {
          id: 'rev-201',
          overallRating: 5,
          difficulty: 4,
          course: 'MATH 151',
          grade: 'A-',
          takeAgain: true,
          attendanceMandatory: true,
          tags: ['Engaging Lectures', 'Extra Credit Offered'],
          comment: 'She has great energy and handwriting on the board is immaculate. Calculus can be intimidating, but Prof. Jenkins makes the proofs intuitive. She also gives weekly homework bonus points.',
          date: 'Oct 02, 2026',
          studentRole: 'Engineering Freshman',
          helpfulCount: 18
        },
        {
          id: 'rev-202',
          overallRating: 4,
          difficulty: 4,
          course: 'MATH 252',
          grade: 'B',
          takeAgain: true,
          attendanceMandatory: true,
          tags: ['Tough Grader', 'Lots of Homework'],
          comment: 'Exams are definitely difficult and graded stringently, but she curves generously if the class average is low. Do all textbook problem sets.',
          date: 'Aug 14, 2026',
          studentRole: 'Math Major',
          helpfulCount: 8
        }
      ]
    },
    {
      id: 'prof-3',
      name: 'Dr. Arthur Vance',
      department: 'Physics & Engineering',
      university: 'State University',
      courses: ['PHYS 207', 'PHYS 208'],
      bio: 'Senior Lecturer in Classical Mechanics and Electromagnetism.',
      overallRating: 2.3,
      difficulty: 4.7,
      wouldTakeAgainPercent: 25,
      tags: ['Tough Grader', 'Beware of Pop Quizzes', 'Lots of Homework'],
      reviews: [
        {
          id: 'rev-301',
          overallRating: 2,
          difficulty: 5,
          course: 'PHYS 207',
          grade: 'C-',
          takeAgain: false,
          attendanceMandatory: true,
          tags: ['Tough Grader', 'Beware of Pop Quizzes'],
          comment: 'Lectures consist of him reading directly off dense derivations without explaining the intuition. Tests are brutal and 10x harder than homework problems.',
          date: 'Sep 19, 2026',
          studentRole: 'Mechanical Eng Major',
          helpfulCount: 38
        },
        {
          id: 'rev-302',
          overallRating: 3,
          difficulty: 4,
          course: 'PHYS 207',
          grade: 'B-',
          takeAgain: false,
          attendanceMandatory: true,
          tags: ['Lots of Homework', 'Participation Matters'],
          comment: 'Be prepared to self-teach via YouTube and MIT OpenCourseWare. He is knowledgeable in office hours, but classroom teaching style is very dry.',
          date: 'Jul 29, 2026',
          studentRole: 'Physics Sophomore',
          helpfulCount: 14
        }
      ]
    },
    {
      id: 'prof-4',
      name: 'Prof. Maya Lin',
      department: 'Business & Economics',
      university: 'State University',
      courses: ['ECON 101', 'ECON 320', 'FIN 210'],
      bio: 'Macroeconomics & Corporate Finance Professor. Former financial consultant.',
      overallRating: 4.9,
      difficulty: 2.1,
      wouldTakeAgainPercent: 98,
      tags: ['Hilarious', 'Engaging Lectures', 'Clear Grading Criteria'],
      reviews: [
        {
          id: 'rev-401',
          overallRating: 5,
          difficulty: 2,
          course: 'ECON 101',
          grade: 'A',
          takeAgain: true,
          attendanceMandatory: false,
          tags: ['Hilarious', 'Engaging Lectures'],
          comment: 'Prof. Lin brings current market news and hilarious pop-culture analogies to explain monetary policy. Lectures fly by, and exam review sheets match the test format.',
          date: 'Oct 04, 2026',
          studentRole: 'Business Freshman',
          helpfulCount: 22
        },
        {
          id: 'rev-402',
          overallRating: 5,
          difficulty: 2,
          course: 'ECON 320',
          grade: 'A+',
          takeAgain: true,
          attendanceMandatory: true,
          tags: ['Clear Grading Criteria', 'Accessible Outside Class'],
          comment: 'Take her class if you can! She gives amazing career mentorship and helped multiple students land summer finance internships.',
          date: 'Sep 05, 2026',
          studentRole: 'Junior Finance',
          helpfulCount: 11
        }
      ]
    },
    {
      id: 'prof-5',
      name: 'Dr. Rebecca Foster',
      department: 'Psychology',
      university: 'State University',
      courses: ['PSYC 101', 'PSYC 240', 'PSYC 405'],
      bio: 'Cognitive Psychology and Behavioral Neuroscience researcher.',
      overallRating: 4.6,
      difficulty: 2.5,
      wouldTakeAgainPercent: 92,
      tags: ['Inspirational', 'Participation Matters', 'Clear Grading Criteria'],
      reviews: [
        {
          id: 'rev-501',
          overallRating: 5,
          difficulty: 2,
          course: 'PSYC 101',
          grade: 'A',
          takeAgain: true,
          attendanceMandatory: true,
          tags: ['Inspirational', 'Clear Grading Criteria'],
          comment: 'Hands down the most fascinating introductory course I have taken. She demonstrates visual illusions and memory biases in real time during class.',
          date: 'Sep 22, 2026',
          studentRole: 'Undeclared Freshman',
          helpfulCount: 16
        },
        {
          id: 'rev-502',
          overallRating: 4,
          difficulty: 3,
          course: 'PSYC 240',
          grade: 'B+',
          takeAgain: true,
          attendanceMandatory: true,
          tags: ['Group Projects', 'Participation Matters'],
          comment: 'Very interactive discussions. There is a semester group research paper, so pick good teammates. Overall Dr. Foster is super approachable.',
          date: 'Aug 18, 2026',
          studentRole: 'Psychology Junior',
          helpfulCount: 7
        }
      ]
    },
    {
      id: 'prof-6',
      name: 'Prof. Julian Alvarez',
      department: 'Humanities & Arts',
      university: 'State University',
      courses: ['ENG 110', 'LIT 230', 'CW 201'],
      bio: 'Published author, teaching Creative Writing and Modern Contemporary Literature.',
      overallRating: 4.7,
      difficulty: 2.4,
      wouldTakeAgainPercent: 94,
      tags: ['Inspirational', 'Clear Grading Criteria', 'Accessible Outside Class'],
      reviews: [
        {
          id: 'rev-601',
          overallRating: 5,
          difficulty: 2,
          course: 'CW 201',
          grade: 'A',
          takeAgain: true,
          attendanceMandatory: true,
          tags: ['Inspirational', 'Accessible Outside Class'],
          comment: 'Prof. Alvarez provides the most constructive, detailed essay feedback of any teacher I have ever had. He truly cares about developing student writing voices.',
          date: 'Sep 15, 2026',
          studentRole: 'English Major',
          helpfulCount: 13
        }
      ]
    },
    {
      id: 'prof-7',
      name: 'Dr. Gregory Houseman',
      department: 'Physics & Engineering',
      university: 'State University',
      courses: ['ENGR 102', 'ME 220'],
      bio: 'Thermodynamics & Fluid Dynamics Professor.',
      overallRating: 3.2,
      difficulty: 4.2,
      wouldTakeAgainPercent: 50,
      tags: ['Tough Grader', 'Lots of Homework', 'Group Projects'],
      reviews: [
        {
          id: 'rev-701',
          overallRating: 3,
          difficulty: 4,
          course: 'ME 220',
          grade: 'B-',
          takeAgain: false,
          attendanceMandatory: true,
          tags: ['Tough Grader', 'Lots of Homework'],
          comment: 'Very rigorous. Homework takes 12-15 hours per week. If you need this class to graduate, form a study group immediately.',
          date: 'Aug 04, 2026',
          studentRole: 'Mechanical Eng Junior',
          helpfulCount: 19
        }
      ]
    }
  ];

  // ================= APPLICATION STATE =================
  let professors = [];
  let savedProfIds = new Set();
  let helpfulVotes = new Set();
  let activeDept = 'all';
  let searchQuery = '';
  let minRatingFilter = 0;
  let difficultyFilter = 'all';
  let sortBy = 'rating_desc';
  let showingSavedOnly = false;
  let currentActiveProfileProfId = null;

  // Selected state for rating form
  let selectedRatingStars = 0;
  let selectedDifficulty = 0;
  let selectedFormTags = new Set();

  // ================= DOM ELEMENTS =================
  const elements = {
    // Theme
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    // Stats & Header
    statProfCount: document.getElementById('statProfCount'),
    statReviewCount: document.getElementById('statReviewCount'),
    savedCountBadge: document.getElementById('savedCountBadge'),
    savedProfsBtn: document.getElementById('savedProfsBtn'),
    addProfBtn: document.getElementById('addProfBtn'),
    rateNewBtn: document.getElementById('rateNewBtn'),
    brandHomeBtn: document.getElementById('brandHomeBtn'),
    seedResetBtn: document.getElementById('seedResetBtn'),

    // Search & Filters
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    deptFilterPills: document.getElementById('deptFilterPills'),
    ratingFilterSelect: document.getElementById('ratingFilterSelect'),
    difficultyFilterSelect: document.getElementById('difficultyFilterSelect'),
    sortBySelect: document.getElementById('sortBySelect'),
    catalogHeading: document.getElementById('catalogHeading'),
    resultsCountText: document.getElementById('resultsCountText'),
    activeFilterChips: document.getElementById('activeFilterChips'),
    professorsGrid: document.getElementById('professorsGrid'),
    emptyState: document.getElementById('emptyState'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),

    // Modals
    profileModal: document.getElementById('profileModal'),
    profileModalBody: document.getElementById('profileModalBody'),
    closeProfileModalBtn: document.getElementById('closeProfileModalBtn'),

    rateModal: document.getElementById('rateModal'),
    closeRateModalBtn: document.getElementById('closeRateModalBtn'),
    cancelRateBtn: document.getElementById('cancelRateBtn'),
    ratingForm: document.getElementById('ratingForm'),
    rateProfSelect: document.getElementById('rateProfSelect'),
    starRatingPicker: document.getElementById('starRatingPicker'),
    ratingFeedbackLabel: document.getElementById('ratingFeedbackLabel'),
    overallRatingValue: document.getElementById('overallRatingValue'),
    difficultyPicker: document.getElementById('difficultyPicker'),
    difficultyValue: document.getElementById('difficultyValue'),
    courseCodeInput: document.getElementById('courseCodeInput'),
    gradeReceivedSelect: document.getElementById('gradeReceivedSelect'),
    reviewCommentInput: document.getElementById('reviewCommentInput'),
    reviewerRoleInput: document.getElementById('reviewerRoleInput'),
    tagsSelector: document.getElementById('tagsSelector'),
    charCount: document.getElementById('charCount'),

    addProfModal: document.getElementById('addProfModal'),
    closeAddProfModalBtn: document.getElementById('closeAddProfModalBtn'),
    cancelAddProfBtn: document.getElementById('cancelAddProfBtn'),
    addProfForm: document.getElementById('addProfForm'),
    newProfName: document.getElementById('newProfName'),
    newProfDept: document.getElementById('newProfDept'),
    newProfUniv: document.getElementById('newProfUniv'),
    newProfCourses: document.getElementById('newProfCourses'),
    newProfBio: document.getElementById('newProfBio'),

    toastContainer: document.getElementById('toastContainer')
  };

  // ================= INITIALIZATION =================
  function init() {
    loadTheme();
    loadStorageData();
    bindEvents();
    renderAll();
  }

  // ================= STORAGE MANAGEMENT =================
  function loadStorageData() {
    try {
      const storedProfs = localStorage.getItem(STORAGE_KEYS.PROFESSORS);
      if (storedProfs) {
        professors = JSON.parse(storedProfs);
      } else {
        professors = JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
        saveProfessors();
      }

      const storedSaved = localStorage.getItem(STORAGE_KEYS.SAVED_PROFS);
      if (storedSaved) {
        savedProfIds = new Set(JSON.parse(storedSaved));
      }

      const storedVotes = localStorage.getItem(STORAGE_KEYS.HELPFUL_VOTES);
      if (storedVotes) {
        helpfulVotes = new Set(JSON.parse(storedVotes));
      }
    } catch (e) {
      console.error('Error loading localStorage data:', e);
      professors = JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
    }
  }

  function saveProfessors() {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFESSORS, JSON.stringify(professors));
    } catch (e) {
      console.error('Error saving professors:', e);
    }
  }

  function saveSavedProfs() {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_PROFS, JSON.stringify(Array.from(savedProfIds)));
    } catch (e) {
      console.error('Error saving bookmarked professors:', e);
    }
  }

  function saveHelpfulVotes() {
    try {
      localStorage.setItem(STORAGE_KEYS.HELPFUL_VOTES, JSON.stringify(Array.from(helpfulVotes)));
    } catch (e) {
      console.error('Error saving helpful votes:', e);
    }
  }

  // ================= THEME TOGGLE =================
  function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    showToast(`Switched to ${newTheme} mode`, 'info');
  }

  // ================= STATS RECALCULATION =================
  function recalculateProfessorStats(prof) {
    if (!prof.reviews || prof.reviews.length === 0) {
      prof.overallRating = 0;
      prof.difficulty = 0;
      prof.wouldTakeAgainPercent = 0;
      prof.tags = [];
      return;
    }

    const totalReviews = prof.reviews.length;
    const sumRating = prof.reviews.reduce((acc, r) => acc + Number(r.overallRating), 0);
    const sumDifficulty = prof.reviews.reduce((acc, r) => acc + Number(r.difficulty), 0);
    const takeAgainCount = prof.reviews.filter((r) => r.takeAgain === true || r.takeAgain === 'yes').length;

    prof.overallRating = parseFloat((sumRating / totalReviews).toFixed(1));
    prof.difficulty = parseFloat((sumDifficulty / totalReviews).toFixed(1));
    prof.wouldTakeAgainPercent = Math.round((takeAgainCount / totalReviews) * 100);

    // Collect tags by frequency
    const tagCounts = {};
    prof.reviews.forEach((r) => {
      if (Array.isArray(r.tags)) {
        r.tags.forEach((t) => {
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
      }
    });

    prof.tags = Object.keys(tagCounts)
      .sort((a, b) => tagCounts[b] - tagCounts[a])
      .slice(0, 3);
  }

  // ================= RENDER LOGIC =================
  function renderAll() {
    updateHeaderStats();
    populateProfessorDropdown();
    renderFilteredGrid();
  }

  function updateHeaderStats() {
    const totalReviews = professors.reduce((acc, p) => acc + (p.reviews ? p.reviews.length : 0), 0);
    elements.statProfCount.textContent = professors.length;
    elements.statReviewCount.textContent = totalReviews;
    elements.savedCountBadge.textContent = savedProfIds.size;
  }

  function populateProfessorDropdown(selectedId = null) {
    elements.rateProfSelect.innerHTML = '<option value="">-- Choose a professor --</option>';
    const sorted = [...professors].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.name} (${p.department})`;
      if (selectedId && p.id === selectedId) {
        opt.selected = true;
      }
      elements.rateProfSelect.appendChild(opt);
    });
  }

  // Filter & Sort Logic
  function getFilteredProfessors() {
    return professors.filter((p) => {
      // Saved filter
      if (showingSavedOnly && !savedProfIds.has(p.id)) {
        return false;
      }

      // Dept filter
      if (activeDept !== 'all' && p.department !== activeDept) {
        return false;
      }

      // Min Rating filter
      if (minRatingFilter > 0 && p.overallRating < minRatingFilter) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter !== 'all') {
        if (difficultyFilter === 'easy' && p.difficulty > 2.5) return false;
        if (difficultyFilter === 'medium' && (p.difficulty <= 2.5 || p.difficulty >= 3.9)) return false;
        if (difficultyFilter === 'hard' && p.difficulty < 3.9) return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDept = p.department.toLowerCase().includes(query);
        const matchesUniv = (p.university || '').toLowerCase().includes(query);
        const matchesCourse = (p.courses || []).some((c) => c.toLowerCase().includes(query));
        const matchesTags = (p.tags || []).some((t) => t.toLowerCase().includes(query));

        if (!matchesName && !matchesDept && !matchesUniv && !matchesCourse && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'rating_desc':
          return (b.overallRating || 0) - (a.overallRating || 0);
        case 'reviews_desc':
          return ((b.reviews ? b.reviews.length : 0) - (a.reviews ? a.reviews.length : 0));
        case 'difficulty_asc':
          return (a.difficulty || 0) - (b.difficulty || 0);
        case 'difficulty_desc':
          return (b.difficulty || 0) - (a.difficulty || 0);
        case 'name_asc':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }

  function renderFilteredGrid() {
    const list = getFilteredProfessors();
    elements.resultsCountText.textContent = `Showing ${list.length} of ${professors.length} professors`;

    if (showingSavedOnly) {
      elements.catalogHeading.textContent = 'Saved / Bookmarked Professors';
    } else if (activeDept !== 'all') {
      elements.catalogHeading.textContent = `${activeDept} Faculty`;
    } else {
      elements.catalogHeading.textContent = 'All Faculty Members';
    }

    renderActiveFilterChips();

    if (list.length === 0) {
      elements.professorsGrid.style.display = 'none';
      elements.emptyState.style.display = 'block';
      return;
    }

    elements.emptyState.style.display = 'none';
    elements.professorsGrid.style.display = 'grid';
    elements.professorsGrid.innerHTML = '';

    list.forEach((p) => {
      elements.professorsGrid.appendChild(createProfessorCard(p));
    });
  }

  function renderActiveFilterChips() {
    elements.activeFilterChips.innerHTML = '';
    const chips = [];

    if (showingSavedOnly) {
      chips.push({
        label: 'Showing: Bookmarked Only',
        onRemove: () => {
          showingSavedOnly = false;
          renderFilteredGrid();
        }
      });
    }

    if (activeDept !== 'all') {
      chips.push({
        label: `Dept: ${activeDept}`,
        onRemove: () => {
          activeDept = 'all';
          updateDeptPillUI();
          renderFilteredGrid();
        }
      });
    }

    if (minRatingFilter > 0) {
      chips.push({
        label: `Rating >= ${minRatingFilter}★`,
        onRemove: () => {
          minRatingFilter = 0;
          elements.ratingFilterSelect.value = '0';
          renderFilteredGrid();
        }
      });
    }

    if (difficultyFilter !== 'all') {
      chips.push({
        label: `Difficulty: ${difficultyFilter.toUpperCase()}`,
        onRemove: () => {
          difficultyFilter = 'all';
          elements.difficultyFilterSelect.value = 'all';
          renderFilteredGrid();
        }
      });
    }

    if (searchQuery.trim() !== '') {
      chips.push({
        label: `Search: "${searchQuery}"`,
        onRemove: () => {
          searchQuery = '';
          elements.searchInput.value = '';
          elements.clearSearchBtn.style.display = 'none';
          renderFilteredGrid();
        }
      });
    }

    chips.forEach((c) => {
      const chipEl = document.createElement('div');
      chipEl.className = 'filter-chip';
      chipEl.innerHTML = `<span>${c.label}</span><span class="filter-chip-remove" aria-label="Remove filter">&times;</span>`;
      chipEl.querySelector('.filter-chip-remove').addEventListener('click', c.onRemove);
      elements.activeFilterChips.appendChild(chipEl);
    });
  }

  function getScoreColorClass(score) {
    if (score >= 4.0) return 'score-badge-high';
    if (score >= 3.0) return 'score-badge-mid';
    return 'score-badge-low';
  }

  function getInitials(name) {
    return name
      .replace(/Dr\.|Prof\.|Mr\.|Ms\.|Mrs\./g, '')
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  function createProfessorCard(prof) {
    const card = document.createElement('article');
    card.className = 'prof-card';
    card.setAttribute('data-id', prof.id);

    const isSaved = savedProfIds.has(prof.id);
    const reviewCount = prof.reviews ? prof.reviews.length : 0;
    const scoreClass = getScoreColorClass(prof.overallRating);
    const initials = getInitials(prof.name);

    const tagsHtml = (prof.tags || [])
      .map((t) => `<span class="badge-tag">${t}</span>`)
      .join('');

    card.innerHTML = `
      <div class="prof-card-header">
        <div class="prof-identity">
          <div class="prof-avatar">${initials}</div>
          <div class="prof-info">
            <h3 class="prof-name">${escapeHtml(prof.name)}</h3>
            <span class="prof-dept">${escapeHtml(prof.department)}</span>
            <span class="prof-univ">${escapeHtml(prof.university || 'State University')}</span>
          </div>
        </div>
        <button class="prof-bookmark-btn ${isSaved ? 'bookmarked' : ''}" title="${isSaved ? 'Remove from saved' : 'Bookmark professor'}" aria-label="Bookmark professor">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
          </svg>
        </button>
      </div>

      <div class="prof-metrics">
        <div class="metric-item">
          <span class="metric-value ${scoreClass}">${reviewCount > 0 ? prof.overallRating.toFixed(1) : 'N/A'}</span>
          <span class="metric-label">Quality</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${reviewCount > 0 ? prof.difficulty.toFixed(1) : 'N/A'}</span>
          <span class="metric-label">Difficulty</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${reviewCount > 0 ? prof.wouldTakeAgainPercent + '%' : 'N/A'}</span>
          <span class="metric-label">Take Again</span>
        </div>
      </div>

      <div class="prof-tags-container">
        ${tagsHtml || '<span class="badge-tag">No tags yet</span>'}
      </div>

      <div class="prof-card-footer">
        <span class="review-count-label">${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'}</span>
        <div class="card-action-btns">
          <button class="btn btn-secondary btn-card-rate" data-action="rate" title="Rate this professor">
            ⭐ Rate
          </button>
          <button class="btn btn-primary btn-card-rate" data-action="view">
            View Details &rarr;
          </button>
        </div>
      </div>
    `;

    // Event Listeners for Card
    const bookmarkBtn = card.querySelector('.prof-bookmark-btn');
    bookmarkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBookmark(prof.id);
    });

    const rateBtn = card.querySelector('[data-action="rate"]');
    rateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openRatingModalForProf(prof.id);
    });

    const viewBtn = card.querySelector('[data-action="view"]');
    viewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProfileModal(prof.id);
    });

    card.addEventListener('click', () => {
      openProfileModal(prof.id);
    });

    return card;
  }

  function toggleBookmark(profId) {
    if (savedProfIds.has(profId)) {
      savedProfIds.delete(profId);
      showToast('Removed from saved list', 'info');
    } else {
      savedProfIds.add(profId);
      showToast('Saved to your bookmarks! 📌', 'success');
    }
    saveSavedProfs();
    elements.savedCountBadge.textContent = savedProfIds.size;
    renderFilteredGrid();
  }

  // ================= PROFESSOR PROFILE MODAL =================
  function openProfileModal(profId) {
    const prof = professors.find((p) => p.id === profId);
    if (!prof) return;

    currentActiveProfileProfId = profId;
    const reviewCount = prof.reviews ? prof.reviews.length : 0;
    const scoreClass = getScoreColorClass(prof.overallRating);
    const initials = getInitials(prof.name);

    // Rating breakdown distribution (5, 4, 3, 2, 1)
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (prof.reviews) {
      prof.reviews.forEach((r) => {
        const star = Math.round(Number(r.overallRating));
        if (distribution[star] !== undefined) {
          distribution[star]++;
        }
      });
    }

    const breakdownHtml = [5, 4, 3, 2, 1]
      .map((star) => {
        const count = distribution[star];
        const pct = reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0;
        return `
        <div class="breakdown-row">
          <span class="breakdown-label">${star} Stars</span>
          <div class="breakdown-bar-bg">
            <div class="breakdown-bar-fill" style="width: ${pct}%"></div>
          </div>
          <span class="breakdown-count">${count}</span>
        </div>
      `;
      })
      .join('');

    // Reviews list
    const reviewsHtml =
      reviewCount === 0
        ? `<div class="empty-state" style="padding: 2rem 1rem;">
             <p>No reviews yet for Dr. ${escapeHtml(prof.name)}.</p>
             <button class="btn btn-primary" id="btnBeFirstToRate">Be the first to review!</button>
           </div>`
        : prof.reviews
            .map((rev) => {
              const isVoted = helpfulVotes.has(rev.id);
              const revQualityClass = getScoreColorClass(rev.overallRating);
              const tagPills = (rev.tags || []).map((t) => `<span class="badge-tag">${escapeHtml(t)}</span>`).join('');

              return `
          <div class="review-item-card" data-rev-id="${rev.id}">
            <div class="review-card-top">
              <div class="review-badges-row">
                <span class="score-badge-pill quality ${revQualityClass}">Quality ${Number(rev.overallRating).toFixed(1)}</span>
                <span class="badge-tag">Diff ${rev.difficulty || 3.0}</span>
                <span class="badge-tag">${escapeHtml(rev.course || 'Class')}</span>
                ${rev.grade ? `<span class="badge-tag">Grade: ${escapeHtml(rev.grade)}</span>` : ''}
              </div>
              <span class="review-meta-text">${escapeHtml(rev.date || 'Recent')} &bull; ${escapeHtml(rev.studentRole || 'Student')}</span>
            </div>

            <p class="review-text-content">${escapeHtml(rev.comment)}</p>

            ${tagPills ? `<div class="prof-tags-container" style="margin-bottom: 0;">${tagPills}</div>` : ''}

            <div class="review-extra-meta">
              <span>Attendance: <strong>${rev.attendanceMandatory ? 'Mandatory' : 'Optional'}</strong></span>
              <span>Would take again: <strong>${rev.takeAgain ? 'Yes' : 'No'}</strong></span>
            </div>

            <div class="review-card-footer">
              <span class="review-meta-text">Was this review helpful?</span>
              <button class="btn-helpful ${isVoted ? 'voted' : ''}" data-vote-id="${rev.id}">
                👍 <span>Helpful (${rev.helpfulCount || 0})</span>
              </button>
            </div>
          </div>
        `;
            })
            .join('');

    elements.profileModalBody.innerHTML = `
      <div class="profile-hero">
        <div class="profile-hero-left">
          <div class="profile-avatar-lg">${initials}</div>
          <div class="profile-headline">
            <h2 id="profileModalName">${escapeHtml(prof.name)}</h2>
            <p>${escapeHtml(prof.department)} &bull; ${escapeHtml(prof.university || 'State University')}</p>
            ${prof.courses && prof.courses.length ? `<p style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.2rem;">Courses: ${escapeHtml(prof.courses.join(', '))}</p>` : ''}
          </div>
        </div>
        <div>
          <button class="btn btn-primary" id="btnRateFromProfile">
            ⭐ Rate ${escapeHtml(prof.name.split(' ')[0])}
          </button>
        </div>
      </div>

      ${prof.bio ? `<p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">${escapeHtml(prof.bio)}</p>` : ''}

      <div class="profile-stats-grid">
        <div class="pstat-box">
          <div class="pstat-num ${scoreClass}">${reviewCount > 0 ? prof.overallRating.toFixed(1) : 'N/A'}</div>
          <div class="pstat-title">Overall Quality / 5.0</div>
        </div>
        <div class="pstat-box">
          <div class="pstat-num">${reviewCount > 0 ? prof.wouldTakeAgainPercent + '%' : 'N/A'}</div>
          <div class="pstat-title">Would Take Again</div>
        </div>
        <div class="pstat-box">
          <div class="pstat-num">${reviewCount > 0 ? prof.difficulty.toFixed(1) : 'N/A'}</div>
          <div class="pstat-title">Level of Difficulty / 5.0</div>
        </div>
      </div>

      <div class="rating-breakdown-box">
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem;">Rating Breakdown (${reviewCount} total ratings)</h4>
        ${breakdownHtml}
      </div>

      <div class="profile-reviews-section">
        <div class="reviews-header-bar">
          <h3>Student Reviews</h3>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${reviewCount} reviews</span>
        </div>
        ${reviewsHtml}
      </div>
    `;

    // Hook up buttons inside profile modal
    const rateFromProfileBtn = document.getElementById('btnRateFromProfile');
    if (rateFromProfileBtn) {
      rateFromProfileBtn.addEventListener('click', () => {
        elements.profileModal.close();
        openRatingModalForProf(prof.id);
      });
    }

    const beFirstBtn = document.getElementById('btnBeFirstToRate');
    if (beFirstBtn) {
      beFirstBtn.addEventListener('click', () => {
        elements.profileModal.close();
        openRatingModalForProf(prof.id);
      });
    }

    // Helpful voting handler
    const helpfulBtns = elements.profileModalBody.querySelectorAll('.btn-helpful');
    helpfulBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const revId = btn.getAttribute('data-vote-id');
        handleHelpfulVote(prof.id, revId, btn);
      });
    });

    elements.profileModal.showModal();
  }

  function handleHelpfulVote(profId, revId, btnElement) {
    if (helpfulVotes.has(revId)) {
      showToast('You already voted on this review!', 'info');
      return;
    }

    const prof = professors.find((p) => p.id === profId);
    if (!prof) return;

    const review = prof.reviews.find((r) => r.id === revId);
    if (!review) return;

    review.helpfulCount = (review.helpfulCount || 0) + 1;
    helpfulVotes.add(revId);

    saveHelpfulVotes();
    saveProfessors();

    btnElement.classList.add('voted');
    btnElement.querySelector('span').textContent = `Helpful (${review.helpfulCount})`;
    showToast('Thank you! Feedback recorded 👍', 'success');
  }

  // ================= RATE PROFESSOR MODAL & FORM =================
  function openRatingModalForProf(profId = null) {
    populateProfessorDropdown(profId);
    resetRatingForm();

    if (profId) {
      elements.rateProfSelect.value = profId;
    }

    elements.rateModal.showModal();
  }

  function resetRatingForm() {
    elements.ratingForm.reset();
    selectedRatingStars = 0;
    selectedDifficulty = 0;
    selectedFormTags.clear();

    elements.overallRatingValue.value = '';
    elements.difficultyValue.value = '';
    elements.ratingFeedbackLabel.textContent = 'Click to rate';
    elements.charCount.textContent = '0';

    // Clear stars UI
    const starBtns = elements.starRatingPicker.querySelectorAll('.star-btn');
    starBtns.forEach((s) => s.classList.remove('active', 'hovered'));

    // Clear difficulty UI
    const diffBtns = elements.difficultyPicker.querySelectorAll('.diff-btn');
    diffBtns.forEach((d) => d.classList.remove('selected'));

    // Clear tags UI
    const tagChoices = elements.tagsSelector.querySelectorAll('.tag-choice');
    tagChoices.forEach((t) => t.classList.remove('selected'));
  }

  function setupStarPicker() {
    const starBtns = elements.starRatingPicker.querySelectorAll('.star-btn');
    const feedbackTexts = {
      1: '1 - Terrible 💔',
      2: '2 - Poor 👎',
      3: '3 - Average 😐',
      4: '4 - Good 👍',
      5: '5 - Awesome! 🌟'
    };

    starBtns.forEach((btn) => {
      const val = parseInt(btn.getAttribute('data-value'), 10);

      btn.addEventListener('mouseenter', () => {
        starBtns.forEach((s) => {
          const sVal = parseInt(s.getAttribute('data-value'), 10);
          if (sVal <= val) {
            s.classList.add('hovered');
          } else {
            s.classList.remove('hovered');
          }
        });
        elements.ratingFeedbackLabel.textContent = feedbackTexts[val];
      });

      btn.addEventListener('mouseleave', () => {
        starBtns.forEach((s) => s.classList.remove('hovered'));
        if (selectedRatingStars > 0) {
          elements.ratingFeedbackLabel.textContent = feedbackTexts[selectedRatingStars];
        } else {
          elements.ratingFeedbackLabel.textContent = 'Click to rate';
        }
      });

      btn.addEventListener('click', () => {
        selectedRatingStars = val;
        elements.overallRatingValue.value = val;
        starBtns.forEach((s) => {
          const sVal = parseInt(s.getAttribute('data-value'), 10);
          if (sVal <= val) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
        elements.ratingFeedbackLabel.textContent = feedbackTexts[val];
      });
    });
  }

  function setupDifficultyPicker() {
    const diffBtns = elements.difficultyPicker.querySelectorAll('.diff-btn');
    diffBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const diff = parseInt(btn.getAttribute('data-diff'), 10);
        selectedDifficulty = diff;
        elements.difficultyValue.value = diff;
        diffBtns.forEach((d) => d.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  function setupTagSelector() {
    const tagChoices = elements.tagsSelector.querySelectorAll('.tag-choice');
    tagChoices.forEach((pill) => {
      pill.addEventListener('click', () => {
        const tag = pill.getAttribute('data-tag');
        if (selectedFormTags.has(tag)) {
          selectedFormTags.delete(tag);
          pill.classList.remove('selected');
        } else {
          if (selectedFormTags.size >= 3) {
            showToast('You can select up to 3 tags per review', 'info');
            return;
          }
          selectedFormTags.add(tag);
          pill.classList.add('selected');
        }
      });
    });
  }

  function handleRatingFormSubmit(e) {
    e.preventDefault();

    const profId = elements.rateProfSelect.value;
    if (!profId) {
      showToast('Please select a professor to rate', 'info');
      elements.rateProfSelect.focus();
      return;
    }

    if (selectedRatingStars === 0) {
      showToast('Please provide an overall star rating (1-5)', 'info');
      return;
    }

    if (selectedDifficulty === 0) {
      showToast('Please select a difficulty level (1-5)', 'info');
      return;
    }

    const courseCode = elements.courseCodeInput.value.trim().toUpperCase();
    if (!courseCode) {
      showToast('Please enter the course code (e.g. CS101)', 'info');
      elements.courseCodeInput.focus();
      return;
    }

    const comment = elements.reviewCommentInput.value.trim();
    if (comment.length < 15) {
      showToast('Please write a helpful review of at least 15 characters', 'info');
      elements.reviewCommentInput.focus();
      return;
    }

    const grade = elements.gradeReceivedSelect.value;
    const takeAgainRadio = document.querySelector('input[name="takeAgain"]:checked');
    const takeAgain = takeAgainRadio ? takeAgainRadio.value === 'yes' : true;

    const attendRadio = document.querySelector('input[name="attendanceMandatory"]:checked');
    const attendanceMandatory = attendRadio ? attendRadio.value === 'yes' : true;

    const studentRole = elements.reviewerRoleInput.value.trim() || 'Verified Student';

    const prof = professors.find((p) => p.id === profId);
    if (!prof) {
      showToast('Selected professor not found', 'info');
      return;
    }

    // Create review object
    const newReview = {
      id: 'rev-' + Date.now(),
      overallRating: selectedRatingStars,
      difficulty: selectedDifficulty,
      course: courseCode,
      grade: grade,
      takeAgain: takeAgain,
      attendanceMandatory: attendanceMandatory,
      tags: Array.from(selectedFormTags),
      comment: comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      studentRole: studentRole,
      helpfulCount: 0
    };

    if (!prof.reviews) prof.reviews = [];
    prof.reviews.unshift(newReview);

    // If professor didn't list this course, add it
    if (!prof.courses) prof.courses = [];
    if (!prof.courses.includes(courseCode)) {
      prof.courses.push(courseCode);
    }

    // Recalculate stats
    recalculateProfessorStats(prof);
    saveProfessors();

    elements.rateModal.close();
    showToast('Your anonymous review has been published! ⭐', 'success');

    renderAll();

    // If profile was open, update it
    if (currentActiveProfileProfId === profId && elements.profileModal.open) {
      openProfileModal(profId);
    }
  }

  // ================= ADD PROFESSOR MODAL & FORM =================
  function openAddProfModal() {
    elements.addProfForm.reset();
    elements.addProfModal.showModal();
  }

  function handleAddProfSubmit(e) {
    e.preventDefault();

    const name = elements.newProfName.value.trim();
    const dept = elements.newProfDept.value;
    const univ = elements.newProfUniv.value.trim() || 'State University';
    const coursesRaw = elements.newProfCourses.value.trim();
    const bio = elements.newProfBio.value.trim();

    if (!name) {
      showToast('Please enter the professor name', 'info');
      elements.newProfName.focus();
      return;
    }

    if (!dept) {
      showToast('Please select a department', 'info');
      elements.newProfDept.focus();
      return;
    }

    const courses = coursesRaw
      ? coursesRaw
          .split(',')
          .map((c) => c.trim().toUpperCase())
          .filter(Boolean)
      : [];

    const newProf = {
      id: 'prof-' + Date.now(),
      name: name,
      department: dept,
      university: univ,
      courses: courses,
      bio: bio || `Faculty member in the ${dept} department.`,
      overallRating: 0,
      difficulty: 0,
      wouldTakeAgainPercent: 0,
      tags: [],
      reviews: []
    };

    professors.unshift(newProf);
    saveProfessors();

    elements.addProfModal.close();
    showToast(`Professor ${name} added to the catalog! 🎉`, 'success');

    // Reset filters to show the newly added professor
    activeDept = 'all';
    updateDeptPillUI();
    showingSavedOnly = false;
    renderAll();

    // Proactively invite student to rate this new professor
    setTimeout(() => {
      openRatingModalForProf(newProf.id);
    }, 400);
  }

  // ================= TOAST NOTIFICATION SYSTEM =================
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  // ================= UI HELPER UTILITIES =================
  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function updateDeptPillUI() {
    const pills = elements.deptFilterPills.querySelectorAll('.dept-pill');
    pills.forEach((p) => {
      if (p.getAttribute('data-dept') === activeDept) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  // ================= EVENT LISTENERS =================
  function bindEvents() {
    // Theme
    elements.themeToggleBtn.addEventListener('click', toggleTheme);

    // Header actions
    elements.brandHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      activeDept = 'all';
      updateDeptPillUI();
      showingSavedOnly = false;
      searchQuery = '';
      elements.searchInput.value = '';
      elements.clearSearchBtn.style.display = 'none';
      renderFilteredGrid();
    });

    elements.savedProfsBtn.addEventListener('click', () => {
      showingSavedOnly = !showingSavedOnly;
      renderFilteredGrid();
    });

    elements.rateNewBtn.addEventListener('click', () => {
      openRatingModalForProf();
    });

    elements.addProfBtn.addEventListener('click', () => {
      openAddProfModal();
    });

    // Reset Seed Data
    elements.seedResetBtn.addEventListener('click', () => {
      if (confirm('Reset catalog back to sample professors and reviews?')) {
        professors = JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
        savedProfIds.clear();
        helpfulVotes.clear();
        saveProfessors();
        saveSavedProfs();
        saveHelpfulVotes();
        renderAll();
        showToast('Sample data reset successfully!', 'success');
      }
    });

    // Search Input
    elements.searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      elements.clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
      renderFilteredGrid();
    });

    elements.clearSearchBtn.addEventListener('click', () => {
      searchQuery = '';
      elements.searchInput.value = '';
      elements.clearSearchBtn.style.display = 'none';
      elements.searchInput.focus();
      renderFilteredGrid();
    });

    // Department Pills
    elements.deptFilterPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.dept-pill');
      if (!pill) return;
      activeDept = pill.getAttribute('data-dept');
      updateDeptPillUI();
      renderFilteredGrid();
    });

    // Filters & Sort
    elements.ratingFilterSelect.addEventListener('change', (e) => {
      minRatingFilter = parseFloat(e.target.value);
      renderFilteredGrid();
    });

    elements.difficultyFilterSelect.addEventListener('change', (e) => {
      difficultyFilter = e.target.value;
      renderFilteredGrid();
    });

    elements.sortBySelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderFilteredGrid();
    });

    elements.resetFiltersBtn.addEventListener('click', () => {
      activeDept = 'all';
      updateDeptPillUI();
      searchQuery = '';
      elements.searchInput.value = '';
      elements.clearSearchBtn.style.display = 'none';
      minRatingFilter = 0;
      elements.ratingFilterSelect.value = '0';
      difficultyFilter = 'all';
      elements.difficultyFilterSelect.value = 'all';
      sortBy = 'rating_desc';
      elements.sortBySelect.value = 'rating_desc';
      showingSavedOnly = false;
      renderFilteredGrid();
    });

    // Modals Close handlers
    elements.closeProfileModalBtn.addEventListener('click', () => elements.profileModal.close());
    elements.closeRateModalBtn.addEventListener('click', () => elements.rateModal.close());
    elements.cancelRateBtn.addEventListener('click', () => elements.rateModal.close());
    elements.closeAddProfModalBtn.addEventListener('click', () => elements.addProfModal.close());
    elements.cancelAddProfBtn.addEventListener('click', () => elements.addProfModal.close());

    // Close on backdrop click
    [elements.profileModal, elements.rateModal, elements.addProfModal].forEach((dialog) => {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          dialog.close();
        }
      });
    });

    // Setup interactive rating widgets
    setupStarPicker();
    setupDifficultyPicker();
    setupTagSelector();

    // Character counter for review textarea
    elements.reviewCommentInput.addEventListener('input', (e) => {
      elements.charCount.textContent = e.target.value.length;
    });

    // Form Submissions
    elements.ratingForm.addEventListener('submit', handleRatingFormSubmit);
    elements.addProfForm.addEventListener('submit', handleAddProfSubmit);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
