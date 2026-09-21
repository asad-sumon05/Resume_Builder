import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { X, Check, Plus, ArrowUp, ArrowDown, Trash2, Layers, Sparkles } from 'lucide-react';

const STANDARD_SECTIONS = [
  { id: 'summary', name: 'Professional Summary', icon: '📝', desc: 'Career overview, highlights & executive statement' },
  { id: 'experience', name: 'Work Experience', icon: '💼', desc: 'Roles, company names, achievements & impact' },
  { id: 'education', name: 'Education', icon: '🎓', desc: 'Degrees, universities, honors & coursework' },
  { id: 'skills', name: 'Skills & Proficiencies', icon: '⚡', desc: 'Core competencies, tools, and technical skill pills' },
  { id: 'projects', name: 'Key Projects', icon: '🚀', desc: 'Independent projects, apps, and portfolios' },
  { id: 'certifications', name: 'Certifications', icon: '🏆', desc: 'Accreditations, licenses, and verified courses' },
  { id: 'languages', name: 'Languages', icon: '🌐', desc: 'Foreign languages and fluency ratings' },
  { id: 'awards', name: 'Awards & Honors', icon: '⭐', desc: 'Competitions, distinctions, and recognitions' },
  { id: 'volunteer', name: 'Volunteering', icon: '❤️', desc: 'Community leadership, causes, and mentoring' },
  { id: 'hobbies', name: 'Hobbies & Passions', icon: '🎯', desc: 'Extracurricular interests outside of work' }
];

const STYLE_OPTIONS = [
  {
    type: 'bullet',
    name: 'Bullet Achievements',
    icon: '💼',
    desc: 'Position title, organization, dates, location & bullet points (like Work Experience)'
  },
  {
    type: 'tags',
    name: 'Skills & Tags (Pills)',
    icon: '⚡',
    desc: 'Category titles with interactive skill pill badges (like Skills)'
  },
  {
    type: 'text',
    name: 'Paragraph / Narrative',
    icon: '📝',
    desc: 'Clean multi-line descriptive narrative block (like Professional Summary)'
  },
  {
    type: 'simple',
    name: 'Simple List (Details)',
    icon: '🏆',
    desc: 'Title, conferring body/issuer, date & brief summary (like Certifications/Awards)'
  }
];

