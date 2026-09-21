import React, { useEffect } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import TopNav from './components/ui/TopNav';
import EditorPanel from './components/editor/EditorPanel';
import ResumeCanvas from './components/canvas/ResumeCanvas';

function AppContent() {
  const { toast, undo, redo } = useResume();

  // Global Keyboard shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      const targetTag = e.target.tagName?.toLowerCase();
      const isContentEditable = e.target.isContentEditable;
      
      if (isContentEditable || targetTag === 'input' || targetTag === 'textarea') {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* BUILDER HEADER (Exact previous version layout) */}
      <TopNav />

      {/* BUILDER LAYOUT (Left Editor Panel + Right Preview Canvas with On-Screen Editing) */}
      <div className="builder-layout" id="builderLayout">
        <EditorPanel />
        <ResumeCanvas />
      </div>

      {/* AI TOAST (Exact from previous version) */}
      {toast && (
        <div className="ai-toast" id="aiToast">
          <span style={{ fontSize: '18px' }}>✨</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}
