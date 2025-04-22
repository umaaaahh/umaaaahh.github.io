// 🧶 FLOATING TEXT FOLLOWS CURSOR
const floatText = document.getElementById("cursor-follow-text");
document.addEventListener("mousemove", (e) => {
  floatText.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// 👜 TRANSITION TO BAG MAP
const bag = document.getElementById("clickable-bag");
const landing = document.getElementById("landing-page");
const bagMap = document.getElementById("bag-map");
const mapBag = document.querySelector('.map-bag');

bag.addEventListener("click", () => {
  landing.classList.add("fade-out");

  setTimeout(() => {
    landing.style.display = "none";
    bagMap.classList.add("active");

    document.querySelectorAll('.dot').forEach(dot => {
      dot.style.opacity = 1;
    });
  }, 700);
});

// 🌀 BAG MAP TILT ON MOUSE MOVE
document.addEventListener('mousemove', (e) => {
  if (!mapBag || !bagMap.classList.contains("active")) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 50;
  const y = (e.clientY / window.innerHeight - 0.5) * 50;

  mapBag.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
});

document.addEventListener('mouseleave', () => {
  if (mapBag && bagMap.classList.contains("active")) {
    mapBag.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }
});


// 🧶 Video popup handling
const videoPanel = document.getElementById("video-player");
const closeVideoBtn = document.getElementById("close-video");
const tutorialVideo = document.getElementById("tutorial-video");
const videoTitle = document.getElementById("video-title");

// Example logic — replace with per-dot content later
document.querySelectorAll(".dot").forEach(dot => {
  dot.addEventListener("click", () => {
    videoPanel.classList.add("active");
    tutorialVideo.src = "tutorial-placeholder.mp4"; // replace with your actual video later
    videoTitle.textContent = dot.dataset.title || "Crochet Tutorial";
  });
});

closeVideoBtn.addEventListener("click", () => {
  videoPanel.classList.remove("active");
  tutorialVideo.pause();
  tutorialVideo.currentTime = 0;
});

// 🧺 MATERIALS PANEL TOGGLE
const materialsPanel = document.getElementById("materials-panel");
const materialsTab = document.getElementById("materials-toggle-tab");
const closeMaterialsBtn = document.getElementById("toggle-materials");

materialsTab.addEventListener("click", () => {
  materialsPanel.classList.toggle("active");
});

closeMaterialsBtn.addEventListener("click", () => {
  materialsPanel.classList.remove("active");
});
