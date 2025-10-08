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

// Mining Section - Text fade in only (video autoplays)
const miningText = document.getElementById('mining-text');

gsap.to(miningText, {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: '.mining-section',
    start: 'top center',
    end: 'top top',
    scrub: 1
  }
});

// Journey Section - SCROLL-SCRUB VIDEO (the showcase effect!)
const journeyVideo = document.getElementById('journey-video');
const journeyText = document.getElementById('journey-text');

journeyVideo.addEventListener('loadedmetadata', () => {
  ScrollTrigger.create({
    trigger: '.journey-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    onUpdate: (self) => {
      const targetTime = journeyVideo.duration * self.progress;
      // Only update if difference is significant (performance optimization)
      if (Math.abs(journeyVideo.currentTime - targetTime) > 0.1) {
        journeyVideo.currentTime = targetTime;
      }
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
    scrub: 0.5
  }
});

// Cultural Section - Text fade in only (video autoplays)
const culturalText = document.getElementById('cultural-text');

gsap.to(culturalText, {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: '.cultural-section',
    start: 'top center',
    end: 'top top',
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
// Hero video
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.play().catch(err => {
    console.log('Hero video autoplay prevented:', err);
  });
}

// Autoplay videos (mining and cultural)
const miningVideo = document.getElementById('mining-video');
const culturalVideo = document.getElementById('cultural-video');

[miningVideo, culturalVideo].forEach(video => {
  if (video) {
    video.play().catch(err => {
      console.log('Video autoplay prevented:', err);
      // Fallback: try to play on user interaction
      document.addEventListener('click', () => {
        video.play();
      }, { once: true });
    });
  }
});

// Pause videos when not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    [heroVideo, miningVideo, culturalVideo].forEach(video => {
      if (video && !video.paused) {
        video.pause();
      }
    });
  } else {
    [heroVideo, miningVideo, culturalVideo].forEach(video => {
      if (video && video.paused) {
        video.play();
      }
    });
  }
});