/**
 * Layout.js - Handles Header and Footer injection for static pages
 */

document.addEventListener('DOMContentLoaded', () => {
    injectLayout();
    initializeScripts();
    initializeAdSense();
    initializeAnalytics();
});

function initializeAdSense() {
    function loadAdSense() {
        if (document.getElementById('google-adsense')) return;
        var script = document.createElement('script');
        script.id = 'google-adsense';
        script.async = true;
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8161470337922791";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
    }
    document.addEventListener('click', loadAdSense, { once: true });
    document.addEventListener('scroll', loadAdSense, { once: true });
}

function initializeAnalytics() {
    var script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-DV5RQC5ZQW";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-DV5RQC5ZQW');
}

function injectLayout() {
    // Determine path prefix based on current location
    // If we are in a subdirectory (not root), we need to go up one level
    const isRoot = window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/', window.location.pathname.lastIndexOf('KE/') + 4);
    // The above check is tricky for file://. Let's use a simpler heuristic:
    // Check if we are in the root 'KE' folder or a subfolder.
    // We can check if 'css/style.css' exists relative to current location? No, can't check file existence easily.
    // Let's assume standard structure: Root has index.html, Subdirs have index.html.

    // Better approach: Check the script tag that loaded this file? 
    // Or just check if we are in a folder that is NOT the root.

    // Simple heuristic: If the page title is "KE Duplicate Bill..." (Home) vs others.
    // Or check document.location.pathname.

    // Let's try to detect if we are deep.
    const pathSegments = window.location.pathname.split('/').filter(p => p.length > 0);
    const lastSegment = pathSegments[pathSegments.length - 1];

    // If last segment is index.html, look at the one before.
    // If we are at /KE/index.html -> parent is KE.
    // If we are at /KE/subdir/index.html -> parent is subdir.

    // Let's assume we are in a subdirectory if the current folder is NOT "KE" (or whatever the root folder name is).
    // But the root folder name might change.

    // Robust method for this specific project:
    // We will look for the presence of a known root file, but we can't.

    // Let's use the "base" tag if it exists, or default to:
    // If we are in 'k-electric-commercial-connection', prefix is '../'
    // If we are in root, prefix is './'

    // Let's check the script src attribute to find the relative path to js/layout.js
    const scripts = document.getElementsByTagName('script');
    let scriptPath = '';
    for (let script of scripts) {
        if (script.src && script.src.includes('js/layout.js')) {
            scriptPath = script.getAttribute('src'); // This will be "js/layout.js" or "../js/layout.js"
            break;
        }
    }

    const prefix = scriptPath.startsWith('../') ? '../' : './';

    const isUrdu = document.documentElement.lang === 'ur' || window.location.pathname.includes('/ur/');

    let headerHTML = '';
    let footerHTML = '';

    if (isUrdu) {
        // Urdu Header
        headerHTML = `
        <header class="header">
            <div class="container">
                <div class="header-content">
                    <a href="../index.html" class="logo">
                        <img src="../images/ke-duplicate-bill.webp" alt="KE Duplicate Bill">
                    </a>

                    <button class="mobile-menu-btn" aria-label="Toggle Menu" onclick="toggleMenu()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>

                    <nav class="nav" id="nav-menu">
                        <a href="../ur/index.html">ہوم</a>
                        <a href="../index.html">English</a>
                        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
                            <svg class="sun-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                            </svg>
                            <svg class="moon-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
        `;

        // Urdu Footer
        footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div>
                        <h3>فوری لنکس</h3>
                        <a href="../ur/index.html">ہوم</a>
                        <a href="../electricity-bill-calculator/index.html">بل کیلکولیٹر</a>
                        <a href="../k-electric-schedule/index.html">کے ای شیڈول</a>
                        <a href="../sanctioned-load-k-electric/index.html">منظور شدہ لوڈ</a>
                    </div>
                    <div>
                        <h3>وسائل</h3>
                        <a href="../k-electric-new-connection-online/index.html">نیا کنکشن</a>
                        <a href="../k-electric-refund/index.html">کے ای ریفنڈ</a>
                        <a href="../terms-and-conditions/index.html">شرائط و ضوابط</a>
                        <a href="../privacy-policy/index.html">رازداری کی پالیسی</a>
                    </div>
                    <div>
                        <h3>زبان</h3>
                        <a href="../index.html">English</a>
                        <a href="../ur/index.html">اردو</a>
                    </div>
                    <div>
                        <h3>کے ای سے رابطہ</h3>
                        <p>ہیلپ لائن: 118</p>
                        <p>واٹس ایپ: 0348-0000118</p>
                        <p>ای میل: customercare@ke.com.pk</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 کے ای ڈپلیکیٹ بل۔ تمام حقوق محفوظ ہیں۔ یہ ایک معلوماتی ویب سائٹ ہے اور کے الیکٹرک سے
                        منسلک نہیں ہے۔</p>
                </div>
            </div>
        </footer>
        `;
    } else {
        // English Header
        headerHTML = `
        <header class="header">
            <div class="container">
                <div class="header-content">
                    <a href="${prefix}index.html" class="logo">
                        <img src="${prefix}images/ke-duplicate-bill.webp" alt="KE Duplicate Bill">
                    </a>

                    <button class="mobile-menu-btn" aria-label="Toggle Menu" onclick="toggleMenu()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>

                    <nav class="nav" id="nav-menu">
                        <a href="${prefix}index.html">Home</a>
                        <a href="${prefix}k-electric-unit-price/index.html">Unit Price</a>
                        <a href="${prefix}k-electric-load-shedding-schedule/index.html">Load Shedding</a>
                        <a href="${prefix}electricity-bill-calculator/index.html">Calculator</a>
                        <a href="${prefix}k-electric-helpline-numbers/index.html">Contact</a>
                        <a href="${prefix}ur/index.html">اردو</a>
                        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
                            <svg class="sun-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                            </svg>
                            <svg class="moon-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
        `;

        // English Footer
        footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div>
                        <h3>Quick Links</h3>
                        <a href="${prefix}index.html">Home</a>
                        <a href="${prefix}electricity-bill-calculator/index.html">Bill Calculator</a>
                        <a href="${prefix}k-electric-schedule/index.html">KE Schedule</a>
                        <a href="${prefix}sanctioned-load-k-electric/index.html">Sanctioned Load</a>
                        <a href="${prefix}about-us/index.html">About Us</a>
                    </div>
                    <div>
                        <h3>KE Services</h3>
                        <a href="${prefix}k-electric-new-connection-online/index.html">New Connection</a>
                        <a href="${prefix}k-electric-payment-methods/index.html">Payment Methods</a>
                        <a href="${prefix}k-electric-helpline-numbers/index.html">Helpline Numbers</a>
                        <a href="${prefix}k-electric-schedule/index.html">KE Schedule</a>
                    </div>
                    <div>
                        <h3>More Info</h3>
                        <a href="${prefix}sanctioned-load-k-electric/index.html">Sanctioned Load</a>
                        <a href="${prefix}k-electric-refund/index.html">Refund Process</a>
                        <a href="${prefix}terms-and-conditions/index.html">Terms & Conditions</a>
                        <a href="${prefix}privacy-policy/index.html">Privacy Policy</a>
                    </div>

                    <div>
                        <h3>Contact KE</h3>
                        <p>Helpline: 118</p>
                        <p>WhatsApp: 0348-0000118</p>
                        <p>Email: customercare@ke.com.pk</p>
                    </div>
                    <div>
                        <h3>Follow Us</h3>
                        <div class="social-links">
                            <a href="https://www.facebook.com/profile.php?id=61567519524684" target="_blank"
                                rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.954 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/keduplicatebill/" target="_blank" rel="noopener noreferrer"
                                aria-label="Instagram">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="https://www.pinterest.com/kelectricduplicatebill/" target="_blank"
                                    rel="noopener noreferrer" aria-label="Pinterest">
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/showcase/ke-duplicate-bill/" target="_blank"
                                    rel="noopener noreferrer" aria-label="LinkedIn">
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2025 KE Duplicate Bill. All rights reserved. This is an informational website and not
                            affiliated with K-Electric.</p>
                    </div>
                </div>
        </footer>
        `;
    }

    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

    // Highlight active link
    highlightActiveLink();
}

