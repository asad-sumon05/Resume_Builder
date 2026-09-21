import React from 'react';
import { useResume } from '../context/ResumeContext';
import EditableText from '../components/canvas/EditableText';
import InlineBullet from '../components/canvas/InlineBullet';
import SectionBlock from '../components/canvas/SectionBlock';
import PhotoUpload from '../components/canvas/PhotoUpload';
import CustomSectionBlock from '../components/canvas/CustomSectionBlock';
import EducationItem from '../components/canvas/EducationItem';

export default function Minimalist() {
  const {
    data,
    updatePersonal,
    updateExperience,
    updateBullet,
    updateEducation,
    updateSkill,
    accentColor
  } = useResume();

  const p = data.personal;
  const active = data.activeSections || [];

  return (
    <div style={{ padding: '48px 56px', minHeight: '1123px', boxSizing: 'border-box', background: '#ffffff', color: '#111827' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.03em', color: '#111827', margin: '0 0 4px 0' }}>
            <EditableText value={p.firstName} onChange={(v) => updatePersonal('firstName', v)} placeholder="First" />{' '}
            <EditableText value={p.lastName} onChange={(v) => updatePersonal('lastName', v)} placeholder="Last" />
          </h1>
          <div style={{ fontSize: '13px', fontWeight: '600', color: accentColor, marginBottom: '10px' }}>
            <EditableText value={p.jobTitle} onChange={(v) => updatePersonal('jobTitle', v)} placeholder="Professional Title" />
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', fontSize: '9.5px', color: '#6b7280' }}>
            <span><EditableText value={p.email} onChange={(v) => updatePersonal('email', v)} placeholder="email" /></span>
            <span>•</span>
            <span><EditableText value={p.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="phone" /></span>
            <span>•</span>
            <span><EditableText value={p.location} onChange={(v) => updatePersonal('location', v)} placeholder="location" /></span>
            <span>•</span>
            <span><EditableText value={p.website} onChange={(v) => updatePersonal('website', v)} placeholder="portfolio" /></span>
          </div>
        </div>

        <PhotoUpload
          photoUrl={p.photo}
          onPhotoChange={(url) => updatePersonal('photo', url)}
          accentColor={accentColor}
          width={82}
          height={106}
          borderRadius="6px"
        />
      </div>

      <div style={{ height: '1px', background: '#e5e7eb', marginBottom: '24px' }} />

      {/* DYNAMIC SECTION ORDERING */}
      {active.map((secId) => {
        if (secId === 'personal') return null;

        // Custom Sections
        if (secId.startsWith('custom_')) {
          return (
            <CustomSectionBlock
              key={secId}
              sectionId={secId}
              accentColor={accentColor}
              variant="minimal"
            />
          );
        }

        // Summary
        if (secId === 'summary' && p.summary) {
          return (
            <SectionBlock key="summary" sectionId="summary" title="About" accentColor={accentColor}>
              <EditableText
                value={p.summary}
                onChange={(v) => updatePersonal('summary', v)}
                placeholder="Write minimal about statement..."
                multiline={true}
                style={{ fontSize: '10px', lineHeight: '1.7', color: '#4b5563', display: 'block' }}
              />
            </SectionBlock>
          );
        }

        // Experience
        if (secId === 'experience' && (data.experience || []).length > 0) {
          return (
            <SectionBlock key="experience" sectionId="experience" title="Experience" accentColor={accentColor}>
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ display: 'block', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>
                      <EditableText value={exp.title} onChange={(v) => updateExperience(exp.id, 'title', v)} placeholder="Role" />
                    </span>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>
                      <EditableText value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Start" /> –{' '}
                      <EditableText value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="End" />
                    </span>
                  </div>

                  <div style={{ fontSize: '10.5px', color: accentColor, fontWeight: '600', marginBottom: '6px' }}>
                    <EditableText value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Company" />
                    {', '}
                    <EditableText value={exp.location} onChange={(v) => updateExperience(exp.id, 'location', v)} placeholder="Location" style={{ color: '#6b7280' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {(exp.bullets || []).map((bullet, bIdx) => (
                      <InlineBullet
                        key={bIdx}
                        bulletText={bullet}
                        onChange={(newVal) => updateBullet(exp.id, bIdx, newVal)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </SectionBlock>
          );
        }

        // Education
        if (secId === 'education' && (data.education || []).length > 0) {
          return (
            <SectionBlock key="education" sectionId="education" title="Education" accentColor={accentColor}>
              {data.education.map((edu) => (
                <EducationItem key={edu.id} edu={edu} accentColor={accentColor} variant="minimal" />
              ))}
            </SectionBlock>
          );
        }

        // Skills
        if (secId === 'skills' && (data.skills || []).length > 0) {
          return (
            <SectionBlock key="skills" sectionId="skills" title="Skills" accentColor={accentColor}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {data.skills.map((sk) => (
                  <div key={sk.id} style={{ display: 'inline-flex', alignItems: 'center', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '3px 8px', fontSize: '9.5px', color: '#374151' }}>
                    <EditableText value={sk.name} onChange={(v) => updateSkill(sk.id, 'name', v)} placeholder="Skill" />
                  </div>
                ))}
              </div>
            </SectionBlock>
          );
        }

        // Projects
        if (secId === 'projects' && (data.projects || []).length > 0) {
          return (
            <SectionBlock key="projects" sectionId="projects" title="Projects" accentColor={accentColor}>
              {data.projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#111827' }}>{proj.name}</span>
                    {proj.url && <span style={{ fontSize: '9px', color: accentColor }}>{proj.url}</span>}
                  </div>
                  {proj.description && <div style={{ fontSize: '9.5px', color: '#4b5563' }}>{proj.description}</div>}
                </div>
              ))}
            </SectionBlock>
          );
        }

        // Certifications
        if (secId === 'certifications' && (data.certifications || []).length > 0) {
          return (
            <SectionBlock key="certifications" sectionId="certifications" title="Certifications" accentColor={accentColor}>
              {data.certifications.map((c) => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '9.5px' }}>
                  <span style={{ fontWeight: '700', color: '#111827' }}>{c.name} · <span style={{ fontWeight: '400', color: '#4b5563' }}>{c.issuer}</span></span>
                  <span style={{ color: '#9ca3af' }}>{c.date}</span>
                </div>
              ))}
            </SectionBlock>
          );
        }

        // Languages
        if (secId === 'languages' && (data.languages || []).length > 0) {
          return (
            <SectionBlock key="languages" sectionId="languages" title="Languages" accentColor={accentColor}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', fontSize: '9.5px' }}>
                {data.languages.map((l) => (
                  <span key={l.id}><strong>{l.name}</strong> ({l.level})</span>
                ))}
              </div>
            </SectionBlock>
          );
        }

        return null;
      })}
    </div>
  );
}
