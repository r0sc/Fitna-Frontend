document.addEventListener("DOMContentLoaded", () => {
    // Hintergrund-Slideshow mit smoothem Crossfade
    const slides = document.querySelectorAll(".bg-slide");
    
    const bgImages = [
        "img/gym_bild3.png",
        "img/gym_bild1.png",
        "img/gym_bild2.png",
    ];

    if (slides.length >= 2 && bgImages.length > 0) {
        let currentIndex = 0;
        let activeSlide = 0;
        
        // Erstes Bild laden
        slides[0].style.backgroundImage = `url("${bgImages[0]}")`;
        slides[0].classList.add("active");
        
        // Nächstes Bild vorladen
        slides[1].style.backgroundImage = `url("${bgImages[1]}")`;

        setInterval(() => {
            // Aktuellen Index erhöhen
            currentIndex = (currentIndex + 1) % bgImages.length;
            const nextIndex = (currentIndex + 1) % bgImages.length;
            
            // Aktiven Slide wechseln
            const currentSlide = slides[activeSlide];
            const nextSlide = slides[1 - activeSlide];
            
            // Nächstes Bild setzen und aktivieren
            nextSlide.style.backgroundImage = `url("${bgImages[currentIndex]}")`;
            
            // Crossfade
            currentSlide.classList.remove("active");
            nextSlide.classList.add("active");
            
            // Aktiven Slide-Index wechseln
            activeSlide = 1 - activeSlide;
            
            // Übernächstes Bild vorladen (nach der Transition)
            setTimeout(() => {
                slides[1 - activeSlide].style.backgroundImage = `url("${bgImages[nextIndex]}")`;
            }, 1600);
            
        }, 6000); // alle 6 Sekunden
    }

    // Tabs & Form-Logik
    const tabs = document.querySelectorAll(".tab");
    const forms = {
        login: document.getElementById("login-form"),
        register: document.getElementById("register-form"),
    };

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;
            if (!target) return;

            // Tabs aktivieren/deaktivieren
            tabs.forEach((t) => t.classList.toggle("active", t === tab));

            // Formulare umschalten
            Object.entries(forms).forEach(([key, form]) => {
                if (!form) return;
                form.classList.toggle("active", key === target);
            });
        });
    });

    // Dummy-Submit-Handler, damit die Seite nicht neu lädt
    Object.values(forms).forEach((form) => {
        if (!form) return;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const mode = form.id === "login-form" ? "Login" : "Registrierung";
            alert(`${mode}‑Formular wurde gesendet (hier kannst du deine Logik einbauen).`);
        });
    });
});

