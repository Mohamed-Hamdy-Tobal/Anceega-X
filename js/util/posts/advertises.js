// Function to fetch advertisements
async function fetchAdvertises() {
    const token = localStorage.getItem('token');
    // Show the loading spinner
    loadingSpinner.style.display = 'flex';
    document.getElementById('loading__wrapper').style.display = 'none';

    try {
        const response = await fetch('https://back.anceega.com/client-api/v1/getAdvertises', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            redirect: 'follow'
        });
        const data = await response.json();
        const advertises = data.data;
        console.log('advertises : ', advertises);
        displayAdvertises(advertises);
    } catch (error) {
        console.error('Error fetching advertisements:', error);
    } finally {
        // Hide the loading spinner and show the profile section
        loadingSpinner.style.display = 'none';
        document.getElementById('loading__wrapper').style.display = 'block';
    }
}

// Function to display advertisements as cards
function displayAdvertises(advertises) {
    const user = JSON.parse(localStorage.getItem('company')) || JSON.parse(localStorage.getItem('employee'));
    const currentUserId = user ? user.id : null;
    const container = document.querySelector('.main-cards');
    container.innerHTML = ''; // Clear the container first

    if (advertises.length === 0) {
        container.innerHTML = '<div class="no-advertisements">Will publish soon</div>';
        return;
    }

    advertises.forEach(ad => {

        let logoOrPhoto = '';
        if (ad.company.logo) {
            logoOrPhoto = `
                        <div class="ava">
                            <img class="ava__pic" src="${ad.company.logo}" alt="">
                        </div>
                        `;
        } else if (ad.company.personal_photo) {
            logoOrPhoto = `
                        <div class="ava">
                            <img class="ava__pic" src="${ad.company.personal_photo}" alt="">
                        </div>
                        `;
        } else {
            logoOrPhoto = `
                    <div class="ava__placeholder rounded-full mr-3" style="width: 50px; height: 50px; color: #898989; display: flex; justify-content: center; align-items: center; background: #eeeeeeab; font-size: 19px;">
                        ${ad.company.full_name.charAt(0).toUpperCase()}
                    </div>
                `
        }


        let adMedia = '';
            if (ad.file_name) {
                const fileNames = ad.file_name.split(','); // Assuming file names are comma-separated
                fileNames.forEach(fileName => {
                    if (fileName.endsWith('.mp4')) {
                        adMedia += `
                            <video class="post__media w-full" controls>
                                <source src="${fileName}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>`;
                    } else {
                        adMedia += `<img class="post__media w-full" src="${fileName}" alt="Post media" />`;
                    }
                });
            }


        // Check if the current user has liked this post
        const hasLikedAd = ad.likes.some(like => like.member_id == currentUserId);
        const likeIconFillAd = hasLikedAd ? 'icon-fill-like-add' : '';

        const cardHTML = `
            <div class="card1__body">
                <a class="card1__user card1__user_team" href="#">
                    ${logoOrPhoto}
                    <div class="card1__desc">
                        <div class="card1__man">${ad.company.full_name}</div>
                        <div class="card1__time">${ad.company.field}</div>
                    </div>
                </a>
                <div class="card1__like">
                    <div class="card1__photo">
                        ${adMedia}
                    </div>
                    <div class="w-full p-3 cursor-pointer">
                        <span class='flex justify-center items-center gap-3 ad-like' data-ad-id="${ad.id}">
                            <svg class="icon icon-like-thumb w-[30px] h-[30px] ${likeIconFillAd}">
                                <use xlink:href="img/sprite.svg#icon-like-thumb"></use>
                            </svg>
                            <span  class='font-medium'>
                                <span>${ad.likes_sum.length > 0 ? ad.likes_sum[0].total_likes : "0"}</span> Like Page
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);

        addLikeEventListenersAd();
    });


    function addLikeEventListenersAd() {
        const likeButtons = document.querySelectorAll('.ad-like');

        likeButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const adId = this.getAttribute('data-ad-id');
                handleLikeAd(adId);
            });
        });

    }

    async function handleLikeAd(adId) {
        const token = localStorage.getItem('token');

        console.log("Like")

        try {
            const response = await fetch(`https://back.anceega.com/client-api/v1/reviews/addLike/${adId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: {}
            });

            const data = await response.json();
            console.log('Like response:', data);
            if (data) {
                fetchAdvertises();
            }

            // // Optionally, update the like count in the DOM

        } catch (error) {
            console.error('Error liking post:', error);
        }
    }
}

fetchAdvertises();