const typingArea = document.getElementById("typing-area");
const chaosMeter = document.getElementById("chaos-meter");
let chaos = 0;

typingArea.addEventListener("keydown", (e) => {
  if (e.key.length > 1) return; // Ignore control keys like Shift, Backspace
  e.preventDefault();

  const span = document.createElement("span");
  span.classList.add("letter");
  span.textContent = e.key;

  // Random styles to simulate "chaos"
  span.style.fontSize = `${10 + Math.random() * 20}px`;
  span.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;
  span.style.fontFamily = pickRandomFont();

  typingArea.appendChild(span);
  updateChaos();
});

function pickRandomFont() {
  const fonts = ["Courier New", "Comic Sans MS", "Impact", "Georgia", "Arial"];
  return fonts[Math.floor(Math.random() * fonts.length)];
}

function updateChaos() {
  chaos++;
  chaosMeter.textContent = `CHAOS: ${chaos}`;

  if (chaos % 20 === 0) {
    showPopup("Are you sure this is good writing?");
  }
}

function showPopup(message) {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.position = "absolute";
  popup.style.top = `${50 + Math.random() * 300}px`;
  popup.style.left = `${50 + Math.random() * 400}px`;
  popup.style.padding = "10px";
  popup.style.background = "#fff";
  popup.style.border = "2px solid black";
  popup.style.zIndex = 999;
  popup.style.boxShadow = "4px 4px #888";
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 3000);
}
