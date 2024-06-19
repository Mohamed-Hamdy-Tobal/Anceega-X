document.addEventListener('DOMContentLoaded', function() {
    const profilePicContainer = document.getElementById('profilePicContainer');

    // Define the keys to check in localStorage
    const keys = ['employee', 'company'];
    let imageUrl = null;
    let fullName = '';

    // Check localStorage for the image and full name
    for (let key of keys) {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData && parsedData.personal_photo) {
                imageUrl = parsedData.personal_photo;
            }
            if (parsedData && parsedData.full_name) {
                fullName = parsedData.full_name;
                break;
            }
        }
    }

    if (imageUrl) {
        // If image URL exists, set it as the background image
        profilePicContainer.style.backgroundImage = `url(${imageUrl})`;
        profilePicContainer.style.backgroundSize = 'cover';
        profilePicContainer.style.backgroundPosition = 'center';
    } else if (fullName) {
        // If no image URL, create an avatar with the first letter of the full name
        const initial = fullName.charAt(0).toUpperCase();
        profilePicContainer.innerHTML = initial;
        profilePicContainer.style.display = 'flex';
        profilePicContainer.style.alignItems = 'center';
        profilePicContainer.style.justifyContent = 'center';
        profilePicContainer.style.backgroundColor = '#ccc'; // Change this to desired background color
        profilePicContainer.style.color = '#fff'; // Change this to desired text color
        profilePicContainer.style.fontSize = '24px'; // Change this to desired font size
        profilePicContainer.style.borderRadius = '50%';
        profilePicContainer.style.width = '40px'; // Change this to desired width
        profilePicContainer.style.height = '40px'; // Change this to desired height
    } else {
        // Fallback if no data is found in localStorage
        profilePicContainer.innerHTML = '?';
        profilePicContainer.style.display = 'flex';
        profilePicContainer.style.alignItems = 'center';
        profilePicContainer.style.justifyContent = 'center';
        profilePicContainer.style.backgroundColor = '#ccc'; // Change this to desired background color
        profilePicContainer.style.color = '#fff'; // Change this to desired text color
        profilePicContainer.style.fontSize = '24px'; // Change this to desired font size
        profilePicContainer.style.borderRadius = '50%';
        profilePicContainer.style.width = '40px'; // Change this to desired width
        profilePicContainer.style.height = '40px'; // Change this to desired height
    }
});
