// Opt-in local preview. No installation, child processes, uploads or shell commands.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = 4173;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.tmj': 'application/json', '.png': 'image/png' };
const policy = "default-src 'self'; img-src 'self' data: blob:; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'";

await stat(resolve(root, 'index.html')).catch(() => {
  console.error('dist/index.html ausente. Execute o build antes da prévia.');
  process.exit(1);
});
const canonicalRoot = await realpath(root);
const server = createServer(async (request, response) => {
  response.setHeader('Content-Security-Policy', policy);
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-store');
  if (!['127.0.0.1:4173', 'localhost:4173'].includes(request.headers.host ?? '')) {
    response.writeHead(403).end('Host não permitido.'); return;
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end(); return;
  }
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://127.0.0.1:4173').pathname);
    const candidate = resolve(root, `.${path === '/' ? '/index.html' : path}`);
    if (!candidate.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    const resolved = await realpath(candidate);
    if (!resolved.startsWith(canonicalRoot + sep)) { response.writeHead(403).end(); return; }
    const info = await stat(resolved);
    if (!info.isFile() || info.size > 20 * 1024 * 1024) { response.writeHead(404).end(); return; }
    response.writeHead(200, { 'Content-Type': types[extname(resolved)] ?? 'application/octet-stream', 'Content-Length': info.size });
    if (request.method === 'HEAD') { response.end(); return; }
    const stream = createReadStream(resolved);
    stream.on('error', () => response.destroy());
    response.on('close', () => stream.destroy());
    stream.pipe(response);
  } catch { if (!response.headersSent) response.writeHead(404); response.end('Arquivo não encontrado.'); }
});
server.requestTimeout = 5000;
server.headersTimeout = 5000;
server.maxConnections = 16;
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => {
  console.log('Prévia local: http://127.0.0.1:4173');
  console.log('Somente neste Mac. Encerramento automático em 10 minutos; Ctrl+C encerra antes.');
});
function stop() { server.closeAllConnections(); server.close(); }
const timer = setTimeout(stop, 10 * 60 * 1000);
timer.unref();
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
