// ========== Nav visibility on scroll ==========
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > window.innerHeight - 100) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
      ticking = false;
    });
    ticking = true;
  }
});

// ========== GSAP ScrollTrigger setup ==========
gsap.registerPlugin(ScrollTrigger);

// Journey Section - SCROLL-SCRUB VIDEO (plays forward and reverse)
const journeyVideo = document.getElementById('journey-video');
const journeyText = document.getElementById('journey-text');

journeyVideo.addEventListener('loadedmetadata', () => {
  ScrollTrigger.create({
    trigger: '.journey-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: (self) => {
      journeyVideo.currentTime = journeyVideo.duration * self.progress;
    }
  });
});

gsap.to(journeyText, {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: '.journey-section',
    start: 'top top',
    end: '15% top',
    scrub: 1
  }
});

// ========== Smooth scrolling ==========
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

// ========== Video playback handling ==========
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.play().catch(err => {
    console.log('Hero video autoplay prevented:', err);
  });
}

// Pause videos when not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (heroVideo && !heroVideo.paused) heroVideo.pause();
  } else {
    if (heroVideo && heroVideo.paused) heroVideo.play();
  }
});