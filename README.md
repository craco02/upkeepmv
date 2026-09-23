Portal de Mantenimiento - Metalúrgica Vera S.R.L.
Descripción

Este proyecto consiste en el desarrollo de un portal web orientado a la gestión y consulta de información del área de mantenimiento industrial de Metalúrgica Vera S.R.L.

La aplicación centraliza accesos a formularios, reportes, documentación técnica, paneles de control, solicitudes de mantenimiento y recursos de consulta utilizados por el personal de la empresa.

⚠️ Importante: Este sitio fue desarrollado con fines académicos como práctica de la materia Diseño Web Adaptativo (Responsive Web Design). Aunque el prototipo es completamente funcional y puede ser utilizado en un entorno real, su objetivo principal es demostrar la aplicación de conceptos de diseño adaptable, organización de contenido y experiencia de usuario en distintos dispositivos.

Objetivos del Proyecto
Aplicar principios de Diseño Web Adaptativo.
Crear una interfaz intuitiva para el acceso a información de mantenimiento.
Centralizar recursos y formularios utilizados por el personal técnico.
Practicar la estructuración semántica de documentos HTML.
Implementar componentes visuales adaptables a diferentes tamaños de pantalla.
Características
📋 Gestión de Solicitudes
Creación de solicitudes de mantenimiento.
Asignación de técnicos.
Modificación de solicitudes.
Cierre de órdenes de trabajo.
Consulta de solicitudes registradas.
Acceso a códigos de máquinas.
📊 Informaciones y Reportes
Integración con Power BI.
Acceso a reportes de mantenimiento.
Consulta de horómetros.
Seguimiento de turnos de máquinas.
Gestión de pedidos de logística.
📑 Formularios Adicionales
Registro de horómetros de equipos.
Registro de compresores y generadores.
Solicitudes de logística.
Tickets de soporte informático.
📚 Documentación Técnica
Equipos de soldadura.
Herramientas eléctricas.
Puentes grúa.
Materiales para matriculación de electricistas.
🎥 Otros Proyectos
Integración de contenido multimedia.
Presentación de proyectos de ingeniería mediante simulaciones y videos.
📞 Contacto
Información de contacto del departamento.
Correos electrónicos corporativos.
Integración con WhatsApp.
Ubicación mediante Google Maps.
Tecnologías Utilizadas
Frontend
HTML5
CSS3
JavaScript
Recursos Externos
Font Awesome
Microsoft Forms
Microsoft SharePoint
Power BI
Google Maps
Diseño Adaptativo

El proyecto fue desarrollado siguiendo principios de Responsive Web Design, permitiendo su utilización en:

Computadoras de escritorio.
Notebooks.
Tablets.
Teléfonos móviles.

Entre las técnicas aplicadas se encuentran:

Uso de etiquetas semánticas HTML5.
Organización modular de contenido.
Diseño basado en contenedores flexibles.
Navegación simplificada.
Adaptación visual para distintos tamaños de pantalla.
Estructura General
/
├── index.html
├── css/
│   ├── estilos.css
│   └── footer-estilo.css
├── js/
│   └── modal-wa.js
├── img/
├── pages/
│   ├── visor-pdf.html
│   └── formulario-simple.html
└── README.md
Estado del Proyecto

🟢 Prototipo Funcional

Publicación en GitHub Pages

Este directorio está preparado para publicarse como la raíz del repositorio `craco02/upkeepmv` en:

`https://craco02.github.io/upkeepmv/`

Al crear o actualizar el repositorio, copia el contenido de `frontend` directamente en su raíz. Deben quedar `index.html`, `css/`, `js/`, `pages/`, `img/`, `data/` y `.nojekyll` en ese nivel; no debe quedar una carpeta `frontend` intermedia.

El workflow incluido en `.github/workflows/deploy-pages.yml` publica automáticamente cada push a `main`. En la configuración del repositorio, selecciona GitHub Actions como origen de Pages.

La aplicación continúa consumiendo la API configurada en `js/api-config.js`, actualmente `https://177.71.251.230`. El servidor de la API debe estar disponible por HTTPS y aceptar solicitudes desde GitHub Pages.

Actualmente el proyecto se encuentra en estado funcional y operativo, permitiendo navegar entre las distintas secciones e interactuar con los recursos disponibles.

Al tratarse de un proyecto académico, existen oportunidades de mejora futuras, tales como:

Migración a un framework moderno.
Implementación de backend propio.
Gestión de usuarios y autenticación.
Base de datos para almacenamiento local.
API para integración de servicios.
Autor

Cristhian Redes

Proyecto desarrollado como práctica académica para la asignatura de Diseño Web Adaptativo, aplicando conceptos de diseño responsive, accesibilidad y organización de contenidos web en un entorno industrial.

Licencia

Este proyecto tiene fines educativos y de demostración. Su uso, modificación o distribución deberá respetar las políticas y recursos utilizados por Metalúrgica Vera S.R.L. y los servicios externos integrados.
