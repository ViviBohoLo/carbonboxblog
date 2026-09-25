#!/usr/bin/env node
// siguiente_slot.mjs — qué entrada del blog toca y quién la hace.
//
// Pasa a código el paso 2 (verificación de slot) y el 5a-c (rotación con
// verificación cruzada) de blog-skill.md. Cruza:
//   blog-strategy/blog-tracker.json         (lo ya generado: fuente de verdad)
//   blog-strategy/04_calendario_editorial.md (slot → tema → "→ Resp. X")
//   blog-strategy/rotacion_responsables.json (orden[proximo_index])
//
// Uso:  node execution/siguiente_slot.mjs [--json]
// Sale con código 2 si la rotación y el calendario NO coinciden: en ese caso el
// flujo se DETIENE y se reporta a Viviana (regla 5c del skill).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// "## Octubre 2026" + "- **(A)** *Tema.* — … **→ Resp. Miguel.**"  →  [{slot, mes, letra, anio, tema, responsable}]
export function leerCalendario(md) {
  const slots = [];
  let mes = null, anio = null;
  for (const linea of md.split(/\r?\n/)) {
    const h = linea.match(/^##\s+([A-Za-zÁÉÍÓÚáéíóú]+)\s+(\d{4})\s*$/);
    if (h) {
      const m = MESES.find((x) => x.toLowerCase() === h[1].toLowerCase());
      mes = m || null; anio = Number(h[2]);
      continue;
    }
    if (!mes) continue;
    const e = linea.match(/^-\s+\*\*\(([AB])\)\*\*\s+\*(.+?)\*/);
    if (!e) continue;
    const r = linea.match(/→\s*Resp\.\s*([^.*]+?)\.?\*\*/);
    slots.push({ slot: `${mes}-${e[1]}`, mes, letra: e[1], anio, tema: e[2].trim().replace(/\.$/, ""), responsable: r ? r[1].trim() : null });
  }
  return slots;
}

export function siguienteSlot({ calendario, tracker, rotacion }) {
  const hechos = new Set((tracker.propuestas || []).map((p) => p.slot));
  const pendiente = calendario.find((s) => !hechos.has(s.slot));
  if (!pendiente) return { fin: true, mensaje: "No quedan slots pendientes en el calendario editorial." };
  const responsableRotacion = rotacion.orden[rotacion.proximo_index];
  const atrasados = calendario.filter((s) => !hechos.has(s.slot)).length;
  return {
    ...pendiente,
    responsable_calendario: pendiente.responsable,
    responsable_rotacion: responsableRotacion,
    coinciden: !!pendiente.responsable && pendiente.responsable === responsableRotacion,
    pendientes_en_calendario: atrasados,
    tracker_dice: tracker.siguiente_pendiente ?? null,
  };
}

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const est = path.join(RAIZ, "blog-strategy");
  const r = siguienteSlot({
    calendario: leerCalendario(fs.readFileSync(path.join(est, "04_calendario_editorial.md"), "utf8")),
    tracker: JSON.parse(fs.readFileSync(path.join(est, "blog-tracker.json"), "utf8")),
    rotacion: JSON.parse(fs.readFileSync(path.join(est, "rotacion_responsables.json"), "utf8")),
  });
  if (process.argv.includes("--json")) console.log(JSON.stringify(r, null, 2));
  else if (r.fin) console.log(r.mensaje);
  else {
    console.log(`Slot: ${r.slot}  |  Tema: ${r.tema}`);
    console.log(`Responsable → calendario: ${r.responsable_calendario ?? "(sin → Resp.)"} · rotación: ${r.responsable_rotacion}`);
    if (r.tracker_dice && r.tracker_dice !== r.slot) console.log(`⚠️  El tracker dice siguiente_pendiente="${r.tracker_dice}"; manda el cruce con el calendario.`);
    console.log(r.coinciden ? "✅ Coinciden: se puede generar." : "⛔ NO coinciden: DETENERSE y reportar a Viviana (regla 5c).");
  }
  if (!r.fin && !r.coinciden) process.exit(2);
}
