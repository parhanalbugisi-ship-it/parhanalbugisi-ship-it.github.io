document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close drawer when link clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    /* ==========================================================================
       2. SCROLL EFFECT FOR NAVBAR & SCROLL SPY
       ========================================================================== */
    const navbar = document.getElementById('main-navbar');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky scrolled style
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy active navigation link
        let currentSectionId = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 120;
            const sectionHeight = sec.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on load

    /* ==========================================================================
       3. TYPEWRITER EFFECT (HERO SECTION)
       ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            "Mahasiswa Web Developer",
            "Penghafal Al-Qur'an (Tahfidz)",
            "Pesilat Gasmi (Pagar Nusa)",
            "Praktisi Olahraga Boxing"
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentPhrase = phrases[phraseIdx];

            if (isDeleting) {
                // Deleting text
                typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 50; // Deletion is faster
            } else {
                // Typing text
                typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 120; // Normal typing speed
            }

            // State changes
            if (!isDeleting && charIdx === currentPhrase.length) {
                // Fully typed, pause before deletion
                isDeleting = true;
                typingSpeed = 2000; // Keep it on screen for 2s
            } else if (isDeleting && charIdx === 0) {
                // Fully deleted, move to next phrase
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 500; // Small delay before next phrase starts
            }

            setTimeout(type, typingSpeed);
        };

        // Start typewriter loop
        setTimeout(type, 800);
    }

    /* ==========================================================================
       4. ISLAMIC STUDIES TABS
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active to current elements
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       5. PORTFOLIO FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-item-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                // Apply fade out then display toggle
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==========================================================================
       6. CONTACT FORM SIMULATION
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback-message');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Retrieve form values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.textContent = "Semua kolom input wajib diisi!";
                formFeedback.className = "form-feedback error";
                return;
            }

            // Kirim data formulir menggunakan FormSubmit API secara AJAX (latar belakang)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
            formFeedback.style.display = 'none';

            fetch("https://formsubmit.co/ajax/EMAIL_ANDA@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Nama: name,
                    Email: email,
                    Subjek: subject,
                    Pesan: message
                })
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                if (data.success === "true" || data.success === true) {
                    contactForm.reset();
                    formFeedback.textContent = `Terima kasih ${name}, pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda.`;
                    formFeedback.className = "form-feedback success";
                    formFeedback.style.display = 'block';
                } else {
                    formFeedback.textContent = "Gagal mengirim pesan. Silakan coba lagi nanti.";
                    formFeedback.className = "form-feedback error";
                    formFeedback.style.display = 'block';
                }

                // Sembunyikan notifikasi setelah 5 detik
                setTimeout(() => {
                    formFeedback.style.opacity = '0';
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                        formFeedback.style.opacity = '1';
                    }, 500);
                }, 5000);
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                formFeedback.textContent = "Terjadi kesalahan koneksi. Silakan coba lagi.";
                formFeedback.className = "form-feedback error";
                formFeedback.style.display = 'block';
                
                setTimeout(() => {
                    formFeedback.style.opacity = '0';
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                        formFeedback.style.opacity = '1';
                    }, 500);
                }, 5000);
            });
        });
    }
});
