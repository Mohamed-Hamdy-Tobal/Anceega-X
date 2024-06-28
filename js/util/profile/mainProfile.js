document.addEventListener('DOMContentLoaded', function () {
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Fetch profile data from localStorage
    const profileData = JSON.parse(localStorage.getItem('employee')) || JSON.parse(localStorage.getItem('company'));

    const editProfileButton = document.getElementById('editProfileButton');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeModal = document.getElementById('close-modal-profile');

    const showVideoButton = document.getElementById('showVideoButton');
    const profileVideoSource = document.getElementById('profileVideoSource');
    const modalProfileVideo = document.getElementById('modalProfileVideo');
    const closeVideoModal = document.getElementById('closeVideoModal');

    // Show the loading spinner
    loadingSpinner.style.display = 'block';
    document.getElementById('loading__wrapper').style.display = 'none';

    // // Simulate data fetching with a timeout (use actual data fetching in real use case)
    // // Profile background
    // const profileBg = document.getElementById('profileBg');
    // if (profileData.coverletter) {
    //     profileBg.style.backgroundImage = `url(${profileData.coverletter})`;
    // } else {
    //     profileBg.style.backgroundImage = 'url(img/bg-profile.jpg)'; // Default background
    // }


    // Open the modal
    editProfileButton.addEventListener('click', function (event) {
        event.preventDefault();
        editProfileModal.classList.remove('hidden');

        // document.getElementById('personal_infoInput').value = profileData.personal_info || '';
        document.getElementById('websiteInput').value = profileData.website || '';
        document.getElementById('experienceInput').value = profileData.experience || '';
        document.getElementById('jobInput').value = profileData.job || '';
        document.getElementById('phoneInput').value = profileData.phone || '';
        document.getElementById('bioInput').value = profileData.bio || '';
        // document.getElementById('addressInput').value = profileData.address || '';
        document.getElementById('countryInput').value = profileData.country || '';

    });


    // Profile name
    const profileName = document.getElementById('profileName');
    profileName.innerText = profileData.full_name || 'Unknown';

    // Profile login
    const profileLogin = document.getElementById('profileLogin');
    profileLogin.innerText = profileData.email || '@example.com';

    // Profile text
    const profileText = document.getElementById('profileText');
    profileText.innerText = profileData.bio || '“Pushing pixels and experiences in digital products for Sebostudio”';

    // Show video if available
    // if (profileData.video_url) {
    if (profileData) {
        profileVideoSource.src = 'img/video.mp4';
        // profileVideoSource.src = profileData.video_url;
        showVideoButton.style.display = 'block';
    } else {
        showVideoButton.style.display = 'none';
    }

    // Profile stats
    document.getElementById('profilePosts').innerText = profileData.posts || '10,3K';
    document.getElementById('profileFollowers').innerText = profileData.followers || '2,564';
    document.getElementById('profileFollowing').innerText = profileData.following || '3,154';
    document.getElementById('profileLikes').innerText = profileData.likes || '12,2k';
    document.getElementById('profilePhotos').innerText = profileData.photos || '35';
    document.getElementById('profileVideos').innerText = profileData.videos || '24';
    document.getElementById('profileSaved').innerText = profileData.saved || '18';

    // Function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    // Populate HTML elements with the retrieved data
    document.getElementById('note').innerText = profileData.bio || "Unknown";
    document.getElementById('location').innerText = profileData.country || "Unknown";
    document.getElementById('website').innerText = profileData.website || "Unknown";
    document.getElementById('mainWebsiteLink').href = profileData.website || "Unknown";
    document.getElementById('joinedDate').innerText = `Joined ${formatDate(profileData.created_at)}`;
    document.getElementById('company').innerText = profileData.experience || "Unknown";


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

    // Hide the loading spinner and show the profile section
    loadingSpinner.style.display = 'none';
    document.getElementById('loading__wrapper').style.display = 'block';


    // Show video modal on button click
    showVideoButton.addEventListener('click', () => {
        modalProfileVideo.style.display = 'flex';
    });

    // Close video modal on close button click
    closeVideoModal.addEventListener('click', () => {
        modalProfileVideo.style.display = 'none';
    });

    // Close video modal on outside click
    window.addEventListener('click', (event) => {
        if (event.target === modalProfileVideo) {
            modalProfileVideo.style.display = 'none';
        }
    });

});