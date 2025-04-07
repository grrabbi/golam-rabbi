// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hide');
        }, 500);
    });

    
    // Typing Animation
const typingElement = document.querySelector('.typed-text'); // ".typing-text" → ".typed-text"
if (typingElement) {
    const words = JSON.parse(typingElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}


    // Theme Toggle Functionality
    const bodyElement = document.body;
    const themeToggle = document.getElementById('theme-toggle-checkbox');

    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');

    // Apply the right theme based on stored preference or OS preference
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
        bodyElement.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        bodyElement.classList.remove('dark-theme');
        themeToggle.checked = false;
    }

    // Handle theme toggle changes
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            bodyElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            bodyElement.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Ensure theme toggle works on mobile devices
    document.addEventListener('touchend', function(e) {
        if (e.target.closest('.theme-toggle-label')) {
            const isCurrentlyChecked = themeToggle.checked;
            themeToggle.checked = !isCurrentlyChecked;
            
            // Trigger the change event manually
            const changeEvent = new Event('change');
            themeToggle.dispatchEvent(changeEvent);
        }
    }, false);

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a.nav-link, .hero-btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.classList.add('is-invalid');
            } else {
                nameInput.classList.remove('is-invalid');
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('is-invalid');
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                messageInput.classList.add('is-invalid');
            } else {
                messageInput.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Portfolio Filtering
    const portfolioFilters = document.querySelectorAll('.portfolio-filter li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Set "All" filter as active by default
    const allFilter = document.querySelector('.portfolio-filter li[data-filter="all"]');
    if (allFilter) {
        allFilter.classList.add('active');
    }
    
    // Make all portfolio items visible by default
    portfolioItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });
    
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            portfolioFilters.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox for Portfolio Images
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    portfolioImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            bodyElement.appendChild(lightbox);
            
            // Prevent scrolling when lightbox is open
            bodyElement.style.overflow = 'hidden';
            
            // Show lightbox with animation
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close lightbox when clicking close button or outside the image
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    bodyElement.removeChild(lightbox);
                    bodyElement.style.overflow = '';
                }, 300);
            }
        });
    });

    

    // Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile-specific enhancements
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        // Add active class to current section's nav link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                if (href === current) {
                    link.classList.add('active');
                }
            });
        });
        
        // Optimize animations for mobile
        const animateOnScrollElementsMobile = document.querySelectorAll('.animate-on-scroll');
        animateOnScrollElementsMobile.forEach(element => {
            element.classList.add('animate');
        });
        
        // Add touch feedback to buttons and links
        const touchElements = document.querySelectorAll('.nav-link, .hero-btn, .custom-btn, .custom-btn-outline, .portfolio-filter li, .blog-link');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-bar");

    function animateProgressBars() {
        progressBars.forEach((bar) => {
            const progress = bar.getAttribute("data-progress");
            bar.style.width = progress + "%";
        });
    }

    function handleScroll() {
        const skillsSection = document.querySelector(".skills-section");
        if (!skillsSection) return;

        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionPos < screenHeight - 100) {
            animateProgressBars();
            window.removeEventListener("scroll", handleScroll);
        }
    }

    window.addEventListener("scroll", handleScroll);
});

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default submit

    const formData = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert("✅ Message sent successfully!");
          form.reset();
        } else {
          alert("❌ Failed to send message. Please try again.");
        }
      })
      .catch(error => {
        alert("⚠️ Something went wrong.");
      });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Function to increment page views
    function incrementPageViews() {
        // Get current page views from localStorage
        let pageViews = localStorage.getItem('portfolio_page_views');
        
        // If no views yet, initialize with 0
        if (!pageViews) {
            pageViews = 0;
        } else {
            pageViews = parseInt(pageViews);
        }
        
        // Increment views
        pageViews++;
        
        // Save back to localStorage
        localStorage.setItem('portfolio_page_views', pageViews);
        
        // Update any view counter elements on the page
        const viewCounters = document.querySelectorAll('.page-view-count');
        if (viewCounters.length > 0) {
            viewCounters.forEach(counter => {
                counter.textContent = pageViews;
            });
        }
        
        // For demonstration purposes, we'll also update the admin dashboard if it's open
        // In a real application, this would be done through a server-side API
        if (window.parent && window.parent.document.getElementById('page-views')) {
            window.parent.document.getElementById('page-views').textContent = pageViews;
        }
    }
    
    // Record daily views (for the chart in admin dashboard)
    function recordDailyViews() {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
        // Get stored daily views
        let dailyViews = localStorage.getItem('portfolio_daily_views');
        
        if (!dailyViews) {
            // Initialize with empty object
            dailyViews = {};
        } else {
            dailyViews = JSON.parse(dailyViews);
        }
        
        // Increment today's views
        if (!dailyViews[today]) {
            dailyViews[today] = 1;
        } else {
            dailyViews[today]++;
        }
        
        // Save back to localStorage
        localStorage.setItem('portfolio_daily_views', JSON.stringify(dailyViews));
    }
    
    // Call functions to track page view
    incrementPageViews();
    recordDailyViews();
});

