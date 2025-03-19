const dashboardData = {
    recommendedJobs: [
        {
            title: 'Senior Frontend Developer',
            company: 'Tech Corp',
            logo: 'https://logo.clearbit.com/techcorp.com',
            location: 'Remote',
            salary: '$120k - $150k',
            matchScore: 95,
            skills: ['React', 'TypeScript', 'Node.js'],
            posted: '2 days ago',
            applications: 45,
            views: 230
        },
        {
            title: 'Full Stack Engineer',
            company: 'StartupX',
            logo: 'https://logo.clearbit.com/startupx.com',
            location: 'New York',
            salary: '$130k - $160k',
            matchScore: 88,
            skills: ['JavaScript', 'Python', 'AWS'],
            posted: '1 day ago',
            applications: 28,
            views: 180
        },
        {
            title: 'DevOps Engineer',
            company: 'Cloud Systems',
            logo: 'https://logo.clearbit.com/cloudsystems.com',
            location: 'San Francisco',
            salary: '$140k - $170k',
            matchScore: 92,
            skills: ['Docker', 'Kubernetes', 'CI/CD'],
            posted: '3 days ago',
            applications: 34,
            views: 195
        }
    ],
    recentActivity: [
        {
            type: 'application',
            company: 'Tech Corp',
            position: 'Senior Frontend Developer',
            date: '2 days ago',
            icon: '📝',
            status: 'Under Review'
        },
        {
            type: 'profileView',
            company: 'StartupX',
            date: '1 day ago',
            icon: '👀',
            details: 'Recruiter viewed your profile'
        },
        {
            type: 'interview',
            company: 'Cloud Systems',
            position: 'DevOps Engineer',
            date: 'Tomorrow',
            icon: '🗣️',
            details: 'Technical Interview scheduled'
        },
        {
            type: 'skillEndorsement',
            skill: 'React',
            endorser: 'Jane Smith',
            date: '3 hours ago',
            icon: '⭐',
            details: 'New skill endorsement'
        }
    ]
};

function initializeDashboard() {
    loadRecommendedJobs();
    loadRecentActivity();
    setupEventListeners();
}

function loadRecommendedJobs() {
    const jobsGrid = document.querySelector('.jobs-grid');
    jobsGrid.innerHTML = dashboardData.recommendedJobs.map(job => `
        <div class="job-card" data-company="${job.company}">
            <div class="job-card-header">
                <img src="${job.logo}" onerror="this.src='https://via.placeholder.com/40'" alt="${job.company} logo" class="company-logo">
                <span class="match-score" title="Match Score">
                    ${job.matchScore}% Match
                </span>
            </div>
            <h3>${job.title}</h3>
            <div class="job-meta">
                <span>${job.company}</span> • 
                <span>${job.location}</span>
            </div>
            <div class="salary-range">
                <i class="fas fa-money-bill-wave"></i> ${job.salary}
            </div>
            <div class="skills-container">
                ${job.skills.map(skill => `
                    <span class="skill-tag">${skill}</span>
                `).join('')}
            </div>
            <div class="job-stats">
                <div class="job-stat">
                    <div class="job-stat-value">${job.applications}</div>
                    <div class="job-stat-label">Applications</div>
                </div>
                <div class="job-stat">
                    <div class="job-stat-value">${job.views}</div>
                    <div class="job-stat-label">Views</div>
                </div>
                <div class="job-stat">
                    <div class="job-stat-value">${job.posted}</div>
                    <div class="job-stat-label">Posted</div>
                </div>
            </div>
            <button class="apply-btn" onclick="quickApply('${job.company}', '${job.title}')">
                Quick Apply
            </button>
        </div>
    `).join('');
}

function loadRecentActivity() {
    const activitySection = document.createElement('div');
    activitySection.className = 'recent-activity-section';
    activitySection.innerHTML = `
        <div class="section-header">
            <h2>Recent Activity</h2>
            <button class="btn-refresh">
                <i class="fas fa-sync-alt"></i>
            </button>
        </div>
        <div class="activity-timeline">
            ${dashboardData.recentActivity.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-details">
                        <div class="activity-header">
                            ${getActivityTitle(activity)}
                        </div>
                        <div class="activity-meta">
                            ${activity.date}
                            ${activity.status ? `<span class="activity-status">${activity.status}</span>` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    document.querySelector('.main-content').insertBefore(
        activitySection,
        document.querySelector('.section-header')
    );
}

function getActivityTitle(activity) {
    switch(activity.type) {
        case 'application':
            return `Applied for ${activity.position} at ${activity.company}`;
        case 'profileView':
            return `${activity.details} from ${activity.company}`;
        case 'interview':
            return `${activity.details} for ${activity.position} at ${activity.company}`;
        case 'skillEndorsement':
            return `${activity.endorser} endorsed you for ${activity.skill}`;
        default:
            return activity.details;
    }
}

function quickApply(company, position) {
    const modal = document.createElement('div');
    modal.className = 'quick-apply-modal';
    modal.innerHTML = `
        <div class="quick-apply-content">
            <h3>Quick Apply - ${position}</h3>
            <p>Company: ${company}</p>
            <form id="quick-apply-form">
                <textarea placeholder="Add a note to recruiter (optional)"></textarea>
                <div class="form-actions">
                    <button type="button" class="btn-cancel">Cancel</button>
                    <button type="submit" class="btn-apply">Submit Application</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    setupQuickApplyListeners(modal);
}

function setupQuickApplyListeners(modal) {
    const form = modal.querySelector('#quick-apply-form');
    const cancelBtn = modal.querySelector('.btn-cancel');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.remove();
        showNotification('Application submitted successfully!');
    });

    cancelBtn.addEventListener('click', () => modal.remove());
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function setupEventListeners() {
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('rotating');
            setTimeout(() => {
                loadRecentActivity();
                refreshBtn.classList.remove('rotating');
                showNotification('Activity feed updated!');
            }, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeDashboard);