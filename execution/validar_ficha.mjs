#!/usr/bin/env node
// validar_ficha.mjs — revisa una propuesta de blog (HTML) ANTES de subirla a Drive.
//
// Pasa a código las reglas que el importador de carbonbox.app no perdona
// (blog-skill.md, paso 3) y las REGLAS DE ORO verificables. Errores = no subir.
//
// Uso:  node execution/validar_ficha.mjs .tmp/<slot>.html [--json]
// Código de salida 1 si hay errores; las advertencias no bloquean.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const CATEGORIAS = ["Estimación de Huella de Carbono", "Estrategia y ESG", "Eventos", "Tecnología e IA",
  "Normativa y COP", "Bonos y créditos", "Análisis de ciclo de vida", "Casos de éxito"];
export const AUTORES = ["Viviana Bohórquez Lozano", "Maria Alejandra Rojas Herrera", "David Romero",
  "Laura María Bautista Santander", "Miguel Ángel Romero Mora", "Kimsa SAS"];

const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const clave = (s) => sinTildes(s).toLowerCase().replace(/[*_]/g, "").replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim();
const texto = (html) => html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<br\s*\/?>/gi, "\n")
  .replace(/<\/(p|li|h[1-6]|div|tr)>/gi, "\n").replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/[ \t]+/g, " ");

const CAMPOS = {
  frase: "frase clave objetivo", titulo: "etiqueta de titulo", meta: "metadescripcion", slug: "slug de url",
  sinopsis: "sinopsis/extracto", categoria: "categoria del blog", etiquetas: "etiquetas", alt: "alt text de imagen de portada", autor: "autor",
};

export function validarPropuesta(html) {
  const errores = [], avisos = [];
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => texto(m[1]).trim());
  if (h1s.length !== 1) errores.push(`Debe haber exactamente un <h1> (hay ${h1s.length}).`);

  // Ficha: desde el heading que contiene "FICHA SEO" hasta el final.
  const iFicha = html.search(/<h[1-6]\b[^>]*>[^<]*FICHA SEO/i);
  if (iFicha < 0) { errores.push('Falta el heading de la sección "FICHA SEO".'); return { errores, avisos, campos: {} }; }
  const cuerpo = html.slice(0, iFicha), ficha = html.slice(iFicha);
  // Las tablas de la ficha se ignoran en silencio en el importador: se detecta si hay alguna ANTES del reporte de keywords.
  const finCampos = ficha.search(/REPORTE DE KEYWORD|Copy de LinkedIn/i);
  if (/<table\b/i.test(finCampos > 0 ? ficha.slice(0, finCampos) : ficha)) errores.push("La ficha SEO contiene una tabla: el importador NO lee tablas (líneas 'Etiqueta: valor').");

  const campos = {};
  for (const linea of texto(ficha).split("\n")) {
    const m = linea.match(/^\s*[-•]?\s*([^:]{3,60}):\s*(.+?)\s*$/);
    if (!m) continue;
    const k = clave(m[1]);
    for (const [id, etiqueta] of Object.entries(CAMPOS)) if (!campos[id] && k.startsWith(etiqueta)) campos[id] = m[2].replace(/\s*\|\s*CarbonBox\s*$/i, "").trim();
  }
  for (const [id, etiqueta] of Object.entries(CAMPOS)) if (!campos[id]) errores.push(`Falta el campo "${etiqueta}".`);

  const { frase = "", titulo = "", meta = "", slug = "", sinopsis = "", categoria = "", autor = "", etiquetas = "" } = campos;
  if (titulo && titulo.length > 60) errores.push(`Etiqueta de título: ${titulo.length} caracteres (máx. 60 sin " | CarbonBox").`);
  if (meta && meta.length > 155) errores.push(`Metadescripción: ${meta.length} caracteres (máx. 155).`);
  if (slug) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errores.push(`Slug inválido "${slug}": solo minúsculas, números y guiones, sin tildes.`);
    const n = slug.split("-").length;
    if (n < 4 || n > 7) avisos.push(`Slug con ${n} palabras (lo recomendado es 4-7).`);
  }
  if (sinopsis && (sinopsis.length < 150 || sinopsis.length > 250)) errores.push(`Sinopsis: ${sinopsis.length} caracteres (150-250).`);
  if (categoria && !CATEGORIAS.some((c) => clave(c) === clave(categoria))) errores.push(`Categoría "${categoria}" no es una de las 8 oficiales.`);
  if (autor && !AUTORES.includes(autor.trim())) errores.push(`Autor "${autor}" no coincide EXACTO con la lista oficial (saldría firmado "CarbonBox").`);
  if (etiquetas) { const n = etiquetas.split(",").filter((x) => x.trim()).length; if (n < 3 || n > 5) avisos.push(`Etiquetas: ${n} (lo recomendado es 3-5).`); }

  // Frase clave en H1, meta, slug, algún H2/H3 y cuerpo.
  if (frase) {
    const f = clave(frase), fSlug = sinTildes(frase).toLowerCase().replace(/\s+/g, "-");
    if (h1s[0] && !clave(h1s[0]).includes(f)) avisos.push("La frase clave no aparece en el H1.");
    if (meta && !clave(meta).includes(f)) avisos.push("La frase clave no aparece en la metadescripción.");
    if (slug && !slug.includes(fSlug)) avisos.push("La frase clave no aparece completa en el slug.");
    const hs = [...cuerpo.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi)].map((m) => clave(texto(m[1])));
    if (!hs.some((h) => h.includes(f))) avisos.push("La frase clave no aparece en ningún H2/H3.");
  }

  // Reglas de oro verificables sobre el CUERPO (la ficha puede nombrar la categoría "Bonos y créditos").
  const t = texto(cuerpo);
  if (/\bmedici[oó]n(es)?\b/i.test(t)) errores.push('El cuerpo dice "medición": la regla de oro es "estimación".');
  if (/\bbonos?\b/i.test(t)) errores.push('El cuerpo dice "bono(s)": la regla de oro es "créditos".');
  if (!/https:\/\/www\.carbonbox\.app\/?["'\s>]/.test(cuerpo)) avisos.push("No encontré el CTA a https://www.carbonbox.app/ en el cuerpo.");
  if (/carbonbox\.app\/?#contacto/i.test(cuerpo)) errores.push("El CTA no lleva #contacto.");
  const sueltos = (cuerpo.replace(/<(b|strong)\b[^>]*>\s*CarbonBox\s*<\/\1>/gi, "").replace(/<[^>]+>/g, " ").match(/\bCarbonBox\b/g) || []).length;
  if (sueltos) avisos.push(`"CarbonBox" aparece ${sueltos} vez/veces sin negrilla.`);
  if (/data:image\//i.test(html)) errores.push("Hay imágenes en base64: se corrompen en Drive.");

  return { errores, avisos, campos };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const archivo = process.argv[2];
  if (!archivo) { console.error("Uso: node execution/validar_ficha.mjs <propuesta.html> [--json]"); process.exit(1); }
  const r = validarPropuesta(fs.readFileSync(archivo, "utf8"));
  if (process.argv.includes("--json")) console.log(JSON.stringify(r, null, 2));
  else {
    for (const e of r.errores) console.log(`❌ ${e}`);
    for (const a of r.avisos) console.log(`⚠️  ${a}`);
    console.log(r.errores.length ? `\n${r.errores.length} error(es): NO subir a Drive hasta corregir.` : "\n✅ Sin errores: se puede subir.");
  }
  process.exit(r.errores.length ? 1 : 0);
}
