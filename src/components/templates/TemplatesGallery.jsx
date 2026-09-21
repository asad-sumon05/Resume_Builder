import React, { useState } from 'react';
import { useResume, TEMPLATES } from '../../context/ResumeContext';
import { Check, ArrowRight, Sparkles, Shield, Palette } from 'lucide-react';

export default function TemplatesGallery() {
  const { template, setTemplate, setActiveTab, accentColor, setAccentColor, showToast } = useResume();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Templates' },
    { id: 'ats', label: 'ATS-Friendly' },
    { id: 'modern', label: 'Modern & Dual-Column' },
    { id: 'tech', label: 'Tech & Engineering' },
    { id: 'executive', label: 'Senior & Executive' }
  ];

  const colorPalette = [
    { name: 'Emerald', hex: '#2DC08D' },
    { name: 'Ocean', hex: '#2563EB' },
    { name: 'Indigo', hex: '#6366F1' },
    { name: 'Violet', hex: '#8B5CF6' },
    { name: 'Crimson', hex: '#E11D48' },
    { name: 'Slate', hex: '#334155' }
  ];

  const getFilteredTemplates = () => {
    if (selectedFilter === 'all') return TEMPLATES;
    if (selectedFilter === 'ats') return TEMPLATES.filter(t => ['clean', 'minimal', 'academic'].includes(t.id));
    if (selectedFilter === 'modern') return TEMPLATES.filter(t => ['modern', 'startup', 'timeline'].includes(t.id));
    if (selectedFilter === 'tech') return TEMPLATES.filter(t => ['tech', 'modern'].includes(t.id));
    if (selectedFilter === 'executive') return TEMPLATES.filter(t => ['executive', 'clean'].includes(t.id));
    return TEMPLATES;
  };

  const handleUseTemplate = (tmplId, tmplName) => {
    setTemplate(tmplId);
    setActiveTab('builder');
    showToast(`Switched to ${tmplName} template!`);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 60px)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', background: '#e0f2fe', color: '#0369a1', fontSize: '13px', fontWeight: '700', marginBottom: '14px' }}>
            <Sparkles size={14} />
            <span>Curated Designer & ATS Resume Templates</span>
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Choose the Perfect Resume Template
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '640px', margin: '0 auto 24px' }}>
            All templates are 100% free, fully customizable on-canvas, and built to pass Application Tracking Systems (ATS) with flying colors.
          </p>

          {/* Quick Color Chooser */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'white', padding: '8px 16px', borderRadius: '100px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <Palette size={15} color="#64748b" />
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Primary Accent:</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {colorPalette.map(c => (
                <button
                  key={c.hex}
                  onClick={() => setAccentColor(c.hex)}
                  title={c.name}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: c.hex,
                    border: accentColor === c.hex ? '2px solid #0f172a' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    outline: 'none',
                    transition: 'transform 0.15s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                border: 'none',
                background: selectedFilter === f.id ? '#0f172a' : 'white',
                color: selectedFilter === f.id ? 'white' : '#475569',
                boxShadow: selectedFilter === f.id ? '0 2px 8px rgba(15,23,42,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'all 0.15s ease'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {getFilteredTemplates().map(tmpl => {
            const isCurrent = template === tmpl.id;
            return (
              <div
                key={tmpl.id}
                style={{
                  background: 'white',
                  borderRadius: '14px',
                  border: isCurrent ? `2px solid ${accentColor}` : '1.5px solid #e2e8f0',
                  overflow: 'hidden',
                  boxShadow: isCurrent ? '0 10px 25px -5px rgba(45, 192, 141, 0.25)' : '0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                {/* Template Mock Preview Canvas */}
                <div
                  style={{
                    height: '240px',
                    background: tmpl.id === 'tech' ? '#0f172a' : '#f8fafc',
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: '1px solid #f1f5f9'
                  }}
                >
                  {/* Tag badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: tmpl.id === 'tech' ? '#1e293b' : 'white',
                      color: tmpl.id === 'tech' ? '#38bdf8' : '#0f172a',
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    {tmpl.tag || 'Standard'}
                  </span>

                  {/* Header mock */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: accentColor, opacity: 0.9 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ height: '10px', width: '55%', background: tmpl.id === 'tech' ? '#f8fafc' : '#0f172a', borderRadius: '3px', marginBottom: '5px' }} />
                      <div style={{ height: '6px', width: '35%', background: accentColor, borderRadius: '2px' }} />
                    </div>
                  </div>

                  {/* Body columns mock */}
                  <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ height: '6px', width: '40%', background: tmpl.id === 'tech' ? '#94a3b8' : '#475569', borderRadius: '2px' }} />
                      <div style={{ height: '4px', width: '90%', background: tmpl.id === 'tech' ? '#334155' : '#e2e8f0', borderRadius: '2px' }} />
                      <div style={{ height: '4px', width: '80%', background: tmpl.id === 'tech' ? '#334155' : '#e2e8f0', borderRadius: '2px' }} />
                      <div style={{ height: '4px', width: '85%', background: tmpl.id === 'tech' ? '#334155' : '#e2e8f0', borderRadius: '2px' }} />
                      <div style={{ height: '6px', width: '50%', background: tmpl.id === 'tech' ? '#94a3b8' : '#475569', borderRadius: '2px', marginTop: '4px' }} />
                      <div style={{ height: '4px', width: '95%', background: tmpl.id === 'tech' ? '#334155' : '#e2e8f0', borderRadius: '2px' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: tmpl.id === 'modern' ? `2px solid ${accentColor}` : 'none', paddingLeft: tmpl.id === 'modern' ? '8px' : '0' }}>
                      <div style={{ height: '5px', width: '60%', background: tmpl.id === 'tech' ? '#64748b' : '#94a3b8', borderRadius: '2px' }} />
                      <div style={{ height: '4px', width: '100%', background: tmpl.id === 'tech' ? '#334155' : '#e2e8f0', borderRadius: '2px' }} />
                      <div style={{ height: '4px', width: '80%', background: tmpl.id === 'tech' ? '#334155' : '#e2e8f0', borderRadius: '2px' }} />
                      <div style={{ height: '5px', width: '50%', background: tmpl.id === 'tech' ? '#64748b' : '#94a3b8', borderRadius: '2px', marginTop: '4px' }} />
                      <div style={{ height: '4px', width: '70%', background: tmpl.id === 'tech' ? '#334155' : '#e2e8f0', borderRadius: '2px' }} />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{tmpl.name}</h3>
                    {isCurrent && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '100px' }}>
                        <Check size={12} strokeWidth={3} /> Active
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
                    {tmpl.desc}
                  </p>

                  <button
                    onClick={() => handleUseTemplate(tmpl.id, tmpl.name)}
                    className={isCurrent ? '' : 'btn-primary-gradient'}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      border: isCurrent ? '1.5px solid #0f172a' : 'none',
                      background: isCurrent ? '#0f172a' : undefined,
                      color: isCurrent ? 'white' : undefined
                    }}
                  >
                    <span>{isCurrent ? 'Continue Editing' : 'Use This Template'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