function initializeScripts() {
    // Mobile Menu
    window.toggleMenu = function () {
        const nav = document.getElementById('nav-menu');
        nav.classList.toggle('active');
    };

    // Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
        // Get the href attribute
        const href = link.getAttribute('href');

        // Normalize paths for comparison
        // If href is "./index.html" and currentPath ends with "/" or "/index.html"

        // Simple check: if current path contains the href (minus the ./ prefix)
        const cleanHref = href.replace(/^\.\//, '').replace(/^\.\.\//, '');

        if (currentPath.endsWith(cleanHref)) {
            link.classList.add('active');
        }

        // Special case for root
        if ((currentPath.endsWith('/') || currentPath.endsWith('index.html')) && cleanHref === 'index.html') {
            // Only if we are actually at the root, not a subdir index.html
            // But wait, "Home" link should only be active at root.
            // This simple logic might highlight Home on all index.html pages.
            // Let's refine:
            // If we are in a subdir, the Home link will be "../index.html".
            // If we are in root, Home link is "./index.html".

            // If link href is "../index.html" and we are in a subdir, it points to root.
            // We shouldn't highlight it unless we are at root.

            // Actually, we want to highlight the link that points to the CURRENT page.
            // So we resolve the link's absolute URL and compare with window.location.href
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        } else {
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        }
    });
}
