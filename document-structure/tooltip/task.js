document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    let activeTooltip = null;
    
    const hideTooltip = () => {
        tooltip.classList.remove('tooltip_active');
        activeTooltip = null;
    };
    
    const showTooltip = (element, title) => {
        hideTooltip();
        
        tooltip.textContent = title;
        tooltip.classList.add('tooltip_active');
        activeTooltip = element;
        
        const rect = element.getBoundingClientRect();
        const position = element.dataset.position || 'top';
        
        let top, left;
        
        if (position === 'top') {
            top = rect.top - tooltip.offsetHeight - 5;
            left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
        } else if (position === 'bottom') {
            top = rect.bottom + 5;
            left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
        } else if (position === 'left') {
            top = rect.top + rect.height / 2 - tooltip.offsetHeight / 2;
            left = rect.left - tooltip.offsetWidth - 5;
        } else if (position === 'right') {
            top = rect.top + rect.height / 2 - tooltip.offsetHeight / 2;
            left = rect.right + 5;
        }
        
        tooltip.style.left = Math.round(left) + 'px';
        tooltip.style.top = Math.round(top) + 'px';
        
        const tooltipRect = tooltip.getBoundingClientRect();
        
        if (tooltipRect.right > window.innerWidth) {
            const currentLeft = parseFloat(tooltip.style.left) || 0;
            tooltip.style.left = Math.max(5, currentLeft - (tooltipRect.right - window.innerWidth) - 5) + 'px';
        }
        
        if (tooltipRect.left < 0) tooltip.style.left = '5px';
        if (tooltipRect.bottom > window.innerHeight) {
            const currentTop = parseFloat(tooltip.style.top) || 0;
            tooltip.style.top = Math.max(5, currentTop - (tooltipRect.bottom - window.innerHeight) - 5) + 'px';
        }
        if (tooltipRect.top < 0) tooltip.style.top = '5px';
    };
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('has-tooltip')) {
            e.preventDefault();
            activeTooltip === e.target ? hideTooltip() : showTooltip(e.target, e.target.title);
        } else {
            hideTooltip();
        }
    });
    
    window.addEventListener('scroll', hideTooltip);
    window.addEventListener('resize', hideTooltip);
});