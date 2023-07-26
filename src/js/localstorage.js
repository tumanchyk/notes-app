export function getDataFromStorage() {
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []
 }