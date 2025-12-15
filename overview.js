document.addEventListener("DOMContentLoaded", () => {
    console.log("🏋️ Overview-Seite geladen");

    // ==================== STREAK LADEN ====================
    const loadStreak = () => {
        const streakText = document.getElementById('streak-text');
        
        // Streak aus localStorage oder API laden
        let streakDays = parseInt(localStorage.getItem('fitna-streak-days')) || 7;
        
        // Formatierung
        let streakLabel = '';
        if (streakDays === 1) {
            streakLabel = '1 Tag Streak 🔥';
        } else if (streakDays < 7) {
            streakLabel = `${streakDays} Tage Streak 🔥`;
        } else if (streakDays === 7) {
            streakLabel = '1 Woche Streak 🔥';
        } else if (streakDays < 30) {
            const weeks = Math.floor(streakDays / 7);
            const days = streakDays % 7;
            if (days === 0) {
                streakLabel = `${weeks} ${weeks === 1 ? 'Woche' : 'Wochen'} Streak 🔥`;
            } else {
                streakLabel = `${weeks}W ${days}T Streak 🔥`;
            }
        } else if (streakDays < 365) {
            const months = Math.floor(streakDays / 30);
            streakLabel = `${months} ${months === 1 ? 'Monat' : 'Monate'} Streak 🔥🔥`;
        } else {
            const years = Math.floor(streakDays / 365);
            streakLabel = `${years} ${years === 1 ? 'Jahr' : 'Jahre'} Streak 🔥🔥🔥`;
        }
        
        streakText.textContent = streakLabel;
        console.log(`🔥 Streak geladen: ${streakDays} Tage`);
        
        // Animation beim Laden
        streakText.style.opacity = '0';
        setTimeout(() => {
            streakText.style.transition = 'opacity 0.5s ease';
            streakText.style.opacity = '1';
        }, 100);
    };

    // ==================== PROGRESS BARS ANIMIEREN ====================
    const animateProgressBars = () => {
        const progressFills = document.querySelectorAll('.progress-fill');
        
        progressFills.forEach(fill => {
            const targetProgress = fill.getAttribute('data-progress');
            setTimeout(() => {
                fill.style.width = `${targetProgress}%`;
            }, 300);
        });
    };

    // ==================== GEWICHTSPROZESS LADEN ====================
    const loadWeightProgress = () => {
        // Gewichtsdaten (später aus API oder LocalStorage)
        const startWeight = parseFloat(localStorage.getItem('fitna-start-weight')) || 90;
        const goalWeight = parseFloat(localStorage.getItem('fitna-goal-weight')) || 70;
        const currentWeight = parseFloat(localStorage.getItem('fitna-current-weight')) || 75;
        
        // Fortschritt berechnen
        const totalDifference = startWeight - goalWeight;
        const currentProgress = startWeight - currentWeight;
        const progressPercentage = Math.round((currentProgress / totalDifference) * 100);
        
        // HTML-Elemente aktualisieren
        document.getElementById('start-weight').textContent = `${startWeight} kg`;
        document.getElementById('current-weight').textContent = `${currentWeight} kg`;
        document.getElementById('goal-weight').textContent = `${goalWeight} kg`;
        document.getElementById('weight-percentage').textContent = `${progressPercentage}%`;
        
        // Progress Bar aktualisieren
        const progressFill = document.getElementById('weight-progress-fill');
        progressFill.setAttribute('data-progress', progressPercentage);
        
        // Current Weight Marker positionieren
        const marker = document.getElementById('current-weight-marker');
        const displayWeight = document.getElementById('current-weight-display');
        displayWeight.textContent = `${currentWeight} kg`;
        
        setTimeout(() => {
            progressFill.style.width = `${progressPercentage}%`;
            marker.style.left = `${progressPercentage}%`;
        }, 300);
        
        console.log(`⚖️ Gewicht geladen: ${currentWeight}kg (${progressPercentage}% Fortschritt)`);
    };

    // ==================== KALORIEN COUNTER ANIMIEREN ====================
    const animateCalorieCounter = () => {
        const currentCaloriesEl = document.getElementById('current-calories');
        const goalCalories = parseInt(document.getElementById('goal-calories').textContent);
        const targetCalories = Math.round(goalCalories * 0.9); // 90% vom Ziel
        
        let current = 0;
        const increment = targetCalories / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= targetCalories) {
                current = targetCalories;
                clearInterval(counter);
            }
            currentCaloriesEl.textContent = Math.round(current);
        }, stepTime);
    };

    // ==================== KALENDER ERSTELLEN ====================
    const createCalendar = () => {
        const calendarContainer = document.getElementById('calendar');
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // Kalender Header
        const header = document.createElement('div');
        header.className = 'calendar-header';
        
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                          'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        
        header.innerHTML = `
            <div class="calendar-month">${monthNames[currentMonth]} ${currentYear}</div>
            <div class="calendar-nav">
                <button class="calendar-nav-btn" id="prev-month">◀</button>
                <button class="calendar-nav-btn" id="next-month">▶</button>
            </div>
        `;
        
        calendarContainer.appendChild(header);

        // Kalender Grid
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        // Wochentage Headers
        const dayHeaders = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        // Tage des Monats
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Starttag (Montag = 0, Sonntag = 6)
        let startDay = firstDay.getDay() - 1;
        if (startDay === -1) startDay = 6;

        // Vorherige Monatstage (leere Felder)
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            grid.appendChild(emptyDay);
        }

        // Aktuelle Monatstage
        const workoutDays = [5, 7, 10, 12, 14]; // Beispiel-Trainingstage
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;
            
            // Heute markieren
            if (day === today.getDate()) {
                dayEl.classList.add('today');
            }
            
            // Trainingstage markieren
            if (workoutDays.includes(day)) {
                dayEl.classList.add('has-workout');
            }
            
            dayEl.addEventListener('click', () => {
                console.log(`📅 Tag ${day} ausgewählt`);
                // Hier könnten Details für den Tag angezeigt werden
            });
            
            grid.appendChild(dayEl);
        }

        calendarContainer.appendChild(grid);

        // Navigation (für spätere Erweiterung)
        document.getElementById('prev-month')?.addEventListener('click', () => {
            console.log('◀ Vorheriger Monat');
        });
        
        document.getElementById('next-month')?.addEventListener('click', () => {
            console.log('▶ Nächster Monat');
        });
    };

    // ==================== ÜBUNGEN LADEN ====================
    const loadExercises = () => {
        const exercisesContainer = document.getElementById('exercises-list');
        
        // Beispiel-Übungen (später aus API laden)
        const exercises = [
            { name: 'Kniebeugen', details: '3 Sätze × 12 Wiederholungen', completed: false },
            { name: 'Liegestütze', details: '3 Sätze × 10 Wiederholungen', completed: false },
            { name: 'Plank', details: '3 Sätze × 30 Sekunden', completed: true },
            { name: 'Ausfallschritte', details: '3 Sätze × 10 pro Bein', completed: false }
        ];

        if (exercises.length === 0) {
            exercisesContainer.innerHTML = `
                <div class="empty-state">
                    <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11l3 3L22 4"/>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                    </svg>
                    <p class="empty-state-text">Keine Übungen für heute geplant</p>
                </div>
            `;
            return;
        }

        exercises.forEach((exercise, index) => {
            const exerciseItem = document.createElement('div');
            exerciseItem.className = 'exercise-item';
            
            exerciseItem.innerHTML = `
                <div class="exercise-info">
                    <div class="exercise-name">${exercise.name}</div>
                    <div class="exercise-details">${exercise.details}</div>
                </div>
                <div class="exercise-status">
                    <div class="exercise-checkbox ${exercise.completed ? 'checked' : ''}" data-index="${index}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                </div>
            `;
            
            exercisesContainer.appendChild(exerciseItem);
        });

        // Checkbox Event Listener
        document.querySelectorAll('.exercise-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                checkbox.classList.toggle('checked');
                exercises[index].completed = !exercises[index].completed;
                console.log(`✅ Übung ${exercises[index].name}: ${exercises[index].completed ? 'erledigt' : 'offen'}`);
                
                // Prüfen ob alle Übungen erledigt sind
                checkAllExercisesCompleted(exercises);
            });
        });
    };

    // ==================== STREAK CELEBRATION ====================
    const checkAllExercisesCompleted = (exercises) => {
        const allCompleted = exercises.every(ex => ex.completed);
        const celebrationShown = sessionStorage.getItem('fitna-celebration-shown');
        
        if (allCompleted && !celebrationShown) {
            setTimeout(() => {
                triggerStreakCelebration();
            }, 500);
        }
    };

    const triggerStreakCelebration = () => {
        const celebration = document.getElementById('streak-celebration');
        const streakNumberEl = document.getElementById('celebration-streak-number');
        const closeBtn = document.getElementById('celebration-close');
        
        // Aktuelle Streak erhöhen
        let currentStreak = parseInt(localStorage.getItem('fitna-streak-days')) || 7;
        currentStreak += 1;
        localStorage.setItem('fitna-streak-days', currentStreak);
        
        // Celebration anzeigen
        celebration.classList.add('visible');
        
        // Confetti starten
        startConfetti();
        
        // Streak-Zahl animiert hochzählen
        animateStreakNumber(currentStreak - 1, currentStreak, streakNumberEl);
        
        // Streak-Badge auch aktualisieren
        setTimeout(() => {
            loadStreak();
        }, 2000);
        
        // Schließen-Button
        closeBtn.addEventListener('click', () => {
            celebration.classList.remove('visible');
            stopConfetti();
            sessionStorage.setItem('fitna-celebration-shown', 'true');
            console.log('🎉 Celebration geschlossen');
        });
        
        console.log('🎉 Streak Celebration ausgelöst! Neue Streak:', currentStreak);
    };

    const animateStreakNumber = (start, end, element) => {
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function für smooth Animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = end;
            }
        };
        
        requestAnimationFrame(animate);
    };

    // ==================== CONFETTI SYSTEM ====================
    let confettiAnimationId = null;
    let particles = [];
    
    const startConfetti = () => {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Confetti-Partikel erstellen
        particles = [];
        const colors = ['#FFD700', '#FF8C00', '#FF4500', '#8b5cff', '#d946ef'];
        
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -10,
                size: Math.random() * 8 + 4,
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 4 - 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }
        
        const animateConfetti = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((p, index) => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
                
                // Update position
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;
                p.speedY += 0.1; // Gravity
                
                // Reset wenn außerhalb
                if (p.y > canvas.height) {
                    p.y = -10;
                    p.x = Math.random() * canvas.width;
                }
            });
            
            confettiAnimationId = requestAnimationFrame(animateConfetti);
        };
        
        animateConfetti();
    };
    
    const stopConfetti = () => {
        if (confettiAnimationId) {
            cancelAnimationFrame(confettiAnimationId);
            confettiAnimationId = null;
        }
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // ==================== INITIALISIERUNG ====================
    loadStreak();
    loadWeightProgress();
    animateProgressBars();
    animateCalorieCounter();
    createCalendar();
    loadExercises();

    // ==================== PROFIL MODAL ====================
    const profileModal = document.getElementById('profile-modal');
    const profileBtn = document.getElementById('profile-btn');
    const profileClose = document.getElementById('profile-close');
    const logoutBtn = document.getElementById('logout-btn');
    const editProfileBtn = document.getElementById('edit-profile');
    const settingsBtn = document.getElementById('settings');

    // Profil Modal öffnen
    profileBtn?.addEventListener('click', () => {
        profileModal.classList.add('visible');
        console.log('👤 Profil-Modal geöffnet');
    });

    // Profil Modal schließen
    profileClose?.addEventListener('click', () => {
        profileModal.classList.remove('visible');
        console.log('❌ Profil-Modal geschlossen');
    });

    // Modal schließen bei Klick außerhalb
    profileModal?.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove('visible');
            console.log('❌ Profil-Modal geschlossen (außerhalb geklickt)');
        }
    });

    // Profil bearbeiten
    editProfileBtn?.addEventListener('click', () => {
        console.log('✏️ Profil bearbeiten');
        // Hier später zur Profil-Bearbeitungsseite navigieren
        alert('Profil-Bearbeitung wird bald verfügbar sein!');
    });

    // Einstellungen
    settingsBtn?.addEventListener('click', () => {
        console.log('⚙️ Einstellungen');
        // Hier später zur Einstellungsseite navigieren
        alert('Einstellungen werden bald verfügbar sein!');
    });

    // Abmelden
    logoutBtn?.addEventListener('click', () => {
        console.log('🚪 Benutzer wird abgemeldet');
        // Hier später Session löschen und zur Login-Seite navigieren
        if (confirm('Möchtest du dich wirklich abmelden?')) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = '/';
        }
    });

    // ==================== BACKGROUND SLIDESHOW ====================
    const bgSlides = document.querySelectorAll('.bg-slide');
    
    const bgImages = [
        "img/gym_bild3.png",
        "img/gym_bild1.png",
        "img/gym_bild2.png",
    ];

    if (bgSlides.length >= 2 && bgImages.length > 0) {
        let currentIndex = 0;
        let activeSlide = 0;
        
        // Erstes Bild laden
        bgSlides[0].style.backgroundImage = `url("${bgImages[0]}")`;
        bgSlides[0].classList.add("active");
        
        // Nächstes Bild vorladen
        bgSlides[1].style.backgroundImage = `url("${bgImages[1]}")`;

        setInterval(() => {
            // Aktuellen Index erhöhen
            currentIndex = (currentIndex + 1) % bgImages.length;
            const nextIndex = (currentIndex + 1) % bgImages.length;
            
            // Wechsel zwischen den beiden Slides
            const currentSlide = activeSlide;
            activeSlide = (activeSlide + 1) % 2;
            
            // Bild für den nächsten aktiven Slide setzen
            bgSlides[activeSlide].style.backgroundImage = `url("${bgImages[currentIndex]}")`;
            
            // Slide wechseln
            bgSlides[currentSlide].classList.remove("active");
            bgSlides[activeSlide].classList.add("active");
            
            // Nächstes Bild vorladen
            const preloadSlide = (activeSlide + 1) % 2;
            bgSlides[preloadSlide].style.backgroundImage = `url("${bgImages[nextIndex]}")`;
        }, 8000);
    }

    console.log("✅ Overview-Seite vollständig initialisiert");
});
