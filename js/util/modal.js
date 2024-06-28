let companyData = [];

// Fetch company data from the API
async function fetchCompanyData() {
    const token = localStorage.getItem('token');
    try {
        // const response = await fetch('https://back.anceega.com/client-api/v1/companies/show');
        const response = await fetch('https://back.anceega.com/client-api/v1/companies/show', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                // 'Authorization': `Bearer ${token}`
            },
            redirect: 'follow'
        });
        const data = await response.json();
        console.log(data)
        companyData = data.data.map(item => ({
            ...item,
            name: item.full_name,
            url: `profile_company.html?name=${encodeURIComponent(item.full_name)}`
        }));
        console.log('companyData', companyData)
    } catch (error) {
        console.error('Error fetching company data:', error);
    }
}

fetchCompanyData();

// Function to open the modal
function openSearchModal() {
    $('#searchModal').modal('show');
}

// Event listener for search input in the modal
$('#modalSearchInput').on('input', function () {
    let query = $(this).val();
    if (query.length > 0) {
        let suggestions = companyData.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        $('#suggestionsList').empty();
        suggestions.forEach(item => {
            $('#suggestionsList').append('<li class="list-group-item" onclick="openProfile(\'' + item.url + '\')">' + item.name + '</li>');
        });
    } else {
        $('#suggestionsList').empty();
    }
});

// Function to open profile in a new tab
function openProfile(url) {
    window.open(url, '_blank');
}

// Function for final search
function finalSearch() {
    let query = $('#modalSearchInput').val();
    window.location.href = 'search_company.html?q=' + query;
}