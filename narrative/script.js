// Loader
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
    }, 2000);
});

// Smooth scroll-triggered animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Story lines
            if (entry.target.classList.contains('story-section')) {
                const lines = entry.target.querySelectorAll('.story-line');
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('animate');
                    }, index * 800);
                });
            }

            // Section titles and subtitles
            if (entry.target.classList.contains('section-title')) {
                entry.target.classList.add('animate');
            }
            if (entry.target.classList.contains('section-subtitle')) {
                entry.target.classList.add('animate');
            }

            // Village cards
            if (entry.target.classList.contains('village-card')) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
            }

            // Timeline items
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.story-section, .section-title, .section-subtitle, .village-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Navigation show/hide
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});

// Smooth scrolling for navigation links
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

// Cursor trail effect
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    const cursor = document.getElementById('cursor');
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    cursor.style.opacity = '0.6';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor trail on mobile
if (window.innerWidth <= 768) {
    document.getElementById('cursor').style.display = 'none';
}

// Parallax effect for hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Interactive hover effects for village cards
document.querySelectorAll('.village-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
    });
});

// Dynamic text typing effect for story lines
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Enhanced scroll-triggered storytelling
const storyObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('story-line')) {
            const text = entry.target.textContent;
            entry.target.classList.add('animate');
            
            // Add typing effect for large story lines
            if (entry.target.classList.contains('large')) {
                setTimeout(() => {
                    typeWriter(entry.target, text, 30);
                }, 500);
            }
        }
    });
}, { threshold: 0.8 });

document.querySelectorAll('.story-line').forEach(line => {
    storyObserver.observe(line);
});

// Add floating animation to timeline elements
function createFloatingElements() {
    const timeline = document.querySelector('.cultural-timeline');
    if (timeline) {
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.width = Math.random() * 4 + 'px';
            dot.style.height = dot.style.width;
            dot.style.background = 'rgba(78,205,196,0.3)';
            dot.style.borderRadius = '50%';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            dot.style.animationDelay = Math.random() * 10 + 's';
            timeline.appendChild(dot);
        }
    }
}
createFloatingElements();

// Add village card click interactions
document.querySelectorAll('.village-card').forEach(card => {
    card.addEventListener('click', function() {
        const villageName = this.querySelector('.village-name').textContent;
        
        // Create a modal-like overlay effect
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(26,26,46,0.9);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 3rem;
                border-radius: 20px;
                max-width: 500px;
                text-align: center;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            ">
                <h2 style="color: #1A1A2E; margin-bottom: 1rem; font-size: 2rem;">${villageName}</h2>
                <p style="color: #666; font-size: 1.1rem; margin-bottom: 2rem;">
                    Discover the unique story and traditions of ${villageName} village. 
                    Each community brings their own heritage to the tournament.
                </p>
                <button onclick="this.closest('[style*=\"fixed\"]').remove()" style="
                    background: #4ECDC4;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.3s ease;
                " onmouseover="this.style.background='#26A69A'" onmouseout="this.style.background='#4ECDC4'">
                    Close
                </button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.firstElementChild.style.transform = 'scale(1)';
        }, 10);
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        window.scrollBy(0, window.innerHeight);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy(0, -window.innerHeight);
    }
});

// Performance optimization: pause animations when not visible
document.addEventListener('visibilitychange', function() {
    const animations = document.querySelectorAll('[style*="animation"]');
    animations.forEach(el => {
        if (document.hidden) {
            el.style.animationPlayState = 'paused';
        } else {
            el.style.animationPlayState = 'running';
        }
    });
});