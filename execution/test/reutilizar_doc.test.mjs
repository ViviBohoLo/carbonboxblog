// node --test execution/test/
// Slots con Doc existente: "reutilizar_doc" en el tracker (ver siguiente_slot.mjs y blog-skill.md, paso 2.0b).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { leerCalendario, siguienteSlot } from "../siguiente_slot.mjs";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(AQUI, "../siguiente_slot.mjs");

const CALENDARIO_MD = `# Calendario
## Octubre 2026
- **(A)** *Tema de octubre A.* — x **→ Resp. Miguel.**
- **(B)** *Metano en combustión: por qué usar un GWP de 27 y cuándo corresponde 29,8.* — x **→ Resp. Laura.**

## Noviembre 2026
- **(A)** *Camino a la COP31: qué deberían estar mirando las empresas de LATAM.* — x **→ Resp. Viviana.**
- **(B)** *Greenwashing: 3 señales de alerta.* — x **→ Resp. Alejandra.**

## Diciembre 2026
- **(A)** *Tema de diciembre A.* — x **→ Resp. Miguel.**
`;
const calendario = leerCalendario(CALENDARIO_MD);
const ORDEN = ["Alejandra", "Miguel", "Laura", "Viviana"];

const COP31 = {
  slot: "Noviembre-A",
  fileId: "1xAnKNMrW8RFWFGMhGXAOOSbboxRVVNIRbn6naJSwQfo",
  viewUrl: "https://docs.google.com/document/d/1xAnKNMrW8RFWFGMhGXAOOSbboxRVVNIRbn6naJSwQfo/edit",
  carpeta_aprobados: { id: "1OmodZstRuAn1Ij9_iVWPwoHq-07t2vKC", url: "https://drive.google.com/drive/folders/1OmodZstRuAn1Ij9_iVWPwoHq-07t2vKC" },
  slug: "camino-a-la-cop31-empresas-latam",
  frase_clave: "camino a la COP31",
  reutilizado_de: "Octubre-B",
};
const hechosHastaOctubreB = [{ slot: "Octubre-A" }, { slot: "Octubre-B", responsable: "Laura" }];

test("el calendario de la prueba se lee: Nov-A es de Viviana y Nov-B de Alejandra", () => {
  assert.equal(calendario.find((s) => s.slot === "Noviembre-A").responsable, "Viviana");
  assert.equal(calendario.find((s) => s.slot === "Noviembre-B").responsable, "Alejandra");
});

test("al seleccionar Noviembre-A devuelve la referencia COMPLETA del Doc existente y coincide", () => {
  const r = siguienteSlot({
    calendario,
    tracker: { propuestas: hechosHastaOctubreB, reutilizar_doc: [COP31] },
    rotacion: { orden: ORDEN, proximo_index: 3 },
  });
  assert.equal(r.slot, "Noviembre-A");
  assert.equal(r.coinciden, true);
  assert.deepEqual(r.reutilizar, COP31);
  assert.equal(r.reutilizar.fileId, "1xAnKNMrW8RFWFGMhGXAOOSbboxRVVNIRbn6naJSwQfo");
  assert.equal(r.reutilizar.carpeta_aprobados.id, "1OmodZstRuAn1Ij9_iVWPwoHq-07t2vKC");
});

test("un slot distinto no reutiliza: con Octubre-B pendiente el marcador de Noviembre-A no aplica", () => {
  const r = siguienteSlot({
    calendario,
    tracker: { propuestas: [{ slot: "Octubre-A" }], reutilizar_doc: [COP31] },
    rotacion: { orden: ORDEN, proximo_index: 2 },
  });
  assert.equal(r.slot, "Octubre-B");
  assert.equal(r.reutilizar, null);
  assert.equal(r.coinciden, true);
});

test("el marcador de otro slot no se devuelve aunque haya varios marcadores", () => {
  const otro = { slot: "Diciembre-A", fileId: "OTRO", viewUrl: "x", carpeta_aprobados: { id: "OTRA" } };
  const r = siguienteSlot({
    calendario,
    tracker: { propuestas: hechosHastaOctubreB, reutilizar_doc: [otro, COP31] },
    rotacion: { orden: ORDEN, proximo_index: 3 },
  });
  assert.equal(r.reutilizar.fileId, COP31.fileId);
  assert.notEqual(r.reutilizar.fileId, "OTRO");
});

test("sin reutilizar_doc el resultado es el de siempre y reutilizar es null", () => {
  const r = siguienteSlot({
    calendario,
    tracker: { propuestas: hechosHastaOctubreB },
    rotacion: { orden: ORDEN, proximo_index: 3 },
  });
  assert.equal(r.slot, "Noviembre-A");
  assert.equal(r.reutilizar, null);
});

