// ============================================================
// MAIN.JS - Landing page interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initDropdowns();
  initFAQ();
  initScrollReveal();
  initCounters();
  initTemplatesShowcase();
  initTemplateFilter();
});

// ===================== HEADER =====================
function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===================== MOBILE MENU =====================
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
}

// ===================== DROPDOWNS =====================
function initDropdowns() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const btn = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    if (!btn || !dropdown) return;

    item.addEventListener('mouseenter', () => {
      dropdown.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', () => {
      dropdown.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===================== FAQ =====================
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => { i.classList.remove('open'); i.querySelector('.faq-question').setAttribute('aria-expanded', 'false'); });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ===================== SCROLL REVEAL =====================
function initScrollReveal() {
  const elements = document.querySelectorAll('.feature-card, .testimonial-card, .template-card, .step, .stat-card, .faq-item');
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===================== COUNTERS =====================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const startTime = performance.now();

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(easeOutQuart(progress) * target);
    
    let display;
    if (target >= 1000000) {
      display = (value / 1000000).toFixed(1) + 'M+';
    } else if (target >= 1000) {
      display = (value / 1000).toFixed(0) + 'K+';
    } else {
      display = prefix + value + suffix;
    }
    el.textContent = display;

    if (progress < 1) requestAnimationFrame(update);
    else {
      // Final value
      if (target >= 1000000) el.textContent = (target / 1000000).toFixed(0) + 'M+';
      else if (target >= 1000) el.textContent = (target / 1000).toFixed(0) + 'K+';
      else el.textContent = prefix + target + suffix;
    }
  }
  requestAnimationFrame(update);
}

// ===================== TEMPLATES SHOWCASE =====================
const TEMPLATES = [
  { id: 'modern', name: 'Modern', tag: 'Popular', category: 'modern', colors: ['#1a1a2e', '#2DC08D'], style: 'dark-sidebar' },
  { id: 'clean', name: 'Professional', tag: 'Classic', category: 'classic', colors: ['#ffffff', '#1a1a2e'], style: 'clean' },
  { id: 'creative', name: 'Creative', tag: 'Trending', category: 'creative', colors: ['#7C3AED', '#ffffff'], style: 'creative' },
  { id: 'minimal', name: 'Minimal', tag: 'Simple', category: 'minimal', colors: ['#ffffff', '#333333'], style: 'minimal' },
  { id: 'executive', name: 'Executive', tag: 'Premium', category: 'classic', colors: ['#0f3460', '#e8e8e8'], style: 'executive' },
  { id: 'tech', name: 'Tech', tag: 'Modern', category: 'modern', colors: ['#0f172a', '#38bdf8'], style: 'tech' },
  { id: 'elegant', name: 'Elegant', tag: 'New', category: 'classic', colors: ['#fafafa', '#C41E3A'], style: 'elegant' },
  { id: 'bold', name: 'Bold', tag: 'Creative', category: 'creative', colors: ['#FF4500', '#1a1a2e'], style: 'bold' },
];

