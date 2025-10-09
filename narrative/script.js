// ---------- helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// remove no-js
document.documentElement.classList.remove('no-js');

// ---------- NAV: reveal after hero ----------
(() => {
  const navbar = $('#navbar');
  if (!navbar) return;
  let ticking = false;

  const update = () => {
    const threshold = window.innerHeight - 100;
    if (window.scrollY > threshold) navbar.classList.add('visible');
    else navbar.classList.remove('visible');
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  update();
})();

// ---------- Smooth anchor scroll (native with graceful fallback) ----------
(() => {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if ('scrollBehavior' in document.documentElement.style) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const top = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top, left: 0, behavior: 'auto' });
      }
    });
  });
})();

// ---------- Hero video autoplay + visibility ----------
(() => {
  const heroVideo = $('.hero-video');
  if (!heroVideo) return;

  const tryPlay = () => heroVideo.play().catch(() => {});
  if (heroVideo.readyState >= 2) tryPlay();
  else heroVideo.addEventListener('loadeddata', tryPlay, { once: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (!heroVideo.paused) heroVideo.pause(); }
    else { if (heroVideo.paused) tryPlay(); }
  });
})();

// ---------- Intersection reveal for sections ----------
(() => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.classList.add('inview');
    });
  }, { threshold: 0.3 });

  $$('section').forEach(sec => io.observe(sec));
})();

// ---------- Journey: loop by default, optional scroll-scrub mode ----------
(() => {
  const sec = $('.journey-section');
  const video = $('#journey-video');
  const text  = $('#journey-text');
  if (!sec || !video || !text) return;

  const params = new URLSearchParams(location.search);
  const dataMode = (sec.dataset.mode || '').trim().toLowerCase();
  const forceScrub = params.get('mode') === 'scrub' || dataMode === 'scrub';
  const forceLoop  = params.get('mode') === 'loop'  || dataMode === 'loop';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Default: LOOP (as per your preference), unless scrub explicitly requested
  let mode = forceScrub ? 'scrub' : 'loop';
  if (forceLoop) mode = 'loop';
  if (prefersReduced) mode = 'loop';

  // Pause offscreen videos for battery
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (target.tagName !== 'VIDEO') return;
      if (isIntersecting) target.play().catch(()=>{});
      else target.pause();
    });
  }, { threshold: 0.2 });
  io.observe(video);

  function enableLoop() {
    // kill any triggers if present
    if (window.ScrollTrigger) {
      ScrollTrigger.getAll().forEach(st => { if (st.trigger && sec.contains(st.trigger)) st.kill(); });
    }
    sec.classList.add('fallback');
    video.loop = true; video.muted = true; video.playsInline = true; video.removeAttribute('controls');
    const tryPlay = () => video.play().catch(()=>{});
    if (video.readyState >= 2) tryPlay(); else video.addEventListener('loadeddata', tryPlay, { once: true });

    // quick fade for text (no scrub)
    text.style.opacity = 1; text.style.transform = 'translateY(0)';
  }

  function enableScrub() {
    if (!(window.gsap && window.ScrollTrigger)) { enableLoop(); return; }
    gsap.registerPlugin(ScrollTrigger);

    video.pause();
    video.loop = false;
    video.currentTime = 0;
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    // prime decoder on some browsers
    video.play().then(() => video.pause()).catch(()=>{});

    const init = () => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const d = video.duration || 0;
          const t = d * self.progress;
          video.currentTime = isFinite(t) ? Math.max(0, Math.min(d, t)) : 0;
        }
      });

      gsap.to(text, {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: sec, start: 'top top', end: '15% top', scrub: 1 }
      });
    };

    if (video.readyState >= 1) init();
    else video.addEventListener('loadedmetadata', init, { once: true });

    // safety net if metadata is slow
    setTimeout(() => { if (video.readyState < 1) enableLoop(); }, 2000);
  }

  if (mode === 'scrub') enableScrub(); else enableLoop();
})();

// ---------- Minor GPU saver for overlays when tab hidden ----------
(() => {
  const root = document.documentElement;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) root.style.setProperty('--overlay-opacity', '0.3');
    else root.style.removeProperty('--overlay-opacity');
  });
})();