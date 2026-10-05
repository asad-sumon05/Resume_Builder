import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import EditableText from './EditableText';
import SectionBlock from './SectionBlock';
import { Minus, Plus, SlidersHorizontal } from 'lucide-react';

export default function DeclarationBlock({
  accentColor = '#2DC08D',
  variant = 'classic'
}) {
  const { data, updateDeclaration } = useResume();
  const d = data.declaration || {};
  const [spaceHovered, setSpaceHovered] = useState(false);

  const title = d.title || 'DECLARATION:';
  const statement = d.statement || 'The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge.';
  const signee = d.signeeName || `${data.personal?.firstName || ''} ${data.personal?.lastName || ''}`.trim() || 'Abdul Moin Khan';
  const sigText = d.signatureText || d.signeeName || `${data.personal?.firstName || ''} ${data.personal?.lastName || ''}`.trim() || 'Moin Khan';

  const isDark = variant === 'tech' || variant === 'darkpro';

  // Configurable empty space above declaration (default 48px, minimum 0px)
  const emptySpace = d.emptySpace !== undefined ? Math.max(0, Number(d.emptySpace)) : 48;
  const showDivider = !!d.showDivider;

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Visual empty space separator with interactive on-canvas controls */}
      <div
        className="declaration-empty-space"
        onMouseEnter={() => setSpaceHovered(true)}
        onMouseLeave={() => setSpaceHovered(false)}
        style={{
          height: `${emptySpace}px`,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'height 0.15s ease',
          background: spaceHovered ? `${accentColor}08` : 'transparent',
          borderRadius: '4px'
        }}
      >
        {/* Subtle dividing line */}
        {showDivider && (
          <div
            style={{
              width: '100%',
              height: '1px',
              background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'
            }}
          />
        )}

        {/* Hover spacing adjustment pill (hidden in print/PDF) */}
        {spaceHovered && (
          <div
            data-html2canvas-ignore="true"
            className="no-print"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#ffffff',
              border: `1px solid ${accentColor}40`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              borderRadius: '20px',
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 30,
              fontSize: '10px',
              color: '#334155'
            }}
          >
            <span style={{ fontWeight: '700', color: accentColor, display: 'flex', alignItems: 'center', gap: '3px' }}>
              <SlidersHorizontal size={10} />
              Space: {emptySpace}px
            </span>

            {/* Decrease Space */}
            <button
              type="button"
              title="Decrease Empty Space (-8px)"
              onClick={() => updateDeclaration('emptySpace', Math.max(0, emptySpace - 8))}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#334155'
              }}
            >
              <Minus size={10} />
            </button>

            {/* Increase Space */}
            <button
              type="button"
              title="Increase Empty Space (+8px)"
              onClick={() => updateDeclaration('emptySpace', emptySpace + 8)}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#334155'
              }}
            >
              <Plus size={10} />
            </button>

            {/* Divider Toggle */}
            <button
              type="button"
              title={showDivider ? 'Hide divider line' : 'Show divider line'}
              onClick={() => updateDeclaration('showDivider', !showDivider)}
              style={{
                background: showDivider ? `${accentColor}20` : '#f1f5f9',
                border: 'none',
                borderRadius: '10px',
                padding: '2px 6px',
                fontSize: '9px',
                fontWeight: '600',
                cursor: 'pointer',
                color: showDivider ? accentColor : '#64748b'
              }}
            >
              {showDivider ? 'Line: ON' : 'Line: OFF'}
            </button>
          </div>
        )}
      </div>

      <SectionBlock
        key="declaration"
        sectionId="declaration"
        title={title}
        onTitleChange={(v) => updateDeclaration('title', v)}
        accentColor={accentColor}
        style={{ marginTop: '0px', marginBottom: '16px' }}
      >
        <div style={{ color: isDark ? '#c9d1d9' : '#1e293b' }}>
          {/* Declaration Statement */}
          <p style={{
            fontSize: '9.5px',
            lineHeight: '1.6',
            margin: '0 0 16px 0',
            color: isDark ? '#8b949e' : '#334155'
          }}>
            <EditableText
              value={statement}
              onChange={(v) => updateDeclaration('statement', v)}
              multiline={true}
              placeholder="The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge."
            />
          </p>

          {/* Bottom row: Date/Place on Left, Signature Block on Right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
            {/* Date & Place */}
            <div style={{ fontSize: '9px', color: isDark ? '#8b949e' : '#64748b', lineHeight: '1.6' }}>
              {(d.date || d.place) ? (
                <>
                  {d.date && (
                    <div>
                      <strong>Date:</strong> <EditableText value={d.date} onChange={(v) => updateDeclaration('date', v)} placeholder="Date" />
                    </div>
                  )}
                  {d.place && (
                    <div>
                      <strong>Place:</strong> <EditableText value={d.place} onChange={(v) => updateDeclaration('place', v)} placeholder="Place" />
                    </div>
                  )}
                </>
              ) : (
                <div style={{ fontStyle: 'italic', opacity: 0.6 }}>
                  <EditableText value={d.place} onChange={(v) => updateDeclaration('place', v)} placeholder="Location / Date (optional)" />
                </div>
              )}
            </div>

            {/* Signature & Signee Name */}
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              {d.signatureImage ? (
                <img
                  src={d.signatureImage}
                  alt="Signature"
                  style={{
                    maxHeight: '40px',
                    maxWidth: '160px',
                    objectFit: 'contain',
                    marginBottom: '2px',
                    filter: isDark ? 'invert(1)' : 'none'
                  }}
                />
              ) : (
                <div
                  style={{
                    fontFamily: 'Caveat, "Dancing Script", cursive',
                    fontSize: '24px',
                    lineHeight: '1.1',
                    color: isDark ? '#58a6ff' : '#0f172a',
                    marginBottom: '2px',
                    transform: 'rotate(-2deg)'
                  }}
                >
                  <EditableText
                    value={sigText}
                    onChange={(v) => updateDeclaration('signatureText', v)}
                    placeholder="Signature"
                  />
                </div>
              )}

              {/* Printed Full Name */}
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                color: isDark ? '#f0f6fc' : '#0f172a',
                letterSpacing: '0.01em'
              }}>
                <EditableText
                  value={signee}
                  onChange={(v) => updateDeclaration('signeeName', v)}
                  placeholder="Printed Name"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>
    </div>
  );
}
