document.addEventListener("DOMContentLoaded", () => {
  // Character elements
  const characters = {
    girl: document.querySelector(".girl"),
    girl2: document.querySelector(".girl2"),
    boy: document.querySelector(".boy"),
    lovers: document.querySelector(".lovers"),
    angel: document.querySelector (".angel"),
    angel2: document.querySelector (".angel2"),
    girl3: document.querySelector(".girl3"),
    gust: document.querySelector(".gust")
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

  // Reset walk-in animation after it finishes so it can replay
  // function setupAnimationReset(element, className) {
  //   if (element) {
  //     element.addEventListener("animationend", () => {
  //       element.classList.remove(className);
  //     });
  //   }
  // }

  // setupAnimationReset(characters.girl, "walk-in");
  // setupAnimationReset(characters.boy, "walk-in");

  // Intersection Observer to track scroll position
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const stanzaIndex = parseInt(entry.target.dataset.stanza);
      const visible = entry.isIntersecting;

      console.log("Stanza:", stanzaIndex, "Visible:", visible); // Debug

      switch (stanzaIndex) {
       case 2:
        if (visible) {
          characters.girl.classList.add("walk-in");
          // characters.girl.classList.add("visible", "walk-in");
        } else {
          characters.girl.classList.remove("walk-in");
          // characters.girl.classList.remove("visible");
        }
        break;

        case 3:
          toggleVisibility(characters.boy, visible);
          toggleVisibility(characters.girl2, visible);

          if (visible) {
            characters.boy.classList.add("walk-in");
            stage.classList.remove("hide-background"); // Restore background
              characters.girl2.classList.add("visible");
          } else {
          characters.boy.classList.remove("walk-in", "visible");
          characters.girl2.classList.remove("visible");
          }
          break;

        case 4:
          toggleVisibility(characters.lovers, visible);
        if (visible){
           stage.classList.toggle("hide-background", visible);
          }
          break;

        case 5:
            toggleVisibility(characters.lovers, visible);

            if (visible) {
                heavenClouds.classList.add("visible");

                // Ensure lovers shrink in stanza 5
                characters.lovers.classList.add("shrink"); 
            } else {
                heavenClouds.classList.remove("visible"); 
                characters.lovers.classList.remove("shrink"); // Reset shrink when scrolling back up
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
              characters.girl3.classlist.add("visible")
              characters.angel2.classlist.add("visible")
               characters.gust.classList.add("visible");
            } else {
              characters.girl3.classlist.remove("visible")
              characters.angel2.classList.remove("visible");
              characters.gust.classList.remove("visible");
            }
          

        default:
          // If any stanza before 4 is intersecting, ensure background is visible
          if (visible && stanzaIndex < 4) {
            stage.classList.remove("hide-background");
          }
        break;
      }
    });
  }, { threshold: 0.6 });

  // Observe each poem section
  sections.forEach(section => observer.observe(section));
});
