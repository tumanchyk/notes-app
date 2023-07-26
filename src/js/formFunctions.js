export const showForm = () => {
    const noteForm = document.getElementById('noteForm');
    const btn = document.querySelector('#create-note')
    btn.style.display = 'none';
    noteForm.style.display = 'block';
}

export function hideForm() {
    const noteForm = document.getElementById('noteForm');
    const btn = document.querySelector('#create-note')
    btn.style.display = 'block';
    noteForm.style.display = 'none';
}

export const clearFormInputs = () => {
    document.getElementById('nameInput').value = '';
    document.getElementById('categoryInput').value = 'Task';
    document.getElementById('contentInput').value = '';
}