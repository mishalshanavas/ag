const skillsData = {
    userSkills: [
        { 
            name: 'JavaScript',
            level: 'Advanced',
            verified: true,
            proof: 'https://github.com/username/js-project',
            endorsements: 12
        },
        { 
            name: 'React',
            level: 'Intermediate',
            verified: true,
            proof: 'https://codepen.io/username/pen/react-demo',
            endorsements: 8
        }
    ],
    skillLevels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    suggestedSkills: [
        'Python', 'Node.js', 'TypeScript', 'React Native', 'AWS', 
        'Docker', 'Kubernetes', 'GraphQL', 'MongoDB', 'SQL'
    ]
};

function initializeSkillsManager() {
    const skillsButton = document.querySelector('.menu-item:nth-child(5)');
    skillsButton.addEventListener('click', showSkillsModal);
}

function showSkillsModal() {
    const modal = document.createElement('div');
    modal.className = 'skills-modal';
    
    modal.innerHTML = `
        <div class="skills-modal-content">
            <div class="skills-modal-header">
                <h2>Skills Management</h2>
                <button class="close-modal">&times;</button>
            </div>
            
            <div class="skills-container">
                <div class="skills-section">
                    <h3>My Skills</h3>
                    <div class="skills-grid" id="user-skills"></div>
                </div>

                <div class="add-skill-section">
                    <h3>Add New Skill</h3>
                    <div class="add-skill-form">
                        <input type="text" id="skill-name" placeholder="Skill name" list="suggested-skills">
                        <datalist id="suggested-skills">
                            ${skillsData.suggestedSkills.map(skill => `<option value="${skill}">`).join('')}
                        </datalist>
                        <select id="skill-level">
                            ${skillsData.skillLevels.map(level => 
                                `<option value="${level}">${level}</option>`
                            ).join('')}
                        </select>
                        <input type="url" id="skill-proof" placeholder="Link to proof (GitHub, CodePen, etc.)">
                        <button id="add-skill-btn" class="btn-primary">Add Skill</button>
                    </div>
                </div>

                <div class="skills-metrics">
                    <div class="skill-metric">
                        <h4>Skills Breakdown</h4>
                        <canvas id="skills-chart"></canvas>
                    </div>
                    <div class="skill-metric">
                        <h4>Endorsements</h4>
                        <div id="endorsements-list"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    renderUserSkills();
    setupSkillsEventListeners();
    initializeSkillsChart();
}

function renderUserSkills() {
    const skillsGrid = document.getElementById('user-skills');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = skillsData.userSkills.map(skill => `
        <div class="skill-card">
            <div class="skill-header">
                <h4>${skill.name}</h4>
                ${skill.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            </div>
            <div class="skill-level">${skill.level}</div>
            <div class="skill-proof">
                <a href="${skill.proof}" target="_blank" rel="noopener noreferrer">
                    View Proof
                </a>
            </div>
            <div class="skill-endorsements">
                ${skill.endorsements} endorsements
            </div>
            <div class="skill-actions">
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Remove</button>
            </div>
        </div>
    `).join('');
}

function setupSkillsEventListeners() {
    const closeBtn = document.querySelector('.skills-modal .close-modal');
    const addSkillBtn = document.getElementById('add-skill-btn');

    closeBtn.addEventListener('click', () => {
        document.querySelector('.skills-modal').remove();
    });

    addSkillBtn.addEventListener('click', () => {
        const name = document.getElementById('skill-name').value;
        const level = document.getElementById('skill-level').value;
        const proof = document.getElementById('skill-proof').value;

        if (!name || !level || !proof) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidURL(proof)) {
            alert('Please enter a valid URL for proof');
            return;
        }

        skillsData.userSkills.push({
            name,
            level,
            verified: false,
            proof,
            endorsements: 0
        });

        renderUserSkills();
        updateSkillsChart();
    });
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function initializeSkillsChart() {
    const ctx = document.getElementById('skills-chart').getContext('2d');
    const skillLevels = {};
    
    skillsData.userSkills.forEach(skill => {
        skillLevels[skill.level] = (skillLevels[skill.level] || 0) + 1;
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(skillLevels),
            datasets: [{
                data: Object.values(skillLevels),
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeSkillsManager);