# 01: Propuesta de entrada del blog

**Objetivo:** una propuesta en Google Doc, en `3_Borradores_automaticos`, lista para que la revise la persona responsable, sin errores que el importador de la web deje pasar.

**Manual completo:** `../blog-skill.md`, secciones REGLAS DE ORO, PORTADA, KEYWORD RESEARCH y PASOS 1-7. Esta directiva agrega dónde entran los scripts.

## Pasos
0. `git pull`. El repo es la fuente de verdad del tracker y de la rotación.
1. **Qué slot toca y quién lo hace** (reemplaza la verificación manual de los pasos 2 y 5a-c del skill):
   ```bash
   node execution/siguiente_slot.mjs
   ```
   - Código 0: continúa con el slot, el tema **exacto** y el responsable que imprime.
   - Código 2 (rotación ≠ calendario): **detente** y avisa a Viviana. No generes nada.
   - Si hay varios slots atrasados, genera **solo el más antiguo**.
2. Keyword research, pasos 0A-0D del skill.
3. Redacta el HTML (paso 3 del skill) y **guárdalo en `.tmp/<slot>.html`**.
4. **Valida antes de subir:**
   ```bash
   node execution/validar_ficha.mjs .tmp/<slot>.html
   ```
   - Con errores (código 1): corrige y vuelve a validar. **Nunca subas a Drive una propuesta con errores.**
   - Las advertencias (frase clave, negrilla, número de etiquetas) se revisan y se corrigen si aplica.
5. Sube a Drive, avisa por Calendar y por correo, y actualiza la rotación y el tracker, según los pasos 4 a 7 del skill. Termina con commit y push.

## AD-HOC
Un pedido fuera del calendario **no avanza la rotación** y lleva "AD-HOC" en el título. Se valida igual con `validar_ficha.mjs`.

## Salidas
- El Google Doc (su `viewUrl`).
- El evento de Calendar y el correo de aviso (su `messageId`).
- `blog-tracker.json` y `rotacion_responsables.json` actualizados, con commit.
