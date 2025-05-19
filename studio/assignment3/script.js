const typingArea = document.getElementById("typing-area");
const chaosMeter = document.getElementById("chaos-meter");
const staticVideo = document.getElementById("static-overlay");
const typeSound = document.getElementById("type-sound");

let chaos = 0;
let typingTimeout;

// When user types, delay visual chaos
typingArea.addEventListener("input", () => {
  updateChaos(); // still track and trigger popups

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    applyChaosToText();
  },100); // wait for 2 second of no typing before glitching

  // Play typing sound (cloned to avoid overlap delay)
  if (typeSound) {
    const clone = typeSound.cloneNode();
    console.log(420);
    clone.play();
  }
});

// This function isn't working super well
// Possible fixes: Mirror text from a hidden textarea,
// overlayed with a visble glitch area
function applyChaosToText() {
  const text = typingArea.innerText;
  typingArea.innerHTML = ''; // Clear and rebuild

  // FOr each charater of the text, transform the text randomly
  for (let char of text) {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("letter");

    if (Math.random() < 0.3) {
      span.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;
      span.style.fontSize = `${12 + Math.random() * 16}px`;
      span.style.fontFamily = pickRandomFont();
    }

    typingArea.appendChild(span);
  }

  placeCaretAtEnd(typingArea);
}

// Select random font from a list of pre-defined fonts
function pickRandomFont() {
  const fonts = ["Courier New", "Comic Sans MS", "Impact", "Georgia", "Arial"];
  return fonts[Math.floor(Math.random() * fonts.length)];
}

// Everytime a new character is written, update chaos meter
// Then display Static video, emotional popups.
function updateChaos() {
// ✅ If chaos has already reached 100, don't update anything else
    if (chaos >= 100) return;
// Otherwise increase chaos #
    chaos++;
// Update Chaos Bar and Label
  const chaosBar = document.getElementById("chaos-bar");
  const chaosLabel = document.getElementById("chaos-label");
  chaosLabel.textContent = `CHAOS: ${chaos}`;
  
  // Cap visual chaos bar at 100%
  
  const percent = Math.min(chaos, 100);
  chaosBar.style.width = `${percent}%`;
  
  // Dynamically change bar color from green → yellow → orange → red
  if (percent < 33) {
    chaosBar.style.backgroundColor = "green";
  } else if (percent < 66) {
    chaosBar.style.backgroundColor = "orange";
  } else {
    chaosBar.style.backgroundColor = "red";
  }
  
  if (Math.random() < 0.2) {
    // showStatic(500);
  }

  // Display emotional popup 10% of the time 
  if (Math.random() < (chaos/1000 + 0.1)) {
    // Get emtional message
    const message = getEmotionalMsg();
    // Display popup
    showPopup(message);
  }


  // Display popup when chaos meter reach 50
  if (chaos === 50) {
    showStatic(); 
  }

  // Display popup when chaos meter reach 100
  if (chaos === 100) {
    showPopup("The page is beginning to unravel...");
   
    typingArea.setAttribute("contenteditable", "false");
    // document.body.style.backgroundColor = "#1a1a1a";
    // Stop background video, switch to final takeover
    // const finalVideo = document.getElementById("final-video");
    // finalVideo.style.display = "block";
    // finalVideo.play();
    // Show static overlay video full screen

    // showStatic(opacity = .3);
    staticVideo.style.opacity = .3;
    staticVideo.style.zIndex = 9999;
    staticVideo.loop = true; // Just in case it's not set in HTML
    staticVideo.play();
    console.log("420");
  
    // Lock typing
    typingArea.setAttribute("contenteditable", "false");
  
    // Optional fade background
    document.body.style.backgroundColor = "#000";

  }
}

// Return a random string from pre-defined list of quotes
function getEmotionalMsg() {
  const messages = [
    "So how much scrolling did you do today?",
    "LoL who cares!!1!",
    "Wow. Revolutionary. Want a trophy?",
    "No one cares LOL",
    "You know, you're not going to do that right?",
    "Kinda performative :/",
    "So cringe.",
    "You're not going to do it lmao",
    "Be so fr rn.",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}


function showStatic(opacity = .1){
  staticVideo.style.opacity = opacity;
  staticVideo.play();
}

// pop up boxes
function showPopup(message = "Keep going...") {

  // Style of popup
  const popup = document.createElement("div");
  popup.classList.add("chaos-popup");
  popup.innerHTML = `
    <div class="popup-header">
      <span class="popup-title">⚠️⚠️⚠️ ERROR ⚠️⚠️⚠️</span>
      <button class="popup-close">X</button>
    </div>
    <div class="popup-body">${message}</div>
  `;

  // Select a random position on the screen to display pop up
  popup.style.top = `${50 + Math.random() * 300}px`;
  popup.style.left = `${50 + Math.random() * 400}px`;

  // Display popup
  document.body.appendChild(popup);

  // Auto-remove after a few seconds
  setTimeout(() => popup.remove(), 3000);
}

// This function is to keep from losing typing cursor
function placeCaretAtEnd(el) {
  // Tells the browser to focus on the element, to combat 
  // typing cursor being lost after chaos is applied
// Without this, the user might lose the typing cursor after chaos is applied.
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  // When text gets replaced by different fonts is making sure
  // the cursor stays at the position the user is up to, instead
  // of resetting to the start of the page which it was doing originally
  // OG Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable
}
