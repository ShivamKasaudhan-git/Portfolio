/**
 * ==============================================================================
 * SHIVAM KASAUDHAN PORTFOLIO — MAIN JAVASCRIPT (index.js)
 * Core interactive features: Theme Switcher, Typed Text, Nav Spy, Filters, Modals
 * ==============================================================================
 */

// Achievements Data
const ACHIEVEMENTS_DATA = [
    {
        id: 'cert-web-dev',
        type: 'certificate',
        title: 'Full Stack Web Development & CS Foundations',
        issuer: 'Global Tech Institute',
        date: '2024',
        icon: 'fa-certificate',
        badge: 'Verified Certificate',
        description: 'Comprehensive program covering semantic HTML5, modern CSS3 animations, JavaScript (ES6+), responsive UI architecture, and data structures.',
        image: 'cert-1.jpg',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Algorithms']
    },
    {
        id: 'cert-ai-design',
        type: 'workshop',
        title: 'AI Design & Generative UI Patterns Workshop',
        issuer: 'AI Designers Guild',
        date: '2024',
        icon: 'fa-chalkboard-user',
        badge: 'Workshop Certificate',
        description: 'Hands-on intensive workshop on prompt engineering, generative design systems, aesthetic UI composition, and AI-assisted web prototyping.',
        image: 'project-1.jpg',
        tags: ['AI Design', 'Generative UI', 'Prompting', 'UX']
    },
    {
        id: 'cert-java-oop',
        type: 'course',
        title: 'Java Programming & Object-Oriented Software Design',
        issuer: 'CS Academy Online',
        date: '2023',
        icon: 'fa-book-open',
        badge: 'Specialization Course',
        description: 'In-depth mastery of Java core concepts, encapsulation, polymorphism, inheritance, exception handling, and data structures.',
        image: 'project-3.jpg',
        tags: ['Java', 'OOP', 'Data Structures', 'Backend']
    },
    {
        id: 'cert-cpp-mastery',
        type: 'course',
        title: 'C & C++ Programming Fundamentals',
        issuer: 'Computer Science Portal',
        date: '2023',
        icon: 'fa-terminal',
        badge: 'Course Completion',
        description: 'Foundations in low-level memory management, pointers, algorithmic logic, and performance-optimized system code.',
        image: 'cert-1.jpg',
        tags: ['C', 'C++', 'Memory Management', 'Logic']
    },
    {
        id: 'cert-hackathon-2024',
        type: 'hackathon',
        title: 'National Collegiate CodeSprint Hackathon',
        issuer: 'Inter-College Tech Fest',
        date: '2024',
        icon: 'fa-trophy',
        badge: 'Hackathon Finalist',
        description: 'Collaborated in a 24-hour sprint to prototype an interactive student utility web platform with rapid responsive design.',
        image: 'project-2.jpg',
        tags: ['Hackathon', 'Web Dev', 'Teamwork', 'Rapid Prototyping']
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavbarScroll();
    initMobileNav();
    initTypewriter();
    initSkillBars();
    initProjectFilters();
    initAchievements();
    initCertificateModal();
    initBackToTop();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check saved preference or fallback to dark
    const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Add smooth transition class
            htmlElement.classList.add('theme-transitioning');
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio_theme', newTheme);

            setTimeout(() => {
                htmlElement.classList.remove('theme-transitioning');
            }, 400);
        });
    }
}

/* ==========================================================================
   2. NAVBAR SCROLL & ACTIVE LINK SPY
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        const scrollY = window.scrollY;

        // Navbar background blur
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Scroll Progress Bar
        if (scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            scrollProgress.style.width = `${progress}%`;
        }

        // Section Spy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ==========================================================================
   3. MOBILE NAVIGATION (Hamburger)
   ========================================================================== */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
}

/* ==========================================================================
   4. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
    const roleElem = document.getElementById('typedRole');
    if (!roleElem) return;

    const roles = [
        'Computer Science Student',
        'Web Developer',
        'AI Design Enthusiast',
        'Java & C++ Programmer',
        'Passionate Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElem.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            roleElem.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1800; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400; // Short pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ==========================================================================
   5. SKILL BARS PROGRESS OBSERVER
   ========================================================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '75';
                bar.style.width = `${width}%`;
                obs.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   6. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                const matches = filterValue === 'all' || category.includes(filterValue);

                if (matches) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   7. ACHIEVEMENTS & CERTIFICATIONS
   ========================================================================== */
