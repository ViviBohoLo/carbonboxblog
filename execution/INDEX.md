# Ejecutables: agente de Contenido

Scripts Node, sin dependencias: corren en Windows y en el VPS.

| Script | Qué hace | Uso | Código de salida |
|---|---|---|---|
| `siguiente_slot.mjs` | Cruza el tracker, el calendario editorial y la rotación. Dice qué slot toca, con qué tema exacto y qué responsable, y si la rotación coincide con el calendario. | `node execution/siguiente_slot.mjs [--json]` | 0 = ok · 2 = no coinciden (detenerse) |
| `validar_ficha.mjs` | Revisa la propuesta HTML antes de subirla. Errores: un solo H1, los 9 campos de la ficha en líneas (no en tabla), título ≤60, meta ≤155, slug válido, sinopsis de 150-250, categoría oficial, autor exacto, sin "medición" ni "bonos" en el cuerpo, sin `#contacto` y sin base64. Avisos: frase clave en H1, H2/H3, meta y slug; CarbonBox en negrilla; CTA. | `node execution/validar_ficha.mjs .tmp/<slot>.html [--json]` | 0 = sin errores · 1 = no subir |

**Pruebas:** `node --test execution/test/*.test.mjs` (7). Una de ellas lee el calendario real.

## Candidatos a script (cuando haga falta)
- Actualizar el tracker y avanzar la rotación, con validación del JSON.
- Guardia anti-duplicados: listar la carpeta `3_Borradores_automaticos` antes de subir.
- Rellenar las plantillas del evento de Calendar y del correo.
- `render_guia.sh`: weasyprint, conteo de páginas y PNG de revisión, para las guías.
