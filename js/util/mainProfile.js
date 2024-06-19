document.addEventListener('DOMContentLoaded', function () {
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Fetch profile data from localStorage
    const profileData = JSON.parse(localStorage.getItem('employee') || '{}') || JSON.parse(localStorage.getItem('company') || '{}');

    const editProfileButton = document.getElementById('editProfileButton');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeModal = document.getElementById('close-modal-profile');

    // Show the loading spinner
    loadingSpinner.style.display = 'block';

    // Simulate data fetching with a timeout (use actual data fetching in real use case)
    // Profile background
    const profileBg = document.getElementById('profileBg');
    if (profileData.coverletter) {
        profileBg.style.backgroundImage = `url(${profileData.coverletter})`;
    } else {
        profileBg.style.backgroundImage = 'url(img/bg-profile.jpg)'; // Default background
    }


    // Open the modal
    editProfileButton.addEventListener('click', function (event) {
        event.preventDefault();
        editProfileModal.classList.remove('hidden');

        document.getElementById('personal_infoInput').value = profileData.personal_info || '';
        document.getElementById('websiteInput').value = profileData.website || '';
        document.getElementById('experienceInput').value = profileData.experience || '';
        document.getElementById('coverLetterInput').value = profileData.coverletter || '';
        document.getElementById('jobInput').value = profileData.job || '';
        document.getElementById('phoneInput').value = profileData.phone || '';
        document.getElementById('addressInput').value = profileData.address || '';
        document.getElementById('bioInput').value = profileData.bio || '';
        document.getElementById('countryInput').value = profileData.country || '';

    });


    // Profile avatar
    const profileAvatarContainer = document.getElementById('profileAvatarContainer');
    if (profileData.personal_photo) {
        const img = document.createElement('img');
        img.className = 'profile__pic';
        img.src = profileData.personal_photo;
        img.alt = '';
        profileAvatarContainer.appendChild(img);
    } else if (profileData.full_name) {
        const initial = profileData.full_name.charAt(0).toUpperCase();
        const avatar = document.createElement('div');
        avatar.className = 'profile__pic';
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
    }

    // Profile name
    const profileName = document.getElementById('profileName');
    profileName.innerText = profileData.full_name || 'Unknown';

    // Profile login
    const profileLogin = document.getElementById('profileLogin');
    profileLogin.innerText = profileData.email || '@example.com';

    // Profile text
    const profileText = document.getElementById('profileText');
    profileText.innerText = profileData.bio || '“Pushing pixels and experiences in digital products for Sebostudio”';

    // Profile stats
    document.getElementById('profilePosts').innerText = profileData.posts || '10,3K';
    document.getElementById('profileFollowers').innerText = profileData.followers || '2,564';
    document.getElementById('profileFollowing').innerText = profileData.following || '3,154';
    document.getElementById('profileLikes').innerText = profileData.likes || '12,2k';
    document.getElementById('profilePhotos').innerText = profileData.photos || '35';
    document.getElementById('profileVideos').innerText = profileData.videos || '24';
    document.getElementById('profileSaved').innerText = profileData.saved || '18';

    // Hide the loading spinner and show the profile section
    loadingSpinner.style.display = 'none';

    // Close the modal
    closeModal.addEventListener('click', function () {
        editProfileModal.classList.add('hidden');
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target == editProfileModal) {
            editProfileModal.classList.add('hidden');
        }
    });
});