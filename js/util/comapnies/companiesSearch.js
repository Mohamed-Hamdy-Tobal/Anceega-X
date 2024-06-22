const resultsList = document.getElementById('resultsList');

// Extract query parameters
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');
let companyDataSearch = [];
// Fetch company data from the API

async function fetchCompanyDataSearch() {
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

        // Display the search query
        document.getElementById('searchQuery').innerText = `Showing results for: ${query}`;

        // Filter and display results
        const results = companyDataSearch.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        console.log(results)
        results.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<a href="${item.url}">${item.name}</a>`;
            resultsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching company data:', error);
    }
}

fetchCompanyDataSearch()
