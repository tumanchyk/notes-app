import { updateArchiveList, updateNoteList } from "../index.js";
import { getDataFromStorage } from "./localstorage.js";

export const archiveNote = (noteId) => {
  const notes = getDataFromStorage('notes');
  const archiveNotes = getDataFromStorage('archive-notes');
  const noteIndex = notes.findIndex(note => note.id === noteId);
  const currentNote = notes[noteIndex];
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

export const unarchiveNote = (noteId, category) => {
  const notes = getDataFromStorage('notes');
  const archivedNotes = getDataFromStorage('archive-notes');
  const categoryIndex = archivedNotes.findIndex((categoryObj) => categoryObj.category === category);
  if (categoryIndex !== -1) {
    const categoryNotes = archivedNotes[categoryIndex].notes;
    const noteIndex = categoryNotes.findIndex((note) => note.id === noteId);

    if (noteIndex !== -1) {
      const unarchiveNote = categoryNotes.splice(noteIndex, 1)[0];
      notes.push(unarchiveNote);
      categoryNotes.splice(noteIndex, 1); 
      let categoryObject = archivedNotes.map((item) => item.category === category ? {category: item.category, notes: categoryNotes} : item); // item = {category: 'Idea', notes: Array(1)}
      localStorage.setItem('archive-notes', JSON.stringify(categoryObject));
      localStorage.setItem('notes', JSON.stringify(notes));
    }
    updateNoteList();
    updateArchiveList()

  }
}

export const rollOutCategory = (id) => {
  const list = document.querySelector(`[data-archive-note-list=${id}]`);
  const toggleIcon = document.querySelector(`[data-toggle-icon=${id}]`);
  if (list.style.display === 'block') {
    list.style.display = 'none';
    toggleIcon.innerHTML = `<use href="../src/icons/sprite.svg#icon-arrow-down"></use>`;

    updateArchiveList()
  }
  list.style.display = 'block';
  toggleIcon.innerHTML = `<use href="../src/icons/sprite.svg#icon-up-arrow"></use>`;

}