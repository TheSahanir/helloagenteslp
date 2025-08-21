document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change icon between bars and times
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Reset icon to bars
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for internal anchor links only
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Check if it's an internal link (not an external URL with # in it)
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // CTA button click event
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to the test agent section
            const testAgentSection = document.querySelector('#teste-agente');
            if (testAgentSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = testAgentSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Select plan buttons
    const selectPlanButtons = document.querySelectorAll('.select-plan');
    selectPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the plan name
            const planCard = this.closest('.pricing-card');
            const planName = planCard.querySelector('.pricing-header h3').textContent;
            
            // Show a notification or redirect to a sign-up page
            alert(`Você selecionou o plano ${planName}. Redirecionando para a página de cadastro...`);
            
            // In a real implementation, you would redirect to a sign-up page
            // window.location.href = '/signup?plan=' + planName.toLowerCase();
        });
        
        // The chat widget is now only the external script
        // No additional JavaScript needed for the chat functionality
    });
    
    // Add animation to feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state and observe cards
    [...featureCards, ...pricingCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Social media links
    // No need for JavaScript event listeners since the links now have proper href attributes
    // and target="_blank" to open in new tabs
    
    // Email click
    const emailElement = document.querySelector('.email');
    if (emailElement) {
        emailElement.addEventListener('click', function() {
            const email = 'thed@helloagentes.com';
            window.location.href = `mailto:${email}`;
        });
    }
});