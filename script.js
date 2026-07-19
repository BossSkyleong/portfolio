// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initProjects();
    initScrollEffects();
});

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== PROJECTS DATA =====
const projects = [
    {
        id: 1,
        title: 'Personalized Diet & Workout Planner App',
        category: 'mobile',
        technologies: ['Android Studio', 'Java', 'XML'],
        description: 'Final Year Project - Mobile application that helps users create personalized diet and workout plans based on their goals, BMI, and preferences.',
        icon: 'fa-solid fa-utensils',
        screenshots: [
            { img: 'images/app1.jpg', desc: 'Food Logger - records daily food intake with calorie details.' },
            { img: 'images/app2.jpg', desc: 'Workout and progress tracker with workout videos and daily meal tracking.' },
            { img: 'images/app3.jpg', desc: 'OpenRouter API integration using DeepSeek for food and workout recommendations.' }
        ]
    },
    {
        id: 2,
        title: 'Traffic Sign Recognition and Detection System',
        category: 'ml',
        technologies: ['C++', 'OpenCV', 'Machine Learning'],
        description: 'Computer vision system that detects and recognizes traffic signs in real time using image processing techniques.',
        icon: 'fa-solid fa-traffic-light',
        screenshots: [
            { img: 'images/sign1.jpg', desc: 'Dataset preprocessing and background segmentation to isolate sign boards.' },
            { img: 'images/sign2.jpg', desc: 'Shape classification after segmentation.' },
            { img: 'images/sign3.jpg', desc: 'Color detection for each segmented sign.' }
        ]
    },
    {
        id: 3,
        title: 'Skin Cancer Risk Predicting System',
        category: 'ml',
        technologies: ['Python', 'Machine Learning', 'Scikit-learn'],
        description: 'Machine learning model to predict skin cancer risk based on image analysis and patient data.',
        icon: 'fa-solid fa-heart-pulse',
        screenshots: [
            { img: 'images/dl01.jpg', desc: 'Gradio UI for comparing multiple skin cancer prediction models.' },
            { img: 'images/dl02.jpg', desc: 'Hair removal preprocessing function for uploaded images.' },
            { img: 'images/dl03.jpg', desc: 'Model comparison view for predicted results.' }
        ]
    },
    {
        id: 4,
        title: 'Interactive Recipe and Culinary Web Application',
        category: 'web',
        technologies: ['PHP', 'CSS', 'MySQL', 'HTML', 'JavaScript'],
        description: 'Dynamic website where users can browse, search, and share recipes with interactive features and user accounts.',
        icon: 'fa-solid fa-utensils',
        notes: [
            'Developed a recipe-sharing web platform with CRUD functionality where users can create and share recipes with ingredient details. The system includes admin moderation, recipe voting competitions, user comments and ratings, and a meal planning feature for daily recipe selection.'
        ]
    },
    {
        id: 5,
        title: 'Simple Quiz Game Application for Students',
        category: 'mobile',
        technologies: ['Android Studio', 'Java', 'SQLite'],
        description: 'Interactive mobile application designed for students to test their knowledge through multiple-choice quizzes with score tracking.',
        icon: 'fa-solid fa-question',
        screenshots: [
            { img: 'images/quiz1.jpg', desc: 'Game mode selection screen.' },
            { img: 'images/quiz2.jpg', desc: 'Quiz gameplay UI with multiple question types.' }
        ]
    }
];

// ===== PROJECTS SECTION =====
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!projectsGrid) return;

    displayProjects('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            displayProjects(btn.getAttribute('data-filter'));
        });
    });

    function displayProjects(filter) {
        const filteredProjects = filter === 'all'
            ? projects
            : projects.filter(project => project.category === filter);

        projectsGrid.innerHTML = filteredProjects.map(project => {
            const projectAction = project.screenshots && project.screenshots.length > 0
                ? '<i class="fa-solid fa-camera"></i> View Screenshots'
                : '<i class="fa-solid fa-circle-info"></i> View Details';

            return `
                <div class="project-card" data-category="${project.category}">
                    <div class="project-image">
                        <i class="${project.icon} placeholder-icon"></i>
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                        <p class="project-description">${project.description}</p>
                        <div class="project-links">
                            <a href="javascript:void(0)" onclick="openScreenshots(${project.id})">
                                ${projectAction}
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (typeof animateProjectCards === 'function') {
            requestAnimationFrame(animateProjectCards);
        }
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function openScreenshots(projectId) {
    if (!document.getElementById('screenshotModal')) {
        createModal();
    }

    const container = document.getElementById('screenshotContainer');
    const project = projects.find(item => item.id === projectId);

    if (!container || !project) return;

    let html = '';

    if (project.screenshots && project.screenshots.length > 0) {
        html = project.screenshots.map(shot => `
            <div class="screenshot-card">
                <div class="image-container">
                    <img src="${shot.img}" alt="${shot.desc}" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
                </div>
                <p>${shot.desc}</p>
            </div>
        `).join('');
    } else if (project.notes) {
        html = `
            <div class="project-notes">
                ${project.notes.map(note => `<p>${note}</p>`).join('')}
            </div>
        `;
    } else {
        html = '<p>No screenshots available for this project.</p>';
    }

    container.innerHTML = html;
    document.getElementById('screenshotModal').style.display = 'block';
}

function closeScreenshots() {
    const modal = document.getElementById('screenshotModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function createModal() {
    const modalHTML = `
        <div id="screenshotModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeScreenshots()">&times;</span>
                <h2>Project Details</h2>
                <div id="screenshotContainer" class="screenshot-container"></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}
