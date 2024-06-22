// Extract query parameters
const urlParams = new URLSearchParams(window.location.search);
const companyName = urlParams.get('name');

// Display the company name
document.getElementById('profileName').innerText = `This is the profile page for ${companyName.replace('-', ' ')}`;