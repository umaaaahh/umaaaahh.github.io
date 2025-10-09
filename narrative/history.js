// ========== GSAP ScrollTrigger setup ==========
gsap.registerPlugin(ScrollTrigger);

// ========== Carousel ==========
const carousel = document.getElementById('carousel-1');
if (carousel) {
  const images = carousel.querySelectorAll('.chapter-image');
  const dots = carousel.querySelectorAll('.dot');
  let currentIndex = 0;
  let autoRotateInterval;

  function showImage(index) {
    // Remove active class from all
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current
    images[index].classList.add('active');
    dots[index].classList.add('active');
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

// ========== Parallax Images ==========
const images = document.querySelectorAll('.chapter-image');

images.forEach(img => {
  // Skip carousel images for parallax
  if (img.closest('.carousel')) return;
  
  const speed = img.dataset.speed || 0.5;
  
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

chapters.forEach((chapter, index) => {
  const number = chapter.querySelector('.chapter-number');
  const title = chapter.querySelector('.chapter-title');
  const text = chapter.querySelector('.chapter-text');
  const connection = chapter.querySelector('.chapter-connection');

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