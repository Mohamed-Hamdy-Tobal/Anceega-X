document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.getElementById('togglePassword');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm() {
        let isValid = true;

        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email.';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.textContent = '';
            emailError.style.display = 'none';
        }

        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.textContent = '';
            passwordError.style.display = 'none';
        }

        loginButton.disabled = !isValid;
        if (isValid) {
            loginButton.classList.remove('disabled');
        } else {
            loginButton.classList.add('disabled');
        }
    }

    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
        if (!loginButton.disabled) {
            const email = emailInput.value;
            const password = passwordInput.value;
            // alert(`Form submitted successfully!\nEmail: ${email}\nPassword: ${password}`);
        }
    });

    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('icon-eye-open');
    });
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const accountType = document.getElementById('accountType').value;
    const loginError = document.getElementById('loginError');
    const toast = document.getElementById('toast');

    console.log("Email", email)
    console.log("Password", password)


    let loginEndpoint = '';
    if (accountType === 'user') {
        loginEndpoint = 'https://back.anceega.com/client-api/v1/auth/employees/login';
    } else if (accountType === 'company') {
        loginEndpoint = 'https://back.anceega.com/client-api/v1/auth/companies/login';
    }

    console.log("Email", email)
    console.log("Password", password)
    console.log("loginEndpoint", loginEndpoint)

    // Send login request to server
    fetch(loginEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log('login :', data);

                if (data.token) {

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('accountType', accountType);

                    // Ensure the employee data is stored as a JSON string
                    if (accountType === 'user') {
                        localStorage.setItem('employee', JSON.stringify(data.employee));
                    } else if (accountType === 'company') {
                        localStorage.setItem('company', JSON.stringify(data.company));
                    }

                    showToast('Login successful');
                    // Clear form fields if needed
                    clearForm('loginForm');

                    // Redirect to the appropriate dashboard
                    window.location.href = 'index.html';
                }

            } else {
                console.error('Login failed:', data);
            }
        })
        .catch(error => {
            console.error('Error during fetch:');
            loginError.textContent = 'Login failed. Please check your email and password and try again.';
            loginError.style.display = 'block';
        });

    function showToast(message) {
        toast.textContent = message;
        toast.style.display = 'block';

        setTimeout(function () {
            toast.style.display = 'none';
        }, 3000);
    }

    function clearForm(formId) {
        document.getElementById(formId).reset();
    }
});