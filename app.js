/**
 * RateMyProf - Student Professor Ratings Application
 * Pure Vanilla JavaScript with LocalStorage Persistence
 * Built for authentic, student-first course registration planning.
 */

(function () {
  'use strict';

  // ================= STORAGE KEYS =================
  const STORAGE_KEYS = {
    PROFESSORS: 'profpulse_professors_data_v1',
    SAVED_PROFS: 'profpulse_saved_profs_v1',
    THEME: 'profpulse_theme_v1',
    HELPFUL_VOTES: 'profpulse_helpful_votes_v1',
    UNHELPFUL_VOTES: 'profpulse_unhelpful_votes_v1',
    REPORTED_REVIEWS: 'profpulse_reported_reviews_v1',
    STUDENT_NOTES: 'profpulse_student_notes_v1',
    COMPARE_PROFS: 'profpulse_compare_profs_v1'
  };

  // GPA Weight Table for Grade Distribution Analysis
  const GPA_WEIGHTS = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D': 1.0,
    'F': 0.0
  };

  // ================= AUTHENTIC SEED DATA =================
  const INITIAL_SEED_DATA = [
    {
      id: 'prof-1',
      name: 'Dr. Marcus Chen',
      department: 'Computer Science',
      university: 'State University',
      courses: ['CS 101', 'CS 201', 'CS 350'],
      bio: 'Associate Professor of Computer Science specializing in Algorithms, Data Structures, and Distributed Systems.',
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
          textbookRequired: 'Free PDF online',
          studyHours: '3-6 hrs/wk',
          tags: ['Inspirational', 'Clear Grading Criteria'],
          comment: 'Dr. Chen is genuinely one of the best professors in the department. Slides and code walkthroughs are super clear, and his office hours are packed because he will patiently explain tricky graph algorithms until you actually get it. Midterms are very fair.',
          date: 'Sep 28, 2026',
          studentRole: 'CS Sophomore',
          helpfulCount: 24,
          unhelpfulCount: 1
        },
        {
          id: 'rev-102',
          overallRating: 5,
          difficulty: 2,
          course: 'CS 101',
          grade: 'A+',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'No / Not needed',
          studyHours: '< 3 hrs/wk',
          tags: ['Accessible Outside Class', 'Engaging Lectures', 'Lecture Slides Online'],
          comment: 'Amazing intro to programming class. No prior coding experience required. Exams are very fair and directly reflect practice midterm problems. Do the homework early and you will get an A with ease.',
          date: 'Sep 12, 2026',
          studentRole: 'Freshman',
          helpfulCount: 15,
          unhelpfulCount: 0
        },
        {
          id: 'rev-103',
          overallRating: 4,
          difficulty: 4,
          course: 'CS 350',
          grade: 'B+',
          takeAgain: true,
          attendanceMandatory: false,
          textbookRequired: 'Optional',
          studyHours: '7-10 hrs/wk',
          tags: ['Clear Grading Criteria', 'Heavy Coding Psets'],
          comment: 'Challenging project assignments in C/Rust, but you learn an insane amount of real-world backend architectural skills. Start homework early and form a study group!',
          date: 'Aug 20, 2026',
          studentRole: 'Junior CS Major',
          helpfulCount: 9,
          unhelpfulCount: 1
        }
      ]
    },
    {
      id: 'prof-2',
      name: 'Prof. Sarah Jenkins',
      department: 'Mathematics',
      university: 'State University',
      courses: ['MATH 151', 'MATH 252', 'MATH 310'],
      bio: 'Department of Mathematics. Passionate about Multivariable Calculus, Vector Spaces, and Linear Algebra pedagogy.',
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
          textbookRequired: 'Free PDF online',
          studyHours: '7-10 hrs/wk',
          tags: ['Engaging Lectures', 'Extra Credit Offered', 'Curves the Midterm'],
          comment: 'She has great energy and handwriting on the board is immaculate. Calculus can be intimidating, but Prof. Jenkins makes the proofs intuitive. She also gives weekly homework bonus points and curves generously.',
          date: 'Oct 02, 2026',
          studentRole: 'Engineering Freshman',
          helpfulCount: 18,
          unhelpfulCount: 1
        },
        {
          id: 'rev-202',
          overallRating: 4,
          difficulty: 4,
          course: 'MATH 252',
          grade: 'B',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Yes, mandatory',
          studyHours: '7-10 hrs/wk',
          tags: ['Tough Grader', 'Lots of Homework'],
          comment: 'Exams are definitely difficult and graded stringently, but she curves generously if the class average is low. Do all textbook problem sets and attend recitation sessions.',
          date: 'Aug 14, 2026',
          studentRole: 'Math Major',
          helpfulCount: 8,
          unhelpfulCount: 0
        }
      ]
    },
    {
      id: 'prof-3',
      name: 'Dr. Arthur Vance',
      department: 'Physics & Engineering',
      university: 'State University',
      courses: ['PHYS 207', 'PHYS 208'],
      bio: 'Senior Lecturer in Classical Mechanics, Thermodynamics, and Electromagnetism.',
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
          textbookRequired: 'Yes, mandatory',
          studyHours: '10+ hrs/wk',
          tags: ['Tough Grader', 'Beware of Pop Quizzes', 'Skip Class, Regret Later'],
          comment: 'Lectures consist of him reading directly off dense derivations without explaining the intuition. Tests are brutal and 10x harder than homework problems. Prepare to grind YouTube and Khan Academy every night.',
          date: 'Sep 19, 2026',
          studentRole: 'Mechanical Eng Major',
          helpfulCount: 38,
          unhelpfulCount: 3
        },
        {
          id: 'rev-302',
          overallRating: 3,
          difficulty: 4,
          course: 'PHYS 207',
          grade: 'B-',
          takeAgain: false,
          attendanceMandatory: true,
          textbookRequired: 'Yes, mandatory',
          studyHours: '7-10 hrs/wk',
          tags: ['Lots of Homework', 'Participation Matters'],
          comment: 'Be prepared to self-teach via online open courseware. He is knowledgeable in 1-on-1 office hours, but classroom teaching style is very dry.',
          date: 'Jul 29, 2026',
          studentRole: 'Physics Sophomore',
          helpfulCount: 14,
          unhelpfulCount: 2
        }
      ]
    },
    {
      id: 'prof-4',
      name: 'Prof. Maya Lin',
      department: 'Business & Economics',
      university: 'State University',
      courses: ['ECON 101', 'ECON 320', 'FIN 210'],
      bio: 'Macroeconomics & Corporate Finance Professor. Former financial market consultant.',
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
          textbookRequired: 'No / Not needed',
          studyHours: '< 3 hrs/wk',
          tags: ['Hilarious', 'Engaging Lectures', 'Lecture Slides Online'],
          comment: 'Prof. Lin brings current market news and hilarious pop-culture analogies to explain monetary policy. Lectures fly by, and exam review sheets match the test format.',
          date: 'Oct 04, 2026',
          studentRole: 'Business Freshman',
          helpfulCount: 22,
          unhelpfulCount: 0
        },
        {
          id: 'rev-402',
          overallRating: 5,
          difficulty: 2,
          course: 'ECON 320',
          grade: 'A+',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Free PDF online',
          studyHours: '3-6 hrs/wk',
          tags: ['Clear Grading Criteria', 'Accessible Outside Class'],
          comment: 'Take her class if you can! She gives amazing career mentorship, reviews resumes during office hours, and helped multiple students land summer finance internships.',
          date: 'Sep 05, 2026',
          studentRole: 'Junior Finance',
          helpfulCount: 11,
          unhelpfulCount: 0
        }
      ]
    },
    {
      id: 'prof-5',
      name: 'Dr. Rebecca Foster',
      department: 'Psychology',
      university: 'State University',
      courses: ['PSYC 101', 'PSYC 240', 'PSYC 405'],
      bio: 'Cognitive Psychology and Behavioral Neuroscience researcher studying memory formation and attention.',
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
          textbookRequired: 'No / Not needed',
          studyHours: '< 3 hrs/wk',
          tags: ['Inspirational', 'Clear Grading Criteria', 'Engaging Lectures'],
          comment: 'Hands down the most fascinating introductory course I have taken. She demonstrates visual illusions and memory biases in real time during class. Exams are non-cumulative and multiple choice.',
          date: 'Sep 22, 2026',
          studentRole: 'Undeclared Freshman',
          helpfulCount: 16,
          unhelpfulCount: 0
        },
        {
          id: 'rev-502',
          overallRating: 4,
          difficulty: 3,
          course: 'PSYC 240',
          grade: 'B+',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Free PDF online',
          studyHours: '3-6 hrs/wk',
          tags: ['Group Projects', 'Participation Matters'],
          comment: 'Very interactive discussions. There is a semester group research paper, so pick good teammates. Overall Dr. Foster is super approachable.',
          date: 'Aug 18, 2026',
          studentRole: 'Psychology Junior',
          helpfulCount: 7,
          unhelpfulCount: 1
        }
      ]
    },
    {
      id: 'prof-6',
      name: 'Prof. Julian Alvarez',
      department: 'Humanities & Arts',
      university: 'State University',
      courses: ['ENG 110', 'LIT 230', 'CW 201'],
      bio: 'Published author, teaching Creative Writing, Fiction Workshops, and Modern Contemporary Literature.',
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
          textbookRequired: 'No / Not needed',
          studyHours: '3-6 hrs/wk',
          tags: ['Inspirational', 'Accessible Outside Class'],
          comment: 'Prof. Alvarez provides the most constructive, detailed essay feedback of any teacher I have ever had. He truly cares about developing student writing voices without imposing rigid formulas.',
          date: 'Sep 15, 2026',
          studentRole: 'English Major',
          helpfulCount: 13,
          unhelpfulCount: 0
        },
        {
          id: 'rev-602',
          overallRating: 4,
          difficulty: 3,
          course: 'LIT 230',
          grade: 'A-',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Optional',
          studyHours: '3-6 hrs/wk',
          tags: ['Participation Matters', 'Clear Grading Criteria'],
          comment: 'Lots of reading, but the books on the syllabus are actually captivating contemporary novels rather than boring archaic texts. Participation counts for 20% of the grade.',
          date: 'May 10, 2026',
          studentRole: 'Art History Major',
          helpfulCount: 6,
          unhelpfulCount: 0
        }
      ]
    },
    {
      id: 'prof-7',
      name: 'Dr. Gregory Houseman',
      department: 'Physics & Engineering',
      university: 'State University',
      courses: ['ENGR 102', 'ME 220', 'ME 310'],
      bio: 'Thermodynamics & Fluid Dynamics Professor with aerospace engineering industry background.',
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
          textbookRequired: 'Yes, mandatory',
          studyHours: '10+ hrs/wk',
          tags: ['Tough Grader', 'Lots of Homework'],
          comment: 'Very rigorous. Homework takes 12-15 hours per week. If you need this class to graduate, form a study group immediately.',
          date: 'Aug 04, 2026',
          studentRole: 'Mechanical Eng Junior',
          helpfulCount: 19,
          unhelpfulCount: 2
        },
        {
          id: 'rev-702',
          overallRating: 4,
          difficulty: 4,
          course: 'ENGR 102',
          grade: 'B+',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Free PDF online',
          studyHours: '7-10 hrs/wk',
          tags: ['Clear Grading Criteria', 'Pencil & Paper Tests'],
          comment: 'Demanding course, but his grading rubrics are transparent. If you show all your partial work, you will get generous credit even if numerical answer was off.',
          date: 'Jul 11, 2026',
          studentRole: 'Sophomore Eng',
          helpfulCount: 8,
          unhelpfulCount: 1
        }
      ]
    },
    {
      id: 'prof-8',
      name: 'Dr. Elena Rostova',
      department: 'Computer Science',
      university: 'State University',
      courses: ['CS 240', 'CS 330', 'CS 420'],
      bio: 'Systems Architecture and Operating Systems specialist. Directs the High-Performance Computing student lab.',
      overallRating: 4.5,
      difficulty: 3.8,
      wouldTakeAgainPercent: 91,
      tags: ['Heavy Coding Psets', 'Curves the Midterm', 'Lecture Slides Online'],
      reviews: [
        {
          id: 'rev-801',
          overallRating: 4,
          difficulty: 4,
          course: 'CS 240',
          grade: 'B+',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Free PDF online',
          studyHours: '7-10 hrs/wk',
          tags: ['Heavy Coding Psets', 'Curves the Midterm', 'Lecture Slides Online'],
          comment: 'Computer Systems is notorious as a weed-out course, but Dr. Rostova is phenomenal. Her memory leak debugging labs will make you sweat, but you walk away knowing C and assembly inside out. Generous midterm curve.',
          date: 'Sep 30, 2026',
          studentRole: 'CS Junior',
          helpfulCount: 17,
          unhelpfulCount: 1
        },
        {
          id: 'rev-802',
          overallRating: 5,
          difficulty: 3,
          course: 'CS 330',
          grade: 'A',
          takeAgain: true,
          attendanceMandatory: false,
          textbookRequired: 'No / Not needed',
          studyHours: '3-6 hrs/wk',
          tags: ['Clear Grading Criteria', 'Engaging Lectures'],
          comment: 'Operating Systems with Rostova is a rite of passage. Her explanations of multithreading, semaphores, and virtual memory are the clearest I have ever encountered.',
          date: 'Aug 25, 2026',
          studentRole: 'Senior CS',
          helpfulCount: 12,
          unhelpfulCount: 0
        }
      ]
    },
    {
      id: 'prof-9',
      name: 'Prof. David K. Miller',
      department: 'Mathematics',
      university: 'State University',
      courses: ['MATH 210', 'MATH 320', 'STAT 200'],
      bio: 'Applied Mathematics and Probability theorist. Focus on Bayesian statistics and stochastic models.',
      overallRating: 4.3,
      difficulty: 2.9,
      wouldTakeAgainPercent: 86,
      tags: ['Clear Grading Criteria', 'Pencil & Paper Tests', 'Lecture Slides Online'],
      reviews: [
        {
          id: 'rev-901',
          overallRating: 4,
          difficulty: 3,
          course: 'MATH 210',
          grade: 'A-',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Optional',
          studyHours: '3-6 hrs/wk',
          tags: ['Clear Grading Criteria', 'Pencil & Paper Tests'],
          comment: 'Linear Algebra with Miller is straightforward. He provides past exams with full solutions as study guides. As long as you review those, there are zero surprises on test day.',
          date: 'Oct 01, 2026',
          studentRole: 'Data Science Sophomore',
          helpfulCount: 10,
          unhelpfulCount: 0
        },
        {
          id: 'rev-902',
          overallRating: 5,
          difficulty: 2,
          course: 'STAT 200',
          grade: 'A',
          takeAgain: true,
          attendanceMandatory: false,
          textbookRequired: 'Free PDF online',
          studyHours: '3-6 hrs/wk',
          tags: ['Extra Credit Offered', 'Lecture Slides Online'],
          comment: 'Very fair grader. He drops the lowest 2 homework scores and provides extra credit coding simulations in R/Python. Great class for meeting the quantitative requirement.',
          date: 'Jul 19, 2026',
          studentRole: 'Economics Major',
          helpfulCount: 5,
          unhelpfulCount: 0
        }
      ]
    },
    {
      id: 'prof-10',
      name: 'Dr. Ananya Sharma',
      department: 'Business & Economics',
      university: 'State University',
      courses: ['MKTG 301', 'MKTG 420', 'BUS 205'],
      bio: 'Marketing Analytics & Consumer Psychology researcher. Case-method instructor with consulting experience.',
      overallRating: 4.8,
      difficulty: 2.3,
      wouldTakeAgainPercent: 95,
      tags: ['Engaging Lectures', 'Hilarious', 'Group Projects'],
      reviews: [
        {
          id: 'rev-1001',
          overallRating: 5,
          difficulty: 2,
          course: 'MKTG 301',
          grade: 'A',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'No / Not needed',
          studyHours: '< 3 hrs/wk',
          tags: ['Engaging Lectures', 'Hilarious', 'Group Projects'],
          comment: 'Dr. Sharma’s classes feel like a lively podcast discussion rather than a dry lecture. We analyzed real brand crises (Nike, Boeing, TikTok) and built marketing campaigns in teams. 10/10 recommend.',
          date: 'Sep 26, 2026',
          studentRole: 'Marketing Junior',
          helpfulCount: 14,
          unhelpfulCount: 0
        },
        {
          id: 'rev-1002',
          overallRating: 5,
          difficulty: 3,
          course: 'MKTG 420',
          grade: 'A-',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Free PDF online',
          studyHours: '3-6 hrs/wk',
          tags: ['Clear Grading Criteria', 'Inspirational'],
          comment: 'Hands-on data analytics course using real consumer surveys. She connects class projects with actual local startup clients for portfolio work.',
          date: 'Aug 12, 2026',
          studentRole: 'Business Senior',
          helpfulCount: 8,
          unhelpfulCount: 0
        }
      ]
    },
    {
      id: 'prof-11',
      name: 'Prof. Marcus Sterling',
      department: 'Humanities & Arts',
      university: 'State University',
      courses: ['PHIL 102', 'PHIL 215'],
      bio: 'Department of Philosophy. Courses in Ethical Reasoning, Biomedical Ethics, and Epistemology.',
      overallRating: 4.6,
      difficulty: 2.5,
      wouldTakeAgainPercent: 93,
      tags: ['Inspirational', 'Hilarious', 'Participation Matters'],
      reviews: [
        {
          id: 'rev-1101',
          overallRating: 5,
          difficulty: 2,
          course: 'PHIL 102',
          grade: 'A',
          takeAgain: true,
          attendanceMandatory: false,
          textbookRequired: 'No / Not needed',
          studyHours: '< 3 hrs/wk',
          tags: ['Inspirational', 'Hilarious', 'Participation Matters'],
          comment: 'Prof. Sterling is brilliant and down-to-earth. He turns classic ethical dilemmas (trolley problem, AI ethics) into passionate classroom debates. Only 3 short papers, no exams.',
          date: 'Oct 03, 2026',
          studentRole: 'Freshman',
          helpfulCount: 15,
          unhelpfulCount: 0
        },
        {
          id: 'rev-1102',
          overallRating: 4,
          difficulty: 3,
          course: 'PHIL 215',
          grade: 'B+',
          takeAgain: true,
          attendanceMandatory: true,
          textbookRequired: 'Free PDF online',
          studyHours: '3-6 hrs/wk',
          tags: ['Clear Grading Criteria', 'Accessible Outside Class'],
          comment: 'Bioethics was thought-provoking. His essay grading rubrics are clear: state your premise, anticipate counterarguments, and write concisely. Office hours are super helpful for essay outlines.',
          date: 'Jun 05, 2026',
          studentRole: 'Pre-Med Junior',
          helpfulCount: 9,
          unhelpfulCount: 1
        }
      ]
    }
  ];

  // ================= APPLICATION STATE =================
  let professors = [];
  let savedProfIds = new Set();
  let compareProfIds = new Set();
  let helpfulVotes = new Set();
  let unhelpfulVotes = new Set();
  let reportedReviews = new Set();
  let studentNotes = {}; // profId -> string note

  let activeDept = 'all';
  let searchQuery = '';
  let minRatingFilter = 0;
  let difficultyFilter = 'all';
  let sortBy = 'rating_desc';
  let showingSavedOnly = false;
  let currentActiveProfileProfId = null;

  // Profile modal review filters
  let profileCourseFilter = 'all';
  let profileReviewSort = 'helpful_desc';

  // Autocomplete state
  let autocompleteMatches = [];
  let autocompleteHighlightedIndex = -1;

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
    compareCountBadge: document.getElementById('compareCountBadge'),
    savedProfsBtn: document.getElementById('savedProfsBtn'),
    compareProfsBtn: document.getElementById('compareProfsBtn'),
    addProfBtn: document.getElementById('addProfBtn'),
    rateNewBtn: document.getElementById('rateNewBtn'),
    brandHomeBtn: document.getElementById('brandHomeBtn'),
    seedResetBtn: document.getElementById('seedResetBtn'),

    // Search & Filters
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    searchAutocomplete: document.getElementById('searchAutocomplete'),
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

    // Floating Compare Dock
    compareDock: document.getElementById('compareDock'),
    compareDockCount: document.getElementById('compareDockCount'),
    compareDockChips: document.getElementById('compareDockChips'),
    launchCompareBtn: document.getElementById('launchCompareBtn'),
    clearCompareBtn: document.getElementById('clearCompareBtn'),

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
    textbookSelect: document.getElementById('textbookSelect'),
    workloadSelect: document.getElementById('workloadSelect'),
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

    compareModal: document.getElementById('compareModal'),
    closeCompareModalBtn: document.getElementById('closeCompareModalBtn'),
    compareModalBody: document.getElementById('compareModalBody'),

    reportModal: document.getElementById('reportModal'),
    closeReportModalBtn: document.getElementById('closeReportModalBtn'),
    cancelReportBtn: document.getElementById('cancelReportBtn'),
    reportReviewForm: document.getElementById('reportReviewForm'),
    reportProfId: document.getElementById('reportProfId'),
    reportRevId: document.getElementById('reportRevId'),
    reportReasonSelect: document.getElementById('reportReasonSelect'),
    reportDetailsInput: document.getElementById('reportDetailsInput'),

    toastContainer: document.getElementById('toastContainer')
  };

  // ================= INITIALIZATION =================
  function init() {
    loadTheme();
    loadStorageData();
    bindEvents();
    renderAll();
    checkUrlHash();
  }

  // ================= STORAGE MANAGEMENT =================
  function loadStorageData() {
    try {
      const storedProfs = localStorage.getItem(STORAGE_KEYS.PROFESSORS);
      if (storedProfs) {
        professors = JSON.parse(storedProfs);
        // Ensure stats and tags are updated
        professors.forEach(recalculateProfessorStats);
      } else {
        professors = JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
        professors.forEach(recalculateProfessorStats);
        saveProfessors();
      }

      const storedSaved = localStorage.getItem(STORAGE_KEYS.SAVED_PROFS);
      if (storedSaved) {
        savedProfIds = new Set(JSON.parse(storedSaved));
      }

      const storedCompare = localStorage.getItem(STORAGE_KEYS.COMPARE_PROFS);
      if (storedCompare) {
        compareProfIds = new Set(JSON.parse(storedCompare));
      }

      const storedHelpful = localStorage.getItem(STORAGE_KEYS.HELPFUL_VOTES);
      if (storedHelpful) {
        helpfulVotes = new Set(JSON.parse(storedHelpful));
      }

      const storedUnhelpful = localStorage.getItem(STORAGE_KEYS.UNHELPFUL_VOTES);
      if (storedUnhelpful) {
        unhelpfulVotes = new Set(JSON.parse(storedUnhelpful));
      }

      const storedReported = localStorage.getItem(STORAGE_KEYS.REPORTED_REVIEWS);
      if (storedReported) {
        reportedReviews = new Set(JSON.parse(storedReported));
      }

      const storedNotes = localStorage.getItem(STORAGE_KEYS.STUDENT_NOTES);
      if (storedNotes) {
        studentNotes = JSON.parse(storedNotes);
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

  function saveCompareProfs() {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPARE_PROFS, JSON.stringify(Array.from(compareProfIds)));
    } catch (e) {
      console.error('Error saving compare list:', e);
    }
  }

  function saveHelpfulVotes() {
    try {
      localStorage.setItem(STORAGE_KEYS.HELPFUL_VOTES, JSON.stringify(Array.from(helpfulVotes)));
    } catch (e) {
      console.error('Error saving helpful votes:', e);
    }
  }

  function saveUnhelpfulVotes() {
    try {
      localStorage.setItem(STORAGE_KEYS.UNHELPFUL_VOTES, JSON.stringify(Array.from(unhelpfulVotes)));
    } catch (e) {
      console.error('Error saving unhelpful votes:', e);
    }
  }

  function saveReportedReviews() {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTED_REVIEWS, JSON.stringify(Array.from(reportedReviews)));
    } catch (e) {
      console.error('Error saving reported reviews:', e);
    }
  }

  function saveStudentNotes() {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT_NOTES, JSON.stringify(studentNotes));
    } catch (e) {
      console.error('Error saving student notes:', e);
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

  // ================= STATS RECALCULATION & ANALYTICS =================
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

  // Grade Distribution & GPA calculations
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

  // Workload & Textbook Consensus calculations
  function calculateLogistics(reviews) {
    if (!reviews || reviews.length === 0) {
      return { textbook: 'No data yet', workload: 'No data yet' };
    }

    const textbookMap = {};
    const workloadMap = {};

    reviews.forEach((r) => {
      if (r.textbookRequired) {
        textbookMap[r.textbookRequired] = (textbookMap[r.textbookRequired] || 0) + 1;
      }
      if (r.studyHours) {
        workloadMap[r.studyHours] = (workloadMap[r.studyHours] || 0) + 1;
      }
    });

    const topTextbook = Object.keys(textbookMap).sort((a, b) => textbookMap[b] - textbookMap[a])[0] || 'No / Not needed';
    const topWorkload = Object.keys(workloadMap).sort((a, b) => workloadMap[b] - workloadMap[a])[0] || '3 - 6 hrs/wk';

    return { textbook: topTextbook, workload: topWorkload };
  }

  // ================= RENDER LOGIC =================
  function renderAll() {
    updateHeaderStats();
    populateProfessorDropdown();
    renderFilteredGrid();
    renderCompareDock();
  }

  function updateHeaderStats() {
    const totalReviews = professors.reduce((acc, p) => acc + (p.reviews ? p.reviews.length : 0), 0);
    elements.statProfCount.textContent = professors.length;
    elements.statReviewCount.textContent = totalReviews;
    elements.savedCountBadge.textContent = savedProfIds.size;
    if (elements.compareCountBadge) {
      elements.compareCountBadge.textContent = compareProfIds.size;
    }
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
      if (showingSavedOnly && !savedProfIds.has(p.id)) {
        return false;
      }

      if (activeDept !== 'all' && p.department !== activeDept) {
        return false;
      }

      if (minRatingFilter > 0 && p.overallRating < minRatingFilter) {
        return false;
      }

      if (difficultyFilter !== 'all') {
        if (difficultyFilter === 'easy' && p.difficulty > 2.5) return false;
        if (difficultyFilter === 'medium' && (p.difficulty <= 2.5 || p.difficulty >= 3.9)) return false;
        if (difficultyFilter === 'hard' && p.difficulty < 3.9) return false;
      }

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
          return (b.reviews ? b.reviews.length : 0) - (a.reviews ? a.reviews.length : 0);
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
      elements.catalogHeading.textContent = 'My Semester Shortlist (Saved)';
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

    // If viewing saved list, prepend a semester planning action banner
    if (showingSavedOnly && list.length > 0) {
      const banner = document.createElement('div');
      banner.className = 'semester-plan-banner';
      banner.style.gridColumn = '1 / -1';
      banner.innerHTML = `
        <div class="semester-plan-info">
          <h3>🗓️ Semester Course Registration Shortlist</h3>
          <p>Review your candidate faculty, track sections & write private schedule notes below.</p>
        </div>
        <div>
          <button class="btn btn-primary" id="btnCopySemesterPlan">
            📋 Copy Shortlist to Clipboard
          </button>
        </div>
      `;
      elements.professorsGrid.appendChild(banner);

      const copyBtn = banner.querySelector('#btnCopySemesterPlan');
      copyBtn.addEventListener('click', copySemesterShortlist);
    }

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
          closeAutocomplete();
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

  // ================= PROFESSOR CARD =================
  function createProfessorCard(prof) {
    const card = document.createElement('article');
    card.className = 'prof-card';
    card.setAttribute('data-id', prof.id);

    const isSaved = savedProfIds.has(prof.id);
    const isComparing = compareProfIds.has(prof.id);
    const reviewCount = prof.reviews ? prof.reviews.length : 0;
    const scoreClass = getScoreColorClass(prof.overallRating);
    const initials = getInitials(prof.name);

    const tagsHtml = (prof.tags || [])
      .map((t) => `<span class="badge-tag">${escapeHtml(t)}</span>`)
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
        <div class="prof-card-top-actions">
          <button class="btn-card-compare ${isComparing ? 'active' : ''}" data-action="compare" title="${isComparing ? 'Remove from comparison' : 'Compare this instructor'}" aria-label="Compare professor">
            ⇄ ${isComparing ? 'Comparing' : 'Compare'}
          </button>
          <button class="prof-bookmark-btn ${isSaved ? 'bookmarked' : ''}" title="${isSaved ? 'Remove from saved' : 'Bookmark professor'}" aria-label="Bookmark professor">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
          </button>
        </div>
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

      ${showingSavedOnly ? `
        <div class="student-notes-section" onclick="event.stopPropagation();">
          <label class="student-note-label">
            <span>📝 Private Registration Note:</span>
          </label>
          <textarea class="student-note-textarea" data-prof-id="${prof.id}" placeholder="e.g. Taking Fall 2026, Section 02 MWF 10am. Backup: Chen.">${escapeHtml(studentNotes[prof.id] || '')}</textarea>
        </div>
      ` : ''}

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

    const compareBtn = card.querySelector('[data-action="compare"]');
    compareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCompare(prof.id);
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

    // Notes auto-save in saved view
    const notesTextarea = card.querySelector('.student-note-textarea');
    if (notesTextarea) {
      notesTextarea.addEventListener('input', (e) => {
        studentNotes[prof.id] = e.target.value;
        saveStudentNotes();
      });
    }

    card.addEventListener('click', () => {
      openProfileModal(prof.id);
    });

    return card;
  }

  function toggleBookmark(profId) {
    if (savedProfIds.has(profId)) {
      savedProfIds.delete(profId);
      showToast('Removed from saved shortlist', 'info');
    } else {
      savedProfIds.add(profId);
      showToast('Saved to your semester shortlist! 📌', 'success');
    }
    saveSavedProfs();
    elements.savedCountBadge.textContent = savedProfIds.size;
    renderFilteredGrid();
  }

  // ================= PROFESSOR COMPARISON SYSTEM =================
  function toggleCompare(profId) {
    if (compareProfIds.has(profId)) {
      compareProfIds.delete(profId);
      showToast('Removed from comparison', 'info');
    } else {
      if (compareProfIds.size >= 3) {
        showToast('You can compare up to 3 professors at a time', 'info');
        return;
      }
      compareProfIds.add(profId);
      showToast('Added to comparison dock! ⚖️', 'success');
    }
    saveCompareProfs();
    updateHeaderStats();
    renderFilteredGrid();
    renderCompareDock();
  }

  function renderCompareDock() {
    if (!elements.compareDock) return;

    if (compareProfIds.size === 0) {
      elements.compareDock.style.display = 'none';
      return;
    }

    elements.compareDock.style.display = 'block';
    elements.compareDockCount.textContent = compareProfIds.size;
    elements.compareDockChips.innerHTML = '';

    compareProfIds.forEach((id) => {
      const p = professors.find((item) => item.id === id);
      if (!p) return;

      const chip = document.createElement('div');
      chip.className = 'compare-dock-chip';
      chip.innerHTML = `
        <span>${escapeHtml(p.name)}</span>
        <span class="compare-dock-chip-remove" title="Remove">&times;</span>
      `;
      chip.querySelector('.compare-dock-chip-remove').addEventListener('click', () => {
        toggleCompare(p.id);
      });
      elements.compareDockChips.appendChild(chip);
    });
  }

  function clearComparison() {
    compareProfIds.clear();
    saveCompareProfs();
    updateHeaderStats();
    renderFilteredGrid();
    renderCompareDock();
    if (elements.compareModal && elements.compareModal.open) {
      elements.compareModal.close();
    }
    showToast('Comparison cleared', 'info');
  }

  function openCompareModal() {
    if (compareProfIds.size === 0) {
      showToast('Select at least 1 professor to compare', 'info');
      return;
    }

    const comparedProfs = professors.filter((p) => compareProfIds.has(p.id));
    if (comparedProfs.length === 0) return;

    // Find highest rated professor among compared
    const highestRating = Math.max(...comparedProfs.map((p) => p.overallRating || 0));

    const colsHtml = comparedProfs.map((prof) => {
      const initials = getInitials(prof.name);
      const isWinner = prof.overallRating === highestRating && highestRating > 0;
      const reviewCount = prof.reviews ? prof.reviews.length : 0;
      const gradeStats = calculateGradeStats(prof.reviews);
      const logistics = calculateLogistics(prof.reviews);
      const featuredReview = prof.reviews && prof.reviews.length > 0 ? prof.reviews[0].comment : 'No reviews posted yet.';

      const tagsHtml = (prof.tags || [])
        .map((t) => `<span class="badge-tag">${escapeHtml(t)}</span>`)
        .join(' ');

      return `
        <div class="compare-card-column ${isWinner ? 'winner-col' : ''}">
          <div class="compare-col-header">
            <div class="compare-col-identity">
              <div class="compare-col-avatar">${initials}</div>
              <div>
                <h3 style="font-size: 1.1rem; font-weight: 800;">${escapeHtml(prof.name)}</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(prof.department)}</p>
                <p style="font-size: 0.75rem; color: var(--text-dim);">${escapeHtml(prof.university || 'State University')}</p>
              </div>
            </div>
            <button class="btn-icon" data-remove-compare="${prof.id}" title="Remove from comparison">&times;</button>
          </div>

          <div class="compare-metric-row">
            <span class="compare-metric-label">Quality Score:</span>
            <span class="compare-metric-value">
              ${reviewCount > 0 ? prof.overallRating.toFixed(1) + ' / 5.0' : 'N/A'}
              ${isWinner ? '<span class="compare-best-badge">★ Top Pick</span>' : ''}
            </span>
          </div>

          <div class="compare-metric-row">
            <span class="compare-metric-label">Difficulty:</span>
            <span class="compare-metric-value">${reviewCount > 0 ? prof.difficulty.toFixed(1) + ' / 5.0' : 'N/A'}</span>
          </div>

          <div class="compare-metric-row">
            <span class="compare-metric-label">Would Take Again:</span>
            <span class="compare-metric-value">${reviewCount > 0 ? prof.wouldTakeAgainPercent + '%' : 'N/A'}</span>
          </div>

          <div class="compare-metric-row">
            <span class="compare-metric-label">Reported GPA:</span>
            <span class="compare-metric-value">${gradeStats.avgGpa ? gradeStats.avgGpa + ' / 4.0' : 'N/A'}</span>
          </div>

          <div class="compare-metric-row">
            <span class="compare-metric-label">Textbook Policy:</span>
            <span class="compare-metric-value" style="font-size: 0.8rem;">${escapeHtml(logistics.textbook)}</span>
          </div>

          <div class="compare-metric-row">
            <span class="compare-metric-label">Weekly Study:</span>
            <span class="compare-metric-value" style="font-size: 0.8rem;">${escapeHtml(logistics.workload)}</span>
          </div>

          <div class="compare-metric-row">
            <span class="compare-metric-label">Courses Taught:</span>
            <span class="compare-metric-value" style="font-size: 0.78rem;">${escapeHtml((prof.courses || []).join(', ') || 'N/A')}</span>
          </div>

          <div style="margin-top: 0.25rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem;">Top Student Tags:</div>
            <div>${tagsHtml || '<span style="font-size: 0.75rem; color: var(--text-dim);">No tags</span>'}</div>
          </div>

          <div>
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.3rem;">Student Verdict Snippet:</div>
            <div class="compare-quote-box">"${escapeHtml(featuredReview.slice(0, 140))}${featuredReview.length > 140 ? '...' : ''}"</div>
          </div>

          <div style="margin-top: auto; display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary flex-1" data-view-profile="${prof.id}">Full Profile &rarr;</button>
          </div>
        </div>
      `;
    }).join('');

    elements.compareModalBody.innerHTML = `
      <div class="compare-matrix-grid" style="--compare-cols: ${comparedProfs.length};">
        ${colsHtml}
      </div>
    `;

    // Hook up buttons inside comparison modal
    elements.compareModalBody.querySelectorAll('[data-remove-compare]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-compare');
        toggleCompare(id);
        if (compareProfIds.size > 0) {
          openCompareModal();
        } else {
          elements.compareModal.close();
        }
      });
    });

    elements.compareModalBody.querySelectorAll('[data-view-profile]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-view-profile');
        elements.compareModal.close();
        openProfileModal(id);
      });
    });

    elements.compareModal.showModal();
  }

  // Copy Semester Plan to Clipboard
  function copySemesterShortlist() {
    const saved = professors.filter((p) => savedProfIds.has(p.id));
    if (saved.length === 0) {
      showToast('No saved professors in your shortlist', 'info');
      return;
    }

    let text = `========================================\n🎓 MY SEMESTER COURSE SHORTLIST (RateMyProf)\n========================================\n\n`;
    saved.forEach((p, idx) => {
      const reviewCount = p.reviews ? p.reviews.length : 0;
      const note = studentNotes[p.id] ? `   📝 Note: ${studentNotes[p.id]}\n` : '';
      text += `${idx + 1}. ${p.name} - ${p.department} (${p.university || 'State University'})\n`;
      text += `   Courses: ${(p.courses || []).join(', ') || 'General'}\n`;
      text += `   Overall Quality: ${reviewCount > 0 ? p.overallRating.toFixed(1) : 'N/A'} / 5.0 | Difficulty: ${reviewCount > 0 ? p.difficulty.toFixed(1) : 'N/A'} / 5.0\n`;
      if (note) text += note;
      text += `\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast('Semester shortlist copied to clipboard! 📋', 'success');
    }).catch(() => {
      showToast('Plan formatted! Please copy manually.', 'info');
    });
  }

  // ================= PROFESSOR PROFILE MODAL =================
  function openProfileModal(profId) {
    const prof = professors.find((p) => p.id === profId);
    if (!prof) return;

    currentActiveProfileProfId = profId;
    profileCourseFilter = 'all';
    profileReviewSort = 'helpful_desc';

    // Update URL Hash for deep-linking
    history.replaceState(null, '', '#prof=' + profId);

    renderProfileModalContent(prof);
    elements.profileModal.showModal();
  }

  function renderProfileModalContent(prof) {
    const reviewCount = prof.reviews ? prof.reviews.length : 0;
    const scoreClass = getScoreColorClass(prof.overallRating);
    const initials = getInitials(prof.name);
    const gradeStats = calculateGradeStats(prof.reviews);
    const logistics = calculateLogistics(prof.reviews);

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

    // Extract unique courses taught in reviews
    const uniqueCourses = Array.from(new Set((prof.reviews || []).map((r) => r.course).filter(Boolean)));

    // Course filter chips HTML
    const courseChipsHtml = `
      <div class="course-filter-chips">
        <span class="filter-label" style="margin-right: 0.35rem;">Filter by Course:</span>
        <button class="course-chip ${profileCourseFilter === 'all' ? 'active' : ''}" data-course="all">All (${reviewCount})</button>
        ${uniqueCourses.map((c) => {
          const count = prof.reviews.filter((r) => r.course === c).length;
          return `<button class="course-chip ${profileCourseFilter === c ? 'active' : ''}" data-course="${escapeHtml(c)}">${escapeHtml(c)} (${count})</button>`;
        }).join('')}
      </div>
    `;

    // Filter & Sort Reviews
    let displayedReviews = [...(prof.reviews || [])];
    if (profileCourseFilter !== 'all') {
      displayedReviews = displayedReviews.filter((r) => r.course === profileCourseFilter);
    }

    displayedReviews.sort((a, b) => {
      switch (profileReviewSort) {
        case 'helpful_desc':
          return (b.helpfulCount || 0) - (a.helpfulCount || 0);
        case 'newest_desc':
          return new Date(b.date || 0) - new Date(a.date || 0);
        case 'rating_desc':
          return (b.overallRating || 0) - (a.overallRating || 0);
        case 'rating_asc':
          return (a.overallRating || 0) - (b.overallRating || 0);
        default:
          return 0;
      }
    });

    const reviewsHtml =
      displayedReviews.length === 0
        ? `<div class="empty-state" style="padding: 2rem 1rem;">
             <p>No reviews match the selected course filter.</p>
             <button class="btn btn-secondary" id="btnResetCourseFilter">Show All Courses</button>
           </div>`
        : displayedReviews
            .map((rev) => {
              const isHelpfulVoted = helpfulVotes.has(rev.id);
              const isUnhelpfulVoted = unhelpfulVotes.has(rev.id);
              const isReported = reportedReviews.has(rev.id);
              const revQualityClass = getScoreColorClass(rev.overallRating);
              const tagPills = (rev.tags || []).map((t) => `<span class="badge-tag">${escapeHtml(t)}</span>`).join('');

              return `
          <div class="review-item-card" data-rev-id="${rev.id}">
            ${isReported ? `
              <div class="review-flagged-banner">
                <span>⚠️ This review has been reported by students and is pending community moderation review.</span>
                <button class="btn-toggle-flagged" data-toggle-rev="${rev.id}">Toggle Content</button>
              </div>
            ` : ''}

            <div class="review-card-top">
              <div class="review-badges-row">
                <span class="score-badge-pill quality ${revQualityClass}">Quality ${Number(rev.overallRating).toFixed(1)}</span>
                <span class="badge-tag">Diff ${rev.difficulty || 3.0}</span>
                <span class="badge-tag">${escapeHtml(rev.course || 'Class')}</span>
                ${rev.grade ? `<span class="badge-tag" style="background: var(--bg-surface); font-weight: 700;">Grade: ${escapeHtml(rev.grade)}</span>` : ''}
              </div>
              <span class="review-meta-text">${escapeHtml(rev.date || 'Recent')} &bull; ${escapeHtml(rev.studentRole || 'Student')}</span>
            </div>

            <p class="review-text-content" id="rev-text-${rev.id}">${escapeHtml(rev.comment)}</p>

            ${tagPills ? `<div class="prof-tags-container" style="margin-bottom: 0;">${tagPills}</div>` : ''}

            <div class="review-extra-meta">
              <span>Attendance: <strong>${rev.attendanceMandatory ? 'Mandatory' : 'Optional'}</strong></span>
              <span>Would take again: <strong>${rev.takeAgain ? 'Yes' : 'No'}</strong></span>
              <span>Textbook: <strong>${escapeHtml(rev.textbookRequired || 'No / Not needed')}</strong></span>
              <span>Workload: <strong>${escapeHtml(rev.studyHours || '3-6 hrs/wk')}</strong></span>
            </div>

            <div class="review-card-footer">
              <span class="review-meta-text">Was this review helpful?</span>
              <div class="review-actions-group">
                <button class="btn-helpful ${isHelpfulVoted ? 'voted' : ''}" data-vote-helpful="${rev.id}" title="Mark as helpful">
                  👍 <span>Helpful (${rev.helpfulCount || 0})</span>
                </button>
                <button class="btn-unhelpful ${isUnhelpfulVoted ? 'voted' : ''}" data-vote-unhelpful="${rev.id}" title="Mark as unhelpful">
                  👎 <span>(${rev.unhelpfulCount || 0})</span>
                </button>
                <button class="btn-report" data-report-rev="${rev.id}" title="Report inappropriate review">
                  🚩 Flag
                </button>
              </div>
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
            ${prof.courses && prof.courses.length ? `<p style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.2rem;">Courses Taught: ${escapeHtml(prof.courses.join(', '))}</p>` : ''}
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button class="btn-share" id="btnShareProfile" title="Share direct link to this professor">
            🔗 <span>Share Link</span>
          </button>
          <button class="btn btn-primary" id="btnRateFromProfile">
            ⭐ Rate Professor
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

      <!-- Course Logistics & Expectations -->
      <div class="logistics-grid">
        <div class="logistics-card">
          <span class="logistics-icon">📖</span>
          <span class="logistics-val">${escapeHtml(logistics.textbook)}</span>
          <span class="logistics-label">Textbook Requirement</span>
        </div>
        <div class="logistics-card">
          <span class="logistics-icon">⏱️</span>
          <span class="logistics-val">${escapeHtml(logistics.workload)}</span>
          <span class="logistics-label">Average Study Hours</span>
        </div>
        <div class="logistics-card">
          <span class="logistics-icon">📊</span>
          <span class="logistics-val">${gradeStats.avgGpa ? gradeStats.avgGpa + ' GPA' : 'Graded Fairly'}</span>
          <span class="logistics-label">Reported GPA Average</span>
        </div>
      </div>

      <!-- Grade Distribution Section -->
      <div class="grade-dist-section">
        <div class="grade-dist-header">
          <h4>Reported Student Grade Distribution (${gradeStats.total} responses)</h4>
          ${gradeStats.avgGpa ? `<span class="gpa-badge-pill">Estimated Average: ${gradeStats.avgGpa} GPA</span>` : ''}
        </div>
        <div class="grade-stacked-bar">
          <div class="grade-segment grade-seg-a" style="width: ${gradeStats.percentages.A}%" title="A range: ${gradeStats.percentages.A}% (${gradeStats.counts.A} students)"></div>
          <div class="grade-segment grade-seg-b" style="width: ${gradeStats.percentages.B}%" title="B range: ${gradeStats.percentages.B}% (${gradeStats.counts.B} students)"></div>
          <div class="grade-segment grade-seg-c" style="width: ${gradeStats.percentages.C}%" title="C range: ${gradeStats.percentages.C}% (${gradeStats.counts.C} students)"></div>
          <div class="grade-segment grade-seg-df" style="width: ${gradeStats.percentages.DF}%" title="D/F range: ${gradeStats.percentages.DF}% (${gradeStats.counts.DF} students)"></div>
          <div class="grade-segment grade-seg-other" style="width: ${gradeStats.percentages.Other}%" title="Pass/Other: ${gradeStats.percentages.Other}% (${gradeStats.counts.Other} students)"></div>
        </div>
        <div class="grade-dist-legend">
          <div class="grade-legend-item"><span class="grade-legend-dot" style="background: #10b981;"></span> A (${gradeStats.percentages.A}%)</div>
          <div class="grade-legend-item"><span class="grade-legend-dot" style="background: #3b82f6;"></span> B (${gradeStats.percentages.B}%)</div>
          <div class="grade-legend-item"><span class="grade-legend-dot" style="background: #f59e0b;"></span> C (${gradeStats.percentages.C}%)</div>
          <div class="grade-legend-item"><span class="grade-legend-dot" style="background: #ef4444;"></span> D/F (${gradeStats.percentages.DF}%)</div>
          ${gradeStats.counts.Other > 0 ? `<div class="grade-legend-item"><span class="grade-legend-dot" style="background: #8b5cf6;"></span> Pass (${gradeStats.percentages.Other}%)</div>` : ''}
        </div>
      </div>

      <div class="rating-breakdown-box">
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem;">Quality Rating Distribution (${reviewCount} ratings)</h4>
        ${breakdownHtml}
      </div>

      <!-- Student Reviews Section with Filter & Sort Toolbar -->
      <div class="profile-reviews-section">
        <div class="reviews-header-bar">
          <h3>Student Reviews</h3>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${reviewCount} reviews</span>
        </div>

        <div class="profile-reviews-toolbar">
          ${courseChipsHtml}
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <label for="profileSortSelect" class="filter-label">Sort:</label>
            <select id="profileSortSelect" class="styled-select" style="padding: 0.35rem 1.6rem 0.35rem 0.6rem; font-size: 0.8rem;">
              <option value="helpful_desc" ${profileReviewSort === 'helpful_desc' ? 'selected' : ''}>Most Helpful</option>
              <option value="newest_desc" ${profileReviewSort === 'newest_desc' ? 'selected' : ''}>Newest First</option>
              <option value="rating_desc" ${profileReviewSort === 'rating_desc' ? 'selected' : ''}>Highest Rating</option>
              <option value="rating_asc" ${profileReviewSort === 'rating_asc' ? 'selected' : ''}>Lowest Rating</option>
            </select>
          </div>
        </div>

        ${reviewsHtml}
      </div>
    `;

    // Hook up buttons inside profile modal
    const shareBtn = document.getElementById('btnShareProfile');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const fullUrl = window.location.origin + window.location.pathname + '#prof=' + prof.id;
        navigator.clipboard.writeText(fullUrl).then(() => {
          showToast('Direct link copied to clipboard! Share with your classmates 🔗', 'success');
        }).catch(() => {
          showToast(`Link: ${fullUrl}`, 'info');
        });
      });
    }

    const rateFromProfileBtn = document.getElementById('btnRateFromProfile');
    if (rateFromProfileBtn) {
      rateFromProfileBtn.addEventListener('click', () => {
        elements.profileModal.close();
        openRatingModalForProf(prof.id);
      });
    }

    const resetCourseFilterBtn = document.getElementById('btnResetCourseFilter');
    if (resetCourseFilterBtn) {
      resetCourseFilterBtn.addEventListener('click', () => {
        profileCourseFilter = 'all';
        renderProfileModalContent(prof);
      });
    }

    // Course chip click handlers
    elements.profileModalBody.querySelectorAll('.course-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        profileCourseFilter = chip.getAttribute('data-course');
        renderProfileModalContent(prof);
      });
    });

    // Sort select handler
    const sortSelect = document.getElementById('profileSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        profileReviewSort = e.target.value;
        renderProfileModalContent(prof);
      });
    }

    // Helpful & Unhelpful voting handlers
    elements.profileModalBody.querySelectorAll('[data-vote-helpful]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const revId = btn.getAttribute('data-vote-helpful');
        handleHelpfulVote(prof.id, revId);
      });
    });

    elements.profileModalBody.querySelectorAll('[data-vote-unhelpful]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const revId = btn.getAttribute('data-vote-unhelpful');
        handleUnhelpfulVote(prof.id, revId);
      });
    });

    // Report Review handlers
    elements.profileModalBody.querySelectorAll('[data-report-rev]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const revId = btn.getAttribute('data-report-rev');
        openReportReviewModal(prof.id, revId);
      });
    });

    // Toggle Flagged Review Content
    elements.profileModalBody.querySelectorAll('[data-toggle-rev]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const revId = btn.getAttribute('data-toggle-rev');
        const textEl = document.getElementById(`rev-text-${revId}`);
        if (textEl) {
          textEl.style.display = textEl.style.display === 'none' ? 'block' : 'none';
        }
      });
    });
  }

  // Voting Handlers (Helpful & Unhelpful)
  function handleHelpfulVote(profId, revId) {
    const prof = professors.find((p) => p.id === profId);
    if (!prof) return;
    const review = prof.reviews.find((r) => r.id === revId);
    if (!review) return;

    if (helpfulVotes.has(revId)) {
      // Undo helpful vote
      helpfulVotes.delete(revId);
      review.helpfulCount = Math.max(0, (review.helpfulCount || 1) - 1);
      showToast('Helpful vote removed', 'info');
    } else {
      helpfulVotes.add(revId);
      review.helpfulCount = (review.helpfulCount || 0) + 1;

      // If previously unhelpful, remove unhelpful vote
      if (unhelpfulVotes.has(revId)) {
        unhelpfulVotes.delete(revId);
        review.unhelpfulCount = Math.max(0, (review.unhelpfulCount || 1) - 1);
      }
      showToast('Thank you! Feedback recorded 👍', 'success');
    }

    saveHelpfulVotes();
    saveUnhelpfulVotes();
    saveProfessors();
    renderProfileModalContent(prof);
  }

  function handleUnhelpfulVote(profId, revId) {
    const prof = professors.find((p) => p.id === profId);
    if (!prof) return;
    const review = prof.reviews.find((r) => r.id === revId);
    if (!review) return;

    if (unhelpfulVotes.has(revId)) {
      // Undo unhelpful vote
      unhelpfulVotes.delete(revId);
      review.unhelpfulCount = Math.max(0, (review.unhelpfulCount || 1) - 1);
      showToast('Vote removed', 'info');
    } else {
      unhelpfulVotes.add(revId);
      review.unhelpfulCount = (review.unhelpfulCount || 0) + 1;

      // If previously helpful, remove helpful vote
      if (helpfulVotes.has(revId)) {
        helpfulVotes.delete(revId);
        review.helpfulCount = Math.max(0, (review.helpfulCount || 1) - 1);
      }
      showToast('Feedback recorded', 'info');
    }

    saveHelpfulVotes();
    saveUnhelpfulVotes();
    saveProfessors();
    renderProfileModalContent(prof);
  }

  // ================= REPORT REVIEW MODAL =================
  function openReportReviewModal(profId, revId) {
    elements.reportProfId.value = profId;
    elements.reportRevId.value = revId;
    elements.reportReviewForm.reset();
    elements.reportModal.showModal();
  }

  function handleReportReviewSubmit(e) {
    e.preventDefault();
    const profId = elements.reportProfId.value;
    const revId = elements.reportRevId.value;
    const reason = elements.reportReasonSelect.value;

    if (!reason) {
      showToast('Please select a violation category', 'info');
      elements.reportReasonSelect.focus();
      return;
    }

    reportedReviews.add(revId);
    saveReportedReviews();

    elements.reportModal.close();
    showToast('Report submitted. Flagged for community moderation review! 🚩', 'success');

    const prof = professors.find((p) => p.id === profId);
    if (prof && elements.profileModal.open) {
      renderProfileModalContent(prof);
    }
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
    const textbookRequired = elements.textbookSelect ? elements.textbookSelect.value : 'No / Not needed';
    const studyHours = elements.workloadSelect ? elements.workloadSelect.value : '3-6 hrs/wk';

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
      textbookRequired: textbookRequired,
      studyHours: studyHours,
      tags: Array.from(selectedFormTags),
      comment: comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      studentRole: studentRole,
      helpfulCount: 0,
      unhelpfulCount: 0
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
      renderProfileModalContent(prof);
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

    activeDept = 'all';
    updateDeptPillUI();
    showingSavedOnly = false;
    renderAll();

    setTimeout(() => {
      openRatingModalForProf(newProf.id);
    }, 400);
  }

  // ================= SEARCH AUTOCOMPLETE =================
  function highlightMatches(text, query) {
    if (!text || !query) return escapeHtml(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<span class="autocomplete-match">$1</span>');
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function handleSearchInput(e) {
    searchQuery = e.target.value;
    elements.clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';

    renderFilteredGrid();

    const q = searchQuery.trim().toLowerCase();
    if (q.length === 0) {
      closeAutocomplete();
      return;
    }

    // Find top matching professors
    autocompleteMatches = professors.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDept = p.department.toLowerCase().includes(q);
      const matchCourse = (p.courses || []).some((c) => c.toLowerCase().includes(q));
      return matchName || matchDept || matchCourse;
    }).slice(0, 5);

    renderAutocomplete(q);
  }

  function renderAutocomplete(query) {
    if (!elements.searchAutocomplete) return;

    if (autocompleteMatches.length === 0) {
      closeAutocomplete();
      return;
    }

    autocompleteHighlightedIndex = -1;
    elements.searchAutocomplete.style.display = 'flex';
    elements.searchAutocomplete.innerHTML = '';

    autocompleteMatches.forEach((p, idx) => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-prof-id', p.id);

      const initials = getInitials(p.name);
      const scoreClass = getScoreColorClass(p.overallRating);
      const reviewCount = p.reviews ? p.reviews.length : 0;
      const coursesStr = (p.courses || []).join(', ');

      item.innerHTML = `
        <div class="autocomplete-item-left">
          <div class="autocomplete-avatar">${initials}</div>
          <div class="autocomplete-info">
            <span class="autocomplete-name">${highlightMatches(p.name, query)}</span>
            <span class="autocomplete-meta">${highlightMatches(p.department, query)} &bull; ${coursesStr ? highlightMatches(coursesStr, query) : 'No courses listed'}</span>
          </div>
        </div>
        <span class="autocomplete-badge ${scoreClass}">${reviewCount > 0 ? p.overallRating.toFixed(1) + ' ★' : 'New'}</span>
      `;

      item.addEventListener('click', () => {
        openProfileModal(p.id);
        closeAutocomplete();
      });

      elements.searchAutocomplete.appendChild(item);
    });
  }

  function closeAutocomplete() {
    if (elements.searchAutocomplete) {
      elements.searchAutocomplete.style.display = 'none';
      elements.searchAutocomplete.innerHTML = '';
      autocompleteMatches = [];
      autocompleteHighlightedIndex = -1;
    }
  }

  function handleSearchKeydown(e) {
    if (!elements.searchAutocomplete || elements.searchAutocomplete.style.display === 'none') {
      return;
    }

    const items = elements.searchAutocomplete.querySelectorAll('.autocomplete-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      autocompleteHighlightedIndex = (autocompleteHighlightedIndex + 1) % items.length;
      updateAutocompleteHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      autocompleteHighlightedIndex = (autocompleteHighlightedIndex - 1 + items.length) % items.length;
      updateAutocompleteHighlight(items);
    } else if (e.key === 'Enter') {
      if (autocompleteHighlightedIndex >= 0 && autocompleteHighlightedIndex < items.length) {
        e.preventDefault();
        items[autocompleteHighlightedIndex].click();
      }
    } else if (e.key === 'Escape') {
      closeAutocomplete();
    }
  }

  function updateAutocompleteHighlight(items) {
    items.forEach((item, idx) => {
      if (idx === autocompleteHighlightedIndex) {
        item.classList.add('highlighted');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('highlighted');
      }
    });
  }

  // ================= URL HASH DEEP LINKING =================
  function checkUrlHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#prof=')) {
      const profId = hash.replace('#prof=', '').trim();
      if (profId) {
        setTimeout(() => {
          openProfileModal(profId);
        }, 150);
      }
    }
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
      closeAutocomplete();
      renderFilteredGrid();
    });

    elements.savedProfsBtn.addEventListener('click', () => {
      showingSavedOnly = !showingSavedOnly;
      renderFilteredGrid();
    });

    if (elements.compareProfsBtn) {
      elements.compareProfsBtn.addEventListener('click', () => {
        openCompareModal();
      });
    }

    elements.rateNewBtn.addEventListener('click', () => {
      openRatingModalForProf();
    });

    elements.addProfBtn.addEventListener('click', () => {
      openAddProfModal();
    });

    // Comparison Dock actions
    if (elements.launchCompareBtn) {
      elements.launchCompareBtn.addEventListener('click', openCompareModal);
    }

    if (elements.clearCompareBtn) {
      elements.clearCompareBtn.addEventListener('click', clearComparison);
    }

    // Reset Seed Data
    elements.seedResetBtn.addEventListener('click', () => {
      if (confirm('Reset catalog back to sample professors, reviews, and ratings?')) {
        professors = JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
        professors.forEach(recalculateProfessorStats);
        savedProfIds.clear();
        compareProfIds.clear();
        helpfulVotes.clear();
        unhelpfulVotes.clear();
        reportedReviews.clear();
        studentNotes = {};

        saveProfessors();
        saveSavedProfs();
        saveCompareProfs();
        saveHelpfulVotes();
        saveUnhelpfulVotes();
        saveReportedReviews();
        saveStudentNotes();

        renderAll();
        showToast('Sample catalog data reset successfully!', 'success');
      }
    });

    // Search Input & Autocomplete
    elements.searchInput.addEventListener('input', handleSearchInput);
    elements.searchInput.addEventListener('keydown', handleSearchKeydown);

    elements.clearSearchBtn.addEventListener('click', () => {
      searchQuery = '';
      elements.searchInput.value = '';
      elements.clearSearchBtn.style.display = 'none';
      closeAutocomplete();
      elements.searchInput.focus();
      renderFilteredGrid();
    });

    // Close autocomplete on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        closeAutocomplete();
      }
    });

    // Global keyboard shortcut: press / to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        elements.searchInput.focus();
        elements.searchInput.select();
      } else if (e.key === 'Escape') {
        closeAutocomplete();
      }
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
      closeAutocomplete();
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
    elements.closeProfileModalBtn.addEventListener('click', () => {
      elements.profileModal.close();
      history.replaceState(null, '', window.location.pathname);
    });

    elements.closeRateModalBtn.addEventListener('click', () => elements.rateModal.close());
    elements.cancelRateBtn.addEventListener('click', () => elements.rateModal.close());
    elements.closeAddProfModalBtn.addEventListener('click', () => elements.addProfModal.close());
    elements.cancelAddProfBtn.addEventListener('click', () => elements.addProfModal.close());

    if (elements.closeCompareModalBtn) {
      elements.closeCompareModalBtn.addEventListener('click', () => elements.compareModal.close());
    }

    if (elements.closeReportModalBtn) {
      elements.closeReportModalBtn.addEventListener('click', () => elements.reportModal.close());
    }

    if (elements.cancelReportBtn) {
      elements.cancelReportBtn.addEventListener('click', () => elements.reportModal.close());
    }

    // Close on backdrop click
    [elements.profileModal, elements.rateModal, elements.addProfModal, elements.compareModal, elements.reportModal].forEach((dialog) => {
      if (!dialog) return;
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          dialog.close();
          if (dialog === elements.profileModal) {
            history.replaceState(null, '', window.location.pathname);
          }
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
    if (elements.reportReviewForm) {
      elements.reportReviewForm.addEventListener('submit', handleReportReviewSubmit);
    }

    // Listen for hashchange
    window.addEventListener('hashchange', checkUrlHash);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
