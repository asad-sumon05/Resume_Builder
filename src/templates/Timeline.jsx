import React from 'react';
import { useResume } from '../context/ResumeContext';
import EditableText from '../components/canvas/EditableText';
import InlineBullet from '../components/canvas/InlineBullet';
import SectionBlock from '../components/canvas/SectionBlock';
import PhotoUpload from '../components/canvas/PhotoUpload';
import CustomSectionBlock from '../components/canvas/CustomSectionBlock';
import EducationItem from '../components/canvas/EducationItem';
import DeclarationBlock from '../components/canvas/DeclarationBlock';

export default function Timeline() {
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
          variant="modern"
        />
      );
    }

    if (secId === 'experience' && (data.experience || []).length > 0) {
      return (
        <SectionBlock key="experience" sectionId="experience" title="Experience Timeline" accentColor={accentColor}>
          <div style={{ borderLeft: '2px solid #e2e8f0', marginLeft: '6px', paddingLeft: '14px', position: 'relative' }}>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ display: 'block', position: 'relative', marginBottom: '18px' }}>
                <div style={{ position: 'absolute', left: '-20px', top: '3px', width: '10px', height: '10px', borderRadius: '50%', background: accentColor, border: '2px solid white', boxShadow: `0 0 0 1px ${accentColor}` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <EditableText value={exp.title} onChange={(v) => updateExperience(exp.id, 'title', v)} placeholder="Job Title" style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }} />
                  <span style={{ fontSize: '8.5px', fontWeight: '600', background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                    <EditableText value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Start" /> –{' '}
                    <EditableText value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="End" />
                  </span>
                </div>
                <div style={{ fontSize: '9.5px', fontWeight: '600', color: accentColor, marginBottom: '4px' }}>
                  <EditableText value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Company" />
                  {' · '}
                  <EditableText value={exp.location} onChange={(v) => updateExperience(exp.id, 'location', v)} placeholder="Location" style={{ color: '#64748b' }} />
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
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'education' && (data.education || []).length > 0) {
      return (
        <SectionBlock key="education" sectionId="education" title="Education Milestones" accentColor={accentColor}>
          <div style={{ borderLeft: '2px solid #e2e8f0', marginLeft: '6px', paddingLeft: '14px', position: 'relative' }}>
            {data.education.map((edu) => (
              <EducationItem key={edu.id} edu={edu} accentColor={accentColor} variant="timeline" />
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'skills' && (data.skills || []).length > 0) {
      return (
        <SectionBlock key="skills" sectionId="skills" title="Skill Radar" accentColor={accentColor}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.skills.map((s) => (
              <div key={s.id} style={{ display: 'block', marginBottom: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: '600', color: '#334155', marginBottom: '2px' }}>
                  <EditableText value={s.name} onChange={(v) => updateSkill(s.id, 'name', v)} placeholder="Skill name" />
                  <span style={{ color: accentColor }}>{s.level}%</span>
                </div>
                <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.level}%`, background: accentColor, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'projects' && (data.projects || []).length > 0) {
      return (
        <SectionBlock key="projects" sectionId="projects" title="Key Projects" accentColor={accentColor}>
          {data.projects.map((pr) => (
            <div key={pr.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <EditableText value={pr.name} onChange={(v) => updateProject(pr.id, 'name', v)} placeholder="Project" style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }} />
              </div>
              <EditableText value={pr.description} onChange={(v) => updateProject(pr.id, 'description', v)} placeholder="Description..." multiline style={{ fontSize: '9px', color: '#475569', display: 'block' }} />
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'certifications' && (data.certifications || []).length > 0) {
      return (
        <SectionBlock key="certifications" sectionId="certifications" title="Certifications" accentColor={accentColor}>
          {data.certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#0f172a' }}>
                <EditableText value={c.name} onChange={(v) => updateCertification(c.id, 'name', v)} placeholder="Certification" />
              </div>
              <div style={{ fontSize: '8.5px', color: '#64748b' }}>
                <EditableText value={c.issuer} onChange={(v) => updateCertification(c.id, 'issuer', v)} placeholder="Issuer" />
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'languages' && (data.languages || []).length > 0) {
      return (
        <SectionBlock key="languages" sectionId="languages" title="Languages" accentColor={accentColor}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {data.languages.map((l) => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
                <EditableText value={l.name} onChange={(v) => updateLanguage(l.id, 'name', v)} placeholder="Language" />
                <EditableText value={l.level} onChange={(v) => updateLanguage(l.id, 'level', v)} placeholder="Proficiency" style={{ color: accentColor }} />
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'awards' && (data.awards || []).length > 0) {
      return (
        <SectionBlock key="awards" sectionId="awards" title="Honors & Awards" accentColor={accentColor}>
          {data.awards.map((a) => (
            <div key={a.id} style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#0f172a' }}>
                <EditableText value={a.title} onChange={(v) => updateAward(a.id, 'title', v)} placeholder="Award Title" />
              </div>
              <div style={{ fontSize: '8.5px', color: '#64748b' }}>
                <EditableText value={a.issuer} onChange={(v) => updateAward(a.id, 'issuer', v)} placeholder="Issuer" />
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'volunteer' && (data.volunteer || []).length > 0) {
      return (
        <SectionBlock key="volunteer" sectionId="volunteer" title="Volunteering" accentColor={accentColor}>
          {data.volunteer.map((vol) => (
            <div key={vol.id} style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#0f172a' }}>
                <EditableText value={vol.role} onChange={(v) => updateVolunteer(vol.id, 'role', v)} placeholder="Role" />
              </div>
              <div style={{ fontSize: '8.5px', color: '#64748b' }}>
                <EditableText value={vol.organization} onChange={(v) => updateVolunteer(vol.id, 'organization', v)} placeholder="Organization" />
              </div>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'hobbies' && (data.hobbies || []).length > 0) {
      return (
        <SectionBlock key="hobbies" sectionId="hobbies" title="Interests" accentColor={accentColor}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {data.hobbies.map((h) => (
              <span key={h.id} style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '8.5px', color: '#334155' }}>
                <EditableText value={h.name} onChange={(v) => updateHobby(h.id, 'name', v)} placeholder="Interest" style={{ fontWeight: '600' }} />
                {h.description && (
                  <span style={{ color: '#64748b', marginLeft: '3px' }}>
                    — <EditableText value={h.description} onChange={(v) => updateHobby(h.id, 'description', v)} placeholder="Detail" />
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '8px' }}>
            {(data.references || []).map((ref) => (
              <div key={ref.id} style={{ fontSize: '9px', marginBottom: '8px' }}>
                <div style={{ fontWeight: '700', color: '#0f172a' }}>
                  <EditableText value={ref.name} onChange={(v) => updateReference(ref.id, 'name', v)} placeholder="Reference Name" />
                </div>
                <div style={{ color: '#475569' }}>
                  <EditableText value={ref.position} onChange={(v) => updateReference(ref.id, 'position', v)} placeholder="Position" />
                  {ref.company && <span> at <EditableText value={ref.company} onChange={(v) => updateReference(ref.id, 'company', v)} placeholder="Company" /></span>}
                </div>
                <div style={{ color: '#64748b', fontSize: '8px' }}>
                  <EditableText value={ref.email} onChange={(v) => updateReference(ref.id, 'email', v)} placeholder="Email" />
                  {ref.phone && <span> • <EditableText value={ref.phone} onChange={(v) => updateReference(ref.id, 'phone', v)} placeholder="Phone" /></span>}
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
    <div style={{ padding: '36px', height: '100%', minHeight: '1123px', boxSizing: 'border-box', background: '#ffffff', color: '#1e293b' }}>
      {/* HEADER */}
      <div style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <PhotoUpload
            photoUrl={p.photo}
            onPhotoChange={(url) => updatePersonal('photo', url)}
            accentColor={accentColor}
            width={78}
            height={100}
            borderRadius="8px"
          />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a', margin: '0 0 4px 0' }}>
              <EditableText value={p.firstName} onChange={(v) => updatePersonal('firstName', v)} placeholder="First" />{' '}
              <EditableText value={p.lastName} onChange={(v) => updatePersonal('lastName', v)} placeholder="Last" />
            </h1>
            <div style={{ fontSize: '12px', fontWeight: '700', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <EditableText value={p.jobTitle} onChange={(v) => updatePersonal('jobTitle', v)} placeholder="Target Role" />
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '9.5px', color: '#64748b', lineHeight: '1.6' }}>
          <div>✉ <EditableText value={p.email} onChange={(v) => updatePersonal('email', v)} placeholder="Email" /></div>
          <div>📞 <EditableText value={p.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="Phone" /></div>
          <div>📍 <EditableText value={p.location} onChange={(v) => updatePersonal('location', v)} placeholder="Location" /></div>
          <div>🔗 <EditableText value={p.website} onChange={(v) => updatePersonal('website', v)} placeholder="Website / Portfolio" /></div>
        </div>
      </div>

      {/* SUMMARY */}
      {active.includes('summary') && p.summary && (
        <div style={{ marginBottom: '20px', background: '#f8fafc', borderLeft: `3px solid ${accentColor}`, padding: '10px 14px', borderRadius: '0 6px 6px 0' }}>
          <EditableText
            value={p.summary}
            onChange={(v) => updatePersonal('summary', v)}
            placeholder="Write career overview..."
            multiline={true}
            style={{ fontSize: '10px', lineHeight: '1.6', color: '#334155', display: 'block' }}
          />
        </div>
      )}

      {/* TWO COLUMNS: TIMELINE LEFT, SIDEBAR RIGHT */}
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
          <DeclarationBlock accentColor={accentColor} variant="timeline" />
        </div>
      )}
    </div>
  );
}
