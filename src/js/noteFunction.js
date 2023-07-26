import { updateNoteList } from "../index.js";
import {getDataFromStorage} from './localstorage.js'
export const deleteNote = (noteId) => {
  const notes = getDataFromStorage();
  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateNoteList();
  }
}