import {
  getProductById,
  type DocsProductId,
} from "./docs-products";

/** Maps a logical page key to paths per product (relative to site root). */
const routeMap: Record<string, Partial<Record<DocsProductId, string>>> = {
  "getting-started": {
    python: "python/quick-start",
    javascript: "chonkiejs/getting-started/quick-start",
  },
  installation: {
    python: "python/installation",
    javascript: "chonkiejs/getting-started/installation",
  },
  "token-chunker": {
    python: "python/chunkers/token-chunker",
    javascript: "chonkiejs/chunkers/token-chunker",
  },
  "sentence-chunker": {
    python: "python/chunkers/sentence-chunker",
    javascript: "chonkiejs/chunkers/sentence-chunker",
  },
  "recursive-chunker": {
    python: "python/chunkers/recursive-chunker",
    javascript: "chonkiejs/chunkers/recursive-chunker",
  },
  "semantic-chunker": {
    python: "python/chunkers/semantic-chunker",
    javascript: "chonkiejs/chunkers/semantic-chunker",
  },
  "code-chunker": {
    python: "python/chunkers/code-chunker",
    javascript: "chonkiejs/chunkers/code-chunker",
  },
  "table-chunker": {
    python: "python/chunkers/table-chunker",
    javascript: "chonkiejs/chunkers/table-chunker",
  },
  "fast-chunker": {
    python: "python/chunkers/fast-chunker",
    javascript: "chonkiejs/chunkers/fast-chunker",
  },
  chroma: {
    python: "python/handshakes/chroma-handshake",
    javascript: "chonkiejs/handshakes/chroma",
  },
  changelog: {
    python: "python/changelog",
    javascript: "chonkiejs/changelog",
  },
  troubleshooting: {
    python: "python/troubleshooting",
    javascript: "chonkiejs/troubleshooting",
  },
};

function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/docs")) {
    return path.slice("/docs".length) || "/";
  }
  return path;
}

function getRouteKey(pathSuffix: string): string | null {
  const segments = pathSuffix.replace(/^\//, "").split("/");

  if (segments.includes("quick-start")) return "getting-started";
  if (segments.includes("installation")) return "installation";
  if (segments.includes("changelog")) return "changelog";
  if (segments.includes("troubleshooting")) return "troubleshooting";

  const chunkerIdx = segments.indexOf("chunkers");
  if (chunkerIdx !== -1 && segments[chunkerIdx + 1]) {
    return segments[chunkerIdx + 1].replace(/\.mdx$/, "");
  }

  const handshakeIdx = segments.indexOf("handshakes");
  if (handshakeIdx !== -1 && segments[handshakeIdx + 1]) {
    return segments[handshakeIdx + 1].replace(/-handshake$/, "");
  }

  return null;
}

export function getProductFromPath(pathname: string) {
  const normalized = normalizePath(pathname);

  if (normalized.startsWith("/chonkiejs")) {
    return getProductById("javascript");
  }

  return getProductById("python");
}

export function switchProductHref(
  pathname: string,
  targetId: DocsProductId,
): string {
  const current = getProductFromPath(pathname);
  if (current.id === targetId) return pathname;

  const pathSuffix = normalizePath(pathname);
  const routeKey = getRouteKey(pathSuffix);

  if (routeKey && routeMap[routeKey]?.[targetId]) {
    return `/${routeMap[routeKey][targetId]}`;
  }

  return getProductById(targetId).defaultPage;
}
