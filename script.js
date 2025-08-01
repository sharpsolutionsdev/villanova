// Navigation functionality
class Navigation {
    constructor() {
        this.nav = document.getElementById('navigation');
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileNav = document.getElementById('mobile-nav');
        this.logo = document.getElementById('logo');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupLogoClick();
    }
    
setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) { // When scrolled down (page 2)
                this.nav.classList.add('scrolled');
                this.nav.classList.remove('nav-at-top'); // Ensure this is removed
            } else { // At the top (page 1)
                this.nav.classList.remove('scrolled');
                this.nav.classList.add('nav-at-top'); // Add new class for at-top state
            }
        });
        // Initial check on load to set the correct state immediately
        if (window.scrollY > 100) {
            this.nav.classList.add('scrolled');
            this.nav.classList.remove('nav-at-top');
        } else {
            this.nav.classList.remove('scrolled');
            this.nav.classList.add('nav-at-top');
        }
    }
    
    setupMobileMenu() {
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.nav.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.mobileMenuBtn.classList.toggle('active');
        this.mobileNav.classList.toggle('active');
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileMenuBtn.classList.remove('active');
        this.mobileNav.classList.remove('active');
    }
    
    setupSmoothScrolling() {
        // Handle all navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });
    }
    
    setupLogoClick() {
        this.logo.addEventListener('click', () => {
            this.scrollToSection('#hero');
        });
    }
    
    scrollToSection(sectionId) {
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        this.closeMobileMenu();
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.scroll-animate');
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add staggered delay for elements in the same container
                    const container = entry.target.closest('.socials-icons, .epk-grid, .band-grid');
                    if (container) {
                        this.addStaggeredAnimation(container);
                    }
                }
            });
        }, options);
    }
    
    observeElements() {
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    addStaggeredAnimation(container) {
        const elements = container.querySelectorAll('.scroll-animate');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        });
    }
}

// Social media hover effects
class SocialEffects {
    constructor() {
        this.socialIcons = document.querySelectorAll('.social-icon, .footer-social');
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
    }
    
    setupHoverEffects() {
        this.socialIcons.forEach(icon => {
            const originalColor = 'white';
            let hoverColor = '';
            
            // Determine hover color based on social platform
            if (icon.classList.contains('instagram')) {
                hoverColor = '#E4405F';
            } else if (icon.classList.contains('soundcloud')) {
                hoverColor = '#FF3300';
            } else if (icon.classList.contains('tiktok')) {
                hoverColor = '#000000';
            } else if (icon.classList.contains('spotify')) {
                hoverColor = '#1DB954';
            } else if (icon.classList.contains('youtube')) {
                hoverColor = '#FF0000';
            }
            
            if (hoverColor) {
                icon.addEventListener('mouseenter', () => {
                    if (!icon.classList.contains('tiktok')) {
                        icon.style.color = hoverColor;
                    }
                });
                
                icon.addEventListener('mouseleave', () => {
                    icon.style.color = originalColor;
                    if (icon.classList.contains('tiktok')) {
                        icon.style.filter = '';
                    }
                });
            }
        });
    }
}

// EPK Download functionality
// ...existing code...

class EPKDownloads {
    constructor() {
        this.logoFiles = [
            "Images/Logo Pack.zip",
        ];
        this.photoFiles = [
            "Images/Band Pack.zip",
        ];
        this.musicFiles = [
            "Images/superstition.mp3"
        ];
        this.init();
    }

