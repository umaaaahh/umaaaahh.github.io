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
// Body subdot
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
    }
  });
});

closeVideoBtn?.addEventListener("click", () => {
  videoPanel.classList.remove("active");
  tutorialVideo.pause();
  tutorialVideo.currentTime = 0;
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
