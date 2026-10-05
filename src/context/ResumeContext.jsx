import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const ResumeContext = createContext(null);

const DEFAULT_RESUME_DATA = {
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
      company: 'TechCorp Inc.',
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
      company: 'StartupXYZ',
      location: 'New York, NY',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      current: false,
      bullets: [
        'Built responsive design system and core dashboard features in React and Node.js',
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
      city: 'Berkeley',
      location: 'Berkeley',
      year: '2014 – 2018',
      gradeType: 'CGPA',
      gpa: '3.85',
      honors: 'Magna Cum Laude'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'JavaScript & TypeScript', level: 95 },
    { id: 'sk-2', name: 'React & Next.js', level: 92 },
    { id: 'sk-3', name: 'Node.js & Express', level: 88 },
    { id: 'sk-4', name: 'Python & FastAPI', level: 80 },
    { id: 'sk-5', name: 'PostgreSQL & Redis', level: 85 },
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
    { id: 'aw-1', title: 'Top Engineering Innovator', issuer: 'TechCorp Annual Awards', date: '2022', description: 'Awarded for reducing system latency by 40%.' }
  ],
  volunteer: [
    { id: 'vol-1', role: 'Volunteer Code Mentor', organization: 'Black Girls CODE', startDate: '2021', endDate: 'Present', bullets: ['Mentored high school students in web development.'] }
  ],
  publications: [],
  hobbies: [
    { id: 'hob-1', name: 'Marathon Running', description: 'Boston Marathon 2023 Finisher' },
    { id: 'hob-2', name: 'Open Source', description: 'Contributor to React ecosystem' }
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Dr. Sarah Jenkins',
      position: 'VP of Engineering',
      company: 'TechCorp Inc.',
      email: 'sarah.jenkins@techcorp.com',
      phone: '+1 (555) 987-6543'
    }
  ],
  declaration: {
    title: 'DECLARATION',
    statement: 'The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge.',
    signeeName: '',
    signatureText: '',
    signatureImage: null,
    date: '',
    place: '',
    emptySpace: 80,
    showDivider: false
  },
  sectionColumns: {
    experience: 'left',
    projects: 'left',
    education: 'left',
    skills: 'right',
    languages: 'right',
    certifications: 'right',
    awards: 'right',
    volunteer: 'right',
    hobbies: 'right',
    references: 'right'
  },
  customSections: {},
  pageBreaks: {},
  activeSections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'awards', 'volunteer', 'hobbies']
};

export const ACCENT_COLORS = [
  { color: '#2DC08D', name: 'Emerald' },
  { color: '#0EA5E9', name: 'Sky Blue' },
  { color: '#7C3AED', name: 'Violet' },
  { color: '#F59E0B', name: 'Amber' },
  { color: '#EF4444', name: 'Crimson' },
  { color: '#EC4899', name: 'Pink' },
  { color: '#10B981', name: 'Mint' },
  { color: '#1E3A5F', name: 'Navy' },
  { color: '#374151', name: 'Slate' },
  { color: '#8B5E3C', name: 'Bronze' }
];

