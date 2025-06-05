document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // DOM ELEMENT REFERENCES
  // =====================================
  
  // All character elements in the poem animation
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

  // Stage and environment elements
  const stage = document.querySelector(".stage");
  const heavenClouds = document.querySelector(".heaven-clouds");
  const sections = document.querySelectorAll(".poem-section");
  
  // =====================================
  // STATE MANAGEMENT VARIABLES
  // =====================================
  
  let currentStanza = 0;              // Track which stanza is currently active
  let observerTimeout;                // Throttle scroll events
  let activeTimeouts = [];            // Track all active timeouts for cleanup
  const animationQueue = new Set();   // Prevent overlapping animations

  // =====================================
  // ANIMATION QUEUE MANAGEMENT
  // =====================================

  // Add element to animation queue to prevent conflicts
  function addToQueue(element, duration = 1000) {
    if (element) {
      animationQueue.add(element);
      const timeout = setTimeout(() => {
        animationQueue.delete(element);
      }, duration);
      activeTimeouts.push(timeout);
    }
  }

  // Reset element classes if not currently animating
  function resetElement(element) {
    if (element && !animationQueue.has(element)) {
      element.classList.remove("visible", "walk-in", "fade-out", "shrink");
    }
  }

  // =====================================
  // ELEMENT STATE MANAGEMENT
  // =====================================

  // Show or hide elements with optional animation classes
  function setElementState(element, isVisible, animationClass = null, duration = 1000) {
    if (!element) return;
    
    if (isVisible) {
      element.classList.remove("visible", "walk-in", "fade-out", "shrink", "fade-in");
      element.style.opacity = "";
      
      element.classList.add("visible");
      if (animationClass) {
        element.classList.add(animationClass);
        addToQueue(element, duration);
      }
    } else {
      element.classList.remove("visible", "walk-in", "shrink", "fade-");
      if (animationClass === "fade-out") {
        element.classList.add("fade-out");
        addToQueue(element, duration);
      }
    }
  }

  // Control stage background visibility with optional delay
  function handleBackgroundTransition(shouldHide, delay = 0) {
    setTimeout(() => {
      if (shouldHide) {
        stage.classList.add("hide-background");
      } else {
        stage.classList.remove("hide-background");
      }
    }, delay);
  }

  // =====================================
  // STANZA CLEANUP SYSTEM
  // =====================================

  // Reset all elements when transitioning between stanzas
  function cleanupPreviousStanza(stanzaIndex) {
    Object.values(characters).forEach(char => {
      if (char) {
        char.classList.remove("visible", "walk-in", "fade-out", "shrink", "freezing", "dying");
        char.style.opacity = "0";
      }
    });
    
    // Fix for girl2 persistence issue
    if (characters.girl2) {
      characters.girl2.classList.remove("visible");
      characters.girl2.style.opacity = "0";
      characters.girl2.style.display = "none";
      setTimeout(() => {
        if (characters.girl2) {
          characters.girl2.style.display = "";
        }
      }, 100);
    }
    
    if (heavenClouds) {
      heavenClouds.classList.remove("visible");
      heavenClouds.style.opacity = "0";
    }
    
    if (stage) {
      stage.classList.remove("hide-background");
    }
    
    animationQueue.clear();
  }

  // =====================================
  // SCROLL INTERSECTION OBSERVER
  // =====================================

  // Throttled callback to prevent rapid-fire stanza changes during scroll
  function throttledObserverCallback(entries) {
    clearTimeout(observerTimeout);
    observerTimeout = setTimeout(() => {
      entries.forEach((entry) => {
        const stanzaIndex = parseInt(entry.target.dataset.stanza);
        const isEntering = entry.isIntersecting;

        if (isEntering && stanzaIndex !== currentStanza) {
          activeTimeouts.forEach(timeout => clearTimeout(timeout));
          activeTimeouts = [];
          
          cleanupPreviousStanza(stanzaIndex);
          currentStanza = stanzaIndex;
          
          handleStanzaTransition(stanzaIndex, true);
        } else if (!isEntering && stanzaIndex === currentStanza) {
          handleStanzaTransition(stanzaIndex, false);
        }
      });
    }, 50);
  }

  // Setup intersection observer to watch poem sections
  const observer = new IntersectionObserver(throttledObserverCallback, { 
    threshold: 0.5,
    rootMargin: "0px 0px -10% 0px"
  });

  // =====================================
  // STANZA-SPECIFIC ANIMATIONS
  // =====================================

  // Handle animations for each stanza of the poem
  function handleStanzaTransition(stanzaIndex, isEntering) {
    if (isEntering) {
      activeTimeouts.forEach(timeout => clearTimeout(timeout));
      activeTimeouts = [];
    }
    
    switch (stanzaIndex) {
      case 2: // Girl enters alone
        if (isEntering) {
          setElementState(characters.girl, true, "walk-in", 2000);
          handleBackgroundTransition(false);
        }
        break;

      case 3: // Boy enters, girl transforms to girl2
        if (isEntering) {
          setElementState(characters.girl, true, null, 2000);
          setElementState(characters.boy, true, "walk-in", 2000);
          
          // Swap girl to girl2 during boy's entrance
          const stanza3Timeout1 = setTimeout(() => {
            setElementState(characters.girl2, true);
            const stanza3Timeout2 = setTimeout(() => {
              setElementState(characters.girl, false, "fade-out", 600);
            }, 150); 
            activeTimeouts.push(stanza3Timeout2);
          }, 1200);
          activeTimeouts.push(stanza3Timeout1);
          
          handleBackgroundTransition(false);
        }
        break;

      case 4: // Lovers appear together
        if (isEntering) {
          setElementState(characters.lovers, true, null, 2500);
          handleBackgroundTransition(true, 300);
        }
        break;

      case 5: // Lovers ascend to heaven
        if (isEntering) {
          setElementState(characters.lovers, true, "shrink", 2500);
          
          if (heavenClouds) {
            heavenClouds.classList.add("visible");
            heavenClouds.style.opacity = "1";
          }
          handleBackgroundTransition(true);
        }
        break;

      case 6: // Angel appears
        if (isEntering) {
          setElementState(characters.angel, true, null, 2000);
          handleBackgroundTransition(false, 200);
        }
        break;

      case 7: // Final tragic scene - girl3 freezes and dies
        if (isEntering) {
          setElementState(characters.girl3, true);
          
          const stanza7Timeout1 = setTimeout(() => {
            if (characters.girl3) {
              characters.girl3.classList.add("freezing");
            }
          }, 100);
          activeTimeouts.push(stanza7Timeout1);
          
          const stanza7Timeout2 = setTimeout(() => {
            setElementState(characters.angel2, true);
          }, 300);
          activeTimeouts.push(stanza7Timeout2);
          
          const stanza7Timeout3 = setTimeout(() => {
            setElementState(characters.gust, true);
          }, 800);
          activeTimeouts.push(stanza7Timeout3);
          
          // Wind gust reaches girl3 after 2.3s animation duration
          const stanza7Timeout4 = setTimeout(() => {
            if (characters.girl3) {
              characters.girl3.classList.remove("freezing");
              characters.girl3.classList.add("dying");
            }
          }, 800 + 2300);
          activeTimeouts.push(stanza7Timeout4);
        }
        break;

      default: // Default background state for other stanzas
        if (isEntering && stanzaIndex < 4) {
          handleBackgroundTransition(false);
        }
        break;
    }
  }

  // =====================================
  // INITIALIZATION
  // =====================================

  // Start observing all poem sections
  sections.forEach((section) => observer.observe(section));
  
  // Additional scroll throttling for performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Scroll ended - available for additional cleanup if needed
    }, 100);
  });
});

// =====================================
// UTILITY FUNCTIONS
// =====================================

// Restart the entire poem animation
function restartPoem() {
  window.location.reload();
}

// Open the full poem in a new tab
function readFullPoem() {
  window.open('https://www.poetryfoundation.org/poems/44885/annabel-lee', '_blank');
}