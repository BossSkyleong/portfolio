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

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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
        title: "Personalized Diet & Workout Planner App",
        category: "mobile",
        technologies: ["Android Studio", "Java", "XML"],
        description: "Final Year Project - Mobile application that helps users create personalized diet and workout plans based on their goals, BMI, and preferences.",
        icon: "fa-solid fa-utensils",
        screenshots: [
            { img: "images/app1.jpg", desc: "Food Logger - Record down the food consumed by the user daily with calorie details" },
            { img: "images/app2.jpg", desc: "Workout & Progress Tracker - includes workout video for users to do and keep track of their daily meal consumed" },
            { img: "images/app3.jpg", desc: "Open router API (Deepseek) recommendation for food and workout" }
        ]
    },
    {
        id: 2,
        title: "Traffic Sign Recognition and Detection System",
        category: "ml",
        technologies: ["C++", "OpenCV", "Machine Learning"],
        description: "Computer vision system that detects and recognizes traffic signs in real-time using image processing techniques.",
        icon: "fa-solid fa-traffic-light",
        screenshots: [
            { img: "images/sign1.jpg", desc: "Dataset & background segmentation by removing the background element, only take out the sign board" },
            { img: "images/sign2.jpg", desc: "Shape classifcation after segmentation" },
            { img: "images/sign3.jpg", desc: "Colour detection for each segmented sign" }
        ]
    },
    {
        id: 3,
        title: "Skin Cancer Risk Predicting System",
        category: "ml",
        technologies: ["Python", "Machine Learning", "Scikit-learn"],
        description: "Machine learning model to predict skin cancer risk based on image analysis and patient data.",
        icon: "fa-solid fa-heart-pulse",
        screenshots: [
            { img: "images/dl1.jpg", desc: "Gradio UI for Skin Cancer Predictions System with a few training model" },
            { img: "images/dl2.jpg", desc: "Hair removal function for the uploaded images" },
            { img: "images/dl3.jpg", desc: "Model comparison for the predicted results" }
        ]
    },
    {
        id: 4,
        title: "Interactive Recipe and Culinary Web Application",
        category: "web",
        technologies: ["PHP", "CSS", "MySQL", "HTML", "JavaScript"],
        description: "Dynamic website where users can browse, search, and share recipes with interactive features and user accounts.",
        icon: "fa-solid fa-utensils",
        notes: [
            "Developed a recipe-sharing web platform with CRUD functionality where users can create and share recipes with ingredient details. The system includes admin moderation, recipe voting competitions, user comments and ratings, and a meal planning feature for daily recipe selection."
        ]
    },
    {
        id: 5,
        title: "Simple Quiz Game Application for Students",
        category: "mobile",
        technologies: ["Android Studio", "Java", "SQLite"],
        description: "Interactive mobile application designed for students to test their knowledge through multiple-choice quizzes with score tracking.",
        icon: "fa-solid fa-question",
        screenshots: [
            { img: "images/quiz1.jpg", desc: "Game mode selection" },
            { img: "images/quiz2.jpg", desc: "Game UI with various question" }
        ]
    }
];

// ===== PROJECTS SECTION =====
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!projectsGrid) return;

    // Display all projects initially
    displayProjects('all');

    // Filter projects
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Get filter value and display projects
            const filter = btn.getAttribute('data-filter');
            displayProjects(filter);
        });
    });

    function displayProjects(filter) {
        let filteredProjects = projects;

        if (filter !== 'all') {
            filteredProjects = projects.filter(project => project.category === filter);
        }

        let html = '';

        filteredProjects.forEach(project => {
            html += `
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
                            <i class="fa-solid fa-camera"></i> View Screenshots
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        projectsGrid.innerHTML = html;
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
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

// Display screenshots in modal
function openScreenshots(projectId) {
    const modal = document.getElementById("screenshotModal");
    
    // Create modal if it doesn't exist
    if (!modal) {
        createModal();
    }
    
    const container = document.getElementById("screenshotContainer");
    const project = projects.find(p => p.id === projectId);

    let html = "";

    if (project.screenshots && project.screenshots.length > 0) {
        project.screenshots.forEach(shot => {
            html += `
                <div class="screenshot-card">
                    <img src="${shot.img}" alt="${shot.desc}" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
                    <p>${shot.desc}</p>
                </div>
            `;
        });
    } else if (project.notes) {
        html += `<div class="project-notes">`;
        project.notes.forEach(note => {
            html += `<p>• ${note}</p>`;
        });
        html += `</div>`;
    } else {
        html = `<p>No screenshots available for this project.</p>`;
    }

    container.innerHTML = html;
    document.getElementById("screenshotModal").style.display = "block";
}

function closeScreenshots() {
    const modal = document.getElementById("screenshotModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Create modal if it doesn't exist
function createModal() {
    const modalHTML = `
        <div id="screenshotModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeScreenshots()">&times;</span>
                <h2>Project Screenshots</h2>
                <div id="screenshotContainer" class="screenshot-container"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}