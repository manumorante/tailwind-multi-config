import { useEffect } from 'react';

export default function ThemeB() {
  useEffect(() => {
    // Remover otros temas
    const existingThemes = document.querySelectorAll('link[data-theme]');
    existingThemes.forEach(el => el.remove());
    
    // Cargar theme-b completo
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/theme-b.css';
    link.setAttribute('data-theme', 'theme-b');
    document.head.appendChild(link);
    
    return () => {
      const themeLink = document.querySelector('link[data-theme="theme-b"]');
      if (themeLink) themeLink.remove();
    };
  }, []);

  return null;
}
