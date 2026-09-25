# Directivas: agente de Contenido

| # | Directiva | Cuándo | Ejecutables |
|---|---|---|---|
| 1 | [01-entrada-blog.md](01-entrada-blog.md) | Propuesta quincenal o AD-HOC | `siguiente_slot.mjs`, `validar_ficha.mjs` + `blog-skill.md` (PASOS) |
| 2 | [02-traduccion-en.md](02-traduccion-en.md) | Hay una entrada aprobada en `5_Aprobados_para_publicar` | `validar_ficha.mjs` + `blog-skill.md` (TRADUCCIÓN AL INGLÉS) |
| 3 | [03-publicacion.md](03-publicacion.md) | Entrada lista (ES y EN) para la web | traspaso al responsable o al agente **web** |
| 4 | [04-guias.md](04-guias.md) | Guía o lead magnet en PDF | `weasyprint` (ver PLAYBOOK) |

La directiva maestra del blog es **`../blog-skill.md`**. Estas directivas dicen **dónde entra cada script** y cómo se conecta con los demás agentes.
