import { getDataFromStorage } from "./localstorage.js";

export const count = (category) => {
    let taskCount = 0;
    const notes = getDataFromStorage('notes');

    notes.forEach(item => {
    if (item.category === category) {
        taskCount++;
    }
    });
    
    return taskCount
}