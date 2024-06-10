document.addEventListener('DOMContentLoaded', function () {
    const showMoreBtn = document.querySelector('.show-more-btn');
    const showMoreBtnSpan = document.querySelector('.show-more-btn span');
    const sidebarBox = document.querySelector('.sidebar2__box');

    showMoreBtn.addEventListener('click', function () {
        if (sidebarBox.style.display === 'block') {
            sidebarBox.style.display = 'none';
            showMoreBtnSpan.textContent = 'Show More';
            showMoreBtn.classList.remove('show-less');
        } else {
            sidebarBox.style.display = 'block';
            showMoreBtnSpan.textContent = 'Show Less';
            showMoreBtn.classList.add('show-less');
        }
    });
});