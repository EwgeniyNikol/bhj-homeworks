document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown__value');
        const list = dropdown.querySelector('.dropdown__list');
        btn.addEventListener('click', () => {
            list.classList.toggle('dropdown__list_active');
        });
        
        dropdown.querySelectorAll('.dropdown__link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                btn.textContent = link.textContent;
                list.classList.remove('dropdown__list_active');
            });
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown__list').forEach(list => {
                list.classList.remove('dropdown__list_active');
            });
        }
    });
});