import React from 'react';
import { useResume } from '../context/ResumeContext';
import EditableText from '../components/canvas/EditableText';
import InlineBullet from '../components/canvas/InlineBullet';
import PhotoUpload from '../components/canvas/PhotoUpload';
import SectionBlock from '../components/canvas/SectionBlock';
import CustomSectionBlock from '../components/canvas/CustomSectionBlock';
import EducationItem from '../components/canvas/EducationItem';
import DeclarationBlock from '../components/canvas/DeclarationBlock';

export default function TechDark() {
  const {
    data,
    updatePersonal,
    updateExperience,
    updateBullet,
    updateEducation,
    updateSkill,
    updateProject,
    updateCertification,
    updateLanguage,
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
      return (
        <CustomSectionBlock
          key={secId}
          sectionId={secId}
          accentColor={accentColor}
          variant="tech"
        />
      );
    }

    if (secId === 'experience' && (data.experience || []).length > 0) {
      return (
        <SectionBlock key="experience" sectionId="experience" title="// experience.log" accentColor={accentColor}>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ display: 'block', marginBottom: '16px', background: '#161b22', borderLeft: `2px solid ${accentColor}`, padding: '10px 12px', borderRadius: '0 6px 6px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <EditableText value={exp.title} onChange={(v) => updateExperience(exp.id, 'title', v)} placeholder="Title" style={{ fontSize: '10.5px', fontWeight: '700', color: '#f0f6fc' }} />
                <span style={{ fontSize: '8.5px', color: '#8b949e' }}>
                  <EditableText value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Start" style={{ color: '#8b949e' }} /> - <EditableText value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="End" style={{ color: '#8b949e' }} />
                </span>
              </div>

              <div style={{ fontSize: '9.5px', color: accentColor, marginBottom: '6px' }}>
                @ <EditableText value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Company" style={{ color: accentColor }} />
                {' ('}
                <EditableText value={exp.location} onChange={(v) => updateExperience(exp.id, 'location', v)} placeholder="Location" style={{ color: '#8b949e' }} />
                {')'}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
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

    if (secId === 'skills' && (data.skills || []).length > 0) {
      return (
        <SectionBlock key="skills" sectionId="skills" title="// skills.stack" accentColor={accentColor}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {data.skills.map((sk) => (
              <div key={sk.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#21262d', border: '1px solid #30363d', borderRadius: '4px', padding: '2px 6px', fontSize: '8.5px', color: '#f0f6fc' }}>
                <EditableText value={sk.name} onChange={(v) => updateSkill(sk.id, 'name', v)} placeholder="Skill" style={{ color: '#f0f6fc' }} />
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'education' && (data.education || []).length > 0) {
      return (
        <SectionBlock key="education" sectionId="education" title="// education" accentColor={accentColor}>
          {data.education.map((edu) => (
            <EducationItem key={edu.id} edu={edu} accentColor={accentColor} variant="tech" />
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'projects' && (data.projects || []).length > 0) {
      return (
        <SectionBlock key="projects" sectionId="projects" title="// projects.repos" accentColor={accentColor}>
          {data.projects.map((pr) => (
            <div key={pr.id} style={{ marginBottom: '8px', background: '#161b22', padding: '8px', borderRadius: '4px', border: '1px solid #30363d' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <EditableText value={pr.name} onChange={(v) => updateProject(pr.id, 'name', v)} placeholder="Repo" style={{ fontSize: '9.5px', fontWeight: '700', color: accentColor }} />
              </div>
              <EditableText value={pr.description} onChange={(v) => updateProject(pr.id, 'description', v)} placeholder="Readme excerpt..." multiline style={{ fontSize: '8.5px', color: '#8b949e', display: 'block' }} />
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'certifications' && (data.certifications || []).length > 0) {
      return (
        <SectionBlock key="certifications" sectionId="certifications" title="// certifications" accentColor={accentColor}>
          {data.certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '8px', background: '#161b22', padding: '8px', borderRadius: '4px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#f0f6fc' }}>
                <EditableText value={c.name} onChange={(v) => updateCertification(c.id, 'name', v)} placeholder="Certificate" style={{ color: '#f0f6fc' }} />
              </div>
              <div style={{ fontSize: '8.5px', color: '#8b949e' }}>
                <EditableText value={c.issuer} onChange={(v) => updateCertification(c.id, 'issuer', v)} placeholder="Authority" style={{ color: '#8b949e' }} />
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'languages' && (data.languages || []).length > 0) {
      return (
        <SectionBlock key="languages" sectionId="languages" title="// languages" accentColor={accentColor}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {data.languages.map((l) => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
                <EditableText value={l.name} onChange={(v) => updateLanguage(l.id, 'name', v)} placeholder="Language" style={{ color: '#f0f6fc' }} />
                <EditableText value={l.level} onChange={(v) => updateLanguage(l.id, 'level', v)} placeholder="Proficiency" style={{ color: accentColor }} />
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'awards' && (data.awards || []).length > 0) {
      return (
        <SectionBlock key="awards" sectionId="awards" title="// awards.achievements" accentColor={accentColor}>
          {data.awards.map((a) => (
            <div key={a.id} style={{ marginBottom: '8px', background: '#161b22', padding: '8px', borderRadius: '4px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#f0f6fc' }}>
                <EditableText value={a.title} onChange={(v) => updateAward(a.id, 'title', v)} placeholder="Award" style={{ color: '#f0f6fc' }} />
              </div>
              <div style={{ fontSize: '8.5px', color: '#8b949e' }}>
                <EditableText value={a.issuer} onChange={(v) => updateAward(a.id, 'issuer', v)} placeholder="Issuer" style={{ color: '#8b949e' }} />
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'volunteer' && (data.volunteer || []).length > 0) {
      return (
        <SectionBlock key="volunteer" sectionId="volunteer" title="// open_source.contrib" accentColor={accentColor}>
          {data.volunteer.map((vol) => (
            <div key={vol.id} style={{ marginBottom: '8px', background: '#161b22', padding: '8px', borderRadius: '4px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#f0f6fc' }}>
                <EditableText value={vol.role} onChange={(v) => updateVolunteer(vol.id, 'role', v)} placeholder="Role" style={{ color: '#f0f6fc' }} />
              </div>
              <div style={{ fontSize: '8.5px', color: '#8b949e' }}>
                <EditableText value={vol.organization} onChange={(v) => updateVolunteer(vol.id, 'organization', v)} placeholder="Community" style={{ color: '#8b949e' }} />
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'hobbies' && (data.hobbies || []).length > 0) {
      return (
        <SectionBlock key="hobbies" sectionId="hobbies" title="// interests" accentColor={accentColor}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {data.hobbies.map((h) => (
              <span key={h.id} style={{ background: '#21262d', border: '1px solid #30363d', padding: '2px 6px', borderRadius: '4px', fontSize: '8.5px', color: '#c9d1d9' }}>
                <EditableText value={h.name} onChange={(v) => updateHobby(h.id, 'name', v)} placeholder="Interest" style={{ color: '#c9d1d9', fontWeight: '600' }} />
                {h.description && (
                  <span style={{ color: '#8b949e', marginLeft: '3px' }}>
                    : <EditableText value={h.description} onChange={(v) => updateHobby(h.id, 'description', v)} placeholder="Detail" style={{ color: '#8b949e' }} />
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
        <SectionBlock key="references" sectionId="references" title="// references" accentColor={accentColor}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '8px' }}>
            {(data.references || []).map((ref) => (
              <div key={ref.id} style={{ marginBottom: '4px', background: '#161b22', padding: '8px', borderRadius: '4px' }}>
                <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#58a6ff' }}>
                  <EditableText value={ref.name} onChange={(v) => updateReference(ref.id, 'name', v)} placeholder="Reference Name" style={{ color: '#58a6ff' }} />
                </div>
                <div style={{ fontSize: '8.5px', color: '#8b949e' }}>
                  <EditableText value={ref.position} onChange={(v) => updateReference(ref.id, 'position', v)} placeholder="Position" style={{ color: '#8b949e' }} />
                  {ref.company && <span> @ <EditableText value={ref.company} onChange={(v) => updateReference(ref.id, 'company', v)} placeholder="Company" style={{ color: accentColor }} /></span>}
                </div>
                <div style={{ fontSize: '8px', color: '#6e7681', marginTop: '2px' }}>
                  <EditableText value={ref.email} onChange={(v) => updateReference(ref.id, 'email', v)} placeholder="Email" style={{ color: '#6e7681' }} />
                  {ref.phone && <span> | <EditableText value={ref.phone} onChange={(v) => updateReference(ref.id, 'phone', v)} placeholder="Phone" style={{ color: '#6e7681' }} /></span>}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    return null;
  };

  return (
    <div style={{ padding: '36px 40px', minHeight: '1123px', boxSizing: 'border-box', background: '#0d1117', color: '#c9d1d9', fontFamily: 'monospace' }}>
      {/* TERMINAL HEADER */}
      <div style={{ borderBottom: '1px solid #30363d', paddingBottom: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <PhotoUpload
              photoUrl={p.photo}
              onPhotoChange={(url) => updatePersonal('photo', url)}
              accentColor={accentColor}
              width={80}
              height={102}
              borderRadius="6px"
            />
            <div>
              <div style={{ fontSize: '9px', color: accentColor, marginBottom: '2px' }}>const engineer = &#123;</div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#58a6ff', margin: '0' }}>
                <EditableText value={p.firstName} onChange={(v) => updatePersonal('firstName', v)} placeholder="First" />_
                <EditableText value={p.lastName} onChange={(v) => updatePersonal('lastName', v)} placeholder="Last" />
              </h1>
              <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '2px' }}>
                role: '<EditableText value={p.jobTitle} onChange={(v) => updatePersonal('jobTitle', v)} placeholder="Software Engineer" style={{ color: accentColor }} />',
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '9px', color: '#8b949e', lineHeight: '1.6' }}>
            <div>email: '<EditableText value={p.email} onChange={(v) => updatePersonal('email', v)} placeholder="email" style={{ color: '#58a6ff' }} />',</div>
            <div>phone: '<EditableText value={p.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="phone" style={{ color: '#58a6ff' }} />',</div>
            <div>loc: '<EditableText value={p.location} onChange={(v) => updatePersonal('location', v)} placeholder="location" style={{ color: '#58a6ff' }} />',</div>
            <div>url: '<EditableText value={p.website} onChange={(v) => updatePersonal('website', v)} placeholder="github" style={{ color: '#58a6ff' }} />'</div>
          </div>
        </div>
        <div style={{ fontSize: '9px', color: accentColor }}>&#125;;</div>
      </div>

      {/* SUMMARY / README */}
      {active.includes('summary') && p.summary && (
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '6px', padding: '10px 14px', marginBottom: '20px' }}>
          <div style={{ fontSize: '8.5px', color: '#8b949e', marginBottom: '4px' }}>// README.md</div>
          <EditableText
            value={p.summary}
            onChange={(v) => updatePersonal('summary', v)}
            placeholder="Write markdown summary..."
            multiline={true}
            style={{ fontSize: '9.5px', lineHeight: '1.6', color: '#c9d1d9', display: 'block' }}
          />
        </div>
      )}

      {/* TWO COLUMNS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '24px' }}>
        {/* LEFT COLUMN */}
        <div>
          {leftSections.map((secId) => renderSection(secId))}
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {rightSections.map((secId) => renderSection(secId))}
        </div>
      </div>

      {/* FULL-WIDTH DECLARATION AT BOTTOM */}
      {active.includes('declaration') && (
        <div style={{ width: '100%', marginTop: '24px' }}>
          <DeclarationBlock accentColor={accentColor} variant="tech" />
        </div>
      )}
    </div>
  );
}
