// Fetch profile data from localStorage
const coverProfile = document.getElementById('coverProfile');
const dropdownMenuCover = document.getElementById('dropdownMenuProfileCover');
const inpFileCover = document.getElementById('inpFileCover');
const modalProfileCover = document.getElementById('modalProfileCover');
const overlayProfileCover = document.getElementById('overlayProfileCover');
const modalProfileCoverImage = document.getElementById('modalProfileCoverImage');
const cancelmodalProfileCover = document.getElementById('cancelmodalProfileCover');
const savemodalProfileCover = document.getElementById('savemodalProfileCover');
// const loadingSpinner = document.getElementById('loadingSpinnerProfileCover');

// Profile cover
const profilecoverContainer = document.getElementById('coverProfileContainer');
if (profileData.personal_photo) {
    profilecoverContainer.style.backgroundImage = `url(${profileData.coverletter})`;
    // coverProfile.src = profileData.personal_photo;
} else {
    profilecoverContainer.style.backgroundImage = `url('../../../img/bg-profile.jpg')`;
}

profilecoverContainer.addEventListener('click', (event) => {
    if (event.target === profilecoverContainer) {
        dropdownMenuCover.style.display = dropdownMenuCover.style.display === 'block' ? 'none' : 'block';
    }
});

document.getElementById('showcoverProfileCover').addEventListener('click', () => {

    const imageUrl = false ? profileData.coverletter : "../../../img/bg-profile.jpg"
    modalProfileCoverImage.src = imageUrl;

    savemodalProfileCover.style.display = 'none';
    modalProfileCover.style.display = 'flex';
    overlayProfileCover.style.display = 'block';
    dropdownMenuCover.style.display = 'none';

    modalProfileCover.style.display = 'flex';
    modalProfileCover.style.width = '100%';
    modalProfileCover.style.height = '100%';

    cancelmodalProfileCover.style.width = '42px';
    cancelmodalProfileCover.style.height = '42px';
    cancelmodalProfileCover.style.top = '30px';
    cancelmodalProfileCover.style.right = '30px';
    cancelmodalProfileCover.style.position = 'fixed';
    cancelmodalProfileCover.style.borderRadius = '50%';
    cancelmodalProfileCover.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L18 18" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `;
});

document.getElementById('editcoverProfileCover').addEventListener('click', () => {
    inpFileCover.click();
    dropdownMenuCover.style.display = 'none';
});

inpFileCover.addEventListener('change', () => {
    const file = inpFileCover.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            modalProfileCoverImage.src = event.target.result;
            savemodalProfileCover.style.display = 'inline';
            modalProfileCover.style.display = 'block';
            modalProfileCover.style.width = '50%';
            modalProfileCover.style.height = '50%';
            cancelmodalProfileCover.style.width = '90px';
            cancelmodalProfileCover.style.height = '30px';
            cancelmodalProfileCover.style.top = '0px';
            cancelmodalProfileCover.style.fontWeight = '500';
            cancelmodalProfileCover.style.fontSize = '16px';
            cancelmodalProfileCover.style.right = '0px';
            cancelmodalProfileCover.style.position = 'relative';
            cancelmodalProfileCover.style.borderRadius = '5px';
            cancelmodalProfileCover.innerHTML = 'Cancel';
            overlayProfileCover.style.display = 'block';

        };
        reader.readAsDataURL(file);
    }
});

cancelmodalProfileCover.addEventListener('click', () => {
    modalProfileCover.style.display = 'none';
    overlayProfileCover.style.display = 'none';
});

savemodalProfileCover.addEventListener('click', () => {
    loadingSpinner.style.display = 'block'; // Show loading spinner

    const formData = new FormData();
    formData.append('coverletter', inpFileCover.files[0]);

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
            const uploadedImageUrl = data.coverletterUrl; // Update with the correct key from your response
            profilecoverContainer.style.backgroundImage = `url(${uploadedImageUrl})`;
            modalProfileCover.style.display = 'none';
            overlayProfileCover.style.display = 'none';
            loadingSpinner.style.display = 'none'; // Hide loading spinner
        })
        .catch(console.error);
});

window.addEventListener('click', (event) => {
    if (event.target === overlayProfileCover) {
        modalProfileCover.style.display = 'none';
        overlayProfileCover.style.display = 'none';
    }
});