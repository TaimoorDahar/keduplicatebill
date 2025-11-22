/**
 * UX Enhancements for KE Duplicate Bill Website
 * Features: Back to Top, Reading Progress, Smooth Scroll
 */

// Initialize all UX features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
    initReadingProgress();
    initSmoothScroll();
});

/**
 * Back to Top Button
 */
function initBackToTop() {
    // Create button if it doesn't exist
    if (!document.querySelector('.back-to-top')) {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '↑';
        document.body.appendChild(btn);
    }

    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Reading Progress Bar
 */
function initReadingProgress() {
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.reading-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.insertBefore(progressBar, document.body.firstChild);
    }

    const progressBar = document.querySelector('.reading-progress');

    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate scroll percentage
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Update progress bar width
        progressBar.style.width = scrollPercentage + '%';
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Generate Table of Contents (Call this function on article pages)
 */
function generateTableOfContents(containerSelector = '.content-article') {
    const article = document.querySelector(containerSelector);
    if (!article) return;

    // Get all h2 and h3 headings
    const headings = article.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Only show TOC for long articles

    // Create TOC container
    const tocContainer = document.createElement('div');
    tocContainer.className = 'table-of-contents';
    
    const tocTitle = document.createElement('h3');
    tocTitle.textContent = '📋 Table of Contents';
    tocContainer.appendChild(tocTitle);

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    // Generate TOC items
    headings.forEach((heading, index) => {
        // Create ID for heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        
        // Indent h3 items
        if (heading.tagName === 'H3') {
            link.style.paddingLeft = '1rem';
            link.style.fontSize = '0.9rem';
        }

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);

    // Insert TOC after first section or at beginning
    const firstSection = article.querySelector('.content-section');
    if (firstSection) {
        firstSection.insertAdjacentElement('afterend', tocContainer);
    } else {
        article.insertBefore(tocContainer, article.firstChild);
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initBackToTop,
        initReadingProgress,
        initSmoothScroll,
        generateTableOfContents
    };
}
