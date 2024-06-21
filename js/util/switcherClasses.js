window.onload = function () {
    const accountType = localStorage.getItem('accountType');
    console.log(accountType);

    // Select all elements for employees and companies
    const employeeContents = document.querySelectorAll('.employee-content');
    const companyContents = document.querySelectorAll('.company-content');

    // Function to toggle visibility
    function toggleVisibility(elements, addClass, removeClass) {
        elements.forEach(element => {
            element.classList.add(addClass);
            element.classList.remove(removeClass);
        });
    }

    if (accountType === 'user') {
        toggleVisibility(employeeContents, 'main-visible', 'main-hidden');
        toggleVisibility(companyContents, 'main-hidden', 'main-visible');
    } else if (accountType === 'company') {
        toggleVisibility(companyContents, 'main-visible', 'main-hidden');
        toggleVisibility(employeeContents, 'main-hidden', 'main-visible');
    }
}
