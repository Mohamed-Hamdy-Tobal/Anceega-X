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

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.user-avatar') && !event.target.closest('.user-avatar')) {
        const dropdownMenu = document.getElementById('dropdownMenu');
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        }
    }
}

// For Global Logout

function logout() {
    const token = localStorage.getItem('token');
    const accountType = localStorage.getItem('accountType');

    if (!token) {
        alert('No token found. Please login again.');
        return;
    }

    let loginEndpoint = '';
    if (accountType === 'user') {
        loginEndpoint = 'https://back.anceega.com/client-api/v1/auth/employees/logout';
    } else if (accountType === 'company') {
        loginEndpoint = 'https://back.anceega.com/client-api/v1/auth/companies/logout';
    }

    fetch(loginEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            // 'Authorization': `Bearer ${token}`
        },
    })
        .then(response => {
            console.log(response)
            if (response) {
                // Clear the token from storage
                localStorage.removeItem('token');
                alert('Logged out successfully.');
                window.location.href = 'sign-in.html'; // Redirect to login page
            } else {
                alert('Failed to log out. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}

// For Header
document.addEventListener('DOMContentLoaded', () => {
    // Fetch user data from localStorage
    const employee = JSON.parse(localStorage.getItem('employee'));
    const company = JSON.parse(localStorage.getItem('company'));

    // Check if employee data exists and update the HTML
    if (employee) {
        document.getElementById('userName').innerText = employee.full_name;
        document.getElementById('userJob').innerText = employee.type || 'Employee';
    } else if (company) {
        document.getElementById('userName').innerText = company.full_name;
        document.getElementById('userJob').innerText = company.type || 'Company';
    }
});