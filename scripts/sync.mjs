/* Reports which consumers are on which version of Tenon.
   Run: node scripts/sync.mjs

   It writes nothing, by design. Every consumer installs Tenon the same
   way — a git dependency pinned to a tag — so moving one forward means
   editing its own package.json and reinstalling. A script that did it for
   them would be a script that changes another repo's lockfile silently.
   ------------------------------------------------------------------- */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const { version, name: PKG } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const { consumers } = JSON.parse(readFileSync(join(ROOT, 'consumers.json'), 'utf8'));

const SPEC = `github:tiagopedras/tenon#v${version}`;
const rows = [];
let behind = 0;

for (const c of consumers) {
  const manifest = resolve(ROOT, c.manifest);
  if (!existsSync(manifest)) {
    rows.push({ consumer: c.name, on: 'no package.json there', next: 'fix consumers.json' });
    continue;
  }
  const pkg = JSON.parse(readFileSync(manifest, 'utf8'));
  const spec = pkg.dependencies?.[PKG] ?? pkg.devDependencies?.[PKG];

  if (!spec) {
    behind++;
    rows.push({ consumer: c.name, on: 'not installed', next: `npm i ${SPEC}` });
    continue;
  }
  /* A spec with no #tag tracks the default branch, which moves under the
     consumer on any reinstall with no diff to show for it. Worth naming. */
  const pinned = spec.match(/#v?([0-9]+\.[0-9]+\.[0-9]+)/)?.[1];
  if (!pinned) {
    behind++;
    rows.push({ consumer: c.name, on: `${spec} (unpinned)`, next: `pin #v${version}` });
  } else if (pinned !== version) {
    behind++;
    rows.push({ consumer: c.name, on: `v${pinned}`, next: `npm i ${SPEC}` });
  } else {
    rows.push({ consumer: c.name, on: `v${pinned}`, next: 'current' });
  }
}

console.log(`Tenon v${version}\n`);
console.table(rows);
if (behind) console.log(`\n${behind} behind. Run the command in each consuming repo.`);
