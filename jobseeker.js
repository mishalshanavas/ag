const jobListings = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        salary: '$120k - $150k',
        match: '95%',
        skills: ['React', 'TypeScript', 'Node.js'],
        posted: '2 days ago',
        description: 'Looking for an experienced frontend developer to join our dynamic team.',
        requirements: ['5+ years experience', 'Strong JavaScript skills', 'Team leadership'],
        benefits: ['Health insurance', 'Remote work', '401k matching']
    },
    {
        id: 2,
        title: 'Full Stack Developer',
        company: 'Innovation Labs',
        location: 'New York',
        salary: '$130k - $160k',
        match: '88%',
        skills: ['JavaScript', 'Python', 'AWS'],
        posted: '1 day ago',
        description: 'Join our fast-growing startup and work on cutting-edge technologies.',
        requirements: ['3+ years experience', 'Full stack expertise', 'AWS certification'],
        benefits: ['Unlimited PTO', 'Stock options', 'Gym membership']
    },
    {
        id: 3,
        title: 'DevOps Engineer',
        company: 'Cloud Systems Inc',
        location: 'San Francisco',
        salary: '$140k - $170k',
        match: '92%',
        skills: ['Docker', 'Kubernetes', 'CI/CD'],
        posted: '3 days ago',
        description: 'Help us build and maintain our cloud infrastructure.',
        requirements: ['4+ years DevOps experience', 'Strong Linux skills', 'Security expertise'],
        benefits: ['Competitive salary', 'Health benefits', 'Learning budget']
    },
    // Add 7 more job listings with similar structure
];

function showJobListings() {
    const modal = document.createElement('div');
    modal.className = 'jobs-modal';
    
    modal.innerHTML = `
        <div class="jobs-modal-content">
            <div class="jobs-modal-header">
                <h2>Jobs For You</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="jobs-filters">
                <input type="text" id="job-search" placeholder="Search jobs...">
                <select id="location-filter">
                    <option value="">All Locations</option>
                    <option value="Remote">Remote</option>
                    <option value="New York">New York</option>
                    <option value="San Francisco">San Francisco</option>
                </select>
                <div class="salary-filter">
                    <label>Salary Range:</label>
                    <input type="range" min="80" max="200" value="80" id="salary-range">
                    <span id="salary-value">$80k+</span>
                </div>
            </div>
            <div class="jobs-list"></div>
        </div>
    `;

    document.body.appendChild(modal);
    loadJobs();
    setupEventListeners();
}

function loadJobs(filters = {}) {
    const jobsList = document.querySelector('.jobs-list');
    let filteredJobs = [...jobListings];

    // Apply filters
    if (filters.search) {
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.search.toLowerCase())
        );
    }

    if (filters.location) {
        filteredJobs = filteredJobs.filter(job => job.location === filters.location);
    }

    if (filters.minSalary) {
        filteredJobs = filteredJobs.filter(job => 
            parseInt(job.salary.match(/\d+/)[0]) >= filters.minSalary
        );
    }

    jobsList.innerHTML = filteredJobs.map(job => `
        <div class="job-listing" data-id="${job.id}">
            <div class="job-listing-header">
                <h3>${job.title}</h3>
                <span class="match-badge">${job.match} Match</span>
            </div>
            <div class="job-listing-company">
                <img src="https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s/g, '')}.com" 
                     onerror="this.src='https://via.placeholder.com/40'" 
                     alt="${job.company} logo">
                <div>
                    <h4>${job.company}</h4>
                    <p>${job.location} • ${job.posted}</p>
                </div>
            </div>
            <div class="job-listing-salary">${job.salary}</div>
            <div class="job-listing-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <button class="apply-btn">Quick Apply</button>
        </div>
    `).join('');

    // Add click handlers for job listings
    document.querySelectorAll('.job-listing').forEach(listing => {
        listing.addEventListener('click', (e) => {
            if (!e.target.classList.contains('apply-btn')) {
                showJobDetails(listing.dataset.id);
            }
        });
    });
}

function setupEventListeners() {
    // Close modal
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.querySelector('.jobs-modal').remove();
    });

    // Search filter
    document.querySelector('#job-search').addEventListener('input', (e) => {
        loadJobs({ search: e.target.value });
    });

    // Location filter
    document.querySelector('#location-filter').addEventListener('change', (e) => {
        loadJobs({ location: e.target.value });
    });

    // Salary filter
    document.querySelector('#salary-range').addEventListener('input', (e) => {
        const value = e.target.value;
        document.querySelector('#salary-value').textContent = `$${value}k+`;
        loadJobs({ minSalary: parseInt(value) });
    });
}

function showJobDetails(jobId) {
    const job = jobListings.find(j => j.id === parseInt(jobId));
    const detailsModal = document.createElement('div');
    detailsModal.className = 'job-details-modal';
    
    detailsModal.innerHTML = `
        <div class="job-details-content">
            <button class="close-details">&times;</button>
            <h2>${job.title}</h2>
            <div class="company-info">
                <img src="https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s/g, '')}.com" 
                     onerror="this.src='https://via.placeholder.com/60'" 
                     alt="${job.company} logo">
                <div>
                    <h3>${job.company}</h3>
                    <p>${job.location}</p>
                </div>
            </div>
            <div class="job-details-section">
                <h4>Description</h4>
                <p>${job.description}</p>
            </div>
            <div class="job-details-section">
                <h4>Requirements</h4>
                <ul>
                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            <div class="job-details-section">
                <h4>Benefits</h4>
                <ul>
                    ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            <button class="apply-btn-large">Apply Now</button>
        </div>
    `;

    document.body.appendChild(detailsModal);

    detailsModal.querySelector('.close-details').addEventListener('click', () => {
        detailsModal.remove();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const jobSearchBtn = document.querySelector('.btn-add');
    if (jobSearchBtn) {
        jobSearchBtn.textContent = '🔍 Find Jobs';
        jobSearchBtn.addEventListener('click', showJobListings);
    }
});