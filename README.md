# RateMyProf - Student Professor Ratings Platform

A modern, responsive, student-centered website designed to make course registration transparent, easy, and stress-free.

## Features

- **Search & Discovery**:
  - Live, instant search across Professor names, departments, universities, course codes (e.g., `CS101`, `MATH151`), and review tags.
  - Department filtering chips (Computer Science, Mathematics, Engineering, Business, Psychology, Humanities).
  - Multi-criteria filtering by minimum rating (4.5+, 4.0+, 3.0+) and difficulty levels (Easy, Moderate, Hardcore).
  - Dynamic sorting by Highest Rated, Most Reviews, Easiest, Toughest, or Alphabetical.

- **Professor Profile & Review Breakdown**:
  - Overall quality score out of 5.0 (color-coded for quick visual assessment: Green for 4.0+, Amber for 3.0-3.9, Red for <3.0).
  - Level of difficulty indicator (1.0 to 5.0).
  - "Would take again" percentage.
  - Star distribution breakdown chart (5★ down to 1★).
  - Full chronological list of student reviews with course taken, grade received, attendance policy, tags, and feedback.
  - Interactive "👍 Helpful" vote counter with duplicate vote protection.

- **Interactive Rating System**:
  - Interactive 5-star rating selector with real-time feedback (Terrible to Awesome).
  - 5-level difficulty selector (Cake Walk to Hardcore).
  - Tag selector for common course traits (e.g., *Inspirational*, *Tough Grader*, *Lots of Homework*, *Clear Grading Criteria*).
  - Grade received selector, attendance requirement toggle, and "Would take again?" option.
  - Automatic recalculation of professor scores and rankings upon review submission.

- **Add New Faculty**:
  - Ability for students to add new professors to the directory if they aren't already listed.

- **Student-First UX & Design**:
  - **Dark / Light Mode**: Instant toggle saved in user preferences.
  - **Saved / Bookmarks**: Save candidate professors for semester planning.
  - **Local Persistence**: All new ratings, professors, votes, and bookmarks persist in `localStorage`.
  - **Zero external build tools needed**: Runs directly out of the box in any modern browser.

---

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
