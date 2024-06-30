const loadingSpinner = document.getElementById('loadingSpinner');
let jobsData = [];

async function fetchJobs() {
    try {
        loadingSpinner.style.display = 'flex';
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('token not found in localStorage');
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
        console.log(data)
        jobsData = data.data; // Store jobs data
        displayJobs(jobsData);
        updateFilterCounts();
    } catch (error) {
        console.error('Error fetching job data:', error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

function updateFilterCounts() {
    // Define filter types
    const filters = {
        'employee-type': ['Full Time Jobs', 'Part Time Jobs', "Remote Jobs", "Internship Jobs", "Contract", "Training Jobs"], // Add other types as needed
        'work-level': ['Student', 'Entry Level', 'Mid Level', 'Senior Level', 'Directors', 'VP or Above'], // Add other levels as needed
        'salary-range': ['0-1000', '1000-4000', '4000-8000', '8000-12000'] // Add other ranges as needed
    };

    // Calculate counts for each filter type
    for (let filterType in filters) {
        filters[filterType].forEach(filterValue => {
            const count = jobsData.filter(job => {
                switch (filterType) {
                    case 'employee-type':
                        return job.employee_type.toLowerCase() === filterValue.toLowerCase();
                    case 'work-level':
                        return job.work_level.toLowerCase() === filterValue.toLowerCase();
                    case 'salary-range':
                        const [min, max] = filterValue.split('-').map(Number);
                        const jobSalary = parseFloat(job.salary.replace(/[^0-9.-]+/g, ""));
                        return jobSalary >= min && jobSalary <= max;
                    default:
                        return false;
                }
            }).length;

            // Update the count in the checkbox label
            const checkboxLabel = document.querySelector(`.${filterType}[value="${filterValue}"]`).closest('label').querySelector('.checkbox__counter');
            checkboxLabel.innerText = count;
        });
    }
}

function displayJobs(jobs) {
    const jobsList = document.getElementById('jobsList');
    jobsList.innerHTML = ''; // Clear previous list items

    const jobCount = document.getElementById('jobCount');
    jobCount.innerText = `Showing ${jobs.length} Jobs`;

    jobs.forEach((job, index) => {
        const jobItem = document.createElement('div');
        jobItem.className = 'jobs__item flex flex-col justify-between gap-3';

        jobItem.innerHTML = `
                    <div class="">
                        <div class="jobs__logo">
                            <img class="jobs__pic" src="img/tokopedia.png" alt="">
                        </div>
                        <a class="jobs__title" href="job-details.html?id=${index}">${job.job_name}
                            <svg class="icon icon-get-location">
                                <use xlink:href="img/sprite.svg#icon-get-location"></use>
                            </svg>
                        </a>
                        <div class="jobs__info">${job.job_description}</div>
                        <div class="jobs__tags">
                            <div class="jobs__tag">${job.employee_type}</div>
                            <div class="jobs__tag">${job.experience}</div>
                            <div class="jobs__tag">${job.job_category}</div>
                        </div>
                    </div>
                    <div class="jobs__btns">
                        <a class="" href="job-details.html?id=${index}">
                            <button class="jobs__btn btn btn_blue my-primary-btn">Apply Now</button>
                        </a>
                    </div>
                `;

        jobsList.appendChild(jobItem);
    });
}

function filterJobs() {
    const title = document.getElementById('searchTitle').value.toLowerCase();
    const type = document.getElementById('searchType').value.toLowerCase();

    // Parse salary input from text input
    const salaryInput = document.getElementById('searchSalary').value;
    let minSalary = 0, maxSalary = Number.MAX_VALUE;
    if (salaryInput.includes('-')) {
        const [min, max] = salaryInput.split('-').map(s => parseFloat(s.trim()));
        minSalary = isNaN(min) ? minSalary : min;
        maxSalary = isNaN(max) ? maxSalary : max;
    } else if (salaryInput) {
        minSalary = parseFloat(salaryInput.trim());
    }

    // Get selected employee types
    const selectedEmployeeTypes = Array.from(document.querySelectorAll('.employee-type:checked')).map(el => el.value.toLowerCase());

    // Get selected work levels
    const selectedWorkLevels = Array.from(document.querySelectorAll('.work-level:checked')).map(el => el.value.toLowerCase());

    // Get selected salary ranges
    const selectedSalaryRanges = Array.from(document.querySelectorAll('.salary-range:checked')).map(el => el.value);

    // If all fields are empty and no checkboxes are selected, show all jobs
    if (title === "" && type === "" && !salaryInput && selectedEmployeeTypes.length === 0 && selectedWorkLevels.length === 0 && selectedSalaryRanges.length === 0) {
        displayJobs(jobsData);
        return;
    }

    const filteredJobs = jobsData.filter(job => {
        const matchesTitle = title === "" || job.job_name.toLowerCase().includes(title);
        const matchesType = type === "" || job.employee_type.toLowerCase().includes(type);
        const matchesSalary = job.salary >= minSalary && job.salary <= maxSalary;

        // Check if job salary matches any of the selected salary ranges
        let matchesSalaryRange = true;
        if (selectedSalaryRanges.length > 0) {
            matchesSalaryRange = selectedSalaryRanges.some(range => {
                const [min, max] = range.replace('$', '').split('-').map(s => parseFloat(s.trim()));
                console.log(min, max)
                return job.salary >= min && job.salary <= max;
            });
        }

        const matchesEmployeeType = selectedEmployeeTypes.length === 0 || selectedEmployeeTypes.includes(job.employee_type.toLowerCase());
        const matchesWorkLevel = selectedWorkLevels.length === 0 || selectedWorkLevels.includes(job.work_level.toLowerCase());

        return matchesTitle && matchesType && matchesSalary && matchesSalaryRange && matchesEmployeeType && matchesWorkLevel;
    });

    displayJobs(filteredJobs);
}

// Add event listener to the "See More" button
document.querySelector('.js-page6-btn').addEventListener('click', () => {
    document.querySelector('.js-page6-filters').classList.toggle('show');
});

// Add event listeners to checkboxes
document.querySelectorAll('.checkbox__input').forEach(checkbox => {
    checkbox.addEventListener('change', filterJobs);
});

// Fetch jobs data when the page loads
window.onload = fetchJobs;