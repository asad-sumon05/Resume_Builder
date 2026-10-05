import React from 'react';
import { useResume } from '../context/ResumeContext';
import EditableText from '../components/canvas/EditableText';
import InlineBullet from '../components/canvas/InlineBullet';
import PhotoUpload from '../components/canvas/PhotoUpload';
import SectionBlock from '../components/canvas/SectionBlock';
import CustomSectionBlock from '../components/canvas/CustomSectionBlock';
import EducationItem from '../components/canvas/EducationItem';
import DeclarationBlock from '../components/canvas/DeclarationBlock';

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
    updateAward,
    updateVolunteer,
    updateHobby,
    updateReference,
    accentColor
  } = useResume();

  const p = data.personal;
  const active = data.activeSections || [];

  const getCol = (secId) => {
    if (data.sectionColumns && data.sectionColumns[secId]) {
      return data.sectionColumns[secId];
    }
    if (['experience', 'projects', 'education'].includes(secId)) return 'left';
    if (secId.startsWith('custom_')) {
      const c = data.customSections?.[secId];
      if (c?.column) return c.column;
      return (c?.styleType === 'bullet' || c?.styleType === 'text') ? 'left' : 'right';
    }
    return 'right';
  };

  const leftSections = active.filter(s => s !== 'personal' && s !== 'summary' && s !== 'declaration' && getCol(s) === 'left');
  const rightSections = active.filter(s => s !== 'personal' && s !== 'summary' && s !== 'declaration' && getCol(s) === 'right');

  const renderSection = (secId) => {
    if (secId.startsWith('custom_')) {
      return <CustomSectionBlock key={secId} sectionId={secId} accentColor={accentColor} variant="classic" />;
    }

    if (secId === 'experience' && (data.experience || []).length > 0) {
      return (
        <SectionBlock key="experience" sectionId="experience" title="Work Experience" accentColor={accentColor}>
          {(data.experience || []).map((exp) => (
            <div key={exp.id} className="resume-entry" style={{ marginBottom: '14px' }}>
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
            <div key={proj.id} className="project-item resume-entry" style={{ marginBottom: '10px' }}>
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
            <div key={cert.id} className="resume-entry" style={{ fontSize: '9.5px', marginBottom: '5px' }}>
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

    if (secId === 'awards' && (data.awards || []).length > 0) {
      return (
        <SectionBlock key="awards" sectionId="awards" title="Awards & Honors" accentColor={accentColor}>
          {(data.awards || []).map((a) => (
            <div key={a.id} className="resume-entry" style={{ fontSize: '9.5px', marginBottom: '6px' }}>
              <div style={{ fontWeight: '700' }}>
                <EditableText value={a.title} onChange={(v) => updateAward(a.id, 'title', v)} placeholder="Award Title" />
              </div>
              <div style={{ color: '#888' }}>
                <EditableText value={a.issuer} onChange={(v) => updateAward(a.id, 'issuer', v)} placeholder="Issuer" />
                {a.date ? ` · ${a.date}` : ''}
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'volunteer' && (data.volunteer || []).length > 0) {
      return (
        <SectionBlock key="volunteer" sectionId="volunteer" title="Volunteering" accentColor={accentColor}>
          {(data.volunteer || []).map((v) => (
            <div key={v.id} className="resume-entry" style={{ fontSize: '9.5px', marginBottom: '6px' }}>
              <div style={{ fontWeight: '700' }}>
                <EditableText value={v.role} onChange={(v) => updateVolunteer(v.id, 'role', v)} placeholder="Role" />
              </div>
              <div style={{ color: '#888' }}>
                <EditableText value={v.organization} onChange={(v) => updateVolunteer(v.id, 'organization', v)} placeholder="Organization" />
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'hobbies' && (data.hobbies || []).length > 0) {
      return (
        <SectionBlock key="hobbies" sectionId="hobbies" title="Hobbies & Interests" accentColor={accentColor}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(data.hobbies || []).map((h) => (
              <span key={h.id} style={{ background: '#f3f4f6', padding: '3px 8px', borderRadius: '4px', fontSize: '9px', color: '#374151' }}>
                <EditableText value={h.name} onChange={(v) => updateHobby(h.id, 'name', v)} placeholder="Hobby" style={{ fontWeight: '600' }} />
                {h.description && (
                  <span style={{ color: '#6b7280', marginLeft: '4px' }}>
                    — <EditableText value={h.description} onChange={(v) => updateHobby(h.id, 'description', v)} placeholder="Description" />
                  </span>
                )}
              </span>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'references' && (data.references || []).length > 0) {
      return (
        <SectionBlock key="references" sectionId="references" title="References" accentColor={accentColor}>
          {(data.references || []).map((ref) => (
            <div key={ref.id} className="resume-entry" style={{ fontSize: '9.5px', marginBottom: '8px' }}>
              <div style={{ fontWeight: '700', color: '#111827' }}>
                <EditableText value={ref.name} onChange={(v) => updateReference(ref.id, 'name', v)} placeholder="Reference Name" />
              </div>
              <div style={{ color: '#4b5563' }}>
                <EditableText value={ref.position} onChange={(v) => updateReference(ref.id, 'position', v)} placeholder="Position" />
                {ref.company && <span> at <EditableText value={ref.company} onChange={(v) => updateReference(ref.id, 'company', v)} placeholder="Company" /></span>}
              </div>
              <div style={{ color: '#6b7280', fontSize: '8.5px' }}>
                <EditableText value={ref.email} onChange={(v) => updateReference(ref.id, 'email', v)} placeholder="Email" />
                {ref.phone && <span> • <EditableText value={ref.phone} onChange={(v) => updateReference(ref.id, 'phone', v)} placeholder="Phone" /></span>}
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    return null;
  };

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

      {/* TWO COLUMNS (Flexible Left & Right placement) */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {/* LEFT COLUMN */}
        <div style={{ flex: 1.8 }}>
          {leftSections.map((secId) => renderSection(secId))}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: 1 }}>
          {rightSections.map((secId) => renderSection(secId))}
        </div>
      </div>

      {/* FULL-WIDTH DECLARATION SECTION AT BOTTOM OF PAGE */}
      {active.includes('declaration') && (
        <div style={{ width: '100%', marginTop: '20px' }}>
          <DeclarationBlock accentColor={accentColor} variant="classic" />
        </div>
      )}
    </div>
  );
}
