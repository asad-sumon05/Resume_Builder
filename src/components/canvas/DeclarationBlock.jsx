import React from 'react';
import { useResume } from '../../context/ResumeContext';
import EditableText from './EditableText';
import SectionBlock from './SectionBlock';

export default function DeclarationBlock({
  accentColor = '#2DC08D',
  variant = 'classic'
}) {
  const { data, updateDeclaration } = useResume();
  const d = data.declaration || {};

  const title = d.title || 'DECLARATION:';
  const statement = d.statement || 'The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge.';
  const signee = d.signeeName || `${data.personal?.firstName || ''} ${data.personal?.lastName || ''}`.trim() || 'Abdul Moin Khan';
  const sigText = d.signatureText || d.signeeName || `${data.personal?.firstName || ''} ${data.personal?.lastName || ''}`.trim() || 'Moin Khan';

  const isDark = variant === 'tech' || variant === 'darkpro';

  return (
    <SectionBlock
      key="declaration"
      sectionId="declaration"
      title={title}
      onTitleChange={(v) => updateDeclaration('title', v)}
      accentColor={accentColor}
      style={{ marginTop: '16px', marginBottom: '16px' }}
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
  );
}
