document.addEventListener("DOMContentLoaded", () => {
  // Character elements
  const characters = {
    girl: document.querySelector(".girl"),
    girl2: document.querySelector(".girl2"),
    boy: document.querySelector(".boy"),
    lovers: document.querySelector(".lovers"),
  };

  const stage = document.querySelector(".stage");
  const sections = document.querySelectorAll(".poem-section");

  // Helper to safely toggle visibility
  function toggleVisibility(element, isVisible) {
    if (element) {
      element.classList.toggle("visible", isVisible);
    }
  }

  // Reset walk-in animation after it finishes so it can replay
  function setupAnimationReset(element, className) {
    if (element) {
      element.addEventListener("animationend", () => {
        element.classList.remove(className);
      });
    }
  }

  setupAnimationReset(characters.girl, "walk-in");
  setupAnimationReset(characters.boy, "walk-in");

  // Intersection Observer to track scroll position
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const stanzaIndex = parseInt(entry.target.dataset.stanza);
      const visible = entry.isIntersecting;

      console.log("Stanza:", stanzaIndex, "Visible:", visible); // Debug

      switch (stanzaIndex) {
        case 2:
          if (visible) {
            characters.girl.classList.add("visible", "walk-in");
          } else {
            characters.girl.classList.remove("visible");
          }
          break;

        case 3:
          toggleVisibility(characters.boy, visible);
          toggleVisibility(characters.girl2, visible);

          if (visible) {
            characters.boy.classList.add("walk-in");
          }
          break;

        case 4:
          toggleVisibility(characters.lovers, visible);
          stage.classList.toggle("hide-background", visible);
          break;

        case 5:
        case 6:
          stage.classList.toggle("hide-background", visible);
          break;

        default:
          // Restore background if back to earlier stanzas
          if (stanzaIndex < 4 && visible) {
            stage.classList.remove("hide-background");
          }
          break;
      }
    });
  }, { threshold: 0.6 });

  // Observe each poem section
  sections.forEach(section => observer.observe(section));
});
