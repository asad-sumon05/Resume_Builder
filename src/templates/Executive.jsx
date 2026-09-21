import React from 'react';
import { useResume } from '../context/ResumeContext';
import EditableText from '../components/canvas/EditableText';
import InlineBullet from '../components/canvas/InlineBullet';
import PhotoUpload from '../components/canvas/PhotoUpload';
import SectionBlock from '../components/canvas/SectionBlock';
import CustomSectionBlock from '../components/canvas/CustomSectionBlock';
import EducationItem from '../components/canvas/EducationItem';

export default function Executive() {
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
    accentColor
  } = useResume();

  const p = data.personal;
  const active = data.activeSections || [];

  return (
    <div style={{ minHeight: '1123px', boxSizing: 'border-box', background: '#ffffff', color: '#1e293b' }}>
      {/* EXECUTIVE PRESTIGE HEADER */}
      <header style={{ background: '#0f3460', color: '#ffffff', padding: '36px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <PhotoUpload
            photoUrl={p.photo}
            onPhotoChange={(url) => updatePersonal('photo', url)}
            accentColor={accentColor}
            width={84}
            height={108}
            borderRadius="8px"
          />
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff', margin: '0 0 4px 0' }}>
              <EditableText value={p.firstName} onChange={(v) => updatePersonal('firstName', v)} placeholder="First Name" />{' '}
              <EditableText value={p.lastName} onChange={(v) => updatePersonal('lastName', v)} placeholder="Last Name" />
            </h1>
            <div style={{ fontSize: '13px', color: accentColor, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <EditableText value={p.jobTitle} onChange={(v) => updatePersonal('jobTitle', v)} placeholder="Executive Title" />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '10px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div>✉ <EditableText value={p.email} onChange={(v) => updatePersonal('email', v)} placeholder="email" style={{ color: '#e2e8f0' }} /></div>
          <div>📞 <EditableText value={p.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="phone" style={{ color: '#e2e8f0' }} /></div>
          <div>📍 <EditableText value={p.location} onChange={(v) => updatePersonal('location', v)} placeholder="location" style={{ color: '#e2e8f0' }} /></div>
          <div>🔗 <EditableText value={p.website} onChange={(v) => updatePersonal('website', v)} placeholder="website" style={{ color: accentColor }} /></div>
        </div>
      </header>

      {/* BODY */}
      <div style={{ padding: '32px 48px' }}>
        {/* Executive Summary */}
        {active.includes('summary') && p.summary && (
          <div style={{ background: '#f8f9fc', borderLeft: `4px solid ${accentColor}`, padding: '14px 18px', borderRadius: '0 8px 8px 0', marginBottom: '24px' }}>
            <EditableText
              value={p.summary}
              onChange={(v) => updatePersonal('summary', v)}
              placeholder="Executive leadership statement..."
              multiline={true}
              style={{ fontSize: '10.5px', lineHeight: '1.7', color: '#334155', fontStyle: 'italic', display: 'block' }}
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px' }}>
          {/* MAIN COLUMN: EXPERIENCE & BULLET/TEXT CUSTOM SECTIONS */}
          <div>
            {active.map((secId) => {
              // Custom sections (bullet/text)
              if (secId.startsWith('custom_')) {
                const cSec = data.customSections?.[secId];
                if (!cSec || cSec.styleType === 'bullet' || cSec.styleType === 'text') {
                  return (
                    <CustomSectionBlock
                      key={secId}
                      sectionId={secId}
                      accentColor={accentColor}
                      variant="classic"
                    />
                  );
                }
                return null;
              }

              // Experience
              if (secId === 'experience' && (data.experience || []).length > 0) {
                return (
                  <SectionBlock key="experience" sectionId="experience" title="Executive Experience" accentColor={accentColor}>
                    {data.experience.map((exp) => (
                      <div key={exp.id} style={{ display: 'block', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <EditableText value={exp.title} onChange={(v) => updateExperience(exp.id, 'title', v)} placeholder="Position" style={{ fontSize: '11.5px', fontWeight: '700', color: '#0f172a' }} />
                          <span style={{ fontSize: '9px', color: '#64748b' }}>
                            <EditableText value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Start" /> –{' '}
                            <EditableText value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="End" />
                          </span>
                        </div>

                        <div style={{ fontSize: '10px', fontWeight: '700', color: accentColor, marginBottom: '6px' }}>
                          <EditableText value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Company" />
                          {' · '}
                          <EditableText value={exp.location} onChange={(v) => updateExperience(exp.id, 'location', v)} placeholder="Location" style={{ color: '#64748b' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '4px' }}>
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

              return null;
            })}
          </div>

          {/* SIDE COLUMN: COMPETENCIES, EDUCATION, PROJECTS, ETC. */}
          <div>
            {active.map((secId) => {
              // Custom sections (tags/simple)
              if (secId.startsWith('custom_')) {
                const cSec = data.customSections?.[secId];
                if (cSec && (cSec.styleType === 'tags' || cSec.styleType === 'simple')) {
                  return (
                    <CustomSectionBlock
                      key={secId}
                      sectionId={secId}
                      accentColor={accentColor}
                      variant="classic"
                    />
                  );
                }
                return null;
              }

              // Skills
              if (secId === 'skills' && (data.skills || []).length > 0) {
                return (
                  <SectionBlock key="skills" sectionId="skills" title="Executive Competencies" accentColor={accentColor}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {data.skills.map((sk) => (
                        <div key={sk.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f8fafc', border: `1px solid ${accentColor}40`, padding: '3px 8px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '600', color: '#1e293b' }}>
                          <EditableText value={sk.name} onChange={(v) => updateSkill(sk.id, 'name', v)} placeholder="Competency" />
                        </div>
                      ))}
                    </div>
                  </SectionBlock>
                );
              }

              // Education
              if (secId === 'education' && (data.education || []).length > 0) {
                return (
                  <SectionBlock key="education" sectionId="education" title="Education" accentColor={accentColor}>
                    {data.education.map((edu) => (
                      <EducationItem key={edu.id} edu={edu} accentColor={accentColor} variant="executive" />
                    ))}
                  </SectionBlock>
                );
              }

              // Projects
              if (secId === 'projects' && data.projects?.length > 0) {
                return (
                  <SectionBlock key="projects" sectionId="projects" title="Key Initiatives" accentColor={accentColor}>
                    {data.projects.map((pr) => (
                      <div key={pr.id} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <EditableText value={pr.name} onChange={(v) => updateProject(pr.id, 'name', v)} placeholder="Initiative" style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }} />
                        </div>
                        <EditableText value={pr.description} onChange={(v) => updateProject(pr.id, 'description', v)} placeholder="Impact & governance..." multiline style={{ fontSize: '9px', color: '#475569', display: 'block' }} />
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
                      <div key={c.id} style={{ marginBottom: '8px' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }}>
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

              // Languages
              if (secId === 'languages' && (data.languages || []).length > 0) {
                return (
                  <SectionBlock key="languages" sectionId="languages" title="Languages" accentColor={accentColor}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {data.languages.map((l) => (
                        <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px' }}>
                          <EditableText value={l.name} onChange={(v) => updateLanguage(l.id, 'name', v)} placeholder="Language" />
                          <EditableText value={l.level} onChange={(v) => updateLanguage(l.id, 'level', v)} placeholder="Proficiency" style={{ color: accentColor }} />
                        </div>
                      ))}
                    </div>
                  </SectionBlock>
                );
              }

              // Awards
              if (secId === 'awards' && (data.awards || []).length > 0) {
                return (
                  <SectionBlock key="awards" sectionId="awards" title="Honors & Board Appointments" accentColor={accentColor}>
                    {data.awards.map((a) => (
                      <div key={a.id} style={{ marginBottom: '8px' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }}>
                          <EditableText value={a.title} onChange={(v) => updateAward(a.id, 'title', v)} placeholder="Honor" />
                        </div>
                        <div style={{ fontSize: '8.5px', color: '#64748b' }}>
                          <EditableText value={a.issuer} onChange={(v) => updateAward(a.id, 'issuer', v)} placeholder="Organization" />
                        </div>
                      </div>
                    ))}
                  </SectionBlock>
                );
              }

              // Volunteer
              if (secId === 'volunteer' && (data.volunteer || []).length > 0) {
                return (
                  <SectionBlock key="volunteer" sectionId="volunteer" title="Civic Leadership" accentColor={accentColor}>
                    {data.volunteer.map((vol) => (
                      <div key={vol.id} style={{ marginBottom: '8px' }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }}>
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

              // Hobbies
              if (secId === 'hobbies' && (data.hobbies || []).length > 0) {
                return (
                  <SectionBlock key="hobbies" sectionId="hobbies" title="Affiliations & Interests" accentColor={accentColor}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {data.hobbies.map((h) => (
                        <span key={h.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2px 6px', borderRadius: '4px', fontSize: '8.5px', color: '#334155' }}>
                          <EditableText value={h.name} onChange={(v) => updateHobby(h.id, 'name', v)} placeholder="Interest" />
                        </span>
                      ))}
                    </div>
                  </SectionBlock>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
