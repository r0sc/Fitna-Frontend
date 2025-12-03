document.addEventListener("DOMContentLoaded", () => {
    // ==================== DEVICE & STANDALONE DETECTION ====================
    
    // Prüft ob die App als Webapp vom Homescreen geöffnet wurde
    const isStandalone = () => {
        // iOS Safari standalone mode
        if (window.navigator.standalone === true) {
            return true;
        }
        // Android / andere Browser (PWA mode)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return true;
        }
        // Fallback: Check URL parameter (für Debugging)
        if (new URLSearchParams(window.location.search).get('standalone') === 'true') {
            return true;
        }
        return false;
    };

<<<<<<< HEAD
    // Prüft ob es ein Mobilgerät ist
    const isMobileDevice = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Check für mobile User Agents
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        // Auch Touch-Fähigkeit und Bildschirmgröße prüfen
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        
        return mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen);
    };

    // Prüft ob iOS
    const isIOS = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /iPhone|iPad|iPod/i.test(userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad mit iPadOS
    };

    // Prüft ob der User den Prompt bereits abgelehnt hat (Session-basiert)
    const hasSkippedInstall = () => {
        return sessionStorage.getItem('fitna-install-skipped') === 'true';
    };

    // ==================== INSTALL PROMPT LOGIC ====================
    const installOverlay = document.getElementById('install-overlay');
    const installRecommendation = document.getElementById('install-recommendation');
    const installIOS = document.getElementById('install-ios');
    const installAndroid = document.getElementById('install-android');
    const installSkipBtn = document.getElementById('install-skip');
    const installConfirmBtn = document.getElementById('install-confirm');
    const installBackIOS = document.getElementById('install-back-ios');
    const installBackAndroid = document.getElementById('install-back-android');

    // Zeige Install-Empfehlung nur auf Mobilgeräten, nicht im Standalone-Modus, und wenn nicht übersprungen
    if (isMobileDevice() && !isStandalone() && !hasSkippedInstall()) {
        installOverlay.classList.add('visible');
        console.log('📱 Mobilgerät erkannt - zeige Install-Empfehlung');
        console.log(isIOS() ? '🍎 iOS erkannt' : '🤖 Android erkannt');
    } else if (isStandalone()) {
        console.log('✅ Standalone/Webapp-Modus erkannt - zeige Login');
    } else if (!isMobileDevice()) {
        console.log('🖥️ Desktop erkannt - keine Install-Empfehlung');
    }

    // Skip Button - schließt das Overlay und merkt sich die Entscheidung
    if (installSkipBtn) {
        installSkipBtn.addEventListener('click', () => {
            installOverlay.classList.remove('visible');
            sessionStorage.setItem('fitna-install-skipped', 'true');
            console.log('⏭️ Install übersprungen');
        });
    }

    // Confirm Button - zeigt das passende Tutorial
    if (installConfirmBtn) {
        installConfirmBtn.addEventListener('click', () => {
            installRecommendation.classList.remove('active');
            
            if (isIOS()) {
                installIOS.classList.add('active');
                console.log('📖 Zeige iOS Tutorial');
            } else {
                installAndroid.classList.add('active');
                console.log('📖 Zeige Android Tutorial');
            }
        });
    }

    // Back Buttons - schließen das Overlay
    if (installBackIOS) {
        installBackIOS.addEventListener('click', () => {
            installOverlay.classList.remove('visible');
            // Reset für nächsten Besuch
            setTimeout(() => {
                installIOS.classList.remove('active');
                installRecommendation.classList.add('active');
            }, 300);
        });
    }

    if (installBackAndroid) {
        installBackAndroid.addEventListener('click', () => {
            installOverlay.classList.remove('visible');
            // Reset für nächsten Besuch
            setTimeout(() => {
                installAndroid.classList.remove('active');
                installRecommendation.classList.add('active');
            }, 300);
        });
=======
    // Prüft ob es sich um ein mobiles Gerät handelt (Smartphone/Tablet)
    const isMobileDevice = () => {
        // Prüfe auf Touch-Fähigkeit + kleine Bildschirmbreite
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 1024;
        
        // User-Agent Check als zusätzliche Absicherung
        const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        return (hasTouchScreen && isSmallScreen) || mobileUserAgent;
    };

    // Zeige Install-Prompt NUR auf mobilen Geräten und wenn nicht im Standalone-Modus
    if (isMobileDevice() && !isStandalone()) {
        document.body.classList.add('show-install-prompt');
        console.log('📱 Mobiles Gerät im Browser-Modus erkannt - zeige Install-Anleitung');
    } else {
        document.body.classList.remove('show-install-prompt');
        if (!isMobileDevice()) {
            console.log('🖥️ Desktop erkannt - zeige direkt Login');
        } else {
            console.log('✅ Standalone/Webapp-Modus erkannt - zeige Login');
        }
>>>>>>> 87a5b3b88205dad15f8920c176ee008d25711458
    }

    // ==================== HINTERGRUND-SLIDESHOW ====================
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
        htl: document.getElementById("htl-form"),
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

