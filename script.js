document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // ------------------------------------------------------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('is-active'); // Optional: for 'X' animation
    });

    // ------------------------------------------------------------------
    // 2. Smooth Scrolling
    // ------------------------------------------------------------------
    document.querySelectorAll('#nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu after clicking a link
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('is-active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position for sticky header
                const headerHeight = document.getElementById('main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------------------------------
    // 3. Testimonial Slider
    // ------------------------------------------------------------------
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to the current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Dot navigation functionality
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            // Reset interval on manual click
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
            showSlide(index);
        });
    });

    // Initialize the slider
    showSlide(currentSlide);

    // ------------------------------------------------------------------
    // 4. Contact Form Validation
    // ------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Basic required field validation
        if (name === '' || email === '' || message === '') {
            displayFormMessage('Please fill in all required fields.', 'error');
            isValid = false;
        }

        // Basic email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isValid && !emailPattern.test(email)) {
            displayFormMessage('Please enter a valid email address.', 'error');
            isValid = false;
        }

        if (isValid) {
            // Simulate successful form submission (In a real app, this would be an AJAX call)
            console.log('Form Data:', { name, email, phone: document.getElementById('phone').value.trim(), message });
            displayFormMessage('Thank you for your request! We will contact you soon.', 'success');
            contactForm.reset();
        }
    });
    
    function displayFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
    }
});