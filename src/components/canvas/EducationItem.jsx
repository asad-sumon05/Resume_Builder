import React from 'react';
import { useResume } from '../../context/ResumeContext';
import EditableText from './EditableText';

export default function EducationItem({ edu, accentColor = '#2DC08D', variant = 'modern' }) {
  const { updateEducation } = useResume();

  // Resolve single display year string (allowing manual entry of passing year, range, or running)
  const displayYear =
    edu.year ||
    edu.endDate ||
    (edu.startDate && edu.endDate ? `${edu.startDate} – ${edu.endDate}` : edu.startDate) ||
    '';

  const gradeLabel = edu.gradeType || 'CGPA';
  const gradeValue = edu.gpa || edu.grade || '';

  // Resolve city name only (no country)
  const displayCity =
    edu.city !== undefined && edu.city !== null
      ? edu.city
      : (edu.location
          ? (edu.location.includes(',') ? edu.location.split(',')[0].trim() : edu.location)
          : '');

  const handleCityChange = (newCity) => {
    updateEducation(edu.id, 'city', newCity);
    updateEducation(edu.id, 'location', newCity);
  };

  const renderYear = (yearStyle = {}) => {
    return (
      <span style={{ whiteSpace: 'nowrap', ...yearStyle }}>
        <EditableText
          value={displayYear}
          onChange={(v) => {
            updateEducation(edu.id, 'year', v);
            updateEducation(edu.id, 'endDate', v);
          }}
          placeholder="Year"
        />
      </span>
    );
  };

  // Render CGPA/GPA on the line below university/institution name
  const renderGrade = (gradeStyle = {}) => {
    if (!gradeValue) return null;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          marginTop: '2px',
          fontSize: '9px',
          fontWeight: '700',
          color: accentColor,
          ...gradeStyle
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
          <EditableText
            value={gradeLabel}
            onChange={(v) => updateEducation(edu.id, 'gradeType', v)}
            placeholder="CGPA/GPA"
          />
          {': '}
          <EditableText
            value={gradeValue}
            onChange={(v) => {
              updateEducation(edu.id, 'gpa', v);
              updateEducation(edu.id, 'grade', v);
            }}
            placeholder="3.85"
          />
        </span>
      </div>
    );
  };

  // ==================== 1. MODERN PRO ====================
  if (variant === 'modern') {
    return (
      <div className="education-item resume-entry" style={{ marginBottom: '14px' }}>
        {/* Line 1: Degree & Year side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>
            <EditableText
              value={edu.degree}
              onChange={(v) => updateEducation(edu.id, 'degree', v)}
              placeholder="Degree Name"
            />
          </div>
          {renderYear({ fontSize: '9px', color: '#64748b' })}
        </div>

        {/* Line 2: Institution & City */}
        <div style={{ fontSize: '9.5px', color: '#475569', marginTop: '2px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
          <EditableText
            value={edu.institution}
            onChange={(v) => updateEducation(edu.id, 'institution', v)}
            placeholder="Institution"
          />
          {displayCity && (
            <span style={{ color: '#94a3b8' }}>
              {' · '}
              <EditableText
                value={displayCity}
                onChange={handleCityChange}
                placeholder="City"
              />
            </span>
          )}
        </div>

        {/* Line 3: CGPA/GPA score at bottom of University */}
        {renderGrade()}
      </div>
    );
  }

  // ==================== 2. CLASSIC ATS ====================
  if (variant === 'classic') {
    return (
      <div className="education-item resume-entry" style={{ marginBottom: '12px' }}>
        {/* Line 1: Degree & Year side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#1a1a2e' }}>
            <EditableText
              value={edu.degree}
              onChange={(v) => updateEducation(edu.id, 'degree', v)}
              placeholder="Degree"
            />
          </span>
          {renderYear({ fontSize: '9px', color: '#888' })}
        </div>

        {/* Line 2: University & City */}
        <div style={{ fontSize: '9.5px', color: '#555', marginTop: '2px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
          <EditableText
            value={edu.institution}
            onChange={(v) => updateEducation(edu.id, 'institution', v)}
            placeholder="University"
          />
          {displayCity && (
            <span style={{ color: '#888' }}>
              {' · '}
              <EditableText
                value={displayCity}
                onChange={handleCityChange}
                placeholder="City"
              />
            </span>
          )}
        </div>

        {/* Line 3: CGPA/GPA score at bottom of University */}
        {renderGrade()}
      </div>
    );
  }

  // ==================== 3. MINIMALIST ====================
  if (variant === 'minimal') {
    return (
      <div className="education-item resume-entry" style={{ display: 'block', marginBottom: '12px' }}>
        {/* Line 1: Degree & Year side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>
            <EditableText
              value={edu.degree}
              onChange={(v) => updateEducation(edu.id, 'degree', v)}
              placeholder="Degree"
            />
          </span>
          {renderYear({ fontSize: '9px', color: '#9ca3af' })}
        </div>

        {/* Line 2: Institution & City */}
        <div style={{ fontSize: '9.5px', color: '#4b5563', marginTop: '2px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
          <EditableText
            value={edu.institution}
            onChange={(v) => updateEducation(edu.id, 'institution', v)}
            placeholder="Institution"
          />
          {displayCity && (
            <span style={{ color: '#9ca3af' }}>
              {' · '}
              <EditableText
                value={displayCity}
                onChange={handleCityChange}
                placeholder="City"
              />
            </span>
          )}
        </div>

        {/* Line 3: CGPA/GPA score at bottom of University */}
        {renderGrade({ color: accentColor, fontWeight: '600' })}
      </div>
    );
  }

  // ==================== 4. TIMELINE ====================
  if (variant === 'timeline') {
    return (
      <div className="education-item resume-entry" style={{ display: 'block', position: 'relative', marginBottom: '14px' }}>
        <div
          style={{
            position: 'absolute',
            left: '-20px',
            top: '3px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: accentColor || '#0ea5e9',
            border: '2px solid white',
            boxShadow: `0 0 0 1px ${accentColor || '#0ea5e9'}`
          }}
        />
        {/* Line 1: Degree & Year side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>
            <EditableText
              value={edu.degree}
              onChange={(v) => updateEducation(edu.id, 'degree', v)}
              placeholder="Degree"
            />
          </div>
          {renderYear({
            fontSize: '8.5px',
            fontWeight: '600',
            background: '#f1f5f9',
            color: '#475569',
            padding: '2px 6px',
            borderRadius: '4px'
          })}
        </div>

        {/* Line 2: School & City */}
        <div style={{ fontSize: '9.5px', color: '#475569', marginTop: '2px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
          <EditableText
            value={edu.institution}
            onChange={(v) => updateEducation(edu.id, 'institution', v)}
            placeholder="School"
          />
          {displayCity && (
            <span style={{ color: '#94a3b8' }}>
              {' · '}
              <EditableText
                value={displayCity}
                onChange={handleCityChange}
                placeholder="City"
              />
            </span>
          )}
        </div>

        {/* Line 3: CGPA/GPA score at bottom of University */}
        {renderGrade()}
      </div>
    );
  }

  // ==================== 5. EXECUTIVE ====================
  if (variant === 'executive') {
    return (
      <div className="education-item resume-entry" style={{ display: 'block', marginBottom: '12px' }}>
        {/* Line 1: Degree & Year side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: '700', color: '#0f172a' }}>
            <EditableText
              value={edu.degree}
              onChange={(v) => updateEducation(edu.id, 'degree', v)}
              placeholder="Degree"
            />
          </div>
          {renderYear({ fontSize: '9px', color: '#64748b' })}
        </div>

        {/* Line 2: Institution & City */}
        <div style={{ fontSize: '9.5px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
          <EditableText
            value={edu.institution}
            onChange={(v) => updateEducation(edu.id, 'institution', v)}
            placeholder="Institution"
          />
          {displayCity && (
            <span style={{ color: '#94a3b8' }}>
              {' · '}
              <EditableText
                value={displayCity}
                onChange={handleCityChange}
                placeholder="City"
              />
            </span>
          )}
        </div>

        {/* Line 3: CGPA/GPA score at bottom of University */}
        {renderGrade()}
      </div>
    );
  }

  // ==================== 6. TECH DARK ====================
  return (
    <div className="education-item resume-entry" style={{ display: 'block', marginBottom: '10px', background: '#161b22', padding: '8px 10px', borderRadius: '4px' }}>
      {/* Line 1: Degree & Year side by side */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
        <div style={{ fontSize: '10px', fontWeight: '700', color: '#f0f6fc' }}>
          <EditableText
            value={edu.degree}
            onChange={(v) => updateEducation(edu.id, 'degree', v)}
            placeholder="Degree"
          />
        </div>
        {renderYear({ fontSize: '8.5px', color: '#8b949e' })}
      </div>

      {/* Line 2: University & City */}
      <div style={{ fontSize: '9px', color: '#8b949e', marginTop: '2px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
        <EditableText
          value={edu.institution}
          onChange={(v) => updateEducation(edu.id, 'institution', v)}
          placeholder="University"
          style={{ color: '#8b949e' }}
        />
        {displayCity && (
          <span style={{ color: '#6e7681' }}>
            {' · '}
            <EditableText
              value={displayCity}
              onChange={handleCityChange}
              placeholder="City"
            />
          </span>
        )}
      </div>

      {/* Line 3: CGPA/GPA score at bottom of University */}
      {renderGrade({ fontSize: '8.5px' })}
    </div>
  );
}
