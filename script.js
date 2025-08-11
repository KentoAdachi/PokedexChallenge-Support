// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for sticky navigation
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavLink(navLink);
            }
        });
    });
    
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        question.style.cursor = 'pointer';
        question.style.userSelect = 'none';
        
        // Add toggle icon
        const toggleIcon = document.createElement('span');
        toggleIcon.innerHTML = ' ▼';
        toggleIcon.style.fontSize = '0.8em';
        toggleIcon.style.transition = 'transform 0.3s ease';
        question.appendChild(toggleIcon);
        
        let isExpanded = true; // Start expanded
        
        question.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                answer.style.display = 'block';
                toggleIcon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.display = 'none';
                toggleIcon.style.transform = 'rotate(-90deg)';
            }
        });
    });
    
    // Add scroll-to-top button
    createScrollToTopButton();
    
    // Add loading animation for external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
    
    // Add fade-in animation for sections
    addFadeInAnimation();
});

function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.style.color = '#4a5568';
        link.style.borderBottomColor = 'transparent';
    });
    
    // Add active class to current link
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.style.color = '#667eea';
        activeLink.style.borderBottomColor = '#667eea';
    }
}

function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'トップへ戻る');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'scale(1)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'scale(0.8)';
        }
    });
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#5a67d8';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#667eea';
    });
}

function addFadeInAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Handle mobile navigation toggle
function createMobileNavToggle() {
    const nav = document.querySelector('nav ul');
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '☰';
    toggleButton.setAttribute('aria-label', 'メニューを開く');
    toggleButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
        margin: 10px;
    `;
    
    document.querySelector('nav .container').prepend(toggleButton);
    
    toggleButton.addEventListener('click', function() {
        if (nav.style.display === 'none' || nav.style.display === '') {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            this.innerHTML = '✕';
        } else {
            nav.style.display = 'none';
            this.innerHTML = '☰';
        }
    });
    
    // Show toggle button on mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            toggleButton.style.display = 'block';
            if (nav.style.display !== 'flex') {
                nav.style.display = 'none';
            }
        } else {
            toggleButton.style.display = 'none';
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
        }
    });
    
    // Initialize mobile nav state
    if (window.innerWidth <= 768) {
        toggleButton.style.display = 'block';
        nav.style.display = 'none';
    }
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    createMobileNavToggle();
});