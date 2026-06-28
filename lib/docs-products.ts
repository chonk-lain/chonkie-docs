export type DocsProductId = "python" | "javascript";

export interface DocsProduct {
  id: DocsProductId;
  label: string;
  description: string;
  basePath: string;
  defaultPage: string;
  badge: string | null;
}

export const docsProducts: DocsProduct[] = [
  {
    id: "python",
    label: "Python",
    description: "chonkie on PyPI",
    basePath: "/python",
    defaultPage: "/python/installation",
    badge: "PY",
  },
  {
    id: "javascript",
    label: "JavaScript",
    description: "@chonkiejs/core on npm",
    basePath: "/chonkiejs",
    defaultPage: "/chonkiejs/getting-started/quick-start",
    badge: "JS",
  },
];

export function getProductById(id: DocsProductId): DocsProduct {
  const product = docsProducts.find((p) => p.id === id);
  if (!product) throw new Error(`Unknown product: ${id}`);
  return product;
}
