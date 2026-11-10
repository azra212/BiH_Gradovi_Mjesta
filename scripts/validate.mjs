// Provjerava izvorni JSON: struktura, nazivi, duplikati i očekivani brojevi.
// Pokretanje: node scripts/validate.mjs
import { ABROAD_KEY, COUNTRIES_KEY, SOURCE_FILE, countries, loadSource, places } from "./data.mjs";

// Broj jedinica lokalne samouprave po zvaničnim izvorima:
// FBiH: FZS, Šifarnik JLS i naseljenih mjesta u FBiH (stanje 31.12.2019) -> 79
// RS:   RZS RS, Gradovi i opštine Republike Srpske 2023 (53 opštine + 11 gradova) -> 64
// Brčko distrikt BiH -> 1
const EXPECTED = { "Federacija BiH": 79, "Republika Srpska": 64, "Brčko Distrikt": 1 };
const ENTITIES = [...Object.keys(EXPECTED), ABROAD_KEY];

const errors = [];
const fail = (msg) => errors.push(msg);
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

let data;
try {
  data = loadSource();
} catch (err) {
  console.error(`✖ ${SOURCE_FILE} nije validan JSON: ${err.message}`);
  process.exit(1);
}

// Struktura
if (!isObject(data)) fail("korijen mora biti objekat");
else {
  const keys = Object.keys(data);
  for (const k of ENTITIES) if (!keys.includes(k)) fail(`nedostaje ključ "${k}"`);
  for (const k of keys) if (!ENTITIES.includes(k)) fail(`nepoznat ključ "${k}"`);

  for (const [entity, groups] of Object.entries(data)) {
    if (!isObject(groups) || Object.keys(groups).length === 0) {
      fail(`"${entity}" mora biti neprazan objekat`);
      continue;
    }
    if (entity === ABROAD_KEY && Object.keys(groups).join() !== COUNTRIES_KEY) {
      fail(`"${ABROAD_KEY}" mora imati samo ključ "${COUNTRIES_KEY}"`);
    }
    for (const [group, items] of Object.entries(groups)) {
      const where = `${entity} → ${group}`;
      if (!Array.isArray(items) || items.length === 0) {
        fail(`${where}: mora biti neprazna lista`);
        continue;
      }
      items.forEach((item, i) => {
        if (!isObject(item)) return fail(`${where}[${i}]: stavka mora biti objekat`);
        const extra = Object.keys(item).filter((k) => k !== "name" && k !== "code");
        if (extra.length) fail(`${where}[${i}]: nepoznata polja ${extra.join(", ")}`);
        if (typeof item.name !== "string" || item.name.trim() === "" || item.name.trim() !== item.name) {
          fail(`${where}[${i}]: "name" mora biti neprazan string bez razmaka na krajevima`);
        }
        if (typeof item.code !== "string" || !/^([0-9]+)?$/.test(item.code)) {
          fail(`${where}[${i}] (${item.name}): "code" mora biti string sa ciframa ili prazan string`);
        }
      });
    }
  }
}

if (errors.length === 0) {
  // Duplikati
  const dupes = (list, key) => {
    const seen = new Map();
    for (const x of list) if (x[key] !== "") seen.set(x[key], (seen.get(x[key]) ?? 0) + 1);
    return [...seen].filter(([, n]) => n > 1).map(([v]) => v);
  };
  const bih = places(data);
  const abroad = countries(data);
  for (const v of dupes(bih, "name")) fail(`dupli naziv u BiH: "${v}"`);
  for (const v of dupes(bih, "code")) fail(`dupli kod u BiH: "${v}"`);
  for (const v of dupes(abroad, "name")) fail(`dupli naziv države: "${v}"`);
  for (const v of dupes(abroad, "code")) fail(`dupli kod države: "${v}"`);
  if (abroad.some((c) => c.name === "Bosna i Hercegovina")) fail(`"Bosna i Hercegovina" ne pripada listi "${ABROAD_KEY}"`);

  // Očekivani brojevi
  for (const [entity, expected] of Object.entries(EXPECTED)) {
    const actual = bih.filter((p) => p.entity === entity).length;
    if (actual !== expected) fail(`${entity}: ${actual} stavki, očekivano ${expected} (ažuriraj EXPECTED uz izvor ako je promjena namjerna)`);
  }

  if (errors.length === 0) {
    const counts = Object.keys(EXPECTED).map((e) => `${e} ${bih.filter((p) => p.entity === e).length}`);
    console.log(`✔ ${SOURCE_FILE} je validan: ${counts.join(", ")}; ukupno u BiH ${bih.length}; država van BiH ${abroad.length}`);
  }
}

if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`);
  process.exit(1);
}
