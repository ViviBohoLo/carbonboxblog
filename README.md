# Proyecto: Blog CarbonBox

Espacio de trabajo para producir y automatizar las entradas del blog de CarbonBox (2 entradas/mes). El agente (OpenClaw en la VPS) genera la propuesta de cada entrada como Google Doc en Drive, avisa al equipo por el calendario de CarbonBox, y el equipo la revisa, mejora y publica en Wix con la herramienta interna de importación.

**Este repositorio es la ÚNICA fuente de verdad del proceso.** Vive en dos lugares sincronizados por git:
- **VPS (OpenClaw)**: `/home/joaquin/.openclaw/workspace/carbonbox/` — donde corre la automatización quincenal.
- **Local (Windows, Claude Code)**: `C:\Users\USUARIO\Claude\Projects\Blog CarbonBox\` — clon para sesiones de trabajo de estrategia y ajustes.

Cualquier cambio (calendario, skill, reglas) se hace sobre el repo y se sincroniza con `git pull` / `git push` en ambos lados.

## Cómo está organizado

```
carbonboxblog/
├── README.md                ← este índice
├── blog-skill.md            ← EL CEREBRO: skill del agente (flujo, reglas de oro, SEO, traducción)
├── ESTADO_Y_PENDIENTES.md   ← estado del proyecto y handoff entre sesiones
├── blog-strategy/           ← fundamentos del proyecto
│   ├── 01_investigacion_referentes.md
│   ├── 02_diagnostico_blog.md
│   ├── 03_guia_estilo_plantilla.md
│   ├── 04_calendario_editorial.md
│   ├── blog-tracker.json            ← registro de propuestas ya generadas (fuente de verdad de slots)
│   └── rotacion_responsables.json   ← turnos de edición + correos
├── blog-drafts/             ← copias HTML de los borradores generados
├── blog-insumos/            ← materia prima (avatars, estadísticas)
├── assets/                  ← logos oficiales y recursos visuales
└── _archivo/                ← histórico (primera iteración local del flujo, jun 2026)
```

## Flujo de trabajo

1. **Estrategia** (blog-strategy/): la guía de estilo y el calendario definen qué y cómo se escribe.
2. **Borrador automático** (quincenal, 1 y 15 de cada mes): el agente sigue `blog-skill.md` — keyword research, redacción con marca, Google Doc en Drive, rotación de responsable y evento en el calendario "CarbonBox (todos)".
3. **Revisión humana**: el responsable de turno edita y aprueba el Google Doc en español.
4. **Traducción** (bajo demanda): con el Doc ES aprobado, se le pide al agente la versión EN — con su propia ficha SEO en inglés (ver sección TRADUCCIÓN en blog-skill.md).
5. **Publicación**: los dos enlaces (Doc ES + Doc EN) se pasan a la herramienta interna de importación, que llena los campos de la entrada del blog en Wix.

## Estado actual (julio 2026)

- [x] Investigación, diagnóstico, guía de estilo, calendario editorial v2 (jul–dic 2026)
- [x] Rotación de responsables con correos
- [x] Automatización quincenal operando en la VPS (Julio-A, Julio-B y Agosto-A generados; siguiente: Agosto-B)
- [x] Repositorio unificado como fuente única (carpeta local convertida en clon; primera iteración archivada en `_archivo/`)
- [x] Flujo de traducción EN definido en blog-skill.md
- [ ] Probar el ciclo completo de publicación: Doc ES aprobado → Doc EN → herramienta de importación → entrada publicada en Wix (ES + EN)
- [ ] Afinar guía/calendario con archivo de **avatars** (pendiente)
