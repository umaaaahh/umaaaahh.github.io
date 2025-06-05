document.addEventListener("DOMContentLoaded", () => {
  // Character elements
  const characters = {
    girl: document.querySelector(".girl"),
    girl2: document.querySelector(".girl2"),
    boy: document.querySelector(".boy"),
    lovers: document.querySelector(".lovers"),
    angel: document.querySelector(".angel"),
    angel2: document.querySelector(".angel2"),
    girl3: document.querySelector(".girl3"),
    gust: document.querySelector(".gust"),
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

  // Intersection Observer to track scroll position
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const stanzaIndex = parseInt(entry.target.dataset.stanza);
      const visible = entry.isIntersecting;

      switch (stanzaIndex) {
        case 2:
          toggleVisibility(characters.girl, visible);
          if (visible) {
            characters.girl.classList.add("walk-in");
          } else {
            characters.girl.classList.remove("walk-in");
            characters.girl.classList.add("fade-out");
          }
          break;

        case 3:
          toggleVisibility(characters.boy, visible);
          toggleVisibility(characters.girl2, visible);

          if (visible) {
            characters.boy.classList.add("walk-in");
            stage.classList.remove("hide-background");
            characters.girl2.classList.add("visible");
          } else {
            characters.boy.classList.remove("walk-in", "visible");
            characters.girl2.classList.remove("visible");
          }
          break;

        case 4:
          toggleVisibility(characters.lovers, visible);
          if (visible) {
            stage.classList.add("hide-background");
          }
          break;

        case 5:
          toggleVisibility(characters.lovers, visible);
          if (visible) {
            stage.classList.add("hide-background"); 
            heavenClouds.classList.add("visible");
            characters.lovers.classList.add("shrink");
          } else {
            heavenClouds.classList.remove("visible");
            characters.lovers.classList.remove("shrink");
          }
          break;

        case 6:
          toggleVisibility(characters.angel, visible);
          if (visible) {
            characters.angel.classList.add("visible");
            stage.classList.remove("hide-background");
          } else {
            characters.angel.classList.remove("visible");
          }
          break;

        case 7:
          toggleVisibility(characters.girl3, visible);
          toggleVisibility(characters.angel2, visible);
          toggleVisibility(characters.gust, visible);

          if (visible) {
            characters.girl3.classList.add("visible");
            characters.angel2.classList.add("visible");
            characters.gust.classList.add("visible");
          } else {
            characters.girl3.classList.remove("visible");
            characters.angel2.classList.remove("visible");
            characters.gust.classList.remove("visible");
          }
          break;

        default:
          // If any section before 4 is intersecting, ensure background is visible
          if (visible && stanzaIndex < 4) {
            stage.classList.remove("hide-background");
          }
          break;
      }
    });
  }, { threshold: 0.6 });

  // Observe each poem section
  sections.forEach((section) => observer.observe(section));
});