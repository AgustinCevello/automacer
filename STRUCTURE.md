# Arquitectura del Proyecto Automacer

## Stack Técnico
- **Framework:** React 19 (`^19.2.5`)
- **Build Tool:** Vite 8 (`^8.0.10`)
- **Estilos:** Tailwind CSS v4 (`^4.2.4`)
- **Animaciones:** Framer Motion
- **Iconos:** Iconify (`@iconify/react`)
- **Scroll Detection:** `react-intersection-observer`

## Estructura de Archivos
```
.
├── index.html            # Entry point con Google Fonts (Syne, Inter)
├── vite.config.js        # Configuración de Vite (React + Tailwind v4 plugins)
├── src/
│   ├── main.jsx          # Render root de React
│   ├── index.css         # Tailwind v4 directives, variables de tema y clases custom
│   ├── App.jsx           # Layout principal y agregador de componentes
│   └── components/       # Componentes de UI modulares
│       ├── Navbar.jsx    # Navegación fija, responsive, con scrollspy
│       ├── Hero.jsx      # Header de entrada con CTAs y orbs animados
│       ├── About.jsx     # Sección "Innovación y Experiencia", grid cards
│       ├── Services.jsx  # Grid de servicios y CTAs
│       ├── Gallery.jsx   # Grid CSS asimétrico con imágenes
│       ├── Contact.jsx   # Formulario e info de contacto
│       └── Footer.jsx    # Logo, enlaces legales y copyright
```

## Convenciones de Código
- **Componentes:** Archivos `.jsx` en `PascalCase`. Componentes funcionales simples exportados por defecto (`export default function NombreComponente()`).
- **Tailwind v4 Variables:** No hay `tailwind.config.js`. Todo se define en `index.css` bajo la directiva `@theme`. Las variables de color (como `--color-cyan-brand`) mapean automáticamente a clases como `text-cyan-brand` o `bg-cyan-brand`.
- **Iconos:** Siempre usar el componente `<Icon />` de `@iconify/react` en vez de incluir clases de fuentes iconográficas, mejorando performance y modularidad.

## Clases CSS Custom (`index.css`)
Debido a necesidades específicas de UI, se mantuvieron estas clases utilitarias en CSS puro:
- `.glass-panel`: Fondo translúcido con blur para las tarjetas.
- `.glow-cyan`: Sombra box-shadow que se activa al hacer hover en botones.
- `.orb`: Elemento decorativo circular desenfocado que se usa como luz de fondo.
- `.bg-grid` / `.bg-dots`: Patrones radiales para los fondos.
- `.section-glow-divider`: Línea divisoria luminosa entre secciones.
- `.circuit-line` / `.circuit-vertical`: Líneas sutiles de gradiente en los fondos.

## Guía para Agregar una Nueva Sección
1. Crear el archivo del componente en `src/components/NuevaSeccion.jsx`.
2. Importar `framer-motion` y `useInView` de `react-intersection-observer` para mantener el mismo flujo de entrada.
3. El contenedor raíz debe ser un `<section id="nueva-seccion" ref={ref}>` con estilos de padding vertical (`py-20 px-8`).
4. Importar y renderizar el componente en `src/App.jsx` debajo del componente previo, separándolo con el div `<div className="section-glow-divider"></div>`.
5. Si necesita navegación, agregar el link al array `navLinks` dentro de `Navbar.jsx`.
