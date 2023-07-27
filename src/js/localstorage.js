export function getDataFromStorage(item) {
    return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : []
 }