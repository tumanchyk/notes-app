import createNote from "./js/markupNote.js";
import { formatDate } from "./js/formateDate.js";
let notes = [];
let noteIdCounter = 1;

function addNote(e) {
    e.preventDefault();
    const nameInput = document.getElementById('nameInput').value.trim();
    const categoryInput = document.getElementById('categoryInput').value;
    const contentInput = document.getElementById('contentInput').value.trim();

    if (nameInput !== '' && categoryInput !== '' && contentInput !== '') {
        const creatingDate = new Date();
        const id = `note-${noteIdCounter}`;
        noteIdCounter++;

        const newNote = createNote({
            name: nameInput,
            creatingDate: formatDate(creatingDate),
            category: categoryInput,
            content: contentInput,
            id: id
        });

        notes.push(newNote);
        updateNoteList();
        hideForm();
        clearFormInputs();
    }
}

function updateNoteList() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = notes.join('');
}


function showForm() {
    const noteForm = document.getElementById('noteForm');
    const btn = document.querySelector('#create-note')
    btn.style.display = 'none';
    noteForm.style.display = 'block';
}

function hideForm() {
    const noteForm = document.getElementById('noteForm');
    const btn = document.querySelector('#create-note')
    btn.style.display = 'block';
    noteForm.style.display = 'none';
}

function clearFormInputs() {
    document.getElementById('nameInput').value = '';
    document.getElementById('categoryInput').value = '';
    document.getElementById('contentInput').value = '';
}

document.querySelector('#create-note').addEventListener('click', showForm);
document.querySelector('#add-note').addEventListener('click', (e) => addNote(e));