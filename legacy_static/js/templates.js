// ============================================================
// TEMPLATES.JS - Templates gallery page
// ============================================================

const ALL_TEMPLATES = [
  // FEATURED
  { id: 'modern', name: 'Modern Pro', desc: 'Dark sidebar with vibrant accent', category: 'modern', tag: 'Popular', featured: true, featuredBadge: '🔥 Most Used', badgeClass: '', ats: true },
  { id: 'clean', name: 'Professional', desc: 'Clean two-column classic layout', category: 'classic', tag: 'Classic', featured: true, featuredBadge: '⭐ Editor Choice', badgeClass: 'gold', ats: true },
  { id: 'minimal', name: 'Minimal', desc: 'Elegant single-column with timeline', category: 'minimal', tag: 'Minimal', featured: true, featuredBadge: '✨ Trending', badgeClass: 'blue', ats: true },

  // ALL
  { id: 'executive', name: 'Executive', desc: 'Bold header for senior professionals', category: 'classic', tag: 'Premium', ats: true },
  { id: 'tech', name: 'Tech Dark', desc: 'Code-inspired dark theme', category: 'tech', tag: 'Tech', ats: false },
  { id: 'elegant', name: 'Elegant', desc: 'Centered serif layout for creatives', category: 'creative', tag: 'Creative', ats: true },
  { id: 'bold', name: 'Bold', desc: 'Strong typographic impact', category: 'modern', tag: 'Modern', ats: true },
  { id: 'nordic', name: 'Nordic', desc: 'Clean Scandinavian aesthetics', category: 'minimal', tag: 'Minimal', ats: true },
  { id: 'startup', name: 'Startup', desc: 'Perfect for tech startup jobs', category: 'modern', tag: 'Trending', ats: true },
  { id: 'academic', name: 'Academic', desc: 'Ideal for research and faculty roles', category: 'classic', tag: 'Classic', ats: true },
  { id: 'creative2', name: 'Portfolio', desc: 'Show your work beautifully', category: 'creative', tag: 'Creative', ats: false },
  { id: 'infographic', name: 'Infographic', desc: 'Visual skills and metrics display', category: 'creative', tag: 'Creative', ats: false },
  { id: 'corporate', name: 'Corporate', desc: 'Professional blue corporate style', category: 'classic', tag: 'Classic', ats: true },
  { id: 'twopage', name: 'Two-Page', desc: 'Expanded format for more content', category: 'classic', tag: 'Classic', ats: true },
  { id: 'compact', name: 'Compact', desc: 'Maximum content in minimal space', category: 'minimal', tag: 'ATS', ats: true },
  { id: 'fresh', name: 'Fresh', desc: 'Bright accent colors for entry-level', category: 'modern', tag: 'New', ats: true },
  { id: 'darkpro', name: 'Dark Pro', desc: 'Full dark background sophistication', category: 'modern', tag: 'Premium', ats: false },
  { id: 'timeline', name: 'Timeline', desc: 'Visual career journey timeline', category: 'creative', tag: 'Creative', ats: false },
  { id: 'impact', name: 'Impact', desc: 'High-impact header design', category: 'modern', tag: 'Bold', ats: true },
  { id: 'pastel', name: 'Pastel', desc: 'Soft colors for creative industries', category: 'creative', tag: 'New', ats: true },
];

const ACCENT_COLORS = [
  '#2DC08D', '#0EA5E9', '#7C3AED', '#F59E0B', '#EF4444',
  '#EC4899', '#10B981', '#1E3A5F', '#374151', '#C41E3A',
];

let currentFilter = 'all';
let currentSort = 'popular';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderAll();
  initFilters();
  initSearch();
  initPreviewModal();
  initMobileMenu();
});

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