function initAchievements() {
    const countersContainer = document.getElementById('achievementCounters');
    const gridContainer = document.getElementById('achievementsGrid');
    const filterButtons = document.querySelectorAll('#achievementFilters .filter-btn');

    if (!gridContainer) return;

    // Render summary counters
    if (countersContainer) {
        const certCount = ACHIEVEMENTS_DATA.filter(a => a.type === 'certificate').length;
        const courseCount = ACHIEVEMENTS_DATA.filter(a => a.type === 'course').length;
        const workshopCount = ACHIEVEMENTS_DATA.filter(a => a.type === 'workshop').length;
        const hackathonCount = ACHIEVEMENTS_DATA.filter(a => a.type === 'hackathon').length;

        countersContainer.innerHTML = `
            <div class="achievement-counter-pill">
                <i class="fa-solid fa-certificate"></i>
                <span><span class="counter-num">${certCount}</span> Certificates</span>
            </div>
            <span class="achievement-counter-separator">•</span>
            <div class="achievement-counter-pill">
                <i class="fa-solid fa-book-open"></i>
                <span><span class="counter-num">${courseCount}</span> Courses</span>
            </div>
            <span class="achievement-counter-separator">•</span>
            <div class="achievement-counter-pill">
                <i class="fa-solid fa-chalkboard-user"></i>
                <span><span class="counter-num">${workshopCount}</span> Workshops</span>
            </div>
            <span class="achievement-counter-separator">•</span>
            <div class="achievement-counter-pill">
                <i class="fa-solid fa-trophy"></i>
                <span><span class="counter-num">${hackathonCount}</span> Hackathons</span>
            </div>
        `;
    }

    // Render achievement cards
    function renderAchievements(filter = 'all') {
        gridContainer.innerHTML = '';

        const items = filter === 'all'
            ? ACHIEVEMENTS_DATA
            : ACHIEVEMENTS_DATA.filter(item => item.type === filter);

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'achievement-card reveal visible';
            card.setAttribute('data-id', item.id);

            const tagsHtml = item.tags.map(t => `<span>${t}</span>`).join('');

            card.innerHTML = `
                <div class="project-card-thumb" style="height:170px; cursor:pointer;" onclick="openCertModal('${item.id}')">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='cert-1.jpg'" />
                    <span class="project-card-badge"><i class="fa-solid ${item.icon}"></i> ${item.badge}</span>
                </div>
                <div style="padding: 20px; display:flex; flex-direction:column; gap:12px; flex-grow:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent);">${item.issuer}</span>
                        <span class="timeline-year" style="padding:2px 10px; font-size:0.75rem;">${item.date}</span>
                    </div>
                    <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-primary); line-height:1.3;">${item.title}</h3>
                    <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6; flex-grow:1;">${item.description}</p>
                    <div class="project-tags" style="margin-top:4px;">
                        ${tagsHtml}
                    </div>
                    <div style="margin-top:8px; padding-top:12px; border-top:1px solid var(--border);">
                        <button class="btn btn-outline btn-full" style="padding:8px 14px; font-size:0.8rem;" onclick="openCertModal('${item.id}')">
                            <i class="fa-solid fa-expand"></i> View Credential Preview
                        </button>
                    </div>
                </div>
            `;

            gridContainer.appendChild(card);
        });
    }

    renderAchievements('all');

    // Filter clicks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterType = btn.getAttribute('data-achievement-filter');
            renderAchievements(filterType);
        });
    });
}

/* ==========================================================================
   8. CERTIFICATE MODAL PREVIEW & ZOOM
   ========================================================================== */
let currentZoom = 1;

function initCertificateModal() {
    const modalOverlay = document.getElementById('certModalOverlay');
    const closeBtn = document.getElementById('certModalClose');
    const zoomInBtn = document.getElementById('certModalZoomIn');
    const zoomOutBtn = document.getElementById('certModalZoomOut');
    const zoomResetBtn = document.getElementById('certModalZoomReset');
    const modalImg = document.getElementById('certModalImage');

    if (!modalOverlay) return;

    window.openCertModal = function(id) {
        const item = ACHIEVEMENTS_DATA.find(a => a.id === id);
        if (!item) return;

        const infoElem = document.getElementById('certModalInfo');
        if (modalImg) {
            modalImg.src = item.image;
            modalImg.alt = item.title;
            currentZoom = 1;
            modalImg.style.transform = `scale(${currentZoom})`;
        }

        if (infoElem) {
            infoElem.innerHTML = `
                <h3 style="font-size:1.2rem; color:var(--text-primary); margin-bottom:6px;">${item.title}</h3>
                <p style="color:var(--accent); font-family:var(--font-mono); font-size:0.9rem; margin-bottom:10px;">${item.issuer} • ${item.date}</p>
                <p style="color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">${item.description}</p>
            `;
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentZoom = 1;
        if (modalImg) modalImg.style.transform = 'scale(1)';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Zoom Controls
    if (zoomInBtn && modalImg) {
        zoomInBtn.addEventListener('click', () => {
            if (currentZoom < 2.5) {
                currentZoom += 0.25;
                modalImg.style.transform = `scale(${currentZoom})`;
            }
        });
    }

    if (zoomOutBtn && modalImg) {
        zoomOutBtn.addEventListener('click', () => {
            if (currentZoom > 0.75) {
                currentZoom -= 0.25;
                modalImg.style.transform = `scale(${currentZoom})`;
            }
        });
    }

    if (zoomResetBtn && modalImg) {
        zoomResetBtn.addEventListener('click', () => {
            currentZoom = 1;
            modalImg.style.transform = 'scale(1)';
        });
    }
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
