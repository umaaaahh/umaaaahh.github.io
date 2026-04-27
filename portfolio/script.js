const R2   = 'https://pub-b866534d27f44635ab85ddab56429f50.r2.dev/';
const BASE = 'https://umaaaahh.github.io/';

const projects = {
    lifework: {
        title: 'LifeWork — Internal Messages',
        tags: ['Social Commentary', 'Frontend', 'Immersive Fiction', 'Emerging Digital Cultures'],
        desc: 'A dystopian Slack-clone interface critiquing AI surveillance and corporate control. Every message, channel, and UI element tells the story of a worker trapped in a system that watches everything.',
        gifs: [R2 + 'lifework-slackchat.gif'],
        liveUrl: BASE + 'emerging/assignment3/slack.html'
    },
    patchwork: {
        title: 'Patchwork Cyborg',
        tags: ['Game Design', 'Systems Design', 'Interactive Fiction', 'Emerging Digital Cultures'],
        desc: "A dystopian survival game where you play as a gig worker upgrading biotech body parts to outlast New Naarm's exploitative economy.",
        gifs: [R2 + 'lifework-game.gif'],
        liveUrl: BASE + 'emerging/index'
    },
    rabi: {
        title: 'Rabi Island Sports Tournament',
        tags: ['Interactive Narrative', 'Cultural Design', 'Collaboration', 'Scroll-driven'],
        desc: "Commemorating 80 years of Banaban displacement and resilience through interactive village profiles and sports rivalries. Every design decision made in service of the community's story.",
        gifs: [R2 + 'rabi-island-tournament.gif'],
        liveUrl: BASE + 'narrative/index.html'
    },
    hiking: {
        title: 'Victorian Hiking Hub',
        tags: ['UX Research', 'Mapbox', 'Frontend', 'Information Architecture'],
        desc: 'A trail discovery platform built with modular JavaScript and Mapbox GL. Includes gear checklists, trip planning tools, and community-sourced route data.',
        gifs: [],
        liveUrl: BASE + 'uxui/index'
    },
    overthinker: {
        title: "The Overthinker's Typing Pad",
        tags: ['Expressive Tool', 'Frontend', 'Interaction Design', 'Studio'],
        desc: "A browser-based writing tool that visualises anxiety through interaction. As you type, the interface resists — text fades, glitches, and unravels.",
        gifs: [],
        liveUrl: BASE + 'Studio/assignment3/index.html'
    },
    scrollpoem: {
        title: 'Annabel Lee — Scroll Poem',
        tags: ['Interactive Narrative', 'Kinetic Typography', 'Scroll-driven'],
        desc: "Edgar Allan Poe's Annabel Lee reimagined with shadow-puppet aesthetics and scroll-driven parallax animation.",
        gifs: [R2 + 'scroll-poem.gif'],
        liveUrl: BASE + 'interactivemedia/Annabel%20Lee/index.html'
    },
    bagmap: {
        title: 'Bag Map',
        tags: ['Interactive Media', 'Spatial Design', 'Frontend'],
        desc: 'An interactive mapping experience exploring the relationship between everyday objects and place.',
        gifs: [],
        liveUrl: BASE + 'interactivemedia/assignment2/'
    }
};

// ============ MOBILE ============
function openMobilePanel(id)  { document.getElementById(id).classList.add('open'); }
function closeMobilePanel(id) { document.getElementById(id).classList.remove('open'); }

function toggleMobileFile(id, el) {
    const content = document.getElementById(id);
    const isOpen  = content.classList.contains('open');
    document.querySelectorAll('.mobile-file-content').forEach(f => f.classList.remove('open'));
    document.querySelectorAll('.mobile-file-row').forEach(f => f.classList.remove('selected'));
    if (!isOpen) { content.classList.add('open'); el.classList.add('selected'); }
}

// ============ CLOCK ============
function updateClock() {
    const now = new Date();
    const t   = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    const d   = document.getElementById('taskbar-clock'); if (d) d.textContent = t;
    const m   = document.getElementById('mobile-clock');  if (m) m.textContent = t;
}

window.addEventListener('load', () => {
    updateClock();
    setInterval(updateClock, 1000);
});

