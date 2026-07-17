# Proyecto: Blog CarbonBox

Espacio de trabajo para producir y automatizar las entradas del blog de CarbonBox (2 entradas/mes). Claude genera la base de cada entrada y el equipo la revisa, mejora y publica.

## Cómo está organizado

```
carbonbox/
├── blog-README.md          ← este índice
├── blog-strategy/           ← fundamentos del proyecto
│   ├── 01_investigacion_referentes.md
│   ├── 02_diagnostico_blog.md
│   ├── 03_guia_estilo_plantilla.md
│   ├── 04_calendario_editorial.md
│   └── rotacion_responsables.json
├── blog-borradores/         ← bases que genera Claude cada 2 semanas
├── blog-publicadas/         ← versiones finales del equipo
└── assets/                  ← logos y recursos visuales
```

## Flujo de trabajo

1. **Estrategia** (blog-strategy/): la guía de estilo y el calendario definen qué y cómo se escribe.
2. **Borrador automático** (blog-borradores/): cada 2 semanas se genera la base del siguiente tema del calendario y se avisa al equipo.
3. **Revisión y publicación**: el equipo toma el borrador, lo edita y guarda la versión final en blog-publicadas/.

## Estado actual (junio 2026)

- [x] Investigación de blogs referentes
- [x] Diagnóstico del blog (con datos reales de Wix)
- [x] Guía de estilo + plantilla
- [x] Calendario editorial (jul–dic 2026)
- [x] Rotación de responsables
- [x] Logos (JPG + SVG)
- [ ] Afinar guía/calendario con archivo de **avatars** (pendiente)
- [ ] Integrar **estadísticas de LinkedIn** (pendiente)
- [ ] Montar la **automatización** (tarea cada 2 semanas → borrador + aviso)
