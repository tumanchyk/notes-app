import createNote from "./js/markupNote.js";
import { showForm, hideForm } from './js/formFunctions.js';
import { deleteNote, addNote, editNote } from "./js/noteFunction.js";
import { rollOutCategory, archiveNote, unarchiveNote } from "./js/archiveFunctions.js";
import { getDataFromStorage } from "./js/localstorage.js";
import { createArchiveNote } from "./js/markupArchiveNote.js";
import { defaultNotes } from "./js/defaultNotes.js";
updateNoteList()
updateArchiveList()

export function updateArchiveList() {
  const archiveList = document.getElementById('archived-list');
  const archiveContainer = document.getElementById('archive-container');
  const archiveNotes = getDataFromStorage('archive-notes');
  if (!archiveNotes.length) {
    return
  }
  archiveContainer.style.display = 'block';
  archiveList.innerHTML = archiveNotes.map(item => item.notes.length >=1 ? createArchiveNote(item) : null).join('');

  document.querySelectorAll('[data-wrap-notes]').forEach(button => {
    button.addEventListener('click', function () {
      const noteId = this.closest('li').id;
      rollOutCategory(noteId);
    })
  });
  document.querySelectorAll('[data-archive-remove]').forEach(button => {
    button.addEventListener('click', function (e) {
      const category = this.getAttribute('data-archive-remove');
    const noteId = this.closest('li').id;
    unarchiveNote(noteId, category);
  })
});
}

export function updateNoteList() {
    const noteList = document.getElementById('noteList');
    const notes = getDataFromStorage('notes');
  if (notes.length) {
    noteList.innerHTML = notes.map(item => createNote(item)).join('');
    document.querySelectorAll('[data-delete]').forEach(button => {
    button.addEventListener('click', function() {
    const noteId = this.closest('li').id;
    deleteNote(noteId);
  });
});
    document.querySelectorAll('[data-archive]').forEach(button => {
    button.addEventListener('click', function() {
    const noteId = this.closest('li').id;
    archiveNote(noteId);
  });
});
    document.querySelectorAll('[data-edit]').forEach(button => {
    button.addEventListener('click', function() {
    const noteId = this.closest('li').id;
    editNote(noteId);
  });
});
  } else {
      noteList.innerHTML = defaultNotes.map(item => createNote(item)).join('');
      localStorage.setItem('notes', JSON.stringify(defaultNotes));

  }
  
}



document.getElementById('create-note').addEventListener('click', showForm);
document.getElementById('close-form').addEventListener('click', hideForm);
document.getElementById('add-note').addEventListener('click', (e) => addNote(e));