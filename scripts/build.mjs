import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, readdir, realpath, lstat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const compiler = join(root, 'node_modules/typescript/bin/tsc');
const phaser = join(root, 'node_modules/phaser/dist/phaser.min.js');

async function rejectSymlink(path) {
  try {
    if ((await lstat(path)).isSymbolicLink()) throw new Error(`Destino simbólico recusado: ${relative(root, path)}`);
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}

async function copyTree(from, to) {
  await rejectSymlink(to);
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error('Links simbólicos não são aceitos nos assets.');
    const target = join(to, entry.name);
    await rejectSymlink(target);
    if (entry.isDirectory()) await copyTree(join(from, entry.name), target);
    else if (entry.isFile()) await copyFile(join(from, entry.name), target);
  }
}

try {
  await realpath(compiler);
  await realpath(phaser);
  await rejectSymlink(dist);
  // Check all existing output paths before invoking the compiler, which writes files.
  async function inspectOutput(path) {
    await rejectSymlink(path);
    try {
      for (const entry of await readdir(path, { withFileTypes: true })) {
        await rejectSymlink(join(path, entry.name));
        if (entry.isDirectory()) await inspectOutput(join(path, entry.name));
      }
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  await inspectOutput(dist);
  execFileSync(process.execPath, ['--max-old-space-size=512', compiler, '-p', join(root, 'tsconfig.json')], {
    cwd: root, stdio: 'pipe', timeout: 30000, maxBuffer: 1024 * 1024,
  });
  await copyTree(join(root, 'public'), dist);
  await mkdir(join(dist, 'vendor'), { recursive: true });
  await rejectSymlink(join(dist, 'vendor', 'phaser.min.js'));
  await copyFile(phaser, join(dist, 'vendor', 'phaser.min.js'));
  console.log('Build local concluído em dist/. Nenhum servidor foi iniciado.');
} catch (error) {
  console.error('Build não concluído.');
  if (error.code === 'ENOENT') console.error('Dependências ausentes. Instalação requer a avaliação e autorização documentadas.');
  else console.error(error.stdout?.toString() || error.message);
  process.exitCode = 1;
}