// ===================== THUMBNAIL GENERATORS =====================
function generateThumbnail(template, color = '#2DC08D', scale = 1) {
  const c = color;
  const id = template.id;

  if (id === 'modern') return `
    <div style="width:100%;height:100%;display:flex;">
      <div style="width:36%;background:#1a1a2e;padding:${8*scale}px ${6*scale}px;">
        <div style="width:${30*scale}px;height:${30*scale}px;border-radius:50%;background:${c}30;border:2px solid ${c};margin-bottom:${6*scale}px;"></div>
        <div style="height:${6*scale}px;background:${c};border-radius:2px;width:80%;margin-bottom:${3*scale}px;"></div>
        <div style="height:${3*scale}px;background:rgba(255,255,255,0.3);border-radius:2px;width:60%;margin-bottom:${10*scale}px;"></div>
        ${['80%','65%','75%','55%'].map(w => `<div style="height:${2.5*scale}px;background:rgba(255,255,255,0.2);border-radius:2px;width:${w};margin-bottom:${4*scale}px;"></div>`).join('')}
      </div>
      <div style="flex:1;padding:${8*scale}px ${6*scale}px;background:white;">
        <div style="height:${5*scale}px;background:${c};border-radius:2px;width:55%;margin-bottom:${8*scale}px;"></div>
        ${[1,2,3].map(_ => `<div style="margin-bottom:${6*scale}px;">${['80%','55%','90%','70%'].map(w => `<div style="height:${2.5*scale}px;background:#e5e5e5;border-radius:2px;width:${w};margin-bottom:${3*scale}px;"></div>`).join('')}</div>`).join('')}
      </div>
    </div>`;

  if (id === 'clean') return `
    <div style="width:100%;height:100%;background:white;padding:${12*scale}px;">
      <div style="border-bottom:${2*scale}px solid ${c};padding-bottom:${6*scale}px;margin-bottom:${8*scale}px;display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="height:${8*scale}px;background:#1a1a2e;border-radius:2px;width:${80*scale}px;margin-bottom:${3*scale}px;"></div>
          <div style="height:${4*scale}px;background:${c};border-radius:2px;width:${55*scale}px;"></div>
        </div>
        <div>${['50px','60px','45px'].map(w => `<div style="height:${2.5*scale}px;background:#ddd;border-radius:2px;width:${w};margin-bottom:${3*scale}px;margin-left:auto;"></div>`).join('')}</div>
      </div>
      <div style="display:flex;gap:${10*scale}px;">
        <div style="flex:2;">${[1,2,3].map(_ => `<div style="margin-bottom:${6*scale}px;"><div style="height:${4*scale}px;background:${c};border-radius:2px;width:50%;margin-bottom:${4*scale}px;opacity:0.7;"></div>${['90%','65%','80%'].map(w => `<div style="height:${2.5*scale}px;background:#e5e5e5;border-radius:2px;width:${w};margin-bottom:${2.5*scale}px;"></div>`).join('')}</div>`).join('')}</div>
        <div style="flex:1;">${['80%','60%','90%','70%'].map(w => `<div style="height:${2.5*scale}px;background:#e5e5e5;border-radius:2px;width:${w};margin-bottom:${4*scale}px;"></div>`).join('')}</div>
      </div>
    </div>`;

  if (id === 'minimal') return `
    <div style="width:100%;height:100%;background:white;padding:${12*scale}px;">
      <div style="margin-bottom:${8*scale}px;">
        <div style="height:${8*scale}px;background:#111;border-radius:2px;width:${65*scale}px;margin-bottom:${3*scale}px;"></div>
        <div style="height:${4*scale}px;background:#888;border-radius:2px;width:${45*scale}px;margin-bottom:${4*scale}px;"></div>
      </div>
      <div style="height:1px;background:#e5e5e5;margin-bottom:${8*scale}px;"></div>
      ${[1,2,3].map(_ => `<div style="display:flex;gap:${6*scale}px;margin-bottom:${6*scale}px;"><div style="width:2px;background:${c};"></div><div style="flex:1;">${['75%','55%','85%'].map(w => `<div style="height:${2.5*scale}px;background:#e5e5e5;border-radius:2px;width:${w};margin-bottom:${3*scale}px;"></div>`).join('')}</div></div>`).join('')}
    </div>`;

  if (id === 'executive') return `
    <div style="width:100%;height:100%;background:white;">
      <div style="background:#0f3460;padding:${10*scale}px ${12*scale}px;margin-bottom:${8*scale}px;">
        <div style="height:${7*scale}px;background:white;border-radius:2px;width:60%;margin-bottom:${3*scale}px;"></div>
        <div style="height:${4*scale}px;background:${c};border-radius:2px;width:40%;"></div>
      </div>
      <div style="padding:0 ${12*scale}px;">
        <div style="background:#f8f9fc;border-left:${2*scale}px solid ${c};padding:${6*scale}px;margin-bottom:${8*scale}px;">
          ${['90%','70%','80%'].map(w => `<div style="height:${2.5*scale}px;background:#ddd;border-radius:2px;width:${w};margin-bottom:${3*scale}px;"></div>`).join('')}
        </div>
        ${[1,2].map(_ => `<div style="margin-bottom:${6*scale}px;">${['70%','50%','85%'].map(w => `<div style="height:${2.5*scale}px;background:#ddd;border-radius:2px;width:${w};margin-bottom:${3*scale}px;"></div>`).join('')}</div>`).join('')}
      </div>
    </div>`;

  if (id === 'tech') return `
    <div style="width:100%;height:100%;background:#0f172a;padding:${10*scale}px;">
      <div style="margin-bottom:${8*scale}px;">
        <div style="font-size:${4*scale}px;color:${c};font-family:monospace;margin-bottom:${3*scale}px;opacity:0.6;">// profile.js</div>
        <div style="height:${6*scale}px;background:${c};border-radius:2px;width:65%;margin-bottom:${3*scale}px;opacity:0.9;"></div>
        <div style="height:${4*scale}px;background:rgba(255,255,255,0.3);border-radius:2px;width:45%;"></div>
      </div>
      ${[1,2,3,4].map(_ => `<div style="border-left:2px solid ${c}40;padding-left:${6*scale}px;margin-bottom:${5*scale}px;">${['75%','55%','85%'].map(w => `<div style="height:${2.5*scale}px;background:rgba(255,255,255,0.15);border-radius:2px;width:${w};margin-bottom:${3*scale}px;"></div>`).join('')}</div>`).join('')}
    </div>`;

  if (id === 'elegant') return `
    <div style="width:100%;height:100%;background:white;padding:${12*scale}px;text-align:center;">
      <div style="height:${8*scale}px;background:#111;border-radius:2px;width:50%;margin:0 auto ${3*scale}px;"></div>
      <div style="height:${2*scale}px;background:${c};width:${25*scale}px;margin:0 auto ${6*scale}px;"></div>
      <div style="text-align:left;">
        ${[1,2,3].map(_ => `<div style="margin-bottom:${6*scale}px;"><div style="height:${4*scale}px;background:${c};border-radius:2px;width:40%;margin-bottom:${4*scale}px;opacity:0.7;"></div>${['70%','50%','80%'].map(w => `<div style="height:${2.5*scale}px;background:#e5e5e5;border-radius:2px;width:${w};margin-bottom:${3*scale}px;"></div>`).join('')}</div>`).join('')}
      </div>
    </div>`;

  // Generic for other templates
  const colors = {
    corporate: '#1E3A8A', nordic: '#2563EB', startup: '#7C3AED', academic: '#374151',
    bold: '#111', creative2: '#EC4899', infographic: '#F59E0B', twopage: '#2DC08D',
    compact: '#374151', fresh: c, darkpro: '#0f172a', timeline: c, impact: '#1a1a2e',
    pastel: '#DB7777'
  };
  const bg = id === 'darkpro' ? '#0f172a' : 'white';
  const headerBg = colors[id] || c;
  const textCol = bg === 'white' ? '#ddd' : 'rgba(255,255,255,0.2)';
  return `
    <div style="width:100%;height:100%;background:${bg};">
      <div style="background:${headerBg};padding:${10*scale}px ${12*scale}px;margin-bottom:${8*scale}px;">
        <div style="height:${7*scale}px;background:white;border-radius:2px;width:55%;margin-bottom:${3*scale}px;opacity:0.9;"></div>
        <div style="height:${3.5*scale}px;background:rgba(255,255,255,0.5);border-radius:2px;width:38%;"></div>
      </div>
      <div style="padding:0 ${12*scale}px;">
        ${[1,2,3].map(_ => `<div style="margin-bottom:${6*scale}px;">${['80%','60%','90%','70%'].map(w => `<div style="height:${2.5*scale}px;background:${textCol};border-radius:2px;width:${w};margin-bottom:${3*scale}px;"></div>`).join('')}</div>`).join('')}
      </div>
    </div>`;
}

