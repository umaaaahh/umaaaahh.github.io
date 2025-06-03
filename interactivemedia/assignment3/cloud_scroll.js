  // Gust of Wind (Cloud) animation synced with scroll
  const gustOfWind = document.querySelector('#gust-of-wind');  // Gust of wind (cloud)
  
  let lastscrollTop = 0;  // To track last scroll position
  let isScrolling = false;  // To detect if user is scrolling
  
  // Function to trigger the "blowing away" effect for text
  const blowAwayText = (sectionIndex, scrollTop) => {
    poemFrames.forEach((frame, index) => {
      if (index === sectionIndex) {
        // Push the text based on scroll position
        const pushAmount = scrollTop * 0.3; // Adjust how much the text moves (can tweak this multiplier)
        frame.style.transform = `translateX(${pushAmount}px)`;  // Move the text to the right (as if blown by wind)
        frame.classList.add('blown-away');  // Apply the class to start text fade
      } else {
        // Reset the text if the gust isn't on this stanza
        frame.classList.remove('blown-away');
        frame.style.transform = 'translateX(0)'; // Reset the position of the text
      }
    });
  };


const stage = document.querySelector('main.poem-scroll');

  // Scroll Event Listener for Gust and Text Animation
  window.addEventListener('scroll', () => {

    const scrollTop = stage.scrollTop;
    console.log(stage.offsetHeight);
    console.log(stage.scrollTop);

    // If the user scrolls down, move the gust of wind forward
    if (scrollTop > lastscrollTop) {
      gustOfWind.style.transform = `translateX(${Math.min(scrollTop * 0.1, 100)}%)`;  // Gust moves forward at 10% of scroll speed
    } 
    // If the user scrolls up, move the gust of wind backward
    else if (scrollTop < lastscrollTop) {
      gustOfWind.style.transform = `translateX(${Math.max(scrollTop * 0.1, -100)}%)`;  // Gust moves backward
    }

    // Show and hide stanzas based on scroll position
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top < window.innerHeight && section.getBoundingClientRect().bottom > 0) {
        // Blow away the current stanza's text when the gust is near
        blowAwayText(index, scrollTop);
      }
    });

    // Update the last scroll position
    lastscrollTop = scrollTop;
  }, true);

  // Handle scroll start and stop
  window.addEventListener('wheel', () => {
    isScrolling = true;
    clearTimeout(isScrolling); // Clear the previous timeout

    // When the user stops scrolling, we want to stop the animation
    setTimeout(() => {
      isScrolling = false;
    }, 150); // Set a timeout to check when user stops scrolling
  });