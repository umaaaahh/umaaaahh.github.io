
// === FLOATING PROMPT FOLLOWING CURSOR ===
// Moves the floating prompt text with the user's cursor
// Comment: This prompt doesn't work visually right now but removing it breaks bag interactivity for some reason.
const floatText = document.getElementById("cursor-follow-text");

document.addEventListener("mousemove", (e) => {
  if (floatText) {
    floatText.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }
});

let promptHidden = false;
function hidePrompt() {
  if (!promptHidden && floatText) {
    floatText.style.display = "none";
    promptHidden = true;
  }
}
setTimeout(hidePrompt, 15000); // Hide the prompt after 15 seconds



// === LANDING PAGE TO BAG MAP TRANSITION ===
// Clicking the brown bag hides the landing screen and shows the map
const bag = document.getElementById("clickable-bag");
const landing = document.getElementById("landing-page");
const bagMap = document.getElementById("bag-map");
const mapBag = document.querySelector('.map-bag');

bag?.addEventListener("click", () => {
  hidePrompt();
  landing.classList.add("fade-out");

  setTimeout(() => {
    landing.style.display = "none";
    bagMap.classList.add("active");
    document.querySelectorAll('.dot').forEach(dot => dot.style.opacity = 1);
  }, 700);
});



// === BODY DOT GROUP TOGGLE ===
// This section handles expanding/collapsing the sub-steps for the Body dot
const groupedDot = document.getElementById('dot-body-group');
const subDots = document.querySelectorAll('.body-sub-dot');
const allMainDots = document.querySelectorAll('.dot:not(.body-sub-dot)');

groupedDot.addEventListener('click', () => {
  const isActive = groupedDot.classList.contains('active');

  if (isActive) {
    subDots.forEach(dot => dot.classList.add('hidden'));
    allMainDots.forEach(dot => dot.style.opacity = 1);
    groupedDot.classList.remove('active');
  } else {
    allMainDots.forEach(dot => {
      if (dot !== groupedDot) dot.style.opacity = 0;
    });
    subDots.forEach(dot => dot.classList.remove('hidden'));
    groupedDot.classList.add('active');
    advanceStep(); // Move the nav highlight forward
  }
});



// === BODY SUB-DOT VIDEO HANDLING ===
// Clicking a pink sub-dot loads the matching video and moves the highlight nav to the next step
subDots.forEach(dot => {
  dot.addEventListener('click', () => {
    openVideo(dot);
    advanceStep();
  });
});



// === HANDLE DOT GROUP TOGGLE ===
// This section handles expanding/collapsing the sub-steps for the handle dot
const handleGroupDot = document.getElementById('dot-handle-group');
const handleSubDots = document.querySelectorAll('.handle-sub-dot');

handleGroupDot.addEventListener('click', () => {
  const isActive = handleGroupDot.classList.contains('active');

  if (isActive) {
    handleSubDots.forEach(dot => dot.classList.add('hidden'));
    allMainDots.forEach(dot => dot.style.opacity = 1);
    handleGroupDot.classList.remove('active');
  } else {
    allMainDots.forEach(dot => {
      if (dot !== handleGroupDot) dot.style.opacity = 0;
    });
    handleSubDots.forEach(dot => dot.classList.remove('hidden'));
    handleGroupDot.classList.add('active');
    advanceStep();
  }
});

// === HANDLE SUB-DOT VIDEO HANDLING ===
// Clicking a pink sub-dot loads the matching video and moves the highlight nav to the next step
handleSubDots.forEach(dot => {
  dot.addEventListener('click', () => {
    openVideo(dot);
    advanceStep();
  });
});



// === MAP TILT EFFECT ===
// Makes the bag tilt slightly as your mouse moves
// Based on CSS Tricks: https://css-tricks.com/animate-a-container-on-mouse-over-using-perspective-and-transform/
document.addEventListener("mousemove", (e) => {
  if (!mapBag || !bagMap.classList.contains("active")) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 70;
  const y = (e.clientY / window.innerHeight - 0.5) * 70;
  mapBag.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
});

