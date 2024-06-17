document.addEventListener('DOMContentLoaded', function () {
    const passwordInputUp = document.getElementById('passwordUp');
    const passwordInputConfirm = document.getElementById('passwordConfirm');
    const togglePasswordUp = document.getElementById('togglePasswordUp');
    const togglePasswordConfirm = document.getElementById('togglePasswordConfirm');
    const dateInput = document.getElementById('dob');


    togglePasswordUp.addEventListener('click', function () {
        console.log("Eye")
        const type = passwordInputUp.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInputUp.setAttribute('type', type);
        this.classList.toggle('icon-eye-open');
    });
    togglePasswordConfirm.addEventListener('click', function () {
        const type = passwordInputConfirm.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInputConfirm.setAttribute('type', type);
        this.classList.toggle('icon-eye-open');
    });

    // --- For DOB ---

    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);

    // Add an event listener for form submission
    const form = document.getElementById('dobForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const dob = dateInput.value;
        if (dob) {
            alert(`Date of Birth submitted: ${dob}`);
        } else {
            alert('Please select a date of birth.');
        }
    });

});


document.addEventListener('DOMContentLoaded', (event) => {
    const nameInput = document.getElementById('name-full');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const countryInput = document.getElementById('countryInput');
    const dobInput = document.getElementById('dob');
    const passwordInput = document.getElementById('passwordUp');
    const passwordConfirmInput = document.getElementById('passwordConfirm');
    const registerButton = document.getElementById('registerButton');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const countryError = document.getElementById('countryError');
    const dobError = document.getElementById('dobError');
    const passwordError = document.getElementById('passwordError');
    const passwordConfirmError = document.getElementById('passwordConfirmError');

    const signupError = document.getElementById('signupError')
    const accountType = localStorage.getItem('accountType');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === "") {
            nameError.textContent = 'Full Name is required.';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.textContent = '';
            nameError.style.display = 'none';
        }

        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email.';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.textContent = '';
            emailError.style.display = 'none';
        }

        if (phoneInput.value.trim() === "") {
            phoneError.textContent = 'Phone Number is required.';
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.textContent = '';
            phoneError.style.display = 'none';
        }

        if (countryInput.value.trim() === "") {
            countryError.textContent = 'Country is required.';
            countryError.style.display = 'block';
            isValid = false;
        } else {
            countryError.textContent = '';
            countryError.style.display = 'none';
        }

        if (dobInput.value.trim() === "") {
            dobError.textContent = 'Date of Birth is required.';
            dobError.style.display = 'block';
            isValid = false;
        } else {
            dobError.textContent = '';
            dobError.style.display = 'none';
        }

        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.textContent = '';
            passwordError.style.display = 'none';
        }

        if (passwordInput.value !== passwordConfirmInput.value) {
            passwordConfirmError.textContent = 'Passwords do not match.';
            passwordConfirmError.style.display = 'block';
            isValid = false;
        } else {
            passwordConfirmError.textContent = '';
            passwordConfirmError.style.display = 'none';
        }

        registerButton.disabled = !isValid;
        if (isValid) {
            registerButton.classList.remove('disabled');
        } else {
            registerButton.classList.add('disabled');
        }
    }

    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
        if (!registerButton.disabled) {
            const formData = {
                full_name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                password_confirmation: passwordConfirmInput.value,
                country: countryInput.value,
                phone: phoneInput.value,
                birth_date: dobInput.value,
            };


            console.log('Form submitted successfully!', formData);
            // Here you can add further processing, e.g., send the form data to a server

            let loginEndpoint = '';
            if (accountType === 'user') {
                loginEndpoint = 'https://back.anceega.com/client-api/v1/auth/employees/register';
            } else if (accountType === 'company') {
                loginEndpoint = 'https://back.anceega.com/client-api/v1/auth/companies/register';
            }

            console.log("loginEndpoint", loginEndpoint)

            fetch(loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Signup:', data);
                    if (data) {
                        console.log('Signup:', data);
                        
                        if (accountType === 'user') {
                            if (data.employee) {
                                localStorage.setItem('employee', JSON.stringify(data.employee));
                                window.location.href = 'index.html';
                            } else {
                                console.log(data.message)
                            }
                        } else if (accountType === 'company') {
                            if (data.employee) {
                                localStorage.setItem('company', JSON.stringify(data.company));
                                window.location.href = 'index.html';
                            } else {
                                console.log(data.message)
                            }
                        }
                        
                        // if (data.message == "تم تسجيل الحساب بنجاح" || data.message == "تم تسجيل حسابك بنجاح") {
                        //     console.log('message', data.message);

                        //     // Ensure the employee data is stored as a JSON string
                        //     if (accountType === 'user') {
                        //         localStorage.setItem('employee', JSON.stringify(data.employee));
                        //     } else if (accountType === 'company') {
                        //         localStorage.setItem('company', JSON.stringify(data.company));
                        //     }

                        //     // Redirect to the appropriate dashboard
                        //     window.location.href = 'index.html';
                        // }

                    } else {
                        console.error('Login failed:', data);
                    }
                })
                .catch(error => {
                    console.error('Error during fetch');
                    signupError.textContent = "Invalid Data, Try again!";
                    signupError.style.display = 'block';
                });
        }
    });

    [nameInput, emailInput, phoneInput, countryInput, dobInput, passwordInput, passwordConfirmInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });
});