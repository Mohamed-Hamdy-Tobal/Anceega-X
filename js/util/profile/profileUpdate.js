const form = document.getElementById('updateForm');
const toast = document.getElementById('toast');
const updateButton = document.getElementById('updateButton');

const accountType = localStorage.getItem('accountType');
const token = localStorage.getItem('token');

let loginEndpoint = '';
if (accountType === 'user') {
    loginEndpoint = 'https://back.anceega.com/client-api/v1/auth/employees/update';
} else if (accountType === 'company') {
    loginEndpoint = 'https://back.anceega.com/client-api/v1/auth/companies/update';
}

console.log("loginEndpoint", loginEndpoint)

const profileData = JSON.parse(localStorage.getItem('employee')) || JSON.parse(localStorage.getItem('company'));
let initialFormData = { ...profileData };  // Ensure this is a copy

function getFormData() {
    return {
        // personal_info: document.getElementById('personal_infoInput').value,
        website: document.getElementById('websiteInput').value,
        experience: document.getElementById('experienceInput').value,
        job: document.getElementById('jobInput').value,
        phone: document.getElementById('phoneInput').value,
        // bio: document.getElementById('bioInput').value,
        country: document.getElementById('countryInput').value,
    };
}

function checkFormChanged() {
    const currentFormData = getFormData();
    const formChanged = Object.keys(currentFormData).some(key => currentFormData[key] !== initialFormData[key]);
    updateButton.disabled = !formChanged;
}


form.addEventListener('input', checkFormChanged);

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect form data
    const formData = {
        // personal_info: document.getElementById('personal_infoInput').value,
        website: document.getElementById('websiteInput').value,
        experience: document.getElementById('experienceInput').value,
        job: document.getElementById('jobInput').value,
        phone: document.getElementById('phoneInput').value,
        // bio: document.getElementById('bioInput').value,
        country: document.getElementById('countryInput').value,
    };


    console.log(formData)

    fetch(loginEndpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },

        body: formData,
        redirect: "follow"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)

            // Ensure the employee data is stored as a JSON string
            if (accountType === 'user') {
                localStorage.setItem('employee', JSON.stringify(data.employee));
            } else if (accountType === 'company') {
                localStorage.setItem('company', JSON.stringify(data.company));
            }

            // Close the modal
            editProfileModal.classList.add('hidden');

            showToast('Updated successfully', 'success');
            // Clear form fields if needed
            clearForm('updateForm');
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Failed to update profile', 'error');

            // Close the modal
            editProfileModal.classList.add('hidden');
        });
});

function showToast(message, status) {
    toast.textContent = message;
    toast.style.display = 'block';
    if (status === 'success') {
        toast.classList.add('bg-green-500');
        toast.classList.remove('bg-red-500');
    } else if (status === 'error') {
        toast.classList.add('bg-red-500');
        toast.classList.remove('bg-green-500');
    }

    setTimeout(function () {
        toast.style.display = 'none';
    }, 3000);
}

function clearForm(formId) {
    document.getElementById(formId).reset();
    initialFormData = getFormData();
    updateButton.disabled = true;
}

// Initialize initial form data when modal opens
document.getElementById('editProfileModal').addEventListener('show', function () {
    initialFormData = getFormData();
    updateButton.disabled = true;
});

// Initialize form fields with profile data
function initializeFormData(profileData) {
    // document.getElementById('personal_infoInput').value = profileData.personal_info || '';
    document.getElementById('websiteInput').value = profileData.website || '';
    document.getElementById('experienceInput').value = profileData.experience || '';
    document.getElementById('jobInput').value = profileData.job || '';
    document.getElementById('phoneInput').value = profileData.phone;
    // document.getElementById('bioInput').value = profileData.bio || '';
    document.getElementById('countryInput').value = profileData.country;
}

// When the modal opens, initialize the form fields
document.getElementById('editProfileModal').addEventListener('show', function () {
    initializeFormData(profileData);
    initialFormData = getFormData();
    updateButton.disabled = true;
});