    init() {
        // Single image download (existing)
        window.downloadImage = this.downloadImage.bind(this);

        // Multi-logo download
        document.querySelectorAll('.download-all-logos').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.downloadMultipleImages(this.logoFiles, btn);
            });
        });

        // Multi-photo download
        document.querySelectorAll('.download-all-photos').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.downloadMultipleImages(this.photoFiles, btn);
            });
        });

        // Multi-music download
        document.querySelectorAll('.download-all-music').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.downloadMultipleImages(this.musicFiles, btn);
            });
        });
    }

    async downloadImage(imageUrl, filename) {
        const button = event?.target?.closest('.download-btn');
        let originalText;
        if (button) {
            originalText = button.innerHTML;
            button.innerHTML = this.getLoadingHTML();
            button.disabled = true;
        }
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename ? `${filename}${this.getFileExtension(imageUrl)}` : imageUrl.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            if (button) {
                button.innerHTML = originalText;
                button.disabled = false;
            }
            this.showDownloadSuccess(filename || imageUrl);
        } catch (error) {
            if (button) {
                button.innerHTML = originalText;
                button.disabled = false;
            }
            this.showDownloadError();
        }
    }

    async downloadMultipleImages(fileUrls, button) {
        const originalText = button.innerHTML;
        button.innerHTML = this.getLoadingHTML("Downloading...");
        button.disabled = true;
        let successCount = 0;
        for (const url of fileUrls) {
            try {
                const filename = url.split('/').pop().replace(/\.[^/.]+$/, "");
                await this.downloadImageDirect(url, filename);
                successCount++;
            } catch (e) {
                // Ignore individual errors, show error at end if needed
            }
        }
        button.innerHTML = originalText;
        button.disabled = false;
        if (successCount === fileUrls.length) {
            this.showDownloadSuccess("All files");
        } else {
            this.showDownloadError();
        }
    }

    // Helper for direct download (no button UI)
    async downloadImageDirect(fileUrl, filename) {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}${this.getFileExtension(fileUrl)}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    getFileExtension(filename) {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 1) ? filename.slice(filename.lastIndexOf(".")) : "";
    }

    getLoadingHTML(text = "Downloading...") {
        return `<div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 1rem; height: 1rem; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>${text}
        </div>`;
    }

    showDownloadSuccess(filename) {
        this.showNotification(`Downloaded ${filename} successfully!`, 'success');
    }

    showDownloadError() {
        this.showNotification('Download failed. Please try again.', 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `download-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#6a7e62' : '#d4183d'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            font-family: 'Michroma', sans-serif;
            font-size: 0.875rem;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// ...existing code...

// Contact form functionality
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.setupFormSubmission();
            this.setupFormValidation();
        }
    }
    
    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            // Form will submit naturally to FormSubmit.co
            // Just add some visual feedback
            const submitBtn = this.form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // The form will redirect, but in case it doesn't:
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 5000);
        });
    }
    
    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.target.style.borderColor = '#d4183d';
            });
            
            input.addEventListener('input', (e) => {
                if (e.target.validity.valid) {
                    e.target.style.borderColor = 'white';
                }
            });
        });
    }
}

// Gallery hover effects
class GalleryEffects {
    constructor() {
        this.galleryImages = document.querySelectorAll('.gallery-image');
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
    }
    
    setupHoverEffects() {
        this.galleryImages.forEach((image, index) => {
            image.addEventListener('mouseenter', () => {
                const rotations = [2, -2, 3, -1, 2, -3];
                const rotation = rotations[index % rotations.length];
                image.style.transform = `scale(1.05) rotate(${rotation}deg)`;
            });
            
            image.addEventListener('mouseleave', () => {
                image.style.transform = '';
            });
        });
    }
}

// Utility functions
const utils = {
    // Smooth scroll to section
    scrollToSection: function(sectionId) {
        const nav = new Navigation();
        nav.scrollToSection(sectionId);
    },
    
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new SocialEffects();
    new EPKDownloads();
    new ContactForm();
    new GalleryEffects();
    
    // Add loading class removal for initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Performance optimization: Lazy load background images on mobile
    if (window.innerWidth <= 768) {
        const lazyBackgrounds = document.querySelectorAll('[class*="-bg"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bgElement = entry.target;
                    // Background images are already set in CSS, just add loaded class
                    bgElement.classList.add('bg-loaded');
                    imageObserver.unobserve(bgElement);
                }
            });
        });
        
        lazyBackgrounds.forEach(bg => imageObserver.observe(bg));
    }
});

// Handle window resize events
window.addEventListener('resize', utils.debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const nav = document.getElementById('navigation');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    }
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (mobileNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    }
    
    // Arrow keys for gallery navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('gallery-image')) {
            e.preventDefault();
            const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
            const currentIndex = galleryImages.indexOf(focusedElement);
            
            let nextIndex;
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
            } else {
                nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
            }
            
            galleryImages[nextIndex].focus();
        }
    }
});

// Add focus styles for accessibility
const style = document.createElement('style');
style.textContent = `
    .gallery-image {
        cursor: pointer;
        outline: none;
    }
    
    .gallery-image:focus {
        outline: 2px solid #6a7e62;
        outline-offset: 2px;
    }
    
    .nav-link:focus,
    .mobile-nav-link:focus,
    .social-icon:focus,
    .footer-social:focus {
        outline: 2px solid #6a7e62;
        outline-offset: 2px;
    }
    
    .download-btn:focus,
    .hero-cta:focus,
    .form-submit:focus {
        outline: 2px solid #6a7e62;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Make gallery images focusable for keyboard navigation
document.querySelectorAll('.gallery-image').forEach(image => {
    image.setAttribute('tabindex', '0');
});

// Expose utility functions globally
window.scrollToSection = utils.scrollToSection;

// const burger = document.getElementById('mobile-menu-btn');
// const mobileNav = document.getElementById('mobile-nav');

// burger.addEventListener('click', () => {
//     mobileNav.classList.toggle('open');
// });