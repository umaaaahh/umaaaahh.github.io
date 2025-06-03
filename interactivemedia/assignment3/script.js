document.addEventListener("DOMContentLoaded", () => {
    // Elements for visibility
    const characters = {
        girl: document.querySelector(".girl"),
        girl2: document.querySelector(".girl2"),
        boy: document.querySelector(".boy"),
        lovers: document.querySelector(".lovers"),
    };
    
    const stage = document.querySelector(".stage");
    const sections = document.querySelectorAll(".poem-section");

    // Helper function to toggle visibility
    function toggleVisibility(element, isVisible) {
        if (element) {
            element.classList.toggle("visible", isVisible);
        }
    }

    // Initialize IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const stanzaIndex = parseInt(entry.target.dataset.stanza); // Define first

            // Girl walks in at stanza 2
            if (stanzaIndex === 2) {
                toggleVisibility(characters.girl, entry.isIntersecting);
                characters.girl.classList.toggle("walk-in", entry.isIntersecting);
            }

            // Boy and second girl appear in stanza 3
            if (stanzaIndex === 3) {
                toggleVisibility(characters.boy, entry.isIntersecting);
                characters.boy.classList.toggle("walk-in", entry.isIntersecting);

                toggleVisibility(characters.girl2, entry.isIntersecting);
            }

            // Lovers zoom-in & fade effect at stanza 4
            if (stanzaIndex === 4) {
                if (entry.isIntersecting) {
                    characters.lovers.classList.add("zoom-in", "visible");
                    stage.classList.add("fade-background");
                } else {
                    characters.lovers.classList.remove("zoom-in", "visible");
                    stage.classList.remove("fade-background");
                }
            }

            // Standard visibility logic for stanzas 4 and 5
            if ([4, 5].includes(stanzaIndex)) {
                toggleVisibility(characters.lovers, entry.isIntersecting);
            }

            // Background hides in stanzas 4, 5, 6
            if ([4, 5, 6].includes(stanzaIndex)) {
                stage.classList.toggle("hide-background", entry.isIntersecting);
            }

            // Restore background if scrolling back to stanza 3
            if (stanzaIndex < 4 && entry.isIntersecting) {
                stage.classList.remove("hide-background");
            }
        });
    }, { threshold: 0.6 });

    // Observe each section
    sections.forEach(section => observer.observe(section));

    // // Parallax Effect for Background
    // window.addEventListener("scroll", () => {
    //     const scrollY = window.scrollY;
    //     document.querySelector(".bg.sea img").style.transform = translateY(${scrollY * 0.02}px);
    //     document.querySelector(".bg.stars").style.transform = translateY(${scrollY * 0.01}px);
    // });
});