document.addEventListener("DOMContentLoaded", () => {
  const girl = document.querySelector(".girl");
  const girl2 = document.querySelector(".girl2");
  const boy = document.querySelector(".boy");
  const lovers = document.querySelector(".lovers");
  const sections = document.querySelectorAll(".poem-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const stanza = entry.target.dataset.stanza;

      if (stanza === "2") {
        if (entry.isIntersecting) {
          girl.classList.add("visible", "walk-in");
        } else {
          girl.classList.remove("visible", "walk-in");
        }
      }

      if (stanza === "3") {
        if (entry.isIntersecting) {
          boy.classList.add("visible");
          girl2.classList.add("visible");
        } else {
          boy.classList.remove("visible");
          girl2.classList.remove("visible");
        }
      }

      if (stanza === "4") {
        if (entry.isIntersecting) {
          lovers.classList.add("visible");
        } else {
          lovers.classList.remove("visible");
        }
      }
    });
  }, {
    threshold: 0.6
  });

  sections.forEach(section => observer.observe(section));
});