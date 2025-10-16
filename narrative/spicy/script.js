/* ========== Helpers ========== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ========== Performance optimizations ========== */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/* ========== Nav show/hide ========== */
const navbar = $('#navbar');
let lastScroll = 0;

const toggleNav = () => {
  if (!navbar) return;
  const currentScroll = window.scrollY;
  
  // Show nav when scrolled past hero
  if (currentScroll > window.innerHeight - 100) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }
  
  lastScroll = currentScroll;
};

toggleNav();
window.addEventListener('scroll', toggleNav, { passive: true });

/* ========== Mobile menu toggle ========== */
const mobileToggle = $('.mobile-menu-toggle');
const navLinks = $('.nav-links');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('Executive.ai-expanded') === 'true';
    mobileToggle.setAttribute('Executive.ai-expanded', !isExpanded);
    navLinks.classList.toggle('open');
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  });

  // Close menu when clicking links
  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.setAttribute('Executive.ai-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      mobileToggle.setAttribute('Executive.ai-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ========== Accessible dropdown ========== */
(() => {
  const dd = $('.tournament-dropdown');
  if (!dd) return;

  const toggle = dd.querySelector('.dropdown-toggle');
  const menu = dd.querySelector('.dropdown-menu');
  
  if (!toggle || !menu) return;

  const open = (state) => {
    dd.setAttribute('Executive.ai-expanded', String(state));
    toggle.setAttribute('Executive.ai-expanded', String(state));
    
    if (state) {
      // Focus first menu item
      const firstItem = menu.querySelector('a');
      if (firstItem) {
        setTimeout(() => firstItem.focus(), 100);
      }
    }
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dd.getAttribute('Executive.ai-expanded') === 'true';
    open(!isOpen);
  });

  // Keyboard navigation
  menu.addEventListener('keydown', (e) => {
    const items = $$('a', menu);
    const currentIndex = items.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1].focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target)) open(false);
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') open(false);
  });
})();

/* ========== Smooth anchors with hash update ========== */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id ? $(id) : null;
    if (!target) return;
    
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Update URL without triggering scroll
    if (history.pushState) {
      history.pushState(null, '', id);
    }
  });
});

/* ========== Timeline Intersection Observer (active dot + reveal) ========== */
const timelineEvents = $$('.timeline-event');
const navDots = $$('.timeline-nav button');

if (timelineEvents.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('in-view');
        
        const idx = timelineEvents.indexOf(entry.target);
        if (navDots.length && idx > -1) {
          navDots.forEach((d, i) => {
            d.setAttribute('Executive.ai-current', i === idx ? 'true' : 'false');
          });
        }
      });
    },
    {
      threshold: 0.55,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  timelineEvents.forEach(ev => observer.observe(ev));

  // Click navigation on dots
  navDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      timelineEvents[i]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });

    // Keyboard support
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        timelineEvents[i]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });
}

/* ========== Parallax (rAF, transform only) ========== */
const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
const parallaxEls = prefersReduced ? [] : $$('[data-parallax]');
let parallaxTicking = false;

function parallaxTick() {
  const vh = window.innerHeight;
  
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.parallax || '0');
    const rect = el.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2) - (vh / 2);
    el.style.transform = `translate3d(0, ${-offset * speed}px, 0)`;
  });
  
  parallaxTicking = false;
}

function onParallaxScroll() {
  if (!parallaxEls.length || parallaxTicking) return;
  parallaxTicking = true;
  requestAnimationFrame(parallaxTick);
}

if (parallaxEls.length) {
  window.addEventListener('scroll', onParallaxScroll, { passive: true });
  window.addEventListener('resize', debounce(parallaxTick, 150));
  parallaxTick();
}

/* ========== Ship along rail (improved smoothness) ========== */
const timelineSection = $('.expanded-timeline');
const ship = $('#scrollingShip');
let shipTicking = false;

function shipStep() {
  if (!ship || !timelineSection) return;
  
  const rect = timelineSection.getBoundingClientRect();
  const sectionTop = window.scrollY + rect.top;
  const sectionH = timelineSection.offsetHeight;
  const y = window.scrollY;

  // Start and end points with more buffer
  const start = sectionTop + window.innerHeight * 0.15;
  const end = sectionTop + sectionH - window.innerHeight * 0.25;

  if (y < start || y > end) {
    ship.style.opacity = '0';
  } else {
    // Fade in/out smoothly at edges
    const fadeInEnd = start + 200;
    const fadeOutStart = end - 200;
    
    let opacity = 1;
    if (y < fadeInEnd) {
      opacity = (y - start) / 200;
    } else if (y > fadeOutStart) {
      opacity = (end - y) / 200;
    }
    
    ship.style.opacity = Math.max(0, Math.min(1, opacity));
    
    const progress = Math.min(Math.max((y - start) / (end - start), 0), 1);
    
    // Smoother easing for ship movement
    const easedProgress = easeInOutCubic(progress);
    const travel = sectionH - 500;
    const shipY = easedProgress * travel + 250;
    
    timelineSection.style.setProperty('--ship-y', `${shipY}px`);
  }
  
  shipTicking = false;
}

