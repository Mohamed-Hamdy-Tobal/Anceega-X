document.addEventListener('DOMContentLoaded', function () {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loadingWrapper = document.getElementById('loading__wrapper');

    // Initially show the loading spinner and hide the content wrapper
    loadingSpinner.style.display = 'block';
    loadingWrapper.style.display = 'none';

    // Simulate data fetching with a timeout (replace with actual data fetching)
    setTimeout(function () {
        // Fetch profile data from localStorage
        const profileData = JSON.parse(localStorage.getItem('employee') || '{}') || JSON.parse(localStorage.getItem('company') || '{}');

        // Profile background
        const profileBg = document.getElementById('profileBg');
        if (profileData.coverletter) {
            profileBg.style.backgroundImage = `url(${profileData.coverletter})`;
        } else {
            profileBg.style.backgroundImage = 'url(img/bg-profile.jpg)'; // Default background
        }

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

        // Populate profile details
        const profileName = document.getElementById('profileName');
        profileName.innerText = profileData.full_name || 'Unknown';

        const profileLogin = document.getElementById('profileLogin');
        profileLogin.innerText = profileData.email || '@example.com';

        const profileText = document.getElementById('profileText');
        profileText.innerText = profileData.bio || '“Pushing pixels and experiences in digital products for Sebostudio”';

        // Populate profile stats
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

        // Populate joined date and other details
        document.getElementById('note').innerText = profileData.bio;
        document.getElementById('location').innerText = profileData.country;
        document.getElementById('website').innerText = profileData.website;
        document.getElementById('mainWebsiteLink').href = profileData.website;
        document.getElementById('joinedDate').innerText = `Joined ${formatDate(profileData.created_at)}`;
        document.getElementById('company').innerText = profileData.experience;

        // Hide the loading spinner and show the content wrapper
        loadingSpinner.style.display = 'none';
        loadingWrapper.style.display = 'block';
        contentWrapper.style.display = 'block';
    }, 3000); // Simulated loading time (adjust as needed)
});
