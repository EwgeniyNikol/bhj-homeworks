const modal = document.getElementById('subscribe-modal');
const closeButton = document.querySelector('.modal__close_times');

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(name + '='));
    return cookie ? cookie.substring(name.length + 1) : null;
}

if (getCookie('modalClosed') !== 'true') {
    modal.classList.add('modal_active');
}

closeButton.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    document.cookie = 'modalClosed=true; path=/';
});