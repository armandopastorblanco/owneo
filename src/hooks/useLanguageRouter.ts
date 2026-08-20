import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import i18n from '@/i18n';


const routeMap: Record<string, string> = {
  '/': '/en',
  '/coches': '/en/cars',
  '/nuestro-modelo': '/en/our-model',
  '/ubicaciones': '/en/locations',
  '/quienes-somos': '/en/about-us',
  '/noticias': '/en/news',
  '/contacto': '/en/contact',
  '/aviso-legal': '/en/legal-notice',
  '/politica-de-privacidad': '/en/privacy-policy',
  '/politica-de-cookies': '/en/cookies-policy',
  '/creditos': '/en/credits',
};

const routeMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(routeMap).map(([k, v]) => [v, k])
);

const prefixMap: Record<string, string> = {
  '/noticias/': '/en/news/',
  '/coches/': '/en/cars/',
};

const toEnPath = (path: string): string => {
  if (routeMap[path]) return routeMap[path];
  for (const [es, en] of Object.entries(prefixMap)) {
    if (path.startsWith(es)) return path.replace(es, en);
  }
  return `/en${path}`;
};

const toEsPath = (path: string): string => {
  if (routeMapReverse[path]) return routeMapReverse[path];
  for (const [es, en] of Object.entries(prefixMap)) {
    if (path.startsWith(en)) return path.replace(en, es);
  }
  return path.replace('/en', '');
};

export const useLanguageRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const handler = (lng: string) => setLang(lng);
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, []);

  const prevLang = useRef<string | null>(null);


  useEffect(() => {
    const isEnPath = location.pathname.startsWith('/en');
    // On first mount, let the URL win (an /en URL sets the language below).
    if (prevLang.current === null) {
      prevLang.current = i18n.language;
      if (isEnPath) return;
    }
    prevLang.current = i18n.language;
    if (i18n.language === 'en' && !isEnPath) {
      navigate(toEnPath(location.pathname), { replace: true });
    }
    if (i18n.language === 'es' && isEnPath) {
      navigate(toEsPath(location.pathname) || '/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (location.pathname.startsWith('/en') && i18n.language !== 'en') {
      i18n.changeLanguage('en');
      localStorage.setItem('owneo-lang', 'en');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
};

export default useLanguageRouter;