document.addEventListener("mouseleave", () => {
  if (mapBag && bagMap.classList.contains("active")) {
    mapBag.style.transform = "rotateX(0deg) rotateY(0deg)";
  }
});



// === VIDEO PLAYER SYSTEM ===
// This is the main logic for handling video playback.
// The structure is based on the class template by Rohit Ashok Khot, but I extended it:
// - Users can click dots to open videos
// - There's a step-by-step nav panel
// - I added a custom progress bar, timestamp, and basic keyboard controls

const videoPanel = document.getElementById("video-player");
const closeVideoBtn = document.getElementById("close-video");
const tutorialVideo = document.getElementById("tutorial-video");
const videoTitle = document.getElementById("video-title");
const videoNavPanel = document.getElementById("video-nav-panel");
const playButton = document.getElementById("custom-play");
const progressBar = document.getElementById("custom-progress");
const progressFill = document.getElementById("custom-progress-filled");
const timestamp = document.getElementById("custom-timestamp");

// === PLAYBACK BUTTON ===
playButton.addEventListener("click", () => {
  if (tutorialVideo.paused) {
    tutorialVideo.play();
    playButton.textContent = "⏸️"; // Switch to pause icon
  } else {
    tutorialVideo.pause();
    playButton.textContent = "▶️"; // Switch to play icon
  }
});

// === PROGRESS BAR UPDATE + TIME DISPLAY ===
tutorialVideo.addEventListener('timeupdate', () => {
  const percent = (tutorialVideo.currentTime / tutorialVideo.duration) * 100;
  progressFill.style.width = percent + '%';

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  timestamp.textContent = `${formatTime(tutorialVideo.currentTime)} / ${formatTime(tutorialVideo.duration)}`;
});

// === SEEKING (Click to jump ahead) ===
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const clickPercent = clickX / width;
  tutorialVideo.currentTime = clickPercent * tutorialVideo.duration;
});

// === OPEN VIDEO FROM DOT ===
document.querySelectorAll(".dot").forEach(dot => {
  dot.addEventListener("click", () => {
    if (dot.dataset.src) {
      openVideo(dot);
      advanceStep();
    }
  });
});

// === OPEN VIDEO FROM NAV PANEL ===
document.querySelectorAll('.video-nav-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const step = button.dataset.step;
    const target = document.querySelector(`[data-step="${step}"]`);
    if (target) openVideo(target);
  });
});

// === OPEN VIDEO FUNCTION ===
// Takes in a dot element and loads the relevant video + title
function openVideo(dot) {
  const src = dot.dataset.src;
  const title = dot.dataset.title || "Crochet Tutorial";

  if (src) {
    tutorialVideo.src = src;
    videoTitle.textContent = title;
    videoPanel.classList.add("active");
    videoNavPanel.classList.remove("hidden");

    // Highlight correct step in nav panel
    const step = dot.dataset.step;
    document.querySelectorAll('.video-nav-buttons button').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.step === step) btn.classList.add('active');
    });
  }
}

// === VOLUME CONTROL ===
const volumeSlider = document.getElementById('custom-volume');
const audioToggle = document.getElementById('audio-toggle');

audioToggle.addEventListener('click', () => {
  volumeSlider.classList.toggle('hidden');
});

volumeSlider.addEventListener('input', () => {
  tutorialVideo.volume = volumeSlider.value;
});

let volumeTimeout;

audioToggle.addEventListener('click', () => {
  volumeSlider.classList.remove('hidden');

  clearTimeout(volumeTimeout);
  volumeTimeout = setTimeout(() => {
    volumeSlider.classList.add('hidden');
  }, 3000);
});

volumeSlider.addEventListener('input', () => {
  tutorialVideo.volume = volumeSlider.value;

  clearTimeout(volumeTimeout);
  volumeTimeout = setTimeout(() => {
    volumeSlider.classList.add('hidden');
  }, 1500);
});



// === CLOSE VIDEO ===
closeVideoBtn?.addEventListener('click', () => {
  videoPanel.classList.remove('active');
  videoNavPanel.classList.add('hidden');
  tutorialVideo.pause();
  tutorialVideo.currentTime = 0;
  playButton.textContent = "▶️"; // Reset icon when video closes
});

