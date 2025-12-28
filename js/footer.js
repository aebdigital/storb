// Footer Component - Footer content and privacy functionality

export function initFooter() {
    loadFooter();
    initPrivacyModal();
}

function ensureFooterCSSLoaded() {
    // Check if footer CSS is already loaded
    const existingLink = document.querySelector('link[href*="footer.css"]');
    if (existingLink) return;
    
    // Determine CSS path based on current location
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    let cssPath;
    if (isInServicePage) {
        cssPath = '../../css/components/footer.css';
    } else if (isInPagesDir) {
        cssPath = '../css/components/footer.css';
    } else {
        cssPath = 'css/components/footer.css';
    }
    
    // Create and inject CSS link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}

function loadFooter() {
    // Ensure footer CSS is loaded
    ensureFooterCSSLoaded();
    
    // Determine current location and set appropriate paths
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    // Set navigation paths based on current location
    let basePath, pagesPath;
    
    if (isInServicePage) {
        // We're in /pages/service-page/ - need different paths for different targets
        basePath = '../../';  // To reach root for index.html
        pagesPath = '../';    // To reach /pages/ directory (go up one level from service-page)
    } else if (isInPagesDir) {
        // We're in /pages/ - stay in pages directory for other pages
        basePath = '../';     // To reach root for index.html
        pagesPath = '';       // Other pages are in same directory
    } else {
        // We're in root directory
        basePath = '';
        pagesPath = 'pages/';
    }
    
    const footerHTML = `
        <footer id="footer" class="footer">
            <!-- Modern CTA Section -->
            <div class="footer-cta-section">
                <div class="footer-cta-content">
                    <h2 class="cta-title">Pripravení začať váš projekt?</h2>
                    <a href="${pagesPath}kontakt.html" class="cta-contact-btn btn_default_wrap">
                        <div class="btn_default_contain">
                            <div class="btn_default_text" data-label="Cenová ponuka" data-alt="Cenová ponuka"></div>
                        </div>
                    </a>
                </div>
            </div>

            <!-- Modern Footer Content -->
            <div class="footer-content">
                <div class="footer-grid">
                    <!-- Company Info -->
                    <div class="footer-column footer-company">
                        <div class="footer-logo">
                            <span class="footer-logo-text">STORB</span>
                        </div>
                        <p class="footer-description">Výroba drevených schodíšť a zábradlí na mieru od roku 1986. Kvalitné remeselné spracovanie.</p>
                    </div>

                    <!-- Navigation -->
                    <div class="footer-column">
                        <h4 class="footer-heading">Navigácia</h4>
                        <nav class="footer-nav">
                            <a href="${basePath}index.html">Domov</a>
                            <a href="${pagesPath}referencie.html">Galéria</a>
                            <a href="${pagesPath}kontakt.html">Kontakt</a>
                        </nav>
                    </div>

                    <!-- Services -->
                    <div class="footer-column">
                        <h4 class="footer-heading">Naše produkty</h4>
                        <nav class="footer-nav">
                            <a href="${pagesPath}referencie.html">Priame schodištia</a>
                            <a href="${pagesPath}referencie.html">Točité schodištia</a>
                            <a href="${pagesPath}referencie.html">Oblúkové schodištia</a>
                            <a href="${pagesPath}referencie.html">Drevené zábradlia</a>
                        </nav>
                    </div>

                    <!-- Contact Info -->
                    <div class="footer-column">
                        <h4 class="footer-heading">Kontakt</h4>
                        <div class="footer-contact">
                            <div class="contact-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2"/>
                                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                <span>Malokarpatská 11<br>902 01 Pezinok</span>
                            </div>
                            <div class="contact-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                <a href="tel:+421905212865">+421 905 212 865</a>
                            </div>
                            <div class="contact-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                                    <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                <a href="mailto:branislav.jajcaj@gmail.com">branislav.jajcaj@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Bottom -->
                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <p>&copy; 2025 STORB - Branislav Jajcaj. Všetky práva vyhradené.</p>
                        <div class="footer-links">
                            <a href="#" onclick="openPrivacyPopup(); return false;">Ochrana osobných údajov</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Privacy Policy Popup -->
        <div id="privacy-popup" class="privacy-popup">
            <div class="privacy-popup-content" data-lenis-prevent>
                <div class="privacy-popup-header">
                    <h2>Ochrana osobných údajov</h2>
                    <button class="privacy-popup-close" onclick="closePrivacyPopup()">&times;</button>
                </div>
                <div class="privacy-popup-body">
                    <div class="company-info">
                        <strong>STORB - Branislav Jajcaj</strong><br>
                        Malokarpatská 11, 902 01 Pezinok<br>
                        Slovenská republika<br>
                        E-mail: branislav.jajcaj@gmail.com<br>
                        Mobil: +421 905 212 865
                    </div>

                    <p>Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.</p>

                    <h3>I. Kontaktný formulár</h3>
                    <p>Prevádzkujeme kontaktný formulár ktorého účelom je umožniť vám:</p>
                    <p>Položiť otázku k našim produktom a službám<br>
                    Požiadať o cenovú ponuku</p>

                    <p><strong>Rozsah spracúvaných údajov:</strong></p>
                    <p>Meno a priezvisko<br>
                    E-mailová adresa<br>
                    Telefónne číslo<br>
                    Správu</p>

                    <p><strong>Účel spracovania:</strong><br>
                    Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.</p>

                    <p><strong>Právny základ:</strong><br>
                    Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.</p>

                    <p><strong>Doba uchovávania:</strong><br>
                    Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.</p>

                    <h3>II. Súbory cookies</h3>
                    <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
                    <p>Nevyhnutné cookies – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).<br>
                    Štatistické (analytické) cookies – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</p>

                    <p><strong>Správa súhlasov:</strong><br>
                    Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.</p>

                    <h3>III. Práva dotknutej osoby</h3>
                    <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
                    <p>Prístup k osobným údajom, ktoré spracúvame<br>
                    Oprava nepresných alebo neúplných údajov<br>
                    Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ<br>
                    Obmedzenie spracovania<br>
                    Prenosnosť údajov<br>
                    Odvolanie súhlasu – stane sa účinným dňom odvolania<br>
                    Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)</p>

                    <p>V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na branislav.jajcaj@gmail.com alebo telefónnom čísle +421 905 212 865.</p>

                    <p><strong>Tieto Zásady nadobúdajú účinnosť dňom 1. 1. 2025.</strong></p>
                </div>
            </div>
        </div>
    `;
    
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
}

function initPrivacyModal() {
    // Make privacy functions globally available
    window.openPrivacyPopup = function() {
        const popup = document.getElementById('privacy-popup');
        if (popup) {
            popup.classList.add('active');
            // Stop Lenis smooth scroll when modal is open
            if (window.lenis) {
                window.lenis.stop();
            }
        }
    };

    window.closePrivacyPopup = function() {
        const popup = document.getElementById('privacy-popup');
        if (popup) {
            popup.classList.remove('active');
            // Resume Lenis smooth scroll when modal is closed
            if (window.lenis) {
                window.lenis.start();
            }
        }
    };

    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('privacy-popup');
        if (popup && e.target === popup) {
            window.closePrivacyPopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closePrivacyPopup();
        }
    });
}

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadFooter = loadFooter;
    window.initPrivacyModal = initPrivacyModal;
    window.ensureFooterCSSLoaded = ensureFooterCSSLoaded;
}