// Select elements using querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all-btn');

// Load notes from localStorage or initialize empty array
let notes = JSON.parse(localStorage.getItem('quicknotes')) || [];

// Helper function to format readable date and time
function getFormattedDate() {
    const now = new Date();
    return now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
}

// Render function: rebuilds list from array using createElement and textContent (never innerHTML for user text)
function render(filterText = '') {
    notesList.textContent = ''; // clear current list

    // Filter notes based on search query (case-insensitive)
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(filterText.toLowerCase())
    );

    // Update note count text message
    if (notes.length === 0) {
        noteCount.textContent = 'You have no notes yet.';
        clearAllBtn.style.display = 'none';
    } else if (notes.length === 1) {
        noteCount.textContent = 'You have 1 note.';
        clearAllBtn.style.display = 'block';
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
        clearAllBtn.style.display = 'block';
    }

    // Handle empty search results case
    if (filteredNotes.length === 0 && notes.length > 0) {
        const emptySearchLi = document.createElement('li');
        emptySearchLi.textContent = 'No notes match your search.';
        emptySearchLi.style.color = '#64748b';
        emptySearchLi.style.fontStyle = 'italic';
        notesList.appendChild(emptySearchLi);
        return;
    }

    // Build elements safely
    filteredNotes.forEach(note => {
        const li = document.createElement('li');
        li.className = `note-card category-${note.category.toLowerCase()}`;

        const headerInfo = document.createElement('div');
        headerInfo.className = 'note-header-info';

        const badge = document.createElement('span');
        badge.className = 'note-category-badge';
        badge.textContent = note.category;

        const dateSpan = document.createElement('span');
        dateSpan.textContent = note.createdAt;

        headerInfo.appendChild(badge);
        headerInfo.appendChild(dateSpan);

        const textPara = document.createElement('p');
        textPara.className = 'note-text-content';
        textPara.textContent = note.text; // Safe from XSS

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        // Delete specific note event listener
        deleteBtn.addEventListener('click', () => {
            deleteNote(note.id);
        });

        li.appendChild(headerInfo);
        li.appendChild(textPara);
        li.appendChild(deleteBtn);

        notesList.appendChild(li);
    });
}

// Add note event handler with validation
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const textValue = noteInput.value.trim();

    // Validation checks
    if (textValue === '') {
        errorMessage.textContent = 'Please type a note first.';
        return;
    }

    if (textValue.length > 200) {
        errorMessage.textContent = 'Notes must be 200 characters or fewer.';
        return;
    }

    // Clear error message upon success
    errorMessage.textContent = '';

    const newNote = {
        id: Date.now().toString(),
        text: textValue,
        category: noteCategory.value,
        createdAt: getFormattedDate()
    };

    notes.unshift(newNote); // Add to beginning of array
    saveNotes();
    render(searchInput.value);

    // Reset input form
    noteInput.value = '';
    noteCategory.value = 'Personal';
    noteInput.focus();
});

// Delete individual note function
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    render(searchInput.value);
}

// Search input listener
searchInput.addEventListener('input', (e) => {
    render(e.target.value);
});

// Bonus: Clear all notes feature with confirmation dialog
clearAllBtn.addEventListener('click', () => {
    if (confirm('Delete all notes?')) {
        notes = [];
        saveNotes();
        render();
    }
});

// Initial render call on page load
render();
