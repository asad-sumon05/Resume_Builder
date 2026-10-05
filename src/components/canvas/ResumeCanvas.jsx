import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Trash2 } from 'lucide-react';
import ModernPro from '../../templates/ModernPro';
import ClassicAts from '../../templates/ClassicAts';
import Executive from '../../templates/Executive';
import TechDark from '../../templates/TechDark';
import Timeline from '../../templates/Timeline';
import Minimalist from '../../templates/Minimalist';

export default function ResumeCanvas() {
  const {
    data,
    template,
    fontFamily,
    fontSize,
    lineSpacing,
    zoom,
    setZoom,
    deletePage,
    sectionMargins,
    setSectionMargins
  } = useResume();
  const [pageCount, setPageCount] = useState(1);
  const paperRef = useRef(null);
  const isPaginatingRef = useRef(false);

  // Pagination Engine: Prevents sections from being split across A4 pages (1123px per page)
  const performPagination = useCallback((forcedZoom = null) => {
    const paper = paperRef.current;
    if (!paper || isPaginatingRef.current) return;

    isPaginatingRef.current = true;

    try {
      const A4_HEIGHT = 1123;
      const PAGE_TOP_GAP = 36; // comfortable top margin when section starts on a new page
      const MIN_SECTION_HEADROOM = 140; // section needs at least 140px to stay on current page without being crowded

      const paperRect = paper.getBoundingClientRect();
      const currentZoom = forcedZoom !== null ? forcedZoom : (zoom || 1);

      const sectionElements = Array.from(paper.querySelectorAll('.section-wrapper'));
      const nextMargins = {};

      sectionElements.forEach(el => {
        const sectionId = el.getAttribute('data-section-id');
        if (!sectionId) return;

        const rect = el.getBoundingClientRect();
        const currentTop = (rect.top - paperRect.top) / currentZoom;
        const height = rect.height / currentZoom;

        // Current margin applied via React state
        const existingMargin = sectionMargins[sectionId] || 0;
        // Natural top if this section had no margin of its own
        const naturalTop = currentTop - existingMargin;

        const pageIndex = Math.floor(naturalTop / A4_HEIGHT);
        const pageBottom = (pageIndex + 1) * A4_HEIGHT;
        const spaceLeft = pageBottom - naturalTop;
        const offsetInPage = naturalTop % A4_HEIGHT;

        const isManualBreak = !!(data?.pageBreaks && data.pageBreaks[sectionId]);
        let shouldBreak = false;

        // Only apply page-break shift when user explicitly toggled manual page break
        if (isManualBreak && offsetInPage > 60) {
          shouldBreak = true;
        }

        if (shouldBreak) {
          const shift = Math.max(0, (pageBottom + PAGE_TOP_GAP) - naturalTop);
          if (shift > 0) {
            const roundedShift = Math.round(shift);
            nextMargins[sectionId] = roundedShift;
            el.style.marginTop = `${roundedShift}px`;
          } else {
            el.style.marginTop = '';
          }
        } else {
          el.style.marginTop = '';
        }
      });

      // Clear any artificial entry margins so no gaps appear between jobs, degrees, or items
      const entryElements = Array.from(paper.querySelectorAll('.resume-entry, .experience-item, .education-item, .project-item, .custom-section-item'));
      entryElements.forEach(entryEl => {
        if (entryEl.style.marginTop) {
          entryEl.style.marginTop = '';
        }
      });

      // Update state if margins changed (with 2px tolerance to avoid sub-pixel jitter)
      const currentKeys = Object.keys(sectionMargins);
      const nextKeys = Object.keys(nextMargins);
      const isDifferent = currentKeys.length !== nextKeys.length ||
        nextKeys.some(k => Math.abs((nextMargins[k] || 0) - (sectionMargins[k] || 0)) > 2);

      if (isDifferent) {
        setSectionMargins(nextMargins);
      }

      // Calculate true content bottom across all sections & blocks
      let maxContentBottom = 0;
      sectionElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const b = (rect.bottom - paperRect.top) / currentZoom;
        if (b > maxContentBottom) maxContentBottom = b;
      });

      const otherBlocks = paper.querySelectorAll('header, aside, .resume-header');
      otherBlocks.forEach(el => {
        const rect = el.getBoundingClientRect();
        const b = (rect.bottom - paperRect.top) / currentZoom;
        if (b > maxContentBottom) maxContentBottom = b;
      });

      // Avoid phantom extra blank pages caused by padding
      const contentHeight = Math.max(maxContentBottom, paper.scrollHeight - 35);
      const pages = Math.max(1, Math.ceil((contentHeight - 15) / A4_HEIGHT));
      setPageCount(pages);
      paper.setAttribute('data-page-count', String(pages));
      return pages;
    } finally {
      isPaginatingRef.current = false;
    }
  }, [data, template, fontFamily, fontSize, lineSpacing, zoom, sectionMargins, setSectionMargins]);

  // Expose recalculator for PDF generation
  useEffect(() => {
    window.__recalculateResumePagination = performPagination;
    return () => {
      delete window.__recalculateResumePagination;
    };
  }, [performPagination]);

  // Trigger pagination on layout/data changes
  useEffect(() => {
    performPagination();
    const timer = setTimeout(() => performPagination(), 100);

    let rafId = null;
    const ro = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        performPagination();
      });
    });

    if (paperRef.current) ro.observe(paperRef.current);

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [performPagination]);

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

        {/* Multi-page A4 indicator & Delete Page button */}
        <div className="preview-toolbar-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            className="a4-page-badge"
            title={`Standard A4 dimensions: 794px × 1123px per page. Total canvas height: ${pageCount * 1123}px`}
          >
            <span style={{ fontSize: '13px' }}>📄</span>
            <span>{pageCount === 1 ? '1 Page (A4)' : `${pageCount} Pages (A4)`}</span>
          </span>

          {pageCount > 1 && (
            <button
              type="button"
              className="toolbar-delete-page-btn no-print"
              onClick={() => deletePage && deletePage(pageCount - 1)}
              title={`Delete Page ${pageCount} (removes sections on that page or compacts blank space)`}
            >
              <Trash2 size={13} />
              <span>Delete Page {pageCount}</span>
            </button>
          )}
        </div>
      </div>

      {/* PREVIEW CONTAINER */}
      <div className="preview-container" id="previewContainer">
        <div
          ref={paperRef}
          id="resumePaper"
          data-page-count={pageCount}
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
                <button
                  type="button"
                  className="delete-page-btn no-print"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (deletePage) deletePage(i + 1);
                  }}
                  title={`Delete Page ${i + 2} (removes sections on this page or compacts blank space)`}
                >
                  <Trash2 size={12} />
                  <span>Delete Page {i + 2}</span>
                </button>
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
                <span>Page {i + 1} of {pageCount} (A4)</span>
                {i > 0 && (
                  <button
                    type="button"
                    className="tag-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (deletePage) deletePage(i);
                    }}
                    title={`Delete Page ${i + 1}`}
                  >
                    <Trash2 size={10} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