// ===================== RENDER FEATURED =====================
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  grid.innerHTML = '';
  const featured = ALL_TEMPLATES.filter(t => t.featured);
  featured.forEach(template => {
    const card = document.createElement('div');
    card.className = 'featured-card';
    card.setAttribute('data-id', template.id);
    card.setAttribute('data-category', template.category);
    card.innerHTML = `
      <div class="featured-card-preview">
        ${generateThumbnail(template)}
        <div class="featured-card-overlay">
          <button class="featured-preview-btn preview-btn" data-id="${template.id}">👁 Preview</button>
          <a href="builder.html?template=${template.id}" class="featured-use-btn">Use Template</a>
        </div>
        <div class="featured-badge ${template.badgeClass}">${template.featuredBadge}</div>
      </div>
      <div class="featured-card-info">
        <div>
          <div class="featured-card-name">${template.name}</div>
          <div class="featured-card-meta">${template.ats ? '✓ ATS-Friendly' : '◆ Visual'} · ${template.category}</div>
        </div>
        <span class="template-tag">${template.tag}</span>
      </div>
    `;
    card.querySelector('.preview-btn').addEventListener('click', e => {
      e.stopPropagation();
      openPreviewModal(template);
    });
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.featured-use-btn') && !e.target.closest('.preview-btn')) {
        openPreviewModal(template);
      }
    });
    grid.appendChild(card);
  });
}

