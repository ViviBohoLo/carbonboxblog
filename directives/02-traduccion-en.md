# 02: Traducción al inglés

**Objetivo:** la versión EN de cada entrada aprobada, con el **mismo slug** que la ES, y el aviso "Blog listo para publicar".

**Manual completo:** `../blog-skill.md`, sección TRADUCCIÓN AL INGLÉS.

**Cuándo corre:** desde la fase 3c ya no es cada hora. El vigilante de aprobados del VPS (`carbonbox-crm/crm-scripts/blog_vigia_aprobados.py`, sin Claude, cada 10 minutos) arranca la tarea de traducción de Pulpo cuando una subcarpeta de `5_Aprobados_para_publicar` tiene el Doc ES sin su EN, cuando el ES se editó después del EN, o cuando hay un Doc suelto en la raíz. La subcarpeta la creó la quincenal (`carpeta_aprobados` en el tracker).

## Dónde entran los scripts
- Antes de subir el Doc EN, guarda el HTML en `.tmp/<slot>-en.html` y corre `node execution/validar_ficha.mjs .tmp/<slot>-en.html`.
- Además de lo que revisa el validador, confirma a mano:
  - que el `Slug de URL` es **idéntico** al del ES, en español y sin traducir;
  - que la `Categoría` es la misma;
  - que las etiquetas de la ficha siguen en español, porque así las busca el importador.

## Reglas clave
- **Si el ES cambió después de traducir** (compara `modifiedTime`), se traduce de nuevo.
- **Si no hay nada nuevo, no se hace nada:** ni Doc, ni evento, ni correo.
