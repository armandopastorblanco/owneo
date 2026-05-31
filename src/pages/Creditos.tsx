import { Link } from "react-router-dom";

const Creditos = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 py-16 px-6 text-center">
        <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">
          Transparencia
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-6">
          Créditos Fotográficos
        </h1>
        <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
          Algunas imágenes utilizadas en este sitio provienen de fuentes 
          externas bajo licencias Creative Commons. A continuación detallamos 
          su procedencia y condiciones de uso.
        </p>
      </div>

      {/* Tabla */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-xs tracking-[0.2em] uppercase text-white/40 font-light">Archivo</th>
                <th className="text-left py-4 px-4 text-xs tracking-[0.2em] uppercase text-white/40 font-light">Autor</th>
                <th className="text-left py-4 px-4 text-xs tracking-[0.2em] uppercase text-white/40 font-light">Fuente</th>
                <th className="text-left py-4 px-4 text-xs tracking-[0.2em] uppercase text-white/40 font-light">Licencia</th>
              </tr>
            </thead>
            <tbody>
              {/* Porsche 911 Turbo S */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-911-turbo-s-2026.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Porsche_992_Turbo_S_coupes_IAA_2025_DSC_1835.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-turbo-s-detail-1.jpg</td>
                <td className="py-4 px-4 text-white/70">Matti Blume</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:Porsche_992_Turbo_S_Cabriolet,_Auto_2025,_Zurich_(20251029-P1074410).jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white/70">porsche-turbo-s-detail-3.jpg</td>
                <td className="py-4 px-4 text-white/70">Alexander-93</td>
                <td className="py-4 px-4">
                  <a href="https://commons.wikimedia.org/wiki/File:2025_Porsche_992_Turbo_S_coupes_IAA_2025_DSC_1840.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white underline underline-offset-4 transition-colors text-xs">
                    Wikimedia Commons
                  </a>
                </td>
                <td className="py-4 px-4 text-white/40 text-xs">CC BY-SA 4.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <p className="text-white/20 text-xs mt-12 text-center leading-relaxed">
          Las imágenes de los kits de prensa oficiales de los constructores son propiedad de sus respectivas marcas 
          y se utilizan en un contexto editorial informativo. · 
          <Link to="/" className="hover:text-white/40 transition-colors ml-1">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Creditos;
