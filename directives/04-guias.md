# 04: Guías y lead magnets en PDF

**Objetivo:** guías de marca CarbonBox en PDF, en tamaño carta, que se puedan regenerar desde su HTML.

**Dónde:** `../../Guías para CarbonBox/` (no es repo git). **Manual:** `Producción guías/PLAYBOOK - Producción masiva de guías CarbonBox.md` y `ESTADO - Serie Tipos de huella de carbono.md`.

## Pasos
1. Parte de la plantilla canónica, `plantilla-guia-01.html`, o de la guía hermana de la serie. Cambia el contenido y la portada.
2. Contenido: las fuentes del GHG Protocol están en Drive (carpeta B15). Aplican las reglas de oro: **"estimación"** y **"créditos"**.
3. Genera el PDF y revisa:
   ```bash
   weasyprint plantilla-guia-0X.html "CarbonBox - Guia 0X - <Título>.pdf"
   ```
   Cuenta las páginas con `pypdf` y revisa cada una en PNG (`pdftoppm -png -r 90`) **mirándolas**.
4. ✋ Pide la aprobación de Viviana.
5. **Distribución.** Hoy no existe un flujo de lead magnet: ni landing, ni formulario, ni campaña. Si se pide, se coordina por Pulpo:
   - **web**, para la página o la descarga;
   - **email**, para la campaña (su directiva `04-campana-contenido.md`).

## En el VPS
- El repo de guías es `/srv/agentes/Guías para CarbonBox` (`ViviBohoLo/guias-carbonbox`). Al empezar:
  `git -C "/srv/agentes/Guías para CarbonBox" pull --ff-only`.
- `weasyprint`, `pdftoppm` y `pdfinfo` corren directo, sin WSL, con rutas absolutas:
  - `weasyprint "/srv/agentes/Guías para CarbonBox/Producción guías/plantilla-guia-0X.html" "/srv/agentes/Guías para CarbonBox/CarbonBox - Guia 0X - <Título>.pdf"`;
  - páginas: `pdfinfo "<pdf>"`;
  - revisión: `pdftoppm -png -r 90 "<pdf>" "/srv/agentes/Guías para CarbonBox/.tmp/p"`, y **mira** cada PNG.
- ✋ Aprobación del PDF. Después, commit en el repo de guías y `aprobacion` con `integrar:guias-carbonbox` y el sha completo.
- Si se pide en Drive: `cp "/srv/agentes/Guías para CarbonBox/<pdf>" /srv/agentes/subidas/` y `blog_drive.py --subir` a
  la carpeta `6_Guias` (su id se anota aquí cuando exista; si falta, pide antes `--carpeta` en
  `186jeE2HPw1s2rpLybPUWoIc43zhhvB0R` con el nombre `6_Guias`).

## Cuidado
- **La paleta de las guías no es la del blog.** Guías: índigo `#1620A4` y verde `#2F6B4A`. Blog: `#0B149D` y `#00C269`.
- `weasyprint` y `pdftoppm` corren en WSL; en Windows no están instalados.
- Si editar con Write o Edit no se refleja en el shell, edita por shell y verifica con `grep`/`wc -l` (PLAYBOOK).
- La guía 04 se llama "Medición…". Es un nombre histórico que contradice la regla de oro: si se reedita, se cambia a "Estimación".
