const girl = document.querySelector('.girl');
const landing = document.querySelector('#landing');
const scene1 = document.querySelector('#scene1');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      girl.classList.add('visible');
      landing.classList.add('fade-out');
    } else {
      girl.classList.remove('visible');
      landing.classList.remove('fade-out');
    }
  });
}, { threshold: 0.5 });

observer.observe(scene1);


const mask = document.querySelector('#transition-mask');

observer.observe(scene1);

observer.disconnect(); // Add this before re-observing if needed (optional safety)

observer.observe(scene1);

// Trigger mask transition
observer.observe(scene1);
scene1.addEventListener("transitionend", () => {
  mask.classList.add('fade-out');
});

