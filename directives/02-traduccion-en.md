# 02: Traducción al inglés

**Objetivo:** la versión EN de cada entrada aprobada, con el **mismo slug** que la ES, y el aviso "Blog listo para publicar".

**Manual completo:** `../blog-skill.md`, sección TRADUCCIÓN AL INGLÉS. Esta sección la ejecuta cada hora la tarea programada `blog-carbonbox-traducciones`, en días hábiles de 8 a 18.

## Dónde entran los scripts
- Antes de subir el Doc EN, guarda el HTML en `.tmp/<slot>-en.html` y corre `node execution/validar_ficha.mjs .tmp/<slot>-en.html`.
- Además de lo que revisa el validador, confirma a mano:
  - que el `Slug de URL` es **idéntico** al del ES, en español y sin traducir;
  - que la `Categoría` es la misma;
  - que las etiquetas de la ficha siguen en español, porque así las busca el importador.

## Reglas clave
- **Si el ES cambió después de traducir** (compara `modifiedTime`), se traduce de nuevo.
- **Si no hay nada nuevo, no se hace nada:** ni Doc, ni evento, ni correo.
