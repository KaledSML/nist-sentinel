/* Configuración de Tailwind (reemplaza el bloque tailwind.config que estaba en index.html).
   "content" = archivos donde Tailwind busca qué clases usas para generar solo esas. */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './app.js', './data.js', './report.js'],
  theme: {
    extend: {
      colors: { brand: { blue: '#3b82f6', zinc: '#71717a' } }
    }
  },
  plugins: []
};
