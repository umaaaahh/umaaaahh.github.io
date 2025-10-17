// Countdown Timer
function updateCountdown() {
  const targetDate = new Date('2025-12-15T00:00:00');
  const now = new Date();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }
}

// Sport Tab Switcher
function switchSport(sport) {
  const tabs = document.querySelectorAll('.sport-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  const activeTab = document.querySelector(`.sport-tab.${sport}`);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

// Hero video autoplay + visibility
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const tryPlay = () => heroVideo.play().catch(() => {});
  
  if (heroVideo.readyState >= 2) {
    tryPlay();
  } else {
    heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (!heroVideo.paused) heroVideo.pause();
    } else {
      if (heroVideo.paused) tryPlay();
    }
  });
}

// Initialize
updateCountdown();
setInterval(updateCountdown, 1000);

// Background Music Toggle with Autoplay
document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const toggle = document.getElementById('music-toggle');

  if (music && toggle) {
    const musicOn = toggle.querySelector('.music-on');
    const musicOff = toggle.querySelector('.music-off');
    
    // Set volume to 50%
    music.volume = 0.1;
    
    // Try to autoplay
    let isPlaying = false;
    music.play()
      .then(() => {
        isPlaying = true;
        musicOn.style.display = 'inline';
        musicOff.style.display = 'none';
      })
      .catch(() => {
        // Autoplay blocked - show muted icon
        console.log('Autoplay blocked - user must click to play');
        musicOn.style.display = 'none';
        musicOff.style.display = 'inline';
      });

    // Toggle on click
    toggle.addEventListener('click', () => {
      if (isPlaying) {
        music.pause();
        musicOn.style.display = 'none';
        musicOff.style.display = 'inline';
      } else {
        music.play().catch(err => console.log('Play failed:', err));
        musicOn.style.display = 'inline';
        musicOff.style.display = 'none';
      }
      isPlaying = !isPlaying;
    });
  }
});