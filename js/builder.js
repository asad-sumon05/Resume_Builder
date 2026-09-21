// ============================================================
// BUILDER.JS - Full Resume Builder functionality
// ============================================================

// ===================== STATE =====================
let state = {
  template: 'modern',
  accentColor: '#2DC08D',
  font: 'Inter',
  fontSize: 'medium',
  lineSpacing: 'normal',
  zoom: 0.8,
  activeSection: 'personal',
  history: [],
  historyIndex: -1,
  data: {
    personal: {
      firstName: 'Alex',
      lastName: 'Johnson',
      jobTitle: 'Senior Software Engineer',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      website: 'linkedin.com/in/alexjohnson',
      summary: 'Results-driven software engineer with 6+ years of experience building scalable web applications. Passionate about creating elegant solutions to complex problems. Led teams delivering products used by 1M+ users.',
      photo: null
    },
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        startDate: 'Jan 2021',
        endDate: 'Present',
        current: true,
        bullets: [
          'Led development of microservices architecture, reducing system latency by 40%',
          'Mentored team of 5 junior engineers, improving code review efficiency by 60%',
          'Shipped 3 major product features used by 500K+ monthly active users'
        ]
      },
      {
        id: 'exp-2',
        title: 'Software Engineer',
        company: 'StartupXYZ',
        location: 'New York, NY',
        startDate: 'Mar 2018',
        endDate: 'Dec 2020',
        current: false,
        bullets: [
          'Built REST APIs handling 10M+ requests/day using Node.js and PostgreSQL',
          'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
          'Collaborated with product team to design and launch mobile app with 50K+ downloads'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        startDate: '2014',
        endDate: '2018',
        gpa: '3.8',
        honors: 'Magna Cum Laude'
      }
    ],
    skills: [
      { id: 'sk-1', name: 'JavaScript', level: 90 },
      { id: 'sk-2', name: 'TypeScript', level: 85 },
      { id: 'sk-3', name: 'React.js', level: 88 },
      { id: 'sk-4', name: 'Node.js', level: 82 },
      { id: 'sk-5', name: 'Python', level: 75 },
      { id: 'sk-6', name: 'PostgreSQL', level: 78 },
      { id: 'sk-7', name: 'AWS', level: 70 },
      { id: 'sk-8', name: 'Docker', level: 72 }
    ],
    languages: [
      { id: 'lang-1', name: 'English', level: 'Native' },
      { id: 'lang-2', name: 'Spanish', level: 'Intermediate' }
    ],
    certifications: [
      { id: 'cert-1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2022' }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'OpenSource Analytics Dashboard',
        url: 'github.com/alexj/analytics',
        description: 'Built a real-time analytics dashboard with React and D3.js. 2K+ GitHub stars.',
        technologies: 'React, D3.js, Node.js, WebSocket'
      }
    ],
    customSections: []
  }
};

const ACCENT_COLORS = [
  { color: '#2DC08D', name: 'Emerald' },
  { color: '#0EA5E9', name: 'Sky Blue' },
  { color: '#7C3AED', name: 'Violet' },
  { color: '#F59E0B', name: 'Amber' },
  { color: '#EF4444', name: 'Red' },
  { color: '#EC4899', name: 'Pink' },
  { color: '#10B981', name: 'Teal' },
  { color: '#1E3A5F', name: 'Navy' },
  { color: '#374151', name: 'Charcoal' },
  { color: '#C41E3A', name: 'Crimson' },
  { color: '#FF6B35', name: 'Orange' },
  { color: '#8B5E3C', name: 'Brown' },
];

const TEMPLATES = [
  { id: 'modern', name: 'Modern Pro', desc: 'Dark sidebar with vibrant accent', preview: 'dark-sidebar' },
  { id: 'clean', name: 'Professional', desc: 'Classic two-column layout', preview: 'clean' },
  { id: 'minimal', name: 'Minimal', desc: 'Clean and elegant single column', preview: 'minimal' },
  { id: 'executive', name: 'Executive', desc: 'Bold header for senior roles', preview: 'executive' },
  { id: 'tech', name: 'Tech Dark', desc: 'Code-inspired dark theme', preview: 'tech' },
  { id: 'elegant', name: 'Elegant', desc: 'Centered layout with fine typography', preview: 'elegant' },
  { id: 'timeline', name: 'Timeline', desc: 'Visual career journey with milestone markers', preview: 'timeline' },
  { id: 'compact', name: 'Compact ATS', desc: 'High density single page format', preview: 'minimal' },
  { id: 'startup', name: 'Startup Bold', desc: 'Metrics badges and modern cards', preview: 'dark-sidebar' },
  { id: 'academic', name: 'Academic CV', desc: 'Formal CV with honors & research', preview: 'clean' },
  { id: 'darkpro', name: 'Dark Pro', desc: 'Deep dark background with neon accents', preview: 'tech' },
  { id: 'nordic', name: 'Nordic Clean', desc: 'Subtle grey rules and generous space', preview: 'minimal' },
  { id: 'infographic', name: 'Infographic', desc: 'Visual skills, badges and metrics', preview: 'clean' },
  { id: 'corporate', name: 'Corporate', desc: 'Structured blue headers and dividers', preview: 'clean' },
  { id: 'twopage', name: 'Two-Page Classic', desc: 'Extended layout for senior experts', preview: 'clean' },
  { id: 'bold', name: 'Bold Impact', desc: 'Strong high-contrast typographic layout', preview: 'dark-sidebar' },
  { id: 'fresh', name: 'Fresh Entry', desc: 'Vibrant and modern for starters', preview: 'dark-sidebar' },
  { id: 'impact', name: 'Impact Executive', desc: 'Prominent header banner', preview: 'executive' },
  { id: 'pastel', name: 'Pastel Creative', desc: 'Soft tones for creative disciplines', preview: 'elegant' }
];

const SECTIONS_CONFIG = [
  { id: 'personal', label: 'Personal Info', icon: '👤', required: true },
  { id: 'summary', label: 'Summary', icon: '📝', required: false },
  { id: 'experience', label: 'Work Experience', icon: '💼', required: false },
  { id: 'education', label: 'Education', icon: '🎓', required: false },
  { id: 'skills', label: 'Skills', icon: '⚡', required: false },
  { id: 'languages', label: 'Languages', icon: '🌐', required: false },
  { id: 'certifications', label: 'Certifications', icon: '🏆', required: false },
  { id: 'projects', label: 'Projects', icon: '🚀', required: false },
  { id: 'awards', label: 'Awards & Honors', icon: '⭐', required: false },
  { id: 'volunteer', label: 'Volunteering', icon: '❤️', required: false },
  { id: 'publications', label: 'Publications', icon: '📚', required: false },
  { id: 'hobbies', label: 'Hobbies & Passions', icon: '🎯', required: false },
  { id: 'references', label: 'References', icon: '👥', required: false },
];

const AI_SUGGESTIONS = {
  summary: [
    'Results-driven professional with 5+ years of experience in {field}. Proven track record of delivering high-impact solutions and leading cross-functional teams.',
    'Dynamic and innovative {field} professional with expertise in driving business growth and implementing cutting-edge solutions.',
    'Highly motivated {field} specialist with a strong background in problem-solving and a passion for delivering exceptional results.'
  ],
  bullets: [
    'Increased team productivity by 35% through implementation of agile methodologies',
    'Reduced operational costs by $200K annually through process optimization',
    'Managed a portfolio of 15+ projects with 98% on-time delivery rate',
    'Grew user base from 10K to 100K through strategic product improvements',
    'Collaborated with cross-functional teams of 20+ stakeholders across 3 continents'
  ]
};

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  initEditorTabs();
  initSectionsNav();
  initZoom();
  initColorPicker();
  initTemplateModal();
  initAddSectionModal();
  initDownload();
  initDesignControls();
  initSamplePresets();
  initMoreActions();
  renderResume();
  updateScore();
  saveHistory();

  // Check URL params for template
  const params = new URLSearchParams(window.location.search);
  const tmpl = params.get('template');
  if (tmpl && TEMPLATES.find(t => t.id === tmpl)) {
    state.template = tmpl;
    renderResume();
  }
});

// ===================== STORAGE =====================
function saveToStorage() {
  try {
    localStorage.setItem('resumecv_data', JSON.stringify(state.data));
    localStorage.setItem('resumecv_meta', JSON.stringify({
      template: state.template,
      accentColor: state.accentColor,
      font: state.font,
      fontSize: state.fontSize,
      lineSpacing: state.lineSpacing
    }));
  } catch(e) {}
}

function loadFromStorage() {
  try {
    const data = localStorage.getItem('resumecv_data');
    const meta = localStorage.getItem('resumecv_meta');
    if (data) state.data = JSON.parse(data);
    if (meta) {
      const m = JSON.parse(meta);
      state.template = m.template || state.template;
      state.accentColor = m.accentColor || state.accentColor;
      state.font = m.font || state.font;
      state.fontSize = m.fontSize || state.fontSize;
      state.lineSpacing = m.lineSpacing || state.lineSpacing;
    }
  } catch(e) {}
}

function saveHistory() {
  const snapshot = JSON.stringify(state.data);
  state.history = state.history.slice(0, state.historyIndex + 1);
  state.history.push(snapshot);
  if (state.history.length > 50) state.history.shift();
  state.historyIndex = state.history.length - 1;
}

document.getElementById('undoBtn').addEventListener('click', () => {
  if (state.historyIndex > 0) {
    state.historyIndex--;
    state.data = JSON.parse(state.history[state.historyIndex]);
    renderResume();
    initSectionsNav();
    updateScore();
  }
});

document.getElementById('redoBtn').addEventListener('click', () => {
  if (state.historyIndex < state.history.length - 1) {
    state.historyIndex++;
    state.data = JSON.parse(state.history[state.historyIndex]);
    renderResume();
    initSectionsNav();
    updateScore();
  }
});

// ===================== EDITOR TABS =====================
function initEditorTabs() {
  const tabs = document.querySelectorAll('.editor-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('[id^="tab-"]').forEach(c => c.style.display = 'none');
      document.getElementById('tab-' + tab.dataset.tab).style.display = '';
    });
  });
}

// ===================== DESIGN CONTROLS =====================
function initDesignControls() {
  document.getElementById('fontFamily').addEventListener('change', e => {
    state.font = e.target.value;
    renderResume();
    saveToStorage();
  });
  document.getElementById('fontSize').addEventListener('change', e => {
    state.fontSize = e.target.value;
    renderResume();
    saveToStorage();
  });
  document.getElementById('lineSpacing').addEventListener('change', e => {
    state.lineSpacing = e.target.value;
    renderResume();
    saveToStorage();
  });
  document.getElementById('pageMargin').addEventListener('change', e => {
    renderResume();
  });

  document.getElementById('fontFamily').value = state.font;
  document.getElementById('fontSize').value = state.fontSize;
  document.getElementById('lineSpacing').value = state.lineSpacing;
}

// ===================== ZOOM =====================
function initZoom() {
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');
  const zoomLevel = document.getElementById('zoomLevel');
  const paper = document.getElementById('resumePaper');

  function applyZoom() {
    paper.style.transform = `scale(${state.zoom})`;
    paper.style.marginBottom = `${(state.zoom - 1) * 1123}px`;
    zoomLevel.textContent = Math.round(state.zoom * 100) + '%';
  }

  zoomIn.addEventListener('click', () => {
    state.zoom = Math.min(1.5, state.zoom + 0.1);
    applyZoom();
  });
  zoomOut.addEventListener('click', () => {
    state.zoom = Math.max(0.4, state.zoom - 0.1);
    applyZoom();
  });

  applyZoom();
}

// ===================== COLOR PICKER =====================
function initColorPicker() {
  const btn = document.getElementById('colorPickerBtn');
  const palette = document.getElementById('colorPalette');
  const swatchesContainer = document.getElementById('colorSwatches');
  const swatchEl = document.getElementById('colorSwatch');

  // Render swatches
  ACCENT_COLORS.forEach(({ color, name }) => {
    const btn = document.createElement('button');
    btn.className = 'color-swatch-btn' + (color === state.accentColor ? ' active' : '');
    btn.style.background = color;
    btn.title = name;
    btn.addEventListener('click', () => {
      state.accentColor = color;
      swatchEl.style.background = color;
      document.getElementById('colorSwatch').style.background = color;
      document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderResume();
      saveToStorage();
    });
    swatchesContainer.appendChild(btn);
  });

  swatchEl.style.background = state.accentColor;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    palette.classList.toggle('open');
  });
  document.addEventListener('click', () => palette.classList.remove('open'));
  palette.addEventListener('click', e => e.stopPropagation());
}

