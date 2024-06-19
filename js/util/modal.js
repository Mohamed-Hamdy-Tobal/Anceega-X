// Dummy data
const mockData = [
    { name: "Company A", url: "profile_company.html?name=company-a" },
    { name: "Company B", url: "profile_company.html?name=company-b" },
    { name: "Company C", url: "profile_company.html?name=company-c" }
];

// Function to open the modal
function openSearchModal() {
    $('#searchModal').modal('show');
}

// Event listener for search input in the modal
$('#modalSearchInput').on('input', function () {
    let query = $(this).val();
    if (query.length > 0) {
        let suggestions = mockData.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
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