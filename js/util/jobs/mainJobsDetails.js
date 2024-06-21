let jobsData = []; // Declare jobsData as a mutable array
const loadingSpinner = document.getElementById('loadingSpinner');

document.addEventListener('DOMContentLoaded', () => {
    async function fetchJobs() {
        try {
            loadingSpinner.style.display = 'flex';
            // Retrieve token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in localStorage');
            }

            const response = await fetch('https://back.anceega.com/client-api/v1/jobs/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                redirect: 'follow'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Received response is not in JSON format");
            }

            const data = await response.json();
            console.log(data);

            jobsData = data.data; // Store fetched jobs data in jobsData array

            // Fetch job index from query parameters
            const params = new URLSearchParams(window.location.search);
            const jobIndex = params.get('id');

            if (!jobIndex || isNaN(jobIndex) || jobIndex < 0 || jobIndex >= jobsData.length) {
                throw new Error('Job index parameter is missing, invalid, or out of range.');
            }

            // // Share button functionality
            // const shareButton = document.getElementById('shareButton');
            // shareButton.addEventListener('click', () => {
            //     if (navigator.share) {
            //         navigator.share({
            //             title: job.job_name,
            //             text: `Check out this job: ${job.job_name}`,
            //             url: window.location.href
            //         }).then(() => {
            //             console.log('Thanks for sharing!');
            //         }).catch(console.error);
            //     } else {
            //         alert('Web Share API is not supported in your browser.');
            //     }
            // });

            displayJobDetails(jobIndex);
        } catch (error) {
            console.error('Error fetching job data:', error);
        } finally {
            // Hide loading spinner
            loadingSpinner.style.display = 'none';
        }
    }

    fetchJobs();
});

function displayJobDetails(jobIndex) {
    try {
        // Retrieve job details from the jobsData array
        const job = jobsData[jobIndex];

        const jobDetailsElement = document.getElementById('mainJobDetails');

        jobDetailsElement.innerHTML = `
                    <div class="description description_big">
                        <div class="description__bg"
                            style="background-image: url('img/bg-description-work.jpg');">
                            <div class="description__logo"><img class="description__pic"
                                    src="img/tokopedia.png" alt=""></div>
                        </div>
                        <div class="description__body">
                            <div class="description__head">
                                <h1 class="description__title title">${job.job_name}</h1>
                                <div class="description__actions">
                                    <button class="description__action" id="shareButton">
                                        <svg class="icon icon-share">
                                            <use xlink:href="img/sprite.svg#icon-share"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="description__line">
                                <div class="description__details flex"><span
                                        class="description__company">Tokopedia</span><span
                                        class="description__place flex">Jakarta, Indonesia<svg
                                            class="icon icon-get-location">
                                            <use xlink:href="img/sprite.svg#icon-get-location">
                                            </use>
                                        </svg></span></div>
                                <div class="description__details"><span
                                        class="description__date">Posted 3 Days ago</span><span
                                        class="description__counter">158 Applicants</span></div>
                            </div>
                            <div class="description__line">
                                <div class="description__details"><span
                                        class="description__info">Job category</span><a
                                        class="description__work" href="">${job.job_category}</a>
                                </div>
                            </div>
                            <div class="description__wrap">
                                <div class="description__item">
                                    <div class="description__category">Experience</div>
                                    <div class="description__value">${job.experience}</div>
                                </div>
                                <div class="description__item">
                                    <div class="description__category">Work Level</div>
                                    <div class="description__value">${job.work_level}</div>
                                </div>
                                <div class="description__item">
                                    <div class="description__category">Employee Type</div>
                                    <div class="description__value">${job.employee_type}</div>
                                </div>
                                <div class="description__item">
                                    <div class="description__category">Offer Salary</div>
                                    <div class="description__value">$${job.salary} / Month</div>
                                </div>
                            </div>
                            <div class="description__content">
                                <h2>Overview</h2>
                                <p>${job.overview}</p>
                                <h2>Job Description</h2>
                                <ul>
                                    ${job.job_description.map(desc => `<li>${desc}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="description__foot">
                                <div class="description__question">Are you Interested in this Jobs?
                                </div>
                                <div class="description__btns">
                                    <button class="description__btn btn btn_blue" id="applyButton">Apply Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `

        // Add event listener to the "Apply Now" button
        const applyButton = document.getElementById('applyButton');
        applyButton.addEventListener('click', async () => {
            try {
                // Retrieve token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found in localStorage');
                }

                const applyResponse = await fetch('https://back.anceega.com/client-api/v1/apply_jobs/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ jobs_applies_id: job.id })
                });

                if (!applyResponse.ok) {
                    throw new Error('Network response was not ok: ' + applyResponse.statusText);
                }

                const applyData = await applyResponse.json();
                console.log('Application successful:', applyData);
                alert('Application successful!');
                window.location.href = '/jobs.html';
            } catch (error) {
                console.error('Error applying for job:', error);
                alert('Failed to apply for job.');
            }
        });

    } catch (error) {
        console.error('Error displaying job details:', error);
        // Optionally handle error display or fallback
    }
}