// ============ BOOT ============
function startBoot() {
    const splash = document.getElementById('splash-screen');
    const snd    = document.getElementById('boot-sound');
    if (snd) snd.load();
    splash.style.opacity = '0';
    setTimeout(() => {
        splash.style.display = 'none';
        document.getElementById('loading-screen').style.display = 'flex';
        runBootSequence(snd);
    }, 400);
}

function runBootSequence(snd) {
    const fill = document.getElementById('boot-bar-fill');
    const pct  = document.getElementById('boot-bar-pct');
    [{ p:15,t:400 },{ p:30,t:900 },{ p:48,t:1400 },{ p:65,t:1900 },{ p:82,t:2400 },{ p:100,t:3200 }]
        .forEach(s => setTimeout(() => { fill.style.width = s.p + '%'; pct.textContent = s.p + '%'; }, s.t));
    setTimeout(() => {
        if (snd) { snd.currentTime = 0; snd.play().catch(() => {}); }
        showGifFlash();
    }, 3200);
}

function showGifFlash() {
    document.getElementById('loading-screen').style.display = 'none';
    const flash = document.getElementById('gif-flash');
    flash.classList.add('flash-visible');
    setTimeout(() => {
        flash.classList.add('flash-out');
        setTimeout(() => {
            flash.style.display = 'none';
            document.getElementById('desktop').style.opacity = '1';
            scheduleShowcase();
        }, 600);
    }, 2000);
}

// ============ WINDOW MANAGEMENT ============
function openWindow(id) {
    const win = document.getElementById(id);
    if (win.classList.contains('window-open')) {
        win.classList.remove('window-jiggling');
        void win.offsetWidth;
        win.classList.add('window-jiggling');
        setTimeout(() => win.classList.remove('window-jiggling'), 400);
        bringToFront(win);
        return;
    }
    win.classList.remove('window-closing');
    void win.offsetWidth;
    win.classList.add('window-open', 'maximized');
    bringToFront(win);
}

function closeWindow(id) {
    const win = document.getElementById(id);
    win.classList.remove('window-open');
    win.classList.add('window-closing');
    setTimeout(() => {
        win.classList.remove('window-closing', 'maximized');
        const btn = win.querySelector('[data-action="maximize-window"]');
        if (btn) btn.setAttribute('aria-label', 'Maximize');
    }, 180);
}

function toggleMaximize(id) {
    const win           = document.getElementById(id);
    const isNowMaximized = win.classList.toggle('maximized');
    const btn           = win.querySelector('[data-action="maximize-window"]');
    if (btn) btn.setAttribute('aria-label', isNowMaximized ? 'Restore' : 'Maximize');
    bringToFront(win);
}

function bringToFront(win) {
    let maxZ = 10;
    document.querySelectorAll('.os-window').forEach(w => {
        const z = parseInt(w.style.zIndex) || 10;
        if (z > maxZ) maxZ = z;
    });
    win.style.zIndex = maxZ + 1;
}

function minimizeAll() {
    document.querySelectorAll('.os-window').forEach(w => {
        if (w.classList.contains('window-open')) closeWindow(w.id);
    });
    restoreAbout();
}

// ============ ABOUT — EXPAND / RESTORE ============
function expandAbout() {
    const el         = document.getElementById('showcase-about');
    const expandBtn  = document.getElementById('about-expand-btn');
    const restoreBtn = document.getElementById('about-restore-btn');

    if (el.style.display === 'none' || !el.classList.contains('showcase-visible')) {
        el.style.display    = 'block';
        el.style.opacity    = '1';
        el.style.transform  = 'scale(1)';
        el.classList.add('showcase-visible');
    }

    requestAnimationFrame(() => requestAnimationFrame(() => {
        el.classList.add('about-fullscreen');
        el.style.zIndex = '600';
        if (expandBtn)  expandBtn.style.display  = 'none';
        if (restoreBtn) restoreBtn.style.display = 'flex';
    }));
}

function restoreAbout() {
    const el         = document.getElementById('showcase-about');
    const expandBtn  = document.getElementById('about-expand-btn');
    const restoreBtn = document.getElementById('about-restore-btn');
    el.classList.remove('about-fullscreen');
    el.style.zIndex = '5';
    if (expandBtn)  expandBtn.style.display  = 'flex';
    if (restoreBtn) restoreBtn.style.display = 'none';
}

