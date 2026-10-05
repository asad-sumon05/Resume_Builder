import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import EditableText from './EditableText';
import { ArrowUp, ArrowDown, MoveVertical, ArrowUpToLine, ArrowDownToLine, MoreVertical, FileText, Trash2, Minus, Plus } from 'lucide-react';

export default function SectionBlock({
  sectionId,
  title,
  onTitleChange,
  accentColor = '#2DC08D',
  children,
  className = '',
  style = {}
}) {
  const { data, moveSection, moveSectionToPosition, toggleSectionPageBreak, deleteSection, sectionMargins, setSectionColumn, toggleSectionColumn, updateDeclaration } = useResume();
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const currentColumn = data.sectionColumns?.[sectionId] || (
    ['experience', 'projects', 'education'].includes(sectionId) ? 'left' : 'right'
  );

  const autoMargin = sectionMargins?.[sectionId] || 0;
  const hasManualBreak = !!(data?.pageBreaks && sectionId && data.pageBreaks[sectionId]);

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
      case 'references': return 'References';
      case 'declaration': return 'Declaration';
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
      data-section-id={sectionId}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMenuOpen(false);
      }}
      style={{
        position: 'relative',
        marginBottom: '20px',
        borderRadius: '6px',
        transition: 'box-shadow 0.15s ease',
        boxShadow: isHovered ? `0 0 0 1px ${accentColor}40` : 'none',
        ...style,
        marginTop: autoMargin ? `${autoMargin}px` : (style?.marginTop || undefined)
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

          {/* Column Toggle (Left / Right) */}
          {sectionId && sectionId !== 'personal' && sectionId !== 'declaration' && (
            <button
              type="button"
              title={`Switch to ${currentColumn === 'left' ? 'Right' : 'Left'} column`}
              onClick={(e) => {
                e.stopPropagation();
                toggleSectionColumn(sectionId, currentColumn);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2px 7px',
                height: '22px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#334155',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: '600',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${accentColor}18`; e.currentTarget.style.color = accentColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#334155'; }}
            >
              <span>{currentColumn === 'left' ? '⬅ Left' : 'Right ➡'}</span>
            </button>
          )}

          {/* Spacing Controls for Declaration in Toolbar */}
          {sectionId === 'declaration' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '1px 6px',
                height: '22px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#334155',
                fontSize: '10px',
                fontWeight: '600'
              }}
            >
              <span style={{ fontSize: '9px', color: '#64748b' }}>↕ Space:</span>
              <button
                type="button"
                title="Decrease Empty Space (-10px)"
                onClick={(e) => {
                  e.stopPropagation();
                  const cur = data.declaration?.emptySpace !== undefined ? Number(data.declaration.emptySpace) : 80;
                  updateDeclaration('emptySpace', Math.max(0, cur - 10));
                }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1
                }}
              >
                <Minus size={9} />
              </button>
              <span style={{ fontWeight: '700', color: accentColor, minWidth: '30px', textAlign: 'center' }}>
                {data.declaration?.emptySpace !== undefined ? `${data.declaration.emptySpace}px` : '80px'}
              </span>
              <button
                type="button"
                title="Increase Empty Space (+10px)"
                onClick={(e) => {
                  e.stopPropagation();
                  const cur = data.declaration?.emptySpace !== undefined ? Number(data.declaration.emptySpace) : 80;
                  updateDeclaration('emptySpace', cur + 10);
                }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1
                }}
              >
                <Plus size={9} />
              </button>
            </div>
          )}

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

                {/* Column Placement inside Menu */}
                {sectionId && sectionId !== 'personal' && sectionId !== 'declaration' && (
                  <>
                    <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />
                    <div style={{ padding: '4px 8px', fontSize: '9px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Column Placement
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSectionColumn(sectionId, 'left');
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
                        background: currentColumn === 'left' ? `${accentColor}18` : 'transparent',
                        color: currentColumn === 'left' ? accentColor : '#1e293b',
                        fontWeight: currentColumn === 'left' ? '700' : '500',
                        cursor: 'pointer',
                        fontSize: '11px',
                        textAlign: 'left'
                      }}
                    >
                      <span>⬅ Place in Left Column</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSectionColumn(sectionId, 'right');
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
                        background: currentColumn === 'right' ? `${accentColor}18` : 'transparent',
                        color: currentColumn === 'right' ? accentColor : '#1e293b',
                        fontWeight: currentColumn === 'right' ? '700' : '500',
                        cursor: 'pointer',
                        fontSize: '11px',
                        textAlign: 'left'
                      }}
                    >
                      <span>Place in Right Column ➡</span>
                    </button>
                  </>
                )}

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

          {/* Manual Page Break Toggle */}
          <button
            type="button"
            title={hasManualBreak ? "Remove page break (starts on same page if room)" : "Start this section on a new page (Page Break)"}
            onClick={(e) => {
              e.stopPropagation();
              if (toggleSectionPageBreak) toggleSectionPageBreak(sectionId);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              padding: '2px 7px',
              height: '22px',
              borderRadius: '12px',
              border: hasManualBreak ? `1px solid ${accentColor}` : 'none',
              background: hasManualBreak ? `${accentColor}25` : '#f1f5f9',
              color: hasManualBreak ? accentColor : '#334155',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: hasManualBreak ? '700' : '600',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              if (!hasManualBreak) e.currentTarget.style.background = `${accentColor}15`;
            }}
            onMouseLeave={(e) => {
              if (!hasManualBreak) e.currentTarget.style.background = '#f1f5f9';
            }}
          >
            <FileText size={11} />
            <span>{hasManualBreak ? 'Page Break ✓' : '+ Break'}</span>
          </button>

          {/* Delete Section Button */}
          {sectionId && sectionId !== 'personal' && (
            <button
              type="button"
              title={`Delete ${getSectionLabel(sectionId)} section`}
              onClick={(e) => {
                e.stopPropagation();
                if (deleteSection) deleteSection(sectionId);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '2px 7px',
                height: '22px',
                borderRadius: '12px',
                border: '1px solid #fecaca',
                background: '#fee2e2',
                color: '#dc2626',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: '700',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#dc2626';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fee2e2';
                e.currentTarget.style.color = '#dc2626';
                e.currentTarget.style.borderColor = '#fecaca';
              }}
            >
              <Trash2 size={11} />
              <span>Delete</span>
            </button>
          )}
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
