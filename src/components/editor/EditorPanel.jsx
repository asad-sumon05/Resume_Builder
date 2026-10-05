import React, { useState, useRef } from 'react';
import { useResume, SECTIONS_CONFIG } from '../../context/ResumeContext';
import AddSectionModal from '../ui/AddSectionModal';
import { Sparkles, Trash2, Plus, GripVertical, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';

export default function EditorPanel() {
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
    updateAward,
    addAward,
    removeAward,
    updateVolunteer,
    addVolunteer,
    removeVolunteer,
    updateHobby,
    addHobby,
    removeHobby,
    addReference,
    updateReference,
    removeReference,
    updateDeclaration,
    setSectionColumn,
    moveSection,
    deleteSection,
    addCustomSection,
    deleteCustomSection,
    updateCustomSectionTitle,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem,
    addCustomSectionBullet,
    updateCustomSectionBullet,
    removeCustomSectionBullet,
    addCustomSectionTag,
    removeCustomSectionTag,
    accentColor,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    lineSpacing,
    setLineSpacing,
    showToast
  } = useResume();

  const [activeTab, setActiveTab] = useState('content'); // 'content', 'design', 'settings'
  const [activeSection, setActiveSection] = useState('personal');
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const photoInputRef = useRef(null);

  const getSectionStatus = (id) => {
    switch (id) {
      case 'personal': return data.personal.firstName ? '✓ Complete' : 'Add your info';
      case 'summary': return data.personal.summary ? '✓ Added' : 'Tell your story';
      case 'experience': return `${(data.experience || []).length} position${(data.experience || []).length !== 1 ? 's' : ''}`;
      case 'education': return `${(data.education || []).length} school${(data.education || []).length !== 1 ? 's' : ''}`;
      case 'skills': return `${(data.skills || []).length} skill${(data.skills || []).length !== 1 ? 's' : ''}`;
      case 'languages': return `${(data.languages || []).length} language${(data.languages || []).length !== 1 ? 's' : ''}`;
      case 'certifications': return `${(data.certifications || []).length} certification${(data.certifications || []).length !== 1 ? 's' : ''}`;
      case 'projects': return `${(data.projects || []).length} project${(data.projects || []).length !== 1 ? 's' : ''}`;
      case 'awards': return `${(data.awards || []).length} award${(data.awards || []).length !== 1 ? 's' : ''}`;
      case 'volunteer': return `${(data.volunteer || []).length} role${(data.volunteer || []).length !== 1 ? 's' : ''}`;
      case 'hobbies': return `${(data.hobbies || []).length} interest${(data.hobbies || []).length !== 1 ? 's' : ''}`;
      case 'references': return `${(data.references || []).length} reference${(data.references || []).length !== 1 ? 's' : ''}`;
      case 'declaration': return data.declaration?.statement ? '✓ Configured' : 'Add declaration';
      default: return '';
    }
  };

  const sigInputRef = useRef(null);

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateDeclaration('signatureImage', event.target?.result);
        showToast('Signature image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updatePersonal('photo', event.target?.result);
        showToast('Photo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkillName.trim()) {
      e.preventDefault();
      addSkill(newSkillName.trim(), 85);
      setNewSkillName('');
    }
  };

  const handleAddSkillClick = () => {
    if (newSkillName.trim()) {
      addSkill(newSkillName.trim(), 85);
      setNewSkillName('');
    }
  };

  return (
    <aside className="editor-panel no-print">
      {/* TABS */}
      <div className="editor-tabs">
        <button
          className={`editor-tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        <button
          className={`editor-tab ${activeTab === 'design' ? 'active' : ''}`}
          onClick={() => setActiveTab('design')}
        >
          Design
        </button>
        <button
          className={`editor-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* CONTENT TAB */}
      {activeTab === 'content' && (
        <div className="editor-content" id="tab-content">
          {/* SECTIONS LIST ACCORDION */}
          <div className="sections-nav">
            {(data.activeSections || ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications', 'projects']).map((secId, idx) => {
              const isCustom = secId.startsWith('custom_');
              const customSec = isCustom ? data.customSections?.[secId] : null;
              const stdSec = SECTIONS_CONFIG.find(s => s.id === secId);
              const sec = isCustom
                ? { id: secId, label: customSec?.title || 'Custom Section', icon: '📄' }
                : (stdSec || { id: secId, label: secId, icon: '📄' });
              const isActive = activeSection === secId;
              const totalSecs = (data.activeSections || []).length;

              return (
                <div key={sec.id}>
                  <div
                    className={`section-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveSection(isActive ? null : sec.id)}
                  >
                    <div className="section-nav-left">
                      <span className="section-nav-icon">{sec.icon}</span>
                      <div>
                        <div className="section-nav-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{sec.label}</span>
                          {isCustom && (
                            <span style={{ fontSize: '9px', background: `${accentColor}18`, color: accentColor, padding: '1px 5px', borderRadius: '3px', fontWeight: '700' }}>
                              CUSTOM
                            </span>
                          )}
                        </div>
                        <div className="section-nav-status">
                          {isCustom ? `${customSec?.items?.length || 0} entries (${customSec?.styleType || 'custom'})` : getSectionStatus(sec.id)}
                        </div>
                      </div>
                    </div>
                    <div className="section-nav-actions" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {/* Left/Right Column Quick Switcher */}
                      {sec.id !== 'personal' && sec.id !== 'declaration' && (
                        <div style={{ display: 'inline-flex', borderRadius: '4px', border: '1px solid #cbd5e1', overflow: 'hidden', marginRight: '4px' }}>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setSectionColumn(sec.id, 'left'); }}
                            style={{
                              padding: '2px 5px',
                              fontSize: '9px',
                              border: 'none',
                              background: (data.sectionColumns?.[sec.id] || (['experience', 'projects', 'education'].includes(sec.id) ? 'left' : 'right')) === 'left' ? accentColor : '#ffffff',
                              color: (data.sectionColumns?.[sec.id] || (['experience', 'projects', 'education'].includes(sec.id) ? 'left' : 'right')) === 'left' ? '#ffffff' : '#64748b',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                            title="Place in Left Column"
                          >
                            L
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setSectionColumn(sec.id, 'right'); }}
                            style={{
                              padding: '2px 5px',
                              fontSize: '9px',
                              border: 'none',
                              borderLeft: '1px solid #cbd5e1',
                              background: (data.sectionColumns?.[sec.id] || (['experience', 'projects', 'education'].includes(sec.id) ? 'left' : 'right')) === 'right' ? accentColor : '#ffffff',
                              color: (data.sectionColumns?.[sec.id] || (['experience', 'projects', 'education'].includes(sec.id) ? 'left' : 'right')) === 'right' ? '#ffffff' : '#64748b',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                            title="Place in Right Column"
                          >
                            R
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={(e) => { e.stopPropagation(); moveSection(sec.id, 'up'); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '3px 4px',
                          cursor: idx === 0 ? 'not-allowed' : 'pointer',
                          color: idx === 0 ? '#cbd5e1' : '#64748b',
                          display: 'inline-flex',
                          alignItems: 'center',
                          borderRadius: '4px'
                        }}
                        title="Move Up"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        type="button"
                        disabled={idx === totalSecs - 1}
                        onClick={(e) => { e.stopPropagation(); moveSection(sec.id, 'down'); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '3px 4px',
                          cursor: idx === totalSecs - 1 ? 'not-allowed' : 'pointer',
                          color: idx === totalSecs - 1 ? '#cbd5e1' : '#64748b',
                          display: 'inline-flex',
                          alignItems: 'center',
                          borderRadius: '4px'
                        }}
                        title="Move Down"
                      >
                        <ArrowDown size={13} />
                      </button>

                      {sec.id !== 'personal' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (deleteSection) deleteSection(sec.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '3px 4px',
                            cursor: 'pointer',
                            color: '#94a3b8',
                            display: 'inline-flex',
                            alignItems: 'center',
                            borderRadius: '4px',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                          title={`Delete ${sec.label} section`}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                      <span
                        className="section-nav-action"
                        style={{ transform: isActive ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', cursor: 'pointer', marginLeft: '4px' }}
                        onClick={() => setActiveSection(isActive ? null : sec.id)}
                      >
                        ▸
                      </span>
                    </div>
                  </div>

                  {/* EXPANDED SECTION FORM */}
                  {isActive && (
                    <div className="section-form-container" style={{ margin: '14px 0 20px 0', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      {/* PERSONAL INFO FORM */}
                      {sec.id === 'personal' && (
                        <div className="section-form">
                          {/* Photo Upload */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div
                              className="photo-upload"
                              onClick={() => photoInputRef.current?.click()}
                              style={{ flex: 1, margin: 0, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '10px 14px', background: '#ffffff', border: '1.5px dashed #cbd5e1', borderRadius: '8px' }}
                            >
                              {data.personal.photo ? (
                                <img
                                  src={data.personal.photo}
                                  alt="Profile Preview"
                                  style={{ width: '42px', height: '54px', borderRadius: '4px', objectFit: 'cover', border: '1.5px solid #2DC08D' }}
                                />
                              ) : (
                                <div style={{ width: '42px', height: '54px', borderRadius: '4px', background: '#f1f5f9', border: '1px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                                  👤
                                </div>
                              )}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', margin: '0 0 2px 0' }}>
                                  {data.personal.photo ? 'Change Passport Photo' : 'Upload Passport Photo'}
                                </p>
                                <p style={{ fontSize: '10.5px', color: '#64748b', margin: 0 }}>
                                  Standard 35×45mm ratio (PNG, JPG)
                                </p>
                              </div>
                              <input
                                type="file"
                                ref={photoInputRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handlePhotoUpload}
                              />
                            </div>

                            {data.personal.photo && (
                              <button
                                type="button"
                                className="entry-action-btn delete"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updatePersonal('photo', null);
                                  if (photoInputRef.current) photoInputRef.current.value = '';
                                  showToast('Profile photo removed');
                                }}
                                style={{ padding: '8px 10px', fontSize: '11px', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', background: '#fff5f5', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                                title="Remove photo"
                              >
                                <Trash2 size={13} />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>First Name</label>
                              <input
                                className="form-input"
                                value={data.personal.firstName || ''}
                                onChange={(e) => updatePersonal('firstName', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Last Name</label>
                              <input
                                className="form-input"
                                value={data.personal.lastName || ''}
                                onChange={(e) => updatePersonal('lastName', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Professional Title</label>
                            <input
                              className="form-input"
                              value={data.personal.jobTitle || ''}
                              onChange={(e) => updatePersonal('jobTitle', e.target.value)}
                            />
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                className="form-input"
                                value={data.personal.email || ''}
                                onChange={(e) => updatePersonal('email', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Phone</label>
                              <input
                                className="form-input"
                                value={data.personal.phone || ''}
                                onChange={(e) => updatePersonal('phone', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>Location</label>
                              <input
                                className="form-input"
                                value={data.personal.location || ''}
                                onChange={(e) => updatePersonal('location', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Website / LinkedIn</label>
                              <input
                                className="form-input"
                                value={data.personal.website || ''}
                                onChange={(e) => updatePersonal('website', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUMMARY FORM */}
                      {sec.id === 'summary' && (
                        <div className="section-form">
                          <div className="form-group">
                            <label>Professional Summary</label>
                            <textarea
                              className="form-textarea"
                              rows={5}
                              value={data.personal.summary || ''}
                              onChange={(e) => updatePersonal('summary', e.target.value)}
                              placeholder="Write a concise overview of your background, notable skills, and career highlights..."
                            />
                          </div>
                          <button
                            type="button"
                            className="ai-suggest-btn"
                            onClick={() => {
                              const sampleSummaries = [
                                `Results-driven ${data.personal.jobTitle || 'Professional'} with 6+ years of expertise designing scalable systems, leading cross-functional teams, and driving business KPIs.`,
                                `Innovative and detail-oriented ${data.personal.jobTitle || 'Specialist'} dedicated to solving complex problems, mentoring junior members, and delivering high-value products.`,
                                `High-performing ${data.personal.jobTitle || 'Leader'} recognized for strategic execution, customer-centric architecture, and optimizing operational workflows.`
                              ];
                              const random = sampleSummaries[Math.floor(Math.random() * sampleSummaries.length)];
                              updatePersonal('summary', random);
                              showToast('AI Summary applied! ✨');
                            }}
                          >
                            <Sparkles size={14} />
                            <span>Generate AI Summary</span>
                          </button>
                        </div>
                      )}

                      {/* EXPERIENCE FORM */}
                      {sec.id === 'experience' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Positions</span>
                            <button className="form-section-add-btn" onClick={() => addExperience()}>
                              <Plus size={14} /> Add Position
                            </button>
                          </div>

                          {(data.experience || []).map((exp, idx) => (
                            <div key={exp.id || idx} className="entry-card">
                              <div className="entry-card-header">
                                <div>
                                  <div className="entry-card-title">{exp.title || 'Untitled Position'}</div>
                                  <div className="entry-card-sub">
                                    {exp.company || 'Company'}
                                    {exp.location ? ` · ${exp.location}` : ''}
                                    {exp.startDate || exp.endDate ? ` · ${exp.startDate || ''} – ${exp.endDate || ''}` : ''}
                                  </div>
                                </div>
                                <div className="entry-card-actions">
                                  <button
                                    className="entry-action-btn delete"
                                    onClick={() => removeExperience(exp.id)}
                                    title="Delete position"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                              <div className="entry-body">
                                <div className="form-row">
                                  <div className="form-group">
                                    <label>Job Title</label>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. Senior Software Engineer"
                                      value={exp.title || ''}
                                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Company</label>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. Google / TechCorp"
                                      value={exp.company || ''}
                                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="form-row">
                                  <div className="form-group">
                                    <label>Location / Address</label>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. New York, NY or Remote"
                                      value={exp.location || ''}
                                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Start Date</label>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. Jan 2021"
                                      value={exp.startDate || ''}
                                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>End Date</label>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. Present / Dec 2023"
                                      value={exp.endDate || ''}
                                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="form-group">
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <label style={{ margin: 0 }}>Bullet Points & Achievements</label>
                                    <button
                                      type="button"
                                      className="form-section-add-btn"
                                      onClick={() => addBullet(exp.id, -1, 'Led key initiative resulting in measurable business impact')}
                                      style={{ padding: '2px 8px', fontSize: '11px' }}
                                    >
                                      <Plus size={12} /> Add Bullet
                                    </button>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {(exp.bullets || []).map((bullet, bIdx) => (
                                      <div key={bIdx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                                        <textarea
                                          className="form-textarea"
                                          rows={2}
                                          value={bullet}
                                          onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                                          placeholder="Describe your achievement..."
                                          style={{ minHeight: '48px', fontSize: '12px', marginBottom: '6px' }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <button
                                            type="button"
                                            className="ai-suggest-btn"
                                            style={{ margin: 0, padding: '3px 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                            onClick={() => {
                                              const aiEnhancements = [
                                                `Architected scalable architecture handling 20M+ daily events with 99.99% system reliability`,
                                                `Spearheaded cross-functional delivery team of 6 engineers, accelerating sprint velocity by 35%`,
                                                `Reduced infrastructure overhead by 28% ($120K annual savings) through automated resource optimization`,
                                                `Optimized core workflows and database indexing, slashing average response times by 45%`,
                                                `Mentored 4 team members on best practices, elevating code review throughput and test coverage`,
                                                `Drove 25% increase in user retention through data-driven feature iterations and A/B experiments`
                                              ];
                                              const random = aiEnhancements[Math.floor(Math.random() * aiEnhancements.length)];
                                              updateBullet(exp.id, bIdx, random);
                                              showToast('Bullet enhanced with AI metrics! ✨');
                                            }}
                                          >
                                            <Sparkles size={11} />
                                            <span>Enhance with AI</span>
                                          </button>

                                          <button
                                            type="button"
                                            className="entry-action-btn delete"
                                            title="Delete bullet"
                                            onClick={() => removeBullet(exp.id, bIdx)}
                                            style={{ padding: '3px 8px', fontSize: '11px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #fecaca', borderRadius: '4px', background: '#fff5f5' }}
                                          >
                                            <Trash2 size={11} />
                                            <span>Delete</span>
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* EDUCATION FORM */}
                      {sec.id === 'education' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Education History</span>
                            <button className="form-section-add-btn" onClick={() => addEducation()}>
                              <Plus size={14} /> Add Degree
                            </button>
                          </div>

                          {(data.education || []).map((edu, idx) => (
                            <div key={edu.id || idx} className="entry-card">
                              <div className="entry-card-header">
                                <div>
                                  <div className="entry-card-title">{edu.degree || 'Degree'}</div>
                                  <div className="entry-card-sub">{edu.institution || 'School'}</div>
                                </div>
                                <button className="entry-action-btn delete" onClick={() => removeEducation(edu.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>

                              <div className="entry-body">
                                <div className="form-group">
                                  <label>Degree / Major</label>
                                  <input
                                    className="form-input"
                                    placeholder="e.g. B.S. in Computer Science"
                                    value={edu.degree || ''}
                                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                  />
                                </div>
                                <div className="form-row">
                                  <div className="form-group" style={{ flex: 2 }}>
                                    <label>Institution / University</label>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. University of California, Berkeley"
                                      value={edu.institution || ''}
                                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                    />
                                  </div>
                                  <div className="form-group" style={{ flex: 1 }}>
                                    <label>City</label>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. Berkeley"
                                      value={edu.city !== undefined && edu.city !== null ? edu.city : (edu.location ? (edu.location.includes(',') ? edu.location.split(',')[0].trim() : edu.location) : '')}
                                      onChange={(e) => {
                                        updateEducation(edu.id, 'city', e.target.value);
                                        updateEducation(edu.id, 'location', e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="form-row">
                                  <div className="form-group">
                                    <label>Passing / Graduation Year</label>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. 2024 or 2018 – 2022 or Running"
                                      value={edu.year || edu.endDate || ''}
                                      onChange={(e) => {
                                        updateEducation(edu.id, 'year', e.target.value);
                                        updateEducation(edu.id, 'endDate', e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                      <label style={{ margin: 0 }}>Score</label>
                                      <div style={{ display: 'inline-flex', background: '#e2e8f0', borderRadius: '4px', padding: '1px' }}>
                                        <button
                                          type="button"
                                          onClick={() => updateEducation(edu.id, 'gradeType', 'CGPA')}
                                          style={{
                                            padding: '1px 6px',
                                            fontSize: '9.5px',
                                            fontWeight: '700',
                                            border: 'none',
                                            borderRadius: '3px',
                                            background: (!edu.gradeType || edu.gradeType === 'CGPA') ? accentColor : 'transparent',
                                            color: (!edu.gradeType || edu.gradeType === 'CGPA') ? '#ffffff' : '#64748b',
                                            cursor: 'pointer'
                                          }}
                                        >
                                          CGPA
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => updateEducation(edu.id, 'gradeType', 'GPA')}
                                          style={{
                                            padding: '1px 6px',
                                            fontSize: '9.5px',
                                            fontWeight: '700',
                                            border: 'none',
                                            borderRadius: '3px',
                                            background: edu.gradeType === 'GPA' ? accentColor : 'transparent',
                                            color: edu.gradeType === 'GPA' ? '#ffffff' : '#64748b',
                                            cursor: 'pointer'
                                          }}
                                        >
                                          GPA
                                        </button>
                                      </div>
                                    </div>
                                    <input
                                      className="form-input"
                                      placeholder="e.g. 3.85 / 4.0"
                                      value={edu.gpa || edu.grade || ''}
                                      onChange={(e) => {
                                        updateEducation(edu.id, 'gpa', e.target.value);
                                        updateEducation(edu.id, 'grade', e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* SKILLS FORM */}
                      {sec.id === 'skills' && (
                        <div>
                          <div className="form-group" style={{ marginBottom: '12px' }}>
                            <label>Add Skill (Press Enter or click Add)</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input
                                className="form-input"
                                placeholder="e.g. Python, Docker, Figma..."
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                onKeyDown={handleAddSkill}
                                style={{ flex: 1 }}
                              />
                              <button
                                type="button"
                                className="form-section-add-btn"
                                onClick={handleAddSkillClick}
                                style={{ padding: '0 12px', whiteSpace: 'nowrap' }}
                              >
                                <Plus size={14} /> Add
                              </button>
                            </div>
                          </div>

                          <div className="skills-tags" style={{ marginBottom: '16px' }}>
                            {(data.skills || []).map((skill, idx) => {
                              const displayName = typeof skill.name === 'object' ? (skill.name?.name || 'Skill') : (skill.name || '');
                              return (
                                <div key={skill.id || idx} className="skill-tag">
                                  <span>{displayName}</span>
                                  <span
                                    className="skill-tag-remove"
                                    onClick={() => removeSkill(skill.id)}
                                    title="Remove skill"
                                  >
                                    ×
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Skill Level Sliders */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {(data.skills || []).map((skill, idx) => {
                              const displayName = typeof skill.name === 'object' ? (skill.name?.name || 'Skill') : (skill.name || '');
                              return (
                                <div key={skill.id || idx} className="skill-level-wrap">
                                  <span style={{ fontSize: '12px', width: '110px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {displayName}
                                  </span>
                                  <input
                                    type="range"
                                    min="20"
                                    max="100"
                                    value={typeof skill.level === 'number' ? skill.level : 80}
                                    onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                                  />
                                  <span className="skill-level-label">{skill.level || 80}%</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* LANGUAGES FORM */}
                      {sec.id === 'languages' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Languages</span>
                            <button className="form-section-add-btn" onClick={() => addLanguage({ name: 'New Language', level: 'Fluent' })}>
                              <Plus size={14} /> Add Language
                            </button>
                          </div>
                          {(data.languages || []).map((l, idx) => (
                            <div key={l.id || idx} className="form-row" style={{ marginBottom: '8px', alignItems: 'center' }}>
                              <input
                                className="form-input"
                                value={l.name || ''}
                                onChange={(e) => updateLanguage(l.id, 'name', e.target.value)}
                              />
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <input
                                  className="form-input"
                                  value={l.level || ''}
                                  onChange={(e) => updateLanguage(l.id, 'level', e.target.value)}
                                />
                                <button className="entry-action-btn delete" onClick={() => removeLanguage(l.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CERTIFICATIONS FORM */}
                      {sec.id === 'certifications' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Certifications</span>
                            <button className="form-section-add-btn" onClick={() => addCertification()}>
                              <Plus size={14} /> Add Certification
                            </button>
                          </div>
                          {(data.certifications || []).map((c, idx) => (
                            <div key={c.id || idx} className="entry-card">
                              <div className="entry-card-header">
                                <div className="entry-card-title">{c.name || 'Certification'}</div>
                                <button className="entry-action-btn delete" onClick={() => removeCertification(c.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="entry-body">
                                <input
                                  className="form-input"
                                  placeholder="Certification Title"
                                  value={c.name || ''}
                                  onChange={(e) => updateCertification(c.id, 'name', e.target.value)}
                                />
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Issuer (e.g. AWS, Google)"
                                    value={c.issuer || ''}
                                    onChange={(e) => updateCertification(c.id, 'issuer', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="Year / Date"
                                    value={c.date || ''}
                                    onChange={(e) => updateCertification(c.id, 'date', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* PROJECTS FORM */}
                      {sec.id === 'projects' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Projects</span>
                            <button className="form-section-add-btn" onClick={() => addProject()}>
                              <Plus size={14} /> Add Project
                            </button>
                          </div>
                          {(data.projects || []).map((p, idx) => (
                            <div key={p.id || idx} className="entry-card">
                              <div className="entry-card-header">
                                <div className="entry-card-title">{p.name || 'Project Name'}</div>
                                <button className="entry-action-btn delete" onClick={() => removeProject(p.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="entry-body">
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Project Name"
                                    value={p.name || ''}
                                    onChange={(e) => updateProject(p.id, 'name', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="Link / URL"
                                    value={p.url || ''}
                                    onChange={(e) => updateProject(p.id, 'url', e.target.value)}
                                  />
                                </div>
                                <textarea
                                  className="form-textarea"
                                  rows={2}
                                  placeholder="Description..."
                                  value={p.description || ''}
                                  onChange={(e) => updateProject(p.id, 'description', e.target.value)}
                                />
                                <input
                                  className="form-input"
                                  placeholder="Technologies Used (comma separated)"
                                  value={p.technologies || ''}
                                  onChange={(e) => updateProject(p.id, 'technologies', e.target.value)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* AWARDS FORM */}
                      {sec.id === 'awards' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Awards & Honors</span>
                            <button className="form-section-add-btn" onClick={() => addAward()}>
                              <Plus size={14} /> Add Award
                            </button>
                          </div>
                          {(data.awards || []).map((a, idx) => (
                            <div key={a.id || idx} className="entry-card">
                              <div className="entry-card-header">
                                <div className="entry-card-title">{a.title || 'Award Title'}</div>
                                <button className="entry-action-btn delete" onClick={() => removeAward(a.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="entry-body">
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Award / Honor Title"
                                    value={a.title || ''}
                                    onChange={(e) => updateAward(a.id, 'title', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="Conferring Body / Organization"
                                    value={a.issuer || ''}
                                    onChange={(e) => updateAward(a.id, 'issuer', e.target.value)}
                                  />
                                </div>
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Year / Date (e.g. 2023)"
                                    value={a.date || ''}
                                    onChange={(e) => updateAward(a.id, 'date', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="Brief Description or Context"
                                    value={a.description || ''}
                                    onChange={(e) => updateAward(a.id, 'description', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* VOLUNTEER FORM */}
                      {sec.id === 'volunteer' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Volunteering & Community</span>
                            <button className="form-section-add-btn" onClick={() => addVolunteer()}>
                              <Plus size={14} /> Add Volunteer Role
                            </button>
                          </div>
                          {(data.volunteer || []).map((v, idx) => (
                            <div key={v.id || idx} className="entry-card">
                              <div className="entry-card-header">
                                <div className="entry-card-title">{v.role || 'Volunteer Role'}</div>
                                <button className="entry-action-btn delete" onClick={() => removeVolunteer(v.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="entry-body">
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Role Title"
                                    value={v.role || ''}
                                    onChange={(e) => updateVolunteer(v.id, 'role', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="Organization"
                                    value={v.organization || ''}
                                    onChange={(e) => updateVolunteer(v.id, 'organization', e.target.value)}
                                  />
                                </div>
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Start Date"
                                    value={v.startDate || ''}
                                    onChange={(e) => updateVolunteer(v.id, 'startDate', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="End Date"
                                    value={v.endDate || ''}
                                    onChange={(e) => updateVolunteer(v.id, 'endDate', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* HOBBIES FORM */}
                      {sec.id === 'hobbies' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Hobbies & Passions</span>
                            <button className="form-section-add-btn" onClick={() => addHobby()}>
                              <Plus size={14} /> Add Hobby
                            </button>
                          </div>
                          {(data.hobbies || []).map((h, idx) => (
                            <div key={h.id || idx} className="entry-card">
                              <div className="entry-card-header">
                                <div className="entry-card-title">{h.name || 'Hobby / Passion'}</div>
                                <button className="entry-action-btn delete" onClick={() => removeHobby(h.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="entry-body">
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Hobby Name (e.g. Marathon Running, Open Source, Chess)"
                                    value={h.name || ''}
                                    onChange={(e) => updateHobby(h.id, 'name', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="Details / Distinction (optional)"
                                    value={h.description || ''}
                                    onChange={(e) => updateHobby(h.id, 'description', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* REFERENCES FORM */}
                      {sec.id === 'references' && (
                        <div>
                          <div className="form-section-header">
                            <span className="form-section-title">Professional References</span>
                            <button className="form-section-add-btn" onClick={() => addReference()}>
                              <Plus size={14} /> Add Reference
                            </button>
                          </div>
                          {(data.references || []).map((ref, idx) => (
                            <div key={ref.id || idx} className="entry-card">
                              <div className="entry-card-header">
                                <div className="entry-card-title">{ref.name || 'Reference Contact'}</div>
                                <button className="entry-action-btn delete" onClick={() => removeReference(ref.id)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="entry-body">
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Full Name (e.g. Dr. Sarah Jenkins)"
                                    value={ref.name || ''}
                                    onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="Job Title / Role (e.g. VP of Engineering)"
                                    value={ref.position || ''}
                                    onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                                  />
                                </div>
                                <div className="form-row">
                                  <input
                                    className="form-input"
                                    placeholder="Company / Institution (e.g. TechCorp Inc.)"
                                    value={ref.company || ''}
                                    onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                                  />
                                  <input
                                    className="form-input"
                                    placeholder="Email Address"
                                    value={ref.email || ''}
                                    onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                                  />
                                </div>
                                <input
                                  className="form-input"
                                  placeholder="Phone Number (e.g. +1 (555) 987-6543)"
                                  value={ref.phone || ''}
                                  onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* DECLARATION FORM */}
                      {sec.id === 'declaration' && (
                        <div className="section-form">
                          <input
                            type="file"
                            ref={sigInputRef}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleSignatureUpload}
                          />

                          <div className="form-group" style={{ marginBottom: '12px' }}>
                            <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#1e293b' }}>Section Header</label>
                            <input
                              className="form-input"
                              placeholder="DECLARATION"
                              value={data.declaration?.title || 'DECLARATION'}
                              onChange={(e) => updateDeclaration('title', e.target.value)}
                              style={{ fontWeight: '700' }}
                            />
                          </div>

                          <div className="form-group" style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#1e293b' }}>Declaration Statement</label>
                              <button
                                type="button"
                                className="ai-suggest-btn"
                                onClick={() => {
                                  const statements = [
                                    'The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge.',
                                    'I hereby certify that all the particulars and credentials given above are true, complete, and authentic to the best of my knowledge.',
                                    'I solemnly declare that the facts and figures stated in this resume are completely correct and verifiable upon request.'
                                  ];
                                  const nextStmt = statements[Math.floor(Math.random() * statements.length)];
                                  updateDeclaration('statement', nextStmt);
                                  showToast('Declaration statement updated! ✨');
                                }}
                                style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Sparkles size={12} />
                                <span>AI Suggest</span>
                              </button>
                            </div>
                            <textarea
                              className="form-textarea"
                              rows={3}
                              placeholder="The undersigned, I declare that the information specified here is accurate to the best of my belief and knowledge."
                              value={data.declaration?.statement || ''}
                              onChange={(e) => updateDeclaration('statement', e.target.value)}
                              style={{ fontSize: '12px', lineHeight: '1.5' }}
                            />
                          </div>

                          {/* Signature & Name Controls */}
                          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                            <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                              Signature & Signee Information
                            </div>

                            <div className="form-row">
                              <div className="form-group">
                                <label style={{ fontSize: '11px', color: '#64748b' }}>Printed Full Name</label>
                                <input
                                  className="form-input"
                                  placeholder={`${data.personal?.firstName || 'Abdul'} ${data.personal?.lastName || 'Moin Khan'}`.trim()}
                                  value={data.declaration?.signeeName || ''}
                                  onChange={(e) => updateDeclaration('signeeName', e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label style={{ fontSize: '11px', color: '#64748b' }}>Handwritten Signature Text</label>
                                <input
                                  className="form-input"
                                  placeholder="Moin Khan"
                                  value={data.declaration?.signatureText || ''}
                                  onChange={(e) => updateDeclaration('signatureText', e.target.value)}
                                />
                              </div>
                            </div>

                            {/* Cursive Signature Live Preview & Upload */}
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                              <div>
                                <span style={{ fontSize: '10.5px', color: '#64748b', display: 'block' }}>Live Signature Preview:</span>
                                {data.declaration?.signatureImage ? (
                                  <img
                                    src={data.declaration.signatureImage}
                                    alt="Uploaded Signature"
                                    style={{ height: '36px', objectFit: 'contain', marginTop: '4px' }}
                                  />
                                ) : (
                                  <span style={{ fontFamily: 'Caveat, "Dancing Script", cursive', fontSize: '26px', color: '#1e293b', fontWeight: '600' }}>
                                    {data.declaration?.signatureText || data.declaration?.signeeName || `${data.personal?.firstName || 'Moin'} ${data.personal?.lastName || 'Khan'}`}
                                  </span>
                                )}
                              </div>

                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  type="button"
                                  onClick={() => sigInputRef.current?.click()}
                                  className="btn-ghost"
                                  style={{ fontSize: '11px', padding: '5px 10px' }}
                                >
                                  Upload Image
                                </button>
                                {data.declaration?.signatureImage && (
                                  <button
                                    type="button"
                                    onClick={() => updateDeclaration('signatureImage', null)}
                                    style={{ fontSize: '11px', padding: '5px 8px', border: '1px solid #fecaca', background: '#fff5f5', color: '#ef4444', borderRadius: '4px', cursor: 'pointer' }}
                                  >
                                    Reset to Text
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label style={{ fontSize: '11px', color: '#64748b' }}>Date (Optional)</label>
                              <input
                                className="form-input"
                                placeholder="e.g. Oct 5, 2026"
                                value={data.declaration?.date || ''}
                                onChange={(e) => updateDeclaration('date', e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label style={{ fontSize: '11px', color: '#64748b' }}>Place / City (Optional)</label>
                              <input
                                className="form-input"
                                placeholder="e.g. New York, USA"
                                value={data.declaration?.place || ''}
                                onChange={(e) => updateDeclaration('place', e.target.value)}
                              />
                            </div>
                          </div>

                          {/* Empty Space Control */}
                          <div className="form-group" style={{ marginTop: '12px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                                Empty Space Above Declaration
                              </label>
                              <span style={{ fontSize: '11px', fontWeight: '700', color: accentColor }}>
                                {data.declaration?.emptySpace !== undefined ? `${data.declaration.emptySpace}px` : '80px'}
                              </span>
                            </div>

                            {/* Spacing Presets */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '10px' }}>
                              {[
                                { label: 'Medium', value: 40 },
                                { label: 'Spacious', value: 80 },
                                { label: 'Large', value: 140 },
                                { label: 'Bottom', value: 200 }
                              ].map((preset) => {
                                const active = (data.declaration?.emptySpace !== undefined ? Number(data.declaration.emptySpace) : 80) === preset.value;
                                return (
                                  <button
                                    key={preset.value}
                                    type="button"
                                    onClick={() => updateDeclaration('emptySpace', preset.value)}
                                    style={{
                                      padding: '5px 4px',
                                      borderRadius: '6px',
                                      border: active ? `2px solid ${accentColor}` : '1px solid #cbd5e1',
                                      background: active ? `${accentColor}18` : '#ffffff',
                                      color: active ? accentColor : '#475569',
                                      fontSize: '10px',
                                      fontWeight: active ? '700' : '500',
                                      cursor: 'pointer',
                                      transition: 'all 0.15s'
                                    }}
                                  >
                                    {preset.label} ({preset.value}px)
                                  </button>
                                );
                              })}
                            </div>

                            {/* Range Slider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '10px', color: '#64748b' }}>0px</span>
                              <input
                                type="range"
                                min={0}
                                max={250}
                                step={5}
                                value={data.declaration?.emptySpace !== undefined ? Number(data.declaration.emptySpace) : 80}
                                onChange={(e) => updateDeclaration('emptySpace', parseInt(e.target.value, 10))}
                                style={{ flex: 1, accentColor }}
                              />
                              <span style={{ fontSize: '10px', color: '#64748b' }}>250px</span>
                            </div>

                            {/* Subtle Divider Line Toggle */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', fontSize: '11px', color: '#475569', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={!!data.declaration?.showDivider}
                                onChange={(e) => updateDeclaration('showDivider', e.target.checked)}
                                style={{ accentColor }}
                              />
                              <span>Add subtle divider line in the empty space</span>
                            </label>
                          </div>
                        </div>
                      )}

                      {/* CUSTOM SECTION FORM */}
                      {sec.id.startsWith('custom_') && (
                        <div className="section-form">
                          {(() => {
                            const cSec = data.customSections?.[sec.id];
                            if (!cSec) return <div style={{ fontSize: '12px', color: '#64748b' }}>Custom section not found.</div>;

                            return (
                              <div>
                                {/* Header Controls */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '10px' }}>
                                  <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Section Title</label>
                                    <input
                                      className="form-input"
                                      value={cSec.title}
                                      onChange={(e) => updateCustomSectionTitle(sec.id, e.target.value)}
                                      placeholder="Section Title"
                                      style={{ fontWeight: '700', fontSize: '13px', marginTop: '2px' }}
                                    />
                                  </div>
                                  <div style={{ display: 'flex', gap: '6px', marginTop: '18px' }}>
                                    {cSec.styleType !== 'text' && (
                                      <button
                                        type="button"
                                        className="form-section-add-btn"
                                        onClick={() => addCustomSectionItem(sec.id)}
                                        style={{ padding: '5px 10px', fontSize: '11.5px' }}
                                      >
                                        <Plus size={13} /> Add Item
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => deleteCustomSection(sec.id)}
                                      style={{ background: '#fff5f5', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '5px 10px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                                      title="Delete Custom Section"
                                    >
                                      <Trash2 size={13} /> Delete Section
                                    </button>
                                  </div>
                                </div>

                                {/* Style 1: Bullet Achievements */}
                                {cSec.styleType === 'bullet' && (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {(cSec.items || []).map((item, idx) => (
                                      <div key={item.id || idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Entry #{idx + 1}</span>
                                          <button
                                            type="button"
                                            onClick={() => removeCustomSectionItem(sec.id, idx)}
                                            style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '2px' }}
                                            title="Delete Item"
                                          >
                                            <Trash2 size={13} />
                                          </button>
                                        </div>

                                        <div className="form-row">
                                          <div className="form-group">
                                            <label>Title / Role / Subject</label>
                                            <input
                                              className="form-input"
                                              value={item.title || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'title', e.target.value)}
                                              placeholder="e.g. Lead Author / Initiative"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label>Organization / Publisher</label>
                                            <input
                                              className="form-input"
                                              value={item.organization || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'organization', e.target.value)}
                                              placeholder="e.g. ACM Journal / Organization"
                                            />
                                          </div>
                                        </div>

                                        <div className="form-row">
                                          <div className="form-group">
                                            <label>Date / Period</label>
                                            <input
                                              className="form-input"
                                              value={item.date || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'date', e.target.value)}
                                              placeholder="e.g. 2023 – Present"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label>Location / Details</label>
                                            <input
                                              className="form-input"
                                              value={item.location || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'location', e.target.value)}
                                              placeholder="e.g. San Francisco, CA"
                                            />
                                          </div>
                                        </div>

                                        {/* Bullets */}
                                        <div style={{ marginTop: '10px' }}>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', margin: 0 }}>Bullets & Achievements</label>
                                            <button
                                              type="button"
                                              className="form-section-add-btn"
                                              onClick={() => addCustomSectionBullet(sec.id, idx)}
                                              style={{ padding: '2px 8px', fontSize: '11px' }}
                                            >
                                              <Plus size={11} /> Add Bullet
                                            </button>
                                          </div>

                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            {(item.bullets || []).map((bullet, bIdx) => (
                                              <div key={bIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 8px' }}>
                                                <textarea
                                                  className="form-textarea"
                                                  rows={2}
                                                  value={bullet}
                                                  onChange={(e) => updateCustomSectionBullet(sec.id, idx, bIdx, e.target.value)}
                                                  placeholder="Describe achievement..."
                                                  style={{ minHeight: '44px', fontSize: '12px', marginBottom: '4px' }}
                                                />
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                  <button
                                                    type="button"
                                                    className="ai-suggest-btn"
                                                    style={{ margin: 0, padding: '2px 6px', fontSize: '10.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                                    onClick={() => {
                                                      const aiSuggestions = [
                                                        `Pioneered methodology achieving 45% measurable gain in operational throughput`,
                                                        `Authored publication cited by 150+ academic and industry practitioners`,
                                                        `Coordinated cross-functional team of 8 stakeholders across complex delivery milestones`,
                                                        `Designed and implemented novel architecture reducing computational costs by 30%`
                                                      ];
                                                      const random = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
                                                      updateCustomSectionBullet(sec.id, idx, bIdx, random);
                                                      showToast('Enhanced with AI metrics! ✨');
                                                    }}
                                                  >
                                                    <Sparkles size={11} />
                                                    <span>Enhance with AI</span>
                                                  </button>

                                                  <button
                                                    type="button"
                                                    className="entry-action-btn delete"
                                                    onClick={() => removeCustomSectionBullet(sec.id, idx, bIdx)}
                                                    style={{ padding: '2px 6px', fontSize: '10.5px', color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                                                  >
                                                    <Trash2 size={11} />
                                                    <span>Delete</span>
                                                  </button>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Style 2: Skills & Tags (Pills) */}
                                {cSec.styleType === 'tags' && (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {(cSec.items || []).map((item, idx) => (
                                      <div key={item.id || idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                          <div style={{ flex: 1, marginRight: '8px' }}>
                                            <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Group / Category Title</label>
                                            <input
                                              className="form-input"
                                              value={item.category || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'category', e.target.value)}
                                              placeholder="e.g. Core Competencies, Tools, Methodologies"
                                            />
                                          </div>
                                          <button
                                            type="button"
                                            className="entry-action-btn delete"
                                            onClick={() => removeCustomSectionItem(sec.id, idx)}
                                            style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '4px', marginTop: '14px' }}
                                            title="Delete Group"
                                          >
                                            <Trash2 size={13} />
                                          </button>
                                        </div>

                                        <div>
                                          <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Tags & Pills</label>
                                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                                            {(item.tags || []).map((t, tIdx) => (
                                              <span
                                                key={tIdx}
                                                style={{
                                                  display: 'inline-flex',
                                                  alignItems: 'center',
                                                  gap: '4px',
                                                  background: '#f1f5f9',
                                                  border: '1px solid #cbd5e1',
                                                  borderRadius: '14px',
                                                  padding: '3px 8px',
                                                  fontSize: '11px',
                                                  color: '#334155'
                                                }}
                                              >
                                                {t}
                                                <button
                                                  type="button"
                                                  onClick={() => removeCustomSectionTag(sec.id, idx, tIdx)}
                                                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#94a3b8' }}
                                                >
                                                  ×
                                                </button>
                                              </span>
                                            ))}
                                          </div>

                                          <div style={{ display: 'flex', gap: '6px' }}>
                                            <input
                                              type="text"
                                              className="form-input"
                                              id={`custom-tag-in-${sec.id}-${idx}`}
                                              placeholder="Add tag and press Enter..."
                                              style={{ fontSize: '11.5px', padding: '5px 8px' }}
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                  e.preventDefault();
                                                  addCustomSectionTag(sec.id, idx, e.target.value);
                                                  e.target.value = '';
                                                }
                                              }}
                                            />
                                            <button
                                              type="button"
                                              className="btn-ghost"
                                              style={{ padding: '5px 10px', fontSize: '11px' }}
                                              onClick={() => {
                                                const input = document.getElementById(`custom-tag-in-${sec.id}-${idx}`);
                                                if (input && input.value) {
                                                  addCustomSectionTag(sec.id, idx, input.value);
                                                  input.value = '';
                                                }
                                              }}
                                            >
                                              Add
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Style 3: Paragraph Text */}
                                {cSec.styleType === 'text' && (
                                  <div>
                                    {(cSec.items || []).map((item, idx) => (
                                      <div key={item.id || idx}>
                                        <textarea
                                          className="form-textarea"
                                          rows={4}
                                          value={item.text || ''}
                                          onChange={(e) => updateCustomSectionItem(sec.id, idx, 'text', e.target.value)}
                                          placeholder="Write your custom statement or paragraph here..."
                                          style={{ fontSize: '12px', lineHeight: '1.6' }}
                                        />
                                        <div style={{ marginTop: '8px' }}>
                                          <button
                                            type="button"
                                            className="ai-suggest-btn"
                                            onClick={() => {
                                              const suggestions = [
                                                'Recognized domain specialist with demonstrable success authoring technical publications, guiding strategic roadmaps, and mentoring multidisciplinary contributors.',
                                                'Strategic leader passionate about high-velocity execution, user-centric system architecture, and pioneering sustainable business solutions.',
                                                'Proven contributor committed to high standards of engineering excellence, continuous professional learning, and measurable organizational impact.'
                                              ];
                                              const random = suggestions[Math.floor(Math.random() * suggestions.length)];
                                              updateCustomSectionItem(sec.id, idx, 'text', random);
                                              showToast('Generated statement with AI! ✨');
                                            }}
                                            style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                                          >
                                            <Sparkles size={12} />
                                            <span>Generate with AI</span>
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Style 4: Simple List */}
                                {cSec.styleType === 'simple' && (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {(cSec.items || []).map((item, idx) => (
                                      <div key={item.id || idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Entry #{idx + 1}</span>
                                          <button
                                            type="button"
                                            onClick={() => removeCustomSectionItem(sec.id, idx)}
                                            style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '2px' }}
                                            title="Delete Entry"
                                          >
                                            <Trash2 size={13} />
                                          </button>
                                        </div>

                                        <div className="form-row">
                                          <div className="form-group">
                                            <label>Title</label>
                                            <input
                                              className="form-input"
                                              value={item.title || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'title', e.target.value)}
                                              placeholder="Title / Honor"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label>Conferring Body / Detail</label>
                                            <input
                                              className="form-input"
                                              value={item.issuer || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'issuer', e.target.value)}
                                              placeholder="Organization"
                                            />
                                          </div>
                                        </div>

                                        <div className="form-row">
                                          <div className="form-group">
                                            <label>Date</label>
                                            <input
                                              className="form-input"
                                              value={item.date || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'date', e.target.value)}
                                              placeholder="e.g. 2023"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label>Description</label>
                                            <input
                                              className="form-input"
                                              value={item.description || ''}
                                              onChange={(e) => updateCustomSectionItem(sec.id, idx, 'description', e.target.value)}
                                              placeholder="Brief context"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ADD / MANAGE SECTION BUTTON */}
          <button
            className="add-section-btn"
            id="addSectionBtn"
            onClick={() => setIsAddSectionOpen(true)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px' }}
          >
            <Plus size={16} />
            <span>+ Add / Custom Section</span>
          </button>
        </div>
      )}

      {/* DESIGN TAB */}
      {activeTab === 'design' && (
        <div className="editor-content" id="tab-design">
          <div className="section-form">
            <div className="form-group">
              <label>Font Family</label>
              <select
                className="form-select"
                id="fontFamily"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              >
                <option value="Inter">Inter (Modern)</option>
                <option value="Rubik">Rubik (Bold)</option>
                <option value="Georgia">Georgia (Classic)</option>
                <option value="'Times New Roman'">Times New Roman (Formal)</option>
                <option value="'Courier New'">Courier New (Technical)</option>
                <option value="'Playfair Display'">Playfair Display (Executive)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Font Size</label>
              <select
                className="form-select"
                id="fontSize"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              >
                <option value="small">Small (10pt base)</option>
                <option value="medium">Medium (11pt base)</option>
                <option value="large">Large (12pt base)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Line Spacing</label>
              <select
                className="form-select"
                id="lineSpacing"
                value={lineSpacing}
                onChange={(e) => setLineSpacing(e.target.value)}
              >
                <option value="compact">Compact (1.3)</option>
                <option value="normal">Normal (1.5)</option>
                <option value="relaxed">Relaxed (1.7)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Page Margin</label>
              <select className="form-select" id="pageMargin">
                <option value="narrow">Narrow (0.5in)</option>
                <option value="normal" selected>Normal (0.75in)</option>
                <option value="wide">Wide (1in)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="editor-content" id="tab-settings">
          <div className="section-form">
            <div className="form-group">
              <label>Resume Language</label>
              <select className="form-select">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="form-group">
              <label>Page Size</label>
              <select className="form-select">
                <option>A4 (210 × 297mm)</option>
                <option>US Letter (216 × 279mm)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date Format</label>
              <select className="form-select">
                <option>Jan 2023 – Present</option>
                <option>January 2023 – Present</option>
                <option>2023 – Present</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ADD SECTION MODAL */}
      <AddSectionModal isOpen={isAddSectionOpen} onClose={() => setIsAddSectionOpen(false)} />
    </aside>
  );
}
