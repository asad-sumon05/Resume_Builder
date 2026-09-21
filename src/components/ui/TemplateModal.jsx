import React from 'react';
import { useResume, TEMPLATES } from '../../context/ResumeContext';

export default function TemplateModal({ isOpen, onClose }) {
  const { template, setTemplate, accentColor, showToast } = useResume();

  if (!isOpen) return null;

  const handleSelect = (tmplId, tmplName) => {
    setTemplate(tmplId);
    showToast(`Template changed to ${tmplName}! ✨`);
    onClose();
  };

  const renderMiniPreview = (tmplId) => {
    const isDark = tmplId === 'tech' || tmplId === 'darkpro';
    const isSidebar = ['modern', 'startup', 'bold', 'fresh'].includes(tmplId);

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: isDark ? '#0f172a' : '#ffffff',
          display: 'flex',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          overflow: 'hidden',
          padding: isSidebar ? 0 : '12px'
        }}
      >
        {isSidebar && (
          <div style={{ width: '30%', background: '#1a1a2e', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: accentColor }} />
            <div style={{ width: '80%', height: '4px', background: 'white', opacity: 0.8, borderRadius: '2px' }} />
            <div style={{ width: '60%', height: '3px', background: accentColor, borderRadius: '2px', marginTop: '2px' }} />
            <div style={{ width: '90%', height: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', marginTop: 'auto' }} />
          </div>
        )}
        <div style={{ flex: 1, padding: isSidebar ? '8px' : 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ width: '50%', height: '6px', background: isDark ? '#f8fafc' : '#0f172a', borderRadius: '2px' }} />
          <div style={{ width: '35%', height: '4px', background: accentColor, borderRadius: '2px' }} />
          <div style={{ width: '100%', height: '1px', background: '#e2e8f0', margin: '2px 0' }} />
          <div style={{ width: '90%', height: '3px', background: isDark ? '#334155' : '#cbd5e1', borderRadius: '2px' }} />
          <div style={{ width: '80%', height: '3px', background: isDark ? '#334155' : '#cbd5e1', borderRadius: '2px' }} />
          <div style={{ width: '85%', height: '3px', background: isDark ? '#334155' : '#cbd5e1', borderRadius: '2px' }} />
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Choose a Template</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="modal-templates-grid">
          {TEMPLATES.map((tmpl) => {
            const isSelected = template === tmpl.id;

            return (
              <div
                key={tmpl.id}
                className={`modal-template-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(tmpl.id, tmpl.name)}
              >
                <div className="modal-template-preview" style={{ padding: '12px' }}>
                  {renderMiniPreview(tmpl.id)}
                </div>
                <div className="modal-template-info">
                  <div className="modal-template-name">{tmpl.name}</div>
                  <div className="modal-template-desc">{tmpl.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
