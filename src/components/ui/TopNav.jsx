import React, { useState, useRef, useEffect } from 'react';
import { useResume, ACCENT_COLORS } from '../../context/ResumeContext';
import TemplateModal from './TemplateModal';
import AddSectionModal from './AddSectionModal';
import AtsScoreModal from './AtsScoreModal';

export default function TopNav() {
  const {
    template,
    accentColor,
    setAccentColor,
    undo,
    redo,
    calculateScore,
    loadPreset,
    downloadPDF,
    exportPlainText,
    exportJson,
    importJson,
    importPdf,
    clearResume,
    editingFileName,
    exitEditingMode
  } = useResume();

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showSamplesDropdown, setShowSamplesDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const pdfInputRef  = useRef(null);   // for PDF upload
  const jsonInputRef = useRef(null);   // for JSON backup upload
  const score = calculateScore();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        !e.target.closest('.builder-dropdown') &&
        !e.target.closest('.color-picker-btn') &&
        !e.target.closest('.color-palette-dropdown')
      ) {
        setShowColorDropdown(false);
        setShowSamplesDropdown(false);
        setShowMoreDropdown(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (file) { importPdf(file); e.target.value = ''; }
  };

  const handleJsonChange = (e) => {
    const file = e.target.files?.[0];
    if (file) { importJson(file); e.target.value = ''; }
  };

  return (
    <>
      {/* ── EDITING MODE BANNER ─────────────────────────────────────── */}
      {editingFileName && (
        <div
          className="no-print"
          style={{
            background: 'linear-gradient(90deg, #1a2e4a 0%, #0c7abf 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '7px 16px',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.02em',
            position: 'relative',
            zIndex: 100
          }}
        >
          <span style={{ fontSize: '15px' }}>✏️</span>
          <span>
            Editing: <strong style={{ fontWeight: '800' }}>{editingFileName}</strong>
            <span style={{ opacity: 0.8, fontWeight: '400', marginLeft: '6px' }}>
              — Template &amp; design fully restored. Edit and re-download when ready.
            </span>
          </span>
          <button
            onClick={exitEditingMode}
            style={{
              marginLeft: '12px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '11px',
              fontWeight: '700',
              padding: '2px 8px',
              cursor: 'pointer',
              lineHeight: '1.6'
            }}
            title="Exit editing mode (changes are kept)"
          >
            ✕ Exit
          </button>
        </div>
      )}

      <header className="builder-header no-print">
        {/* LOGO – acts as Home button */}
        <a href="index.html" className="builder-logo" title="ResumeCV Home" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="6" fill="#2DC08D" />
            <path d="M6 7h7a3.5 3.5 0 0 1 0 7H6V7z" fill="white" />
            <path d="M6 14h5l3.5 5H9.5L6 14z" fill="white" opacity="0.7" />
          </svg>
          Resume<span>CV</span>
        </a>

        {/* ── CENTER CONTROLS ──────────────────────────────────────── */}
        <div className="builder-header-center">
          <button
            className="template-switcher"
            id="templateSwitcherBtn"
            onClick={() => setIsTemplateModalOpen(true)}
          >
            <div className="template-thumb" id="templateThumb"></div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="6" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="8" y="1" width="5" height="4" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="1" y="9" width="5" height="4" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="8" y="7" width="5" height="6" rx="1" fill="currentColor" opacity="0.7" />
            </svg>
            Change Template
          </button>

          <div style={{ position: 'relative' }}>
            <button
              className="color-picker-btn"
              id="colorPickerBtn"
              onClick={(e) => {
                e.stopPropagation();
                setShowColorDropdown(!showColorDropdown);
                setShowSamplesDropdown(false);
                setShowMoreDropdown(false);
              }}
            >
              <div className="color-swatch" id="colorSwatch" style={{ background: accentColor }}></div>
              Color
            </button>

            {showColorDropdown && (
              <div className="color-palette-dropdown open" id="colorPalette">
                <p className="color-palette-title">Accent Color</p>
                <div className="color-swatches" id="colorSwatches">
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.color}
                      className={`color-swatch-btn ${accentColor === c.color ? 'active' : ''}`}
                      style={{ background: c.color }}
                      title={c.name}
                      onClick={() => { setAccentColor(c.color); setShowColorDropdown(false); }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className="resume-score-badge"
            id="scoreBadge"
            onClick={() => setIsAtsModalOpen(true)}
            title="Click to view ATS Score Details"
          >
            ✦ Score: <span id="resumeScore">{score}</span>%
          </div>
        </div>

        {/* ── RIGHT ACTIONS ────────────────────────────────────────── */}
        <div className="builder-header-actions">

          {/* ── OPEN / EDIT PDF BUTTON ── primary action ─────────── */}
          <button
            className="btn-secondary-builder"
            id="openPdfBtn"
            title="Upload a ResumeCV PDF to continue editing it"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: '700',
              background: editingFileName
                ? 'linear-gradient(135deg,#1a2e4a,#0c7abf)'
                : 'linear-gradient(135deg,#0ea5e9,#2DC08D)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0 14px',
              height: '34px',
              cursor: 'pointer',
              fontSize: '12.5px',
              letterSpacing: '0.01em',
              boxShadow: '0 2px 8px rgba(14,165,233,0.3)'
            }}
            onClick={() => pdfInputRef.current?.click()}
          >
            {/* Upload-arrow icon */}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 11v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 9V2M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {editingFileName ? '⟳ Change PDF' : '📂 Open PDF to Edit'}
          </button>

          {/* SAMPLE PRESETS */}
          <div className="builder-dropdown">
            <button
              className="btn-secondary-builder"
              id="sampleDataBtn"
              title="Load sample resumes"
              onClick={(e) => {
                e.stopPropagation();
                setShowSamplesDropdown(!showSamplesDropdown);
                setShowColorDropdown(false);
                setShowMoreDropdown(false);
              }}
            >
              <span>✨</span>
              <span>Samples</span>
              <span style={{ fontSize: '10px' }}>▼</span>
            </button>
            {showSamplesDropdown && (
              <div className="builder-dropdown-menu open" id="sampleDataMenu">
                <button className="builder-dropdown-item" onClick={() => { loadPreset('software'); setShowSamplesDropdown(false); }}>
                  <span>💻</span> Senior Software Engineer
                </button>
                <button className="builder-dropdown-item" onClick={() => { loadPreset('designer'); setShowSamplesDropdown(false); }}>
                  <span>🎨</span> Product &amp; UX Designer
                </button>
                <button className="builder-dropdown-item" onClick={() => { loadPreset('marketing'); setShowSamplesDropdown(false); }}>
                  <span>📈</span> Growth &amp; Marketing Lead
                </button>
                <button className="builder-dropdown-item" onClick={() => { loadPreset('graduate'); setShowSamplesDropdown(false); }}>
                  <span>🎓</span> Recent Graduate / Entry
                </button>
              </div>
            )}
          </div>

          <button className="btn-icon" title="Undo" id="undoBtn" onClick={undo}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9a6 6 0 1 0 6-6H5M3 9V5M3 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="btn-icon" title="Redo" id="redoBtn" onClick={redo}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15 9a6 6 0 1 1-6-6h4M15 9V5M15 9H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* DOWNLOAD PDF */}
          <button className="btn-download" id="downloadBtn" onClick={downloadPDF}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF
          </button>

          {/* MORE ACTIONS ⋮ */}
          <div className="builder-dropdown">
            <button
              className="btn-icon"
              id="moreActionsBtn"
              title="More Options"
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreDropdown(!showMoreDropdown);
                setShowColorDropdown(false);
                setShowSamplesDropdown(false);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="4" r="1.5" fill="currentColor" />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                <circle cx="9" cy="14" r="1.5" fill="currentColor" />
              </svg>
            </button>

            {showMoreDropdown && (
              <div className="builder-dropdown-menu open" id="moreActionsMenu">
                {/* ── PDF section ─────────────────────────────── */}
                <div style={{ padding: '4px 12px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em', opacity: 0.5, textTransform: 'uppercase' }}>
                  Edit via PDF
                </div>
                <button
                  className="builder-dropdown-item"
                  id="openPdfMenuBtn"
                  onClick={() => { pdfInputRef.current?.click(); setShowMoreDropdown(false); }}
                >
                  <span>📄</span> Open PDF to Edit (re-upload)
                </button>

                <div className="builder-dropdown-divider"></div>

                {/* ── JSON backup section ──────────────────────── */}
                <div style={{ padding: '4px 12px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em', opacity: 0.5, textTransform: 'uppercase' }}>
                  JSON Backup
                </div>
                <button
                  className="builder-dropdown-item"
                  id="exportJsonBtn"
                  onClick={() => { exportJson(); setShowMoreDropdown(false); }}
                >
                  <span>💾</span> Save / Export JSON Backup
                </button>
                <button
                  className="builder-dropdown-item"
                  id="openJsonMenuBtn"
                  onClick={() => { jsonInputRef.current?.click(); setShowMoreDropdown(false); }}
                >
                  <span>📂</span> Open JSON Backup
                </button>

                <div className="builder-dropdown-divider"></div>

                <button
                  className="builder-dropdown-item"
                  id="exportTxtBtn"
                  onClick={() => { exportPlainText(); setShowMoreDropdown(false); }}
                >
                  <span>📝</span> Download Plain Text (ATS)
                </button>

                <div className="builder-dropdown-divider"></div>
                <button
                  className="builder-dropdown-item danger"
                  id="clearAllBtn"
                  onClick={() => {
                    if (window.confirm('Reset all fields? Your changes will be cleared.')) clearResume();
                    setShowMoreDropdown(false);
                  }}
                >
                  <span>🗑️</span> Reset / Clear All
                </button>
              </div>
            )}
          </div>

          {/* Hidden file inputs */}
          <input
            type="file"
            ref={pdfInputRef}
            id="importPdfInput"
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
            onChange={handlePdfChange}
          />
          <input
            type="file"
            ref={jsonInputRef}
            id="importJsonInput"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleJsonChange}
          />
        </div>
      </header>

      {/* MODALS */}
      <TemplateModal isOpen={isTemplateModalOpen} onClose={() => setIsTemplateModalOpen(false)} />
      <AddSectionModal isOpen={isAddSectionModalOpen} onClose={() => setIsAddSectionModalOpen(false)} />
      <AtsScoreModal isOpen={isAtsModalOpen} onClose={() => setIsAtsModalOpen(false)} />
    </>
  );
}
