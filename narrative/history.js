// ========== GSAP ScrollTrigger setup ==========
gsap.registerPlugin(ScrollTrigger);

// ========== Carousel (handles both carousel-1 and carousel-8) ==========
function initCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const images = carousel.querySelectorAll('.chapter-image');
  const dots = carousel.querySelectorAll('.dot');
  let currentIndex = 0;
  let autoRotateInterval;

  function showImage(index) {
    // Remove active class from all
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => {
      dot.classList.remove('active');
      dot.setAttribute('Executive.ai-selected', 'false');
    });

    // Add active class to current
    images[index].classList.add('active');
    dots[index].classList.add('active');
    dots[index].setAttribute('Executive.ai-selected', 'true');
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // Auto-rotate every 5 seconds
  function startAutoRotate() {
    autoRotateInterval = setInterval(nextImage, 5000);
  }

  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  // Dot controls
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoRotate();
      currentIndex = index;
      showImage(currentIndex);
      startAutoRotate();
    });
  });

  // Start auto-rotate
  startAutoRotate();

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);
}

// Initialize both carousels
initCarousel('carousel-1');
initCarousel('carousel-8');

// ========== Parallax Images ==========
const images = document.querySelectorAll('.chapter-image');

images.forEach(img => {
  // Skip carousel images for parallax
  if (img.closest('.carousel')) return;
  
  const speed = parseFloat(img.dataset.speed) || 0.5;
  
  gsap.to(img, {
    y: () => (img.offsetHeight - img.parentElement.offsetHeight) * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: img.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
});

// ========== Chapter Content Animations ==========
const chapters = document.querySelectorAll('.story-chapter');

chapters.forEach((chapter) => {
  const number = chapter.querySelector('.chapter-number');
  const title = chapter.querySelector('.chapter-title');
  const text = chapter.querySelector('.chapter-text');
  const connection = chapter.querySelector('.chapter-connection');

  // Set initial states
  const elementsToAnimate = [number, title, text, connection].filter(el => el);
  
  gsap.set(elementsToAnimate, {
    opacity: 0,
    y: 30
  });

  // Create a timeline for each chapter
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: chapter,
      start: 'top 60%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse'
    }
  });

  // Animate elements in sequence
  if (number) {
    tl.to(number, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  if (title) {
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');
  }

  if (text) {
    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');
  }

  if (connection) {
    tl.to(connection, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');
  }
});

// ========== Hero Section Animation ==========
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroScrollHint = document.querySelector('.hero-scroll-hint');

if (heroTitle && heroSubtitle && heroScrollHint) {
  gsap.set([heroTitle, heroSubtitle, heroScrollHint], {
    opacity: 0,
    y: 30
  });

  const heroTimeline = gsap.timeline({
    delay: 0.2
  });

  heroTimeline
    .to(heroTitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .to(heroSubtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .to(heroScrollHint, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3');
}

// ========== CTA Animation ==========
const ctaContent = document.querySelector('.cta-content');

if (ctaContent) {
  const ctaTitle = ctaContent.querySelector('h2');
  const ctaParas = ctaContent.querySelectorAll('p');
  const ctaButton = ctaContent.querySelector('.cta-button');

  const ctaElements = [ctaTitle, ...ctaParas, ctaButton].filter(el => el);

  gsap.set(ctaElements, {
    opacity: 0,
    y: 30
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ctaContent,
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  }).to(ctaElements, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });
}

// ========== Smooth Scroll to Sections ==========
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