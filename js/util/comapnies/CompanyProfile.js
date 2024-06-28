document.addEventListener('DOMContentLoaded', function () {

    // Extract query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    // Fetch company data from the API
    (async () => {
        // Show the loading spinner
        loadingSpinner.style.display = 'flex';
        document.getElementById('loading__wrapper').style.display = 'none';

        // Function to format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        }

        // Profiles Data
        const profileAvatarContainer = document.getElementById('avatarProfileContainerCompany');
        const companyAvatar = document.getElementById('profileCompanyAvatar')
        const profile__bg_company = document.getElementById('profile__bg_company')
        const companyName = document.getElementById('profileNameCompany')
        const companyEmail = document.getElementById('profileCompanyEmail')
        const companyBio = document.getElementById('profileCompanyBio')
        const companyCountry = document.getElementById('profileCompanyCountry')
        const companyWebsite = document.getElementById('profileCompanyWebsite')
        const companyJoined = document.getElementById('profileCompanyJoined')
        const companyWorking = document.getElementById('profileCompanyWorking')
        // const companyRating = document.getElementById('profileCompanyRating')
        // const companyCover = document.getElementById('profileCompanyCover')
        // const companyPersonalPhoto = document.getElementById('profileCompanyPersonalPhoto')

        try {
            const response = await fetch('https://back.anceega.com/client-api/v1/companies/show', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 58|m0wIYgzqVnyXgG47nragLCrVLslvfgdKljYqhOFk337d7bb2'
                },
                redirect: 'follow'
            });

            const data = await response.json();
            const companyDataSearch = data.data.map(item => ({
                ...item,
                name: item.full_name,
                url: `profile_company.html?id=${encodeURIComponent(item.id)}`
            }));


            // Filter results based on the extracted id
            const result = companyDataSearch.find(item => item.id == companyId);

            if (result) {
                console.log('Filtered result:', result);
                console.log('Filtered result.website ? result.website : "undefined":', result.website ? result.website : "undefined");

                // Display the company Info
                companyAvatar.src = result.name || 'N/A';
                companyName.innerText = result.name || 'N/A';
                companyEmail.innerText = result.email || 'No email provided';;
                companyBio.innerText = result.name || 'No bio available'; // bio
                companyCountry.innerText = result.country || 'Country not specified';
                companyJoined.innerText = `Joined ${formatDate(result.created_at)}`;
                companyWorking.innerText = result.field || 'Field not specified';
                document.getElementById('mainWebsiteLinkCompany').href = result.website || '#';
                companyWebsite.innerText = result.website || '#';


                // For Avatar
                if (result.personal_photo) {
                    companyAvatar.src = result.personal_photo;
                } else if (result.full_name) {
                    companyAvatar.style.display = 'none'
                    const initial = result.full_name.charAt(0).toUpperCase();
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
                }

                // For Cover
                if (result.coverletter) {
                    profile__bg_company.style.backgroundImage = `url(${result.coverletter})`;
                } else {
                    profile__bg_company.style.backgroundImage = `url('../../../img/bg-profile.jpg')`;
                }

                // Add code here to display additional company details if needed
            } else {
                console.log('No company found with the given id');
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
            document.getElementById('profileNameCompany').innerText = 'Error fetching company data';
        } finally {
            // Hide the loading spinner and show the profile section
            loadingSpinner.style.display = 'none';
            document.getElementById('loading__wrapper').style.display = 'block';
        }
    })();
});

