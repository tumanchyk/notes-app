import createNote from "./js/markupNote.js";
import { showForm, hideForm } from './js/formFunctions.js';
import { deleteNote, addNote, archiveNote, editNote } from "./js/noteFunction.js";
import { getDataFromStorage } from "./js/localstorage.js";
import { createArchiveNote } from "./js/markupArchiveNote.js";
updateNoteList()
updateArchiveList()
// let notes = [{
//     name: 'food',
//     creatingDate: '23.09.09',
//     category: 'list ',
//     content: 'buy food',
//     dates: '23/09/23',
//     id: 6
// }];

export function updateArchiveList() {
  const archiveList = document.getElementById('archived-list');
  const archiveContainer = document.getElementById('archive-container');
  const archiveNotes = getDataFromStorage('archive-notes');
  if (!archiveNotes.length) {
    return
  }
  archiveContainer.style.display = 'block';
  archiveList.innerHTML = archiveNotes.map(item => createArchiveNote(item)).join('');

}

export function updateNoteList() {
    const noteList = document.getElementById('noteList');
    const notes = getDataFromStorage('notes');
    noteList.innerHTML = notes.map(item => createNote(item)).join('');
    if (notes.length) {
    document.querySelectorAll('[data-delete]').forEach(button => {
    button.addEventListener('click', function() {
    const noteId = this.closest('li').id.slice(1, -1);
    deleteNote(noteId);
  });
});
    document.querySelectorAll('[data-archive]').forEach(button => {
    button.addEventListener('click', function() {
    const noteId = this.closest('li').id.slice(1, -1);
    archiveNote(noteId);
  });
});
    document.querySelectorAll('[data-edit]').forEach(button => {
    button.addEventListener('click', function() {
    const noteId = this.closest('li').id.slice(1, -1);
    editNote(noteId);
  });
});
    }
}



document.getElementById('create-note').addEventListener('click', showForm);
document.getElementById('close-form').addEventListener('click', hideForm);
document.getElementById('add-note').addEventListener('click', (e) => addNote(e));