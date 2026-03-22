function checkPassword() {
  const correctPassword = "11/07/2026"; 
  const input = document.getElementById("password-input").value;
  const error = document.getElementById("error-msg");

  if (input === correctPassword) {
    document.getElementById("password-screen").style.display = "none";
    document.getElementById("site-content").style.display = "block";
    document.body.style.overflow = "auto"; // restore scroll
  } else {
    error.style.display = "block";
  }
}

// Target the countdown span
const countdownEl = document.getElementById("countdown");

// Set your wedding date here (YYYY-MM-DD)
const weddingDate = new Date("2026-07-11T00:00:00");

// Update the countdown
function updateCountdown() {
  const now = new Date();
  const timeLeft = weddingDate - now;

  if (timeLeft <= 0) {
    countdownEl.textContent = "It's today!";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  countdownEl.textContent = `${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec`;
}

// Call it immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

