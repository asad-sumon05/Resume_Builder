import React, { useRef, useEffect } from 'react';

/**
 * Direct On-Canvas Editable Text Component (Enhancv WYSIWYG)
 * Allows clicking directly on the resume paper to edit headings, titles, paragraphs, or dates.
 */
export default function EditableText({
  value = '',
  onChange,
  placeholder = 'Click to edit...',
  className = '',
  style = {},
  tag = 'span',
  multiline = false,
  onEnterPress
}) {
  const ref = useRef(null);

  // Synchronize external value changes only if element is not currently focused
  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.textContent = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (ref.current && onChange) {
      onChange(ref.current.textContent || '');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      ref.current?.blur();
      if (onEnterPress) onEnterPress();
    }
  };

  const isEmpty = !value || value.trim() === '';
  const Tag = tag;

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className={`editable-field ${isEmpty ? 'empty' : ''} ${className}`}
      data-placeholder={placeholder}
      style={{
        ...style,
        cursor: 'text'
      }}
    />
  );
}