// ============ WORK — PROJECT PREVIEW ============
function showProjectPreview(key, el) {
    const project = projects[key];
    document.querySelectorAll('.file-item-large').forEach(f => f.classList.remove('selected'));
    el.classList.add('selected');

    document.getElementById('preview-project-title').textContent = project.title;
    document.getElementById('preview-project-desc').textContent  = project.desc;
    document.getElementById('preview-project-tags').innerHTML    = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

    const gifEl    = document.getElementById('preview-project-gifs');
    gifEl.innerHTML = '';
    if (project.gifs && project.gifs.length > 0) {
        gifEl.innerHTML = project.gifs.map(url => `<img src="${url}" alt="${project.title}" class="preview-gif">`).join('');
    } else if (project.liveUrl) {
        gifEl.innerHTML = `<iframe src="${project.liveUrl}" class="preview-embed" title="${project.title}" sandbox="allow-scripts allow-same-origin"></iframe>`;
    } else {
        gifEl.innerHTML = '<div class="preview-no-media">[ no preview available ]</div>';
    }
    gifEl.classList.remove('hidden');

    const liveBtn = document.getElementById('preview-live-btn');
    if (project.liveUrl) {
        liveBtn.classList.remove('hidden');
        liveBtn.onclick = () => window.open(project.liveUrl, '_blank');
    } else {
        liveBtn.classList.add('hidden');
    }

    document.getElementById('project-preview-pane').classList.remove('hidden');
}

// ============ BEBO PLAYER (SoundCloud) ============
(function () {
    const SC_API = 'https://w.soundcloud.com/player/api.js';
    let widget   = null;
    let playing  = false;
    let barRAF   = null;
    const getBars = () => document.querySelectorAll('.bebo-player-bar');

    function animateBars() {
        getBars().forEach(b => { b.style.height = (3 + Math.random() * 17) + 'px'; });
        barRAF = requestAnimationFrame(animateBars);
    }
    function startBars() { if (!barRAF) animateBars(); }
    function stopBars()  {
        if (barRAF) { cancelAnimationFrame(barRAF); barRAF = null; }
        getBars().forEach(b => b.style.height = '2px');
    }

    function initWidget(cb) {
        if (widget) { cb(); return; }
        const loadApi = done => {
            if (window.SC) { done(); return; }
            const s   = document.createElement('script');
            s.src     = SC_API;
            s.onload  = done;
            document.head.appendChild(s);
        };
        loadApi(() => {
            const iframe = document.getElementById('sc-iframe');
            widget       = window.SC.Widget(iframe);
            widget.bind(window.SC.Widget.Events.READY, () => { widget.setVolume(80); cb(); });
            widget.bind(window.SC.Widget.Events.FINISH, () => {
                playing = false;
                const btn = document.getElementById('bebo-play-btn');
                if (btn) btn.textContent = '▶';
                stopBars();
            });
        });
    }

    window.autoplayBebo = function () {
        initWidget(() => {
            widget.play();
            playing = true;
            const btn = document.getElementById('bebo-play-btn');
            if (btn) btn.textContent = '⏸';
            startBars();
        });
    };

    window.beboToggle = function () {
        initWidget(() => {
            if (playing) {
                widget.pause(); playing = false;
                const btn = document.getElementById('bebo-play-btn');
                if (btn) btn.textContent = '▶';
                stopBars();
            } else {
                widget.play(); playing = true;
                const btn = document.getElementById('bebo-play-btn');
                if (btn) btn.textContent = '⏸';
                startBars();
            }
        });
    };

    window.beboSeek   = secs => { if (widget) widget.getPosition(p => widget.seekTo(Math.max(0, p + secs * 1000))); };
    window.beboVolume = val  => { if (widget) widget.setVolume(parseInt(val)); };
})();

