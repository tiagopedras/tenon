/* Reports which consumers are on which version of Tenon, and copies the
   built CSS into the ones that cannot install it.

   Run: node scripts/sync.mjs            status only, writes nothing
        node scripts/sync.mjs --write    copy into every vendor consumer
        node scripts/sync.mjs --write "to-dos board"

   Two kinds of consumer, because to-dos has no npm anywhere near it. An
   npm consumer pins a tag in its package.json and this only reads it back.
   A vendor consumer gets the file copied in, and the version stamp at the
   top of that file is the only record of which build it holds.
   ------------------------------------------------------------------- */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const { version, name: PKG } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const { consumers } = JSON.parse(readFileSync(join(ROOT, 'consumers.json'), 'utf8'));

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const ONLY = args.find((a) => !a.startsWith('--'));

/* The stamp build.mjs writes into the first line of dist/tenon.css. Reading
   it back out is how a copied file says which build it is. */
const stampOf = (text) => text.match(/Tenon v([0-9]+\.[0-9]+\.[0-9]+)/)?.[1] ?? null;

const rows = [];
let wrote = 0;
let stale = 0;

for (const c of consumers) {
  if (ONLY && c.name !== ONLY) continue;
  const base = resolve(ROOT, c.manifest);

  if (c.kind === 'npm') {
    if (!existsSync(base)) { rows.push({ consumer: c.name, kind: 'npm', has: 'manifest not found', action: '-' }); continue; }
    const pkg = JSON.parse(readFileSync(base, 'utf8'));
    const spec = pkg.dependencies?.[PKG] ?? pkg.devDependencies?.[PKG];
    if (!spec) {
      rows.push({ consumer: c.name, kind: 'npm', has: 'not installed', action: `npm i github:tiagopedras/tenon#v${version}` });
      continue;
    }
    const pinned = spec.match(/#v?([0-9]+\.[0-9]+\.[0-9]+)/)?.[1] ?? null;
    const behind = pinned !== version;
    if (behind) stale++;
    rows.push({
      consumer: c.name, kind: 'npm',
      has: pinned ?? spec,
      action: behind ? `pin #v${version} and reinstall` : 'current',
    });
    continue;
  }

  /* vendor */
  for (const [from, to] of Object.entries(c.files)) {
    const src = join(ROOT, from);
    const dest = join(base, to);
    const source = readFileSync(src, 'utf8');
    const have = existsSync(dest) ? stampOf(readFileSync(dest, 'utf8')) : null;
    const behind = have !== version;

    if (behind && WRITE) {
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, source);
      wrote++;
      rows.push({ consumer: c.name, kind: 'vendor', has: have ?? 'absent', action: `written v${version}` });
    } else {
      if (behind) stale++;
      rows.push({
        consumer: c.name, kind: 'vendor',
        has: have ?? 'absent',
        action: behind ? `run with --write` : 'current',
      });
    }
  }
}

console.log(`Tenon v${version}\n`);
console.table(rows);

if (!WRITE && stale) {
  console.log(`\n${stale} behind. Vendor copies update with --write; npm consumers need the tag bumped in their own package.json.`);
} else if (wrote) {
  console.log(`\n${wrote} file(s) written. Commit them in the consuming repo.`);
}
