import { useEffect } from 'react';

export default function ThemeA() {
  useEffect(() => {
    // Remover otros temas
    const existingThemes = document.querySelectorAll('link[data-theme]');
    existingThemes.forEach(el => el.remove());
    
    // Cargar theme-a completo
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/theme-a.css';
    link.setAttribute('data-theme', 'theme-a');
    document.head.appendChild(link);
    
    return () => {
      const themeLink = document.querySelector('link[data-theme="theme-a"]');
      if (themeLink) themeLink.remove();
    };
  }, []);

  return null;
}