// ===================== TEMPLATE MODAL =====================
function initTemplateModal() {
  const modal = document.getElementById('templateModal');
  const openBtn = document.getElementById('templateSwitcherBtn');
  const closeBtn = document.getElementById('templateModalClose');
  const grid = document.getElementById('modalTemplatesGrid');

  TEMPLATES.forEach(template => {
    const card = document.createElement('div');
    card.className = 'modal-template-card' + (template.id === state.template ? ' selected' : '');
    card.innerHTML = `
      <div class="modal-template-preview">${renderTemplateThumbnail(template.preview)}</div>
      <div class="modal-template-info">
        <div class="modal-template-name">${template.name}</div>
        <div class="modal-template-desc">${template.desc}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      state.template = template.id;
      grid.querySelectorAll('.modal-template-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      renderResume();
      saveToStorage();
      setTimeout(() => modal.classList.remove('open'), 300);
    });
    grid.appendChild(card);
  });

  openBtn.addEventListener('click', () => modal.classList.add('open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
}

function renderTemplateThumbnail(style) {
  const c = state.accentColor;
  if (style === 'dark-sidebar') return `<div style="width:100%;height:100%;display:flex;background:#f5f5f5;"><div style="width:35%;background:#1a1a2e;"></div><div style="flex:1;padding:10px;background:white;"><div style="height:6px;background:${c};width:60%;border-radius:3px;margin-bottom:8px;"></div><div style="height:3px;background:#ddd;width:80%;border-radius:2px;margin-bottom:4px;"></div><div style="height:3px;background:#ddd;width:60%;border-radius:2px;"></div></div></div>`;
  if (style === 'clean') return `<div style="width:100%;height:100%;background:white;padding:12px;"><div style="border-bottom:3px solid ${c};padding-bottom:8px;margin-bottom:8px;"><div style="height:8px;background:#1a1a2e;width:60%;border-radius:2px;margin-bottom:4px;"></div></div><div style="height:3px;background:#ddd;width:80%;border-radius:2px;margin-bottom:4px;"></div><div style="height:3px;background:#ddd;width:60%;border-radius:2px;"></div></div>`;
  if (style === 'minimal') return `<div style="width:100%;height:100%;background:white;padding:12px;"><div style="height:8px;background:#111;width:55%;border-radius:2px;margin-bottom:6px;"></div><div style="height:1px;background:#ddd;margin-bottom:8px;"></div><div style="height:3px;background:#ddd;width:90%;border-radius:2px;margin-bottom:4px;"></div><div style="height:3px;background:#ddd;width:70%;border-radius:2px;"></div></div>`;
  if (style === 'executive') return `<div style="width:100%;height:100%;background:white;"><div style="background:#0f3460;padding:12px;margin-bottom:8px;"><div style="height:8px;background:white;width:60%;border-radius:2px;margin-bottom:4px;"></div><div style="height:4px;background:rgba(255,255,255,0.4);width:40%;border-radius:2px;"></div></div><div style="padding:0 12px;"><div style="height:3px;background:#ddd;width:80%;border-radius:2px;margin-bottom:4px;"></div></div></div>`;
  if (style === 'tech') return `<div style="width:100%;height:100%;background:#0f172a;padding:12px;"><div style="height:6px;background:${c};width:65%;border-radius:3px;margin-bottom:6px;"></div><div style="height:3px;background:rgba(255,255,255,0.2);width:80%;border-radius:2px;margin-bottom:4px;"></div><div style="height:3px;background:rgba(255,255,255,0.2);width:60%;border-radius:2px;"></div></div>`;
  if (style === 'elegant') return `<div style="width:100%;height:100%;background:white;padding:12px;text-align:center;"><div style="height:8px;background:#111;width:50%;border-radius:2px;margin:0 auto 6px;"></div><div style="height:3px;background:${c};width:30%;border-radius:2px;margin:0 auto 8px;"></div><div style="height:3px;background:#ddd;width:80%;border-radius:2px;margin:0 auto 4px;"></div><div style="height:3px;background:#ddd;width:60%;border-radius:2px;margin:0 auto;"></div></div>`;
  return '';
}

// ===================== ADD SECTION MODAL =====================
function initAddSectionModal() {
  const modal = document.getElementById('addSectionModal');
  const openBtn = document.getElementById('addSectionBtn');
  const closeBtn = document.getElementById('addSectionModalClose');
  const container = document.getElementById('addSectionOptions');

  const available = [
    { id: 'languages', label: 'Languages', icon: '🌐' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'awards', label: 'Awards & Honors', icon: '⭐' },
    { id: 'volunteer', label: 'Volunteering', icon: '❤️' },
    { id: 'publications', label: 'Publications', icon: '📚' },
    { id: 'hobbies', label: 'Hobbies & Passions', icon: '🎯' },
    { id: 'references', label: 'References', icon: '👥' },
  ];

  container.innerHTML = '';
  available.forEach(s => {
    const btn = document.createElement('button');
    btn.style.cssText = 'padding:14px;border:1.5px solid #e5e7eb;border-radius:10px;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;text-align:left;background:white;';
    btn.innerHTML = `<span style="font-size:20px;">${s.icon}</span><span>${s.label}</span>`;
    btn.addEventListener('mouseenter', () => { btn.style.borderColor = '#2DC08D'; btn.style.background = '#f0fdf9'; });
    btn.addEventListener('mouseleave', () => { btn.style.borderColor = '#e5e7eb'; btn.style.background = 'white'; });
    btn.addEventListener('click', () => {
      // Add to config if not present
      if (!SECTIONS_CONFIG.find(sc => sc.id === s.id)) {
        SECTIONS_CONFIG.push({ id: s.id, label: s.label, icon: s.icon, required: false });
      }
      // Initialize data array if empty
      state.data[s.id] = state.data[s.id] || [];
      if (state.data[s.id].length === 0) {
        if (s.id === 'awards') state.data.awards.push({ id: 'aw-' + Date.now(), title: '', issuer: '', date: '', description: '' });
        else if (s.id === 'volunteer') state.data.volunteer.push({ id: 'vol-' + Date.now(), role: '', organization: '', startDate: '', endDate: 'Present', bullets: [''] });
        else if (s.id === 'publications') state.data.publications.push({ id: 'pub-' + Date.now(), title: '', publisher: '', date: '', url: '' });
        else if (s.id === 'hobbies') state.data.hobbies.push({ id: 'hob-' + Date.now(), name: '', description: '' });
        else if (s.id === 'references') state.data.references.push({ id: 'ref-' + Date.now(), name: '', role: '', company: '', contact: '' });
        else if (s.id === 'languages') state.data.languages.push({ id: 'lang-' + Date.now(), name: '', level: 'Intermediate' });
        else if (s.id === 'certifications') state.data.certifications.push({ id: 'cert-' + Date.now(), name: '', issuer: '', date: '' });
        else if (s.id === 'projects') state.data.projects.push({ id: 'proj-' + Date.now(), name: '', url: '', description: '', technologies: '' });
      }
      state.activeSection = s.id;
      initSectionsNav();
      renderSectionForm(s.id);
      renderResume();
      updateScore();
      saveToStorage();
      saveHistory();
      showToast(`${s.label} section added!`);
      modal.classList.remove('open');
    });
    container.appendChild(btn);
  });

  openBtn.addEventListener('click', () => modal.classList.add('open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
}

// ===================== SECTIONS NAV =====================
function initSectionsNav() {
  const nav = document.getElementById('sectionsNav');
  nav.innerHTML = '';

  SECTIONS_CONFIG.forEach(section => {
    const item = document.createElement('div');
    item.className = 'section-nav-item' + (state.activeSection === section.id ? ' active' : '');
    item.innerHTML = `
      <div class="section-nav-left">
        <span class="section-nav-icon">${section.icon}</span>
        <div>
          <div class="section-nav-label">${section.label}</div>
          <div class="section-nav-status">${getSectionStatus(section.id)}</div>
        </div>
      </div>
      <div class="section-nav-actions">
        <span class="section-nav-action">▸</span>
      </div>
    `;
    item.addEventListener('click', () => {
      state.activeSection = section.id;
      document.querySelectorAll('.section-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      renderSectionForm(section.id);
    });
    nav.appendChild(item);
  });

  renderSectionForm(state.activeSection);
}

function getSectionStatus(id) {
  const d = state.data;
  switch(id) {
    case 'personal': return d.personal.firstName ? '✓ Complete' : 'Add your info';
    case 'summary': return d.personal.summary ? '✓ Added' : 'Tell your story';
    case 'experience': return `${(d.experience||[]).length} position${(d.experience||[]).length !== 1 ? 's' : ''}`;
    case 'education': return `${(d.education||[]).length} school${(d.education||[]).length !== 1 ? 's' : ''}`;
    case 'skills': return `${(d.skills||[]).length} skill${(d.skills||[]).length !== 1 ? 's' : ''}`;
    case 'languages': return `${(d.languages||[]).length} language${(d.languages||[]).length !== 1 ? 's' : ''}`;
    case 'certifications': return `${(d.certifications||[]).length} certification${(d.certifications||[]).length !== 1 ? 's' : ''}`;
    case 'projects': return `${(d.projects||[]).length} project${(d.projects||[]).length !== 1 ? 's' : ''}`;
    case 'awards': return `${(d.awards||[]).length} award${(d.awards||[]).length !== 1 ? 's' : ''}`;
    case 'volunteer': return `${(d.volunteer||[]).length} role${(d.volunteer||[]).length !== 1 ? 's' : ''}`;
    case 'publications': return `${(d.publications||[]).length} publication${(d.publications||[]).length !== 1 ? 's' : ''}`;
    case 'hobbies': return `${(d.hobbies||[]).length} passion${(d.hobbies||[]).length !== 1 ? 's' : ''}`;
    case 'references': return `${(d.references||[]).length} reference${(d.references||[]).length !== 1 ? 's' : ''}`;
    default: return '';
  }
}

// ===================== SECTION FORMS =====================
function renderSectionForm(sectionId) {
  const content = document.getElementById('tab-content');

  // Remove existing form
  const existing = content.querySelector('.section-form-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'section-form-container';
  container.style.marginTop = '16px';

  switch(sectionId) {
    case 'personal': container.appendChild(renderPersonalForm()); break;
    case 'summary': container.appendChild(renderSummaryForm()); break;
    case 'experience': container.appendChild(renderExperienceForm()); break;
    case 'education': container.appendChild(renderEducationForm()); break;
    case 'skills': container.appendChild(renderSkillsForm()); break;
    case 'languages': container.appendChild(renderLanguagesForm()); break;
    case 'certifications': container.appendChild(renderCertificationsForm()); break;
    case 'projects': container.appendChild(renderProjectsForm()); break;
    case 'awards': container.appendChild(renderAwardsForm()); break;
    case 'volunteer': container.appendChild(renderVolunteerForm()); break;
    case 'publications': container.appendChild(renderPublicationsForm()); break;
    case 'hobbies': container.appendChild(renderHobbiesForm()); break;
    case 'references': container.appendChild(renderReferencesForm()); break;
  }

  content.insertBefore(container, document.getElementById('addSectionBtn'));
}

function createField(label, type, value, onchange, placeholder = '') {
  const group = document.createElement('div');
  group.className = 'form-group';
  const lbl = document.createElement('label');
  lbl.textContent = label;
  group.appendChild(lbl);

  let input;
  if (type === 'textarea') {
    input = document.createElement('textarea');
    input.className = 'form-textarea';
    input.rows = 3;
  } else {
    input = document.createElement('input');
    input.type = type;
    input.className = 'form-input';
  }
  input.value = value || '';
  input.placeholder = placeholder;
  input.addEventListener('input', e => {
    onchange(e.target.value);
    renderResume();
    updateScore();
    saveToStorage();
  });
  input.addEventListener('change', () => saveHistory());
  group.appendChild(input);
  return group;
}

function renderPersonalForm() {
  const form = document.createElement('div');
  form.className = 'section-form';

  // Photo upload
  const photoWrap = document.createElement('div');
  photoWrap.className = 'photo-upload';
  photoWrap.innerHTML = state.data.personal.photo
    ? `<img src="${state.data.personal.photo}" class="photo-preview" alt="Profile" />`
    : `<div class="photo-placeholder">🧑</div>`;
  photoWrap.innerHTML += `<div><strong>Upload Photo</strong><p>JPG, PNG up to 5MB</p></div>`;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      state.data.personal.photo = evt.target.result;
      renderResume();
      saveToStorage();
      photoWrap.querySelector('.photo-placeholder, .photo-preview').outerHTML =
        `<img src="${evt.target.result}" class="photo-preview" alt="Profile" />`;
    };
    reader.readAsDataURL(file);
  });
  photoWrap.appendChild(fileInput);
  photoWrap.addEventListener('click', () => fileInput.click());
  form.appendChild(photoWrap);

  const row1 = document.createElement('div');
  row1.className = 'form-row';
  row1.appendChild(createField('First Name', 'text', state.data.personal.firstName, v => state.data.personal.firstName = v, 'John'));
  row1.appendChild(createField('Last Name', 'text', state.data.personal.lastName, v => state.data.personal.lastName = v, 'Doe'));
  form.appendChild(row1);

  form.appendChild(createField('Job Title', 'text', state.data.personal.jobTitle, v => state.data.personal.jobTitle = v, 'Software Engineer'));
  form.appendChild(createField('Email', 'email', state.data.personal.email, v => state.data.personal.email = v, 'john@example.com'));

  const row2 = document.createElement('div');
  row2.className = 'form-row';
  row2.appendChild(createField('Phone', 'text', state.data.personal.phone, v => state.data.personal.phone = v, '+1 (555) 000-0000'));
  row2.appendChild(createField('Location', 'text', state.data.personal.location, v => state.data.personal.location = v, 'New York, NY'));
  form.appendChild(row2);

  form.appendChild(createField('Website / LinkedIn', 'text', state.data.personal.website, v => state.data.personal.website = v, 'linkedin.com/in/johndoe'));

  return form;
}

function renderSummaryForm() {
  const form = document.createElement('div');
  form.className = 'section-form';

  const textareaGroup = createField('Professional Summary', 'textarea', state.data.personal.summary, v => state.data.personal.summary = v, 'Write a compelling 2-3 sentence summary...');
  textareaGroup.querySelector('textarea').rows = 5;
  form.appendChild(textareaGroup);

  // AI Button
  const aiBtn = document.createElement('button');
  aiBtn.className = 'ai-suggest-btn';
  aiBtn.innerHTML = '✨ Generate with AI';
  aiBtn.addEventListener('click', () => {
    const suggestions = AI_SUGGESTIONS.summary;
    const random = suggestions[Math.floor(Math.random() * suggestions.length)];
    const field = state.data.personal.jobTitle || 'your field';
    state.data.personal.summary = random.replace('{field}', field);
    form.querySelector('textarea').value = state.data.personal.summary;
    renderResume();
    updateScore();
    saveToStorage();
    showToast('AI summary generated! Feel free to edit it.');
  });
  form.appendChild(aiBtn);

  return form;
}

function renderExperienceForm() {
  const container = document.createElement('div');

  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Work Experience</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Position';
  addBtn.addEventListener('click', () => {
    state.data.experience.unshift({
      id: 'exp-' + Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      current: true,
      bullets: ['']
    });
    renderSectionForm('experience');
    renderResume();
    saveToStorage();
    saveHistory();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  state.data.experience.forEach((exp, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'entry-card-header';
    cardHeader.innerHTML = `
      <div>
        <div class="entry-card-title">${exp.title || 'New Position'}</div>
        <div class="entry-card-sub">${exp.company || 'Company Name'}</div>
      </div>
    `;
    const actions = document.createElement('div');
    actions.className = 'entry-card-actions';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3h10M5 3V2h4v1M6 6v4M8 6v4M3 3l1 9h6l1-9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;
    deleteBtn.addEventListener('click', () => {
      state.data.experience.splice(i, 1);
      renderSectionForm('experience');
      renderResume();
      saveToStorage();
      saveHistory();
    });
    actions.appendChild(deleteBtn);
    cardHeader.appendChild(actions);
    card.appendChild(cardHeader);

    const body = document.createElement('div');
    body.className = 'entry-body';

    const row1 = document.createElement('div');
    row1.className = 'form-row';
    row1.appendChild(createField('Job Title', 'text', exp.title, v => { exp.title = v; cardHeader.querySelector('.entry-card-title').textContent = v || 'New Position'; }));
    row1.appendChild(createField('Company', 'text', exp.company, v => { exp.company = v; cardHeader.querySelector('.entry-card-sub').textContent = v || 'Company Name'; }));
    body.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'form-row';
    row2.appendChild(createField('Start Date', 'text', exp.startDate, v => exp.startDate = v, 'Jan 2021'));
    row2.appendChild(createField('End Date', 'text', exp.endDate, v => exp.endDate = v, 'Present'));
    body.appendChild(row2);

    body.appendChild(createField('Location', 'text', exp.location, v => exp.location = v, 'New York, NY'));

    // Bullets
    const bulletsLabel = document.createElement('label');
    bulletsLabel.style.cssText = 'font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;';
    bulletsLabel.textContent = 'Achievements & Responsibilities';
    body.appendChild(bulletsLabel);

    exp.bullets.forEach((bullet, bi) => {
      const bulletRow = document.createElement('div');
      bulletRow.style.cssText = 'display:flex;gap:6px;align-items:flex-start;';
      const bulletInput = document.createElement('textarea');
      bulletInput.className = 'form-textarea';
      bulletInput.style.minHeight = '52px';
      bulletInput.placeholder = '• Describe your achievement with metrics (e.g., Increased sales by 30%)';
      bulletInput.value = bullet;
      bulletInput.addEventListener('input', () => { exp.bullets[bi] = bulletInput.value; renderResume(); saveToStorage(); });
      bulletInput.addEventListener('change', () => saveHistory());

      const removeBullet = document.createElement('button');
      removeBullet.className = 'entry-action-btn delete';
      removeBullet.style.marginTop = '8px';
      removeBullet.innerHTML = '×';
      removeBullet.addEventListener('click', () => {
        exp.bullets.splice(bi, 1);
        renderSectionForm('experience');
        renderResume();
        saveToStorage();
      });

      bulletRow.appendChild(bulletInput);
      if (exp.bullets.length > 1) bulletRow.appendChild(removeBullet);
      body.appendChild(bulletRow);
    });

    const addBulletRow = document.createElement('div');
    addBulletRow.style.cssText = 'display:flex;gap:8px;';

    const addBulletBtn = document.createElement('button');
    addBulletBtn.className = 'form-section-add-btn';
    addBulletBtn.innerHTML = '+ Add bullet point';
    addBulletBtn.addEventListener('click', () => {
      exp.bullets.push('');
      renderSectionForm('experience');
      renderResume();
      saveToStorage();
    });

    const aiBtn = document.createElement('button');
    aiBtn.className = 'ai-suggest-btn';
    aiBtn.innerHTML = '✨ AI Suggestions';
    aiBtn.addEventListener('click', () => {
      const suggestions = AI_SUGGESTIONS.bullets;
      const random = suggestions[Math.floor(Math.random() * suggestions.length)];
      exp.bullets.push(random);
      renderSectionForm('experience');
      renderResume();
      saveToStorage();
      showToast('AI bullet point added!');
    });

    addBulletRow.appendChild(addBulletBtn);
    addBulletRow.appendChild(aiBtn);
    body.appendChild(addBulletRow);

    card.appendChild(body);
    container.appendChild(card);
  });

  return container;
}

function renderEducationForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Education</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Education';
  addBtn.addEventListener('click', () => {
    state.data.education.push({ id: 'edu-' + Date.now(), degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '' });
    renderSectionForm('education');
    renderResume();
    saveToStorage();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  state.data.education.forEach((edu, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const body = document.createElement('div');
    body.className = 'entry-body';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'position:absolute;top:10px;right:10px;';
    deleteBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3h10M5 3V2h4v1M6 6v4M8 6v4M3 3l1 9h6l1-9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;
    deleteBtn.addEventListener('click', () => {
      state.data.education.splice(i, 1);
      renderSectionForm('education');
      renderResume();
      saveToStorage();
    });
    card.appendChild(deleteBtn);

    body.appendChild(createField('Degree / Certificate', 'text', edu.degree, v => edu.degree = v, 'B.S. Computer Science'));
    body.appendChild(createField('Institution', 'text', edu.institution, v => edu.institution = v, 'University Name'));

    const row1 = document.createElement('div');
    row1.className = 'form-row';
    row1.appendChild(createField('Start Year', 'text', edu.startDate, v => edu.startDate = v, '2018'));
    row1.appendChild(createField('End Year', 'text', edu.endDate, v => edu.endDate = v, '2022'));
    body.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'form-row';
    row2.appendChild(createField('Location', 'text', edu.location, v => edu.location = v, 'New York, NY'));
    row2.appendChild(createField('GPA', 'text', edu.gpa, v => edu.gpa = v, '3.8'));
    body.appendChild(row2);

    card.appendChild(body);
    container.appendChild(card);
  });
  return container;
}

function renderSkillsForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Skills</span>`;
  container.appendChild(header);

  // Tags input
  const tagsWrap = document.createElement('div');
  tagsWrap.className = 'skills-tags';
  tagsWrap.id = 'skillsTagsWrap';

  function renderTags() {
    tagsWrap.innerHTML = '';
    state.data.skills.forEach((skill, i) => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.innerHTML = `${skill.name} <button class="skill-tag-remove" title="Remove">×</button>`;
      tag.querySelector('.skill-tag-remove').addEventListener('click', () => {
        state.data.skills.splice(i, 1);
        renderTags();
        renderResume();
        saveToStorage();
        saveHistory();
      });
      tagsWrap.appendChild(tag);
    });

    const input = document.createElement('input');
    input.className = 'skills-input-field';
    input.placeholder = state.data.skills.length ? '' : 'Type a skill and press Enter...';
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        state.data.skills.push({ id: 'sk-' + Date.now(), name: input.value.trim(), level: 80 });
        renderTags();
        renderResume();
        saveToStorage();
        saveHistory();
      }
      if (e.key === 'Backspace' && !input.value && state.data.skills.length) {
        state.data.skills.pop();
        renderTags();
        renderResume();
        saveToStorage();
      }
    });
    tagsWrap.appendChild(input);
    tagsWrap.addEventListener('click', () => input.focus());
  }

  renderTags();
  container.appendChild(tagsWrap);
  container.appendChild(document.createTextNode(' '));

  const hint = document.createElement('p');
  hint.style.cssText = 'font-size:12px;color:#9ca3af;margin-top:8px;';
  hint.textContent = 'Press Enter to add a skill. Click × to remove.';
  container.appendChild(hint);

  // Skill levels
  const levelsTitle = document.createElement('h4');
  levelsTitle.style.cssText = 'font-size:14px;font-weight:700;margin-top:16px;margin-bottom:8px;';
  levelsTitle.textContent = 'Skill Levels';
  container.appendChild(levelsTitle);

  state.data.skills.forEach(skill => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:8px;';
    row.innerHTML = `<span style="font-size:13px;font-weight:600;min-width:90px;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${skill.name}</span>`;

    const wrap = document.createElement('div');
    wrap.className = 'skill-level-wrap';
    wrap.style.flex = '1';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '10';
    slider.max = '100';
    slider.value = skill.level;
    const label = document.createElement('span');
    label.className = 'skill-level-label';
    label.textContent = skill.level + '%';
    slider.addEventListener('input', () => {
      skill.level = parseInt(slider.value);
      label.textContent = skill.level + '%';
      renderResume();
      saveToStorage();
    });
    slider.addEventListener('change', () => saveHistory());
    wrap.appendChild(slider);
    wrap.appendChild(label);
    row.appendChild(wrap);
    container.appendChild(row);
  });

  return container;
}

function renderLanguagesForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Languages</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Language';
  addBtn.addEventListener('click', () => {
    state.data.languages.push({ id: 'lang-' + Date.now(), name: '', level: 'Intermediate' });
    renderSectionForm('languages');
    renderResume();
    saveToStorage();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  state.data.languages.forEach((lang, i) => {
    const row = document.createElement('div');
    row.className = 'form-row';
    row.style.marginBottom = '8px';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'form-input';
    nameInput.value = lang.name;
    nameInput.placeholder = 'Language';
    nameInput.addEventListener('input', () => { lang.name = nameInput.value; renderResume(); saveToStorage(); });
    nameInput.addEventListener('change', () => saveHistory());

    const levelSelect = document.createElement('select');
    levelSelect.className = 'form-select';
    ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Beginner'].forEach(l => {
      const opt = document.createElement('option');
      opt.value = l;
      opt.textContent = l;
      if (l === lang.level) opt.selected = true;
      levelSelect.appendChild(opt);
    });
    levelSelect.addEventListener('change', () => { lang.level = levelSelect.value; renderResume(); saveToStorage(); saveHistory(); });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'align-self:center;padding:8px;border-radius:6px;';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
      state.data.languages.splice(i, 1);
      renderSectionForm('languages');
      renderResume();
      saveToStorage();
    });

    row.appendChild(nameInput);
    row.appendChild(levelSelect);
    row.appendChild(deleteBtn);
    container.appendChild(row);
  });
  return container;
}

function renderCertificationsForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Certifications</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Certification';
  addBtn.addEventListener('click', () => {
    state.data.certifications.push({ id: 'cert-' + Date.now(), name: '', issuer: '', date: '' });
    renderSectionForm('certifications');
    renderResume();
    saveToStorage();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  state.data.certifications.forEach((cert, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const body = document.createElement('div');
    body.className = 'entry-body';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'position:absolute;top:10px;right:10px;';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
      state.data.certifications.splice(i, 1);
      renderSectionForm('certifications');
      renderResume();
      saveToStorage();
    });
    card.appendChild(deleteBtn);

    body.appendChild(createField('Certification Name', 'text', cert.name, v => cert.name = v, 'AWS Solutions Architect'));
    const row = document.createElement('div');
    row.className = 'form-row';
    row.appendChild(createField('Issuer', 'text', cert.issuer, v => cert.issuer = v, 'Amazon Web Services'));
    row.appendChild(createField('Date', 'text', cert.date, v => cert.date = v, '2023'));
    body.appendChild(row);
    card.appendChild(body);
    container.appendChild(card);
  });
  return container;
}

function renderProjectsForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Projects</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Project';
  addBtn.addEventListener('click', () => {
    state.data.projects.push({ id: 'proj-' + Date.now(), name: '', url: '', description: '', technologies: '' });
    renderSectionForm('projects');
    renderResume();
    saveToStorage();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  state.data.projects.forEach((proj, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const body = document.createElement('div');
    body.className = 'entry-body';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'position:absolute;top:10px;right:10px;';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
      state.data.projects.splice(i, 1);
      renderSectionForm('projects');
      renderResume();
      saveToStorage();
    });
    card.appendChild(deleteBtn);

    const row = document.createElement('div');
    row.className = 'form-row';
    row.appendChild(createField('Project Name', 'text', proj.name, v => proj.name = v, 'My Awesome Project'));
    row.appendChild(createField('URL / GitHub', 'text', proj.url, v => proj.url = v, 'github.com/user/project'));
    body.appendChild(row);
    body.appendChild(createField('Description', 'textarea', proj.description, v => proj.description = v, 'Brief description of the project and its impact...'));
    body.appendChild(createField('Technologies Used', 'text', proj.technologies, v => proj.technologies = v, 'React, Node.js, PostgreSQL'));
    card.appendChild(body);
    container.appendChild(card);
  });
  return container;
}

function renderAwardsForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Awards & Honors</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Award';
  addBtn.addEventListener('click', () => {
    state.data.awards = state.data.awards || [];
    state.data.awards.push({ id: 'aw-' + Date.now(), title: '', issuer: '', date: '', description: '' });
    renderSectionForm('awards');
    renderResume();
    saveToStorage();
    saveHistory();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  (state.data.awards || []).forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const body = document.createElement('div');
    body.className = 'entry-body';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'position:absolute;top:10px;right:10px;';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
      state.data.awards.splice(i, 1);
      renderSectionForm('awards');
      renderResume();
      saveToStorage();
      saveHistory();
    });
    card.appendChild(deleteBtn);

    body.appendChild(createField('Award Title', 'text', item.title, v => item.title = v, 'e.g. Employee of the Year / Hackathon Winner'));
    const row = document.createElement('div');
    row.className = 'form-row';
    row.appendChild(createField('Issuer / Organization', 'text', item.issuer, v => item.issuer = v, 'e.g. Google / TechCrunch'));
    row.appendChild(createField('Year / Date', 'text', item.date, v => item.date = v, '2023'));
    body.appendChild(row);
    body.appendChild(createField('Description (Optional)', 'text', item.description, v => item.description = v, 'Recognized among 500+ participants for innovative solution.'));

    card.appendChild(body);
    container.appendChild(card);
  });
  return container;
}

function renderVolunteerForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Volunteering & Leadership</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Volunteer Role';
  addBtn.addEventListener('click', () => {
    state.data.volunteer = state.data.volunteer || [];
    state.data.volunteer.push({ id: 'vol-' + Date.now(), role: '', organization: '', startDate: '', endDate: 'Present', bullets: [''] });
    renderSectionForm('volunteer');
    renderResume();
    saveToStorage();
    saveHistory();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  (state.data.volunteer || []).forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const body = document.createElement('div');
    body.className = 'entry-body';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'position:absolute;top:10px;right:10px;';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
      state.data.volunteer.splice(i, 1);
      renderSectionForm('volunteer');
      renderResume();
      saveToStorage();
      saveHistory();
    });
    card.appendChild(deleteBtn);

    body.appendChild(createField('Role / Title', 'text', item.role, v => item.role = v, 'e.g. Mentor / Chapter Lead'));
    body.appendChild(createField('Organization', 'text', item.organization, v => item.organization = v, 'e.g. Code for America / Red Cross'));
    const row = document.createElement('div');
    row.className = 'form-row';
    row.appendChild(createField('Start Date', 'text', item.startDate, v => item.startDate = v, '2021'));
    row.appendChild(createField('End Date', 'text', item.endDate, v => item.endDate = v, 'Present'));
    body.appendChild(row);

    card.appendChild(body);
    container.appendChild(card);
  });
  return container;
}

function renderPublicationsForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Publications & Research</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Publication';
  addBtn.addEventListener('click', () => {
    state.data.publications = state.data.publications || [];
    state.data.publications.push({ id: 'pub-' + Date.now(), title: '', publisher: '', date: '', url: '' });
    renderSectionForm('publications');
    renderResume();
    saveToStorage();
    saveHistory();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  (state.data.publications || []).forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const body = document.createElement('div');
    body.className = 'entry-body';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'position:absolute;top:10px;right:10px;';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
      state.data.publications.splice(i, 1);
      renderSectionForm('publications');
      renderResume();
      saveToStorage();
      saveHistory();
    });
    card.appendChild(deleteBtn);

    body.appendChild(createField('Publication Title', 'text', item.title, v => item.title = v, 'e.g. Deep Learning in Distributed Systems'));
    const row = document.createElement('div');
    row.className = 'form-row';
    row.appendChild(createField('Publisher / Journal', 'text', item.publisher, v => item.publisher = v, 'e.g. IEEE / ACM / Nature'));
    row.appendChild(createField('Date', 'text', item.date, v => item.date = v, '2023'));
    body.appendChild(row);
    body.appendChild(createField('URL / DOI Link', 'text', item.url, v => item.url = v, 'https://doi.org/...'));

    card.appendChild(body);
    container.appendChild(card);
  });
  return container;
}

function renderHobbiesForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">Hobbies & Passions</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Passion';
  addBtn.addEventListener('click', () => {
    state.data.hobbies = state.data.hobbies || [];
    state.data.hobbies.push({ id: 'hob-' + Date.now(), name: '', description: '' });
    renderSectionForm('hobbies');
    renderResume();
    saveToStorage();
    saveHistory();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  (state.data.hobbies || []).forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const body = document.createElement('div');
    body.className = 'entry-body';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'position:absolute;top:10px;right:10px;';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
      state.data.hobbies.splice(i, 1);
      renderSectionForm('hobbies');
      renderResume();
      saveToStorage();
      saveHistory();
    });
    card.appendChild(deleteBtn);

    body.appendChild(createField('Hobby / Passion', 'text', item.name, v => item.name = v, 'e.g. Marathon Running / Landscape Photography'));
    body.appendChild(createField('Short Detail (Optional)', 'text', item.description, v => item.description = v, 'e.g. Completed Boston Marathon 2023'));

    card.appendChild(body);
    container.appendChild(card);
  });
  return container;
}

function renderReferencesForm() {
  const container = document.createElement('div');
  const header = document.createElement('div');
  header.className = 'form-section-header';
  header.innerHTML = `<span class="form-section-title">References</span>`;
  const addBtn = document.createElement('button');
  addBtn.className = 'form-section-add-btn';
  addBtn.innerHTML = '+ Add Reference';
  addBtn.addEventListener('click', () => {
    state.data.references = state.data.references || [];
    state.data.references.push({ id: 'ref-' + Date.now(), name: '', role: '', company: '', contact: '' });
    renderSectionForm('references');
    renderResume();
    saveToStorage();
    saveHistory();
  });
  header.appendChild(addBtn);
  container.appendChild(header);

  (state.data.references || []).forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    const body = document.createElement('div');
    body.className = 'entry-body';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'entry-action-btn delete';
    deleteBtn.style.cssText = 'position:absolute;top:10px;right:10px;';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
      state.data.references.splice(i, 1);
      renderSectionForm('references');
      renderResume();
      saveToStorage();
      saveHistory();
    });
    card.appendChild(deleteBtn);

    body.appendChild(createField('Reference Name', 'text', item.name, v => item.name = v, 'e.g. Dr. Jane Smith'));
    const row = document.createElement('div');
    row.className = 'form-row';
    row.appendChild(createField('Role / Title', 'text', item.role, v => item.role = v, 'e.g. VP of Engineering'));
    row.appendChild(createField('Company', 'text', item.company, v => item.company = v, 'e.g. Google'));
    body.appendChild(row);
    body.appendChild(createField('Contact Info / Email / Phone', 'text', item.contact, v => item.contact = v, 'e.g. jane.smith@google.com'));

    card.appendChild(body);
    container.appendChild(card);
  });
  return container;
}

// ===================== SCORE =====================
function updateScore() {
  const d = state.data;
  let score = 0;
  if (d.personal.firstName && d.personal.lastName) score += 10;
  if (d.personal.email) score += 10;
  if (d.personal.phone) score += 5;
  if (d.personal.location) score += 5;
  if (d.personal.jobTitle) score += 10;
  if (d.personal.summary && d.personal.summary.length > 50) score += 15;
  if (d.experience.length >= 1) score += 15;
  if (d.experience.length >= 2) score += 5;
  if (d.experience.some(e => e.bullets.length >= 2)) score += 5;
  if (d.education.length >= 1) score += 10;
  if (d.skills.length >= 3) score += 10;

  document.getElementById('resumeScore').textContent = Math.min(100, score);

  const badge = document.getElementById('scoreBadge');
  if (score >= 80) badge.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
  else if (score >= 50) badge.style.background = 'linear-gradient(135deg, #fef3c7, #fde68a)';
  else badge.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)';
}

// ===================== RENDER RESUME =====================
function renderResume() {
  const paper = document.getElementById('resumePaper');
  paper.className = 'resume-paper template-' + state.template;
  paper.style.fontFamily = state.font;
  paper.style.fontSize = { small: '9px', medium: '10px', large: '11px' }[state.fontSize] || '10px';
  paper.style.lineHeight = { compact: '1.3', normal: '1.5', relaxed: '1.7' }[state.lineSpacing] || '1.5';

  const c = state.accentColor;
  const d = state.data;

  switch (state.template) {
    case 'modern':
    case 'fresh':
    case 'bold':
      paper.innerHTML = renderModernTemplate(d, c);
      break;
    case 'clean':
    case 'twopage':
    case 'corporate':
      paper.innerHTML = renderCleanTemplate(d, c);
      break;
    case 'minimal':
    case 'nordic':
      paper.innerHTML = renderMinimalTemplate(d, c);
      break;
    case 'executive':
    case 'impact':
      paper.innerHTML = renderExecutiveTemplate(d, c);
      break;
    case 'tech':
      paper.innerHTML = renderTechTemplate(d, c);
      break;
    case 'elegant':
    case 'pastel':
      paper.innerHTML = renderElegantTemplate(d, c);
      break;
    case 'timeline':
      paper.innerHTML = renderTimelineTemplate(d, c);
      break;
    case 'compact':
      paper.innerHTML = renderCompactTemplate(d, c);
      break;
    case 'startup':
      paper.innerHTML = renderStartupTemplate(d, c);
      break;
    case 'academic':
      paper.innerHTML = renderAcademicTemplate(d, c);
      break;
    case 'darkpro':
      paper.innerHTML = renderDarkProTemplate(d, c);
      break;
    case 'infographic':
    case 'creative2':
      paper.innerHTML = renderInfographicTemplate(d, c);
      break;
    default:
      paper.innerHTML = renderModernTemplate(d, c);
  }
}

// ===================== TEMPLATE RENDERERS =====================

