import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isEnPath = location.pathname.startsWith('/en');
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
