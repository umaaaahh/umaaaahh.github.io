const landing = document.getElementById('landing');
const stanza1 = document.getElementById('stanza-1');

const landingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      landing.classList.add('fade-out');
    } else {
      landing.classList.remove('fade-out');
    }
  });
}, { threshold: 0.5 });

landingObserver.observe(stanza1);






document.addEventListener("DOMContentLoaded", () => {
  const landing = document.getElementById("landing");
  const landingOverlay = document.querySelector(".landing-overlay");
  const poemText = document.getElementById("poem-text");
  const girl = document.querySelector(".girl");

  // Stanza text by trigger ID
  const stanzas = {
    title: "", // leave blank for landing
    1: "It was many and many a year ago,<br>In a kingdom by the sea,",
    2: "That a maiden there lived whom you may know,<br>By the name of Annabel Lee;",
    3: "And this maiden she lived with no other thought<br>Than to love and be loved by me.",
    4: "Scene 2, Stanza 1...",
    5: "Scene 2, Stanza 2..."
  };

  // Observe triggers and update the stage
  const triggers = document.querySelectorAll(".trigger");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stanzaId = entry.target.dataset.stanza;

        // Fade out landing on first real stanza
        if (stanzaId === "1") {
          landingOverlay.style.opacity = "0";
        }

        // Update poem text
        if (stanzas[stanzaId] !== undefined) {
          poemText.innerHTML = stanzas[stanzaId];
        }

        // Show girl only for stanza 2+
        if (parseInt(stanzaId) >= 2) {
          girl.style.opacity = "1";
        } else {
          girl.style.opacity = "0";
        }
      }
    });
  }, { threshold: 0.5 });

  triggers.forEach(trigger => observer.observe(trigger));
});
