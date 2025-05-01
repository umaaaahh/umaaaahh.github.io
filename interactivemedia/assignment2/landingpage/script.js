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
  hidePrompt();
  landing.classList.add("fade-out");

  setTimeout(() => {
    landing.style.display = "none";
    bagMap.classList.add("active");
    document.querySelectorAll('.dot').forEach(dot => dot.style.opacity = 1);
  }, 700);
});

// Subdot logic
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
    advanceStep();
  }
});

// body sub-dot video opening
subDots.forEach(dot => {
  dot.addEventListener('click', () => {
    openVideo(dot);
    advanceStep();
  });
});

// HANDLE grouped dot toggle
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

handleSubDots.forEach(dot => {
  dot.addEventListener('click', () => {
    openVideo(dot);
    advanceStep();
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
const videoNavPanel = document.getElementById("video-nav-panel");

document.querySelectorAll(".dot").forEach(dot => {
  dot.addEventListener("click", () => {
    if (dot.dataset.src) {
      openVideo(dot);
      advanceStep();
    }
  });
});

closeVideoBtn?.addEventListener("click", () => {
  videoPanel.classList.remove("active");
  videoNavPanel.classList.add("hidden");
  tutorialVideo.pause();
  tutorialVideo.currentTime = 0;
});

// Open video helper
function openVideo(dot) {
  const src = dot.dataset.src;
  const title = dot.dataset.title || "Crochet Tutorial";

  if (src) {
    tutorialVideo.src = src;
    videoTitle.textContent = title;
    videoPanel.classList.add("active");
    videoNavPanel.classList.remove("hidden");

    // Highlight matching button in nav panel
    const step = dot.dataset.step;
    document.querySelectorAll('.video-nav-buttons button').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.step === step) btn.classList.add('active');
    });
  }
}

// Video nav buttons
document.querySelectorAll('.video-nav-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const step = button.dataset.step;
    const target = document.querySelector(`[data-step="${step}"]`);
    if (target) openVideo(target);
  });
});

// 🧺 MATERIALS OVERLAY TOGGLE
const materialsCloud = document.querySelector('.cloud-materials');
const materialsOverlay = document.getElementById('materials-overlay');
const closeMaterials = document.getElementById('close-materials');

materialsCloud?.addEventListener('click', () => {
  materialsOverlay.classList.remove('hidden');
});
closeMaterials?.addEventListener('click', () => {
  materialsOverlay.classList.add('hidden');
});

// 🔁 NAV GUIDE LOGIC
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
  if (target) {
    target.classList.add('highlight');
  }
}

function advanceStep() {
  currentStepIndex++;
  if (currentStepIndex < steps.length) {
    highlightDot(steps[currentStepIndex]);
  }
}

highlightDot(steps[currentStepIndex]);


const closeNavPanelBtn = document.getElementById('close-nav-panel');
closeNavPanelBtn?.addEventListener('click', () => {
  videoNavPanel.classList.add('hidden');
});
