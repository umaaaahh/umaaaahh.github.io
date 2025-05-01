// 🧶 FLOATING PROMPT THAT FOLLOWS CURSOR
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

// Hide prompt after 15 seconds or on bag click
setTimeout(hidePrompt, 15000);

// 👜 BAG INTERACTION (Click = transition to map)
const bag = document.getElementById("clickable-bag");
const landing = document.getElementById("landing-page");
const bagMap = document.getElementById("bag-map");
const mapBag = document.querySelector('.map-bag');

bag?.addEventListener("click", () => {
  hidePrompt(); // Also hide the prompt on click

  landing.classList.add("fade-out");

  setTimeout(() => {
    landing.style.display = "none";
    bagMap.classList.add("active");

    // Fade in interactive dots
    document.querySelectorAll('.dot').forEach(dot => {
      dot.style.opacity = 1;
    });
  }, 700);
});

// Subdot logic
// Body 
const groupedDot = document.getElementById('dot-body-group');
const subDots = document.querySelectorAll('.body-sub-dot');
const allMainDots = document.querySelectorAll('.dot:not(.body-sub-dot)');

// Toggle sub-dot group
groupedDot.addEventListener('click', () => {
  const isActive = groupedDot.classList.contains('active');

  if (isActive) {
    // CLOSE: Hide sub-dots, show other dots
    subDots.forEach(dot => dot.classList.add('hidden'));
    allMainDots.forEach(dot => dot.style.opacity = 1);
    groupedDot.classList.remove('active');
   
    
  } else {
    // OPEN: Hide all other main dots
    allMainDots.forEach(dot => {
      if (dot !== groupedDot) dot.style.opacity = 0;
    });

    // Show sub-dots
    subDots.forEach(dot => dot.classList.remove('hidden'));
    groupedDot.classList.add('active');

    advanceStep(); // Progress the nav guide
    
  }
});


// body sub-dot video opening
subDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const videoPanel = document.getElementById("video-player");
    const tutorialVideo = document.getElementById("tutorial-video");
    const videoTitle = document.getElementById("video-title");

    tutorialVideo.src = dot.dataset.src;
    videoTitle.textContent = dot.dataset.title || "Crochet Tutorial";
    videoPanel.classList.add("active");

    advanceStep(); // Progress the nav guide
  });
});

// HANDLE grouped dot toggle
const handleGroupDot = document.getElementById('dot-handle-group');
const handleSubDots = document.querySelectorAll('.handle-sub-dot');

// Toggle Handle Sub-Dots
handleGroupDot.addEventListener('click', () => {
  const isActive = handleGroupDot.classList.contains('active');

  if (isActive) {
    // CLOSE: Hide sub-dots, show other dots
    handleSubDots.forEach(dot => dot.classList.add('hidden'));
    allMainDots.forEach(dot => dot.style.opacity = 1);
    handleGroupDot.classList.remove('active');
  } else {
    // OPEN: Hide all other main dots
    allMainDots.forEach(dot => {
      if (dot !== handleGroupDot) dot.style.opacity = 0;
    });

    // Show sub-dots
    handleSubDots.forEach(dot => dot.classList.remove('hidden'));
    handleGroupDot.classList.add('active');

    advanceStep(); // Progress the nav guide

  }
});

// Play video on handle sub-dot click
handleSubDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const videoPanel = document.getElementById("video-player");
    const tutorialVideo = document.getElementById("tutorial-video");
    const videoTitle = document.getElementById("video-title");

    tutorialVideo.src = dot.dataset.src;
    videoTitle.textContent = dot.dataset.title || "Crochet Tutorial";
    videoPanel.classList.add("active");

    advanceStep(); // Progress the nav guide
  });
});



// 🌀 MAP TILT ON MOUSEMOVE
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

// 🎬 VIDEO PLAYER HANDLING
const videoPanel = document.getElementById("video-player");
const closeVideoBtn = document.getElementById("close-video");
const tutorialVideo = document.getElementById("tutorial-video");
const videoTitle = document.getElementById("video-title");

document.querySelectorAll(".dot").forEach(dot => {
  dot.addEventListener("click", () => {
    const videoSrc = dot.dataset.src;
    const title = dot.dataset.title || "Crochet Tutorial";

    if (videoSrc) {
      tutorialVideo.src = videoSrc;
      videoTitle.textContent = title;
      videoPanel.classList.add("active");
      navPanel.classList.remove("hidden");// This is for the tree view nav panel
      advanceStep(); // This is do the dot nav guide
    }
  });
});

closeVideoBtn?.addEventListener("click", () => {
  videoPanel.classList.remove("active");
  tutorialVideo.pause();
  tutorialVideo.currentTime = 0;
  navPanel.classList.add("hidden"); // This is for the tree view nav panel
});

// 🧺 MATERIALS OVERLAY TOGGLE (Cloud-Triggered)
const materialsCloud = document.querySelector('.cloud-materials');
const materialsOverlay = document.getElementById('materials-overlay');
const closeMaterials = document.getElementById('close-materials');

materialsCloud?.addEventListener('click', () => {
  materialsOverlay.classList.remove('hidden');
});

closeMaterials?.addEventListener('click', () => {
  materialsOverlay.classList.add('hidden');
});

// NAV GUIDE

// 1. Define your ordered steps
const steps = [
  "1",     // Materials
  "2",     // Body group
  "2.1", "2.2", "2.3", "2.4",  // Body sub-dots
  "3",     // Handle group
  "3.1", "3.2", "3.3", "3.4"   // Handle sub-dots
];

let currentStepIndex = 0;

// 2. Highlight only the current step
function highlightDot(step) {
  document.querySelectorAll('.dot, .sub-dot').forEach(dot => {
    dot.classList.remove('highlight');
  });

  const target = document.querySelector(`[data-step="${step}"]`);
  if (target) {
    target.classList.add('highlight');
  }
}

// 3. Move to next step (call after clicking a dot)
function advanceStep() {
  currentStepIndex++;
  if (currentStepIndex < steps.length) {
    highlightDot(steps[currentStepIndex]);
  }
}

// 4. Start with the first highlighted dot
highlightDot(steps[currentStepIndex]);

// TREE VIEW

// Show the navigation panel when a video is opened
function openNavPanel(currentStep) {
  document.getElementById('nav-panel').classList.remove('hidden');
  highlightCurrentStep(currentStep);
}

// Hide the navigation panel
function closeNavPanel() {
  document.getElementById('nav-panel').classList.add('hidden');
}

// Highlight the current step in the navigation
function highlightCurrentStep(step) {
  document.querySelectorAll('#nav-panel a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-step') === step) {
      link.classList.add('active');
    }
  });
}

// Add click event listeners to navigation links
document.querySelectorAll('#nav-panel a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const step = link.getAttribute('data-step');
    // Logic to load the corresponding video
    loadVideo(step);
    highlightCurrentStep(step);
  });
});

// Example function to load video based on step
function loadVideo(step) {
  // Implement your video loading logic here
  console.log(`Loading video for step: ${step}`);
}
