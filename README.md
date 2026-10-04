# QuickNotes

## Description
QuickNotes is a lightweight, responsive note-taking web application designed to help users quickly capture, categorize, search, and manage their daily notes. Built as part of the Power Learn Project software engineering curriculum, it demonstrates robust DOM manipulation, client-side data persistence, and clean responsive design.

## Features
- **Categorized Notes:** Organize notes under Personal (teal), Work (dark red), and Study (blue) categories with distinct color-coded indicators.
- **Form Validation:** Prevents empty submissions and restricts notes to a maximum of 200 characters with live error reporting.
- **Real-Time Search:** Instantly filters notes by keyword as you type.
- **Local Storage:** Automatically saves notes in the browser so data persists across page refreshes.
- **Bonus Clear All:** Safely clears all stored notes with a confirmation prompt.
- **Responsive Layout:** Adapts cleanly to mobile screens and small viewports using CSS Flexbox and media queries.

## How to Run Locally
1. Clone or download this repository to your local machine.
2. Open the project folder (`quicknotes-app`).
3. Open `index.html` directly in any modern web browser, or use a live server extension (such as Live Server in VS Code).

## What I Learned
1. **The Render Pattern:** Managing state as a single source of truth (an array of objects) and regenerating the UI cleanly through DOM methods (`createElement` and `textContent`).
2. **Data Persistence:** Utilizing browser `localStorage` alongside JSON serialization (`JSON.stringify` and `JSON.parse`) to maintain user data across sessions.
3. **Security and Best Practices:** Avoiding `innerHTML` for dynamic user content input to eliminate XSS vulnerabilities while implementing robust input validation and user confirmation checks.;
