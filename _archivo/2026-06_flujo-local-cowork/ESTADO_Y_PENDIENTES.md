# Blog CarbonBox — Estado y pendientes (handoff)
Actualizado: 18 jun 2026. Estado: EN PROGRESO (flujo casi a punto). Se continúa en otra sesión.

## Reglas de oro (obligatorias)
- Siempre "ESTIMACIÓN de huella de carbono", nunca "medición" (es un cálculo).
- Siempre "CRÉDITOS de carbono", nunca "bonos".
- Borrador TOTALMENTE editado: títulos jerarquizados, negrillas, imágenes incrustadas (portada + gráfico con pie y alt).
- Logo OFICIAL en todas las piezas.
- PORTADA: cada borrador lleva 2 opciones para elegir — A) propuesta en Canva (editable, foto real + overlay de marca) y B) foto de banco libre (Pexels/Unsplash). Estilo definido: FOTO REAL + overlay azul de marca.
- DIVERSIDAD obligatoria en las fotos con personas: nunca elenco exclusivamente blanco (incluir latinos, afro, asiáticos, etc.).
- CONTACTO/CTA: usar siempre https://www.carbonbox.app/#contacto.
- Descripciones de los puntos: desarrolladas (no telegráficas), con el porqué y ejemplos prácticos.
- MARCA Y TIPOGRAFÍA: títulos y subtítulos en AZUL CarbonBox #0B149D; verde #00C269 como acento; tipografía POPPINS en todo (Word y, vía estilos inline en el HTML, también en el Google Doc).

## Hecho
- Investigación de referentes + diagnóstico con datos reales de Wix.
- Estadísticas de LinkedIn integradas (insumo).
- Estructura en Drive (1_Estrategia, 2_Insumos, 3_Borradores_automaticos, 4_Publicadas) con: investigación, diagnóstico, guía de estilo, plantilla de formato, calendario, reglas de oro.
- Logo oficial copiado a 2_Insumos.
- Borrador de prueba Julio-A totalmente editado (.docx) con portada + gráfico incrustados (wording ya en "estimación").
- Tarea programada "blog-carbonbox-borrador-quincenal" (1 y 15 de cada mes): genera la siguiente entrada como .docx editado + portada + gráfico, guarda en borradores y crea correo de aviso.

## Decisiones
- Motor: tarea programada de Cowork (no GitHub).
- Visuales por código (matplotlib) on-brand; alternativa de portada por banco libre.
- ENTREGABLE FINAL = GOOGLE DOC en Drive (NO Word, NO PNG). La comparativa va como TABLA dentro del Doc.
- Aviso al equipo = evento en Google Calendar "CarbonBox (todos)".

## Sesión 18 jun 2026 (avances)
- LOGO OFICIAL resuelto: SVG recibido -> Logo_horizontal_CarbonBox.png (1800px, transparente) y .svg en 2_Insumos. Portada y gráfico regenerados con el logo real.
- .docx reconstruido con estilos reales (Título/H1/H2), negrillas, 2 imágenes incrustadas con pie+alt. Corregido "Categoría: Medición" -> "Estimación de Huella de Carbono".
- DECISIÓN feedback: bullets numerados en el chat (lo más fácil de procesar/regenerar). Google Doc inline solo si se pide puntualmente.
- DECISIÓN aviso al equipo: usar Google Workspace de CarbonBox (no Kimsa). Plan: grupo/lista de distribución + correo redactado por la tarea, envío con 1 clic (Gmail solo redacta). PENDIENTE: conectar la cuenta de Workspace de CarbonBox.
- HALLAZGO: el conector de Drive no permite subir binarios (.docx con imágenes) de forma eficiente ni borrar/renombrar. La entrega rica debe vivir en la carpeta local del proyecto (canónico = local). Las 2 versiones viejas en texto plano en Drive las borra Viviana manualmente.