export default function AddSectionModal({ isOpen, onClose }) {
  const {
    data,
    toggleSection,
    moveSection,
    addCustomSection,
    deleteCustomSection,
    accentColor,
    showToast
  } = useResume();

  const [activeTab, setActiveTab] = useState('standard'); // 'standard' | 'custom' | 'reorder'
  const [customTitle, setCustomTitle] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('bullet');

  if (!isOpen) return null;

  const active = data.activeSections || [];
  const customSecs = data.customSections || {};

  const handleToggle = (id, name) => {
    toggleSection(id);
    const willBeActive = !active.includes(id);
    showToast(`${name} ${willBeActive ? 'added to' : 'hidden from'} resume!`);
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) {
      showToast('Please enter a section title');
      return;
    }
    addCustomSection(customTitle.trim(), selectedStyle);
    setCustomTitle('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '640px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        {/* MODAL HEADER */}
        <div className="modal-header" style={{ paddingBottom: '12px' }}>
          <div>
            <h2 className="modal-title">Manage Resume Sections</h2>
            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
              Add predefined sections, create custom sections, or reorder them.
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', padding: '0 24px 12px 24px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('standard')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'standard' ? accentColor : '#f1f5f9',
              color: activeTab === 'standard' ? '#ffffff' : '#475569',
              fontWeight: '600',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Predefined Sections
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'custom' ? accentColor : '#f1f5f9',
              color: activeTab === 'custom' ? '#ffffff' : '#475569',
              fontWeight: '600',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Plus size={14} /> Create Custom Section
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reorder')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'reorder' ? accentColor : '#f1f5f9',
              color: activeTab === 'reorder' ? '#ffffff' : '#475569',
              fontWeight: '600',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Layers size={14} /> Reorder ({active.length})
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {/* TAB 1: PREDEFINED SECTIONS */}
          {activeTab === 'standard' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {STANDARD_SECTIONS.map((sec) => {
                const isActive = active.includes(sec.id);
                return (
                  <div
                    key={sec.id}
                    onClick={() => handleToggle(sec.id, sec.name)}
                    style={{
                      border: isActive ? `1.5px solid ${accentColor}` : '1.5px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      background: isActive ? '#f0fdf9' : '#ffffff',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                        <span>{sec.icon}</span>
                        <span>{sec.name}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px', lineHeight: '1.4' }}>
                        {sec.desc}
                      </div>
                    </div>

                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: isActive ? `2px solid ${accentColor}` : '2px solid #cbd5e1',
                        background: isActive ? accentColor : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {isActive && <Check size={12} color="white" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: CREATE CUSTOM SECTION */}
          {activeTab === 'custom' && (
            <form onSubmit={handleCreateCustom} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                  Section Title
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Publications, Key Achievements, Volunteer Work, Patents..."
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  autoFocus
                  style={{ width: '100%', boxSizing: 'border-box', fontSize: '13px', padding: '10px 12px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                  Choose Section Style & Layout
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {STYLE_OPTIONS.map((opt) => {
                    const isSelected = selectedStyle === opt.type;
                    return (
                      <div
                        key={opt.type}
                        onClick={() => setSelectedStyle(opt.type)}
                        style={{
                          border: isSelected ? `2px solid ${accentColor}` : '1.5px solid #e2e8f0',
                          background: isSelected ? '#f0fdf9' : '#ffffff',
                          borderRadius: '8px',
                          padding: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                          <span>{opt.icon}</span>
                          <span>{opt.name}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                          {opt.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-ghost"
                  style={{ padding: '8px 16px', fontSize: '12.5px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '12.5px', background: accentColor, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={15} />
                  Add to Resume
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: REORDER ACTIVE SECTIONS */}
          {activeTab === 'reorder' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px 0' }}>
                Use the <strong>↑ Move Up</strong> and <strong>↓ Move Down</strong> buttons to customize the order of sections on your resume.
              </p>
              {active.map((secId, idx) => {
                const isCustom = secId.startsWith('custom_');
                const customSec = isCustom ? customSecs[secId] : null;
                const stdSec = STANDARD_SECTIONS.find(s => s.id === secId);
                const title = isCustom ? (customSec?.title || 'Custom Section') : (stdSec?.name || (secId === 'personal' ? 'Personal Details' : secId));
                const icon = isCustom ? '📄' : (stdSec?.icon || (secId === 'personal' ? '👤' : '•'));

                return (
                  <div
                    key={secId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700', width: '20px' }}>#{idx + 1}</span>
                      <span style={{ fontSize: '14px' }}>{icon}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                        {title}
                        {isCustom && <span style={{ marginLeft: '6px', fontSize: '10px', color: accentColor, background: `${accentColor}18`, padding: '2px 6px', borderRadius: '4px' }}>Custom</span>}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveSection(secId, 'up')}
                        style={{
                          background: idx === 0 ? '#f1f5f9' : '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          cursor: idx === 0 ? 'not-allowed' : 'pointer',
                          color: idx === 0 ? '#cbd5e1' : '#334155',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={idx === active.length - 1}
                        onClick={() => moveSection(secId, 'down')}
                        style={{
                          background: idx === active.length - 1 ? '#f1f5f9' : '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          cursor: idx === active.length - 1 ? 'not-allowed' : 'pointer',
                          color: idx === active.length - 1 ? '#cbd5e1' : '#334155',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>

                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => deleteCustomSection(secId)}
                          style={{
                            background: '#fff5f5',
                            border: '1px solid #fecaca',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            color: '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '6px'
                          }}
                          title="Delete Custom Section"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