function renderModernTemplate(d, c) {
  const p = d.personal;
  return `
  <div class="resume-inner" style="display:flex;height:100%;">
    <!-- SIDEBAR -->
    <div style="width:230px;background:#1a1a2e;color:white;padding:32px 20px;flex-shrink:0;min-height:100%;">
      <!-- Photo -->
      <div style="margin-bottom:20px;">
        ${p.photo
          ? `<img src="${p.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid ${c};margin-bottom:10px;" />`
          : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.1);border:3px solid ${c};display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:10px;">👤</div>`}
        <div style="font-family:${state.font};font-size:16px;font-weight:700;line-height:1.2;margin-bottom:4px;">${p.firstName} ${p.lastName}</div>
        <div style="font-size:10px;color:${c};font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">${p.jobTitle}</div>
      </div>

      <!-- Contact -->
      <div style="margin-bottom:20px;">
        <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${c};margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.1);">Contact</div>
        ${p.email ? `<div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;font-size:9px;color:rgba(255,255,255,0.75);">✉ ${p.email}</div>` : ''}
        ${p.phone ? `<div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;font-size:9px;color:rgba(255,255,255,0.75);">📞 ${p.phone}</div>` : ''}
        ${p.location ? `<div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;font-size:9px;color:rgba(255,255,255,0.75);">📍 ${p.location}</div>` : ''}
        ${p.website ? `<div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;font-size:9px;color:rgba(255,255,255,0.75);">🔗 ${p.website}</div>` : ''}
      </div>

      <!-- Skills -->
      ${d.skills.length ? `
      <div style="margin-bottom:20px;">
        <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${c};margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.1);">Skills</div>
        ${d.skills.map(s => `
          <div style="margin-bottom:7px;">
            <div style="font-size:9px;color:rgba(255,255,255,0.85);margin-bottom:3px;">${s.name}</div>
            <div style="height:3px;background:rgba(255,255,255,0.1);border-radius:3px;">
              <div style="height:100%;width:${s.level}%;background:${c};border-radius:3px;"></div>
            </div>
          </div>
        `).join('')}
      </div>` : ''}

      <!-- Languages -->
      ${d.languages.length ? `
      <div style="margin-bottom:20px;">
        <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${c};margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.1);">Languages</div>
        ${d.languages.map(l => `<div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:9px;"><span style="color:rgba(255,255,255,0.85);">${l.name}</span><span style="color:${c};">${l.level}</span></div>`).join('')}
      </div>` : ''}
    </div>

    <!-- MAIN -->
    <div style="flex:1;padding:32px 28px;overflow:hidden;">
      ${p.summary ? `
      <div style="margin-bottom:20px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:4px;margin-bottom:8px;">Profile</div>
        <p style="font-size:10px;line-height:1.65;color:#333;">${p.summary}</p>
      </div>` : ''}

      ${d.experience.length ? `
      <div style="margin-bottom:20px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:4px;margin-bottom:10px;">Experience</div>
        ${d.experience.map(e => `
          <div style="margin-bottom:14px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px;">
              <div style="font-size:11px;font-weight:700;color:#1a1a2e;">${e.title}</div>
              <div style="font-size:9px;color:#888;white-space:nowrap;margin-left:8px;">${e.startDate} – ${e.endDate}</div>
            </div>
            <div style="font-size:10px;font-weight:600;color:${c};margin-bottom:5px;">${e.company}${e.location ? ' · ' + e.location : ''}</div>
            <ul style="padding-left:14px;list-style:disc;">
              ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9.5px;line-height:1.55;color:#444;margin-bottom:3px;">${b}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>` : ''}

      ${d.education.length ? `
      <div style="margin-bottom:20px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:4px;margin-bottom:10px;">Education</div>
        ${d.education.map(e => `
          <div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div style="font-size:11px;font-weight:700;color:#1a1a2e;">${e.degree}</div>
              <div style="font-size:9px;color:#888;">${e.startDate}${e.endDate ? ' – ' + e.endDate : ''}</div>
            </div>
            <div style="font-size:10px;color:#555;">${e.institution}${e.location ? ', ' + e.location : ''}${e.gpa ? ' · GPA: ' + e.gpa : ''}</div>
          </div>
        `).join('')}
      </div>` : ''}

      ${d.certifications.length ? `
      <div style="margin-bottom:20px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:4px;margin-bottom:10px;">Certifications</div>
        ${d.certifications.map(cert => `
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <div>
              <div style="font-size:10px;font-weight:700;color:#1a1a2e;">${cert.name}</div>
              <div style="font-size:9px;color:#666;">${cert.issuer}</div>
            </div>
            <div style="font-size:9px;color:#888;">${cert.date}</div>
          </div>
        `).join('')}
      </div>` : ''}

      ${d.projects.length ? `
      <div style="margin-bottom:20px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:4px;margin-bottom:10px;">Projects</div>
        ${d.projects.map(proj => `
          <div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px;">
              <div style="font-size:10px;font-weight:700;color:#1a1a2e;">${proj.name}</div>
              <div style="font-size:9px;color:${c};">${proj.url}</div>
            </div>
            <p style="font-size:9.5px;line-height:1.55;color:#444;">${proj.description}</p>
            ${proj.technologies ? `<div style="font-size:9px;color:#777;margin-top:3px;">Tech: ${proj.technologies}</div>` : ''}
          </div>
        `).join('')}
      </div>` : ''}
    </div>
  </div>`;
}

function renderCleanTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="padding:48px 56px;font-family:${state.font};">
    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid ${c};padding-bottom:16px;margin-bottom:20px;">
      <div>
        ${p.photo ? `<img src="${p.photo}" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:2px solid ${c};margin-bottom:8px;" />` : ''}
        <div style="font-size:28px;font-weight:800;color:#1a1a2e;letter-spacing:-0.02em;line-height:1.1;">${p.firstName} ${p.lastName}</div>
        <div style="font-size:14px;font-weight:600;color:${c};margin-top:4px;">${p.jobTitle}</div>
      </div>
      <div style="text-align:right;">
        ${p.email ? `<div style="font-size:10px;color:#555;margin-bottom:4px;">${p.email}</div>` : ''}
        ${p.phone ? `<div style="font-size:10px;color:#555;margin-bottom:4px;">${p.phone}</div>` : ''}
        ${p.location ? `<div style="font-size:10px;color:#555;margin-bottom:4px;">${p.location}</div>` : ''}
        ${p.website ? `<div style="font-size:10px;color:${c};margin-bottom:4px;">${p.website}</div>` : ''}
      </div>
    </div>

    ${p.summary ? `
    <div style="margin-bottom:20px;">
      <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};margin-bottom:6px;">Professional Summary</div>
      <p style="font-size:10px;line-height:1.7;color:#333;">${p.summary}</p>
    </div>` : ''}

    <!-- Two Columns -->
    <div style="display:flex;gap:32px;">
      <div style="flex:2;">
        ${d.experience.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:1.5px solid ${c}33;padding-bottom:4px;margin-bottom:10px;">Work Experience</div>
          ${d.experience.map(e => `
            <div style="margin-bottom:14px;">
              <div style="display:flex;justify-content:space-between;align-items:baseline;">
                <div style="font-size:12px;font-weight:700;color:#1a1a2e;">${e.title}</div>
                <div style="font-size:9px;color:#888;">${e.startDate} – ${e.endDate}</div>
              </div>
              <div style="font-size:10px;font-weight:600;color:#555;margin-bottom:5px;">${e.company}${e.location ? ' · ' + e.location : ''}</div>
              <ul style="padding-left:14px;list-style:disc;">
                ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9.5px;line-height:1.55;color:#444;margin-bottom:3px;">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>` : ''}

        ${d.projects.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:1.5px solid ${c}33;padding-bottom:4px;margin-bottom:10px;">Projects</div>
          ${d.projects.map(proj => `
            <div style="margin-bottom:10px;">
              <div style="font-size:11px;font-weight:700;color:#1a1a2e;">${proj.name} <span style="font-size:9px;color:${c};">${proj.url}</span></div>
              <p style="font-size:9.5px;line-height:1.55;color:#444;margin-top:3px;">${proj.description}</p>
            </div>
          `).join('')}
        </div>` : ''}
      </div>

      <div style="flex:1;">
        ${d.education.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:1.5px solid ${c}33;padding-bottom:4px;margin-bottom:10px;">Education</div>
          ${d.education.map(e => `
            <div style="margin-bottom:10px;">
              <div style="font-size:11px;font-weight:700;color:#1a1a2e;">${e.degree}</div>
              <div style="font-size:9px;color:#555;">${e.institution}</div>
              <div style="font-size:9px;color:#888;">${e.startDate}${e.endDate ? ' – ' + e.endDate : ''}${e.gpa ? ' · GPA: ' + e.gpa : ''}</div>
            </div>
          `).join('')}
        </div>` : ''}

        ${d.skills.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:1.5px solid ${c}33;padding-bottom:4px;margin-bottom:10px;">Skills</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;">
            ${d.skills.map(s => `<span style="padding:3px 10px;background:${c}15;color:${c};border-radius:100px;font-size:9.5px;font-weight:600;border:1px solid ${c}30;">${s.name}</span>`).join('')}
          </div>
        </div>` : ''}

        ${d.languages.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:1.5px solid ${c}33;padding-bottom:4px;margin-bottom:10px;">Languages</div>
          ${d.languages.map(l => `<div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:5px;"><span style="font-weight:600;">${l.name}</span><span style="color:#888;">${l.level}</span></div>`).join('')}
        </div>` : ''}

        ${d.certifications.length ? `
        <div>
          <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:1.5px solid ${c}33;padding-bottom:4px;margin-bottom:10px;">Certifications</div>
          ${d.certifications.map(cert => `<div style="font-size:9.5px;margin-bottom:5px;"><div style="font-weight:700;">${cert.name}</div><div style="color:#888;">${cert.issuer} · ${cert.date}</div></div>`).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

function renderMinimalTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="padding:40px 52px;font-family:${state.font};">
    <div style="margin-bottom:24px;">
      <div style="font-size:30px;font-weight:700;color:#111;letter-spacing:-0.02em;">${p.firstName} ${p.lastName}</div>
      <div style="font-size:14px;color:#666;margin-bottom:10px;">${p.jobTitle}</div>
      <div style="display:flex;flex-wrap:wrap;gap:16px;">
        ${p.email ? `<span style="font-size:10px;color:#777;">${p.email}</span>` : ''}
        ${p.phone ? `<span style="font-size:10px;color:#777;">${p.phone}</span>` : ''}
        ${p.location ? `<span style="font-size:10px;color:#777;">${p.location}</span>` : ''}
        ${p.website ? `<span style="font-size:10px;color:${c};">${p.website}</span>` : ''}
      </div>
    </div>
    <div style="height:1px;background:#e5e5e5;margin-bottom:20px;"></div>

    ${p.summary ? `
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#111;margin-bottom:8px;">About</div>
      <p style="font-size:10px;line-height:1.7;color:#444;">${p.summary}</p>
    </div>` : ''}

    ${d.experience.length ? `
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#111;margin-bottom:10px;">Experience</div>
      ${d.experience.map(e => `
        <div style="margin-bottom:16px;display:flex;gap:16px;">
          <div style="width:90px;flex-shrink:0;text-align:right;">
            <div style="font-size:9px;color:#888;">${e.startDate}</div>
            <div style="font-size:9px;color:#888;">→ ${e.endDate}</div>
          </div>
          <div style="flex:1;border-left:2px solid ${c};padding-left:14px;">
            <div style="font-size:11px;font-weight:700;color:#1a1a2e;">${e.title}</div>
            <div style="font-size:10px;color:#555;margin-bottom:5px;">${e.company}${e.location ? ', ' + e.location : ''}</div>
            <ul style="padding-left:12px;list-style:disc;">
              ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9.5px;line-height:1.55;color:#444;margin-bottom:3px;">${b}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>` : ''}

    <div style="display:flex;gap:40px;">
      ${d.education.length ? `
      <div style="flex:1;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#111;margin-bottom:10px;">Education</div>
        ${d.education.map(e => `
          <div style="margin-bottom:10px;">
            <div style="font-size:10px;font-weight:700;color:#1a1a2e;">${e.degree}</div>
            <div style="font-size:9px;color:#555;">${e.institution}</div>
            <div style="font-size:9px;color:#888;">${e.startDate}${e.endDate ? ' – ' + e.endDate : ''}</div>
          </div>
        `).join('')}
      </div>` : ''}

      ${d.skills.length ? `
      <div style="flex:1;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#111;margin-bottom:10px;">Skills</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${d.skills.map(s => `<span style="padding:3px 10px;background:#f5f5f5;color:#444;border-radius:4px;font-size:9.5px;font-weight:500;">${s.name}</span>`).join('')}
        </div>
      </div>` : ''}
    </div>
  </div>`;
}

function renderExecutiveTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="font-family:${state.font};">
    <div style="background:#0f3460;padding:32px 48px;color:white;display:flex;justify-content:space-between;align-items:center;">
      <div>
        ${p.photo ? `<img src="${p.photo}" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid ${c};float:left;margin-right:16px;"/>` : ''}
        <div style="font-size:26px;font-weight:800;letter-spacing:-0.02em;">${p.firstName} ${p.lastName}</div>
        <div style="font-size:13px;color:${c};font-weight:600;margin-top:4px;text-transform:uppercase;letter-spacing:0.06em;">${p.jobTitle}</div>
      </div>
      <div style="text-align:right;">
        ${p.email ? `<div style="font-size:10px;opacity:0.8;margin-bottom:4px;">${p.email}</div>` : ''}
        ${p.phone ? `<div style="font-size:10px;opacity:0.8;margin-bottom:4px;">${p.phone}</div>` : ''}
        ${p.location ? `<div style="font-size:10px;opacity:0.8;margin-bottom:4px;">${p.location}</div>` : ''}
        ${p.website ? `<div style="font-size:10px;color:${c};">${p.website}</div>` : ''}
      </div>
    </div>
    <div style="padding:28px 48px;">
      ${p.summary ? `
      <div style="background:#f8f9fc;border-left:4px solid ${c};padding:14px 18px;border-radius:0 8px 8px 0;margin-bottom:20px;">
        <p style="font-size:10px;line-height:1.7;color:#333;font-style:italic;">${p.summary}</p>
      </div>` : ''}

      <div style="display:flex;gap:32px;">
        <div style="flex:2;">
          ${d.experience.length ? `
          <div style="margin-bottom:18px;">
            <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:4px;margin-bottom:10px;">Professional Experience</div>
            ${d.experience.map(e => `
              <div style="margin-bottom:14px;">
                <div style="display:flex;justify-content:space-between;align-items:baseline;">
                  <div style="font-size:12px;font-weight:700;color:#1a1a2e;">${e.title}</div>
                  <div style="font-size:9px;color:#888;">${e.startDate} – ${e.endDate}</div>
                </div>
                <div style="font-size:10px;color:${c};font-weight:600;margin-bottom:5px;">${e.company}${e.location ? ' | ' + e.location : ''}</div>
                <ul style="padding-left:14px;list-style:disc;">
                  ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9.5px;line-height:1.55;color:#444;margin-bottom:3px;">${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>` : ''}
        </div>

        <div style="flex:1;">
          ${d.education.length ? `
          <div style="margin-bottom:18px;">
            <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:4px;margin-bottom:10px;">Education</div>
            ${d.education.map(e => `
              <div style="margin-bottom:8px;">
                <div style="font-size:10px;font-weight:700;color:#1a1a2e;">${e.degree}</div>
                <div style="font-size:9px;color:#555;">${e.institution}</div>
                <div style="font-size:9px;color:#888;">${e.startDate}${e.endDate ? ' – ' + e.endDate : ''}</div>
              </div>
            `).join('')}
          </div>` : ''}
          ${d.skills.length ? `
          <div>
            <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:4px;margin-bottom:10px;">Core Competencies</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;">
              ${d.skills.map(s => `<span style="padding:3px 9px;background:${c}15;color:${c};border-radius:4px;font-size:9px;font-weight:600;">${s.name}</span>`).join('')}
            </div>
          </div>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

function renderTechTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="font-family:'Courier New', monospace;background:#0f172a;color:#e2e8f0;min-height:100%;">
    <div style="padding:32px 36px;">
      <div style="border-bottom:1px solid ${c}40;padding-bottom:16px;margin-bottom:20px;">
        <div style="font-size:8px;color:${c};margin-bottom:4px;opacity:0.7;">// resume.js | ${new Date().getFullYear()}</div>
        <div style="font-size:24px;font-weight:800;color:${c};font-family:'Courier New', monospace;">${p.firstName}_${p.lastName}</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">${p.jobTitle}</div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;">
          ${p.email ? `<span style="font-size:9px;color:#64748b;">${p.email}</span>` : ''}
          ${p.phone ? `<span style="font-size:9px;color:#64748b;">${p.phone}</span>` : ''}
          ${p.location ? `<span style="font-size:9px;color:#64748b;">${p.location}</span>` : ''}
          ${p.website ? `<span style="font-size:9px;color:${c};">${p.website}</span>` : ''}
        </div>
      </div>

      ${p.summary ? `
      <div style="margin-bottom:18px;">
        <div style="font-size:8px;color:${c};font-weight:700;margin-bottom:6px;">/* ABOUT */</div>
        <p style="font-size:9.5px;line-height:1.7;color:#94a3b8;">${p.summary}</p>
      </div>` : ''}

      <div style="display:flex;gap:24px;">
        <div style="flex:2;">
          ${d.experience.length ? `
          <div style="margin-bottom:18px;">
            <div style="font-size:8px;color:${c};font-weight:700;margin-bottom:8px;">/* EXPERIENCE */</div>
            ${d.experience.map(e => `
              <div style="margin-bottom:14px;border-left:2px solid ${c}40;padding-left:12px;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px;">
                  <div style="font-size:11px;font-weight:700;color:#e2e8f0;">${e.title}</div>
                  <div style="font-size:8px;color:#64748b;">${e.startDate} → ${e.endDate}</div>
                </div>
                <div style="font-size:9px;color:${c};margin-bottom:5px;">${e.company}</div>
                ${e.bullets.filter(b => b.trim()).map(b => `<div style="font-size:9px;color:#94a3b8;margin-bottom:3px;"><span style="color:${c};">></span> ${b}</div>`).join('')}
              </div>
            `).join('')}
          </div>` : ''}
        </div>
        <div style="flex:1;">
          ${d.skills.length ? `
          <div style="margin-bottom:18px;">
            <div style="font-size:8px;color:${c};font-weight:700;margin-bottom:8px;">/* STACK */</div>
            ${d.skills.map(s => `
              <div style="margin-bottom:5px;">
                <div style="display:flex;justify-content:space-between;font-size:9px;margin-bottom:2px;"><span style="color:#e2e8f0;">${s.name}</span><span style="color:${c};">${s.level}%</span></div>
                <div style="height:2px;background:#1e293b;border-radius:2px;"><div style="height:100%;width:${s.level}%;background:${c};border-radius:2px;"></div></div>
              </div>
            `).join('')}
          </div>` : ''}
          ${d.education.length ? `
          <div>
            <div style="font-size:8px;color:${c};font-weight:700;margin-bottom:8px;">/* EDUCATION */</div>
            ${d.education.map(e => `
              <div style="margin-bottom:8px;">
                <div style="font-size:10px;font-weight:700;color:#e2e8f0;">${e.degree}</div>
                <div style="font-size:9px;color:#64748b;">${e.institution}</div>
                <div style="font-size:8px;color:#475569;">${e.startDate}${e.endDate ? ' – ' + e.endDate : ''}</div>
              </div>
            `).join('')}
          </div>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

function renderElegantTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="font-family:Georgia, serif;padding:48px 52px;background:white;">
    <div style="text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #ddd;">
      ${p.photo ? `<img src="${p.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:2px solid ${c};margin-bottom:8px;" />` : ''}
      <div style="font-size:30px;font-weight:400;letter-spacing:0.06em;text-transform:uppercase;color:#111;line-height:1.1;">${p.firstName} ${p.lastName}</div>
      <div style="width:40px;height:2px;background:${c};margin:8px auto;"></div>
      <div style="font-size:12px;color:#888;letter-spacing:0.12em;text-transform:uppercase;">${p.jobTitle}</div>
      <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:20px;margin-top:8px;">
        ${p.email ? `<span style="font-size:10px;color:#777;">${p.email}</span>` : ''}
        ${p.phone ? `<span style="font-size:10px;color:#777;">${p.phone}</span>` : ''}
        ${p.location ? `<span style="font-size:10px;color:#777;">${p.location}</span>` : ''}
        ${p.website ? `<span style="font-size:10px;color:${c};">${p.website}</span>` : ''}
      </div>
    </div>

    ${p.summary ? `
    <div style="margin-bottom:20px;text-align:center;">
      <p style="font-size:10px;line-height:1.8;color:#444;font-style:italic;max-width:480px;margin:0 auto;">"${p.summary}"</p>
    </div>` : ''}

    <div style="display:flex;gap:36px;">
      <div style="flex:2;">
        ${d.experience.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:9px;font-weight:400;text-transform:uppercase;letter-spacing:0.15em;color:#111;border-bottom:1px solid ${c};padding-bottom:4px;margin-bottom:10px;">Experience</div>
          ${d.experience.map(e => `
            <div style="margin-bottom:14px;">
              <div style="display:flex;justify-content:space-between;">
                <div style="font-size:11px;font-weight:700;font-family:${state.font};color:#1a1a2e;">${e.title}</div>
                <div style="font-size:9px;color:#888;font-style:italic;">${e.startDate} – ${e.endDate}</div>
              </div>
              <div style="font-size:10px;color:${c};margin-bottom:5px;">${e.company}${e.location ? ' · ' + e.location : ''}</div>
              <ul style="padding-left:14px;list-style:disc;">
                ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9.5px;line-height:1.6;color:#444;margin-bottom:3px;">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>` : ''}
      </div>

      <div style="flex:1;">
        ${d.education.length ? `
        <div style="margin-bottom:16px;">
          <div style="font-size:9px;font-weight:400;text-transform:uppercase;letter-spacing:0.15em;color:#111;border-bottom:1px solid ${c};padding-bottom:4px;margin-bottom:10px;">Education</div>
          ${d.education.map(e => `
            <div style="margin-bottom:8px;">
              <div style="font-size:10px;font-weight:700;font-family:${state.font};">${e.degree}</div>
              <div style="font-size:9px;color:#555;">${e.institution}</div>
              <div style="font-size:8px;color:#888;font-style:italic;">${e.startDate}${e.endDate ? ' – ' + e.endDate : ''}</div>
            </div>
          `).join('')}
        </div>` : ''}

        ${d.skills.length ? `
        <div style="margin-bottom:16px;">
          <div style="font-size:9px;font-weight:400;text-transform:uppercase;letter-spacing:0.15em;color:#111;border-bottom:1px solid ${c};padding-bottom:4px;margin-bottom:10px;">Expertise</div>
          ${d.skills.map(s => `<div style="font-size:9.5px;color:#444;margin-bottom:4px;padding-left:8px;border-left:2px solid ${c}40;">• ${s.name}</div>`).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

// ===================== COMMON SECTIONS HELPER =====================
function renderCommonSections(d, c, isDark = false) {
  let html = '';
  const textColor = isDark ? '#f0f6fc' : '#0f172a';
  const subColor = isDark ? '#8b949e' : '#64748b';
  const borderCol = isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0';

  // Awards
  if (d.awards && d.awards.length) {
    html += `
      <div style="margin-bottom:18px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:3px;margin-bottom:8px;">Awards & Honors</div>
        ${d.awards.map(a => `
          <div style="margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <div style="font-size:10.5px;font-weight:700;color:${textColor};">${a.title}</div>
              <div style="font-size:9px;color:${subColor};">${a.date || ''}</div>
            </div>
            ${a.issuer ? `<div style="font-size:9.5px;color:${c};font-weight:600;">${a.issuer}</div>` : ''}
            ${a.description ? `<p style="font-size:9px;color:${subColor};margin-top:2px;">${a.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Volunteering
  if (d.volunteer && d.volunteer.length) {
    html += `
      <div style="margin-bottom:18px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:3px;margin-bottom:8px;">Volunteering & Leadership</div>
        ${d.volunteer.map(v => `
          <div style="margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <div style="font-size:10.5px;font-weight:700;color:${textColor};">${v.role}</div>
              <div style="font-size:9px;color:${subColor};">${v.startDate || ''}${v.endDate ? ' – ' + v.endDate : ''}</div>
            </div>
            <div style="font-size:9.5px;color:${c};font-weight:600;">${v.organization}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Publications
  if (d.publications && d.publications.length) {
    html += `
      <div style="margin-bottom:18px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:3px;margin-bottom:8px;">Publications & Research</div>
        ${d.publications.map(p => `
          <div style="margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <div style="font-size:10.5px;font-weight:700;color:${textColor};">${p.title}</div>
              <div style="font-size:9px;color:${subColor};">${p.date || ''}</div>
            </div>
            <div style="font-size:9.5px;color:${subColor};">${p.publisher || ''} ${p.url ? `· <span style="color:${c};">${p.url}</span>` : ''}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Hobbies / Passions
  if (d.hobbies && d.hobbies.length) {
    html += `
      <div style="margin-bottom:18px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:3px;margin-bottom:8px;">Hobbies & Passions</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${d.hobbies.map(h => `
            <div style="padding:4px 8px;border-radius:4px;background:${isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'};border:1px solid ${borderCol};font-size:9px;color:${textColor};">
              ${h.name} ${h.description ? `<span style="color:${subColor};">(${h.description})</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // References
  if (d.references && d.references.length) {
    html += `
      <div style="margin-bottom:18px;">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${c};border-bottom:2px solid ${c};padding-bottom:3px;margin-bottom:8px;">References</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          ${d.references.map(r => `
            <div style="padding:6px;border-left:2px solid ${c};background:${isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc'};">
              <div style="font-size:10px;font-weight:700;color:${textColor};">${r.name}</div>
              <div style="font-size:9px;color:${c};">${r.role} · ${r.company}</div>
              ${r.contact ? `<div style="font-size:8.5px;color:${subColor};margin-top:2px;">${r.contact}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return html;
}

// ===================== NEW TEMPLATE RENDERERS =====================

function renderTimelineTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="padding:36px;height:100%;box-sizing:border-box;background:#ffffff;color:#1e293b;">
    <!-- HEADER -->
    <div style="border-bottom:2px solid ${c};padding-bottom:16px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:flex-end;">
      <div>
        <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.02em;color:#0f172a;margin-bottom:4px;">${p.firstName} ${p.lastName}</h1>
        <div style="font-size:12px;font-weight:700;color:${c};text-transform:uppercase;letter-spacing:0.06em;">${p.jobTitle}</div>
      </div>
      <div style="text-align:right;font-size:9.5px;color:#64748b;line-height:1.6;">
        ${p.email ? `<div>✉ ${p.email}</div>` : ''}
        ${p.phone ? `<div>📞 ${p.phone}</div>` : ''}
        ${p.location ? `<div>📍 ${p.location}</div>` : ''}
        ${p.website ? `<div>🔗 ${p.website}</div>` : ''}
      </div>
    </div>

    ${p.summary ? `
    <div style="margin-bottom:20px;background:#f8fafc;border-left:3px solid ${c};padding:10px 14px;border-radius:0 6px 6px 0;">
      <p style="font-size:10px;line-height:1.6;color:#334155;margin:0;">${p.summary}</p>
    </div>` : ''}

    <div style="display:grid;grid-template-columns:1.7fr 1fr;gap:24px;">
      <!-- LEFT: TIMELINE OF EXPERIENCE & EDUCATION -->
      <div>
        ${d.experience.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:12px;display:flex;align-items:center;gap:6px;">
            <span>💼</span> Experience Timeline
          </div>
          <div style="border-left:2px solid #e2e8f0;margin-left:6px;padding-left:14px;position:relative;">
            ${d.experience.map(e => `
              <div style="position:relative;margin-bottom:16px;">
                <div style="position:absolute;left:-20px;top:2px;width:10px;height:10px;border-radius:50%;background:${c};border:2px solid white;box-shadow:0 0 0 1px ${c};"></div>
                <div style="display:flex;justify-content:space-between;align-items:baseline;">
                  <div style="font-size:11px;font-weight:700;color:#0f172a;">${e.title}</div>
                  <span style="font-size:8.5px;font-weight:600;background:#f1f5f9;color:#475569;padding:2px 6px;border-radius:4px;">${e.startDate} – ${e.endDate}</span>
                </div>
                <div style="font-size:9.5px;font-weight:600;color:${c};margin-bottom:4px;">${e.company}${e.location ? ' · ' + e.location : ''}</div>
                <ul style="padding-left:14px;list-style:disc;margin:0;">
                  ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9.5px;line-height:1.55;color:#475569;margin-bottom:2px;">${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>` : ''}

        ${d.education.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:12px;display:flex;align-items:center;gap:6px;">
            <span>🎓</span> Education Milestones
          </div>
          <div style="border-left:2px solid #e2e8f0;margin-left:6px;padding-left:14px;position:relative;">
            ${d.education.map(edu => `
              <div style="position:relative;margin-bottom:12px;">
                <div style="position:absolute;left:-20px;top:2px;width:10px;height:10px;border-radius:50%;background:#0ea5e9;border:2px solid white;box-shadow:0 0 0 1px #0ea5e9;"></div>
                <div style="font-size:11px;font-weight:700;color:#0f172a;">${edu.degree}</div>
                <div style="font-size:9.5px;color:#475569;">${edu.institution} · ${edu.startDate}${edu.endDate ? ' - ' + edu.endDate : ''}</div>
                ${edu.gpa ? `<div style="font-size:9px;color:${c};">GPA: ${edu.gpa}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>` : ''}

        ${renderCommonSections(d, c, false)}
      </div>

      <!-- RIGHT SIDEBAR: SKILLS, CERTS, PROJECTS -->
      <div>
        ${d.skills.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;padding-bottom:4px;border-bottom:1px solid #e2e8f0;">Key Skills</div>
          ${d.skills.map(s => `
            <div style="margin-bottom:8px;">
              <div style="display:flex;justify-content:space-between;font-size:9px;font-weight:600;color:#334155;margin-bottom:3px;">
                <span>${s.name}</span>
                <span style="color:${c};">${s.level}%</span>
              </div>
              <div style="height:4px;background:#e2e8f0;border-radius:2px;overflow:hidden;">
                <div style="height:100%;width:${s.level}%;background:${c};border-radius:2px;"></div>
              </div>
            </div>
          `).join('')}
        </div>` : ''}

        ${d.certifications.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;padding-bottom:4px;border-bottom:1px solid #e2e8f0;">Certifications</div>
          ${d.certifications.map(cert => `
            <div style="margin-bottom:8px;padding:6px 8px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;">
              <div style="font-size:10px;font-weight:700;color:#0f172a;">${cert.name}</div>
              <div style="font-size:9px;color:#64748b;">${cert.issuer} ${cert.date ? '· ' + cert.date : ''}</div>
            </div>
          `).join('')}
        </div>` : ''}

        ${d.languages.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;padding-bottom:4px;border-bottom:1px solid #e2e8f0;">Languages</div>
          ${d.languages.map(l => `
            <div style="display:flex;justify-content:space-between;font-size:9.5px;margin-bottom:5px;">
              <span style="color:#334155;font-weight:600;">${l.name}</span>
              <span style="color:${c};">${l.level}</span>
            </div>
          `).join('')}
        </div>` : ''}

        ${d.projects.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;padding-bottom:4px;border-bottom:1px solid #e2e8f0;">Projects</div>
          ${d.projects.map(pr => `
            <div style="margin-bottom:10px;">
              <div style="font-size:10px;font-weight:700;color:#0f172a;">${pr.name}</div>
              <p style="font-size:9px;line-height:1.45;color:#475569;margin:2px 0;">${pr.description}</p>
              ${pr.technologies ? `<div style="font-size:8.5px;color:${c};font-weight:600;">${pr.technologies}</div>` : ''}
            </div>
          `).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

function renderCompactTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="padding:28px 32px;height:100%;box-sizing:border-box;background:#ffffff;color:#1e293b;font-size:9.5px;">
    <!-- COMPACT HEADER -->
    <div style="text-align:center;border-bottom:2px solid #0f172a;padding-bottom:10px;margin-bottom:12px;">
      <h1 style="font-size:20px;font-weight:800;color:#0f172a;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:2px;">${p.firstName} ${p.lastName}</h1>
      <div style="font-size:11px;font-weight:700;color:${c};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">${p.jobTitle}</div>
      <div style="font-size:9px;color:#475569;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
        ${p.email ? `<span>✉ ${p.email}</span>` : ''}
        ${p.phone ? `<span>📞 ${p.phone}</span>` : ''}
        ${p.location ? `<span>📍 ${p.location}</span>` : ''}
        ${p.website ? `<span>🔗 ${p.website}</span>` : ''}
      </div>
    </div>

    ${p.summary ? `
    <div style="margin-bottom:12px;">
      <p style="font-size:9.5px;line-height:1.55;color:#334155;margin:0;text-align:justify;">${p.summary}</p>
    </div>` : ''}

    ${d.experience.length ? `
    <div style="margin-bottom:12px;">
      <div style="font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#0f172a;border-bottom:1px solid #cbd5e1;padding-bottom:2px;margin-bottom:6px;">Professional Experience</div>
      ${d.experience.map(e => `
        <div style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <div>
              <span style="font-size:10px;font-weight:700;color:#0f172a;">${e.title}</span>
              <span style="color:${c};font-weight:600;"> · ${e.company}${e.location ? ', ' + e.location : ''}</span>
            </div>
            <span style="font-size:8.5px;color:#64748b;">${e.startDate} – ${e.endDate}</span>
          </div>
          <ul style="padding-left:14px;list-style:disc;margin:2px 0 0;">
            ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9px;line-height:1.5;color:#334155;">${b}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>` : ''}

    ${d.education.length ? `
    <div style="margin-bottom:12px;">
      <div style="font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#0f172a;border-bottom:1px solid #cbd5e1;padding-bottom:2px;margin-bottom:6px;">Education</div>
      ${d.education.map(edu => `
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <div>
            <span style="font-weight:700;color:#0f172a;">${edu.degree}</span> — <span style="color:#475569;">${edu.institution}${edu.location ? ', ' + edu.location : ''}</span>
            ${edu.gpa ? `<span style="color:${c};"> (GPA: ${edu.gpa})</span>` : ''}
          </div>
          <span style="font-size:8.5px;color:#64748b;">${edu.startDate}${edu.endDate ? ' – ' + edu.endDate : ''}</span>
        </div>
      `).join('')}
    </div>` : ''}

    ${d.skills.length ? `
    <div style="margin-bottom:12px;">
      <div style="font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#0f172a;border-bottom:1px solid #cbd5e1;padding-bottom:2px;margin-bottom:6px;">Core Competencies & Skills</div>
      <div style="font-size:9px;line-height:1.5;color:#334155;">
        ${d.skills.map(s => `<span style="display:inline-block;background:#f1f5f9;padding:2px 6px;border-radius:3px;margin:2px 4px 2px 0;border:1px solid #e2e8f0;font-weight:600;">${s.name}</span>`).join('')}
      </div>
    </div>` : ''}

    ${d.projects.length ? `
    <div style="margin-bottom:12px;">
      <div style="font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#0f172a;border-bottom:1px solid #cbd5e1;padding-bottom:2px;margin-bottom:6px;">Key Projects</div>
      ${d.projects.map(pr => `
        <div style="margin-bottom:6px;">
          <span style="font-weight:700;color:#0f172a;">${pr.name}:</span>
          <span style="color:#475569;"> ${pr.description}</span>
          ${pr.technologies ? `<span style="color:${c};font-weight:600;"> [${pr.technologies}]</span>` : ''}
        </div>
      `).join('')}
    </div>` : ''}

    ${renderCommonSections(d, c, false)}
  </div>`;
}

function renderStartupTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="height:100%;background:#ffffff;color:#0f172a;display:flex;flex-direction:column;">
    <!-- TOP ACCENT BANNER -->
    <div style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:white;padding:28px 32px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:0;right:0;width:160px;height:100%;background:${c};opacity:0.2;transform:skewX(-20deg) translateX(40px);"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1;">
        <div>
          <h1 style="font-size:24px;font-weight:800;margin-bottom:4px;letter-spacing:-0.02em;">${p.firstName} <span style="color:${c};">${p.lastName}</span></h1>
          <div style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">${p.jobTitle}</div>
        </div>
        <div style="text-align:right;font-size:9.5px;color:#cbd5e1;line-height:1.6;">
          ${p.email ? `<div>✉ ${p.email}</div>` : ''}
          ${p.phone ? `<div>📞 ${p.phone}</div>` : ''}
          ${p.location ? `<div>📍 ${p.location}</div>` : ''}
          ${p.website ? `<div>🔗 ${p.website}</div>` : ''}
        </div>
      </div>
    </div>

    <!-- BODY -->
    <div style="padding:28px 32px;flex:1;">
      ${p.summary ? `
      <div style="margin-bottom:20px;padding:12px 16px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
        <p style="font-size:10px;line-height:1.65;color:#334155;margin:0;">${p.summary}</p>
      </div>` : ''}

      <div style="display:grid;grid-template-columns:1.8fr 1fr;gap:24px;">
        <!-- MAIN COLUMN -->
        <div>
          ${d.experience.length ? `
          <div style="margin-bottom:20px;">
            <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:12px;">Experience & Impact</div>
            ${d.experience.map(e => `
              <div style="margin-bottom:16px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                  <div style="font-size:11px;font-weight:700;color:#0f172a;">${e.title}</div>
                  <span style="font-size:8.5px;color:#64748b;font-weight:600;background:#f1f5f9;padding:2px 6px;border-radius:4px;">${e.startDate} – ${e.endDate}</span>
                </div>
                <div style="font-size:10px;font-weight:700;color:${c};margin-bottom:6px;">${e.company}${e.location ? ' · ' + e.location : ''}</div>
                <ul style="padding-left:14px;list-style:disc;margin:0;">
                  ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9.5px;line-height:1.55;color:#475569;margin-bottom:2px;">${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>` : ''}

          ${renderCommonSections(d, c, false)}
        </div>

        <!-- SIDE COLUMN -->
        <div>
          ${d.skills.length ? `
          <div style="margin-bottom:20px;">
            <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;">Tech Stack</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${d.skills.map(s => `
                <div style="padding:4px 8px;border-radius:6px;background:#f1f5f9;border:1px solid #cbd5e1;font-size:9px;font-weight:700;color:#1e293b;">
                  ${s.name}
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          ${d.education.length ? `
          <div style="margin-bottom:20px;">
            <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;">Education</div>
            ${d.education.map(edu => `
              <div style="margin-bottom:8px;padding:8px;background:#f8fafc;border-radius:6px;">
                <div style="font-size:10px;font-weight:700;color:#0f172a;">${edu.degree}</div>
                <div style="font-size:9px;color:#64748b;">${edu.institution}</div>
                <div style="font-size:8.5px;color:${c};margin-top:2px;">${edu.startDate}${edu.endDate ? ' - ' + edu.endDate : ''}</div>
              </div>
            `).join('')}
          </div>` : ''}

          ${d.projects.length ? `
          <div style="margin-bottom:20px;">
            <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;">Side Projects</div>
            ${d.projects.map(pr => `
              <div style="margin-bottom:10px;padding:8px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;">
                <div style="font-size:10px;font-weight:700;color:#0f172a;">${pr.name}</div>
                <p style="font-size:9px;color:#475569;margin:2px 0;">${pr.description}</p>
                ${pr.technologies ? `<div style="font-size:8.5px;color:${c};font-weight:600;">${pr.technologies}</div>` : ''}
              </div>
            `).join('')}
          </div>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

function renderDarkProTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="padding:32px;height:100%;box-sizing:border-box;background:#0d1117;color:#e6edf3;font-family:'Fira Code', monospace, sans-serif;">
    <div style="border-bottom:1px solid #30363d;padding-bottom:18px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:flex-end;">
      <div>
        <div style="color:${c};font-size:10px;margin-bottom:4px;">const candidate = {</div>
        <h1 style="font-size:22px;font-weight:800;color:#f0f6fc;margin-left:12px;">${p.firstName} ${p.lastName}</h1>
        <div style="font-size:11px;color:${c};margin-left:12px;font-weight:600;">role: "${p.jobTitle}"</div>
      </div>
      <div style="font-size:9px;color:#8b949e;line-height:1.6;text-align:right;">
        ${p.email ? `<div>"${p.email}"</div>` : ''}
        ${p.phone ? `<div>"${p.phone}"</div>` : ''}
        ${p.location ? `<div>"${p.location}"</div>` : ''}
        ${p.website ? `<div style="color:${c};">"${p.website}"</div>` : ''}
      </div>
    </div>

    ${p.summary ? `
    <div style="margin-bottom:18px;background:#161b22;border:1px solid #30363d;border-radius:6px;padding:12px;">
      <div style="font-size:8.5px;color:#8b949e;margin-bottom:4px;">// summary</div>
      <p style="font-size:9.5px;line-height:1.6;color:#c9d1d9;margin:0;">${p.summary}</p>
    </div>` : ''}

    <div style="display:grid;grid-template-columns:1.8fr 1fr;gap:20px;">
      <div>
        ${d.experience.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:10px;font-weight:700;color:${c};margin-bottom:10px;">// experience.log</div>
          ${d.experience.map(e => `
            <div style="margin-bottom:14px;background:#161b22;border-left:2px solid ${c};padding:10px 12px;border-radius:0 6px 6px 0;">
              <div style="display:flex;justify-content:space-between;font-size:10.5px;font-weight:700;color:#f0f6fc;">
                <span>${e.title}</span>
                <span style="font-size:8.5px;color:#8b949e;">${e.startDate} - ${e.endDate}</span>
              </div>
              <div style="font-size:9.5px;color:${c};margin-bottom:4px;">@ ${e.company}${e.location ? ' (' + e.location + ')' : ''}</div>
              <ul style="padding-left:14px;list-style:disc;margin:0;">
                ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9px;line-height:1.5;color:#8b949e;">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>` : ''}

        ${renderCommonSections(d, c, true)}
      </div>

      <div>
        ${d.skills.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:10px;font-weight:700;color:${c};margin-bottom:8px;">// skills.stack</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;">
            ${d.skills.map(s => `<span style="background:#21262d;border:1px solid #30363d;padding:2px 6px;border-radius:4px;font-size:8.5px;color:#f0f6fc;">${s.name}</span>`).join('')}
          </div>
        </div>` : ''}

        ${d.education.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:10px;font-weight:700;color:${c};margin-bottom:8px;">// education</div>
          ${d.education.map(edu => `
            <div style="margin-bottom:8px;background:#161b22;padding:8px;border-radius:4px;">
              <div style="font-size:10px;font-weight:700;color:#f0f6fc;">${edu.degree}</div>
              <div style="font-size:9px;color:#8b949e;">${edu.institution}</div>
              ${edu.gpa ? `<div style="font-size:8.5px;color:${c};">GPA: ${edu.gpa}</div>` : ''}
            </div>
          `).join('')}
        </div>` : ''}

        ${d.projects.length ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:10px;font-weight:700;color:${c};margin-bottom:8px;">// projects.repos</div>
          ${d.projects.map(pr => `
            <div style="margin-bottom:8px;background:#161b22;padding:8px;border-radius:4px;border:1px solid #30363d;">
              <div style="font-size:9.5px;font-weight:700;color:${c};">${pr.name}</div>
              <p style="font-size:8.5px;color:#8b949e;margin:2px 0;">${pr.description}</p>
              ${pr.technologies ? `<div style="font-size:8px;color:#58a6ff;">[${pr.technologies}]</div>` : ''}
            </div>
          `).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

function renderAcademicTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="padding:40px 48px;height:100%;box-sizing:border-box;background:#ffffff;color:#111827;font-family:'Georgia', serif;">
    <div style="text-align:center;border-bottom:1.5px solid #111827;padding-bottom:14px;margin-bottom:18px;">
      <h1 style="font-size:22px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:4px;">${p.firstName} ${p.lastName}</h1>
      <div style="font-size:11px;font-style:italic;color:#4b5563;margin-bottom:6px;">${p.jobTitle}</div>
      <div style="font-size:9px;color:#4b5563;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;font-family:sans-serif;">
        ${p.email ? `<span>${p.email}</span>` : ''}
        ${p.phone ? `<span>${p.phone}</span>` : ''}
        ${p.location ? `<span>${p.location}</span>` : ''}
        ${p.website ? `<span>${p.website}</span>` : ''}
      </div>
    </div>

    ${p.summary ? `
    <div style="margin-bottom:16px;">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:2px;margin-bottom:6px;font-family:sans-serif;">Curriculum Summary</div>
      <p style="font-size:9.5px;line-height:1.65;color:#374151;margin:0;text-align:justify;">${p.summary}</p>
    </div>` : ''}

    ${d.education.length ? `
    <div style="margin-bottom:16px;">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:2px;margin-bottom:8px;font-family:sans-serif;">Education & Academic Background</div>
      ${d.education.map(edu => `
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <div>
            <div style="font-size:10.5px;font-weight:700;color:#111827;">${edu.degree}</div>
            <div style="font-size:9.5px;color:#4b5563;font-style:italic;">${edu.institution}${edu.location ? ', ' + edu.location : ''}${edu.gpa ? ' · GPA: ' + edu.gpa : ''}</div>
          </div>
          <span style="font-size:9px;color:#6b7280;font-family:sans-serif;">${edu.startDate}${edu.endDate ? ' – ' + edu.endDate : ''}</span>
        </div>
      `).join('')}
    </div>` : ''}

    ${d.experience.length ? `
    <div style="margin-bottom:16px;">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#111827;border-bottom:1px solid #e5e7eb;padding-bottom:2px;margin-bottom:8px;font-family:sans-serif;">Professional & Teaching Experience</div>
      ${d.experience.map(e => `
        <div style="margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <span style="font-size:10.5px;font-weight:700;color:#111827;">${e.title}</span>
            <span style="font-size:9px;color:#6b7280;font-family:sans-serif;">${e.startDate} – ${e.endDate}</span>
          </div>
          <div style="font-size:9.5px;color:#4b5563;font-style:italic;margin-bottom:3px;">${e.company}${e.location ? ', ' + e.location : ''}</div>
          <ul style="padding-left:16px;list-style:disc;margin:0;">
            ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9px;line-height:1.55;color:#374151;">${b}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>` : ''}

    ${renderCommonSections(d, c, false)}
  </div>`;
}

function renderInfographicTemplate(d, c) {
  const p = d.personal;
  return `
  <div style="padding:32px;height:100%;box-sizing:border-box;background:#ffffff;color:#1e293b;display:flex;flex-direction:column;">
    <!-- INFOGRAPHIC HEADER -->
    <div style="background:linear-gradient(135deg, ${c}15, ${c}05);border-radius:12px;padding:20px;border:1px solid ${c}30;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
      <div>
        <h1 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:4px;">${p.firstName} ${p.lastName}</h1>
        <div style="font-size:12px;font-weight:700;color:${c};">${p.jobTitle}</div>
      </div>
      <div style="display:flex;gap:12px;font-size:9px;color:#475569;">
        ${p.email ? `<span>✉ ${p.email}</span>` : ''}
        ${p.phone ? `<span>📞 ${p.phone}</span>` : ''}
        ${p.location ? `<span>📍 ${p.location}</span>` : ''}
      </div>
    </div>

    ${p.summary ? `<p style="font-size:10px;line-height:1.6;color:#334155;margin:0 0 20px;">${p.summary}</p>` : ''}

    <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:20px;flex:1;">
      <div>
        ${d.experience.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;">Career History</div>
          ${d.experience.map(e => `
            <div style="margin-bottom:12px;padding-left:12px;border-left:3px solid ${c};">
              <div style="font-size:11px;font-weight:700;color:#0f172a;">${e.title}</div>
              <div style="font-size:9.5px;color:${c};font-weight:600;">${e.company} (${e.startDate} – ${e.endDate})</div>
              <ul style="padding-left:14px;list-style:disc;margin:3px 0 0;">
                ${e.bullets.filter(b => b.trim()).map(b => `<li style="font-size:9px;line-height:1.5;color:#475569;">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>` : ''}

        ${renderCommonSections(d, c, false)}
      </div>

      <div>
        ${d.skills.length ? `
        <div style="margin-bottom:20px;background:#f8fafc;padding:14px;border-radius:10px;border:1px solid #e2e8f0;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:10px;">Skill Radar</div>
          ${d.skills.map(s => `
            <div style="margin-bottom:8px;">
              <div style="display:flex;justify-content:space-between;font-size:9px;font-weight:700;margin-bottom:2px;">
                <span>${s.name}</span>
                <span style="color:${c};">${s.level}%</span>
              </div>
              <div style="height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                <div style="height:100%;width:${s.level}%;background:${c};border-radius:3px;"></div>
              </div>
            </div>
          `).join('')}
        </div>` : ''}

        ${d.education.length ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${c};margin-bottom:8px;">Education</div>
          ${d.education.map(edu => `
            <div style="margin-bottom:6px;">
              <div style="font-size:10px;font-weight:700;color:#0f172a;">${edu.degree}</div>
              <div style="font-size:9px;color:#64748b;">${edu.institution}</div>
            </div>
          `).join('')}
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

// ===================== SAMPLE PRESETS & ACTIONS =====================
function initSamplePresets() {
  const btn = document.getElementById('sampleDataBtn');
  const menu = document.getElementById('sampleDataMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
    document.getElementById('moreActionsMenu')?.classList.remove('open');
  });

  menu.querySelectorAll('[data-preset]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const preset = item.getAttribute('data-preset');
      loadSamplePreset(preset);
      menu.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    menu.classList.remove('open');
  });
}

function loadSamplePreset(preset) {
  if (preset === 'software') {
    state.data = {
      personal: {
        firstName: 'Alex',
        lastName: 'Johnson',
        jobTitle: 'Senior Software Engineer',
        email: 'alex.johnson@email.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'linkedin.com/in/alexjohnson',
        summary: 'Results-driven software engineer with 6+ years of experience architecting distributed cloud systems, modern React frontends, and high-throughput APIs. Passionate about developer velocity and system resilience.',
        photo: null
      },
      experience: [
        {
          id: 'exp-1',
          title: 'Senior Software Engineer',
          company: 'CloudScale Inc.',
          location: 'San Francisco, CA',
          startDate: 'Jan 2021',
          endDate: 'Present',
          current: true,
          bullets: [
            'Architected distributed microservices handling 45M+ daily requests with 99.99% uptime',
            'Reduced AWS infrastructure costs by $180K/year through serverless auto-scaling and spot instances',
            'Mentored 6 junior engineers and spearheaded cross-functional adoption of TypeScript & GraphQL'
          ]
        },
        {
          id: 'exp-2',
          title: 'Full Stack Engineer',
          company: 'Nexus Apps',
          location: 'Seattle, WA',
          startDate: 'Jun 2018',
          endDate: 'Dec 2020',
          current: false,
          bullets: [
            'Built responsive design system and core dashboard features in Next.js and Tailwind',
            'Implemented real-time collaboration engine using WebSockets and Redis pub/sub',
            'Cut test pipeline runtimes by 55% via parallelized GitHub Actions'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.S. in Computer Science',
          institution: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.85',
          honors: 'Dean’s Honor List'
        }
      ],
      skills: [
        { id: 'sk-1', name: 'TypeScript', level: 95 },
        { id: 'sk-2', name: 'React & Next.js', level: 92 },
        { id: 'sk-3', name: 'Node.js', level: 88 },
        { id: 'sk-4', name: 'Python', level: 80 },
        { id: 'sk-5', name: 'PostgreSQL', level: 85 },
        { id: 'sk-6', name: 'AWS & Docker', level: 82 }
      ],
      languages: [
        { id: 'lang-1', name: 'English', level: 'Native' },
        { id: 'lang-2', name: 'Spanish', level: 'Intermediate' }
      ],
      certifications: [
        { id: 'cert-1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023' }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Distributed Task Queue',
          url: 'github.com/alexj/fast-queue',
          description: 'High-throughput async job runner with Redis backend and automatic retry backoffs. 1.2K+ GitHub stars.',
          technologies: 'Go, Redis, Docker'
        }
      ],
      awards: [
        { id: 'aw-1', title: 'Top Innovator Award', issuer: 'CloudScale Hackathon', date: '2022' }
      ],
      volunteer: [],
      publications: [],
      hobbies: [],
      references: [],
      customSections: []
    };
    state.accentColor = '#2DC08D';
  } else if (preset === 'designer') {
    state.data = {
      personal: {
        firstName: 'Maya',
        lastName: 'Lin',
        jobTitle: 'Lead Product & UX Designer',
        email: 'maya.lin.design@email.com',
        phone: '+1 (555) 789-0123',
        location: 'New York, NY',
        website: 'mayalin.design',
        summary: 'Strategic Product Designer with 7+ years delivering user-centered digital products across fintech and enterprise SaaS. Proven ability to turn ambiguous customer pain points into high-conversion, award-winning experiences.',
        photo: null
      },
      experience: [
        {
          id: 'exp-1',
          title: 'Staff Product Designer',
          company: 'FinFlow Global',
          location: 'New York, NY',
          startDate: 'Feb 2021',
          endDate: 'Present',
          current: true,
          bullets: [
            'Led end-to-end redesign of mobile onboarding, elevating user completion rates by 38%',
            'Established company-wide design system "FlowUI" serving 80+ engineers across 4 squads',
            'Conducted 50+ qualitative user research sessions and usability studies across US and EU markets'
          ]
        },
        {
          id: 'exp-2',
          title: 'Senior UX Designer',
          company: 'Aura Studio',
          location: 'Brooklyn, NY',
          startDate: 'Jul 2017',
          endDate: 'Jan 2021',
          current: false,
          bullets: [
            'Delivered web and mobile applications for Fortune 500 retail and media clients',
            'Created interactive Figma prototypes facilitating executive stakeholder consensus',
            'Mentored junior designers on information architecture and design tokens'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.F.A. in Interaction Design',
          institution: 'Rhode Island School of Design (RISD)',
          location: 'Providence, RI',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.9',
          honors: 'Summa Cum Laude'
        }
      ],
      skills: [
        { id: 'sk-1', name: 'Figma & Design Systems', level: 98 },
        { id: 'sk-2', name: 'User Research & Testing', level: 90 },
        { id: 'sk-3', name: 'Prototyping & Motion', level: 85 },
        { id: 'sk-4', name: 'Information Architecture', level: 92 },
        { id: 'sk-5', name: 'HTML5 / CSS3', level: 78 }
      ],
      languages: [
        { id: 'lang-1', name: 'English', level: 'Native' },
        { id: 'lang-2', name: 'French', level: 'Fluent' }
      ],
      certifications: [
        { id: 'cert-1', name: 'Nielsen Norman Group UX Master Certified', issuer: 'NN/g', date: '2021' }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Accessibility Design System Kit',
          url: 'figma.com/@mayalin',
          description: 'WCAG 2.1 AA compliant Figma UI kit with 25K+ community downloads.',
          technologies: 'Figma, WCAG Tokens, Auto Layout'
        }
      ],
      awards: [
        { id: 'aw-1', title: 'Best Mobile App UX', issuer: 'Webby Awards Honoree', date: '2022' }
      ],
      volunteer: [],
      publications: [],
      hobbies: [],
      references: [],
      customSections: []
    };
    state.accentColor = '#7C3AED';
  } else if (preset === 'marketing') {
    state.data = {
      personal: {
        firstName: 'Jordan',
        lastName: 'Taylor',
        jobTitle: 'Growth & Marketing Director',
        email: 'jordan.taylor@growth.io',
        phone: '+1 (555) 456-7890',
        location: 'Austin, TX',
        website: 'jordangrowth.com',
        summary: 'Metrics-obsessed growth marketing leader with 8+ years experience scaling B2B SaaS ARR from $2M to $25M. Deep mastery of performance marketing, organic search engine strategy, and lifecycle customer retention.',
        photo: null
      },
      experience: [
        {
          id: 'exp-1',
          title: 'Director of Growth Marketing',
          company: 'ScaleStack SaaS',
          location: 'Austin, TX',
          startDate: 'Mar 2021',
          endDate: 'Present',
          current: true,
          bullets: [
            'Scaled qualified pipeline generation by 140% YoY while decreasing CAC by 28%',
            'Directed $3.5M annual paid acquisition budget across Google Ads, LinkedIn, and Meta',
            'Architected automated nurture sequences generating $4.2M in assisted closed-won revenue'
          ]
        },
        {
          id: 'exp-2',
          title: 'Senior Acquisition Manager',
          company: 'HyperGrowth Media',
          location: 'Austin, TX',
          startDate: 'Aug 2017',
          endDate: 'Feb 2021',
          current: false,
          bullets: [
            'Managed SEO strategy boosting organic monthly website visits from 40K to 450K',
            'Implemented conversion rate optimization (CRO) A/B tests yielding 22% lift in lead conversions',
            'Built multi-touch attribution models in HubSpot and Snowflake'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.A. in Marketing & Business Analytics',
          institution: 'University of Texas at Austin',
          location: 'Austin, TX',
          startDate: '2013',
          endDate: '2017',
          gpa: '3.75',
          honors: 'Business Honors'
        }
      ],
      skills: [
        { id: 'sk-1', name: 'SEO & SEM', level: 95 },
        { id: 'sk-2', name: 'Paid Ads (Google & LinkedIn)', level: 92 },
        { id: 'sk-3', name: 'HubSpot & CRM Automation', level: 90 },
        { id: 'sk-4', name: 'Google Analytics 4 & Mixpanel', level: 88 },
        { id: 'sk-5', name: 'Conversion Rate Optimization', level: 85 }
      ],
      languages: [
        { id: 'lang-1', name: 'English', level: 'Native' }
      ],
      certifications: [
        { id: 'cert-1', name: 'Google Ads & Analytics Certified', issuer: 'Google', date: '2023' },
        { id: 'cert-2', name: 'HubSpot Inbound Marketing Master', issuer: 'HubSpot Academy', date: '2022' }
      ],
      projects: [],
      awards: [
        { id: 'aw-1', title: 'Top B2B Marketer 30 Under 30', issuer: 'DemandGen Report', date: '2021' }
      ],
      volunteer: [],
      publications: [],
      hobbies: [],
      references: [],
      customSections: []
    };
    state.accentColor = '#0EA5E9';
  } else if (preset === 'graduate') {
    state.data = {
      personal: {
        firstName: 'Samira',
        lastName: 'Khan',
        jobTitle: 'Junior Data Analyst',
        email: 'samira.khan@alumni.edu',
        phone: '+1 (555) 321-9876',
        location: 'Boston, MA',
        website: 'linkedin.com/in/samirakhan-data',
        summary: 'Driven and detail-oriented Data Science graduate with strong academic background in statistical analysis, Python data wrangling, and predictive modeling. Eager to apply analytical rigor to solve business problems.',
        photo: null
      },
      experience: [
        {
          id: 'exp-1',
          title: 'Data Science Intern',
          company: 'Beacon Health Analytics',
          location: 'Boston, MA',
          startDate: 'Jun 2023',
          endDate: 'Aug 2023',
          current: false,
          bullets: [
            'Cleaned and transformed 2M+ healthcare records using Pandas and SQL queries',
            'Built Tableau executive dashboard tracking patient readmission rates across 12 clinics',
            'Presented exploratory data analysis findings to senior healthcare leadership'
          ]
        },
        {
          id: 'exp-2',
          title: 'Undergraduate Teaching Assistant',
          company: 'Boston University Dept of Statistics',
          location: 'Boston, MA',
          startDate: 'Sep 2022',
          endDate: 'May 2023',
          current: false,
          bullets: [
            'Conducted weekly lab sessions for 60+ students in Introductory Probability & Statistics',
            'Held tutoring hours assisting students with R and Python assignments'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.S. in Data Science & Applied Mathematics',
          institution: 'Boston University',
          location: 'Boston, MA',
          startDate: '2019',
          endDate: '2023',
          gpa: '3.92',
          honors: 'Summa Cum Laude, Phi Beta Kappa'
        }
      ],
      skills: [
        { id: 'sk-1', name: 'Python (Pandas, NumPy, Scikit-learn)', level: 90 },
        { id: 'sk-2', name: 'SQL & Relational Databases', level: 88 },
        { id: 'sk-3', name: 'Tableau & Data Visualization', level: 85 },
        { id: 'sk-4', name: 'R & Statistical Modeling', level: 80 },
        { id: 'sk-5', name: 'Excel Advanced Modeling', level: 88 }
      ],
      languages: [
        { id: 'lang-1', name: 'English', level: 'Native' },
        { id: 'lang-2', name: 'Bengali', level: 'Fluent' }
      ],
      certifications: [
        { id: 'cert-1', name: 'Tableau Desktop Specialist', issuer: 'Tableau', date: '2023' }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'City Bike Demand Prediction Model',
          url: 'github.com/samirak/citibike-ml',
          description: 'Random Forest and XGBoost predictive model forecasting hourly bike demand with 91% accuracy.',
          technologies: 'Python, Scikit-learn, Seaborn'
        }
      ],
      awards: [
        { id: 'aw-1', title: 'Departmental Excellence Award in Data Science', issuer: 'Boston University', date: '2023' }
      ],
      volunteer: [],
      publications: [],
      hobbies: [],
      references: [],
      customSections: []
    };
    state.accentColor = '#F59E0B';
  }

  initSectionsNav();
  renderSectionForm('personal');
  renderResume();
  updateScore();
  saveToStorage();
  saveHistory();
  showToast(`Loaded ${state.data.personal.firstName}'s sample resume! ✨`);
}

function initMoreActions() {
  const btn = document.getElementById('moreActionsBtn');
  const menu = document.getElementById('moreActionsMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
    document.getElementById('sampleDataMenu')?.classList.remove('open');
  });

  document.getElementById('exportTxtBtn')?.addEventListener('click', () => {
    menu.classList.remove('open');
    exportPlainText();
  });

  document.getElementById('exportJsonBtn')?.addEventListener('click', () => {
    menu.classList.remove('open');
    exportJsonBackup();
  });

  const fileInput = document.getElementById('importJsonInput');
  document.getElementById('importJsonBtn')?.addEventListener('click', () => {
    menu.classList.remove('open');
    fileInput?.click();
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      importJsonBackup(file);
      fileInput.value = '';
    }
  });

  document.getElementById('clearAllBtn')?.addEventListener('click', () => {
    menu.classList.remove('open');
    if (confirm('Are you sure you want to clear all resume contents and start from a blank slate?')) {
      clearAllResume();
    }
  });

  document.addEventListener('click', () => {
    menu.classList.remove('open');
  });
}

function exportPlainText() {
  const d = state.data;
  const p = d.personal;
  let lines = [];

  // Header
  lines.push(`${p.firstName || ''} ${p.lastName || ''}`.trim().toUpperCase());
  if (p.jobTitle) lines.push(p.jobTitle);
  const contactParts = [p.email, p.phone, p.location, p.website].filter(Boolean);
  if (contactParts.length) lines.push(contactParts.join(' | '));
  lines.push('');

  // Summary
  if (p.summary) {
    lines.push('=== PROFESSIONAL SUMMARY ===');
    lines.push(p.summary);
    lines.push('');
  }

  // Experience
  if (d.experience && d.experience.length) {
    lines.push('=== WORK EXPERIENCE ===');
    d.experience.forEach(exp => {
      lines.push(`${exp.title} - ${exp.company}${exp.location ? ' (' + exp.location + ')' : ''}`);
      lines.push(`${exp.startDate} – ${exp.endDate}`);
      if (exp.bullets && exp.bullets.length) {
        exp.bullets.filter(b => b.trim()).forEach(b => lines.push(`• ${b}`));
      }
      lines.push('');
    });
  }

  // Education
  if (d.education && d.education.length) {
    lines.push('=== EDUCATION ===');
    d.education.forEach(edu => {
      lines.push(`${edu.degree} - ${edu.institution}${edu.location ? ', ' + edu.location : ''}`);
      lines.push(`${edu.startDate} – ${edu.endDate}${edu.gpa ? ' (GPA: ' + edu.gpa + ')' : ''}`);
      lines.push('');
    });
  }

  // Skills
  if (d.skills && d.skills.length) {
    lines.push('=== CORE SKILLS ===');
    lines.push(d.skills.map(s => s.name).join(', '));
    lines.push('');
  }

  // Languages
  if (d.languages && d.languages.length) {
    lines.push('=== LANGUAGES ===');
    lines.push(d.languages.map(l => `${l.name} (${l.level})`).join(', '));
    lines.push('');
  }

  // Certifications
  if (d.certifications && d.certifications.length) {
    lines.push('=== CERTIFICATIONS ===');
    d.certifications.forEach(c => lines.push(`• ${c.name} - ${c.issuer} (${c.date})`));
    lines.push('');
  }

  // Projects
  if (d.projects && d.projects.length) {
    lines.push('=== PROJECTS ===');
    d.projects.forEach(pr => {
      lines.push(`${pr.name}${pr.url ? ' (' + pr.url + ')' : ''}`);
      if (pr.description) lines.push(pr.description);
      if (pr.technologies) lines.push(`Technologies: ${pr.technologies}`);
      lines.push('');
    });
  }

  // Awards
  if (d.awards && d.awards.length) {
    lines.push('=== AWARDS & HONORS ===');
    d.awards.forEach(a => lines.push(`• ${a.title} - ${a.issuer || ''} (${a.date || ''})`));
    lines.push('');
  }

  // Volunteering
  if (d.volunteer && d.volunteer.length) {
    lines.push('=== VOLUNTEERING ===');
    d.volunteer.forEach(v => lines.push(`• ${v.role} at ${v.organization} (${v.startDate || ''} - ${v.endDate || ''})`));
    lines.push('');
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const name = `${p.firstName || 'Resume'}_${p.lastName || ''}_Resume.txt`.replace(/\s+/g, '_');
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Plain text ATS resume downloaded!');
}

function exportJsonBackup() {
  const p = state.data.personal;
  const backup = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    state: {
      template: state.template,
      accentColor: state.accentColor,
      font: state.font,
      fontSize: state.fontSize,
      lineSpacing: state.lineSpacing
    },
    data: state.data
  };
  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const name = `${p.firstName || 'Resume'}_${p.lastName || ''}_Backup.json`.replace(/\s+/g, '_');
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Resume JSON backup exported!');
}

function importJsonBackup(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.data) {
        state.data = parsed.data;
        if (parsed.state) {
          state.template = parsed.state.template || state.template;
          state.accentColor = parsed.state.accentColor || state.accentColor;
          state.font = parsed.state.font || state.font;
          state.fontSize = parsed.state.fontSize || state.fontSize;
          state.lineSpacing = parsed.state.lineSpacing || state.lineSpacing;
        }
      } else if (parsed.personal) {
        state.data = parsed;
      } else {
        alert('Invalid resume JSON file structure.');
        return;
      }
      initSectionsNav();
      renderSectionForm(state.activeSection);
      renderResume();
      updateScore();
      saveToStorage();
      saveHistory();
      showToast('Resume data imported successfully! ✨');
    } catch(err) {
      alert('Error parsing JSON file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function clearAllResume() {
  state.data = {
    personal: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: '',
      photo: null
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    awards: [],
    volunteer: [],
    publications: [],
    hobbies: [],
    references: [],
    customSections: []
  };
  initSectionsNav();
  renderSectionForm('personal');
  renderResume();
  updateScore();
  saveToStorage();
  saveHistory();
  showToast('Resume cleared! Ready for a fresh start.');
}

// ===================== DOWNLOAD PDF =====================
function initDownload() {
  document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
}

function downloadPDF() {
  if (typeof exportResumeToPDF === 'function') {
    exportResumeToPDF();
  } else {
    window.print();
  }
}

// ===================== TOAST =====================
function showToast(message) {
  const toast = document.getElementById('aiToast');
  document.getElementById('aiToastText').textContent = message;
  toast.style.display = 'flex';
  toast.style.animation = 'none';
  requestAnimationFrame(() => {
    toast.style.animation = 'slideInRight 0.3s ease both';
  });
  setTimeout(() => { toast.style.display = 'none'; }, 4000);
}
