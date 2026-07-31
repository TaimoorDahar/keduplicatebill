/* Shared, intentionally small site layout. No advertising or behavioural scripts run here. */
document.addEventListener('DOMContentLoaded', () => {
  const prefix = [...document.scripts].find(s => s.getAttribute('src')?.includes('js/layout.js'))?.getAttribute('src')?.startsWith('../') ? '../' : './';
  const header = document.getElementById('header-placeholder');
  const footer = document.getElementById('footer-placeholder');
  if (header) header.innerHTML = `<header class="header"><div class="container header-content"><a class="logo" href="${prefix}" aria-label="KE Duplicate Bill home"><span>KE Bill Guide</span></a><button class="mobile-menu-btn" type="button" aria-controls="site-nav" aria-expanded="false">Menu</button><nav class="nav" id="site-nav" aria-label="Primary navigation"><a href="${prefix}">Bill guide</a><a href="${prefix}electricity-bill-calculator/">Calculator</a><a href="${prefix}k-electric-payment-methods/">Pay a bill</a><a href="${prefix}k-electric-helpline-numbers/">Support</a><a href="${prefix}about-us/">About</a></nav></div></header>`;
  if (footer) footer.innerHTML = `<footer class="footer"><div class="container footer-content"><div><h2>KE Bill Guide</h2><p>Independent information for K-Electric customers. We do not access, store, or issue bills.</p></div><div><h3>Help and tools</h3><a href="${prefix}">Duplicate bill guide</a><a href="${prefix}electricity-bill-calculator/">Bill calculator</a><a href="${prefix}k-electric-complaint-registration/">Complaint guide</a></div><div><h3>About this site</h3><a href="${prefix}about-us/">About</a><a href="${prefix}contact/">Contact</a><a href="${prefix}editorial-guidelines/">Editorial policy</a></div><div><h3>Policies</h3><a href="${prefix}privacy-policy/">Privacy</a><a href="${prefix}terms-and-conditions/">Terms</a><a href="${prefix}disclaimer/">Disclaimer</a><a href="${prefix}cookie-policy/">Cookies</a></div></div><div class="footer-bottom"><p>© <span class="dynamic-year"></span> KE Bill Guide. Independent of K-Electric. For account-specific help, use <a href="https://www.ke.com.pk/" rel="noopener noreferrer">K-Electric’s official website</a>.</p></div></footer>`;
  document.querySelectorAll('.dynamic-year').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('article').forEach(article => {
    if (!article.querySelector('.page-meta')) {
      const meta = document.createElement('p'); meta.className = 'page-meta';
      meta.innerHTML = '<span>Author: KE Bill Guide Editorial Team</span><span>Last updated: 26 July 2026</span><span>Reviewed: 26 July 2026</span>';
      article.prepend(meta);
    }
  });
  document.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; img.decoding = 'async'; });
  const button = document.querySelector('.mobile-menu-btn');
  const nav = document.getElementById('site-nav');
  button?.addEventListener('click', () => { const open = nav.classList.toggle('active'); button.setAttribute('aria-expanded', String(open)); });
  const back = document.createElement('button');
  back.className = 'back-to-top'; back.type = 'button'; back.setAttribute('aria-label', 'Back to top'); back.textContent = '↑';
  back.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'})); document.body.append(back);
  window.addEventListener('scroll', () => back.classList.toggle('visible', scrollY > 500), {passive: true});
});
