import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernPro from '../../templates/ModernPro';
import ClassicAts from '../../templates/ClassicAts';
import Executive from '../../templates/Executive';
import TechDark from '../../templates/TechDark';
import Timeline from '../../templates/Timeline';
import Minimalist from '../../templates/Minimalist';

export default function ResumeCanvas() {
  const { template, fontFamily, fontSize, lineSpacing, zoom, setZoom } = useResume();

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  const getFontSizeValue = () => {
    switch (fontSize) {
      case 'small': return '9px';
      case 'large': return '11px';
      default: return '10px';
    }
  };

  const getLineHeightValue = () => {
    switch (lineSpacing) {
      case 'compact': return '1.3';
      case 'relaxed': return '1.7';
      default: return '1.5';
    }
  };

  const renderActiveTemplate = () => {
    switch (template) {
      case 'modern':
      case 'fresh':
      case 'bold':
      case 'startup':
        return <ModernPro />;
      case 'clean':
      case 'twopage':
      case 'corporate':
      case 'academic':
        return <ClassicAts />;
      case 'executive':
      case 'impact':
        return <Executive />;
      case 'tech':
      case 'darkpro':
        return <TechDark />;
      case 'timeline':
        return <Timeline />;
      case 'minimal':
      case 'nordic':
      case 'compact':
        return <Minimalist />;
      default:
        return <ModernPro />;
    }
  };

  return (
    <div className="preview-panel">
      {/* PREVIEW TOOLBAR (Exact from previous version) */}
      <div className="preview-toolbar no-print">
        <div className="preview-toolbar-left">
          <span className="preview-label">Preview</span>
          <div className="zoom-controls">
            <button className="zoom-btn" id="zoomOut" onClick={handleZoomOut} title="Zoom Out">−</button>
            <span className="zoom-level" id="zoomLevel">{Math.round(zoom * 100)}%</span>
            <button className="zoom-btn" id="zoomIn" onClick={handleZoomIn} title="Zoom In">+</button>
          </div>
        </div>
      </div>

      {/* PREVIEW CONTAINER */}
      <div className="preview-container" id="previewContainer">
        <div
          id="resumePaper"
          className={`resume-paper template-${template}`}
          style={{
            fontFamily: fontFamily,
            fontSize: getFontSizeValue(),
            lineHeight: getLineHeightValue(),
            transform: `scale(${zoom})`,
            marginBottom: `${(1 - zoom) * -500}px`
          }}
        >
          {renderActiveTemplate()}
        </div>
      </div>
    </div>
  );
}
