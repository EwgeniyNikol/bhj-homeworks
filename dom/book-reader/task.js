document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    
    function handleClick(event, type, prefix) {
        event.preventDefault();
        const target = event.target.closest('a');
        if (!target) return;
        
        if (type === 'font-size') {
            document.querySelector('.font-size_active').classList.remove('font-size_active');
            target.classList.add('font-size_active');
            
            book.classList.remove('book_fs-small', 'book_fs-big');
            if (target.dataset.size === 'small') book.classList.add('book_fs-small');
            if (target.dataset.size === 'big') book.classList.add('book_fs-big');
        } 
        else if (type === 'color') {
            const color = target.dataset.textColor || target.dataset.bgColor;
            const otherType = target.dataset.textColor ? 'bg' : 'color';
            const otherColor = book.classList.toString().match(`book_${otherType}-(\\w+)`);
            
            if (otherColor && (color === otherColor[1] || 
                (color === 'whitesmoke' && otherColor[1] === 'white') ||
                (color === 'white' && otherColor[1] === 'whitesmoke'))) {
                return;
            }
            
            event.currentTarget.querySelector('.color_active').classList.remove('color_active');
            target.classList.add('color_active');
            
            book.className = book.className.replace(new RegExp(`${prefix}-\\w+`, 'g'), '');
            book.classList.add(`${prefix}-${color}`);
        }
    }
    
    document.querySelector('.book__control_font-size').addEventListener('click', (e) => handleClick(e, 'font-size'));
    document.querySelector('.book__control_color').addEventListener('click', (e) => handleClick(e, 'color', 'book_color'));
    document.querySelector('.book__control_background').addEventListener('click', (e) => handleClick(e, 'color', 'book_bg'));
});