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
    clearResume
  } = useResume();

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showSamplesDropdown, setShowSamplesDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const fileInputRef = useRef(null);
  const score = calculateScore();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.builder-dropdown') && !e.target.closest('.color-picker-btn') && !e.target.closest('.color-palette-dropdown')) {
        setShowColorDropdown(false);
        setShowSamplesDropdown(false);
        setShowMoreDropdown(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      importJson(file);
      e.target.value = '';
    }
  };

  return (
    <>
      <header className="builder-header no-print">
        {/* LOGO (Acts as Home button) */}
        <a href="index.html" className="builder-logo" title="ResumeCV Home" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="6" fill="#2DC08D" />
            <path d="M6 7h7a3.5 3.5 0 0 1 0 7H6V7z" fill="white" />
            <path d="M6 14h5l3.5 5H9.5L6 14z" fill="white" opacity="0.7" />
          </svg>
          Resume<span>CV</span>
        </a>

        {/* CENTER CONTROLS */}
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
                      onClick={() => {
                        setAccentColor(c.color);
                        setShowColorDropdown(false);
                      }}
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

        {/* RIGHT ACTIONS */}
        <div className="builder-header-actions">
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
                <button
                  className="builder-dropdown-item"
                  onClick={() => { loadPreset('software'); setShowSamplesDropdown(false); }}
                >
                  <span>💻</span> Senior Software Engineer
                </button>
                <button
                  className="builder-dropdown-item"
                  onClick={() => { loadPreset('designer'); setShowSamplesDropdown(false); }}
                >
                  <span>🎨</span> Product & UX Designer
                </button>
                <button
                  className="builder-dropdown-item"
                  onClick={() => { loadPreset('marketing'); setShowSamplesDropdown(false); }}
                >
                  <span>📈</span> Growth & Marketing Lead
                </button>
                <button
                  className="builder-dropdown-item"
                  onClick={() => { loadPreset('graduate'); setShowSamplesDropdown(false); }}
                >
                  <span>🎓</span> Recent Graduate / Entry
                </button>
              </div>
            )}
          </div>

          <button className="btn-icon" title="Undo" id="undoBtn" onClick={undo}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9a6 6 0 1 0 6-6H5M3 9V5M3 9H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          
          <button className="btn-icon" title="Redo" id="redoBtn" onClick={redo}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15 9a6 6 0 1 1-6-6h4M15 9V5M15 9H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          {/* DOWNLOAD BUTTON */}
          <button className="btn-download" id="downloadBtn" onClick={downloadPDF}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3M2 13h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Download PDF
          </button>

          {/* MORE ACTIONS */}
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
                <button
                  className="builder-dropdown-item"
                  id="exportTxtBtn"
                  onClick={() => { exportPlainText(); setShowMoreDropdown(false); }}
                >
                  <span>📝</span> Download Plain Text (ATS)
                </button>
                <button
                  className="builder-dropdown-item"
                  id="exportJsonBtn"
                  onClick={() => { exportJson(); setShowMoreDropdown(false); }}
                >
                  <span>💾</span> Export JSON Backup
                </button>
                <button
                  className="builder-dropdown-item"
                  id="importJsonBtn"
                  onClick={() => { fileInputRef.current?.click(); setShowMoreDropdown(false); }}
                >
                  <span>📂</span> Import JSON File
                </button>
                <div className="builder-dropdown-divider"></div>
                <button
                  className="builder-dropdown-item danger"
                  id="clearAllBtn"
                  onClick={() => {
                    if (window.confirm('Reset all fields? Your changes will be cleared.')) {
                      clearResume();
                    }
                    setShowMoreDropdown(false);
                  }}
                >
                  <span>🗑️</span> Reset / Clear All
                </button>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            id="importJsonInput"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
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
