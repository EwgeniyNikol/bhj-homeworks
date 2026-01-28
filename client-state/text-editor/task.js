const editor = document.getElementById('editor');

window.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('editorText');
    if (savedText) {
        editor.value = savedText;
    }
});

editor.addEventListener('input', () => {
    localStorage.setItem('editorText', editor.value);
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

window.addEventListener('DOMContentLoaded', addClearButton);
