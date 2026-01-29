const editor = document.getElementById('editor');

window.addEventListener('DOMContentLoaded', () => {
    editor.value = localStorage.getItem('editorText');
    
    editor.addEventListener('input', () => {
        localStorage.setItem('editorText', editor.value);
    });
    
    addClearButton();
});

const addClearButton = () => {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Очистить';
      
    clearButton.addEventListener('click', () => {
        editor.value = '';
        localStorage.removeItem('editorText');
    });
    
    editor.parentNode.appendChild(clearButton);
};