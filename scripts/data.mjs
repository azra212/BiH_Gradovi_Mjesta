import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("..", import.meta.url));
export const SOURCE_FILE = "kantoni i mjesta u BiH.json";
export const ABROAD_KEY = "Van BiH";
export const COUNTRIES_KEY = "Države";

export function loadSource() {
  return JSON.parse(readFileSync(new URL(`../${SOURCE_FILE}`, import.meta.url), "utf8"));
}

/** Gradovi i općine u BiH kao ravna lista: { entity, group, name, code }. */
export function places(data) {
  return Object.entries(data)
    .filter(([entity]) => entity !== ABROAD_KEY)
    .flatMap(([entity, groups]) =>
      Object.entries(groups).flatMap(([group, items]) =>
        items.map(({ name, code }) => ({ entity, group, name, code })),
      ),
    );
}

/** Države van BiH: { name, code }. */
export function countries(data) {
  return data[ABROAD_KEY][COUNTRIES_KEY].map(({ name, code }) => ({ name, code }));
}
