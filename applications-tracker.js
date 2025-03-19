const applicationsData = {
    applications: [
        {
            id: 1,
            company: 'Tech Corp',
            position: 'Senior Frontend Developer',
            status: 'In Review',
            appliedDate: '2024-03-05',
            lastUpdated: '2024-03-07',
            logo: 'https://logo.clearbit.com/techcorp.com',
            details: {
                salary: '$120k - $150k',
                location: 'Remote',
                interviewer: 'Sarah Johnson',
                nextStep: 'Technical Interview',
                notes: 'Completed initial screening'
            }
        },
        {
            id: 2,
            company: 'StartupX',
            position: 'Full Stack Engineer',
            status: 'Rejected',
            appliedDate: '2024-03-01',
            lastUpdated: '2024-03-06',
            logo: 'https://logo.clearbit.com/startupx.com',
            details: {
                salary: '$100k - $130k',
                location: 'New York',
                feedback: 'Looking for more senior candidates'
            }
        },
        {
            id: 3,
            company: 'Innovation Labs',
            position: 'DevOps Engineer',
            status: 'Interview Scheduled',
            appliedDate: '2024-03-03',
            lastUpdated: '2024-03-08',
            logo: 'https://logo.clearbit.com/innovationlabs.com',
            details: {
                salary: '$130k - $160k',
                location: 'San Francisco',
                interviewer: 'Mike Chen',
                nextStep: 'System Design Discussion',
                interviewDate: '2024-03-12 10:00 AM'
            }
        }
    ]
};

function initializeApplicationsTracker() {
    const applicationsButton = document.querySelector('.sidebar-menu li:nth-child(3)');
    applicationsButton.addEventListener('click', showApplicationsModal);
}

function showApplicationsModal() {
    const modal = document.createElement('div');
    modal.className = 'applications-modal';
    
    modal.innerHTML = `
        <div class="applications-modal-content">
            <div class="applications-header">
                <h2>My Applications</h2>
                <button class="close-modal">&times;</button>
            </div>

            <div class="applications-filters">
                <div class="filter-group">
                    <input type="text" id="search-applications" placeholder="Search applications...">
                    <select id="status-filter">
                        <option value="">All Statuses</option>
                        <option value="In Review">In Review</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted">Accepted</option>
                    </select>
                </div>
                <div class="applications-stats">
                    <div class="stat">
                        <span class="stat-number">${getApplicationStats().total}</span>
                        <span class="stat-label">Total</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${getApplicationStats().active}</span>
                        <span class="stat-label">Active</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${getApplicationStats().rejected}</span>
                        <span class="stat-label">Rejected</span>
                    </div>
                </div>
            </div>

            <div class="applications-timeline">
                ${renderApplications()}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setupApplicationsEventListeners();
}

function renderApplications(filters = {}) {
    let filteredApplications = [...applicationsData.applications];

    if (filters.search) {
        filteredApplications = filteredApplications.filter(app => 
            app.company.toLowerCase().includes(filters.search.toLowerCase()) ||
            app.position.toLowerCase().includes(filters.search.toLowerCase())
        );
    }

    if (filters.status) {
        filteredApplications = filteredApplications.filter(app => 
            app.status === filters.status
        );
    }

    return filteredApplications.map(app => `
        <div class="application-card" data-id="${app.id}">
            <div class="application-status ${getStatusClass(app.status)}">
                ${app.status}
            </div>
            <div class="application-content">
                <div class="company-info">
                    <img src="${app.logo}" onerror="this.src='https://via.placeholder.com/40'" alt="${app.company} logo">
                    <div>
                        <h3>${app.position}</h3>
                        <p>${app.company}</p>
                    </div>
                </div>
                <div class="application-dates">
                    <div class="date-item">
                        <span class="date-label">Applied:</span>
                        <span>${formatDate(app.appliedDate)}</span>
                    </div>
                    <div class="date-item">
                        <span class="date-label">Last Updated:</span>
                        <span>${formatDate(app.lastUpdated)}</span>
                    </div>
                </div>
                <button class="btn-details" onclick="showApplicationDetails(${app.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

function showApplicationDetails(appId) {
    const app = applicationsData.applications.find(a => a.id === appId);
    const detailsModal = document.createElement('div');
    detailsModal.className = 'application-details-modal';

    detailsModal.innerHTML = `
        <div class="details-content">
            <button class="close-details">&times;</button>
            <div class="details-header">
                <img src="${app.logo}" onerror="this.src='https://via.placeholder.com/60'" alt="${app.company} logo">
                <div>
                    <h2>${app.position}</h2>
                    <h3>${app.company}</h3>
                </div>
                <div class="status-badge ${getStatusClass(app.status)}">${app.status}</div>
            </div>
            
            <div class="details-grid">
                <div class="detail-item">
                    <span class="detail-label">Salary Range</span>
                    <span>${app.details.salary}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Location</span>
                    <span>${app.details.location}</span>
                </div>
                ${app.details.interviewer ? `
                    <div class="detail-item">
                        <span class="detail-label">Interviewer</span>
                        <span>${app.details.interviewer}</span>
                    </div>
                ` : ''}
                ${app.details.nextStep ? `
                    <div class="detail-item">
                        <span class="detail-label">Next Step</span>
                        <span>${app.details.nextStep}</span>
                    </div>
                ` : ''}
                ${app.details.feedback ? `
                    <div class="detail-item feedback">
                        <span class="detail-label">Feedback</span>
                        <span>${app.details.feedback}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    document.body.appendChild(detailsModal);
    setupDetailsEventListeners(detailsModal);
}

function getStatusClass(status) {
    const statusClasses = {
        'In Review': 'status-review',
        'Interview Scheduled': 'status-interview',
        'Rejected': 'status-rejected',
        'Accepted': 'status-accepted'
    };
    return statusClasses[status] || '';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getApplicationStats() {
    const apps = applicationsData.applications;
    return {
        total: apps.length,
        active: apps.filter(app => app.status !== 'Rejected').length,
        rejected: apps.filter(app => app.status === 'Rejected').length
    };
}

function setupApplicationsEventListeners() {
    const closeBtn = document.querySelector('.applications-modal .close-modal');
    const searchInput = document.getElementById('search-applications');
    const statusFilter = document.getElementById('status-filter');

    closeBtn.addEventListener('click', () => {
        document.querySelector('.applications-modal').remove();
    });

    searchInput.addEventListener('input', (e) => {
        updateApplicationsList({ search: e.target.value });
    });

    statusFilter.addEventListener('change', (e) => {
        updateApplicationsList({ status: e.target.value });
    });
}

function updateApplicationsList(filters) {
    const timelineContainer = document.querySelector('.applications-timeline');
    timelineContainer.innerHTML = renderApplications(filters);
}

document.addEventListener('DOMContentLoaded', initializeApplicationsTracker);