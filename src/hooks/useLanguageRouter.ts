import { useEffect, useRef } from 'react';
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
};

const routeMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(routeMap).map(([k, v]) => [v, k])
);

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
      const enPath = routeMap[location.pathname] || `/en${location.pathname}`;
      navigate(enPath, { replace: true });
    }
    if (i18n.language === 'es' && isEnPath) {
      const esPath = routeMapReverse[location.pathname] || location.pathname.replace('/en', '');
      navigate(esPath || '/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  useEffect(() => {
    if (location.pathname.startsWith('/en') && i18n.language !== 'en') {
      i18n.changeLanguage('en');
      localStorage.setItem('owneo-lang', 'en');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
};

export default useLanguageRouter;
