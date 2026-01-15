function initRotator(rotator) {
    const cases = [...rotator.querySelectorAll('.rotator__case')];
    let currentIndex = 0;
    const speed = 1000;
    
    cases.forEach(caseEl => {
        if (caseEl.dataset.color) {
            caseEl.style.color = caseEl.dataset.color;
        }
    });
    
    function showCase(index) {
        cases.forEach(caseEl => {
            caseEl.classList.remove('rotator__case_active');
        });
        cases[index].classList.add('rotator__case_active');
    }
    
    function next() {
        currentIndex = (currentIndex + 1) % cases.length;
        showCase(currentIndex);
    }
    
    showCase(0);
    setInterval(next, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    const rotators = document.querySelectorAll('.rotator');
    rotators.forEach(initRotator);
});


