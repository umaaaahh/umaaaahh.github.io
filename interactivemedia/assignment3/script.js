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
  
  // Track current active stanza to prevent conflicts
  let currentStanza = 0;
  
  // Animation queue to prevent overlapping transitions
  const animationQueue = new Set();

  // Helper to safely add animation with timing
  function addToQueue(element, duration = 1000) {
    if (element) {
      animationQueue.add(element);
      setTimeout(() => {
        animationQueue.delete(element);
      }, duration);
    }
  }

  // Helper to reset all animation classes on an element
  function resetElement(element) {
    if (element && !animationQueue.has(element)) {
      element.classList.remove("visible", "walk-in", "fade-out", "shrink");
    }
  }

  // Helper to set element state with proper timing - IMPROVED
  function setElementState(element, isVisible, animationClass = null, duration = 1000) {
    if (!element) return;
    
    if (isVisible) {
      // Force reset first
      element.classList.remove("visible", "walk-in", "fade-out", "shrink");
      element.style.opacity = "";  // Clear inline styles
      
      // Apply new state immediately
      element.classList.add("visible");
      if (animationClass) {
        element.classList.add(animationClass);
        addToQueue(element, duration);
      }
    } else {
      // Complete removal
      element.classList.remove("visible", "walk-in", "shrink");
      if (animationClass === "fade-out") {
        element.classList.add("fade-out");
        addToQueue(element, duration);
      }
    }
  }

  // Smooth background transition handler
  function handleBackgroundTransition(shouldHide, delay = 0) {
    setTimeout(() => {
      if (shouldHide) {
        stage.classList.add("hide-background");
      } else {
        stage.classList.remove("hide-background");
      }
    }, delay);
  }

  // Clean up previous stanza effects - FORCED cleanup
  function cleanupPreviousStanza(stanzaIndex) {
    // Force cleanup all characters first, then selectively show what's needed
    Object.values(characters).forEach(char => {
      if (char) {
        char.classList.remove("visible", "walk-in", "fade-out", "shrink");
        char.style.opacity = "0"; // Force reset opacity
      }
    });
    
    // Clear heaven clouds
    heavenClouds.classList.remove("visible");
    
    // Clear animation queue to allow immediate state changes
    animationQueue.clear();
  }

  // Intersection Observer with improved timing
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const stanzaIndex = parseInt(entry.target.dataset.stanza);
      const isEntering = entry.isIntersecting;

      if (isEntering && stanzaIndex !== currentStanza) {
        // Clean up ALL elements first
        cleanupPreviousStanza(stanzaIndex);
        currentStanza = stanzaIndex;
        
        // Immediate transition to new stanza (no delay)
        handleStanzaTransition(stanzaIndex, true);
      } else if (!isEntering && stanzaIndex === currentStanza) {
        // Only handle exit if this was the active stanza
        handleStanzaTransition(stanzaIndex, false);
      }
    });
  }, { 
    threshold: 0.5, // Reduced threshold for more responsive transitions
    rootMargin: "0px 0px -10% 0px" // Slight offset to prevent flickering
  });

  function handleStanzaTransition(stanzaIndex, isEntering) {
    switch (stanzaIndex) {
      case 2:
        if (isEntering) {
          setElementState(characters.girl, true, "walk-in", 2000);
          handleBackgroundTransition(false);
        }
        break;

      case 3:
        if (isEntering) {
          setElementState(characters.boy, true, "walk-in", 2000);
          // Delay girl2 appearance slightly for smoother transition
          setTimeout(() => {
            setElementState(characters.girl2, true);
          }, 500);
          handleBackgroundTransition(false);
        }
        break;

      case 4:
        if (isEntering) {
          setElementState(characters.lovers, true, null, 2500);
          handleBackgroundTransition(true, 300);
        }
        break;

      case 5:
        if (isEntering) {
          // Shrink lovers first, then show heaven
          setElementState(characters.lovers, true, "shrink", 2500);
          setTimeout(() => {
            heavenClouds.classList.add("visible");
          }, 800);
          handleBackgroundTransition(true);
        }
        break;

      case 6:
        if (isEntering) {
          setElementState(characters.angel, true, null, 2000);
          handleBackgroundTransition(false, 200);
        }
        break;

// Replace the case 7 section in your handleStanzaTransition function with this:

case 7:
  if (isEntering) {
    // First show girl3 and start her shivering
    setElementState(characters.girl3, true);
    
    // Start the freezing animation immediately
    setTimeout(() => {
      if (characters.girl3) {
        characters.girl3.classList.add("freezing");
      }
    }, 100);
    
    // Show angel2 in background
    setTimeout(() => {
      setElementState(characters.angel2, true);
    }, 300);
    
    // Launch the wind gust after a delay
    setTimeout(() => {
      setElementState(characters.gust, true);
    }, 800);
    
    // When wind reaches girl3 (after gust animation duration), she dies
    // The gust animation is 2.5s (--slow-transition), so trigger death at 2.3s
    setTimeout(() => {
      if (characters.girl3) {
        // Stop freezing animation and start death fade
        characters.girl3.classList.remove("freezing");
        characters.girl3.classList.add("dying");
      }
    }, 800 + 2300); // 800ms delay + 2300ms for gust to reach her
  }
  break;

      default:
        if (isEntering && stanzaIndex < 4) {
          handleBackgroundTransition(false);
        }
        break;
    }
  }

  // Observe each poem section
  sections.forEach((section) => observer.observe(section));
  
  // Prevent rapid scrolling issues
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Scroll ended - can be used for cleanup if needed
    }, 100);
  });
});