// ===================== RENDER ALL =====================
function renderAll() {
  const grid = document.getElementById('allTemplatesGrid');
  grid.innerHTML = '';

  let templates = ALL_TEMPLATES.filter(t => {
    const matchCat = currentFilter === 'all' || t.category === currentFilter || (currentFilter === 'ats' && t.ats);
    const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery) || t.desc.toLowerCase().includes(searchQuery) || t.tag.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  if (currentSort === 'az') templates = templates.sort((a, b) => a.name.localeCompare(b.name));
  else if (currentSort === 'newest') templates = templates.reverse();

  const noResults = document.getElementById('noResults');
  const allSection = document.getElementById('allTemplatesSection');

  if (templates.length === 0) {
    noResults.style.display = 'block';
    allSection.style.display = 'none';
    return;
  }
  noResults.style.display = 'none';
  allSection.style.display = 'block';

  templates.forEach((template, i) => {
    const card = document.createElement('div');
    card.className = 'tmpl-card';
    card.style.animationDelay = `${i * 0.03}s`;
    card.innerHTML = `
      <div class="tmpl-preview">
        ${generateThumbnail(template, '#2DC08D', 0.55)}
        <div class="tmpl-overlay">
          <a href="builder.html?template=${template.id}" class="tmpl-use-btn">Use Template</a>
        </div>
      </div>
      <div class="tmpl-info">
        <div class="tmpl-name">${template.name}</div>
        <span class="tmpl-tag">${template.tag}</span>
      </div>
    `;
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.tmpl-use-btn')) openPreviewModal(template);
    });
    grid.appendChild(card);
  });
}

// ===================== FILTERS =====================
function initFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.cat;
      renderAll();
    });
  });

  document.getElementById('sortSelect').addEventListener('change', e => {
    currentSort = e.target.value;
    renderAll();
  });
}

function initSearch() {
  const input = document.getElementById('templateSearch');
  let timeout;
  input.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchQuery = input.value.toLowerCase().trim();
      renderAll();
    }, 300);
  });
}

// ===================== PREVIEW MODAL =====================
let previewColor = '#2DC08D';

function initPreviewModal() {
  const modal = document.getElementById('previewModal');
  const closeBtn = document.getElementById('previewModalClose');

  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
}

function openPreviewModal(template) {
  const modal = document.getElementById('previewModal');
  const content = document.getElementById('previewModalContent');
  const name = document.getElementById('previewModalName');
  const desc = document.getElementById('previewModalDesc');
  const meta = document.getElementById('previewModalMeta');
  const colorsEl = document.getElementById('previewModalColors');
  const useBtn = document.getElementById('previewModalBtn');
  const headerUseBtn = document.getElementById('previewModalUseBtn');

  name.textContent = template.name;
  desc.textContent = template.desc;
  useBtn.href = `builder.html?template=${template.id}`;
  headerUseBtn.href = `builder.html?template=${template.id}`;

  meta.innerHTML = `
    <div class="template-meta-item"><span>Category:</span><span>${template.category}</span></div>
    <div class="template-meta-item"><span>ATS-Ready:</span><span>${template.ats ? '✓ Yes' : '✗ Not optimized'}</span></div>
    <div class="template-meta-item"><span>Style:</span><span>${template.tag}</span></div>
    <div class="template-meta-item"><span>Price:</span><span style="color:#2DC08D;font-weight:700;">Free</span></div>
  `;

  // Color swatches
  colorsEl.innerHTML = '';
  previewColor = '#2DC08D';
  ACCENT_COLORS.forEach(color => {
    const btn = document.createElement('button');
    btn.className = 'color-theme-btn' + (color === previewColor ? ' active' : '');
    btn.style.background = color;
    btn.title = color;
    btn.addEventListener('click', () => {
      previewColor = color;
      document.querySelectorAll('.color-theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updatePreviewContent(template);
    });
    colorsEl.appendChild(btn);
  });

  updatePreviewContent(template);
  modal.classList.add('open');
}

function updatePreviewContent(template) {
  const content = document.getElementById('previewModalContent');
  const html = generateThumbnail(template, previewColor, 1);
  content.innerHTML = `<div class="preview-modal-resume">${html}</div>`;
}
