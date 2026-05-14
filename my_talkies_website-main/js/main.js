document.addEventListener('DOMContentLoaded', () => {
    // Scroll handling for Navbar
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-background/80', 'backdrop-blur-xl', 'border-b', 'border-border/20', 'py-3');
            navbar.classList.remove('bg-transparent', 'py-6');
        } else {
            navbar.classList.remove('bg-background/80', 'backdrop-blur-xl', 'border-b', 'border-border/20', 'py-3');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');

            if (isOpen) {
                // Close menu
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            } else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8', 'translate-x-12', 'translate-y-12');
                entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');

                // Trigger counter animation if it's a counter
                if (entry.target.dataset.counter) {
                    animateCounter(entry.target);
                    delete entry.target.dataset.counter;
                }

                // Trigger counters inside the intersecting element
                entry.target.querySelectorAll('[data-counter]').forEach(counter => {
                    animateCounter(counter);
                    delete counter.dataset.counter;
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // Counter Animation Logic
    const animateCounter = (element) => {
        const target = parseInt(element.innerText); // Assuming the target number is in the text
        // Or better, define it in data attribute
        const finalVal = parseInt(element.dataset.targetValue || 0);
        if (!finalVal) return;

        const duration = 2000;
        const steps = 60;
        const increment = finalVal / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= finalVal) {
                current = finalVal;
                clearInterval(timer);
            }
            element.innerText = Math.floor(current);
        }, duration / steps);
    };
});
