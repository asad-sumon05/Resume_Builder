import React from 'react';
import { useResume } from '../../context/ResumeContext';
import EditableText from './EditableText';
import InlineBullet from './InlineBullet';
import SectionBlock from './SectionBlock';

export default function CustomSectionBlock({
  sectionId,
  accentColor = '#2DC08D',
  variant = 'classic'
}) {
  const {
    data,
    updateCustomSectionTitle,
    updateCustomSectionItem,
    updateCustomSectionBullet
  } = useResume();

  const customSec = data.customSections?.[sectionId];
  if (!customSec) return null;

  const title = customSec.title || 'Custom Section';
  const items = customSec.items || [];
  const styleType = customSec.styleType || 'bullet';

  return (
    <SectionBlock
      sectionId={sectionId}
      title={title}
      onTitleChange={(v) => updateCustomSectionTitle(sectionId, v)}
      accentColor={accentColor}
      style={{ marginBottom: '18px' }}
    >
      {/* 1. BULLET STYLE */}
      {styleType === 'bullet' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {items.map((item, idx) => (
            <div key={item.id || idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: variant === 'tech' ? '#58a6ff' : '#1a1a2e' }}>
                  <EditableText
                    value={item.title}
                    onChange={(v) => updateCustomSectionItem(sectionId, idx, 'title', v)}
                    placeholder="Role / Title / Subject"
                  />
                </span>
                <span style={{ fontSize: '9px', color: variant === 'tech' ? '#8b949e' : '#64748b' }}>
                  <EditableText
                    value={item.date}
                    onChange={(v) => updateCustomSectionItem(sectionId, idx, 'date', v)}
                    placeholder="Period / Date"
                  />
                </span>
              </div>

              {(item.organization || item.location) && (
                <div style={{ fontSize: '10px', fontWeight: '600', color: variant === 'tech' ? '#8b949e' : '#4b5563', marginBottom: '4px' }}>
                  <EditableText
                    value={item.organization}
                    onChange={(v) => updateCustomSectionItem(sectionId, idx, 'organization', v)}
                    placeholder="Organization / Client"
                  />
                  {item.location && (
                    <>
                      {' · '}
                      <EditableText
                        value={item.location}
                        onChange={(v) => updateCustomSectionItem(sectionId, idx, 'location', v)}
                        placeholder="Location"
                      />
                    </>
                  )}
                </div>
              )}

              <div style={{ paddingLeft: '2px', marginTop: '4px' }}>
                {(item.bullets || []).map((b, bIdx) => (
                  <InlineBullet
                    key={bIdx}
                    bulletText={b}
                    onChange={(text) => updateCustomSectionBullet(sectionId, idx, bIdx, text)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. TAGS / SKILLS STYLE */}
      {styleType === 'tags' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item, idx) => (
            <div key={item.id || idx}>
              {item.category && (
                <div style={{ fontSize: '10px', fontWeight: '700', color: variant === 'tech' ? '#79c0ff' : '#334155', marginBottom: '5px' }}>
                  <EditableText
                    value={item.category}
                    onChange={(v) => updateCustomSectionItem(sectionId, idx, 'category', v)}
                    placeholder="Category"
                  />
                </div>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {(item.tags || []).map((t, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      background: variant === 'tech' ? '#161b22' : '#f1f5f9',
                      border: variant === 'tech' ? '1px solid #30363d' : '1px solid #e2e8f0',
                      color: variant === 'tech' ? '#58a6ff' : '#1e293b',
                      borderRadius: '4px',
                      padding: '2px 7px',
                      fontSize: '9.5px',
                      fontWeight: '500'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. PARAGRAPH / TEXT STYLE */}
      {styleType === 'text' && (
        <div>
          {items.map((item, idx) => (
            <div key={item.id || idx} style={{ marginBottom: '8px' }}>
              <EditableText
                value={item.text}
                onChange={(v) => updateCustomSectionItem(sectionId, idx, 'text', v)}
                placeholder="Write custom section text here..."
                multiline={true}
                tag="p"
                style={{
                  fontSize: '10px',
                  lineHeight: '1.65',
                  color: variant === 'tech' ? '#c9d1d9' : '#374151'
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* 4. SIMPLE LIST STYLE */}
      {styleType === 'simple' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item, idx) => (
            <div key={item.id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: variant === 'tech' ? '#58a6ff' : '#1a1a2e' }}>
                  <EditableText
                    value={item.title}
                    onChange={(v) => updateCustomSectionItem(sectionId, idx, 'title', v)}
                    placeholder="Title / Honor"
                  />
                </div>
                <div style={{ fontSize: '9.5px', color: variant === 'tech' ? '#8b949e' : '#64748b' }}>
                  <EditableText
                    value={item.issuer}
                    onChange={(v) => updateCustomSectionItem(sectionId, idx, 'issuer', v)}
                    placeholder="Conferring organization"
                  />
                  {item.description && (
                    <>
                      {' · '}
                      <EditableText
                        value={item.description}
                        onChange={(v) => updateCustomSectionItem(sectionId, idx, 'description', v)}
                        placeholder="Description"
                      />
                    </>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '9px', color: variant === 'tech' ? '#8b949e' : '#94a3b8', flexShrink: 0 }}>
                <EditableText
                  value={item.date}
                  onChange={(v) => updateCustomSectionItem(sectionId, idx, 'date', v)}
                  placeholder="Date"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionBlock>
  );
}
