Actúa como un diseñador UX/UI experto y desarrollador frontend. Crea desde cero el código y diseño de una aplicación web interactiva y totalmente responsive (móviles, tablets y desktop) destinada a un museo digital de automóviles con estética técnica y minimalista de planos vectoriales ("blueprints").

### 1. Sistema de Diseño y Paleta de Colores (Monocromo Estricto)
- Fondo general y detalles principales de los vehículos: #FFFFFF
- Trazos vectoriales y líneas de estructura técnica: #666666 (con variaciones de opacidad controladas entre el 30% y el 80% para dar profundidad).
- Textos principales y profundidad tridimensional de los trazos: #2C2C2C.
- Tipografía de estilo técnico/ingeniería (La fuente utilizada es Chakra Petch).

### 2. Estructura de Páginas y Navegación
La web debe constar de dos vistas principales interactivas:

A. Página Principal (Home / Línea de Tiempo Vertical):
- Una cabecera minimalista que incluya el logotipo de la marca (con las iniciales JL en estilo vectorial) y la navegación web.
- Una línea de tiempo vertical interactiva inspirada en el diseño de un árbol de commits de GitHub, que ordene cronológicamente la historia del automóvil desde los más antiguos hasta los más modernos.
- Un botón o control de alternancia (toggle) funcional para cambiar el orden de la línea temporal de forma ascendente o descendente.
- Cada nodo del árbol debe enlazar directamente con la landing page específica de cada vehículo.

B. Landing Page de Vehículo (Ficha Técnica e Interactiva):
- Cabecera: Título principal de la sección a la izquierda y el logotipo de la marca del automóvil a la derecha.
- Galería Interactiva de imágenes en formato .svg: Visualización de los vehículos en diferentes perspectivas con los trazos vectoriales característicos sobre fondo blanco (#FFFFFF) y líneas en gris (#666666).
- Sección de Ficha Técnica: Tablas de datos técnicos detallados (especificaciones de motor, chasis, rendimiento e historia) libres de derechos.
- Sección inferior: Carrusel o cuadrícula de "Vehículos Relacionados" que muestre otros modelos de la misma marca o categoría cronológica.

### 3. Requisitos Técnicos y de Interactividad
- Diseño 100% responsivo con CSS Grid y Flexbox, adaptado fluidamente a dispositivos móviles, tablets y pantallas de escritorio.
- Uso limpio de elementos SVG interactivos o contenedores con efectos de opacidad y capas superpuestas simulando planos técnicos de ingeniería.