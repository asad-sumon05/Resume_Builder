import React from 'react';
import { useResume } from '../context/ResumeContext';
import EditableText from '../components/canvas/EditableText';
import InlineBullet from '../components/canvas/InlineBullet';
import PhotoUpload from '../components/canvas/PhotoUpload';
import SectionBlock from '../components/canvas/SectionBlock';
import CustomSectionBlock from '../components/canvas/CustomSectionBlock';
import EducationItem from '../components/canvas/EducationItem';
import DeclarationBlock from '../components/canvas/DeclarationBlock';

export default function ModernPro() {
  const {
    data,
    updatePersonal,
    updateExperience,
    updateBullet,
    updateEducation,
    updateSkill,
    updateLanguage,
    updateCertification,
    updateProject,
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
    if (['skills', 'languages', 'hobbies'].includes(secId)) return 'left';
    if (secId.startsWith('custom_')) {
      const c = data.customSections?.[secId];
      if (c?.column) return c.column;
      return (c?.styleType === 'tags' || c?.styleType === 'simple') ? 'left' : 'right';
    }
    return 'right';
  };

  const leftSections = active.filter(s => s !== 'personal' && s !== 'declaration' && getCol(s) === 'left');
  const rightSections = active.filter(s => s !== 'personal' && s !== 'declaration' && getCol(s) === 'right');

  // RENDERER FOR SIDEBAR (LEFT) - DARK THEME
  const renderSidebarSection = (secId) => {
    if (secId.startsWith('custom_')) {
      return <CustomSectionBlock key={secId} sectionId={secId} accentColor={accentColor} variant="tech" />;
    }

    if (secId === 'skills' && (data.skills || []).length > 0) {
      return (
        <SectionBlock key="skills" sectionId="skills" title="Core Skills" accentColor={accentColor} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.skills.map((skill) => (
              <div key={skill.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: '#e2e8f0' }}>
                  <EditableText value={skill.name} onChange={(v) => updateSkill(skill.id, 'name', v)} placeholder="Skill name" />
                  <span style={{ color: accentColor, fontWeight: '600', fontSize: '9px' }}>{skill.level || 80}%</span>
                </div>
                <div style={{ height: '3.5px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${skill.level || 80}%`, background: accentColor, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'languages' && (data.languages || []).length > 0) {
      return (
        <SectionBlock key="languages" sectionId="languages" title="Languages" accentColor={accentColor} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.languages.map((l) => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: '#ffffff' }}>
                <EditableText value={l.name} onChange={(v) => updateLanguage(l.id, 'name', v)} placeholder="Language" />
                <EditableText value={l.level} onChange={(v) => updateLanguage(l.id, 'level', v)} placeholder="Level" style={{ color: accentColor }} />
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'hobbies' && (data.hobbies || []).length > 0) {
      return (
        <SectionBlock key="hobbies" sectionId="hobbies" title="Passions" accentColor={accentColor} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {data.hobbies.map((h) => (
              <div key={h.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '8.5px' }}>
                <EditableText value={h.name} onChange={(v) => updateHobby(h.id, 'name', v)} placeholder="Hobby" style={{ fontWeight: '600' }} />
                {h.description && (
                  <span style={{ opacity: 0.7, marginLeft: '3px' }}>
                    · <EditableText value={h.description} onChange={(v) => updateHobby(h.id, 'description', v)} placeholder="Detail" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'education' && (data.education || []).length > 0) {
      return (
        <SectionBlock key="education" sectionId="education" title="Education" accentColor={accentColor} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ fontSize: '9.5px', color: '#e2e8f0' }}>
                <div style={{ fontWeight: '700', color: '#ffffff' }}>
                  <EditableText value={edu.degree} onChange={(v) => updateEducation(edu.id, 'degree', v)} placeholder="Degree" />
                </div>
                <div style={{ color: accentColor, fontSize: '9px' }}>
                  <EditableText value={edu.school} onChange={(v) => updateEducation(edu.id, 'school', v)} placeholder="School" />
                </div>
                <div style={{ color: '#94a3b8', fontSize: '8.5px' }}>
                  <EditableText value={edu.graduationYear} onChange={(v) => updateEducation(edu.id, 'graduationYear', v)} placeholder="Year" />
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'certifications' && (data.certifications || []).length > 0) {
      return (
        <SectionBlock key="certifications" sectionId="certifications" title="Certifications" accentColor={accentColor} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.certifications.map((cert) => (
              <div key={cert.id} style={{ fontSize: '9.5px', color: '#e2e8f0' }}>
                <div style={{ fontWeight: '700', color: '#ffffff' }}>
                  <EditableText value={cert.name} onChange={(v) => updateCertification(cert.id, 'name', v)} placeholder="Certificate" />
                </div>
                <div style={{ color: '#94a3b8', fontSize: '8.5px' }}>
                  <EditableText value={cert.issuer} onChange={(v) => updateCertification(cert.id, 'issuer', v)} placeholder="Issuer" />
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'references' && (data.references || []).length > 0) {
      return (
        <SectionBlock key="references" sectionId="references" title="References" accentColor={accentColor} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.references.map((ref) => (
              <div key={ref.id} style={{ fontSize: '9px', color: '#cbd5e1' }}>
                <div style={{ fontWeight: '700', color: '#ffffff' }}>
                  <EditableText value={ref.name} onChange={(v) => updateReference(ref.id, 'name', v)} placeholder="Name" />
                </div>
                <div style={{ color: accentColor }}>
                  <EditableText value={ref.position} onChange={(v) => updateReference(ref.id, 'position', v)} placeholder="Position" />
                </div>
                <div style={{ color: '#94a3b8', fontSize: '8px' }}>
                  <EditableText value={ref.email} onChange={(v) => updateReference(ref.id, 'email', v)} placeholder="Email" />
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'awards' && (data.awards || []).length > 0) {
      return (
        <SectionBlock key="awards" sectionId="awards" title="Awards" accentColor={accentColor} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.awards.map((a) => (
              <div key={a.id} style={{ fontSize: '9px', color: '#cbd5e1' }}>
                <div style={{ fontWeight: '700', color: '#ffffff' }}>
                  <EditableText value={a.title} onChange={(v) => updateAward(a.id, 'title', v)} placeholder="Award" />
                </div>
                <div style={{ color: '#94a3b8', fontSize: '8.5px' }}>
                  <EditableText value={a.issuer} onChange={(v) => updateAward(a.id, 'issuer', v)} placeholder="Issuer" />
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'volunteer' && (data.volunteer || []).length > 0) {
      return (
        <SectionBlock key="volunteer" sectionId="volunteer" title="Volunteering" accentColor={accentColor} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.volunteer.map((v) => (
              <div key={v.id} style={{ fontSize: '9px', color: '#cbd5e1' }}>
                <div style={{ fontWeight: '700', color: '#ffffff' }}>
                  <EditableText value={v.role} onChange={(val) => updateVolunteer(v.id, 'role', val)} placeholder="Role" />
                </div>
                <div style={{ color: accentColor, fontSize: '8.5px' }}>
                  <EditableText value={v.organization} onChange={(val) => updateVolunteer(v.id, 'organization', val)} placeholder="Org" />
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    return null;
  };

  // RENDERER FOR MAIN (RIGHT) - LIGHT THEME
  const renderMainSection = (secId) => {
    if (secId.startsWith('custom_')) {
      return <CustomSectionBlock key={secId} sectionId={secId} accentColor={accentColor} variant="modern" />;
    }

    if (secId === 'summary' && p.summary) {
      return (
        <SectionBlock key="summary" sectionId="summary" title="Profile Summary" accentColor={accentColor}>
          <EditableText
            value={p.summary}
            onChange={(v) => updatePersonal('summary', v)}
            placeholder="Write a compelling summary highlighting your strengths, career trajectory, and value..."
            multiline={true}
            style={{ fontSize: '10px', lineHeight: '1.65', color: '#334155', display: 'block', width: '100%' }}
          />
        </SectionBlock>
      );
    }

    if (secId === 'experience' && (data.experience || []).length > 0) {
      return (
        <SectionBlock key="experience" sectionId="experience" title="Work Experience" accentColor={accentColor}>
          {data.experience.map((exp) => (
            <div key={exp.id} className="experience-item resume-entry" style={{ display: 'block', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <EditableText
                  value={exp.title}
                  onChange={(v) => updateExperience(exp.id, 'title', v)}
                  placeholder="Job Title"
                  style={{ fontSize: '11.5px', fontWeight: '700', color: '#0f172a' }}
                />
                <span style={{ fontSize: '9px', color: '#64748b' }}>
                  <EditableText value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Start" /> –{' '}
                  <EditableText value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="End" />
                </span>
              </div>

              <div style={{ fontSize: '10.5px', color: accentColor, fontWeight: '600', margin: '2px 0 6px 0' }}>
                <EditableText value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Company" />
                {', '}
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

    if (secId === 'education' && (data.education || []).length > 0) {
      return (
        <SectionBlock key="education" sectionId="education" title="Education" accentColor={accentColor}>
          {data.education.map((edu) => (
            <EducationItem key={edu.id} edu={edu} accentColor={accentColor} variant="modern" />
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'skills' && (data.skills || []).length > 0) {
      return (
        <SectionBlock key="skills" sectionId="skills" title="Skills & Competencies" accentColor={accentColor}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.skills.map((s) => (
              <span
                key={s.id}
                style={{
                  padding: '4px 10px',
                  background: `${accentColor}15`,
                  color: accentColor,
                  borderRadius: '6px',
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {data.languages.map((l) => (
              <div key={l.id} style={{ fontSize: '10px' }}>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>
                  <EditableText value={l.name} onChange={(v) => updateLanguage(l.id, 'name', v)} placeholder="Language" />:
                </span>{' '}
                <span style={{ color: '#64748b' }}>
                  <EditableText value={l.level} onChange={(v) => updateLanguage(l.id, 'level', v)} placeholder="Level" />
                </span>
              </div>
            ))}
          </div>
        </SectionBlock>
      );
    }

    if (secId === 'certifications' && (data.certifications || []).length > 0) {
      return (
        <SectionBlock key="certifications" sectionId="certifications" title="Certifications" accentColor={accentColor}>
          {data.certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <div>
                <EditableText value={cert.name} onChange={(v) => updateCertification(cert.id, 'name', v)} placeholder="Certification" style={{ fontSize: '10.5px', fontWeight: '700', color: '#0f172a' }} />
                <div style={{ fontSize: '9px', color: '#64748b' }}>
                  <EditableText value={cert.issuer} onChange={(v) => updateCertification(cert.id, 'issuer', v)} placeholder="Issuer" />
                </div>
              </div>
              <span style={{ fontSize: '8.5px', color: '#64748b' }}>
                <EditableText value={cert.date} onChange={(v) => updateCertification(cert.id, 'date', v)} placeholder="Date" />
              </span>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'projects' && (data.projects || []).length > 0) {
      return (
        <SectionBlock key="projects" sectionId="projects" title="Featured Projects" accentColor={accentColor}>
          {data.projects.map((proj) => (
            <div key={proj.id} className="project-item resume-entry" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <EditableText value={proj.name} onChange={(v) => updateProject(proj.id, 'name', v)} placeholder="Project Name" style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }} />
                {proj.url && (
                  <span style={{ fontSize: '8.5px', color: accentColor }}>
                    <EditableText value={proj.url} onChange={(v) => updateProject(proj.id, 'url', v)} placeholder="demo.link" />
                  </span>
                )}
              </div>
              <EditableText
                value={proj.description}
                onChange={(v) => updateProject(proj.id, 'description', v)}
                placeholder="Describe project impact and tools used..."
                multiline={true}
                style={{ fontSize: '9.5px', lineHeight: '1.55', color: '#475569', display: 'block' }}
              />
              {proj.technologies && (
                <div style={{ fontSize: '8.5px', color: '#64748b', marginTop: '2px' }}>
                  Tech: <EditableText value={proj.technologies} onChange={(v) => updateProject(proj.id, 'technologies', v)} placeholder="Tech stack" />
                </div>
              )}
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'awards' && (data.awards || []).length > 0) {
      return (
        <SectionBlock key="awards" sectionId="awards" title="Honors & Awards" accentColor={accentColor}>
          {data.awards.map((a) => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
              <div>
                <EditableText value={a.title} onChange={(v) => updateAward(a.id, 'title', v)} placeholder="Award Title" style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }} />
                <span style={{ fontSize: '9px', color: '#64748b', marginLeft: '6px' }}>
                  <EditableText value={a.issuer} onChange={(v) => updateAward(a.id, 'issuer', v)} placeholder="Issuer" />
                </span>
              </div>
              <span style={{ fontSize: '8.5px', color: '#64748b' }}>
                <EditableText value={a.date} onChange={(v) => updateAward(a.id, 'date', v)} placeholder="Year" />
              </span>
            </div>
          ))}
        </SectionBlock>
      );
    }

    if (secId === 'volunteer' && (data.volunteer || []).length > 0) {
      return (
        <SectionBlock key="volunteer" sectionId="volunteer" title="Volunteering & Community" accentColor={accentColor}>
          {data.volunteer.map((v) => (
            <div key={v.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <EditableText value={v.role} onChange={(val) => updateVolunteer(v.id, 'role', val)} placeholder="Volunteer Role" style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }} />
                <span style={{ fontSize: '8.5px', color: '#64748b' }}>
                  <EditableText value={v.startDate} onChange={(val) => updateVolunteer(v.id, 'startDate', val)} placeholder="Start" /> –{' '}
                  <EditableText value={v.endDate} onChange={(val) => updateVolunteer(v.id, 'endDate', val)} placeholder="End" />
                </span>
              </div>
              <div style={{ fontSize: '9px', color: accentColor }}>
                <EditableText value={v.organization} onChange={(val) => updateVolunteer(v.id, 'organization', val)} placeholder="Organization" />
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
            {data.hobbies.map((h) => (
              <span key={h.id} style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontSize: '9px', color: '#334155' }}>
                <EditableText value={h.name} onChange={(v) => updateHobby(h.id, 'name', v)} placeholder="Hobby" style={{ fontWeight: '600' }} />
                {h.description && (
                  <span style={{ color: '#64748b', marginLeft: '4px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {(data.references || []).map((ref) => (
              <div key={ref.id} style={{ fontSize: '9.5px', marginBottom: '6px' }}>
                <div style={{ fontWeight: '700', color: '#0f172a' }}>
                  <EditableText value={ref.name} onChange={(v) => updateReference(ref.id, 'name', v)} placeholder="Reference Name" />
                </div>
                <div style={{ color: '#475569' }}>
                  <EditableText value={ref.position} onChange={(v) => updateReference(ref.id, 'position', v)} placeholder="Position" />
                  {ref.company && <span> at <EditableText value={ref.company} onChange={(v) => updateReference(ref.id, 'company', v)} placeholder="Company" /></span>}
                </div>
                <div style={{ color: '#64748b', fontSize: '8.5px' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '1123px', width: '100%', boxSizing: 'border-box', background: '#ffffff' }}>
      {/* ===================== TOP SECTION: SIDEBAR + MAIN ===================== */}
      <div style={{ display: 'flex', flex: 1, width: '100%' }}>
        {/* ===================== DARK SIDEBAR ===================== */}
        <aside
          style={{
            width: '240px',
            backgroundColor: '#1a1a2e',
            color: '#ffffff',
            padding: '32px 20px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Photo & Name */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <PhotoUpload
              photoUrl={p.photo}
              onPhotoChange={(url) => updatePersonal('photo', url)}
              accentColor={accentColor}
              width={88}
              height={114}
              borderRadius="8px"
              style={{ marginBottom: '12px' }}
            />
            <h1 style={{ fontSize: '18px', fontWeight: '800', lineHeight: '1.2', margin: '10px 0 4px 0', color: '#ffffff' }}>
              <EditableText value={p.firstName} onChange={(v) => updatePersonal('firstName', v)} placeholder="First Name" />{' '}
              <EditableText value={p.lastName} onChange={(v) => updatePersonal('lastName', v)} placeholder="Last Name" />
            </h1>
            <div style={{ fontSize: '11px', color: accentColor, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <EditableText value={p.jobTitle} onChange={(v) => updatePersonal('jobTitle', v)} placeholder="Target Role" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: accentColor, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '4px', marginBottom: '10px' }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '9.5px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: accentColor }}>✉</span>
                <EditableText value={p.email} onChange={(v) => updatePersonal('email', v)} placeholder="Email address" style={{ color: '#e2e8f0', flex: 1 }} />
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: accentColor }}>📞</span>
                <EditableText value={p.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="Phone number" style={{ color: '#e2e8f0', flex: 1 }} />
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: accentColor }}>📍</span>
                <EditableText value={p.location} onChange={(v) => updatePersonal('location', v)} placeholder="City, Country" style={{ color: '#e2e8f0', flex: 1 }} />
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: accentColor }}>🔗</span>
                <EditableText value={p.website} onChange={(v) => updatePersonal('website', v)} placeholder="LinkedIn / Portfolio" style={{ color: '#e2e8f0', flex: 1 }} />
              </div>
            </div>
          </div>

          {/* Dynamic Sidebar Sections */}
          {leftSections.map((secId) => renderSidebarSection(secId))}
        </aside>

        {/* ===================== MAIN CONTENT ===================== */}
        <main style={{ flex: 1, padding: '36px 32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {rightSections.map((secId) => renderMainSection(secId))}
        </main>
      </div>

      {/* ===================== FULL-WIDTH DECLARATION AT BOTTOM ===================== */}
      {active.includes('declaration') && (
        <div style={{ width: '100%', padding: '0 36px 36px 36px', boxSizing: 'border-box' }}>
          <DeclarationBlock accentColor={accentColor} variant="modern" />
        </div>
      )}
    </div>
  );
}