function generateTemplateThumbnail(template) {
  const [bg, accent] = template.colors;
  const isDark = bg.length === 7 && parseInt(bg.slice(1,3), 16) < 80;
  const textColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)';
  const subtextColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)';

  if (template.style === 'dark-sidebar') {
    return `
      <div style="width:100%;height:100%;display:flex;background:#f5f5f5;">
        <div style="width:38%;background:${bg};padding:12px 8px;">
          <div style="width:40px;height:40px;border-radius:50%;background:${accent};opacity:0.8;margin-bottom:8px;"></div>
          <div style="height:7px;background:${accent};border-radius:3px;width:80%;margin-bottom:3px;"></div>
          <div style="height:4px;background:rgba(255,255,255,0.3);border-radius:3px;width:60%;margin-bottom:12px;"></div>
          ${['85%','70%','90%','60%','75%'].map(w => `<div style="height:3px;background:rgba(255,255,255,0.25);border-radius:3px;width:${w};margin-bottom:5px;"></div>`).join('')}
        </div>
        <div style="flex:1;padding:12px 10px;background:white;">
          <div style="height:8px;background:${accent};border-radius:3px;width:60%;margin-bottom:12px;"></div>
          ${[3,3,3].map(_ => `<div style="margin-bottom:10px;">${['80%','55%','90%','70%'].map(w => `<div style="height:3px;background:rgba(0,0,0,0.12);border-radius:3px;width:${w};margin-bottom:4px;"></div>`).join('')}</div>`).join('')}
        </div>
      </div>`;
  } else if (template.style === 'clean') {
    return `
      <div style="width:100%;height:100%;background:white;padding:16px;">
        <div style="border-bottom:3px solid ${accent};padding-bottom:8px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="height:10px;background:${bg};border-radius:3px;width:100px;margin-bottom:4px;"></div>
            <div style="height:5px;background:rgba(0,0,0,0.2);border-radius:3px;width:70px;"></div>
          </div>
          <div style="text-align:right;">
            ${['60px','70px','55px'].map(w => `<div style="height:3px;background:rgba(0,0,0,0.15);border-radius:3px;width:${w};margin-bottom:4px;"></div>`).join('')}
          </div>
        </div>
        ${[0,1,2].map(_ => `<div style="margin-bottom:8px;"><div style="height:5px;background:${accent};border-radius:3px;width:40%;margin-bottom:5px;opacity:0.7;"></div>${['80%','60%','90%'].map(w => `<div style="height:3px;background:rgba(0,0,0,0.1);border-radius:3px;width:${w};margin-bottom:3px;"></div>`).join('')}</div>`).join('')}
      </div>`;
  } else if (template.style === 'creative') {
    return `
      <div style="width:100%;height:100%;background:white;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;right:0;height:50px;background:${bg};"></div>
        <div style="position:relative;padding:10px 12px;padding-top:14px;">
          <div style="height:8px;background:white;border-radius:3px;width:70%;margin-bottom:4px;"></div>
          <div style="height:4px;background:rgba(255,255,255,0.5);border-radius:3px;width:50%;margin-bottom:30px;"></div>
          ${[0,1,2].map(_ => `<div style="margin-bottom:8px;"><div style="height:5px;background:${bg};border-radius:3px;width:45%;margin-bottom:5px;opacity:0.7;"></div>${['75%','55%','85%'].map(w => `<div style="height:3px;background:rgba(0,0,0,0.1);border-radius:3px;width:${w};margin-bottom:3px;"></div>`).join('')}</div>`).join('')}
        </div>
      </div>`;
  } else if (template.style === 'minimal') {
    return `
      <div style="width:100%;height:100%;background:white;padding:16px;">
        <div style="margin-bottom:14px;">
          <div style="height:12px;background:#111;border-radius:2px;width:80px;margin-bottom:4px;"></div>
          <div style="height:4px;background:#888;border-radius:2px;width:60px;margin-bottom:6px;"></div>
          <div style="display:flex;gap:8px;">${['50px','60px','55px'].map(w => `<div style="height:3px;background:rgba(0,0,0,0.2);border-radius:2px;width:${w};"></div>`).join('')}</div>
        </div>
        <div style="height:1px;background:#e5e5e5;margin-bottom:10px;"></div>
        ${[0,1,2].map(_ => `<div style="margin-bottom:10px;"><div style="height:5px;background:#333;border-radius:2px;width:35%;margin-bottom:6px;"></div>${['75%','55%','85%','65%'].map(w => `<div style="height:2.5px;background:rgba(0,0,0,0.1);border-radius:2px;width:${w};margin-bottom:3px;"></div>`).join('')}</div>`).join('')}
      </div>`;
  } else if (template.style === 'executive') {
    return `
      <div style="width:100%;height:100%;background:white;">
        <div style="background:${bg};padding:14px;margin-bottom:10px;">
          <div style="height:10px;background:white;border-radius:2px;width:70%;margin-bottom:4px;"></div>
          <div style="height:4px;background:rgba(255,255,255,0.5);border-radius:2px;width:50%;"></div>
        </div>
        <div style="padding:0 12px;">
          ${[0,1,2].map(_ => `<div style="margin-bottom:8px;"><div style="height:4px;background:${bg};border-radius:2px;width:40%;margin-bottom:4px;opacity:0.7;"></div>${['80%','60%','90%'].map(w => `<div style="height:3px;background:rgba(0,0,0,0.1);border-radius:2px;width:${w};margin-bottom:3px;"></div>`).join('')}</div>`).join('')}
        </div>
      </div>`;
  } else if (template.style === 'tech') {
    return `
      <div style="width:100%;height:100%;background:${bg};padding:14px;font-family:monospace;">
        <div style="color:${accent};font-size:6px;margin-bottom:8px;opacity:0.6;">// profile.js</div>
        <div style="height:8px;background:${accent};border-radius:3px;width:65%;margin-bottom:4px;opacity:0.9;"></div>
        <div style="height:4px;background:rgba(255,255,255,0.3);border-radius:3px;width:45%;margin-bottom:12px;"></div>
        ${[0,1,2,3].map(_ => `<div style="margin-bottom:6px;border-left:2px solid ${accent};padding-left:6px;">${['75%','55%','85%'].map(w => `<div style="height:3px;background:rgba(255,255,255,0.2);border-radius:2px;width:${w};margin-bottom:3px;"></div>`).join('')}</div>`).join('')}
      </div>`;
  } else if (template.style === 'elegant') {
    return `
      <div style="width:100%;height:100%;background:white;padding:14px;">
        <div style="text-align:center;border-bottom:1px solid ${accent};padding-bottom:10px;margin-bottom:10px;">
          <div style="height:10px;background:#222;border-radius:2px;width:80px;margin:0 auto 4px;"></div>
          <div style="height:3px;background:${accent};border-radius:2px;width:40px;margin:0 auto;"></div>
        </div>
        ${[0,1,2].map(_ => `<div style="margin-bottom:8px;text-align:center;"><div style="height:4px;background:${accent};border-radius:2px;width:35%;margin:0 auto 5px;"></div>${['65%','45%','70%'].map(w => `<div style="height:3px;background:rgba(0,0,0,0.1);border-radius:2px;width:${w};margin:0 auto 3px;"></div>`).join('')}</div>`).join('')}
      </div>`;
  } else {
    return `
      <div style="width:100%;height:100%;background:${bg};padding:12px;">
        <div style="height:30px;background:${accent};border-radius:4px;margin-bottom:12px;display:flex;align-items:center;padding:0 10px;">
          <div style="height:6px;background:rgba(255,255,255,0.9);border-radius:2px;width:60%;"></div>
        </div>
        ${[0,1,2].map(_ => `<div style="margin-bottom:8px;">${['75%','55%','85%'].map(w => `<div style="height:3px;background:rgba(255,255,255,0.25);border-radius:2px;width:${w};margin-bottom:4px;"></div>`).join('')}</div>`).join('')}
      </div>`;
  }
}

function initTemplatesShowcase() {
  const grid = document.getElementById('templatesGrid');
  if (!grid) return;

  const showcase = TEMPLATES.slice(0, 8);
  showcase.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.setAttribute('data-category', template.category);
    card.innerHTML = `
      <div class="template-preview">
        <div class="template-preview-inner">${generateTemplateThumbnail(template)}</div>
        <div class="template-overlay">
          <a href="builder.html?template=${template.id}" class="template-use-btn">Use Template</a>
        </div>
      </div>
      <div class="template-info">
        <span class="template-name">${template.name}</span>
        <span class="template-tag">${template.tag}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===================== TEMPLATE FILTER =====================
function initTemplateFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.template-card');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
