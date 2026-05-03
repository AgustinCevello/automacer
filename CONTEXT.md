# AUTOMACER - Proyecto Web

**Cliente:** AUTOMACER (Servicios industriales, Argentina)
**Historia:** Empresa fundada en 1991 especializada en servicios industriales eléctricos de precisión.

## Servicios Ofrecidos
- Instalación y puesta en marcha de sistemas industriales.
- Mantenimiento preventivo y predictivo.
- Reparaciones críticas en tiempo récord.
- Programación y reparación de PLC (Controladores Lógicos Programables).
- Instalaciones Fotovoltaicas para consumo industrial.

## Identidad de Marca
- **Tono:** Profesional, dark-tech, industrial, confiable, moderno, seguro.
- **Paleta de Colores:** 
  - **Cyan Brand (`#00D4FF`):** Representa la tecnología, energía, innovación y precisión. 
  - **Surface (`#0e1322`):** Fondo oscuro principal que evoca profesionalismo técnico, estilo "glassmorphism", modernidad y contraste con elementos brillantes.

## Decisiones de Diseño y Migración (Vite + React + Tailwind CSS v4)
- **Glassmorphism:** Uso intensivo de paneles translúcidos con `backdrop-filter: blur(20px)` y bordes sutiles para enmarcar el contenido y dar profundidad.
- **Micro-interacciones:** Implementadas con **Framer Motion** y hover effects de Tailwind. Incluyen rotaciones de íconos, escalas suaves en tarjetas (scale 1.02) y efectos "glow cyan" para los Call to Action (CTAs).
- **Animaciones al Scroll:** Se implementó `react-intersection-observer` para animar las secciones únicamente cuando entran en el viewport, logrando un rendimiento óptimo. Se evita animar todo en la carga inicial.
- **Iconografía Unificada:** Se reemplazó el CDN de Material Symbols por `@iconify/react`, reduciendo dependencias externas de fuentes y permitiendo mejor integración en React.
- **Scroll Suave y Tracking:** Scroll-padding para acomodar el Navbar fijo y "scrollspy" nativo mediante `IntersectionObserver` que actualiza el estado activo del menú de navegación.

## Información de Contacto
- **Ubicación:** Buenos Aires, Argentina
- **Email:** servicios@automacer.com.ar
- **Horarios:** Lunes a Viernes de 08:00 a 18:00 hs.