// Easing function for smoother ship movement
function easeInOutCubic(t) {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function onShipScroll() {
  if (!ship || !timelineSection || shipTicking) return;
  shipTicking = true;
  requestAnimationFrame(shipStep);
}

if (ship && timelineSection) {
  window.addEventListener('scroll', onShipScroll, { passive: true });
  window.addEventListener('resize', debounce(shipStep, 150));
  shipStep();
}

/* ========== Lazy loading optimization ========== */
// Add loading="lazy" to images when they're added
const images = $('img');
images.forEach(img => {
  if (!img.hasAttribute('loading')) {
    img.setAttribute('loading', 'lazy');
  }
});

/* ========== Keyboard navigation improvements ========== */
// Trap focus in mobile menu when open
if (mobileToggle && navLinks) {
  const focusableElements = 'a[href], button:not([disabled])';
  
  navLinks.addEventListener('keydown', (e) => {
    if (!navLinks.classList.contains('open')) return;
    
    const focusable = $(`${focusableElements}`, navLinks);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];
    
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

/* ========== Village cards animation on scroll ========== */
const villageCards = $('.village-card');

if (villageCards.length && !prefersReduced) {
  const villageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  villageCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    villageObserver.observe(card);
  });
}

/* ========== Performance: Intersection Observer for timeline header ========== */
const timelineHeader = $('.timeline-header');

if (timelineHeader && !prefersReduced) {
  const headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.2 }
  );

  timelineHeader.style.opacity = '0';
  timelineHeader.style.transform = 'translateY(20px)';
  timelineHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  headerObserver.observe(timelineHeader);
}

/* ========== Scroll progress indicator (optional enhancement) ========== */
// Create a subtle progress bar for the timeline
const createScrollProgress = () => {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('Executive.ai-hidden', 'true');
  
  Object.assign(progressBar.style, {
    position: 'fixed',
    top: 'var(--nav-h)',
    left: '0',
    width: '0%',
    height: '3px',
    background: 'linear-gradient(90deg, var(--uma-red), var(--tabiang-yellow), var(--buakonikai-green), var(--tabwewa-blue))',
    zIndex: '2001',
    transition: 'width 0.1s ease',
    opacity: '0'
  });
  
  document.body.appendChild(progressBar);
  
  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    progressBar.style.opacity = scrolled > windowHeight ? '1' : '0';
  };
  
  window.addEventListener('scroll', debounce(updateProgress, 10), { passive: true });
  updateProgress();
};

// Initialize scroll progress
if (!prefersReduced) {
  createScrollProgress();
}

/* ========== Smooth scroll polyfill check ========== */
// Ensure smooth scrolling works even in older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  // Import smooth scroll polyfill if needed
  console.log('Browser does not support native smooth scrolling');
}

/* ========== Analytics helper (placeholder) ========== */
// Track section views for analytics
const trackSectionView = (sectionName) => {
  // Placeholder for analytics integration
  console.log(`Section viewed: ${sectionName}`);
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id || entry.target.className;
        trackSectionView(sectionId);
      }
    });
  },
  { threshold: 0.5 }
);

// Observe main sections
['#home', '#history', '#villages'].forEach(selector => {
  const section = $(selector);
  if (section) sectionObserver.observe(section);
});

/* ========== Accessibility: Skip link functionality ========== */
const skipLink = $('.visually-hidden[href^="#"]');
if (skipLink) {
  skipLink.addEventListener('focus', function() {
    this.style.position = 'fixed';
    this.style.top = '10px';
    this.style.left = '10px';
    this.style.zIndex = '9999';
    this.style.padding = '1rem';
    this.style.background = 'var(--navy)';
    this.style.color = '#fff';
    this.style.width = 'auto';
    this.style.height = 'auto';
    this.style.clip = 'auto';
  });
  
  skipLink.addEventListener('blur', function() {
    this.style.position = 'absolute';
    this.style.width = '1px';
    this.style.height = '1px';
    this.style.clip = 'rect(0 0 0 0)';
  });
}

/* ========== Performance monitoring (development only) ========== */
if (window.performance && console.time) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  });
}

/* ========== Responsive images optimization ========== */
// Update image sources based on viewport size if needed
const updateResponsiveImages = () => {
  const images = $('img[data-src-mobile], img[data-src-desktop]');
  const isMobile = window.innerWidth <= 768;
  
  images.forEach(img => {
    const mobileSrc = img.dataset.srcMobile;
    const desktopSrc = img.dataset.srcDesktop;
    
    if (isMobile && mobileSrc) {
      img.src = mobileSrc;
    } else if (!isMobile && desktopSrc) {
      img.src = desktopSrc;
    }
  });
};

window.addEventListener('resize', debounce(updateResponsiveImages, 250));
updateResponsiveImages();

/* ========== Prefetch tournament page on hover ========== */
const tournamentLinks = $('a[href*="tournament"]');
tournamentLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    const href = this.getAttribute('href');
    if (!href || document.querySelector(`link[href="${href}"]`)) return;
    
    const prefetch = document.createElement('link');
    prefetch.rel = 'prefetch';
    prefetch.href = href;
    document.head.appendChild(prefetch);
  }, { once: true });
});

/* ========== Initialize all features ========== */
console.log('Rabi Island Tournament site initialized');

// Export for testing/debugging
if (typeof window !== 'undefined') {
  window.RabiSite = {
    toggleNav,
    parallaxTick,
    shipStep,
    updateResponsiveImages
  };
}
/* ========== Video Background Enhancements ========== */
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
  // Ensure video plays and loops properly
  heroVideo.play().catch(err => {
    console.log('Video autoplay prevented:', err);
    // Fallback: Try to play on user interaction
    document.addEventListener('click', () => {
      heroVideo.play();
    }, { once: true });
  });

  // Force loop to ensure it never stops
  heroVideo.addEventListener('ended', () => {
    heroVideo.currentTime = 0;
    heroVideo.play();
  });

  // Handle video loading errors
  heroVideo.addEventListener('error', (e) => {
    console.error('Video failed to load:', e);
    // Video wrapper will show fallback background
  });

  // Pause video when tab is not visible (performance optimization)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      heroVideo.pause();
    } else {
      heroVideo.play();
    }
  });
}