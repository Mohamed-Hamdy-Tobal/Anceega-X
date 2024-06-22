const mainCompanies = document.getElementById('mainCompanies');
const loadingSpinner = document.getElementById('loadingSpinner');

// Extract query parameters
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');
let companyDataSearch = [];
// Fetch company data from the API

async function fetchCompanyDataSearch() {
    // Show the loading spinner
    loadingSpinner.style.display = 'flex';
    document.getElementById('loading__wrapper').style.display = 'none';

    try {
        // const response = await fetch('https://back.anceega.com/client-api/v1/companies/show');
        const response = await fetch('https://back.anceega.com/client-api/v1/companies/show', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 58|m0wIYgzqVnyXgG47nragLCrVLslvfgdKljYqhOFk337d7bb2`
                // 'Authorization': `Bearer ${token}`
            },
            redirect: 'follow'
        });
        const data = await response.json();
        console.log(data.data)
        companyDataSearch = data.data.map(item => ({
            ...item,
            name: item.full_name,
            url: `profile_company.html?name=${encodeURIComponent(item.full_name)}`
        }));


        console.log('companyDataSearch', companyDataSearch)

        // Filter and display results
        const results = companyDataSearch.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        console.log(results)
        results.forEach(item => {
            const div = document.createElement('div');
            div.className = 'student__item';
            
            // Create the stars div
            let starsHtml = '<div class="stars">';
            for (let i = 0; i < 5; i++) {
                if (i < item.is_Active) {
                    starsHtml += `
                        <span class="star star-yellow">
                            <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.73822 28.7189L16.75 25.0582L23.7619 28.7189C24.7712 29.2458 25.9469 28.3879 25.7532 27.266L24.4162 19.5252L30.0814 14.0414C30.9023 13.2468 30.4522 11.8557 29.3214 11.6926L21.4844 10.5617L17.9814 3.51305C17.4757 2.49565 16.0244 2.49565 15.5187 3.51305L12.0157 10.5617L4.17867 11.6926C3.04788 11.8557 2.59782 13.2468 3.41871 14.0414L9.08388 19.5252L7.74693 27.266C7.55315 28.3879 8.72893 29.2458 9.73822 28.7189Z" fill="#FFC542"/>
                            </svg>
                        </span>
                    `;
                } else {
                    starsHtml += `
                        <span class="star star-gray">
                            <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.73822 28.7189L16.75 25.0582L23.7619 28.7189C24.7712 29.2458 25.9469 28.3879 25.7532 27.266L24.4162 19.5252L30.0814 14.0414C30.9023 13.2468 30.4522 11.8557 29.3214 11.6926L21.4844 10.5617L17.9814 3.51305C17.4757 2.49565 16.0244 2.49565 15.5187 3.51305L12.0157 10.5617L4.17867 11.6926C3.04788 11.8557 2.59782 13.2468 3.41871 14.0414L9.08388 19.5252L7.74693 27.266C7.55315 28.3879 8.72893 29.2458 9.73822 28.7189Z" fill="#d1d1d1"/>
                            </svg>
                        </span>
                    `;
                }
            }
            starsHtml += '</div>';
        
            div.innerHTML = `
                <div class="student__ava">
                    <img class="student__pic" src="img/ava-big-1.jpg" alt="">
                </div>
                <div class="student__title title title_sm">${item.full_name}</div>
                <div class="student__details">
                    <span class="student__text">${item.country}</span>
                    <span class="student__text">${item.field}</span>
                </div>
                ${starsHtml}
                <div class="info__details">
                    <p class='text-gray-400 font-medium text-[14px] m-0 text-center'>${item.full_name}</p>
                </div>
                <a class="text-white" href="${item.url}">
                    <button class="student__butn butn butn_blue">
                        View Profile
                    </button>
                </a>
            `;
            
            mainCompanies.appendChild(div);
        });
        
    } catch (error) {
        console.error('Error fetching company data:', error);
    } finally {
        // Hide the loading spinner and show the profile section
        loadingSpinner.style.display = 'none';
        document.getElementById('loading__wrapper').style.display = 'block';
    }
}

fetchCompanyDataSearch()
