import createNote from "./js/markupNote.js";
import { formatDate } from "./js/formateDate.js";
import { showForm, hideForm, clearFormInputs } from './js/formFunctions.js';
import { deleteNote } from "./js/noteFunction.js";
import { getDataFromStorage } from "./js/localstorage.js";
updateNoteList()

// let notes = [{
//     name: 'food',
//     creatingDate: '23.09.09',
//     category: 'list ',
//     content: 'buy food',
//     dates: '23/09/23', 
//     id: 6
// }];
let noteIdCounter = parseInt(localStorage.getItem('noteIdCounter')) || 1;

function addNote(e) {
    e.preventDefault();
    const nameInput = document.getElementById('nameInput').value.trim();
    const categoryInput = document.getElementById('categoryInput').value;
    const contentInput = document.getElementById('contentInput').value.trim();

    if (nameInput !== '' && categoryInput !== '' && contentInput !== '') {
        const creatingDate = new Date();
        const id = `note-${noteIdCounter}`;
        const notes = getDataFromStorage()
        noteIdCounter++;

        const newNote = {
            name: nameInput,
            creatingDate: formatDate(creatingDate),
            category: categoryInput,
            content: contentInput,
            id: id
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        localStorage.setItem('noteIdCounter', noteIdCounter); 

        updateNoteList();
        hideForm();
        clearFormInputs();
    }
}


export function updateNoteList() {
    const noteList = document.getElementById('noteList');
    const notes = getDataFromStorage();
    noteList.innerHTML = notes.map(item => createNote(item)).join('');
    if (notes.length) {
      document.querySelectorAll('[data-delete]').forEach(button => {
    button.addEventListener('click', function() {
    const noteId = this.closest('li').id.slice(1, -1);
    deleteNote(noteId);
  });
});

    }
}



document.getElementById('create-note').addEventListener('click', showForm);
document.getElementById('close-form').addEventListener('click', hideForm);
document.getElementById('add-note').addEventListener('click', (e) => addNote(e));