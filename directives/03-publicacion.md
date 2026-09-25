# 03: Publicación en la web (traspaso)

**Este agente no publica.** Cuando la entrada está aprobada y traducida, el aviso "Blog listo para publicar" le dice a la persona responsable cómo hacerlo. Si Pulpo lo pide, se le delega al agente **web** (su directiva `03-blog.md`).

## Qué se entrega
- Los enlaces a los Docs ES y EN.
- El slug, idéntico en los dos.
- El recordatorio de los pasos:
  1. `https://www.carbonbox.app/admin/importar`: **primero el ES**, porque sube las imágenes, y después el EN.
  2. Esperar el despliegue (`/admin/estado`).
  3. En Keystatic, revisar y desmarcar "Borrador". **No tocar Slug ni "Regenerate".**
  4. Verificar las dos URLs y el hreflang.

## Después de publicar
- Propón en `memoria`: slot, título, slug y las URLs ES y EN.
- Si la entrada sirve para una campaña (por ejemplo, una guía), sugiérelo a **email** en `siguiente`.
