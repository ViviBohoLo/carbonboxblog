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

## Publicación por el equipo (resuelto 3 ago 2026)
- El equipo publica en Keystatic con la cuenta compartida de GitHub **CarbonBoxTeam** (colaboradora del repo CarbonBox-web con permiso de escritura).
- Vercel bloquea los deploys de commits de CarbonBoxTeam (no es miembro del equipo de Vercel). Solución activa: workflow .github/workflows/publicar-keystatic.yml en CarbonBox-web — ante un commit de CarbonBoxTeam agrega un commit vacío de publicación con autor ViviBohoLo y lo empuja (el Deploy Hook NO servía: Vercel valida el autor del último commit de la rama). Página de verificación para el equipo: https://www.carbonbox.app/admin/estado (muestra última actualización del sitio y estado Publicado/Borrador de cada entrada ES/EN). Al desmarcar "Borrador" y guardar, el sitio se publica solo en ~2 min.
- Primera entrada publicada por el equipo: Alcance 3 PYMEs (ES) por Laura, 3 ago 2026. OJO: la versión EN debe importarse con el MISMO slug del ES (la primera importación EN usó slug en inglés y hubo que borrar el duplicado).

## ⚠️ 1 sep 2026 — CORRIDA DUPLICADA (Septiembre-B). Acción requerida.
La propuesta de Septiembre-B (auditoría de inventario de GEI, resp. Alejandra) se generó **dos veces el mismo día**, con minutos de diferencia, por **dos ejecuciones en paralelo de la misma tarea programada**. Ambas hicieron el flujo completo: doc en Drive + evento de calendario.
- **Se conservó** la corrida que quedó registrada en el tracker y commiteada al repo: Doc `1c5u0ib0MxIV_YeFLndl0ktN335FebV7r9awT8QCaeTQ`, evento `mns56e8ckbkqp5oo7dmap5og10`.
- **Se revirtió** la corrida duplicada: sus dos Google Docs fueron enviados a la papelera y su evento de calendario (`jik0m8rk4apcvmqtrof86siiq0`) fue eliminado. La rotación NO se avanzó dos veces (quedó en `proximo_index: 1`, `ultimo_asignado: Alejandra`, que es lo correcto).
- **PENDIENTE (Viviana):** revisar en la configuración de tareas programadas si hay **dos tareas quincenales activas** con este mismo skill (p. ej. una heredada de la primera iteración y otra vigente) y desactivar la sobrante. El síntoma a vigilar el 15 de cada mes: dos docs y dos eventos idénticos.
- **Mitigación sugerida para el skill:** antes del paso 4 (subir a Drive), listar la carpeta de borradores y abortar si ya existe un doc del mismo slot creado hoy.

### Hallazgos menores de la verificación del doc Septiembre-B (para Alejandra, al editar)
1. En "Entradas relacionadas sugeridas" aparece el título completo *"Toma el control de tu huella de carbono: mide y gestiona los tres alcances"*, que contiene "mide". En el cuerpo ya se acortó bien; conviene acortarlo también ahí.
2. En "Blogs internos vinculados" algunas URLs llevan tildes sin codificar (`5-errores-críticos-…`), mientras que en el cuerpo van percent-encoded. Unificar antes de importar.
3. Verificar visualmente que la foto de portada de Pexels quedó embebida en el Doc (la lectura por API no muestra imágenes).

## Pendientes / próximos pasos
1. Probar el ciclo completo de publicación con una entrada real: aprobar Doc ES → pedir traducción EN al agente → pasar ambos enlaces al importador de blogs → publicar en la página propia (ES + EN) → validar campos SEO.
1b. ✅ (21 jul) Ficha alineada campo a campo con el importador real (repo CarbonBox-web, docs/importador-setup.md + código): etiquetas en español, título ≤60, meta ≤155, 8 categorías oficiales, alt text, autor, keywords secundarias entre comillas, mismo slug ES/EN, un solo H1 con portada antes.
1c. ✅ (21 jul) Disparador automático de traducción activado:
   - Carpeta "5_Aprobados_para_publicar" creada en Drive CarbonBox: ID `1f9sIuqNtIrsSUUNhQgdgHwvqXJgNMzuj` (https://drive.google.com/drive/folders/1f9sIuqNtIrsSUUNhQgdgHwvqXJgNMzuj). Compartida como writer con todo el equipo.
   - Cron configurado inicialmente diario lun-vie 8:00 Bogotá. ⚠️ DECISIÓN 21 jul (Viviana): cambiarlo a CADA HORA lun-vie 8:00-18:00 Bogotá — PENDIENTE ajustar el cron en OpenClaw y usar las plantillas EXACTAS de eventos que ahora están en blog-skill.md (evento del borrador con instrucción de mover a la carpeta; evento "listo para publicar" con los 5 pasos y los dos enlaces).
   - Flujo: el responsable mueve el doc aprobado a esta carpeta → el cron lo detecta → traduce → crea evento "listo para publicar".
   - 21 jul: el importador (carbonbox.app/admin/importar) ya acepta LOS DOS enlaces (ES + EN opcional) en una sola importación — desplegado en producción (repo CarbonBox-web).
2. En la VPS: hacer `git pull` para tomar esta versión del skill (traducción + correcciones) y confirmar que el agente lee el skill desde el repo.
3. Añadir el campo "traduccion_en" al blog-tracker.json cuando se genere la primera traducción.
4. Afinar guía/calendario con el archivo de avatars (pendiente de Viviana).
5. Limpieza en Drive (Viviana): duplicados viejos de Julio-A si aún existen.
