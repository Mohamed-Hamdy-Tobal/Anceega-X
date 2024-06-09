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

    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('icon-eye-open');
    });

    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
        if (!loginButton.disabled) {
            const email = emailInput.value;
            const password = passwordInput.value;
            alert(`Form submitted successfully!\nEmail: ${email}\nPassword: ${password}`);
        }
    });
});