// === KEYBOARD CONTROLS ===
// Allows spacebar to play/pause and arrows to skip
document.addEventListener('keydown', (e) => {
  if (!videoPanel.classList.contains('active')) return;

  switch (e.key) {
    case ' ':
      e.preventDefault(); // Prevent spacebar from scrolling the page
      tutorialVideo.paused ? tutorialVideo.play() : tutorialVideo.pause();
      break;
    case 'ArrowRight':
      tutorialVideo.currentTime += 5;
      break;
    case 'ArrowLeft':
      tutorialVideo.currentTime -= 5;
      break;
  }
});

// === LOADING FEEDBACK ===
// Temporarily shows "Loading..." when buffering
tutorialVideo.addEventListener('waiting', () => {
  videoTitle.textContent = "Loading...";
});

tutorialVideo.addEventListener('canplay', () => {
  const activeDot = document.querySelector('.dot.active, .sub-dot.active');
  if (activeDot) {
    videoTitle.textContent = activeDot.dataset.title || "Crochet Tutorial";
  }
});


// === MATERIALS PANEL (FLOATING CLOUD) ===
//  Way to navigate to home(the landing page), 
// a shop from the creator of the bag design and the list of materials necessary for the tutorial
const materialsCloud = document.querySelector('.cloud-materials');
const materialsOverlay = document.getElementById('materials-overlay');
const closeMaterials = document.getElementById('close-materials');

materialsCloud?.addEventListener('click', () => {
  materialsOverlay.classList.remove('hidden');
});
closeMaterials?.addEventListener('click', () => {
  materialsOverlay.classList.add('hidden');
});



// === STEP-BY-STEP NAVIGATION HIGHLIGHT (DASHED CIRCLE) ===
// Automatically highlights next relevant dot in sequence
// Comment: Added this because I feel navigation is this websites weakest quality.
const steps = [
  "1", "2", "2.1", "2.2", "2.3", "2.4",
  "3", "3.1", "3.2", "3.3", "3.4"
];
let currentStepIndex = 0;

function highlightDot(step) {
  document.querySelectorAll('.dot, .sub-dot').forEach(dot => {
    dot.classList.remove('highlight');
  });
  const target = document.querySelector(`[data-step="${step}"]`);
  if (target) target.classList.add('highlight');
}

function advanceStep() {
  currentStepIndex++;
  if (currentStepIndex < steps.length) {
    highlightDot(steps[currentStepIndex]);
  }
}

// Start the nav highlight on the first dot
highlightDot(steps[currentStepIndex]);



// === CLOSE NAV PANEL (TOP-RIGHT BUTTON) ===
const closeNavPanelBtn = document.getElementById('close-nav-panel');
closeNavPanelBtn?.addEventListener('click', () => {
  videoNavPanel.classList.add('hidden');
});


/* 
===========================================
JavaScript Feature References & Citations
===========================================

1. Map Tilt Effect (Mouse-Based 3D Rotation)
   - CSS-Tricks: https://css-tricks.com/animate-a-container-on-mouse-over-using-perspective-and-transform/
   - Codrops Direction-Aware Hover Effect: https://tympanus.net/Tutorials/DirectionAwareHoverEffect/
   - MDN mousemove Event: https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
   - Custom implementation adapted for rotating a single image based on screen center proximity.

2. Video Player Modal System
   - Structural inspiration drawn from:
     Rohit Ashok Khot’s Assignment Starter Media Player
     GitHub: https://rohitashokkhot.github.io/mediaplayer/
   - Modified and extended with step-based navigation and dot integration.

3. Navigation Highlight System (advanceStep & highlightDot)
   - Conceptually inspired by onboarding and interactive UI systems.
   - Custom logic developed to show progression through grouped tutorial steps.

4. Overlay Panel Toggles (Materials, Video Nav)
   - Uses standard modal patterns via classList API.
   - MDN classList Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
   - Panels are shown/hidden by toggling `.hidden` class on elements.

5. Dot Grouping & Toggle Logic
   - Fully custom approach for managing sub-dots within interactive tutorial map.
   - Designed to keep the interface clean and guide user attention to one group at a time.

*/

