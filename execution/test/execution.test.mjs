// node --test execution/test/
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { leerCalendario, siguienteSlot } from "../siguiente_slot.mjs";
import { validarPropuesta } from "../validar_ficha.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("lee el calendario real: slots, temas y responsables", () => {
  const cal = leerCalendario(fs.readFileSync(path.join(RAIZ, "blog-strategy/04_calendario_editorial.md"), "utf8"));
  const oct = cal.find((s) => s.slot === "Octubre-A");
  assert.ok(oct, "existe Octubre-A");
  assert.match(oct.tema, /Ciclo de Vida/);
  assert.equal(oct.responsable, "Miguel");
  assert.ok(!cal.some((s) => s.slot.startsWith("undefined")));
});

test("siguiente slot = primero del calendario sin registro en el tracker", () => {
  const calendario = [
    { slot: "Julio-A", tema: "a", responsable: "Ana" },
    { slot: "Julio-B", tema: "b", responsable: "Luis" },
    { slot: "Agosto-A", tema: "c", responsable: "Ana" },
  ];
  const r = siguienteSlot({ calendario, tracker: { propuestas: [{ slot: "Julio-A" }] }, rotacion: { orden: ["Ana", "Luis"], proximo_index: 1 } });
  assert.equal(r.slot, "Julio-B");
  assert.equal(r.coinciden, true);
  assert.equal(r.pendientes_en_calendario, 2);
});

test("rotación y calendario distintos → no coinciden (hay que detenerse)", () => {
  const r = siguienteSlot({ calendario: [{ slot: "Julio-A", tema: "a", responsable: "Ana" }], tracker: { propuestas: [] }, rotacion: { orden: ["Luis"], proximo_index: 0 } });
  assert.equal(r.coinciden, false);
});

const ficha = (extra = "") => `
<h1>Análisis de ciclo de vida: guía práctica 2026</h1>
<p>Entradilla sobre el <b>CarbonBox</b> y la estimación.</p>
<h2>Qué es el análisis de ciclo de vida</h2><p>Cuerpo. <a href="https://www.carbonbox.app/">Agenda</a></p>
${extra}
<h2>FICHA SEO Y PUBLICACIÓN — copiar y pegar</h2>
<p>Frase clave objetivo: análisis de ciclo de vida</p>
<p><b>Etiqueta de título (52 car.):</b> Análisis de ciclo de vida: guía práctica 2026 | CarbonBox</p>
<p>Metadescripción: Qué es el análisis de ciclo de vida y cómo aplicarlo en tu empresa en 2026, paso a paso.</p>
<p>Slug de URL: analisis-de-ciclo-de-vida-guia-2026</p>
<p>Sinopsis/extracto: ${"x".repeat(160)}</p>
<p>Categoría del blog: Análisis de ciclo de vida</p>
<p>Etiquetas: acv, ciclo de vida, huella de producto</p>
<p>Alt text de imagen de portada: Equipo revisando un análisis de ciclo de vida</p>
<p>Autor: Miguel Ángel Romero Mora</p>`;

test("una propuesta correcta pasa sin errores", () => {
  const r = validarPropuesta(ficha());
  assert.deepEqual(r.errores, []);
  assert.equal(r.campos.titulo, "Análisis de ciclo de vida: guía práctica 2026");
});

test("atrapa los errores que ya pasaron: ficha en tabla, autor recortado, bonos, medición", () => {
  const html = ficha('<p>Hablamos de bonos y de la medición.</p>')
    .replace("Autor: Miguel Ángel Romero Mora", "Autor: Miguel Romero")
    .replace("<p>Frase clave objetivo", "<table><tr><td>x</td></tr></table><p>Frase clave objetivo");
  const e = validarPropuesta(html).errores.join(" | ");
  assert.match(e, /tabla/);
  assert.match(e, /Autor "Miguel Romero"/);
  assert.match(e, /bono/);
  assert.match(e, /medición/);
});

test("la categoría 'Bonos y créditos' en la ficha no cuenta como 'bonos' en el cuerpo", () => {
  const r = validarPropuesta(ficha().replace("Categoría del blog: Análisis de ciclo de vida", "Categoría del blog: Bonos y créditos"));
  assert.deepEqual(r.errores, []);
});

test("slug con tildes, meta larga y dos H1 son errores", () => {
  const html = ficha("<h1>Otro</h1>").replace("analisis-de-ciclo-de-vida-guia-2026", "análisis-ciclo").replace("paso a paso.", "paso a paso. " + "y".repeat(120));
  const e = validarPropuesta(html).errores.join(" | ");
  assert.match(e, /exactamente un <h1>/);
  assert.match(e, /Slug inválido/);
  assert.match(e, /Metadescripción/);
});
