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

  // Animation timing constants - matching CSS
  const FADE_DURATION = 1000;        // --fade-duration
  const WALK_DURATION = 2000;        // --character-walk  
  const TRANSITION_DURATION = 1500;  // --medium-transition
  const STAGGER_DELAY = 300;

  // Track active animations to prevent conflicts
  const activeAnimations = new Map();
  let currentStanza = 0;
  let isTransitioning = false;

  // Enhanced animation management that respects walk-in animations
  function manageAnimation(element, action, animationClass = null, duration = FADE_DURATION) {
    if (!element) return Promise.resolve();

    const elementKey = element.classList[0]; // Use first class as key
    
    return new Promise((resolve) => {
      // Clear any existing timeout for this element
      if (activeAnimations.has(elementKey)) {
        clearTimeout(activeAnimations.get(elementKey));
        activeAnimations.delete(elementKey);
      }

      switch (action) {
        case 'walkIn':
          // For walk-in animations, ensure clean start
          element.classList.remove('fade-out', 'visible');
          element.style.opacity = ''; // Clear any inline opacity
          
          // Start walk-in animation
          requestAnimationFrame(() => {
            element.classList.add('visible', animationClass);
            
            // Set timeout for when walk-in completes
            const timeout = setTimeout(() => {
              activeAnimations.delete(elementKey);
              resolve();
            }, duration);
            
            activeAnimations.set(elementKey, timeout);
          });
          break;

        case 'fadeIn':
          // Simple fade in without walk animation
          element.classList.remove('fade-out', 'walk-in', 'shrink');
          element.style.opacity = '';
          
          requestAnimationFrame(() => {
            element.classList.add('visible');
            if (animationClass) {
              element.classList.add(animationClass);
            }
            
            const timeout = setTimeout(() => {
              activeAnimations.delete(elementKey);
              resolve();
            }, duration);
            
            activeAnimations.set(elementKey, timeout);
          });
          break;

        case 'fadeOut':
          // Only fade out if not currently walking in
          if (element.classList.contains('walk-in')) {
            // Wait for walk-in to complete first
            const walkTimeout = setTimeout(() => {
              element.classList.remove('walk-in');
              element.classList.add('fade-out');
              
              const fadeTimeout = setTimeout(() => {
                element.classList.remove('visible', 'fade-out');
                activeAnimations.delete(elementKey);
                resolve();
              }, FADE_DURATION);
              
              activeAnimations.set(elementKey, fadeTimeout);
            }, 100); // Small delay to let walk-in settle
            
            activeAnimations.set(elementKey, walkTimeout);
          } else {
            // Standard fade out
            element.classList.add('fade-out');
            
            const timeout = setTimeout(() => {
              element.classList.remove('visible', 'fade-out', 'shrink');
              activeAnimations.delete(elementKey);
              resolve();
            }, FADE_DURATION);
            
            activeAnimations.set(elementKey, timeout);
          }
          break;

        case 'hide':
          // Immediate hide
          element.classList.remove('visible', 'walk-in', 'fade-out', 'shrink');
          element.style.opacity = '';
          activeAnimations.delete(elementKey);
          resolve();
          break;
      }
    });
  }

  // Background transition handler
  function updateBackground(stanzaIndex) {
    const shouldHide = stanzaIndex === 4 || stanzaIndex === 5;
    
    if (shouldHide) {
      stage.classList.add("hide-background");
    } else {
      stage.classList.remove("hide-background");
    }
  }

  // Clean stanza transitions with proper sequencing
  async function transitionToStanza(stanzaIndex) {
    if (stanzaIndex === currentStanza) return;
    
    console.log(`Transitioning to stanza ${stanzaIndex}`);
    
    // Step 1: Handle background immediately
    updateBackground(stanzaIndex);
    
    // Step 2: Clean exit from previous stanza
    await cleanExitCurrentStanza();
    
    // Step 3: Enter new stanza with proper timing
    await enterNewStanza(stanzaIndex);
    
    currentStanza = stanzaIndex;
  }

  async function cleanExitCurrentStanza() {
    // Get all currently visible characters
    const visibleCharacters = Object.values(characters).filter(char => 
      char && char.classList.contains('visible')
    );

    // Hide heaven clouds immediately if visible
    if (heavenClouds?.classList.contains('visible')) {
      heavenClouds.classList.remove('visible');
    }

    // Fade out visible characters with slight stagger
    const fadePromises = visibleCharacters.map((char, index) => 
      manageAnimation(char, 'fadeOut', null, FADE_DURATION)
    );

    // Wait for all fade-outs to complete
    await Promise.all(fadePromises);
    
    // Small pause between exit and enter
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  async function enterNewStanza(stanzaIndex) {
    switch (stanzaIndex) {
      case 1:
        // Landing page - no characters
        break;

      case 2:
        // Girl walks in
        await manageAnimation(characters.girl, 'walkIn', 'walk-in', WALK_DURATION);
        break;

      case 3:
        // Boy walks in, then girl2 appears
        const boyPromise = manageAnimation(characters.boy, 'walkIn', 'walk-in', WALK_DURATION);
        
        // Start girl2 after a delay
        setTimeout(() => {
          manageAnimation(characters.girl2, 'fadeIn', null, FADE_DURATION);
        }, STAGGER_DELAY);
        
        await boyPromise;
        break;

      case 4:
        // Lovers appear and grow
        await manageAnimation(characters.lovers, 'fadeIn', null, TRANSITION_DURATION);
        break;

      case 5:
        // Lovers shrink, heaven appears
        await manageAnimation(characters.lovers, 'fadeIn', 'shrink', TRANSITION_DURATION);
        
        // Show heaven clouds after lovers finish shrinking
        setTimeout(() => {
          heavenClouds?.classList.add('visible');
        }, TRANSITION_DURATION / 2);
        break;

      case 6:
        // Angel flies in
        await manageAnimation(characters.angel, 'fadeIn', null, WALK_DURATION);
        break;

      case 7:
        // Final scene with staggered entrances
        manageAnimation(characters.girl3, 'fadeIn', null, FADE_DURATION);
        
        setTimeout(() => {
          manageAnimation(characters.angel2, 'fadeIn', null, TRANSITION_DURATION);
        }, STAGGER_DELAY);
        
        setTimeout(() => {
          manageAnimation(characters.gust, 'fadeIn', null, TRANSITION_DURATION);
        }, STAGGER_DELAY * 2);
        break;
    }
  }

  // Improved Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    if (isTransitioning) return; // Prevent overlapping transitions
    
    // Find the entry with highest intersection ratio
    const mostVisible = entries.reduce((prev, current) => 
      current.intersectionRatio > prev.intersectionRatio ? current : prev
    );

    if (mostVisible.isIntersecting && mostVisible.intersectionRatio > 0.5) {
      const stanzaIndex = parseInt(mostVisible.target.dataset.stanza);
      
      if (stanzaIndex !== currentStanza) {
        isTransitioning = true;
        
        transitionToStanza(stanzaIndex).then(() => {
          // Add delay before allowing next transition
          setTimeout(() => {
            isTransitioning = false;
          }, 500);
        }).catch((error) => {
          console.error('Transition error:', error);
          isTransitioning = false;
        });
      }
    }
  }, { 
    threshold: [0.3, 0.5, 0.7],
    rootMargin: "-20% 0px -20% 0px" // Prevent premature triggering
  });

  // Initialize observer
  sections.forEach((section) => observer.observe(section));
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    activeAnimations.forEach(timeout => clearTimeout(timeout));
    activeAnimations.clear();
  });
  
  // Debug helper (remove in production)
  window.debugAnimations = () => {
    console.log('Current stanza:', currentStanza);
    console.log('Active animations:', activeAnimations);
    console.log('Is transitioning:', isTransitioning);
  };
});