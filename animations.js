/**
 * ==============================================================================
 * SHIVAM KASAUDHAN PORTFOLIO — ANIMATIONS (animations.js)
 * Particles Canvas, Custom Cursor, Scroll Reveal, 3D Card Tilt
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticlesCanvas();
    initCustomCursor();
    initScrollReveal();
    initCard3DTilt();
});

/* ==========================================================================
   1. INTERACTIVE PARTICLES CANVAS
   ========================================================================== */
function initParticlesCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 55);
    const maxDistance = 120;
    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('resize', () => {
        width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1;
            this.baseRadius = this.radius;
            const rand = Math.random();
            if (rand > 0.6) {
                this.color = 'rgba(192, 84, 147,'; // Pink
                this.shadow = 'rgba(192, 84, 147, 0.5)';
            } else if (rand > 0.3) {
                this.color = 'rgba(136, 68, 180,'; // Purple
                this.shadow = 'rgba(136, 68, 180, 0.5)';
            } else {
                this.color = 'rgba(78, 73, 209,'; // Blue
                this.shadow = 'rgba(78, 73, 209, 0.5)';
            }
            this.alpha = Math.random() * 0.5 + 0.25;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce on edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.hypot(dx, dy);

                if (dist < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2.5;
                    this.y -= Math.sin(angle) * force * 2.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${this.color} ${this.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.shadow;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);

                if (dist < maxDistance) {
                    const alpha = (1 - dist / maxDistance) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(136, 68, 180, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. CUSTOM CURSOR & FOLLOWER
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (!cursor || !follower) return;

    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    // Smooth follower physics
    function follow() {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(follow);
    }
    follow();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, .stat-card, .project-card, .achievement-card, .hobby-card, .tech-icon-card'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('cursor-view-lens');
            cursor.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('cursor-view-lens');
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        });
    });
}

/* ==========================================================================
   3. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80); // Staggered reveal
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. 3D CARD TILT ON MOUSE MOVE
   ========================================================================== */
function initCard3DTilt() {
    const tiltCards = document.querySelectorAll(
        '.project-card, .stat-card, .timeline-card, .hobby-card, .tech-icon-card'
    );

    if (window.matchMedia('(pointer: coarse)').matches) return;

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
