function isElementVisible(el) {
    let rect = el.getBoundingClientRect();
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < windowHeight - 250 && rect.bottom > 0;
}

function handleScrollReveal() {
    let revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => 
        element.classList.toggle('reveal_active', isElementVisible(element))
    );
}

function initScrollReveal() {
    handleScrollReveal();
    window.addEventListener('scroll', handleScrollReveal);
}

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        initScrollReveal();
    }
