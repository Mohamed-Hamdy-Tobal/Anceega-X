document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('company')) || JSON.parse(localStorage.getItem('employee'));
    const currentUserId = user ? user.id : null;

    const sharePostBtn = document.getElementById('sharePostBtn');
    const postContentInput = document.getElementById('postContent');
    const postFileInput = document.getElementById('postFileInput');
    const selectedImagePreview = document.querySelector('.selected-image__preview');
    const selectedVideoPreview = document.querySelector('.selected-video__preview');
    const selectedImageContainer = document.querySelector('.selected-image');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const advertiseSwitcher = document.getElementById('advertiseSwitcher');
    const advertiseOptions = document.getElementById('advertiseOptions');
    const advertisePeriod = document.getElementById('advertisePeriod');
    const advertisePublished = document.getElementById('advertisePublished');
    const item = document.getElementById('mainPostModal');
    const bg = document.getElementById('myHeader');

    advertiseSwitcher.addEventListener('change', function () {
        if (advertiseSwitcher.checked) {
            advertiseOptions.style.display = 'flex';
        } else {
            advertiseOptions.style.display = 'none';
        }
    });

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

        let url = 'https://back.anceega.com/client-api/v1/addPost/normal';

        if (advertiseSwitcher.checked) {
            url = 'https://back.anceega.com/client-api/v1/addPost/advertise';
            // fileData.append('advertise', true);
            fileData.append('period', advertisePeriod.value);
            fileData.append('is_published', advertisePublished.value);
        }

        loadingSpinner.style.display = 'flex';
        loadingSpinner.style.backgroundColor = '#fbfbfb63';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: fileData
            });

            const data = await response.json();
            console.log('Post added successfully:', data);

            fetchPosts()

            // Close Modal 
            item.classList.remove('active');
            bg.classList.remove('visible');
            
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
            console.error('Error adding post:', error.message);
            showToastDynamic("Invalid Data", "#dc3545");
        } finally {
            // Hide the loading spinner and show the profile section
            loadingSpinner.style.display = 'none';
            // location.reload()
        }
    });





    

    async function fetchPosts() {
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        if (date < oneYearAgo) {
            // If the post is more than a year old, format it as MM/DD/YYYY
            return date.toLocaleDateString('en-US');
        } else {
            // Otherwise, format it as "12 April at 09.28 PM"
            const dateOptions = { day: '2-digit', month: 'long' };
            const timeOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            const formattedDate = date.toLocaleDateString('en-US', dateOptions);
            const formattedTime = date.toLocaleTimeString('en-US', timeOptions).replace(':', '.');
            return `${formattedDate} at ${formattedTime}`;
        }
    }

    function displayPosts(posts) {
        const mainPostsContent = document.querySelector('.main-posts-content');
        mainPostsContent.innerHTML = ''; // Clear any existing content

        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.classList.add('post__item');

            let postMedia = '';
            if (post.file_name) {
                const fileNames = post.file_name.split(','); // Assuming file names are comma-separated
                fileNames.forEach(fileName => {
                    if (fileName.endsWith('.mp4')) {
                        postMedia += `
                            <video class="post__media w-full" controls>
                                <source src="${fileName}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>`;
                    } else {
                        postMedia += `<img class="post__media w-full" src="${fileName}" alt="Post media" />`;
                        // postMedia += `<img class="post__media w-full" src="../../../img/videos-pic-1.jpg" alt="Post media" />`;
                    }
                });
            }

            const personalPhoto = post.company.personal_photo;
            const avatar = personalPhoto
                ? `<img class="ava__pic" src="${personalPhoto}" alt="Avatar" />`
                : `
                    <div class="ava__placeholder" style="width: 100%; height: 100%; color: #898989; display: flex; justify-content: center; align-items: center; background: #eeeeeeab; font-size: 19px;">
                        ${post.company.full_name.charAt(0).toUpperCase()}
                    </div>
                `;

            // Check if the current user has liked this post
            const hasLiked = post.likes.some(like => like.member_id == currentUserId);
            const likeIconFill = hasLiked ? 'icon-fill-like' : '';


            const postBody = `
                <div class="post__body">
                    <div class="post__user active">
                        <div class="ava active">${avatar}</div>
                        <div class="post__desc">
                            <div class="post__man">${post.company.full_name}</div>
                            <div class="post__time">${formatDate(post.created_at)}</div>
                        </div>
                    </div>
                    <div class="post__text">${post.content}</div>
                    ${postMedia}
                    <div class="post__control">
                        <span class="post__link cursor-pointer post__link--comment" data-post-id="${post.id}">
                            <svg class="icon icon-comment">
                                <use xlink:href="img/sprite.svg#icon-comment"></use>
                            </svg><span class="post__counter">${post.review.length}</span> Comments
                        </span>
                        <span class="post__link cursor-pointer post__link--like" data-post-id="${post.id}">
                            <svg class="icon icon-like ${likeIconFill}">
                                <use xlink:href="img/sprite.svg#icon-like"></use>
                            </svg><span id="post__counter_likes" class="post__counter">${post.likes_sum.length > 0 ? post.likes_sum[0].total_likes : "0"}</span> Likes
                        </span>
                        <span class="post__link cursor-pointer">
                            <svg class="icon icon-share">
                                <use xlink:href="img/sprite.svg#icon-share"></use>
                            </svg><span class="post__counter">0</span> Share
                        </span>
                    </div>
                    <div class="post__comments flex flex-col gap-3 justify-start items-start mb-3" style="display: none;"></div>
                </div>
                ${generateCommentSection(post.id)}
            `;

            postItem.innerHTML = postBody;
            mainPostsContent.appendChild(postItem);

            addCommentEventListeners(post.id); // Add event listeners for comment input and button
        });
        addLikeEventListeners(); // Add event listeners for like buttons
        addCommentButtonEventListeners();
    }

    function generateCommentSection(postId) {
        if (user && user.personal_photo) {
            return `
                <div class="post__foot" data-post-id="${postId}">
                    <div class="ava"><img class="ava__pic" src="${user.personal_photo}" alt="Avatar" /></div>
                    <div class="post__field main_post__input">
                        <input class="post__input" type="text" placeholder="Write your comment…" />
                        <button class="post__publish-btn bg-[#81B0D9] rounded-full w-8 h-8 flex justify-center items-center transition-all hover:bg-[#81b0d9be]" style="display: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" class="icon-2xl">
                                <path fill="#fff" fill-rule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="post__foot" data-post-id="${postId}">
                    <div class="ava" style="display: none;"><img class="ava__pic" /></div>
                    <div class="post__field main_post__input">
                        <input class="post__input" type="text" placeholder="Write your comment…" />
                        <button class="post__publish-btn bg-[#81B0D9] rounded-full w-8 h-8 flex justify-center items-center transition-all hover:bg-[#81b0d9be]" style="display: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" class="icon-2xl">
                                <path fill="#fff" fill-rule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }
    }

    function addCommentEventListeners(postId) {
        const postFoot = document.querySelector(`.post__foot[data-post-id="${postId}"]`);
        if (!postFoot) return; // Safety check

        const commentInput = postFoot.querySelector('.post__input');
        const publishButton = postFoot.querySelector('.post__publish-btn');

        if (!commentInput || !publishButton) return; // Safety check

        commentInput.addEventListener('input', function () {
            if (this.value.trim()) {
                publishButton.style.display = 'block';
            } else {
                publishButton.style.display = 'none';
            }
        });

        publishButton.addEventListener('click', function () {
            const commentText = commentInput.value.trim();
            console.log('commentText', commentText)
            console.log('postId', postId)
            if (commentText) {
                publishComment(postId, commentText);
            }
        });
    }

    async function publishComment(postId, commentText) {
        const token = localStorage.getItem('token');
        const payload = {
            comments: commentText
        };

        loadingSpinner.style.display = 'flex';
        loadingSpinner.style.backgroundColor = '#fbfbfb63';

        try {
            const response = await fetch(`https://back.anceega.com/client-api/v1/reviews/addComment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log('Comment published:', data);
            console.log('message', data.message)

            const myHeader = document.getElementById("myHeader")
            const mainPostModal = document.getElementById("mainPostModal")

            myHeader.classList.remove("visible")
            mainPostModal.classList.remove("active")

            if (data.message) {
                fetchPosts()
            }
            showToast(data.message);

            // Clear the input field after publishing
            const postFoot = document.querySelector(`.post__foot[data-post-id="${postId}"]`);
            if (!postFoot) return; // Safety check

            const commentInput = postFoot.querySelector('.post__input');
            const publishButton = postFoot.querySelector('.post__publish-btn');
            if (commentInput) {
                commentInput.value = ''; // Clear the input field
                publishButton.style.display = 'none'
            }

            // Optionally, you can refresh the comments section or add the new comment to the DOM
        } catch (error) {
            console.error('Error publishing comment:', error);
        } finally {
            // Hide the loading spinner and show the profile section
            loadingSpinner.style.display = 'none';
        }
    }


    function addLikeEventListeners() {
        const likeButtons = document.querySelectorAll('.post__link--like');

        likeButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const postId = this.getAttribute('data-post-id');
                handleLike(postId);
            });
        });

    }

    async function handleLike(postId) {
        const token = localStorage.getItem('token');

        console.log("Like")

        try {
            const response = await fetch(`https://back.anceega.com/client-api/v1/reviews/addLike/${postId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: {}
            });

            const data = await response.json();
            console.log('Like response:', data);
            if (data) {
                fetchPosts()
            }

            // // Optionally, update the like count in the DOM

        } catch (error) {
            console.error('Error liking post:', error);
        }
    }


    function addCommentButtonEventListeners() {

        const commentButtons = document.querySelectorAll('.post__link--comment');
        commentButtons.forEach(commentLink => {
            commentLink.addEventListener('click', function (event) {
                event.preventDefault();
                const postId = this.getAttribute('data-post-id');
                const commentsContainer = this.closest('.post__body').querySelector('.post__comments');
    
                if (commentsContainer.style.display === 'none' || commentsContainer.style.display === '') {
                    fetchComments(postId, commentsContainer);
                } else {
                    commentsContainer.style.display = 'none';
                    commentsContainer.innerHTML = ''; // Clear comments when hiding
                }
            });
        });

        
    }

    async function fetchComments(postId, commentsContainer) {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://back.anceega.com/client-api/v1/getComments/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log('Comments fetched:', data);
            displayComments(data.review, commentsContainer);// Here Data
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    function displayComments(comments, commentsContainer) {
        commentsContainer.style.display = 'flex';
        commentsContainer.innerHTML = ''; // Clear any existing comments

        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment__item');
            commentItem.innerHTML = `
                <div class="comment__user">
                    <div class="ava"><img class="ava__pic" src="/img/ava-1.png" alt="Avatar" /></div>
                    <div class="comment__desc">
                        <div class="comment__man">Mohamed Tobal</div>
                        <div class="comment__time">${formatDate(comment.created_at)}</div>
                    </div>
                </div>
                <div class="comment__text">${comment.comments}</div>
            `;
            commentsContainer.appendChild(commentItem);
        });
    }

});
