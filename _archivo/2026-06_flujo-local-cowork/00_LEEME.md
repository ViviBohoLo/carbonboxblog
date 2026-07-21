# Proyecto: Blog CarbonBox

Espacio de trabajo para producir y automatizar las entradas del blog de CarbonBox (2 entradas/mes). Claude genera la base de cada entrada y el equipo la revisa, mejora y publica.

## Cómo está organizado

```
Blog CarbonBox/
├── 00_LEEME.md                  ← este índice
├── 1_Estrategia/                ← fundamentos del proyecto (leer primero)
│   ├── 01_Investigacion_blogs_referentes.md
│   ├── 02_Diagnostico_blog_CarbonBox.md
│   ├── 03_Guia_estilo_y_plantilla.md
│   └── 04_Calendario_editorial.md
├── 2_Insumos/                   ← materia prima (avatars, stats de LinkedIn/Wix)
├── 3_Borradores_automaticos/    ← bases que genera Claude cada 2 semanas
└── 4_Publicadas/                ← versiones finales del equipo
```

## Flujo de trabajo

1. **Estrategia** (carpeta 1): la guía de estilo y el calendario definen qué y cómo se escribe.
2. **Insumos** (carpeta 2): avatars y estadísticas que afinan tono, temas y decisiones.
3. **Borrador automático** (carpeta 3): cada 2 semanas Claude deja aquí la base del siguiente tema del calendario y avisa al equipo.
4. **Revisión y publicación**: el equipo toma el borrador, lo edita y guarda la versión final en la carpeta 4.

## Estado actual (junio 2026)

- [x] Investigación de blogs referentes
- [x] Diagnóstico del blog (con datos reales de Wix)
- [x] Guía de estilo + plantilla
- [x] Calendario editorial (jul–dic 2026)
- [ ] Afinar guía/calendario con el archivo de **avatars** (pendiente de Viviana)
- [ ] Integrar **estadísticas de LinkedIn** (pendiente de Viviana)
- [ ] Montar la **automatización** (tarea cada 2 semanas → borrador en carpeta 3 + aviso)
