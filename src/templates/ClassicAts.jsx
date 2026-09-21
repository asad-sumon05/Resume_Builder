import React from 'react';
import { useResume } from '../context/ResumeContext';
import EditableText from '../components/canvas/EditableText';
import InlineBullet from '../components/canvas/InlineBullet';
import PhotoUpload from '../components/canvas/PhotoUpload';
import SectionBlock from '../components/canvas/SectionBlock';
import CustomSectionBlock from '../components/canvas/CustomSectionBlock';
import EducationItem from '../components/canvas/EducationItem';

export default function ClassicAts() {
  const {
    data,
    updatePersonal,
    updateExperience,
    addExperience,
    removeExperience,
    addBullet,
    updateBullet,
    removeBullet,
    updateEducation,
    addEducation,
    removeEducation,
    updateSkill,
    addSkill,
    removeSkill,
    updateLanguage,
    addLanguage,
    removeLanguage,
    updateCertification,
    addCertification,
    removeCertification,
    updateProject,
    addProject,
    removeProject,
    toggleSection,
    accentColor
  } = useResume();

  const p = data.personal;
  const active = data.activeSections || [];

  return (
    <div style={{ padding: '48px 56px', minHeight: '1123px', boxSizing: 'border-box', background: '#ffffff', color: '#1a1a2e' }}>
      {/* HEADER (Clean ATS Template with balanced passport photo) */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `3px solid ${accentColor}`, paddingBottom: '16px', marginBottom: '20px', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a2e', letterSpacing: '-0.02em', lineHeight: '1.1', margin: '0 0 4px 0' }}>
            <EditableText value={p.firstName} onChange={(v) => updatePersonal('firstName', v)} placeholder="First" />{' '}
            <EditableText value={p.lastName} onChange={(v) => updatePersonal('lastName', v)} placeholder="Last" />
          </h1>
          <div style={{ fontSize: '14px', fontWeight: '600', color: accentColor, marginBottom: '10px' }}>
            <EditableText value={p.jobTitle} onChange={(v) => updatePersonal('jobTitle', v)} placeholder="Job Title" />
          </div>

          <div style={{ fontSize: '10px', color: '#555', display: 'flex', flexWrap: 'wrap', gap: '14px', lineHeight: '1.5' }}>
            <div>✉ <EditableText value={p.email} onChange={(v) => updatePersonal('email', v)} placeholder="email@example.com" /></div>
            <div>📞 <EditableText value={p.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="+1 (555) 000-0000" /></div>
            <div>📍 <EditableText value={p.location} onChange={(v) => updatePersonal('location', v)} placeholder="City, State" /></div>
            <div style={{ color: accentColor }}>🔗 <EditableText value={p.website} onChange={(v) => updatePersonal('website', v)} placeholder="linkedin.com/in/username" /></div>
          </div>
        </div>

        <PhotoUpload
          photoUrl={p.photo}
          onPhotoChange={(url) => updatePersonal('photo', url)}
          accentColor={accentColor}
          width={84}
          height={108}
          borderRadius="6px"
        />
      </header>

      {/* SUMMARY */}
      {active.includes('summary') && p.summary && (
        <SectionBlock sectionId="summary" title="Professional Summary" accentColor={accentColor} style={{ marginBottom: '20px' }}>
          <EditableText
            value={p.summary}
            onChange={(v) => updatePersonal('summary', v)}
            multiline
            tag="p"
            style={{ fontSize: '10px', lineHeight: '1.7', color: '#333' }}
            placeholder="Click to write summary..."
          />
        </SectionBlock>
      )}

      {/* TWO COLUMNS (Respects activeSections order) */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {/* LEFT COLUMN (flex: 2) */}
        <div style={{ flex: 2 }}>
          {active.map((secId) => {
            if (secId.startsWith('custom_')) {
              const cSec = data.customSections?.[secId];
              if (!cSec || cSec.styleType === 'bullet' || cSec.styleType === 'text') {
                return <CustomSectionBlock key={secId} sectionId={secId} accentColor={accentColor} variant="classic" />;
              }
              return null;
            }

            if (secId === 'experience' && (data.experience || []).length > 0) {
              return (
                <SectionBlock key="experience" sectionId="experience" title="Work Experience" accentColor={accentColor}>
                  {(data.experience || []).map((exp) => (
                    <div key={exp.id} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a2e' }}>
                          <EditableText value={exp.title} onChange={(v) => updateExperience(exp.id, 'title', v)} placeholder="Job Title" />
                        </span>
                        <span style={{ fontSize: '9px', color: '#888' }}>
                          <EditableText value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Start" />
                          {' – '}
                          <EditableText value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="End" />
                        </span>
                      </div>

                      <div style={{ fontSize: '10px', fontWeight: '600', color: '#555', marginBottom: '5px' }}>
                        <EditableText value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Company" />
                        {' · '}
                        <EditableText value={exp.location} onChange={(v) => updateExperience(exp.id, 'location', v)} placeholder="Location" />
                      </div>

                      <div style={{ paddingLeft: '4px' }}>
                        {(exp.bullets || []).map((b, bIdx) => (
                          <InlineBullet
                            key={bIdx}
                            bulletText={b}
                            onChange={(text) => updateBullet(exp.id, bIdx, text)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </SectionBlock>
              );
            }

            if (secId === 'projects' && (data.projects || []).length > 0) {
              return (
                <SectionBlock key="projects" sectionId="projects" title="Projects" accentColor={accentColor}>
                  {(data.projects || []).map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#1a1a2e' }}>
                          <EditableText value={proj.name} onChange={(v) => updateProject(proj.id, 'name', v)} placeholder="Project Name" />{' '}
                          <span style={{ fontSize: '9px', color: accentColor }}>
                            <EditableText value={proj.url} onChange={(v) => updateProject(proj.id, 'url', v)} placeholder="URL" />
                          </span>
                        </span>
                      </div>
                      <EditableText
                        value={proj.description}
                        onChange={(v) => updateProject(proj.id, 'description', v)}
                        multiline
                        tag="p"
                        style={{ fontSize: '9.5px', lineHeight: '1.55', color: '#444', marginTop: '3px' }}
                        placeholder="Project description..."
                      />
                    </div>
                  ))}
                </SectionBlock>
              );
            }

            return null;
          })}
        </div>

        {/* RIGHT COLUMN (flex: 1) */}
        <div style={{ flex: 1 }}>
          {active.map((secId) => {
            if (secId.startsWith('custom_')) {
              const cSec = data.customSections?.[secId];
              if (cSec && (cSec.styleType === 'tags' || cSec.styleType === 'simple')) {
                return <CustomSectionBlock key={secId} sectionId={secId} accentColor={accentColor} variant="classic" />;
              }
              return null;
            }

            if (secId === 'education' && (data.education || []).length > 0) {
              return (
                <SectionBlock key="education" sectionId="education" title="Education" accentColor={accentColor}>
                  {(data.education || []).map((edu) => (
                    <EducationItem key={edu.id} edu={edu} accentColor={accentColor} variant="classic" />
                  ))}
                </SectionBlock>
              );
            }

            if (secId === 'skills' && (data.skills || []).length > 0) {
              return (
                <SectionBlock key="skills" sectionId="skills" title="Skills" accentColor={accentColor}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {(data.skills || []).map((s) => (
                      <span
                        key={s.id}
                        style={{
                          padding: '3px 10px',
                          background: `${accentColor}15`,
                          color: accentColor,
                          borderRadius: '100px',
                          fontSize: '9.5px',
                          fontWeight: '600',
                          border: `1px solid ${accentColor}30`
                        }}
                      >
                        <EditableText value={s.name} onChange={(v) => updateSkill(s.id, 'name', v)} placeholder="Skill" />
                      </span>
                    ))}
                  </div>
                </SectionBlock>
              );
            }

            if (secId === 'languages' && (data.languages || []).length > 0) {
              return (
                <SectionBlock key="languages" sectionId="languages" title="Languages" accentColor={accentColor}>
                  {(data.languages || []).map((l) => (
                    <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '5px' }}>
                      <span style={{ fontWeight: '600' }}>
                        <EditableText value={l.name} onChange={(v) => updateLanguage(l.id, 'name', v)} placeholder="Language" />
                      </span>
                      <span style={{ color: '#888' }}>
                        <EditableText value={l.level} onChange={(v) => updateLanguage(l.id, 'level', v)} placeholder="Level" />
                      </span>
                    </div>
                  ))}
                </SectionBlock>
              );
            }

            if (secId === 'certifications' && (data.certifications || []).length > 0) {
              return (
                <SectionBlock key="certifications" sectionId="certifications" title="Certifications" accentColor={accentColor}>
                  {(data.certifications || []).map((cert) => (
                    <div key={cert.id} style={{ fontSize: '9.5px', marginBottom: '5px' }}>
                      <div style={{ fontWeight: '700' }}>
                        <EditableText value={cert.name} onChange={(v) => updateCertification(cert.id, 'name', v)} placeholder="Cert Name" />
                      </div>
                      <div style={{ color: '#888' }}>
                        <EditableText value={cert.issuer} onChange={(v) => updateCertification(cert.id, 'issuer', v)} placeholder="Issuer" />
                        {' · '}
                        <EditableText value={cert.date} onChange={(v) => updateCertification(cert.id, 'date', v)} placeholder="Date" />
                      </div>
                    </div>
                  ))}
                </SectionBlock>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
