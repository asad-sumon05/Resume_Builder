import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AtsScoreModal({ isOpen, onClose }) {
  const { data, calculateScore, accentColor } = useResume();

  if (!isOpen) return null;

  const score = calculateScore();
  const p = data.personal;

  const checklist = [
    { label: 'Full candidate name provided', passed: !!(p.firstName && p.lastName), pts: 10 },
    { label: 'Target job title defined', passed: !!p.jobTitle, pts: 10 },
    { label: 'Direct email contact included', passed: !!p.email, pts: 10 },
    { label: 'Phone number and location provided', passed: !!(p.phone && p.location), pts: 10 },
    { label: 'Detailed professional summary (> 50 chars)', passed: !!(p.summary && p.summary.length > 50), pts: 15 },
    { label: 'At least 1 work experience entry', passed: data.experience.length >= 1, pts: 15 },
    { label: 'Detailed bullet points with action verbs', passed: data.experience.some(e => e.bullets && e.bullets.length >= 2), pts: 15 },
    { label: 'Education credentials included', passed: data.education.length >= 1, pts: 10 },
    { label: 'At least 4 relevant skills listed', passed: data.skills.length >= 4, pts: 15 }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">ATS Resume Strength Analyzer</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              Real-time audit against Applicant Tracking System benchmarks.
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Score Header Banner */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              background: score >= 80 ? '#ecfdf5' : score >= 50 ? '#fffbeb' : '#fef2f2',
              border: `1px solid ${score >= 80 ? '#a7f3d0' : score >= 50 ? '#fde68a' : '#fecaca'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: score >= 80 ? '#065f46' : score >= 50 ? '#92400e' : '#991b1b' }}>
                Overall Strength
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginTop: '2px' }}>
                {score >= 80 ? '🌟 Highly ATS-Optimized' : score >= 50 ? '⚡ Good Progress — A Few Improvements Needed' : '⚠️ Missing Key ATS Fields'}
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '900', color: score >= 80 ? '#059669' : score >= 50 ? '#d97706' : '#dc2626' }}>
              {score}%
            </div>
          </div>

          {/* Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {checklist.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.passed ? (
                    <CheckCircle2 size={16} color="#059669" />
                  ) : (
                    <AlertCircle size={16} color="#94a3b8" />
                  )}
                  <span style={{ fontSize: '12.5px', color: item.passed ? '#0f172a' : '#64748b', fontWeight: item.passed ? '600' : '400' }}>
                    {item.label}
                  </span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: item.passed ? '#059669' : '#94a3b8' }}>
                  +{item.pts}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
