# RateMyProf - Student Professor Ratings Platform

A modern, responsive, student-centered website designed to make course registration transparent, easy, and stress-free.

## Features

- **Search & Discovery**:
  - Live, instant search across Professor names, departments, universities, course codes (e.g., `CS101`, `MATH151`), and review tags.
  - Instant search autocomplete dropdown with substring highlighting and arrow key navigation.
  - Keyboard shortcuts: Press `/` anywhere to focus search box, `Esc` to dismiss modals or suggestions.
  - Department filtering chips (Computer Science, Mathematics, Engineering, Business, Psychology, Humanities).
  - Multi-criteria filtering by minimum rating (4.5+, 4.0+, 3.0+) and difficulty levels (Easy, Moderate, Hardcore).
  - Dynamic sorting by Highest Rated, Most Reviews, Easiest, Toughest, or Alphabetical.

- **Professor Profile & Grade Analytics**:
  - Overall quality score out of 5.0 (color-coded: Green for 4.0+, Amber for 3.0-3.9, Red for <3.0).
  - Level of difficulty indicator (1.0 to 5.0).
  - "Would take again" percentage.
  - **Reported Grade Distribution**: Interactive stacked bar breakdown showing % and counts of A's, B's, C's, D/F's, and estimated 4.0 scale GPA.
  - **Course Logistics & Workload**: Community consensus on textbook necessity (No / Free PDF / Mandatory) and average weekly study hours.
  - **Course-Specific Review Filtering**: Filter student feedback by specific course code (e.g. CS 101 vs CS 350).
  - **Review Sorting**: Sort reviews by Most Helpful, Newest, Highest Rating, or Lowest Rating.
  - **Community Feedback & Moderation**: Both "👍 Helpful" and "👎 Unhelpful" voting with undo support, plus "🚩 Flag / Report Review" dialog.
  - **Shareable Deep Links**: Direct `#prof=...` URLs with one-click clipboard copying.

- **Side-by-Side Professor Comparison**:
  - Compare up to 3 faculty members side-by-side with sticky comparison dock.
  - Comparative matrix benchmarking quality scores, difficulty meters, grade averages, workload, textbook requirements, and student quotes.

- **Interactive Rating System**:
  - Interactive 5-star rating selector with real-time feedback (Terrible to Awesome).
  - 5-level difficulty selector (Cake Walk to Hardcore).
  - Course code and letter grade selector (A+ through F).
  - Logistics selectors for textbook requirement and weekly study hours.
  - Authentic student tag selectors (*Curves the Midterm*, *Lecture Slides Online*, *No Textbook Needed*, *Heavy Coding Psets*, *Skip Class, Regret Later*, etc.).
  - Automatic recalculation of professor scores, grade distribution, and rankings upon review submission.

- **Semester Registration Planner & Private Student Notes**:
  - Bookmark candidate professors for upcoming semester course registration.
  - Private student notes field on saved professors to keep track of section numbers, days, and backup options.
  - One-click "📋 Copy Shortlist to Clipboard" formatted export.

- **Add New Faculty**:
  - Ability for students to add new professors to the directory if they aren't already listed.

- **Student-First UX & Design**:
  - **Dark / Light Mode**: Instant toggle saved in user preferences.
  - **Local Persistence**: All new ratings, professors, votes, notes, and comparisons persist in `localStorage`.
  - **Zero external build tools needed**: Runs directly out of the box in any modern browser.
----

## How to Run

### Option 1: Open directly in your browser
Simply double-click or open `index.html` in your favorite web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Run with a local development server
From your terminal in this directory:

```bash
# Using Python
python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

Or using Node:
```bash
npx serve .
```