export const TEMPLATES = [
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

export const SECTIONS_CONFIG = [
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
  { id: 'declaration', label: 'Declaration & Signature', icon: '✍️', required: false }
];

export function ResumeProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumecv_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.skills)) {
          parsed.skills = parsed.skills.map(s => {
            let name = s?.name;
            if (typeof name === 'object' && name !== null) {
              name = name.name || 'Skill';
            }
            return { ...s, name: String(name || '') };
          });
        }
        return parsed;
      }
      return DEFAULT_RESUME_DATA;
    } catch (e) {
      return DEFAULT_RESUME_DATA;
    }
  });

  const [template, setTemplate] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryTmpl = urlParams.get('template');
      if (queryTmpl) return queryTmpl;
      return localStorage.getItem('resumecv_template') || 'modern';
    } catch (e) {
      return 'modern';
    }
  });

  const [accentColor, setAccentColor] = useState(() => {
    try {
      return localStorage.getItem('resumecv_color') || '#2DC08D';
    } catch (e) {
      return '#2DC08D';
    }
  });

  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState('medium');
  const [lineSpacing, setLineSpacing] = useState('normal');
  const [zoom, setZoom] = useState(0.85);
  const [activeTab, setActiveTab] = useState('builder'); // 'landing', 'templates', 'builder'
  const [toastMessage, setToastMessage] = useState(null);
  const [sectionMargins, setSectionMargins] = useState({});

  // History stack for Undo / Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoAction = useRef(false);

  // Show toast notification
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Save state snapshots to history
  const recordHistory = useCallback((newData) => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }
    setHistory(prev => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, JSON.stringify(newData)].slice(-30); // keep up to 30 snapshots
    });
    setHistoryIndex(prev => Math.min(prev + 1, 29));
  }, [historyIndex]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('resumecv_data_v2', JSON.stringify(data));
      localStorage.setItem('resumecv_template', template);
      localStorage.setItem('resumecv_color', accentColor);
    } catch (e) {}
  }, [data, template, accentColor]);

  // Undo / Redo handlers
  const undo = () => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const targetState = JSON.parse(history[historyIndex - 1]);
      setData(targetState);
      setHistoryIndex(prev => prev - 1);
      showToast('Undo');
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const targetState = JSON.parse(history[historyIndex + 1]);
      setData(targetState);
      setHistoryIndex(prev => prev + 1);
      showToast('Redo');
    }
  };

  // Keyboard shortcut listener for Cmd+Z / Cmd+Y
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.metaKey || e.ctrlKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, historyIndex]);

  // Direct State Updaters
  const updateData = (updater) => {
    setData(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      recordHistory(next);
      return next;
    });
  };

  const updatePersonal = (field, value) => {
    updateData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  // Experience handlers
  const updateExperience = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addExperience = () => {
    const newItem = {
      id: 'exp-' + Date.now(),
      title: 'Job Position',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      bullets: ['Describe your key impact, metrics, and achievements...']
    };
    updateData(prev => ({ ...prev, experience: [newItem, ...prev.experience] }));
    showToast('New position added! Click to edit.');
  };

  const removeExperience = (id) => {
    updateData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const addBullet = (expId, index = -1, initialText = 'Accomplished [X] as measured by [Y] by doing [Z]') => {
    updateData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        const newBullets = [...exp.bullets];
        if (index >= 0) newBullets.splice(index + 1, 0, initialText);
        else newBullets.push(initialText);
        return { ...exp, bullets: newBullets };
      })
    }));
  };

  const updateBullet = (expId, bulletIndex, text) => {
    updateData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        const newBullets = [...exp.bullets];
        newBullets[bulletIndex] = text;
        return { ...exp, bullets: newBullets };
      })
    }));
  };

  const removeBullet = (expId, bulletIndex) => {
    updateData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        const newBullets = exp.bullets.filter((_, i) => i !== bulletIndex);
        return { ...exp, bullets: newBullets.length ? newBullets : [''] };
      })
    }));
  };

  // Education handlers
  const updateEducation = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const addEducation = () => {
    const newItem = {
      id: 'edu-' + Date.now(),
      degree: 'Degree or Diploma',
      institution: 'University / Institution',
      city: 'City',
      location: 'City',
      year: '2020 – 2024',
      gradeType: 'CGPA',
      gpa: '',
      honors: ''
    };
    updateData(prev => ({ ...prev, education: [...prev.education, newItem] }));
    showToast('Education item added!');
  };

  const removeEducation = (id) => {
    updateData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  // Skills handlers
  const updateSkill = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      skills: (prev.skills || []).map(sk => {
        if (sk.id === id) {
          const val = field === 'name' && typeof value === 'object' && value !== null
            ? String(value.name || '')
            : (field === 'name' ? String(value || '') : value);
          return { ...sk, [field]: val };
        }
        return sk;
      })
    }));
  };

  const addSkill = (name = 'New Skill', level = 85) => {
    let skillName = name;
    let skillLevel = level;
    if (typeof name === 'object' && name !== null) {
      skillName = name.name || 'New Skill';
      skillLevel = name.level !== undefined ? name.level : 85;
    }
    const newItem = {
      id: 'sk-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      name: String(skillName || 'New Skill'),
      level: Number(skillLevel) || 85
    };
    updateData(prev => ({
      ...prev,
      skills: [...(prev.skills || []).map(s => {
        let n = s?.name;
        if (typeof n === 'object' && n !== null) n = n.name || 'Skill';
        return { ...s, name: String(n || '') };
      }), newItem]
    }));
  };

  const removeSkill = (id) => {
    updateData(prev => ({ ...prev, skills: (prev.skills || []).filter(s => s.id !== id) }));
  };

  // Languages handlers
  const updateLanguage = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      languages: prev.languages.map(l => l.id === id ? { ...l, [field]: value } : l)
    }));
  };

  const addLanguage = (name = 'Language', level = 'Fluent') => {
    const newItem = { id: 'lang-' + Date.now(), name, level };
    updateData(prev => ({ ...prev, languages: [...prev.languages, newItem] }));
  };

  const removeLanguage = (id) => {
    updateData(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== id) }));
  };

  // Certifications handlers
  const updateCertification = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const addCertification = () => {
    const newItem = { id: 'cert-' + Date.now(), name: 'Certification Name', issuer: 'Issuer Authority', date: '2023' };
    updateData(prev => ({ ...prev, certifications: [...prev.certifications, newItem] }));
  };

  const removeCertification = (id) => {
    updateData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  };

  // Projects handlers
  const updateProject = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const addProject = () => {
    const newItem = { id: 'proj-' + Date.now(), name: 'Project Name', url: 'github.com/username/project', description: 'Brief overview of project goals, architecture, and impact.', technologies: 'React, Node.js' };
    updateData(prev => ({ ...prev, projects: [...prev.projects, newItem] }));
  };

  const removeProject = (id) => {
    updateData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  // Awards handlers
  const updateAward = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      awards: (prev.awards || []).map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  const addAward = () => {
    const newItem = { id: 'aw-' + Date.now(), title: 'Award Title', issuer: 'Organization', date: '2023', description: 'Recognition for outstanding contributions.' };
    updateData(prev => ({ ...prev, awards: [...(prev.awards || []), newItem] }));
  };

  const removeAward = (id) => {
    updateData(prev => ({ ...prev, awards: (prev.awards || []).filter(a => a.id !== id) }));
  };

  // Volunteer handlers
  const updateVolunteer = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      volunteer: (prev.volunteer || []).map(v => v.id === id ? { ...v, [field]: value } : v)
    }));
  };

  const addVolunteer = () => {
    const newItem = { id: 'vol-' + Date.now(), role: 'Volunteer Role', organization: 'Nonprofit Name', startDate: '2022', endDate: 'Present', bullets: ['Supported community initiatives.'] };
    updateData(prev => ({ ...prev, volunteer: [...(prev.volunteer || []), newItem] }));
  };

  const removeVolunteer = (id) => {
    updateData(prev => ({ ...prev, volunteer: (prev.volunteer || []).filter(v => v.id !== id) }));
  };

  // Hobbies handlers
  const updateHobby = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      hobbies: (prev.hobbies || []).map(h => h.id === id ? { ...h, [field]: value } : h)
    }));
  };

  const addHobby = () => {
    const newItem = { id: 'hob-' + Date.now(), name: 'New Passion', description: 'Short detail' };
    updateData(prev => ({ ...prev, hobbies: [...(prev.hobbies || []), newItem] }));
  };

  const removeHobby = (id) => {
    updateData(prev => ({ ...prev, hobbies: (prev.hobbies || []).filter(h => h.id !== id) }));
  };

  // References Management
  const addReference = () => {
    updateData(prev => ({
      ...prev,
      references: [
        ...(prev.references || []),
        {
          id: 'ref-' + Date.now(),
          name: '',
          position: '',
          company: '',
          email: '',
          phone: ''
        }
      ]
    }));
  };

  const updateReference = (id, field, value) => {
    updateData(prev => ({
      ...prev,
      references: (prev.references || []).map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const removeReference = (id) => {
    updateData(prev => ({
      ...prev,
      references: (prev.references || []).filter(r => r.id !== id)
    }));
  };

  // Section visibility toggle
  const toggleSection = (sectionId) => {
    updateData(prev => {
      const active = prev.activeSections || [];
      const isPresent = active.includes(sectionId);
      const nextActive = isPresent ? active.filter(s => s !== sectionId) : [...active, sectionId];
      const nextData = {
        ...prev,
        activeSections: nextActive
      };

      // If re-enabling a section that has no items, seed with a clean initial item so it renders
      if (!isPresent) {
        if (sectionId === 'hobbies' && (!prev.hobbies || prev.hobbies.length === 0)) {
          nextData.hobbies = [{ id: 'hob-' + Date.now(), name: 'Activity / Interest', description: '' }];
        } else if (sectionId === 'awards' && (!prev.awards || prev.awards.length === 0)) {
          nextData.awards = [{ id: 'aw-' + Date.now(), title: 'Honors / Award Title', issuer: 'Issuer / Organization', date: '2024', description: '' }];
        } else if (sectionId === 'volunteer' && (!prev.volunteer || prev.volunteer.length === 0)) {
          nextData.volunteer = [{ id: 'vol-' + Date.now(), role: 'Volunteer Role', organization: 'Organization', startDate: '2023', endDate: 'Present', bullets: ['Community and team initiative contribution'] }];
        } else if (sectionId === 'certifications' && (!prev.certifications || prev.certifications.length === 0)) {
          nextData.certifications = [{ id: 'cert-' + Date.now(), name: 'Professional Certification', issuer: 'Issuing Body', date: '2024' }];
        } else if (sectionId === 'projects' && (!prev.projects || prev.projects.length === 0)) {
          nextData.projects = [{ id: 'proj-' + Date.now(), name: 'Key Project', url: '', description: 'Description of key accomplishment and impact', technologies: '' }];
        } else if (sectionId === 'languages' && (!prev.languages || prev.languages.length === 0)) {
          nextData.languages = [{ id: 'lang-' + Date.now(), name: 'Language', level: 'Fluent' }];
        } else if (sectionId === 'references' && (!prev.references || prev.references.length === 0)) {
          nextData.references = [{
            id: 'ref-' + Date.now(),
            name: 'Dr. Sarah Jenkins',
            position: 'VP of Engineering',
            company: 'TechCorp Inc.',
            email: 'sarah.jenkins@techcorp.com',
            phone: '+1 (555) 987-6543'
          }];
        } else if (sectionId === 'declaration' && !prev.declaration?.statement) {
          const fullName = `${prev.personal?.firstName || ''} ${prev.personal?.lastName || ''}`.trim();
          nextData.declaration = {
            title: 'DECLARATION',
            statement: 'The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge.',
            signeeName: fullName || 'Abdul Moin Khan',
            signatureText: fullName || 'Moin Khan',
            signatureImage: null,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            place: prev.personal?.location || ''
          };
        }
      }

      return nextData;
    });
  };

  // Declaration Management
  const updateDeclaration = (field, value) => {
    updateData(prev => ({
      ...prev,
      declaration: {
        ...(prev.declaration || {
          title: 'DECLARATION',
          statement: 'The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge.',
          signeeName: '',
          signatureText: '',
          signatureImage: null,
          date: '',
          place: ''
        }),
        [field]: value
      }
    }));
  };

  // Section Column Placement (Left / Right)
  const setSectionColumn = (sectionId, column) => {
    if (!sectionId) return;
    updateData(prev => ({
      ...prev,
      sectionColumns: {
        ...(prev.sectionColumns || {}),
        [sectionId]: column
      }
    }));
  };

  const toggleSectionColumn = (sectionId, fallback = 'left') => {
    if (!sectionId) return;
    updateData(prev => {
      const currentCol = prev.sectionColumns?.[sectionId] || fallback;
      const nextCol = currentCol === 'left' ? 'right' : 'left';
      showToast(`Moved to ${nextCol === 'left' ? 'Left' : 'Right'} column`);
      return {
        ...prev,
        sectionColumns: {
          ...(prev.sectionColumns || {}),
          [sectionId]: nextCol
        }
      };
    });
  };

  // Section Page Break toggle (for manual new-page control)
  const toggleSectionPageBreak = (sectionId) => {
    if (!sectionId) return;
    updateData(prev => {
      const prevBreaks = prev.pageBreaks || {};
      const nextBreaks = { ...prevBreaks };
      if (nextBreaks[sectionId]) {
        delete nextBreaks[sectionId];
        showToast('Page break removed');
      } else {
        nextBreaks[sectionId] = true;
        showToast('Section moved to new page');
      }
      return { ...prev, pageBreaks: nextBreaks };
    });
  };

  // Delete a specific page (pageIndex: 0-indexed, e.g. 1 for Page 2)
  // If the page is blank, compacts layout and clears page breaks.
  // If the page has sections, removes those sections from the resume.
  const deletePage = (pageIndex) => {
    const targetPageNumber = pageIndex + 1;
    const paper = document.getElementById('resumePaper');

    let sectionsOnThisPage = [];
    if (paper) {
      const paperRect = paper.getBoundingClientRect();
      const z = zoom || 1;
      const pageTop = pageIndex * 1123;
      const pageBottom = (pageIndex + 1) * 1123;

      const sectionEls = Array.from(paper.querySelectorAll('.section-wrapper'));
      sectionEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const top = (rect.top - paperRect.top) / z;
        const secId = el.getAttribute('data-section-id');
        if (top >= (pageTop - 40) && top < pageBottom && secId) {
          sectionsOnThisPage.push(secId);
        }
      });
    }

    updateData(prev => {
      let updatedActive = [...(prev.activeSections || [])];
      let updatedCustom = { ...(prev.customSections || {}) };
      let updatedBreaks = { ...(prev.pageBreaks || {}) };

      sectionsOnThisPage.forEach(s => delete updatedBreaks[s]);

      if (sectionsOnThisPage.length > 0) {
        updatedActive = updatedActive.filter(s => !sectionsOnThisPage.includes(s));
        sectionsOnThisPage.forEach(s => {
          if (s.startsWith('custom_')) delete updatedCustom[s];
        });
        showToast(`Page ${targetPageNumber} deleted (${sectionsOnThisPage.length} section${sectionsOnThisPage.length > 1 ? 's' : ''} removed)`);
      } else {
        // Full blank page or whitespace overflow
        updatedBreaks = {};
        showToast(`Blank Page ${targetPageNumber} deleted`);
      }

      return {
        ...prev,
        activeSections: updatedActive,
        customSections: updatedCustom,
        pageBreaks: updatedBreaks
      };
    });

    // Auto-compact line spacing if page was blank overflow
    if (sectionsOnThisPage.length === 0) {
      if (lineSpacing === 'relaxed') setLineSpacing('normal');
      else if (lineSpacing === 'normal') setLineSpacing('compact');
    }

    // Reset inline marginTop on all sections immediately
    if (paper) {
      const sectionEls = Array.from(paper.querySelectorAll('.section-wrapper'));
      sectionEls.forEach(el => {
        el.style.marginTop = '';
        delete el.dataset.hasPageBreak;
      });
    }

    // Trigger recalculation
    setTimeout(() => {
      if (window.__recalculateResumePagination) {
        window.__recalculateResumePagination();
      }
    }, 60);
  };

  // Move Section Up/Down
  const moveSection = (sectionId, direction) => {
    updateData(prev => {
      const active = [...(prev.activeSections || [])];
      const index = active.indexOf(sectionId);
      if (index === -1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= active.length) return prev;

      const temp = active[index];
      active[index] = active[targetIndex];
      active[targetIndex] = temp;

      return { ...prev, activeSections: active };
    });
  };

  const moveSectionToPosition = (sectionId, targetIndex) => {
    updateData(prev => {
      const active = [...(prev.activeSections || [])];
      const currentIndex = active.indexOf(sectionId);
      if (currentIndex === -1) return prev;
      const [removed] = active.splice(currentIndex, 1);
      const boundedIndex = Math.max(0, Math.min(targetIndex, active.length));
      active.splice(boundedIndex, 0, removed);
      return { ...prev, activeSections: active };
    });
  };

  // Add Custom Section
  const addCustomSection = (title, styleType = 'bullet') => {
    const id = 'custom_' + Date.now();
    let initialItems = [];

    if (styleType === 'bullet') {
      initialItems = [
        {
          id: 'item-1',
          title: 'Key Project / Role',
          organization: 'Organization / Client',
          date: '2023 – Present',
          location: 'Remote',
          bullets: [
            'Spearheaded initiative delivering high business impact and measurable outcomes',
            'Coordinated cross-functional objectives resulting in 30% process efficiency'
          ]
        }
      ];
    } else if (styleType === 'tags') {
      initialItems = [
        {
          id: 'item-1',
          category: 'Core Competencies',
          tags: ['Analytical Thinking', 'Problem Solving', 'Leadership']
        }
      ];
    } else if (styleType === 'text') {
      initialItems = [
        {
          id: 'item-1',
          text: 'Add your custom narrative, statement, publications list, or philosophy here.'
        }
      ];
    } else {
      initialItems = [
        {
          id: 'item-1',
          title: 'Title / Milestone',
          issuer: 'Awarding Body / Details',
          date: '2023',
          description: 'Recognized for significant achievement and excellence.'
        }
      ];
    }

    updateData(prev => ({
      ...prev,
      customSections: {
        ...(prev.customSections || {}),
        [id]: {
          id,
          title: title || 'Custom Section',
          styleType,
          items: initialItems
        }
      },
      activeSections: [...(prev.activeSections || []), id]
    }));

    showToast(`Added "${title || 'Custom Section'}"! ✨`);
    return id;
  };

  // Delete Section (Universal: works for standard sections and custom sections)
  const deleteSection = (sectionId) => {
    if (!sectionId || sectionId === 'personal') return;

    const labelMap = {
      summary: 'Profile Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      certifications: 'Certifications',
      projects: 'Projects',
      awards: 'Awards & Honors',
      volunteer: 'Volunteering',
      hobbies: 'Hobbies & Passions',
      references: 'References',
      declaration: 'Declaration & Signature'
    };
    const label = labelMap[sectionId] || data.customSections?.[sectionId]?.title || 'Section';

    updateData(prev => {
      const active = (prev.activeSections || []).filter(s => s !== sectionId);
      const nextBreaks = { ...(prev.pageBreaks || {}) };
      delete nextBreaks[sectionId];

      const nextData = {
        ...prev,
        activeSections: active,
        pageBreaks: nextBreaks
      };

      if (sectionId.startsWith('custom_')) {
        const nextCustom = { ...(prev.customSections || {}) };
        delete nextCustom[sectionId];
        nextData.customSections = nextCustom;
      } else {
        if (Array.isArray(prev[sectionId])) {
          nextData[sectionId] = [];
        } else if (sectionId === 'summary') {
          nextData.personal = { ...prev.personal, summary: '' };
        } else if (sectionId === 'declaration') {
          nextData.declaration = {
            title: 'DECLARATION',
            statement: '',
            signeeName: '',
            signatureText: '',
            signatureImage: null,
            date: '',
            place: ''
          };
        }
      }

      return nextData;
    });

    showToast(`Deleted ${label} section`);

    setTimeout(() => {
      if (window.__recalculateResumePagination) {
        window.__recalculateResumePagination();
      }
    }, 60);
  };

  // Delete Custom Section
  const deleteCustomSection = (id) => {
    deleteSection(id);
  };

  // Update Custom Section Title
  const updateCustomSectionTitle = (id, newTitle) => {
    updateData(prev => {
      if (!prev.customSections || !prev.customSections[id]) return prev;
      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [id]: {
            ...prev.customSections[id],
            title: newTitle
          }
        }
      };
    });
  };

  // Add Item to Custom Section
  const addCustomSectionItem = (sectionId) => {
    updateData(prev => {
      const sec = prev.customSections?.[sectionId];
      if (!sec) return prev;
      let newItem;
      if (sec.styleType === 'bullet') {
        newItem = {
          id: 'item-' + Date.now(),
          title: 'New Position / Project',
          organization: 'Company / Organization',
          date: '2024',
          location: '',
          bullets: ['Add achievement bullet point']
        };
      } else if (sec.styleType === 'tags') {
        newItem = {
          id: 'item-' + Date.now(),
          category: 'New Category',
          tags: ['New Skill']
        };
      } else if (sec.styleType === 'text') {
        newItem = {
          id: 'item-' + Date.now(),
          text: 'New paragraph block...'
        };
      } else {
        newItem = {
          id: 'item-' + Date.now(),
          title: 'New Milestone / Honor',
          issuer: 'Issuer / Organization',
          date: '2024',
          description: 'Details'
        };
      }

      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [sectionId]: {
            ...sec,
            items: [...(sec.items || []), newItem]
          }
        }
      };
    });
  };

  // Update Custom Section Item Field
  const updateCustomSectionItem = (sectionId, itemIdx, field, value) => {
    updateData(prev => {
      const sec = prev.customSections?.[sectionId];
      if (!sec) return prev;
      const items = [...(sec.items || [])];
      if (!items[itemIdx]) return prev;
      items[itemIdx] = { ...items[itemIdx], [field]: value };

      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [sectionId]: {
            ...sec,
            items
          }
        }
      };
    });
  };

  // Remove Item from Custom Section
  const removeCustomSectionItem = (sectionId, itemIdx) => {
    updateData(prev => {
      const sec = prev.customSections?.[sectionId];
      if (!sec) return prev;
      const items = (sec.items || []).filter((_, idx) => idx !== itemIdx);

      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [sectionId]: {
            ...sec,
            items
          }
        }
      };
    });
  };

  // Custom Section Bullet Management
  const addCustomSectionBullet = (sectionId, itemIdx, text = 'Spearheaded key milestone with measurable business results') => {
    updateData(prev => {
      const sec = prev.customSections?.[sectionId];
      if (!sec) return prev;
      const items = [...(sec.items || [])];
      if (!items[itemIdx]) return prev;
      const bullets = [...(items[itemIdx].bullets || []), text];
      items[itemIdx] = { ...items[itemIdx], bullets };

      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [sectionId]: {
            ...sec,
            items
          }
        }
      };
    });
  };

  const updateCustomSectionBullet = (sectionId, itemIdx, bIdx, text) => {
    updateData(prev => {
      const sec = prev.customSections?.[sectionId];
      if (!sec) return prev;
      const items = [...(sec.items || [])];
      if (!items[itemIdx]) return prev;
      const bullets = [...(items[itemIdx].bullets || [])];
      bullets[bIdx] = text;
      items[itemIdx] = { ...items[itemIdx], bullets };

      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [sectionId]: {
            ...sec,
            items
          }
        }
      };
    });
  };

  const removeCustomSectionBullet = (sectionId, itemIdx, bIdx) => {
    updateData(prev => {
      const sec = prev.customSections?.[sectionId];
      if (!sec) return prev;
      const items = [...(sec.items || [])];
      if (!items[itemIdx]) return prev;
      const bullets = (items[itemIdx].bullets || []).filter((_, idx) => idx !== bIdx);
      items[itemIdx] = { ...items[itemIdx], bullets };

      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [sectionId]: {
            ...sec,
            items
          }
        }
      };
    });
  };

  // Custom Section Tags Management
  const addCustomSectionTag = (sectionId, itemIdx, tag) => {
    if (!tag || !tag.trim()) return;
    updateData(prev => {
      const sec = prev.customSections?.[sectionId];
      if (!sec) return prev;
      const items = [...(sec.items || [])];
      if (!items[itemIdx]) return prev;
      const tags = [...(items[itemIdx].tags || []), tag.trim()];
      items[itemIdx] = { ...items[itemIdx], tags };

      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [sectionId]: {
            ...sec,
            items
          }
        }
      };
    });
  };

  const removeCustomSectionTag = (sectionId, itemIdx, tagIdx) => {
    updateData(prev => {
      const sec = prev.customSections?.[sectionId];
      if (!sec) return prev;
      const items = [...(sec.items || [])];
      if (!items[itemIdx]) return prev;
      const tags = (items[itemIdx].tags || []).filter((_, idx) => idx !== tagIdx);
      items[itemIdx] = { ...items[itemIdx], tags };

      return {
        ...prev,
        customSections: {
          ...prev.customSections,
          [sectionId]: {
            ...sec,
            items
          }
        }
      };
    });
  };

  // Real-time ATS Strength Score calculation
  const calculateScore = () => {
    let score = 0;
    const p = data.personal;
    if (p.firstName && p.lastName) score += 10;
    if (p.email) score += 10;
    if (p.phone) score += 5;
    if (p.location) score += 5;
    if (p.jobTitle) score += 10;
    if (p.summary && p.summary.length > 50) score += 15;
    if (data.experience.length >= 1) score += 15;
    if (data.experience.length >= 2) score += 5;
    if (data.experience.some(e => e.bullets && e.bullets.length >= 2)) score += 10;
    if (data.education.length >= 1) score += 5;
    if (data.skills.length >= 4) score += 10;
    return Math.min(100, score);
  };

  // Sample Presets Loader
  const loadPreset = (presetKey) => {
    if (presetKey === 'software') {
      setData(DEFAULT_RESUME_DATA);
      setAccentColor('#2DC08D');
      setTemplate('modern');
      showToast('Loaded Software Engineer resume! ✨');
    } else if (presetKey === 'designer') {
      setData({
        ...DEFAULT_RESUME_DATA,
        personal: {
          firstName: 'Maya',
          lastName: 'Lin',
          jobTitle: 'Lead Product & UX Designer',
          email: 'maya.lin.design@email.com',
          phone: '+1 (555) 789-0123',
          location: 'New York, NY',
          website: 'mayalin.design',
          summary: 'Strategic Product Designer with 7+ years delivering user-centered digital products across fintech and enterprise SaaS. Expert in design systems, interaction architecture, and conversion optimization.',
          photo: null
        },
        experience: [
          {
            id: 'exp-d1',
            title: 'Staff Product Designer',
            company: 'FinFlow Global',
            location: 'New York, NY',
            startDate: 'Feb 2021',
            endDate: 'Present',
            current: true,
            bullets: [
              'Led end-to-end redesign of mobile onboarding, elevating user completion rates by 38%',
              'Established company-wide design system "FlowUI" serving 80+ engineers across 4 product squads',
              'Conducted 50+ qualitative user research sessions and usability studies across US and EU markets'
            ]
          },
          {
            id: 'exp-d2',
            title: 'Senior UX Designer',
            company: 'Aura Studio',
            location: 'Brooklyn, NY',
            startDate: 'Jul 2017',
            endDate: 'Jan 2021',
            current: false,
            bullets: [
              'Delivered high-conversion responsive web designs for Fortune 500 media and retail partners',
              'Built comprehensive interactive Figma prototypes facilitating executive consensus'
            ]
          }
        ],
        skills: [
          { id: 'sk-d1', name: 'Figma & Design Systems', level: 98 },
          { id: 'sk-d2', name: 'User Research & Testing', level: 92 },
          { id: 'sk-d3', name: 'Interactive Prototyping', level: 88 },
          { id: 'sk-d4', name: 'Information Architecture', level: 90 },
          { id: 'sk-d5', name: 'HTML5 & CSS3 Design Tokens', level: 78 }
        ]
      });
      setAccentColor('#7C3AED');
      setTemplate('timeline');
      showToast('Loaded Product Designer resume! 🎨');
    } else if (presetKey === 'marketing') {
      setData({
        ...DEFAULT_RESUME_DATA,
        personal: {
          firstName: 'Jordan',
          lastName: 'Taylor',
          jobTitle: 'Growth Marketing Director',
          email: 'jordan.taylor@growth.io',
          phone: '+1 (555) 456-7890',
          location: 'Austin, TX',
          website: 'jordangrowth.com',
          summary: 'Metrics-obsessed growth marketing leader with 8+ years scaling B2B SaaS ARR from $2M to $25M. Deep mastery of performance marketing, organic search engine strategy, and customer lifecycle retention.',
          photo: null
        },
        experience: [
          {
            id: 'exp-m1',
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
          }
        ],
        skills: [
          { id: 'sk-m1', name: 'SEO & SEM Acquisition', level: 95 },
          { id: 'sk-m2', name: 'Google Ads & LinkedIn Ads', level: 92 },
          { id: 'sk-m3', name: 'HubSpot & CRM Lifecycle', level: 90 },
          { id: 'sk-m4', name: 'Google Analytics 4 & Mixpanel', level: 88 }
        ]
      });
      setAccentColor('#0EA5E9');
      setTemplate('executive');
      showToast('Loaded Growth Marketing resume! 📈');
    } else if (presetKey === 'graduate') {
      setData({
        ...DEFAULT_RESUME_DATA,
        personal: {
          firstName: 'Samira',
          lastName: 'Khan',
          jobTitle: 'Junior Data Analyst',
          email: 'samira.khan@alumni.edu',
          phone: '+1 (555) 321-9876',
          location: 'Boston, MA',
          website: 'linkedin.com/in/samirakhan-data',
          summary: 'Driven Data Science honors graduate with strong academic foundation in statistical analysis, Python data wrangling, and predictive modeling. Eager to turn complex datasets into actionable business intelligence.',
          photo: null
        },
        education: [
          {
            id: 'edu-g1',
            degree: 'B.S. in Data Science & Applied Mathematics',
            institution: 'Boston University',
            city: 'Boston',
            location: 'Boston',
            startDate: '2019',
            endDate: '2023',
            gpa: '3.92',
            honors: 'Summa Cum Laude, Phi Beta Kappa'
          }
        ],
        skills: [
          { id: 'sk-g1', name: 'Python (Pandas, Scikit-learn)', level: 92 },
          { id: 'sk-g2', name: 'SQL & Relational Databases', level: 90 },
          { id: 'sk-g3', name: 'Tableau Data Visualization', level: 85 },
          { id: 'sk-g4', name: 'R & Statistical Modeling', level: 80 }
        ]
      });
      setAccentColor('#F59E0B');
      setTemplate('clean');
      showToast('Loaded Recent Graduate resume! 🎓');
    }
  };

  // ─── PDF State Encoding & Decoding Helpers ────────────────────────
  // Standard UTF-8 Base64 encoding/decoding that handles all Unicode characters
  // (emojis, smart quotes, en-dashes, accent marks, Bangla/Arabic text) safely.
  const encodePayload = (obj) => {
    const json = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    const len = bytes.length;
    for (let i = 0; i < len; i += 8192) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + 8192, len)));
    }
    return btoa(binary);
  };

  const decodePayload = (b64) => {
    try {
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return JSON.parse(new TextDecoder('utf-8').decode(bytes));
    } catch {
      // Fallback for older escape/unescape encoding
      try {
        return JSON.parse(decodeURIComponent(escape(atob(b64))));
      } catch {
        return JSON.parse(atob(b64));
      }
    }
  };

  // Safe chunked string extractor for pdf-lib objects (prevents V8 RangeError: Maximum call stack size exceeded)
  const extractStringFromPdfObj = (obj) => {
    if (!obj) return null;
    try {
      if (typeof obj.asBytes === 'function') {
        const bytes = obj.asBytes();
        if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) {
          let result = '';
          const CHUNK = 8192;
          for (let i = 2; i < bytes.length; i += CHUNK * 2) {
            const end = Math.min(i + CHUNK * 2, bytes.length);
            const codes = [];
            for (let j = i; j < end; j += 2) {
              if (j + 1 < bytes.length) {
                codes.push((bytes[j] << 8) | bytes[j + 1]);
              }
            }
            result += String.fromCharCode.apply(null, codes);
          }
          return result;
        }
        let result = '';
        const CHUNK = 8192;
        for (let i = 0; i < bytes.length; i += CHUNK) {
          const end = Math.min(i + CHUNK, bytes.length);
          const codes = [];
          for (let j = i; j < end; j++) {
            codes.push(bytes[j]);
          }
          result += String.fromCharCode.apply(null, codes);
        }
        return result;
      }
      if (typeof obj.asString === 'function') return obj.asString();
      if (typeof obj.value === 'string') return obj.value;
    } catch (e) {
      console.warn('Error reading PDF object:', e);
    }
    return null;
  };

  const buildEmbedPayload = () => {
    const rawPayload = {
      _resumecv: true,
      _v: '3.0',
      template,
      accentColor,
      fontFamily,
      fontSize,
      lineSpacing,
      data
    };
    return {
      rawObj: rawPayload,
      base64: encodePayload(rawPayload)
    };
  };

  const downloadPDF = async () => {
    const paper = document.getElementById('resumePaper');
    if (!paper) return;

    showToast('Generating PDF with edit-state embedded…');
    const p = data.personal;
    const filename = `${p.firstName || 'Resume'}_${p.lastName || ''}_ResumeCV.pdf`.replace(/\s+/g, '_');

    // ── Save on-screen interactive & zoom styles ─────────────────
    const prevTransform = paper.style.transform;
    const prevMarginBottom = paper.style.marginBottom;
    const prevBoxShadow = paper.style.boxShadow;
    const prevBorderRadius = paper.style.borderRadius;
    const prevTransition = paper.style.transition;

    // Temporarily hide all editor-only / interactive elements (.no-print)
    const noPrintEls = paper.querySelectorAll('.no-print');
    noPrintEls.forEach(el => {
      el.setAttribute('data-prev-display', el.style.display || '');
      el.style.setProperty('display', 'none', 'important');
    });

    // Reset paper to true 1:1 unscaled A4 dimensions (prevents zoom from shrinking width & causing huge side margins)
    paper.style.transition = 'none';
    paper.style.transform = 'none';
    paper.style.marginBottom = '0px';
    paper.style.boxShadow = 'none';
    paper.style.borderRadius = '0px';

    // Recalculate pagination at 1:1 scale before canvas rendering
    if (typeof window !== 'undefined' && window.__recalculateResumePagination) {
      window.__recalculateResumePagination(1);
    }

    try {
      // ── Step 1: render to Blob via html2pdf ──────────────────────
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const opt = {
        margin: 0,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
          windowWidth: 794
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      const pdfBlob = await html2pdf().set(opt).from(paper).outputPdf('blob');

      // ── Step 2: embed resume state into PDF metadata via pdf-lib ─
      try {
        const { PDFDocument, PDFName, PDFHexString } = await import('pdf-lib');
        const pdfBytes = await pdfBlob.arrayBuffer();
        const pdfDoc  = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

        const { rawObj, base64: payloadB64 } = buildEmbedPayload();

        // 1. Author line for quick template hint
        pdfDoc.setAuthor(`ResumeCV:${template}:${accentColor}`);
        pdfDoc.setCreator('ResumeCV Builder v3');
        pdfDoc.setProducer('ResumeCV');

        // 2. Subject carries full base64 state for restoration
        pdfDoc.setSubject(`RESUMECV_STATE::${payloadB64}`);
        pdfDoc.setTitle(`${p.firstName || ''} ${p.lastName || ''} – ${p.jobTitle || 'Resume'}`.trim());
        pdfDoc.setKeywords([`template:${template}`, `accent:${accentColor}`, 'resumecv']);

        // 3. Custom InfoDict key for redundancy
        try {
          const infoDict = pdfDoc.getInfoDict();
          infoDict.set(PDFName.of('ResumeCVState'), PDFHexString.fromText(payloadB64));
        } catch (infoErr) {
          console.warn('InfoDict custom key warning:', infoErr);
        }

        // 4. Attach JSON file into PDF catalog as embedded file
        try {
          const jsonBytes = new TextEncoder().encode(JSON.stringify(rawObj));
          await pdfDoc.attach(jsonBytes, 'resumecv_data.json', {
            mimeType: 'application/json',
            description: 'ResumeCV Edit State Data'
          });
        } catch (attachErr) {
          console.warn('PDF attachment skipped:', attachErr);
        }

        const finalBytes = await pdfDoc.save({ useObjectStreams: false });
        const finalBlob  = new Blob([finalBytes], { type: 'application/pdf' });

        // ── Step 3: trigger browser download ──────────────────────
        const url = URL.createObjectURL(finalBlob);
        const a   = document.createElement('a');
        a.href     = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);

        showToast('PDF ready! ✅ You can re-upload it here to continue editing.');
      } catch (pdfLibErr) {
        // If pdf-lib fails just download the raw blob
        console.warn('pdf-lib metadata embedding failed, saving raw PDF:', pdfLibErr);
        const url = URL.createObjectURL(pdfBlob);
        const a   = document.createElement('a');
        a.href     = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        showToast('PDF downloaded! 🎉');
      }

    } catch (err) {
      console.warn('html2pdf error, fallback to print:', err);
      window.print();
    } finally {
      // Restore on-screen interactive & zoom styles ──────────────
      paper.style.transition = prevTransition;
      paper.style.transform = prevTransform;
      paper.style.marginBottom = prevMarginBottom;
      paper.style.boxShadow = prevBoxShadow;
      paper.style.borderRadius = prevBorderRadius;

      // Restore .no-print elements
      noPrintEls.forEach(el => {
        const prev = el.getAttribute('data-prev-display');
        el.removeAttribute('data-prev-display');
        el.style.display = prev;
      });

      if (typeof window !== 'undefined' && window.__recalculateResumePagination) {
        window.__recalculateResumePagination();
      }
    }
  };

  // Export Plain Text for ATS
  const exportPlainText = () => {
    const p = data.personal;
    const lines = [];

    lines.push(`${p.firstName || ''} ${p.lastName || ''}`.trim().toUpperCase());
    if (p.jobTitle) lines.push(p.jobTitle);
    const contact = [p.email, p.phone, p.location, p.website].filter(Boolean).join(' | ');
    if (contact) lines.push(contact);
    lines.push('');

    if (p.summary) {
      lines.push('=== PROFESSIONAL SUMMARY ===');
      lines.push(p.summary);
      lines.push('');
    }

    if (data.experience.length) {
      lines.push('=== WORK EXPERIENCE ===');
      data.experience.forEach(exp => {
        lines.push(`${exp.title} - ${exp.company}${exp.location ? ' (' + exp.location + ')' : ''}`);
        lines.push(`${exp.startDate} – ${exp.endDate}`);
        (exp.bullets || []).filter(b => b.trim()).forEach(b => lines.push(`• ${b}`));
        lines.push('');
      });
    }

    if (data.education.length) {
      lines.push('=== EDUCATION ===');
      data.education.forEach(edu => {
        lines.push(`${edu.degree} - ${edu.institution}${edu.location ? ', ' + edu.location : ''}`);
        lines.push(`${edu.startDate} – ${edu.endDate}${edu.gpa ? ' (GPA: ' + edu.gpa + ')' : ''}`);
        lines.push('');
      });
    }

    if (data.skills.length) {
      lines.push('=== CORE SKILLS ===');
      lines.push(data.skills.map(s => s.name).join(', '));
      lines.push('');
    }

    if ((data.references || []).length) {
      lines.push('=== REFERENCES ===');
      data.references.forEach(r => {
        lines.push(`${r.name}${r.position ? ' - ' + r.position : ''}${r.company ? ' (' + r.company + ')' : ''}`);
        const refContact = [r.email, r.phone].filter(Boolean).join(' | ');
        if (refContact) lines.push(refContact);
        lines.push('');
      });
    }

    if ((data.activeSections || []).includes('declaration') && data.declaration?.statement) {
      lines.push('=== DECLARATION ===');
      lines.push(data.declaration.statement);
      if (data.declaration.signeeName) lines.push(`Signee: ${data.declaration.signeeName}`);
      const meta = [data.declaration.date && `Date: ${data.declaration.date}`, data.declaration.place && `Place: ${data.declaration.place}`].filter(Boolean).join(' | ');
      if (meta) lines.push(meta);
      lines.push('');
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${p.firstName || 'Resume'}_${p.lastName || ''}_Resume.txt`.replace(/\s+/g, '_');
    a.click();
    URL.revokeObjectURL(url);
    showToast('Plain text ATS resume downloaded!');
  };

  // ────────────────────────────────────────────────────────────
  // Editing-mode state  (tracks which file is being edited)
  // ────────────────────────────────────────────────────────────
  const [editingFileName, setEditingFileName] = useState(() => {
    try { return localStorage.getItem('resumecv_editing_file') || null; } catch { return null; }
  });

  const setEditingFile = (name) => {
    setEditingFileName(name);
    try {
      if (name) localStorage.setItem('resumecv_editing_file', name);
      else localStorage.removeItem('resumecv_editing_file');
    } catch {}
  };

  // ────────────────────────────────────────────────────────────
  // normalizeImportedData – ensures every section has required
  // fields and IDs so the canvas renders without errors
  // ────────────────────────────────────────────────────────────
  const normalizeImportedData = (raw) => {
    const makeid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    // ── personal ───────────────────────────────────────────────
    const personal = {
      firstName: '', lastName: '', jobTitle: '',
      email: '', phone: '', location: '',
      website: '', summary: '', photo: null,
      ...(raw.personal || {})
    };

    // ── helper: ensure each item has a stable id ────────────────
    const normalizeList = (arr, prefix, defaults = {}) =>
      (Array.isArray(arr) ? arr : []).map((item, i) => ({
        ...defaults,
        ...item,
        id: item.id || makeid(prefix)
      }));

    // ── experience ────────────────────────────────────────────
    const experience = normalizeList(raw.experience, 'exp').map(exp => {
      const bullets = Array.isArray(exp.bullets) ? exp.bullets : [];
      return { title: '', company: '', location: '', startDate: '', endDate: '', current: false, ...exp, bullets };
    });

    // ── education ────────────────────────────────────────────
    const education = normalizeList(raw.education, 'edu').map(edu => {
      const city = edu.city || (edu.location && !edu.location.includes(',')
        ? edu.location
        : (edu.location || '').split(',')[0].trim());
      return { degree: '', institution: '', location: '', year: '', gradeType: 'CGPA', gpa: '', honors: '', ...edu, city };
    });

    // ── skills ────────────────────────────────────────────────
    const skills = normalizeList(raw.skills, 'sk').map(s => {
      let name = s.name;
      if (typeof name === 'object' && name !== null) {
        name = name.name || 'Skill';
      }
      return {
        id: s.id || `sk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: String(name || ''),
        level: typeof s.level === 'number' ? s.level : (parseInt(s.level) || 80)
      };
    });

    // ── languages ────────────────────────────────────────────
    const languages = normalizeList(raw.languages, 'lang').map(l => ({
      name: '', level: '', ...l
    }));

    // ── certifications ───────────────────────────────────────
    const certifications = normalizeList(raw.certifications, 'cert').map(c => ({
      name: '', issuer: '', date: '', ...c
    }));

    // ── projects ─────────────────────────────────────────────
    const projects = normalizeList(raw.projects, 'proj').map(p => ({
      name: '', url: '', description: '', technologies: '', ...p
    }));

    // ── awards ───────────────────────────────────────────────
    const awards = normalizeList(raw.awards, 'aw').map(a => ({
      title: '', issuer: '', date: '', description: '', ...a
    }));

    // ── volunteer ────────────────────────────────────────────
    const volunteer = normalizeList(raw.volunteer, 'vol').map(v => {
      const bullets = Array.isArray(v.bullets) ? v.bullets : [];
      return { role: '', organization: '', startDate: '', endDate: '', ...v, bullets };
    });

    // ── hobbies ──────────────────────────────────────────────
    const hobbies = normalizeList(raw.hobbies, 'hob').map(h => ({
      name: '', description: '', ...h
    }));

    // ── publications & references ─────────────────────────────
    const publications = normalizeList(raw.publications, 'pub');
    const references   = normalizeList(raw.references, 'ref');

    // ── declaration ───────────────────────────────────────────
    const declaration = raw.declaration ? {
      title: raw.declaration.title || 'DECLARATION',
      statement: raw.declaration.statement !== undefined ? raw.declaration.statement : 'The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge.',
      signeeName: raw.declaration.signeeName || '',
      signatureText: raw.declaration.signatureText || '',
      signatureImage: raw.declaration.signatureImage || null,
      date: raw.declaration.date || '',
      place: raw.declaration.place || ''
    } : {
      title: 'DECLARATION',
      statement: 'The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge.',
      signeeName: '',
      signatureText: '',
      signatureImage: null,
      date: '',
      place: ''
    };

    // ── customSections ────────────────────────────────────────
    const customSections = raw.customSections || {};

    // ── activeSections – preserve order, fill in missing sections
    const defaultOrder = ['personal', 'summary', 'experience', 'education', 'skills',
      'languages', 'certifications', 'projects', 'awards', 'volunteer', 'hobbies'];
    const activeSections = Array.isArray(raw.activeSections)
      ? raw.activeSections
      : defaultOrder.filter(s => {
          if (s === 'personal') return true;
          if (s === 'summary') return !!personal.summary;
          const map = { experience, education, skills, languages, certifications,
                        projects, awards, volunteer, hobbies, publications, references };
          return map[s]?.length > 0;
        });

    return {
      personal, experience, education, skills, languages,
      certifications, projects, awards, volunteer,
      publications, hobbies, references, declaration,
      sectionColumns: raw.sectionColumns || {},
      customSections, activeSections,
      pageBreaks: raw.pageBreaks || {}
    };
  };

  // JSON Backup Export  (adds appName + schema version for future proofing)
  const exportJson = () => {
    const backup = {
      appName: 'ResumeCV',
      version: '3.0',
      exportedAt: new Date().toISOString(),
      state: { template, accentColor, fontFamily, fontSize, lineSpacing },
      data
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personal.firstName || 'Resume'}_${data.personal.lastName || ''}_ResumeCV.json`.replace(/\s+/g, '_');
    a.click();
    URL.revokeObjectURL(url);
    showToast('Resume backup exported! 💾 Open it later to continue editing.');
  };

  // ────────────────────────────────────────────────────────────
  // importJson  – smart importer with full state restoration
  // ────────────────────────────────────────────────────────────
  const importJson = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);

        // ── Determine raw data section ─────────────────────────
        let rawData = null;
        if (parsed.data && typeof parsed.data === 'object') {
          rawData = parsed.data;            // v2 / v3 format
        } else if (parsed.personal) {
          rawData = parsed;                 // bare data object
        }

        if (!rawData) {
          alert('This file does not appear to be a valid ResumeCV backup.');
          return;
        }

        // ── Normalize & restore data ───────────────────────────
        const normalized = normalizeImportedData(rawData);
        setData(normalized);

        // ── Restore design state ───────────────────────────────
        const state = parsed.state || {};
        if (state.template)     setTemplate(state.template);
        if (state.accentColor)  setAccentColor(state.accentColor);
        if (state.fontFamily)   setFontFamily(state.fontFamily);
        if (state.fontSize)     setFontSize(state.fontSize);
        if (state.lineSpacing)  setLineSpacing(state.lineSpacing);

        // ── Mark editing mode ─────────────────────────────────
        const displayName = file.name.replace(/\.json$/i, '').replace(/_/g, ' ');
        setEditingFile(displayName);

        showToast(`✏️ Editing: ${displayName}`);
      } catch (err) {
        console.error('Import error:', err);
        alert('Could not read this file. Make sure it is a valid ResumeCV JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  const exitEditingMode = () => {
    setEditingFile(null);
    showToast('Editing mode cleared.');
  };

  // ────────────────────────────────────────────────────────────
  // importPdf – upload a ResumeCV-generated PDF and restore state
  // Fully offline, worker-free, zero-CDN implementation using pdf-lib.
  // Supports:
  // 1. Embedded JSON attachment ('resumecv_data.json')
  // 2. Metadata Subject field ('RESUMECV_STATE::<b64>')
  // 3. Custom InfoDict key ('ResumeCVState')
  // 4. Metadata Author line ('ResumeCV:<template>:<accentColor>')
  // ────────────────────────────────────────────────────────────
  const importPdf = async (file) => {
    showToast('Reading PDF… please wait.');

    try {
      const { PDFDocument, PDFName } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      let payload = null;

      // ── Method 1: Check embedded file attachment 'resumecv_data.json' ──
      try {
        const names = pdfDoc.catalog.lookup(PDFName.of('Names'));
        if (names) {
          const embeddedFiles = names.lookup(PDFName.of('EmbeddedFiles'));
          if (embeddedFiles) {
            const efNames = embeddedFiles.lookup(PDFName.of('Names'));
            if (efNames) {
              for (let i = 0; i < efNames.size(); i += 2) {
                const fileSpecRef = efNames.get(i + 1);
                const fileSpec = pdfDoc.context.lookup(fileSpecRef);
                const efDict = pdfDoc.context.lookup(fileSpec.lookup(PDFName.of('EF')));
                const stream = pdfDoc.context.lookup(efDict.lookup(PDFName.of('F')));
                if (stream) {
                  const rawBytes = stream.getContents();
                  try {
                    let jsonStr = null;
                    try {
                      const decoded = new TextDecoder('utf-8').decode(rawBytes);
                      if (decoded.trim().startsWith('{')) jsonStr = decoded;
                    } catch {}
                    if (!jsonStr) {
                      try {
                        const pakoModule = await import('pako');
                        const pako = pakoModule.default || pakoModule;
                        if (pako?.inflate) jsonStr = pako.inflate(rawBytes, { to: 'string' });
                      } catch {}
                    }
                    if (jsonStr) {
                      const parsed = JSON.parse(jsonStr);
                      if (parsed._resumecv || parsed.data || parsed.personal) {
                        payload = parsed;
                        break;
                      }
                    }
                  } catch {}
                }
              }
            }
          }
        }
      } catch (attachErr) {
        console.warn('Attachment check error:', attachErr);
      }

      // ── Method 2: Extract from Info dictionary (Subject or ResumeCVState) ──
      if (!payload) {
        try {
          const infoDict = pdfDoc.getInfoDict();
          const stateMarker = 'RESUMECV_STATE::';

          // Try Subject
          const subjectObj = infoDict.get(PDFName.of('Subject'));
          const subjectStr = extractStringFromPdfObj(subjectObj);
          if (subjectStr && subjectStr.includes(stateMarker)) {
            const b64 = subjectStr.slice(subjectStr.indexOf(stateMarker) + stateMarker.length).trim();
            payload = decodePayload(b64);
          }

          // Try custom ResumeCVState key
          if (!payload) {
            const customObj = infoDict.get(PDFName.of('ResumeCVState'));
            const customStr = extractStringFromPdfObj(customObj);
            if (customStr) {
              const b64 = customStr.startsWith(stateMarker)
                ? customStr.slice(stateMarker.length).trim()
                : customStr.trim();
              payload = decodePayload(b64);
            }
          }
        } catch (subErr) {
          console.warn('Subject check error:', subErr);
        }
      }

      // ── Method 3: Template hint fallback from Author ────────────
      if (!payload) {
        try {
          const infoDict = pdfDoc.getInfoDict();
          const authorObj = infoDict.get(PDFName.of('Author'));
          const authorStr = extractStringFromPdfObj(authorObj) || '';
          if (authorStr.startsWith('ResumeCV:')) {
            const parts = authorStr.split(':');
            const templateHint = parts[1];
            const accentHint = parts[2];
            if (templateHint) setTemplate(templateHint);
            if (accentHint) setAccentColor(accentHint);
            const displayName = file.name.replace(/\.pdf$/i, '').replace(/_/g, ' ');
            setEditingFile(displayName);
            showToast('⚠️ Restored template & accent color from PDF header.');
            return;
          }
        } catch {}

        alert('This PDF does not contain ResumeCV edit data. Make sure it was downloaded from this site.');
        return;
      }

      // ── Successfully extracted payload! ─────────────────────────
      let rawData = null;
      if (payload.data && typeof payload.data === 'object') {
        rawData = payload.data;
      } else if (payload.personal) {
        rawData = payload;
      } else {
        rawData = {};
      }

      // ── Restore resume data ──────────────────────────────────
      const normalized = normalizeImportedData(rawData);
      setData(normalized);

      // ── Restore exact template + design ─────────────────────
      if (payload.template)    setTemplate(payload.template);
      if (payload.accentColor) setAccentColor(payload.accentColor);
      if (payload.fontFamily)  setFontFamily(payload.fontFamily);
      if (payload.fontSize)    setFontSize(payload.fontSize);
      if (payload.lineSpacing) setLineSpacing(payload.lineSpacing);

      // ── Activate editing mode banner ─────────────────────────
      const displayName = file.name.replace(/\.pdf$/i, '').replace(/_/g, ' ');
      setEditingFile(displayName);

      showToast(`✏️ Resumed editing: ${displayName} (${payload.template || 'template'} restored)`);
    } catch (err) {
      console.error('PDF import error:', err);
      alert('Could not read this PDF. Make sure it was exported from ResumeCV Builder.');
    }
  };

  // Clear Resume
  const clearResume = () => {
    setData({
      personal: { firstName: '', lastName: '', jobTitle: '', email: '', phone: '', location: '', website: '', summary: '', photo: null },
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
      customSections: {},
      activeSections: ['personal', 'summary', 'experience', 'education', 'skills']
    });
    setEditingFile(null);
    showToast('Resume cleared! Ready for fresh content.');
  };

  const value = {
    data,
    updatePersonal,
    updateExperience,
    addExperience,
    removeExperience,
    addBullet,
    updateBullet,
    removeBullet,
    updateEducation,
    addEducation,
    removeEducation,
    updateSkill,
    addSkill,
    removeSkill,
    updateLanguage,
    addLanguage,
    removeLanguage,
    updateCertification,
    addCertification,
    removeCertification,
    updateProject,
    addProject,
    removeProject,
    updateAward,
    addAward,
    removeAward,
    updateVolunteer,
    addVolunteer,
    removeVolunteer,
    updateHobby,
    addHobby,
    removeHobby,
    addReference,
    updateReference,
    removeReference,
    updateDeclaration,
    setSectionColumn,
    toggleSectionColumn,
    toggleSection,
    toggleSectionPageBreak,
    deletePage,
    deleteSection,
    sectionMargins,
    setSectionMargins,
    moveSection,
    moveSectionToPosition,
    addCustomSection,
    deleteCustomSection,
    updateCustomSectionTitle,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem,
    addCustomSectionBullet,
    updateCustomSectionBullet,
    removeCustomSectionBullet,
    addCustomSectionTag,
    removeCustomSectionTag,
    template,
    setTemplate,
    accentColor,
    setAccentColor,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    lineSpacing,
    setLineSpacing,
    zoom,
    setZoom,
    activeTab,
    setActiveTab,
    calculateScore,
    loadPreset,
    downloadPDF,
    exportPlainText,
    exportJson,
    importJson,
    importPdf,
    clearResume,
    editingFileName,
    exitEditingMode,
    undo,
    redo,
    toastMessage,
    showToast
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
}
