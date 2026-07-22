import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const distRoot = resolve(projectRoot, 'dist');
const port = Number(process.env.SAFEFLOOR_PREVIEW_PORT ?? 5174);
const basePath = '/safefloor';

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function isFile(pathname) {
  try {
    return (await stat(pathname)).isFile();
  } catch {
    return false;
  }
}

async function resolveRequest(pathname) {
  const decoded = decodeURIComponent(pathname).replaceAll('\\', '/');
  const routePath = decoded === basePath
    ? '/'
    : decoded.startsWith(`${basePath}/`)
      ? decoded.slice(basePath.length)
      : decoded;
  const direct = resolve(distRoot, `.${routePath}`);
  if (direct !== distRoot && !direct.startsWith(`${distRoot}${sep}`)) return null;

  const candidates = routePath === '/'
    ? [resolve(distRoot, 'index.html')]
    : extname(routePath)
      ? [direct]
      : [`${direct}.html`, resolve(direct, 'index.html')];

  for (const candidate of candidates) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? '127.0.0.1'}`);
    const filePath = await resolveRequest(url.pathname);
    if (!filePath) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('SAFEFLOOR route not found');
      return;
    }

    const body = await readFile(filePath);
    const contentType = mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
    response.writeHead(200, {
      'cache-control': 'no-store',
      'content-length': body.byteLength,
      'content-type': contentType,
    });
    if (request.method === 'HEAD') response.end();
    else response.end(body);
  } catch (error) {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    response.end(error instanceof Error ? error.message : 'Preview server error');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`SAFEFLOOR mobile preview: http://127.0.0.1:${port}${basePath}/`);
});
