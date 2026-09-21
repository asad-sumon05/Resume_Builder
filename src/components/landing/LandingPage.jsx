import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap, Download, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const { setActiveTab, setTemplate, setAccentColor } = useResume();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How is this different from traditional resume builders?',
      a: 'Unlike traditional builders that force you to fill out disconnected form fields in a sidebar, ResumeCV lets you edit directly on the paper canvas (WYSIWYG). What you see is exactly what gets downloaded to your PDF.'
    },
    {
      q: 'Are the resume templates really ATS-friendly?',
      a: 'Yes! All templates follow standard ATS parsing rules: standard section headings, clear hierarchy, clean font metrics, and vector-rendered text without table artifacts.'
    },
    {
      q: 'Is there any paywall or credit card required to download?',
      a: 'No. There are zero paywalls, zero trial traps, and zero credit card requirements. You can download high-resolution PDFs, plain text, and JSON backups 100% free.'
    },
    {
      q: 'Can I switch templates without losing my content?',
      a: 'Absolutely. You can switch between Modern Pro, Classic ATS, Executive, Tech Dark, and Timeline at any time with a single click, and all your text, dates, and bullets are preserved.'
    }
  ];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a' }}>
      {/* HERO SECTION */}
      <section style={{ background: 'linear-gradient(180deg, #f0fdf9 0%, #ffffff 100%)', padding: '72px 24px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px', background: '#d1fae5', border: '1px solid #6ee7b7', color: '#065f46', fontSize: '13px', fontWeight: '700', marginBottom: '20px' }}>
            <Sparkles size={14} color="#059669" />
            <span>AI-Powered Direct On-Canvas Resume Builder — 100% Free Without Paywalls</span>
          </div>

          <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-0.03em', lineHeight: '1.15', color: '#0f172a', marginBottom: '18px' }}>
            Build a resume that gets you hired at top companies.
          </h1>

          <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6', marginBottom: '32px', maxWidth: '680px', margin: '0 auto 32px' }}>
            Edit directly on the paper. Hover for instant AI bullet suggestions, switch templates seamlessly, optimize for ATS screeners, and download high-resolution PDFs.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
              className="btn-primary-gradient"
              onClick={() => setActiveTab('builder')}
              style={{ fontSize: '15px', padding: '12px 28px', borderRadius: '8px' }}
            >
              <span>Build My Resume Now</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'white',
                border: '1.5px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                color: '#1e293b',
                cursor: 'pointer'
              }}
            >
              Browse Templates
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '13px', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#059669" /> No credit card required</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#059669" /> Free unlimited PDF export</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#059669" /> 100% ATS compliant</span>
          </div>
        </div>
      </section>

      {/* TRUSTED LOGOS */}
      <section style={{ borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '32px 24px', background: '#fafafa', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '18px' }}>
          Job seekers hired at leading organizations worldwide
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px', flexWrap: 'wrap', opacity: 0.75, fontWeight: '800', fontSize: '18px', color: '#64748b' }}>
          <span>GOOGLE</span>
          <span>SPOTIFY</span>
          <span>TESLA</span>
          <span>AMAZON</span>
          <span>MICROSOFT</span>
          <span>STRIPE</span>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
            Everything you love about Enhancv, without the paywall
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Built specifically to give you total creative control over your career story.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '28px', borderRadius: '12px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e6f9f3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#2DC08D' }}>
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Direct On-Canvas Editing</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
              Click anywhere on the resume page to type. No clunky side forms or disconnected inputs.
            </p>
          </div>

          <div style={{ padding: '28px', borderRadius: '12px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#7C3AED' }}>
              <Sparkles size={22} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>AI Bullet Enhancer</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
              Hover over any experience bullet to generate action-driven statements with measurable impact.
            </p>
          </div>

          <div style={{ padding: '28px', borderRadius: '12px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#0EA5E9' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Live ATS Strength Meter</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
              Automated scoring audit evaluates contact completeness, metrics, bullet counts, and keywords.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ padding: '60px 24px 100px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '36px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '15px',
                      fontWeight: '700',
                      color: '#0f172a',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: '#64748b' }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 20px 16px', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '40px 24px', textAlign: 'center', fontSize: '13px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontWeight: '800', fontSize: '18px', color: '#ffffff' }}>
            Resume<span style={{ color: '#2DC08D' }}>CV</span>
          </div>
          <p>© 2026 ResumeCV. Free ATS-friendly direct resume builder. Built with React + Vite.</p>
        </div>
      </footer>
    </div>
  );
}
