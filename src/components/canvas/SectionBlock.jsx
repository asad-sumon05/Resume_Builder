import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import EditableText from './EditableText';
import { ArrowUp, ArrowDown, MoveVertical, ArrowUpToLine, ArrowDownToLine, MoreVertical } from 'lucide-react';

export default function SectionBlock({
  sectionId,
  title,
  onTitleChange,
  accentColor = '#2DC08D',
  children,
  className = '',
  style = {}
}) {
  const { data, moveSection, moveSectionToPosition } = useResume();
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const activeSections = data.activeSections || [];
  const currentIndex = sectionId ? activeSections.indexOf(sectionId) : -1;
  const canMoveUp = currentIndex > 0 && !(currentIndex === 1 && activeSections[0] === 'personal');
  const canMoveDown = currentIndex >= 0 && currentIndex < activeSections.length - 1;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Section name resolver for dropdown
  const getSectionLabel = (secId) => {
    switch (secId) {
      case 'personal': return 'Header / Contact';
      case 'summary': return 'Profile Summary';
      case 'experience': return 'Work Experience';
      case 'education': return 'Education';
      case 'skills': return 'Core Skills';
      case 'projects': return 'Key Projects';
      case 'certifications': return 'Certifications';
      case 'languages': return 'Languages';
      case 'awards': return 'Awards & Honors';
      case 'volunteer': return 'Volunteering';
      case 'hobbies': return 'Hobbies & Passions';
      default:
        if (secId.startsWith('custom_')) {
          return data.customSections?.[secId]?.title || 'Custom Section';
        }
        return secId;
    }
  };

  return (
    <section
      className={`section-wrapper ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMenuOpen(false);
      }}
      style={{
        position: 'relative',
        marginBottom: '20px',
        borderRadius: '6px',
        transition: 'all 0.15s ease',
        boxShadow: isHovered ? `0 0 0 1px ${accentColor}40` : 'none',
        ...style
      }}
    >
      {/* FLOATING HOVER ACTION TOOLBAR (Hidden in Print/PDF) */}
      {sectionId && (isHovered || isMenuOpen) && (
        <div
          data-html2canvas-ignore="true"
          className="section-hover-toolbar no-print"
          style={{
            position: 'absolute',
            top: '-13px',
            right: '8px',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            padding: '2px 6px',
            animation: 'fadeIn 0.15s ease'
          }}
        >
          <span style={{ fontSize: '9px', fontWeight: '700', color: '#64748b', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Section
          </span>

          {/* Move Up */}
          <button
            type="button"
            title="Move Section Up"
            disabled={!canMoveUp}
            onClick={(e) => {
              e.stopPropagation();
              moveSection(sectionId, 'up');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              border: 'none',
              background: canMoveUp ? '#f1f5f9' : 'transparent',
              color: canMoveUp ? '#1e293b' : '#cbd5e1',
              cursor: canMoveUp ? 'pointer' : 'default',
              transition: 'background 0.15s'
            }}
            onMouseEnter={(e) => { if (canMoveUp) e.currentTarget.style.background = `${accentColor}20`; }}
            onMouseLeave={(e) => { if (canMoveUp) e.currentTarget.style.background = '#f1f5f9'; }}
          >
            <ArrowUp size={12} />
          </button>

          {/* Move Down */}
          <button
            type="button"
            title="Move Section Down"
            disabled={!canMoveDown}
            onClick={(e) => {
              e.stopPropagation();
              moveSection(sectionId, 'down');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              border: 'none',
              background: canMoveDown ? '#f1f5f9' : 'transparent',
              color: canMoveDown ? '#1e293b' : '#cbd5e1',
              cursor: canMoveDown ? 'pointer' : 'default',
              transition: 'background 0.15s'
            }}
            onMouseEnter={(e) => { if (canMoveDown) e.currentTarget.style.background = `${accentColor}20`; }}
            onMouseLeave={(e) => { if (canMoveDown) e.currentTarget.style.background = '#f1f5f9'; }}
          >
            <ArrowDown size={12} />
          </button>

          {/* Move Menu Dropdown / Drop-up */}
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              type="button"
              title="Move Options (Bottom/Top/After Section)"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2px 7px',
                height: '22px',
                borderRadius: '12px',
                border: 'none',
                background: isMenuOpen ? `${accentColor}25` : '#f1f5f9',
                color: isMenuOpen ? accentColor : '#334155',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: '600'
              }}
            >
              <MoveVertical size={11} />
              <span>Move</span>
            </button>

            {/* FLOATING DROP-UP / DROPDOWN MENU */}
            {isMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '26px',
                  right: 0,
                  width: '210px',
                  background: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)',
                  padding: '6px',
                  zIndex: 50,
                  fontSize: '11px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{ padding: '4px 8px', fontSize: '9px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Position Controls
                </div>

                {/* Move to Top */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const topPos = activeSections[0] === 'personal' ? 1 : 0;
                    moveSectionToPosition(sectionId, topPos);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    width: '100%',
                    padding: '6px 8px',
                    border: 'none',
                    borderRadius: '4px',
                    background: 'transparent',
                    color: '#1e293b',
                    cursor: 'pointer',
                    fontSize: '11px',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <ArrowUpToLine size={13} style={{ color: accentColor }} />
                  <span>Move to Top of Document</span>
                </button>

                {/* Move to Bottom */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSectionToPosition(sectionId, activeSections.length - 1);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    width: '100%',
                    padding: '6px 8px',
                    border: 'none',
                    borderRadius: '4px',
                    background: 'transparent',
                    color: '#1e293b',
                    cursor: 'pointer',
                    fontSize: '11px',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <ArrowDownToLine size={13} style={{ color: accentColor }} />
                  <span>Move to Bottom of Page</span>
                </button>

                {/* Divider */}
                <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />

                <div style={{ padding: '4px 8px', fontSize: '9px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Place Directly After:
                </div>

                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  {activeSections
                    .filter((id) => id !== sectionId)
                    .map((otherId) => (
                      <button
                        key={otherId}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const targetIdx = activeSections.indexOf(otherId);
                          // Place right after otherId
                          const newPos = currentIndex < targetIdx ? targetIdx : targetIdx + 1;
                          moveSectionToPosition(sectionId, newPos);
                          setIsMenuOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '5px 8px',
                          border: 'none',
                          borderRadius: '4px',
                          background: 'transparent',
                          color: '#334155',
                          cursor: 'pointer',
                          fontSize: '10.5px',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = `${accentColor}15`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span>After {getSectionLabel(otherId)}</span>
                        <span style={{ fontSize: '9px', color: '#94a3b8' }}>→</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `2px solid ${accentColor}`,
          paddingBottom: '4px',
          marginBottom: '10px'
        }}
      >
        <div style={{ fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: accentColor }}>
          {onTitleChange ? (
            <EditableText
              value={title}
              onChange={onTitleChange}
              placeholder="SECTION TITLE"
            />
          ) : (
            title
          )}
        </div>
      </div>

      {/* Section Content */}
      <div>
        {children}
      </div>
    </section>
  );
}
