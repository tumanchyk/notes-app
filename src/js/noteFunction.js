import { updateNoteList, updateArchiveList } from "../index.js";
import { getDataFromStorage } from './localstorage.js'
import { formatDate } from './formateDate.js'
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
            id: id
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
export const archiveNote = (noteId) => {
  const notes = getDataFromStorage('notes');
  const archiveNotes = getDataFromStorage('archive-notes');
  const noteIndex = notes.findIndex(note => note.id === noteId);
  const currentNote = notes[noteIndex];
  console.log(currentNote);
  if (!archiveNotes.length) {
    archiveNotes.push({ category: currentNote.category, notes: [currentNote] })
    localStorage.setItem('archive-notes', JSON.stringify(archiveNotes));
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateNoteList()
  
    return
  }

  const categoryIndex = archiveNotes.findIndex(item => item.category === currentNote.category);
  
  if (categoryIndex !== -1) {
    archiveNotes[categoryIndex].notes.push(currentNote);
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateNoteList();
  } else {
    archiveNotes.push({ category: currentNote.category, notes: [currentNote] });
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateNoteList()
  }
  localStorage.setItem('archive-notes', JSON.stringify(archiveNotes));
  updateArchiveList()
}
export const editNote = (noteId) => {
  const editForm = document.querySelector('[data-edit-form]')
  if (editForm.style.display === 'block') {
    editForm.style.display = 'none'
    updateNoteList()

  }
  editForm.style.display = 'block'
  // const notes = getDataFromStorage();
  // const noteIndex = notes.findIndex(note => note.id === noteId);
  // if (noteIndex !== -1) {
  //   notes.splice(noteIndex, 1);
  //   localStorage.setItem('notes', JSON.stringify(notes));
  //   updateNoteList();
  // }
  console.log(noteId);
}