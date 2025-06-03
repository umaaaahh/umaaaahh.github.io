document.addEventListener("DOMContentLoaded", () => {
  // Character elements
  const characters = {
    girl: document.querySelector(".girl"),
    girl2: document.querySelector(".girl2"),
    boy: document.querySelector(".boy"),
    lovers: document.querySelector(".lovers"),
  };

  const stage = document.querySelector(".stage");
  const heavenClouds = document.querySelector(".heaven-clouds");
  const sections = document.querySelectorAll(".poem-section");

  // Helper to safely toggle visibility
  function toggleVisibility(element, isVisible) {
    if (element) {
      element.classList.toggle("visible", isVisible);
    }
  }

  let currentStanza = null;
  let isThrottled = false;
  const throttleTime = 2000;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const stanzaIndex = parseInt(entry.target.dataset.stanza);

      // Prevent retriggering the same stanza
      if (isThrottled || stanzaIndex === currentStanza) return;

      currentStanza = stanzaIndex;
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, throttleTime);

      // === SCROLL ANIMATION LOGIC ===
      switch (stanzaIndex) {
        case 2:
        if (visible) {
          characters.girl.classList.add("walk-in");
          break; 
        }  
       

        case 3:
          toggleVisibility(characters.boy, true);
          toggleVisibility(characters.girl2, true);
          characters.boy.classList.add("walk-in");
          stage.classList.remove("hide-background");
          break;

        case 4:
          toggleVisibility(characters.lovers, true);
          stage.classList.add("hide-background");
          break;

        case 5:
          toggleVisibility(characters.lovers, true);
          heavenClouds.classList.add("visible");
          break;

        default:
          if (stanzaIndex < 4) {
            stage.classList.remove("hide-background");
            heavenClouds.classList.remove("visible");
            toggleVisibility(characters.lovers, false);
          }
          break;
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));
});
