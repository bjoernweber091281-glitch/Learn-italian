/**
 * Legt beim ersten `npm install` eine .env aus .env.example an.
 * Die Datei enthält nur den Pfad zur lokalen SQLite-Datei, keine Geheimnisse —
 * sie bleibt trotzdem aus der Versionskontrolle heraus.
 */
import { copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, ".env");
const template = join(root, ".env.example");

if (!existsSync(target) && existsSync(template)) {
  copyFileSync(template, target);
  console.log(".env aus .env.example angelegt.");
}