// ============ SPARKLE CANVAS ============
(function () {
    function initSparkles() {
        const canvas = document.getElementById('sparkle-canvas');
        if (!canvas) return;
        const parent = canvas.parentElement;
        canvas.width  = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        const ctx    = canvas.getContext('2d');
        const COLORS = ['#ff69b4','#ffb6c1','#c0c0c0','#fff','#b44fd4','#4f8fd4','#ffe4e1','#ffd700'];
        const sparks = Array.from({ length: 38 }, () => ({
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            r:     1 + Math.random() * 2.5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random(),
            speed: 0.008 + Math.random() * 0.02,
            phase: Math.random() * Math.PI * 2,
            vy:    -0.2 - Math.random() * 0.3
        }));

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            sparks.forEach(s => {
                s.phase += s.speed;
                s.alpha  = 0.4 + 0.6 * Math.abs(Math.sin(s.phase));
                s.y     += s.vy;
                if (s.y < -4) s.y = canvas.height + 4;
                ctx.save();
                ctx.globalAlpha  = s.alpha;
                ctx.fillStyle    = s.color;
                ctx.shadowColor  = s.color;
                ctx.shadowBlur   = 6;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            requestAnimationFrame(draw);
        }
        draw();

        window.addEventListener('resize', () => {
            canvas.width  = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        });
    }
    window._initSparkles = initSparkles;
})();

// ============ SHOWCASE SCHEDULING ============
const SHOWCASE_ORDER   = ['showcase-about', 'showcase-overthinker'];
const SHOWCASE_STAGGER = 380;
const SHOWCASE_DELAY   = 3000;

function scheduleShowcase() {
    if (window.innerWidth <= 480) return;

    SHOWCASE_ORDER.forEach((id, i) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (!el) return;
            el.style.display = 'block';
            requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('showcase-visible')));
        }, SHOWCASE_DELAY + i * SHOWCASE_STAGGER);
    });

    setTimeout(showMsnToast,                                   SHOWCASE_DELAY + SHOWCASE_STAGGER + 800);
    setTimeout(() => { if (window.autoplayBebo)  window.autoplayBebo(); },  SHOWCASE_DELAY + 600);
    setTimeout(() => { if (window._initSparkles) window._initSparkles(); }, SHOWCASE_DELAY + 400);
}

function showMsnToast() {
    const toast = document.getElementById('msn-toast');
    if (!toast) return;
    toast.classList.add('msn-toast-visible');
    setTimeout(() => { if (toast.classList.contains('msn-toast-visible')) dismissMsn(); }, 8000);
}

function dismissMsn() {
    const toast = document.getElementById('msn-toast');
    if (toast) toast.classList.remove('msn-toast-visible');
}

function openLifeWork() {
    dismissMsn();
    openWindow('lifework-window');
}

function dismissShowcase(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === 'showcase-about' && el.classList.contains('about-fullscreen')) restoreAbout();
    el.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    el.style.opacity    = '0';
    el.style.transform  = 'scale(0.85)';
    setTimeout(() => {
        el.style.display   = 'none';
        el.style.opacity   = '';
        el.style.transform = '';
        el.classList.remove('showcase-visible');
    }, 160);
}

// ============ DOM READY — EVENT WIRING ============
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.os-window').forEach(win => {
        win.addEventListener('mousedown', () => bringToFront(win));
    });

    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('keydown', e => { if (e.key === 'Enter') icon.click(); });
    });

    const volSlider = document.getElementById('bebo-vol');
    if (volSlider) volSlider.addEventListener('input', e => beboVolume(e.target.value));

    document.addEventListener('click', e => {
        const el = e.target.closest('[data-action]');
        if (!el) return;
        const { action, target, project, secs, url } = el.dataset;
        switch (action) {
            case 'start-boot':       startBoot();                   break;
            case 'expand-about':     expandAbout();                 break;
            case 'restore-about':    restoreAbout();                break;
            case 'dismiss-showcase': dismissShowcase(target);       break;
            case 'open-window':      openWindow(target);            break;
            case 'close-window':     closeWindow(target);           break;
            case 'maximize-window':  toggleMaximize(target);        break;
            case 'minimize-all':     minimizeAll();                 break;
            case 'bebo-toggle':      beboToggle();                  break;
            case 'bebo-seek':        beboSeek(parseInt(secs));      break;
            case 'open-lifework':    openLifeWork();                break;
            case 'dismiss-msn':      dismissMsn();                  break;
            case 'open-panel':       openMobilePanel(target);       break;
            case 'close-panel':      closeMobilePanel(target);      break;
            case 'toggle-file':      toggleMobileFile(target, el);  break;
            case 'show-project':     showProjectPreview(project, el); break;
            case 'open-url':         window.open(url, '_blank');    break;
        }
    });
});