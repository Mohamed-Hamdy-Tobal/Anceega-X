document.addEventListener('DOMContentLoaded', function () {
    let mainPosts = [];
    const loadingSpinner = document.getElementById('loadingSpinner');
    const user = JSON.parse(localStorage.getItem('company')) || JSON.parse(localStorage.getItem('employee'));
    const profileAvatarContainer = document.getElementById('postProfilePicContainer');
    const avatarProfile = document.getElementById('postProfilePic');

    // Profile avatar
    if (user.personal_photo) {
        avatarProfile.src = user.personal_photo;
    } else if (user.full_name) {
        avatarProfile.style.display = 'none'
        const initial = user.full_name.charAt(0).toUpperCase();
        const avatar = document.createElement('div');
        avatar.className = 'profile__pic';
        avatar.id = 'avatarText'
        avatar.innerText = initial;
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        avatar.style.backgroundColor = '#ccc'; // Change this to desired background color
        avatar.style.color = '#fff'; // Change this to desired text color
        avatar.style.fontSize = '22px'; // Change this to desired font size
        avatar.style.borderRadius = '50%';
        avatar.style.width = '100%'; // Adjust size as needed
        avatar.style.height = '100%'; // Adjust size as needed
        profileAvatarContainer.appendChild(avatar);
    }

    const currentUserId = user ? user.id : null;

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
                    <div class="post__comments" style="display: none;"></div>
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
                    <div class="ava">
                        <div class="ava__placeholder" style="width: 100%; height: 100%; color: #898989; display: flex; justify-content: center; align-items: center; background: #eeeeeeab;">
                            ${user.full_name.charAt(0).toUpperCase()}
                        </div>
                    </div>
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

    function addLikeEventListeners() {
        const likeButtons = document.querySelectorAll('.post__link--like');
        likeButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const postId = this.getAttribute('data-post-id');
                const token = localStorage.getItem('token');
                const post = mainPosts.find(post => post.id == postId);
                const likeIcon = this.querySelector('.icon-like');
                const likeCounter = this.querySelector('#post__counter_likes');

                if (likeIcon.classList.contains('icon-fill-like')) {
                    // Already liked, perform unlike operation
                    try {
                        const response = await fetch(`https://back.anceega.com/client-api/v1/unlikePost/${postId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const data = await response.json();
                        if (data.success) {
                            // Update UI
                            likeIcon.classList.remove('icon-fill-like');
                            post.likes_sum[0].total_likes -= 1;
                            likeCounter.textContent = post.likes_sum[0].total_likes;
                        }
                    } catch (error) {
                        console.error('Error unliking the post:', error);
                    }
                } else {
                    // Not liked yet, perform like operation
                    try {
                        const response = await fetch(`https://back.anceega.com/client-api/v1/likePost/${postId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const data = await response.json();
                        if (data.success) {
                            // Update UI
                            likeIcon.classList.add('icon-fill-like');
                            post.likes_sum[0].total_likes += 1;
                            likeCounter.textContent = post.likes_sum[0].total_likes;
                        }
                    } catch (error) {
                        console.error('Error liking the post:', error);
                    }
                }
            });
        });
    }

    function addCommentButtonEventListeners() {
        const commentButtons = document.querySelectorAll('.post__link--comment');
        commentButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const postId = this.getAttribute('data-post-id');
                const commentsContainer = this.closest('.post__item').querySelector('.post__comments');
                commentsContainer.style.display = commentsContainer.style.display === 'none' ? 'block' : 'none';

                if (commentsContainer.innerHTML === '') {
                    // Fetch and display comments if not already fetched
                    const token = localStorage.getItem('token');
                    try {
                        const response = await fetch(`https://back.anceega.com/client-api/v1/getComments/${postId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const data = await response.json();
                        if (data.success) {
                            commentsContainer.innerHTML = data.comments.map(comment => `
                                <div class="comment__item">
                                    <div class="comment__ava">
                                        <img src="${comment.user_photo}" alt="User Avatar" />
                                    </div>
                                    <div class="comment__body">
                                        <div class="comment__user">${comment.user_name}</div>
                                        <div class="comment__text">${comment.comment}</div>
                                        <div class="comment__time">${formatDate(comment.created_at)}</div>
                                    </div>
                                </div>
                            `).join('');
                        }
                    } catch (error) {
                        console.error('Error fetching comments:', error);
                    }
                }
            });
        });
    }

    function addCommentEventListeners(postId) {
        const commentInput = document.querySelector(`.post__foot[data-post-id="${postId}"] .post__input`);
        const commentButton = document.querySelector(`.post__foot[data-post-id="${postId}"] .post__publish-btn`);

        commentInput.addEventListener('input', function () {
            if (commentInput.value.trim()) {
                commentButton.style.display = 'flex';
            } else {
                commentButton.style.display = 'none';
            }
        });

        commentButton.addEventListener('click', async function () {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(`https://back.anceega.com/client-api/v1/commentPost/${postId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ comment: commentText })
                    });
                    const data = await response.json();
                    if (data.success) {
                        // Add the new comment to the comments section
                        const commentsContainer = document.querySelector(`.post__item[data-post-id="${postId}"] .post__comments`);
                        const newComment = `
                            <div class="comment__item">
                                <div class="comment__ava">
                                    <img src="${user.personal_photo}" alt="User Avatar" />
                                </div>
                                <div class="comment__body">
                                    <div class="comment__user">${user.full_name}</div>
                                    <div class="comment__text">${commentText}</div>
                                    <div class="comment__time">${formatDate(new Date().toISOString())}</div>
                                </div>
                            </div>
                        `;
                        commentsContainer.innerHTML += newComment;
                        commentInput.value = '';
                        commentButton.style.display = 'none';
                    }
                } catch (error) {
                    console.error('Error posting comment:', error);
                }
            }
        });
    }

    fetchPosts();
});
