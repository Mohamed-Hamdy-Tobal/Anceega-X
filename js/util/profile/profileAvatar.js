// Fetch profile data from localStorage
const avatarProfile = document.getElementById('avatarProfile');
const dropdownMenu = document.getElementById('dropdownMenuProfile');
const inpFile = document.getElementById('inpFile');
const modalProfile = document.getElementById('modalProfile');
const overlayProfile = document.getElementById('overlayProfile');
const modalProfileImage = document.getElementById('modalProfileImage');
const cancelModalProfile = document.getElementById('cancelModalProfile');
const saveModalProfile = document.getElementById('saveModalProfile');
const loadingSpinner = document.getElementById('loadingSpinnerProfile');
let cropper;

// Profile avatar
const profileAvatarContainer = document.getElementById('avatarProfileContainer');
if (profileData.personal_photo) {
    avatarProfile.src = profileData.personal_photo;
} else if (profileData.full_name) {
    avatarProfile.style.display = 'none'
    const initial = profileData.full_name.charAt(0).toUpperCase();
    const avatar = document.createElement('div');
    avatar.className = 'profile__pic';
    avatar.id = 'avatarText'
    avatar.innerText = initial;
    avatar.style.display = 'flex';
    avatar.style.alignItems = 'center';
    avatar.style.justifyContent = 'center';
    avatar.style.backgroundColor = '#ccc'; // Change this to desired background color
    avatar.style.color = '#fff'; // Change this to desired text color
    avatar.style.fontSize = '50px'; // Change this to desired font size
    avatar.style.borderRadius = '50%';
    avatar.style.width = '100%'; // Adjust size as needed
    avatar.style.height = '100%'; // Adjust size as needed
    profileAvatarContainer.appendChild(avatar);

    // Add event listener to the avatar div
    avatar.addEventListener('click', (event) => {
        if (event.target === avatar) {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        }
    });
}

avatarProfile.addEventListener('click', (event) => {
    if (event.target === avatarProfile) {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    }
});


document.getElementById('showAvatarProfile').addEventListener('click', () => {
    document.getElementById('MainHeader').style.zIndex = '2'
    // document.getElementById('post-profile-inside').style.zIndex = '1'
    // document.getElementById('post-profile-inside').style.position = 'relative'
    modalProfileImage.src = avatarProfile.src;
    saveModalProfile.style.display = 'none';
    modalProfile.style.display = 'flex';
    overlayProfile.style.display = 'block';
    dropdownMenu.style.display = 'none';

    modalProfile.style.display = 'flex';
    modalProfile.style.width = '100%';
    modalProfile.style.height = '100%';

    cancelModalProfile.style.width = '42px';
    cancelModalProfile.style.height = '42px';
    cancelModalProfile.style.top = '30px';
    cancelModalProfile.style.right = '30px';
    cancelModalProfile.style.position = 'fixed';
    cancelModalProfile.style.borderRadius = '50%';
    cancelModalProfile.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L18 18" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;
});

document.getElementById('editAvatarProfile').addEventListener('click', () => {
    inpFile.click();
    dropdownMenu.style.display = 'none';
});

inpFile.addEventListener('change', () => {
    const file = inpFile.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            modalProfileImage.src = event.target.result;
            saveModalProfile.style.display = 'inline';
            modalProfile.style.display = 'block';
            modalProfile.style.width = '50%';
            modalProfile.style.height = '50%';
            cancelModalProfile.style.width = '90px';
            cancelModalProfile.style.height = '30px';
            cancelModalProfile.style.top = '0px';
            cancelModalProfile.style.fontWeight = '500';
            cancelModalProfile.style.fontSize = '16px';
            cancelModalProfile.style.right = '0px';
            cancelModalProfile.style.position = 'relative';
            cancelModalProfile.style.borderRadius = '5px';
            cancelModalProfile.innerHTML = 'Cancel';
            overlayProfile.style.display = 'block';
            cropper = new Cropper(modalProfileImage, {
                aspectRatio: 1,
                viewMode: 1
            });
        };
        reader.readAsDataURL(file);
    }
});

cancelModalProfile.addEventListener('click', () => {
    if (cropper) cropper.destroy();
    modalProfile.style.display = 'none';
    overlayProfile.style.display = 'none';
});


saveModalProfile.addEventListener('click', () => {
    loadingSpinner.style.display = 'block'; // Show loading spinner

    const canvas = cropper.getCroppedCanvas();
    canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('personal_photo', blob);

        fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                avatarProfile.src = canvas.toDataURL();
                cropper.destroy();
                modalProfile.style.display = 'none';
                overlayProfile.style.display = 'none';
                loadingSpinner.style.display = 'none'; // Hide loading spinner
            })
            .catch(console.error);
    });
});

window.addEventListener('click', (event) => {
    if (event.target === overlayProfile) {
        if (cropper) cropper.destroy();
        modalProfile.style.display = 'none';
        overlayProfile.style.display = 'none';
    }
});