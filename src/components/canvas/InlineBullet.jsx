import React from 'react';
import EditableText from './EditableText';

export default function InlineBullet({
  bulletText,
  onChange
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '3px' }}>
      <span style={{ color: '#4b5563', userSelect: 'none', lineHeight: '1.55', flexShrink: 0 }}>•</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <EditableText
          value={bulletText}
          onChange={onChange}
          placeholder="Describe your achievement or responsibility..."
          multiline={false}
          style={{ width: '100%', display: 'inline-block' }}
        />
      </div>
    </div>
  );
}
