import { updateNoteList, updateArchiveList } from "../index.js";
import { getDataFromStorage } from './localstorage.js'
import { formatDate, options } from './formateDate.js'
import { hideForm, clearFormInputs } from "./formFunctions.js";
let noteIdCounter = parseInt(localStorage.getItem('noteIdCounter')) || 1;

    
export function addNote(e) {
  e.preventDefault();
  const nameInput = document.getElementById('nameInput').value.trim();
  const categoryInput = document.getElementById('categoryInput').value;
  const contentInput = document.getElementById('contentInput').value.trim();
  if (nameInput !== '' && categoryInput !== '' && contentInput !== '') {
    const creatingDate = new Date();
    const id = `note-${noteIdCounter}`;
    const notes = getDataFromStorage('notes')
    noteIdCounter++;

    const newNote = {
      name: nameInput,
      creatingDate: formatDate(creatingDate),
      category: categoryInput,
      content: contentInput,
      id: id,
      dates: [creatingDate.toLocaleDateString('en', options)]

    };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('noteIdCounter', noteIdCounter);

    updateNoteList();
    updateArchiveList()
    hideForm();
    clearFormInputs();
  }
}

export const deleteNote = (noteId) => {
  const notes = getDataFromStorage('notes');
  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateNoteList();
    updateArchiveList()

  }
}


export function updatedNote(noteId) {
  const notes = getDataFromStorage('notes');
   const name = document.querySelector(`[data-input-name=${noteId}]`).value;
  const category = document.querySelector(`[data-input-category=${noteId}]`).value;
  const content = document.querySelector(`[data-input-content=${noteId}]`).value;
  const noteToUpdate = notes.find((note) => note.id === noteId);
  noteToUpdate.name = name;
  noteToUpdate.category = category;
  noteToUpdate.content = content;
  noteToUpdate.dates.push(new Date().toLocaleDateString('en', options))
  localStorage.setItem('notes', JSON.stringify(notes));
  updateNoteList()
  const editForm = document.querySelector(`[data-edit-form=${noteId}]`);
  editForm.style.display = 'none';
  const btn = document.querySelector('#create-note')
  btn.style.display = 'block';
}

export const editNote = (noteId) => {
  const btn = document.querySelector('#create-note')
  btn.style.display = 'none';
  const editForm = document.querySelector(`[data-edit-form=${noteId}]`)
  if (editForm.style.display === 'block') {
    editForm.style.display = 'none'
    updateNoteList()

  }
  editForm.style.display = 'block';
  document.querySelector(`[data-save-note=${noteId}]`).addEventListener('click', (e) => {
    e.preventDefault()
    updatedNote(noteId)
  })
}
