import { useState, useEffect } from "react";
import themeAContent from "./theme-a.css?raw";
import themeBContent from "./theme-b.css?raw";

export default function App() {
  const [activeTheme, setActiveTheme] = useState<"theme-a" | "theme-b">("theme-a");
  const [isDark, setIsDark] = useState<boolean>(false);

  // Desactivar theme-b al inicio
  useEffect(() => {
    const themeA = document.getElementById('theme-a-css') as HTMLLinkElement;
    const themeB = document.getElementById('theme-b-css') as HTMLLinkElement;
    
    console.log('🔧 INIT - Entorno:', import.meta.env.DEV ? 'DESARROLLO' : 'PRODUCCIÓN');
    console.log('🔧 INIT - Base URL:', window.location.origin + window.location.pathname);
    console.log('🔧 INIT - Theme A encontrado:', !!themeA, 'href:', themeA?.href);
    console.log('🔧 INIT - Theme B encontrado:', !!themeB, 'href:', themeB?.href);
    
    if (themeB && themeB.href) {
      const originalHref = themeB.href;
      themeB.dataset.href = originalHref;
      themeB.removeAttribute('href');
      console.log('🔧 INIT - Theme B desactivado. Original:', originalHref, '→ data-href:', themeB.dataset.href);
    } else {
      console.log('❌ INIT - No se pudo desactivar Theme B');
    }
    
    // Verificar que los CSS se están cargando
    setTimeout(() => {
      const styles = document.querySelectorAll('link[rel="stylesheet"]');
      console.log('🔧 INIT - Total CSS links encontrados:', styles.length);
      styles.forEach((link, i) => {
        console.log(`🔧 INIT - CSS ${i}:`, link.getAttribute('href'), link.getAttribute('id'));
      });
    }, 100);
  }, []);

  // Manejar cambio de modo oscuro
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleThemeChange = (theme: "theme-a" | "theme-b") => {
    const themeA = document.getElementById('theme-a-css') as HTMLLinkElement;
    const themeB = document.getElementById('theme-b-css') as HTMLLinkElement;
    
    console.log(`🎨 CAMBIO A: ${theme}`);
    console.log('🎨 ANTES - Theme A:', {href: themeA?.href, dataHref: themeA?.dataset.href, disabled: themeA?.disabled});
    console.log('🎨 ANTES - Theme B:', {href: themeB?.href, dataHref: themeB?.dataset.href, disabled: themeB?.disabled});
    
    if (theme === 'theme-a') {
      // Activar theme-a
      if (themeA && themeA.dataset.href) {
        themeA.href = themeA.dataset.href;
        themeA.removeAttribute('data-href');
        console.log('✅ Theme A activado:', themeA.href);
      }
      // Desactivar theme-b
      if (themeB && themeB.href) {
        themeB.dataset.href = themeB.href;
        themeB.removeAttribute('href');
        console.log('❌ Theme B desactivado:', themeB.dataset.href);
      }
    } else {
      // Desactivar theme-a
      if (themeA && themeA.href) {
        themeA.dataset.href = themeA.href;
        themeA.removeAttribute('href');
        console.log('❌ Theme A desactivado:', themeA.dataset.href);
      }
      // Activar theme-b
      if (themeB && themeB.dataset.href) {
        themeB.href = themeB.dataset.href;
        themeB.removeAttribute('data-href');
        console.log('✅ Theme B activado:', themeB.href);
      }
    }
    
    // Verificar estado final
    setTimeout(() => {
      console.log('🎨 DESPUÉS - Theme A:', {href: themeA?.href, dataHref: themeA?.dataset.href, disabled: themeA?.disabled});
      console.log('🎨 DESPUÉS - Theme B:', {href: themeB?.href, dataHref: themeB?.dataset.href, disabled: themeB?.disabled});
      
      // Verificar si los CSS están realmente cargándose
      const activeLinks = document.querySelectorAll('link[rel="stylesheet"][href]');
      console.log('🎨 DESPUÉS - Links CSS activos:', activeLinks.length);
      activeLinks.forEach(link => {
        console.log('🎨 DESPUÉS - CSS activo:', link.getAttribute('href'), link.getAttribute('id'));
      });
    }, 50);
    
    setActiveTheme(theme);
  };

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 transition-colors">
        <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl mb-4 text-primary-900 dark:text-primary-100">
          Tailwind CSS v4 - Multiple themes
        </h1>

        <div className="flex gap-3 mb-6 items-center">
        <label>
          <input
            type="radio"
            name="theme"
            value="theme-a"
            checked={activeTheme === "theme-a"}
            onChange={() => handleThemeChange("theme-a")}
            className="mr-1"
          />
          <span>Theme A</span>
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="theme-b"
            checked={activeTheme === "theme-b"}
            onChange={() => handleThemeChange("theme-b")}
            className="mr-1"
          />
          <span>Theme B</span>
        </label>

          <div className="ml-4 border-l border-neutral-500 dark:border-neutral-400 pl-4 flex gap-3">
          <label>
            <input
              type="radio"
              name="mode"
              value="light"
              checked={!isDark}
              onChange={() => setIsDark(false)}
              className="mr-1"
            />
            <span>Light</span>
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="dark"
              checked={isDark}
              onChange={() => setIsDark(true)}
              className="mr-1"
            />
            <span>Dark</span>
          </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna Primary */}
          <div className="flex gap-4">
            {/* Escala Primary vertical */}
            <div className="flex flex-col gap-1">
              <div className="bg-primary-100 text-primary-900 px-2 py-1 rounded text-xs text-center">
                100
              </div>
              <div className="bg-primary-200 text-primary-900 px-2 py-1 rounded text-xs text-center">
                200
              </div>
              <div className="bg-primary-300 text-primary-900 px-2 py-1 rounded text-xs text-center">
                300
              </div>
              <div className="bg-primary-400 text-white px-2 py-1 rounded text-xs text-center">
                400
              </div>
              <div className="bg-primary-500 text-white px-2 py-1 rounded text-xs text-center">
                500
              </div>
              <div className="bg-primary-600 text-white px-2 py-1 rounded text-xs text-center">
                600
              </div>
              <div className="bg-primary-700 text-white px-2 py-1 rounded text-xs text-center">
                700
              </div>
              <div className="bg-primary-800 text-white px-2 py-1 rounded text-xs text-center">
                800
              </div>
              <div className="bg-primary-900 text-white px-2 py-1 rounded text-xs text-center">
                900
              </div>
              <h3 className="text-xs font-semibold mb-2 text-primary-800 dark:text-primary-200 transform -rotate-90 origin-center w-4 h-16 flex items-center justify-center">
                Primary
              </h3>
            </div>

            {/* Código theme-a */}
            <div className="flex-1 bg-primary-100 dark:bg-primary-900 p-4 rounded-lg border border-primary-300 dark:border-primary-700 min-w-0">
              <h3 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
                theme-a.css
              </h3>
              <pre className="text-xs text-primary-800 dark:text-primary-200 overflow-x-auto whitespace-pre-wrap break-words">
                <code>{themeAContent}</code>
              </pre>
            </div>
          </div>

          {/* Columna Secondary */}
          <div className="flex gap-4">
            {/* Escala Secondary vertical */}
            <div className="flex flex-col gap-1">
              <div className="bg-secondary-100 text-secondary-900 px-2 py-1 rounded text-xs text-center">
                100
              </div>
              <div className="bg-secondary-200 text-secondary-900 px-2 py-1 rounded text-xs text-center">
                200
              </div>
              <div className="bg-secondary-300 text-secondary-900 px-2 py-1 rounded text-xs text-center">
                300
              </div>
              <div className="bg-secondary-400 text-white px-2 py-1 rounded text-xs text-center">
                400
              </div>
              <div className="bg-secondary-500 text-white px-2 py-1 rounded text-xs text-center">
                500
              </div>
              <div className="bg-secondary-600 text-white px-2 py-1 rounded text-xs text-center">
                600
              </div>
              <div className="bg-secondary-700 text-white px-2 py-1 rounded text-xs text-center">
                700
              </div>
              <div className="bg-secondary-800 text-white px-2 py-1 rounded text-xs text-center">
                800
              </div>
              <div className="bg-secondary-900 text-white px-2 py-1 rounded text-xs text-center">
                900
              </div>
              <h3 className="text-xs font-semibold mb-2 text-secondary-800 dark:text-secondary-200 transform -rotate-90 origin-center w-4 h-16 flex items-center justify-center">
                Secondary
              </h3>
            </div>

            {/* Código theme-b */}
            <div className="flex-1 bg-secondary-100 dark:bg-secondary-900 p-4 rounded-lg border border-secondary-300 dark:border-secondary-700 min-w-0">
              <h3 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                theme-b.css
              </h3>
              <pre className="text-xs text-secondary-800 dark:text-secondary-200 overflow-x-auto whitespace-pre-wrap break-words">
                <code>{themeBContent}</code>
              </pre>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
