import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

const LOCAL_STORAGE_KEY = 'storybook-custom-css';
const STYLE_ELEMENT_ID = 'storybook-custom-css-style';

function injectCustomCss(css: string) {
  let styleEl = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ELEMENT_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}

const CustomCssEditorGlobal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [css, setCss] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || '';
    setCss(saved);
    injectCustomCss(saved);
  }, []);

  useEffect(() => {
    injectCustomCss(css);
    localStorage.setItem(LOCAL_STORAGE_KEY, css);
  }, [css]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    }}>
      {open && (
        <textarea
          ref={textareaRef}
          value={css}
          onChange={e => setCss(e.target.value)}
          placeholder="Paste custom shadcn CSS here..."
          style={{
            width: 320,
            height: 180,
            marginBottom: 8,
            fontFamily: 'monospace',
            fontSize: 14,
            borderRadius: 8,
            border: '1px solid #ccc',
            padding: 8,
            background: '#fff',
            color: '#222',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            resize: 'vertical',
          }}
        />
      )}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: '#222',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 18px',
          fontWeight: 600,
          fontSize: 12,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}
      >
        {open ? 'Hide CSS Editor' : 'Update Theme CSS'}
      </button>
    </div>
  );
};

// Mount the component globally if the root div exists
if (typeof window !== 'undefined') {
  const mount = document.getElementById('custom-css-editor-root');
  if (mount && !mount.hasChildNodes()) {
    createRoot(mount).render(<CustomCssEditorGlobal />);
  }
} 