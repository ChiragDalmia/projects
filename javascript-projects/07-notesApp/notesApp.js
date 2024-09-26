const createButton = document.querySelector('.js-create-notes-button');
const notesContainer = document.querySelector('.js-notes-container');

// Function to update local storage with current state of notes
function updateLocalStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}


// Function to create a new note element
function createNoteElement() {
  let inputBox = document.createElement('p');
  let img = document.createElement('img');
  inputBox.className = 'input-box';
  img.className = 'delete-button';
  inputBox.setAttribute('contenteditable', 'true');
  img.src = 'images/delete.png';
  inputBox.appendChild(img); // Append the image to the inputBox
  notesContainer.appendChild(inputBox); 
  inputBox.onkeyup = () => {
    updateLocalStorage();
  };
}


// Event listener for the 'Create Note' button
createButton.addEventListener('click', () => {
  createNoteElement();
});

// Use event delegation for interaction with notes
notesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    e.target.parentElement.remove();
    updateLocalStorage(); 
  } else if (e.target.classList.contains('input-box')) {
    e.target.focus(); 
  }
});

// Load notes from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notesContainer.innerHTML = savedNotes;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.execCommand('insertLineBreak');
    e.preventDefault();
  }
});