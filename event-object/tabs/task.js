document.addEventListener('DOMContentLoaded', function() {
    const tabNavigations = document.querySelectorAll('.tab__navigation');
    
    tabNavigations.forEach(navigation => {
        const tabs = navigation.querySelectorAll('.tab');
        
        const contentsContainer = navigation.nextElementSibling;
        if (!contentsContainer || !contentsContainer.classList.contains('tab__contents')) {
            return;
        }
        
        const tabContents = contentsContainer.querySelectorAll('.tab__content');
        
        const tabsArray = Array.from(tabs);
        
        tabsArray.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabIndex = tabsArray.indexOf(this);
                tabsArray.forEach(t => t.classList.remove('tab_active'));
                Array.from(tabContents).forEach(c => c.classList.remove('tab__content_active'));
                
                this.classList.add('tab_active');
                if (tabContents[tabIndex]) {
                    tabContents[tabIndex].classList.add('tab__content_active');
                }
            });
        });
    });
});