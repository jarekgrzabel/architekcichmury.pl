/* eslint-disable @typescript-eslint/no-require-imports -- Passenger uruchamia ten plik jako CommonJS. */
const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

const outputDirectory = path.join(__dirname, "out");
const fallbackPort = 3000;
const parsedPort = Number.parseInt(process.env.PORT || "", 10);
const port = Number.isInteger(parsedPort) ? parsedPort : fallbackPort;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const htmlScriptHashCache = new Map();

function contentSecurityPolicy(scriptHashes = []) {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self' ${scriptHashes.join(" ")}`.trim(),
    "script-src-attr 'none'",
    "connect-src 'self'",
    "frame-src 'none'",
    "manifest-src 'self'",
    "media-src 'self'",
    "worker-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

async function inlineScriptHashes(filePath) {
  if (path.extname(filePath).toLowerCase() !== ".html") {
    return [];
  }

  const cachedHashes = htmlScriptHashCache.get(filePath);
  if (cachedHashes) {
    return cachedHashes;
  }

  const html = await fs.promises.readFile(filePath, "utf8");
  const hashes = new Set();
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptPattern)) {
    const attributes = match[1];
    const source = match[2];

    if (/\bsrc\s*=/i.test(attributes) || source.length === 0) {
      continue;
    }

    const digest = crypto.createHash("sha256").update(source).digest("base64");
    hashes.add(`'sha256-${digest}'`);
  }

  const result = [...hashes];
  htmlScriptHashCache.set(filePath, result);
  return result;
}

async function securityHeaders(filePath) {
  const scriptHashes = filePath ? await inlineScriptHashes(filePath) : [];

  return {
    "Content-Security-Policy": contentSecurityPolicy(scriptHashes),
    "Cross-Origin-Opener-Policy": "same-origin",
    "Permissions-Policy":
      "browsing-topics=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "0",
  };
}

function isInsideOutputDirectory(filePath) {
  return (
    filePath === outputDirectory ||
    filePath.startsWith(`${outputDirectory}${path.sep}`)
  );
}

async function firstExistingFile(candidates) {
  for (const candidate of candidates) {
    if (!isInsideOutputDirectory(candidate)) {
      continue;
    }

    try {
      const stats = await fs.promises.stat(candidate);
      if (stats.isFile()) {
        return { filePath: candidate, size: stats.size };
      }
    } catch (error) {
      if (error.code !== "ENOENT" && error.code !== "ENOTDIR") {
        throw error;
      }
    }
  }

  return null;
}

function requestCandidates(pathname) {
  const relativePath = pathname.replace(/^\/+/, "");
  const resolvedPath = path.resolve(outputDirectory, relativePath);

  if (!isInsideOutputDirectory(resolvedPath)) {
    return [];
  }

  if (pathname.endsWith("/")) {
    return [path.join(resolvedPath, "index.html")];
  }

  if (path.extname(resolvedPath)) {
    return [resolvedPath];
  }

  return [
    resolvedPath,
    `${resolvedPath}.html`,
    path.join(resolvedPath, "index.html"),
  ];
}

async function sendFile(request, response, file, statusCode = 200) {
  const extension = path.extname(file.filePath).toLowerCase();
  const isVersionedAsset = file.filePath.includes(
    `${path.sep}_next${path.sep}static${path.sep}`,
  );

  response.writeHead(statusCode, {
    ...(await securityHeaders(file.filePath)),
    "Cache-Control": isVersionedAsset
      ? "public, max-age=31536000, immutable"
      : extension === ".html"
        ? "no-cache"
        : "public, max-age=3600",
    "Content-Length": file.size,
    "Content-Type": contentTypes[extension] || "application/octet-stream",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  fs.createReadStream(file.filePath).pipe(response);
}

async function sendText(
  request,
  response,
  statusCode,
  body,
  additionalHeaders = {},
) {
  const payload = Buffer.from(body, "utf8");

  response.writeHead(statusCode, {
    ...(await securityHeaders()),
    "Cache-Control": "no-store",
    "Content-Length": payload.length,
    "Content-Type": "text/plain; charset=utf-8",
    ...additionalHeaders,
  });

  if (request.method === "HEAD") {
    response.end();
  } else {
    response.end(payload);
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    await sendText(request, response, 405, "Method Not Allowed", {
      Allow: "GET, HEAD",
    });
    return;
  }

  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    const pathname = decodeURIComponent(requestUrl.pathname);
    const requestedFile = await firstExistingFile(requestCandidates(pathname));

    if (requestedFile) {
      await sendFile(request, response, requestedFile);
      return;
    }

    const notFoundFile = await firstExistingFile([
      path.join(outputDirectory, "404.html"),
    ]);

    if (notFoundFile) {
      await sendFile(request, response, notFoundFile, 404);
      return;
    }

    await sendText(
      request,
      response,
      503,
      "Brak eksportu strony. Uruchom najpierw: npm run build",
    );
  } catch (error) {
    console.error(error);
    await sendText(request, response, 500, "Internal Server Error");
  }
});

server.listen(port);
