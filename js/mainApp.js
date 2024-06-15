document.addEventListener('DOMContentLoaded', function () {
    const showMoreBtn = document.querySelector('.show-more-btn');
    const showMoreBtnSpan = document.querySelector('.show-more-btn span');
    const sidebarBox = document.querySelector('.sidebar2__box');

    showMoreBtn.addEventListener('click', function () {
        if (sidebarBox.classList.contains('show')) {
            sidebarBox.classList.remove('show');
            sidebarBox.classList.add('hidden');
            showMoreBtnSpan.textContent = 'Show More';
            showMoreBtn.classList.remove('show-less');
        } else {
            sidebarBox.classList.remove('hidden');
            sidebarBox.classList.add('show');
            showMoreBtnSpan.textContent = 'Show Less';
            showMoreBtn.classList.add('show-less');
        }
    });
});