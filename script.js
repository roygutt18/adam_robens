document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Hamburguer animation
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 3. Accessibility Widget
    const accessToggle = document.querySelector('.access-toggle');
    const accessWidget = document.getElementById('accessibility-widget');
    const accessClose = document.querySelector('.access-close');

    accessToggle.addEventListener('click', () => {
        accessWidget.classList.toggle('active');
    });

    accessClose.addEventListener('click', () => {
        accessWidget.classList.remove('active');
    });

    // Font Scaling
    const fontPlus = document.getElementById('access-font-plus');
    const fontMinus = document.getElementById('access-font-minus');
    let fontLevel = 0; // 0 = normal, 1 = lg, 2 = xl

    fontPlus.addEventListener('click', () => {
        if (fontLevel < 2) {
            fontLevel++;
            updateFontSize();
        }
    });

    fontMinus.addEventListener('click', () => {
        if (fontLevel > 0) {
            fontLevel--;
            updateFontSize();
        }
    });

    function updateFontSize() {
        document.body.classList.remove('font-lg', 'font-xl');
        if (fontLevel === 1) document.body.classList.add('font-lg');
        if (fontLevel === 2) document.body.classList.add('font-xl');
    }

    // High Contrast
    const contrastBtn = document.getElementById('access-contrast');
    contrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // Reset
    const resetBtn = document.getElementById('access-reset');
    resetBtn.addEventListener('click', () => {
        fontLevel = 0;
        updateFontSize();
        document.body.classList.remove('high-contrast');
    });

    // 4. Form Submission (Simulated)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'שולח...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'ההודעה נשלחה בהצלחה!';
                btn.style.backgroundColor = 'var(--accent-green)';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // Header sticky effect on scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(8, 13, 14, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(15, 23, 26, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
});