## Sesión 18 jun 2026 — Notificación al equipo (resuelto)
- Conectado Google Calendar de CarbonBox (cuenta carbonbox.app), en paralelo al de Kimsa. OJO: el navegador del conector debe estar logueado con la MISMA cuenta Claude del escritorio (Kimsa Pro); el Google sí es CarbonBox.
- Aviso al equipo = EVENTO en el calendario "CarbonBox (todos)" (calendarId info@carbonbox.app). Nada de GitHub/token (el sandbox no llega a APIs de Google; los conectores sí, por otra vía).
- Título del evento (para la parrilla): "Nueva Entrada de Blog · <Responsable>". El evento solo lleva el enlace al Google Doc; las opciones de portada/enlaces van DENTRO del doc.
- ROTACIÓN de responsables (turnos de edición): archivo "1_Estrategia/rotacion_responsables.json" con orden [Alejandra, Miguel, Laura, David, Viviana]. La rutina asigna y avanza el índice. (Arrancó en Alejandra.)
- ENTREGA 100% EN DRIVE COMO GOOGLE DOC (NADA de Word/.docx ni PNG): se sube vía create_file con contentMimeType text/html (Google convierte y conserva títulos azul #0B149D, Poppins, negrillas, enlaces). La comparativa va como <table> HTML (tabla dentro del Doc), no como imagen.
- Julio-A DEFINITIVA (Google Doc): docId 1OG5BSR78VeOB3bjHU5Ndv-_zyvxItJQ90kcvGc45RGM. BORRAR los duplicados/viejos en la carpeta de borradores (los 2 Google Docs en texto plano con "medición", y las versiones previas 1wZaL4... y 19elcK...). Claude no puede borrar; lo hace Viviana.
- Rutina quincenal actualizada (1 y 15, 9:00) para hacer todo lo anterior automáticamente.

## Cierre sesión 18 jun 2026 — Portada, marca y comparativa
- PORTADAS Julio-A en Canva (2 opciones): A) foto enmarcada + overlay https://www.canva.com/d/5k_1tkUXUoLhO7q ; B) layout editorial https://www.canva.com/d/cu_E780PaDAs68c . Ambas con equipo diverso, dominio correcto.
- Opción B de portada (banco) = LISTA de enlaces Pexels/Unsplash dentro del Doc (no Canva). Recomendada Unsplash "diverse business team in modern office".
- 7 puntos AMPLIADOS; CTA con https://www.carbonbox.app/#contacto; títulos azul #0B149D + Poppins (en .docx local y en Google Doc vía estilos inline).
- Julio-A DEFINITIVA en Drive = Google Doc docId 1OG5BSR78VeOB3bjHU5Ndv-_zyvxItJQ90kcvGc45RGM (tiene la comparativa como TABLA, marca y enlaces).
- Evento de PRUEBA en calendario "CarbonBox (todos)": "🧪 PRUEBA · Nueva Entrada de Blog · Alejandra" enlazando al Doc. (Borrar cuando se quiera.)
- LIMITACIÓN CONFIRMADA: Claude NO puede subir imágenes (PNG) a Drive desde aquí — el binario se trunca (~2.7 KB). Y el Google Doc ELIMINA imágenes incrustadas al convertir desde HTML. => La comparativa diseñada como IMAGEN solo es viable si Viviana arrastra el PNG (está en local 3_Borradores_automaticos/GRAFICO_julio_A.png) a Drive/Canva, o se inserta en Canva/Wix. En el Doc queda como TABLA (fiel y automatizable).

## Pendientes / próximos pasos
1. COMPARATIVA COMO IMAGEN (opcional): Viviana sube GRAFICO_julio_A.png a Drive/Canva y pega/incrusta el enlace; o se deja la TABLA del Doc (default fiable).
2. "Run now" a la tarea "blog-carbonbox-borrador-quincenal" para pre-aprobar permisos (Drive + Calendar) y que las corridas no se frenen. (Notificación al terminar YA activada.)
3. Probar publicación real en WIX y LINKEDIN con Julio-A y ajustar las secciones de Wix/SEO/copy según lo que pida cada plataforma.
4. LIMPIEZA en Drive (Viviana): borrar duplicados de propuesta (Google Docs en texto plano con "medición"; versiones intermedias 1wZaL4..., 19elcK...), los 2 PNG corruptos de comparativa, y el doc _TEST_imagen_dataURI. En Canva: borrar el draft "Infographic - Estimación de Huella" y la portada abstracta de prueba.
5. Pegar las reglas de marca/oro en las INSTRUCCIONES DEL PROYECTO (app) para que apliquen en toda sesión (Claude no puede editarlas).
6. Verificar SHARING: la carpeta/Docs viven en el Drive de Kimsa (info@kimsa.co); confirmar que el equipo de CarbonBox tiene acceso al enlace del Doc que llega por el calendario.
7. Revisar el calendario editorial para corregir cualquier "medición"→"estimación" / "bonos"→"créditos".

> Sugerencia: pegar las Reglas de oro y de marca en las instrucciones del proyecto (app) para que apliquen siempre.
