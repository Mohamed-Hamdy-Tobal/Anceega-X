document.addEventListener('DOMContentLoaded', function () {
    const sharePostBtn = document.getElementById('sharePostBtn');
    const postContentInput = document.getElementById('postContent');
    const postFileInput = document.getElementById('postFileInput');
    const selectedImagePreview = document.querySelector('.selected-image__preview');
    const selectedVideoPreview = document.querySelector('.selected-video__preview');
    const selectedImageContainer = document.querySelector('.selected-image');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const item = document.getElementById('mainPostModal')
    const bg = document.getElementById('my-header')

    postFileInput.addEventListener('change', function () {
        const file = postFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fileType = file.type;
                if (fileType.startsWith('image/')) {
                    selectedImagePreview.src = e.target.result;
                    selectedImagePreview.style.display = 'block';
                    selectedVideoPreview.style.display = 'none';
                } else if (fileType.startsWith('video/')) {
                    selectedVideoPreview.src = e.target.result;
                    selectedVideoPreview.style.display = 'block';
                    selectedImagePreview.style.display = 'none';
                }
                selectedImageContainer.style.display = 'block';
                removeFileBtn.style.display = 'flex'; // Show remove button
            };
            reader.readAsDataURL(file);
        }
    });

    removeFileBtn.addEventListener('click', function () {
        postFileInput.value = null; // Reset file input
        selectedImagePreview.src = ''; // Clear image preview
        selectedVideoPreview.src = ''; // Clear video preview
        selectedImagePreview.style.display = 'none';
        selectedVideoPreview.style.display = 'none';
        selectedImageContainer.style.display = 'none'; // Hide image container
        removeFileBtn.style.display = 'none'; // Hide remove button
    });


    sharePostBtn.addEventListener('click', async function () {
        const token = localStorage.getItem('token');
        const content = postContentInput.value.trim();
        let fileData = new FormData();

        if (postFileInput.files.length > 0) {
            const file = postFileInput.files[0];
            fileData.append('file_name', file);
        }

        fileData.append('content', content);
        loadingSpinner.style.display = 'flex';
        loadingSpinner.style.backgroundColor = '#fbfbfb63';

        try {
            const response = await fetch('https://back.anceega.com/client-api/v1/addPost/normal', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: fileData
            });

            const data = await response.json();
            console.log('Post added :', fileData);
            console.log('Post added successfully:', data);

            // Close Modal 
            item.removeClass('active');
            bg.removeClass('visible');
            
            showToast(data.message);

            // Optionally, you can handle UI updates or redirection after successful post submission

            // Clear input fields and reset UI
            postContentInput.value = '';
            postFileInput.value = null;
            selectedImagePreview.src = '';
            selectedVideoPreview.src = '';
            selectedImagePreview.style.display = 'none';
            selectedVideoPreview.style.display = 'none';
            selectedImageContainer.style.display = 'none';
            removeFileBtn.style.display = 'none';
        } catch (error) {
            console.error('Error adding post:', error);
        } finally {
            // Hide the loading spinner and show the profile section
            loadingSpinner.style.display = 'none';
            location.reload()
        }
    });
});
