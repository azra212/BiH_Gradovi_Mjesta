// Generiše izvedene formate u dist/ iz izvornog JSON-a.
// Pokretanje: node scripts/build.mjs           (piše fajlove)
//             node scripts/build.mjs --check   (samo provjerava da su fajlovi ažurni)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, countries, loadSource, places } from "./data.mjs";

const csvCell = (v) => (/[",\r\n]/.test(v) ? `"${v.replaceAll('"', '""')}"` : v);
const toCsv = (rows, columns) =>
  [columns, ...rows.map((r) => columns.map((c) => r[c]))].map((cells) => cells.map(csvCell).join(",")).join("\n") + "\n";
const toJson = (rows) => JSON.stringify(rows, null, 2) + "\n";

const data = loadSource();
const bih = places(data);
const abroad = countries(data);

const outputs = {
  "mjesta.json": toJson(bih),
  "mjesta.csv": toCsv(bih, ["entity", "group", "name", "code"]),
  "drzave.json": toJson(abroad),
  "drzave.csv": toCsv(abroad, ["name", "code"]),
};

const dist = join(ROOT, "dist");
const check = process.argv.includes("--check");
const stale = [];

if (!check) mkdirSync(dist, { recursive: true });
for (const [file, content] of Object.entries(outputs)) {
  const path = join(dist, file);
  if (check) {
    let current = null;
    try {
      current = readFileSync(path, "utf8");
    } catch {}
    if (current !== content) stale.push(file);
  } else {
    writeFileSync(path, content);
  }
}

if (stale.length) {
  console.error(`✖ dist/ nije ažuran (${stale.join(", ")}). Pokreni: npm run build`);
  process.exit(1);
}
console.log(check ? "✔ dist/ je ažuran" : `✔ generisano u dist/: ${Object.keys(outputs).join(", ")}`);
