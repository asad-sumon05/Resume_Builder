import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernPro from '../../templates/ModernPro';
import ClassicAts from '../../templates/ClassicAts';
import Executive from '../../templates/Executive';
import TechDark from '../../templates/TechDark';
import Timeline from '../../templates/Timeline';
import Minimalist from '../../templates/Minimalist';

export default function ResumeCanvas() {
  const { data, template, fontFamily, fontSize, lineSpacing, zoom, setZoom } = useResume();
  const [pageCount, setPageCount] = useState(1);
  const paperRef = useRef(null);

  // Measure content overflow height and snap to exact A4 page multiples (1123px per page)
  useEffect(() => {
    const updatePageCount = () => {
      if (!paperRef.current) return;
      // scrollHeight gives true content height
      const contentHeight = paperRef.current.scrollHeight;
      // 1123px is standard A4 height at 96 DPI
      // Use 15px threshold to avoid false 2nd page on tiny sub-pixel rounding
      const pages = Math.max(1, Math.ceil((contentHeight - 15) / 1123));
      setPageCount(pages);
    };

    updatePageCount();
    const timer = setTimeout(updatePageCount, 150);
    const ro = new ResizeObserver(() => updatePageCount());
    if (paperRef.current) ro.observe(paperRef.current);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [data, template, fontFamily, fontSize, lineSpacing]);

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
      {/* PREVIEW TOOLBAR */}
      <div className="preview-toolbar no-print">
        <div className="preview-toolbar-left">
          <span className="preview-label">Preview</span>
          <div className="zoom-controls">
            <button className="zoom-btn" id="zoomOut" onClick={handleZoomOut} title="Zoom Out">−</button>
            <span className="zoom-level" id="zoomLevel">{Math.round(zoom * 100)}%</span>
            <button className="zoom-btn" id="zoomIn" onClick={handleZoomIn} title="Zoom In">+</button>
          </div>
        </div>

        {/* Multi-page A4 indicator */}
        <div className="preview-toolbar-right">
          <span
            className="a4-page-badge"
            title={`Standard A4 dimensions: 794px × 1123px per page. Total canvas height: ${pageCount * 1123}px`}
          >
            <span style={{ fontSize: '13px' }}>📄</span>
            <span>{pageCount === 1 ? '1 Page (A4)' : `${pageCount} Pages (A4)`}</span>
          </span>
        </div>
      </div>

      {/* PREVIEW CONTAINER */}
      <div className="preview-container" id="previewContainer">
        <div
          ref={paperRef}
          id="resumePaper"
          className={`resume-paper template-${template}`}
          style={{
            fontFamily: fontFamily,
            fontSize: getFontSizeValue(),
            lineHeight: getLineHeightValue(),
            transform: `scale(${zoom})`,
            minHeight: `${pageCount * 1123}px`,
            position: 'relative',
            marginBottom: `${(1 - zoom) * -500}px`
          }}
        >
          {renderActiveTemplate()}

          {/* Visual A4 Page Break Dividers (Editor Only) */}
          {pageCount > 1 &&
            Array.from({ length: pageCount - 1 }).map((_, i) => (
              <div
                key={`page-break-${i}`}
                className="canvas-page-break no-print"
                style={{ top: `${(i + 1) * 1123}px` }}
              >
                <div className="canvas-page-break-badge">
                  <span>📄</span> Page {i + 2} of {pageCount} (A4) Begins Here
                </div>
              </div>
            ))}

          {/* Visual A4 Page Number Watermarks (Editor Only) */}
          {pageCount > 1 &&
            Array.from({ length: pageCount }).map((_, i) => (
              <div
                key={`page-tag-${i}`}
                className="canvas-page-number-tag no-print"
                style={{ top: `${i * 1123 + 1090}px` }}
              >
                Page {i + 1} of {pageCount} (A4)
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
