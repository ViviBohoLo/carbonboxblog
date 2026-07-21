# Blog CarbonBox — Estado y pendientes (handoff)
Actualizado: 21 jul 2026. Estado: OPERANDO (automatización quincenal activa en la VPS).

## Fuente de verdad
Este repositorio (github.com/ViviBohoLo/carbonboxblog) es la única fuente de verdad. Las reglas de oro, el flujo completo y la traducción viven en `blog-skill.md`. El registro de qué se ha generado vive en `blog-strategy/blog-tracker.json`.

## Hecho
- Estrategia completa: investigación de referentes, diagnóstico con datos reales del blog (entonces en Wix; hoy la página es desarrollo propio), guía de estilo, calendario editorial v2 (jul–dic 2026, ajustado 22 jun con el sheet de ideas del equipo).
- Automatización quincenal (1 y 15) corriendo en OpenClaw/VPS: keyword research (método Neil Patel), redacción con marca, Google Doc en Drive (carpeta 3_Borradores_automaticos), rotación de responsables con invitación por correo, evento en calendario "CarbonBox (todos)".
- Generados: Julio-A (Alejandra), Julio-B Estéreo Picnic (Miguel), Agosto-A Alcance 3 PYMEs (Miguel). Siguiente: Agosto-B (Net Zero vs. Carbono Neutral).
- Importador interno de blogs (desarrollo propio de CarbonBox; la página web también es propia, ya NO se usa Wix): recibe el enlace de un Google Doc y mapea su contenido a los campos de la entrada del blog. Falta solo probar el ciclo completo con la traducción.
- 21 jul 2026 — UNIFICACIÓN: la carpeta local de Windows (primera iteración con tarea de Cowork, jun 2026) se convirtió en clon de este repo. Su contenido histórico quedó en `_archivo/2026-06_flujo-local-cowork/`. El PNG del logo (1800px, transparente) se copió a `assets/`.
- 21 jul 2026 — blog-skill.md corregido: eliminada la contradicción de comparativas (queda SOLO tabla HTML, nunca imagen/node-canvas), portada alineada (foto de banco embebida + enlaces alternativos), regla de LOGO OFICIAL añadida, y nueva sección TRADUCCIÓN AL INGLÉS.

## Decisiones vigentes
- Motor: agente OpenClaw en la VPS (la tarea de Cowork quedó descontinuada).
- Entregable = Google Doc en Drive (HTML→Doc vía API directa OAuth). Nada de .docx ni PNG sueltos.
- Comparativas = tabla HTML nativa con estilo de marca. Portada = foto de banco (Pexels/Unsplash) embebida + alternativas.
- Aviso al equipo = evento de día completo en calendario "CarbonBox (todos)" (calendarId info@carbonbox.app) con el responsable invitado.
- TRADUCCIÓN: la hace el agente DESPUÉS de que el equipo aprueba el Doc ES (así las correcciones humanas quedan en ambos idiomas). La versión EN lleva ficha SEO propia en inglés (keyword research independiente, no traducción literal). Los dos enlaces (ES + EN) son el insumo del importador de blogs de la página propia.

## Reglas de oro
Viven en `blog-skill.md` (sección REGLAS DE ORO) — ese es el texto normativo. Resumen: estimación (no medición), créditos (no bonos), eventos = ciclo de vida (no alcances), **CarbonBox** en negrilla, citas IEEE, CTA a carbonbox.app, diversidad en fotos, logo oficial de assets/, azul #0B149D + verde #00C269 + Poppins.

## Pendientes / próximos pasos
1. Probar el ciclo completo de publicación con una entrada real: aprobar Doc ES → pedir traducción EN al agente → pasar ambos enlaces al importador de blogs → publicar en la página propia (ES + EN) → validar campos SEO.
1b. Con la documentación del importador (campos exactos que recibe), afinar la "FICHA SEO Y PUBLICACIÓN" del skill para que coincida campo a campo.
2. En la VPS: hacer `git pull` para tomar esta versión del skill (traducción + correcciones) y confirmar que el agente lee el skill desde el repo.
3. Añadir el campo "traduccion_en" al blog-tracker.json cuando se genere la primera traducción.
4. Afinar guía/calendario con el archivo de avatars (pendiente de Viviana).
5. Limpieza en Drive (Viviana): duplicados viejos de Julio-A si aún existen.