test("progresión tras registrar Noviembre-A: marcador fuera y rotación avanzada UNA vez → siguiente Noviembre-B (Alejandra)", () => {
  // Estado después de la corrida del 1-nov: Nov-A registrado con el mismo Doc, marcador quitado, rotación Viviana → Alejandra.
  const tracker = {
    propuestas: [...hechosHastaOctubreB, { slot: "Noviembre-A", responsable: "Viviana", fileId: COP31.fileId, reutilizado_de: "Octubre-B" }],
    reutilizar_doc: [],
  };
  const r = siguienteSlot({ calendario, tracker, rotacion: { orden: ORDEN, proximo_index: 0 } });
  assert.equal(r.slot, "Noviembre-B");
  assert.equal(r.responsable_calendario, "Alejandra");
  assert.equal(r.responsable_rotacion, "Alejandra");
  assert.equal(r.coinciden, true);
  assert.equal(r.reutilizar, null);
});

test("un slot ya registrado no se reutiliza aunque el marcador se haya quedado en el tracker", () => {
  const tracker = {
    propuestas: [...hechosHastaOctubreB, { slot: "Noviembre-A", responsable: "Viviana", fileId: COP31.fileId }],
    reutilizar_doc: [COP31],
  };
  const r = siguienteSlot({ calendario, tracker, rotacion: { orden: ORDEN, proximo_index: 0 } });
  assert.equal(r.slot, "Noviembre-B");
  assert.equal(r.reutilizar, null);
});

test("si Noviembre-A se registra pero la rotación NO avanza, Noviembre-B no coincide (por eso se avanza una vez)", () => {
  const tracker = {
    propuestas: [...hechosHastaOctubreB, { slot: "Noviembre-A", responsable: "Viviana", fileId: COP31.fileId }],
    reutilizar_doc: [],
  };
  const r = siguienteSlot({ calendario, tracker, rotacion: { orden: ORDEN, proximo_index: 3 } });
  assert.equal(r.slot, "Noviembre-B");
  assert.equal(r.coinciden, false);
});

test("la rotación avanza una sola vez: Viviana (3) → Alejandra (0) con el módulo de la lista", () => {
  assert.equal((3 + 1) % ORDEN.length, 0);
  assert.equal(ORDEN[(3 + 1) % ORDEN.length], "Alejandra");
});

// --- CLI: copia del script en una carpeta temporal con sus tres archivos de entrada ---
function correrCli({ tracker, rotacion, args = [] }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "siguiente-slot-"));
  try {
    fs.mkdirSync(path.join(dir, "execution"));
    fs.mkdirSync(path.join(dir, "blog-strategy"));
    fs.copyFileSync(SCRIPT, path.join(dir, "execution/siguiente_slot.mjs"));
    fs.writeFileSync(path.join(dir, "blog-strategy/04_calendario_editorial.md"), CALENDARIO_MD);
    fs.writeFileSync(path.join(dir, "blog-strategy/blog-tracker.json"), JSON.stringify(tracker));
    fs.writeFileSync(path.join(dir, "blog-strategy/rotacion_responsables.json"), JSON.stringify(rotacion));
    return spawnSync(process.execPath, [path.join(dir, "execution/siguiente_slot.mjs"), ...args], { encoding: "utf8" });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("CLI: si el slot trae reutilizar y coincide, advierte REUTILIZAR, no dice 'se puede generar' y sale con 0", () => {
  const p = correrCli({
    tracker: { propuestas: hechosHastaOctubreB, reutilizar_doc: [COP31] },
    rotacion: { orden: ORDEN, proximo_index: 3 },
  });
  assert.equal(p.status, 0);
  assert.match(p.stdout, /REUTILIZAR/);
  assert.match(p.stdout, new RegExp(COP31.fileId));
  assert.match(p.stdout, /NO generar/);
  assert.doesNotMatch(p.stdout, /se puede generar/);
});

test("CLI --json incluye la referencia completa en 'reutilizar'", () => {
  const p = correrCli({
    tracker: { propuestas: hechosHastaOctubreB, reutilizar_doc: [COP31] },
    rotacion: { orden: ORDEN, proximo_index: 3 },
    args: ["--json"],
  });
  assert.equal(p.status, 0);
  const j = JSON.parse(p.stdout);
  assert.equal(j.slot, "Noviembre-A");
  assert.deepEqual(j.reutilizar, COP31);
});

test("CLI: sin marcador sigue imprimiendo 'Coinciden: se puede generar.'", () => {
  const p = correrCli({
    tracker: { propuestas: hechosHastaOctubreB },
    rotacion: { orden: ORDEN, proximo_index: 3 },
  });
  assert.equal(p.status, 0);
  assert.match(p.stdout, /se puede generar/);
  assert.doesNotMatch(p.stdout, /REUTILIZAR/);
});

test("CLI: con marcador pero rotación distinta se detiene (código 2) y no dice REUTILIZAR", () => {
  const p = correrCli({
    tracker: { propuestas: hechosHastaOctubreB, reutilizar_doc: [COP31] },
    rotacion: { orden: ORDEN, proximo_index: 0 },
  });
  assert.equal(p.status, 2);
  assert.match(p.stdout, /NO coinciden/);
  assert.doesNotMatch(p.stdout, /REUTILIZAR/);
});
