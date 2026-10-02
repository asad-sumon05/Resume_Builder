import React, { useRef } from 'react';
import { Camera, Trash2 } from 'lucide-react';

export default function PhotoUpload({
  photoUrl,
  onPhotoChange,
  accentColor = '#2DC08D',
  width = 82,
  height = 106,
  borderRadius = '8px',
  style = {},
  className = ''
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const MAX_W = 400;
        const MAX_H = 500;
        let w = img.width;
        let h = img.height;
        if (w > MAX_W || h > MAX_H) {
          const ratio = Math.min(MAX_W / w, MAX_H / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const optimized = canvas.toDataURL('image/jpeg', 0.88);
        onPhotoChange(optimized);
      };
      img.onerror = () => {
        onPhotoChange(reader.result);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onPhotoChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // If there's no photo and we are printing / exporting to PDF, we don't show an empty camera box
  if (!photoUrl) {
    return (
      <div
        className={`photo-uploader-passport no-print ${className}`}
        data-html2canvas-ignore="true"
        onClick={() => fileInputRef.current?.click()}
        title="Click to upload passport-size photo"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`,
          borderRadius: borderRadius,
          border: `2px dashed ${accentColor}77`,
          background: 'rgba(241, 245, 249, 0.65)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          color: '#64748b',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
          ...style
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = accentColor;
          e.currentTarget.style.background = 'rgba(241, 245, 249, 0.95)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${accentColor}77`;
          e.currentTarget.style.background = 'rgba(241, 245, 249, 0.65)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: `${accentColor}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Camera size={16} color={accentColor} />
        </div>
        <span style={{ fontSize: '9px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          + Photo
        </span>
      </div>
    );
  }

  return (
    <div
      className={`photo-uploader-passport ${className}`}
      onClick={() => fileInputRef.current?.click()}
      title="Click to change profile photo"
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        borderRadius: borderRadius,
        cursor: 'pointer',
        overflow: 'hidden',
        border: `2.5px solid ${accentColor}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.09)',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
        ...style
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <img
        src={photoUrl}
        alt="Profile Avatar"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 15%'
        }}
      />

      {/* Hover action overlay - hidden in PDF and print */}
      <div
        className="no-print photo-overlay"
        data-html2canvas-ignore="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          opacity: 0,
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Change photo"
          >
            <Camera size={13} color="#1e293b" />
          </span>
          <button
            type="button"
            onClick={handleRemove}
            style={{
              background: '#ef4444',
              border: 'none',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Remove photo"
          >
            <Trash2 size={13} color="white" />
          </button>
        </div>
        <span style={{ fontSize: '9px', color: '#ffffff', fontWeight: '600' }}>Change</span>
      </div>
    </div>
  );
}
