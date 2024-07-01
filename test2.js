// fetchPosts.js
export async function fetchPosts() {
    const token = localStorage.getItem('token');
    // Show the loading spinner
    loadingSpinner.style.display = 'flex';
    document.getElementById('loading__wrapper').style.display = 'none';

    try {
        const response = await fetch('https://back.anceega.com/client-api/v1/getPosts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            redirect: 'follow'
        });
        const data = await response.json();
        mainPosts = data.data;
        console.log('posts : ', mainPosts);
        displayPosts(mainPosts);
    } catch (error) {
        console.error('Error fetching company data:', error);
    } finally {
        // Hide the loading spinner and show the profile section
        loadingSpinner.style.display = 'none';
        document.getElementById('loading__wrapper').style.display = 'block';
    }
}
