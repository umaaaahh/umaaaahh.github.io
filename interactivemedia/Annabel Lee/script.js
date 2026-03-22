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

  // ==== PERFORMANCE FIXES: The Fast Scroll Nightmare ====
  //
  // This section contains several fixes that became necessary after discovering
  // that fast scrolling completely broke the animation system. What started as a simple
  // scroll-triggered animation became a debugging nightmare when users could scroll
  // faster than the animations could complete.
  //
  // The core problem: Intersection Observer fires multiple times during rapid scrolling,
  // and setTimeout calls from previous stanzas would still be running when new stanzas
  // triggered. This caused characters to appear in completely wrong scenes—like girl2
  // randomly showing up in stanza 7, or heaven clouds appearing when they shouldn't.
  //
  // I tried throttling, debouncing and state management, but
  // nothing worked reliably. I just kept trying codes I  found online and honestly 
  // I didn't really know what I was doing, it was getting a bit technical for me.
  // Eventually I found clearing ALL timeouts and force-reset ALL elements between every stanza
  // was the only thing that worked, but by that time i added so many other handlers im unsure if they all need to be here.
  //

  let observerTimeout;

  // Track active timeouts to clear them during cleanup
  let activeTimeouts = [];

  // Helper to add animation timing (wasn't sure if that was what was causing the issue, 
  // probably could of commented this out but its not breaking anything)
  function addToQueue(element, duration = 1000) {
    if (element) {
      animationQueue.add(element);
      const timeout = setTimeout(() => {
        animationQueue.delete(element);
      }, duration);
      activeTimeouts.push(timeout);
    }
  }

  // Helper to reset all animation 
  // This was good because originally i was doing it case by case which was clunky
  // But annoying to impliment all these functions, beacuse i had to overhaul the original script
  function resetElement(element) {
    if (element && !animationQueue.has(element)) {
      element.classList.remove("visible", "walk-in", "fade-out", "shrink","dying");
    }
  }

  // I was trying to strong arm my elements with animations to perform unifromly 
  function setElementState(element, isVisible, animationClass = null, duration = 1000) {
    if (!element) return;
    
    if (isVisible) {
      // Force reset first
      element.classList.remove("visible", "walk-in", "fade-out", "shrink", "fade-in");
      element.style.opacity = "";  
      
      // Apply new state immediately
      element.classList.add("visible");
      if (animationClass) {
        element.classList.add(animationClass);
        addToQueue(element, duration);
      }
    } else {
      // Complete removal
      element.classList.remove("visible", "walk-in", "shrink", "fade-");
      if (animationClass === "fade-out") {
        element.classList.add("fade-out");
        addToQueue(element, duration);
      }
    }
  }

  // Needed this get the white background for stanza 4 and 5
  // Originally I was manually adding this in case by case but it was causing issues 
  // if you scrolled up
  function handleBackgroundTransition(shouldHide, delay = 0) {
    setTimeout(() => {
      if (shouldHide) {
        stage.classList.add("hide-background");
      } else {
        stage.classList.remove("hide-background");
      }
    }, delay);
  }

  // This was my first attempt at fixing animation lingering and the first function i added
  // As i mentioned good because before I was adding this all case by case, but annoying to impliment
  // Clean up previous stanza effects 
  function cleanupPreviousStanza(stanzaIndex) {
    // Force cleanup all characters first, then selectively show what's needed
    Object.values(characters).forEach(char => {
      if (char) {
        char.classList.remove("visible", "walk-in", "fade-out", "shrink", "freezing", "dying");
        char.style.opacity = "0"; // Force reset opacity just in case i didnt add it in css
      }
    });
    // All these elements are my extra naughty ones that wouldnt fade away or show up in other places
    // if a user scrolled too fast so they neeeded their own commands
    // FORCED FIX FOR GIRL2 NOT DISAPPEARING SAME SPEED AS BOY
    if (characters.girl2) {
      characters.girl2.classList.remove("visible");
      characters.girl2.style.opacity = "0";
      characters.girl2.style.display = "none"; // Temporarily hide
      // Re-enable later (lol never did that because it works fine as is,
      //  but this could explain a few issues I had with her because I honestly forgot to remove that)
      setTimeout(() => {
        if (characters.girl2) {
          characters.girl2.style.display = "";
        }
      }, 100);
    }
    
    // FORCE clear heaven clouds on EVERY cleanup
    // clouds originally uses a setTimeOut like girl2, so they caused dramas
    // I fixed that by removing their setTimeOut but forgot I added this 
    // which might also explain some issues I was having with the clouds
    if (heavenClouds) {
      heavenClouds.classList.remove("visible");
      heavenClouds.style.opacity = "0"; // Force hide
    }
    
    // Clear white background, i experiemented with a few things with this issue
    // Never any issues on the scroll down, just scroll up or if you scrolled to fast
    if (stage) {
      stage.classList.remove("hide-background");
    }
    
    // Clear animation queue to stop animation continueing because it was clear the other things weren't working
    animationQueue.clear();
  }

  // I just tried it to see and because reddit said it was good at  to have 
  // if your code is handling a lot of animation, originally wanted to slow down scrolling by 
  // removing scroll function during  animation but after trying it and deciding it sucked I tried
  //  this. I guess it works? 
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

  const observer = new IntersectionObserver(throttledObserverCallback, { 
    threshold: 0.5,
    rootMargin: "0px 0px -10% 0px"
  });

  function handleStanzaTransition(stanzaIndex, isEntering) {
    // Okay we get it I was having major transiton timing issues to do with animation.
    if (isEntering) {
      activeTimeouts.forEach(timeout => clearTimeout(timeout));
      activeTimeouts = [];
    }
    //  THIS IS MY STANZA BY STANZA CONTROLS 
    switch (stanzaIndex) {

      // stanza 2 .girl walks in
      case 2:
        if (isEntering) {
          setElementState(characters.girl, true, "walk-in", 2000);
          handleBackgroundTransition(false);
        }
        break;

      // stanza 3 .girl stays in place from previous stanze, boy walks in, .girl swaps to .girl2
      // I fiddled with girl to girl2 transition alot, felt pretty proud of myself when i 
      // figured out this swap
      case 3:
        if (isEntering) {
        
          setElementState(characters.girl, true, null, 2000);
          setElementState(characters.boy, true, "walk-in", 2000);
          
          // controlled by settimeout though that caused me a lot of issues that you saw above, 
          // but honestly girl2 was giving me dramas from the get go, i think she's cursed.
          const stanza3Timeout1 = setTimeout(() => {
            setElementState(characters.girl2, true); // Show Girl2
            const stanza3Timeout2 = setTimeout(() => {
              setElementState(characters.girl, false, "fade-out", 600); // Hide Girl
            }, 150); 
            activeTimeouts.push(stanza3Timeout2);
          }, 1200); 
          activeTimeouts.push(stanza3Timeout1);
          
          handleBackgroundTransition(false);
        }
      break;

      // Stanza 4 lovers embrace, these assets worked perfectly
      case 4:
        if (isEntering) {
          setElementState(characters.lovers, true, null, 2500);
          handleBackgroundTransition(true, 300);
        }
      break;

      // stanza 5 jealous angels on clouds appear
        // shrunk lovers after feedback they looked too big, 
        // Added these stanzas after this point, after feedback the page and experience felt a bit short. 
      case 5:
        if (isEntering) {
          // Removed setTimeout delay on clouds to prevent timing conflicts during fast scroll
          // Heaven clouds now appear instantly when stanza 5 is entered
          setElementState(characters.lovers, true, "shrink", 2500);
          // FORCE heaven clouds to show immediately and make sure they stay
          if (heavenClouds) {
            heavenClouds.classList.add("visible");
            heavenClouds.style.opacity = "1"; // Force visible
          }
          handleBackgroundTransition(true);
        }
      break;

      //  Stanza 6 Angel animates from the sky 
      case 6:
        if (isEntering) {
          setElementState(characters.angel, true, null, 2000);
          handleBackgroundTransition(false, 200);
        }
      break;

      // Stanza 7 angel blows a wind chilling girl
        // Angel sized like this was at first a mistake because I hadn't added css, 
        // but i liked it so I refined it, could of created a better transition 
        // between the angel in the previous stanza and this one
        // Angel is a little pixelated too which isn't ideal, 
        // (actually .girl from stanza 2-3 is a bit pixelated too)
      case 7:
        if (isEntering) {
          // First show girl3 and start her shivering
          setElementState(characters.girl3, true);
          // Start the freezing animation immediately
          const stanza7Timeout1 = setTimeout(() => {
            if (characters.girl3) {
              characters.girl3.classList.add("freezing");
            }
          }, 100);
          activeTimeouts.push(stanza7Timeout1);
          
          // Show angel2 in background
          const stanza7Timeout2 = setTimeout(() => {
            setElementState(characters.angel2, true);
          }, 300);
          activeTimeouts.push(stanza7Timeout2);
          
          // Launch the wind gust after a delay
          const stanza7Timeout3 = setTimeout(() => {
            setElementState(characters.gust, true);
          }, 800);
          activeTimeouts.push(stanza7Timeout3);
          
          // When wind reaches girl3 (after gust animation duration), she dies
          // The gust animation is 2.5s (--slow-transition), so trigger death at 2.3s
          const stanza7Timeout4 = setTimeout(() => {
            if (characters.girl3) {
              // Stop freezing animation and start death fade
              characters.girl3.classList.remove("freezing");
              characters.girl3.classList.add("dying");
            }
          }, 800 + 2300); // 800ms delay + 2300ms for gust to reach her
          activeTimeouts.push(stanza7Timeout4);
        }
      break;

      // This default I know for sure did nothing, I put so many different commands 
      // all asking it to remove the backgrounf before stanza 4
      //  (this is when i only i had 4 stanzas) and it did not work
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
  // Don't feel like this did anything notable either
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Scroll ended 
    }, 100);
  });
});

// Buttons
// Restart the entire poem animation
function restartPoem() {
 window.location.reload();
}

// Open the full poem in a new tab
function readFullPoem() {
 window.open('https://www.poetryfoundation.org/poems/44885/annabel-lee', '_blank');
}
