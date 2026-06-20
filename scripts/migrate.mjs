import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";

const SOURCE_DIR = join(process.cwd(), "..", "chonkie", "docs");
const OUTPUT_DIR = join(process.cwd(), "content", "docs");

// File map: source path (relative to docs/) -> destination path (relative to content/docs/)
const FILE_MAP = {
  "common/welcome.mdx": "index.mdx",
  "common/concepts.mdx": "concepts.mdx",
  "common/open-source.mdx": "open-source.mdx",
  // Getting Started
  "oss/quick-start.mdx": "getting-started/quick-start.mdx",
  "oss/installation.mdx": "getting-started/installation.mdx",
  "oss/pipelines.mdx": "getting-started/pipelines.mdx",
  // API Server
  "oss/api/overview.mdx": "api-server/overview.mdx",
  "oss/api/quickstart.mdx": "api-server/quickstart.mdx",
  "oss/api/endpoints.mdx": "api-server/endpoints.mdx",
  "oss/api/pipelines.mdx": "api-server/pipelines.mdx",
  "oss/api/docker.mdx": "api-server/docker.mdx",
  // Chefs
  "oss/chefs/overview.mdx": "chefs/overview.mdx",
  "oss/chefs/tablechef.mdx": "chefs/tablechef.mdx",
  "oss/chefs/textchef.mdx": "chefs/textchef.mdx",
  "oss/chefs/markdownchef.mdx": "chefs/markdownchef.mdx",
  "oss/chefs/mistral-ocr.mdx": "chefs/mistral-ocr.mdx",
  "oss/chefs/liteparse.mdx": "chefs/liteparse.mdx",
  // Fetchers
  "oss/fetchers/overview.mdx": "fetchers/overview.mdx",
  "oss/fetchers/file-fetcher.mdx": "fetchers/file-fetcher.mdx",
  // Chunkers
  "oss/chunkers/overview.mdx": "chunkers/overview.mdx",
  "oss/chunkers/code-chunker.mdx": "chunkers/code-chunker.mdx",
  "oss/chunkers/fast-chunker.mdx": "chunkers/fast-chunker.mdx",
  "oss/chunkers/late-chunker.mdx": "chunkers/late-chunker.mdx",
  "oss/chunkers/neural-chunker.mdx": "chunkers/neural-chunker.mdx",
  "oss/chunkers/recursive-chunker.mdx": "chunkers/recursive-chunker.mdx",
  "oss/chunkers/semantic-chunker.mdx": "chunkers/semantic-chunker.mdx",
  "oss/chunkers/sentence-chunker.mdx": "chunkers/sentence-chunker.mdx",
  "oss/chunkers/slumber-chunker.mdx": "chunkers/slumber-chunker.mdx",
  "oss/chunkers/table-chunker.mdx": "chunkers/table-chunker.mdx",
  "oss/chunkers/teraflopai-chunker.mdx": "chunkers/teraflopai-chunker.mdx",
  "oss/chunkers/token-chunker.mdx": "chunkers/token-chunker.mdx",
  // Embeddings
  "oss/embeddings/overview.mdx": "embeddings/overview.mdx",
  "oss/embeddings/auto-embeddings.mdx": "embeddings/auto-embeddings.mdx",
  "oss/embeddings/cohere-embeddings.mdx": "embeddings/cohere-embeddings.mdx",
  "oss/embeddings/sentence-transformer-embeddings.mdx": "embeddings/sentence-transformer-embeddings.mdx",
  "oss/embeddings/openai-embeddings.mdx": "embeddings/openai-embeddings.mdx",
  "oss/embeddings/azure-embeddings.mdx": "embeddings/azure-embeddings.mdx",
  "oss/embeddings/model2vec-embeddings.mdx": "embeddings/model2vec-embeddings.mdx",
  "oss/embeddings/jina-embeddings.mdx": "embeddings/jina-embeddings.mdx",
  "oss/embeddings/gemini-embeddings.mdx": "embeddings/gemini-embeddings.mdx",
  "oss/embeddings/voyageai-embeddings.mdx": "embeddings/voyageai-embeddings.mdx",
  "oss/embeddings/custom-embeddings.mdx": "embeddings/custom-embeddings.mdx",
  "oss/embeddings/litellm-embeddings.mdx": "embeddings/litellm-embeddings.mdx",
  // Refinery
  "oss/refinery/overview.mdx": "refinery/overview.mdx",
  "oss/refinery/overlap-refinery.mdx": "refinery/overlap-refinery.mdx",
  "oss/refinery/embeddings-refinery.mdx": "refinery/embeddings-refinery.mdx",
  // Handshakes
  "oss/handshakes/overview.mdx": "handshakes/overview.mdx",
  "oss/handshakes/chroma-handshake.mdx": "handshakes/chroma-handshake.mdx",
  "oss/handshakes/elastic-handshake.mdx": "handshakes/elastic-handshake.mdx",
  "oss/handshakes/lancedb-handshake.mdx": "handshakes/lancedb-handshake.mdx",
  "oss/handshakes/milvus-handshake.mdx": "handshakes/milvus-handshake.mdx",
  "oss/handshakes/mongodb-handshake.mdx": "handshakes/mongodb-handshake.mdx",
  "oss/handshakes/pgvector-handshake.mdx": "handshakes/pgvector-handshake.mdx",
  "oss/handshakes/pinecone-handshake.mdx": "handshakes/pinecone-handshake.mdx",
  "oss/handshakes/qdrant-handshake.mdx": "handshakes/qdrant-handshake.mdx",
  "oss/handshakes/turbopuffer-handshake.mdx": "handshakes/turbopuffer-handshake.mdx",
  "oss/handshakes/weaviate-handshake.mdx": "handshakes/weaviate-handshake.mdx",
  // Porters
  "oss/porters/overview.mdx": "porters/overview.mdx",
  "oss/porters/json-porter.mdx": "porters/json-porter.mdx",
  "oss/porters/datasets-porter.mdx": "porters/datasets-porter.mdx",
  // Utils
  "oss/utils/visualizer.mdx": "utils/visualizer.mdx",
  "oss/utils/hubbie.mdx": "utils/hubbie.mdx",
  "oss/utils/logging.mdx": "utils/logging.mdx",
  // Experimental
  "oss/experimental/overview.mdx": "experimental/overview.mdx",
  "oss/experimental/code-chunker.mdx": "experimental/code-chunker.mdx",
  "oss/experimental/chonkie-cli.mdx": "experimental/chonkie-cli.mdx",
  // Changelog
  "oss/changelog.mdx": "changelog.mdx",
};

// Link rewrite map
const LINK_MAP = {
  "/common/welcome": "/docs",
  "/common/concepts": "/docs/concepts",
  "/common/open-source": "/docs/open-source",
  "/oss/quick-start": "/docs/getting-started/quick-start",
  "/oss/installation": "/docs/getting-started/installation",
  "/oss/pipelines": "/docs/getting-started/pipelines",
  "/oss/api/overview": "/docs/api-server/overview",
  "/oss/api/quickstart": "/docs/api-server/quickstart",
  "/oss/api/endpoints": "/docs/api-server/endpoints",
  "/oss/api/pipelines": "/docs/api-server/pipelines",
  "/oss/api/docker": "/docs/api-server/docker",
  "/oss/chefs/overview": "/docs/chefs/overview",
  "/oss/chefs/tablechef": "/docs/chefs/tablechef",
  "/oss/chefs/textchef": "/docs/chefs/textchef",
  "/oss/chefs/markdownchef": "/docs/chefs/markdownchef",
  "/oss/chefs/mistral-ocr": "/docs/chefs/mistral-ocr",
  "/oss/chefs/liteparse": "/docs/chefs/liteparse",
  "/oss/fetchers/overview": "/docs/fetchers/overview",
  "/oss/fetchers/file-fetcher": "/docs/fetchers/file-fetcher",
  "/oss/chunkers/overview": "/docs/chunkers/overview",
  "/oss/chunkers/code-chunker": "/docs/chunkers/code-chunker",
  "/oss/chunkers/fast-chunker": "/docs/chunkers/fast-chunker",
  "/oss/chunkers/late-chunker": "/docs/chunkers/late-chunker",
  "/oss/chunkers/neural-chunker": "/docs/chunkers/neural-chunker",
  "/oss/chunkers/recursive-chunker": "/docs/chunkers/recursive-chunker",
  "/oss/chunkers/semantic-chunker": "/docs/chunkers/semantic-chunker",
  "/oss/chunkers/sentence-chunker": "/docs/chunkers/sentence-chunker",
  "/oss/chunkers/slumber-chunker": "/docs/chunkers/slumber-chunker",
  "/oss/chunkers/table-chunker": "/docs/chunkers/table-chunker",
  "/oss/chunkers/teraflopai-chunker": "/docs/chunkers/teraflopai-chunker",
  "/oss/chunkers/token-chunker": "/docs/chunkers/token-chunker",
  "/oss/embeddings/overview": "/docs/embeddings/overview",
  "/oss/embeddings/auto-embeddings": "/docs/embeddings/auto-embeddings",
  "/oss/embeddings/cohere-embeddings": "/docs/embeddings/cohere-embeddings",
  "/oss/embeddings/sentence-transformer-embeddings": "/docs/embeddings/sentence-transformer-embeddings",
  "/oss/embeddings/openai-embeddings": "/docs/embeddings/openai-embeddings",
  "/oss/embeddings/azure-embeddings": "/docs/embeddings/azure-embeddings",
  "/oss/embeddings/model2vec-embeddings": "/docs/embeddings/model2vec-embeddings",
  "/oss/embeddings/jina-embeddings": "/docs/embeddings/jina-embeddings",
  "/oss/embeddings/gemini-embeddings": "/docs/embeddings/gemini-embeddings",
  "/oss/embeddings/voyageai-embeddings": "/docs/embeddings/voyageai-embeddings",
  "/oss/embeddings/custom-embeddings": "/docs/embeddings/custom-embeddings",
  "/oss/embeddings/litellm-embeddings": "/docs/embeddings/litellm-embeddings",
  "/oss/refinery/overview": "/docs/refinery/overview",
  "/oss/refinery/overlap-refinery": "/docs/refinery/overlap-refinery",
  "/oss/refinery/embeddings-refinery": "/docs/refinery/embeddings-refinery",
  "/oss/handshakes/overview": "/docs/handshakes/overview",
  "/oss/handshakes/chroma-handshake": "/docs/handshakes/chroma-handshake",
  "/oss/handshakes/elastic-handshake": "/docs/handshakes/elastic-handshake",
  "/oss/handshakes/lancedb-handshake": "/docs/handshakes/lancedb-handshake",
  "/oss/handshakes/milvus-handshake": "/docs/handshakes/milvus-handshake",
  "/oss/handshakes/mongodb-handshake": "/docs/handshakes/mongodb-handshake",
  "/oss/handshakes/pgvector-handshake": "/docs/handshakes/pgvector-handshake",
  "/oss/handshakes/pinecone-handshake": "/docs/handshakes/pinecone-handshake",
  "/oss/handshakes/qdrant-handshake": "/docs/handshakes/qdrant-handshake",
  "/oss/handshakes/turbopuffer-handshake": "/docs/handshakes/turbopuffer-handshake",
  "/oss/handshakes/weaviate-handshake": "/docs/handshakes/weaviate-handshake",
  "/oss/porters/overview": "/docs/porters/overview",
  "/oss/porters/json-porter": "/docs/porters/json-porter",
  "/oss/porters/datasets-porter": "/docs/porters/datasets-porter",
  "/oss/utils/visualizer": "/docs/utils/visualizer",
  "/oss/utils/hubbie": "/docs/utils/hubbie",
  "/oss/utils/logging": "/docs/utils/logging",
  "/oss/experimental/overview": "/docs/experimental/overview",
  "/oss/experimental/code-chunker": "/docs/experimental/code-chunker",
  "/oss/experimental/chonkie-cli": "/docs/experimental/chonkie-cli",
  "/oss/changelog": "/docs/changelog",
};

// meta.json definitions for sidebar ordering
const META_FILES = {
  "": {
    title: "Chonkie",
    pages: [
      "index",
      "concepts",
      "open-source",
      "---Getting Started---",
      "getting-started",
      "---API Server---",
      "api-server",
      "---Chefs---",
      "chefs",
      "---Fetchers---",
      "fetchers",
      "---Chunkers---",
      "chunkers",
      "---Embeddings---",
      "embeddings",
      "---Refinery---",
      "refinery",
      "---Handshakes---",
      "handshakes",
      "---Porters---",
      "porters",
      "---Utils---",
      "utils",
      "---Experimental---",
      "experimental",
      "---Changelog---",
      "changelog",
    ],
  },
  "getting-started": {
    title: "Getting Started",
    pages: ["quick-start", "installation", "pipelines"],
  },
  "api-server": {
    title: "API Server",
    pages: ["overview", "quickstart", "endpoints", "pipelines", "docker"],
  },
  chefs: {
    title: "Chefs",
    pages: ["overview", "tablechef", "textchef", "markdownchef", "mistral-ocr", "liteparse"],
  },
  fetchers: {
    title: "Fetchers",
    pages: ["overview", "file-fetcher"],
  },
  chunkers: {
    title: "Chunkers",
    pages: [
      "overview",
      "code-chunker",
      "fast-chunker",
      "late-chunker",
      "neural-chunker",
      "recursive-chunker",
      "semantic-chunker",
      "sentence-chunker",
      "slumber-chunker",
      "table-chunker",
      "teraflopai-chunker",
      "token-chunker",
    ],
  },
  embeddings: {
    title: "Embeddings",
    pages: [
      "overview",
      "auto-embeddings",
      "cohere-embeddings",
      "sentence-transformer-embeddings",
      "openai-embeddings",
      "azure-embeddings",
      "model2vec-embeddings",
      "jina-embeddings",
      "gemini-embeddings",
      "voyageai-embeddings",
      "custom-embeddings",
      "litellm-embeddings",
    ],
  },
  refinery: {
    title: "Refinery",
    pages: ["overview", "overlap-refinery", "embeddings-refinery"],
  },
  handshakes: {
    title: "Handshakes",
    pages: [
      "overview",
      "chroma-handshake",
      "elastic-handshake",
      "lancedb-handshake",
      "milvus-handshake",
      "mongodb-handshake",
      "pgvector-handshake",
      "pinecone-handshake",
      "qdrant-handshake",
      "turbopuffer-handshake",
      "weaviate-handshake",
    ],
  },
  porters: {
    title: "Porters",
    pages: ["overview", "json-porter", "datasets-porter"],
  },
  utils: {
    title: "Utils",
    pages: ["visualizer", "hubbie", "logging"],
  },
  experimental: {
    title: "Experimental",
    pages: ["overview", "code-chunker", "chonkie-cli"],
  },
};

// ─── Transformation Functions ────────────────────────────────────────────────

function parseFrontmatter(content) {
  // Normalize line endings
  content = content.replace(/\r\n/g, "\n");

  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const raw = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const line of raw.split("\n")) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) {
      let val = kv[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      frontmatter[kv[1]] = val;
    }
  }

  return { frontmatter, body };
}

function buildFrontmatter(fm) {
  let out = "---\n";
  if (fm.title) out += `title: "${fm.title.replace(/"/g, '\\"')}"\n`;
  if (fm.description) out += `description: "${fm.description.replace(/"/g, '\\"')}"\n`;
  out += "---\n";
  return out;
}

function transformFrontmatter(content) {
  const { frontmatter, body } = parseFrontmatter(content);
  const newFm = {
    title: frontmatter.title || frontmatter.sidebarTitle || "Untitled",
    description: frontmatter.description || "",
  };
  return buildFrontmatter(newFm) + body;
}

function removeJavaScriptSections(content) {
  // Remove ### JavaScript sections (heading + content until next heading of same or higher level)
  content = content.replace(/^### JavaScript\n[\s\S]*?(?=^#{1,3} [^\n])/gm, "");
  // Handle ### JavaScript at end of file
  content = content.replace(/^### JavaScript\n[\s\S]*$/gm, "");

  // Remove ## JavaScript sections
  content = content.replace(/^## JavaScript\n[\s\S]*?(?=^#{1,2} [^\n])/gm, "");
  // Handle ## JavaScript at end of file
  content = content.replace(/^## JavaScript\n[\s\S]*$/gm, "");

  return content;
}

function removeJavaScriptTabs(content) {
  // Remove <Tab title="JavaScript">...</Tab> blocks (handles multiline)
  content = content.replace(/<Tab title="JavaScript">[\s\S]*?<\/Tab>\n?/g, "");
  // Also remove <Tab title="JS"> variant
  content = content.replace(/<Tab title="JS">[\s\S]*?<\/Tab>\n?/g, "");
  return content;
}

function removeJsCodeGroupBlocks(content) {
  // Remove code blocks labeled with JS-related labels
  // Pattern: ```lang label\n...content...\n``` or ````lang label\n...content...\n````
  const jsLabels = ["npm", "pnpm", "bun", "yarn", "JavaScript", "javascript", "js", "typescript"];

  for (const label of jsLabels) {
    // Match ```bash label\n...\n``` (3 or 4 backticks)
    const escaped = escapeRegex(label);
    const pattern = new RegExp(
      "````?\\w+\\s+" + escaped + "\\n[\\s\\S]*?````?\\n*",
      "g"
    );
    content = content.replace(pattern, "");
  }

  // Also remove standalone ```javascript or ```js blocks (without label)
  content = content.replace(/```(?:javascript|js|typescript)\n[\s\S]*?```\n*/g, "");

  return content;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function transformCodeGroup(content) {
  // Find <CodeGroup>...</CodeGroup> blocks
  content = content.replace(/<CodeGroup>\s*\n([\s\S]*?)<\/CodeGroup>/g, (match, inner) => {
    // Extract code blocks with their metadata
    const tabs = [];
    const tabRegex = /```(\w+)\s*(.*?)\n([\s\S]*?)```/g;
    let m;
    while ((m = tabRegex.exec(inner)) !== null) {
      const lang = m[1];
      const label = m[2].trim() || lang;
      const code = m[3];
      tabs.push({ label, lang, code });
    }

    if (tabs.length === 0) return "";
    if (tabs.length === 1) {
      return "```" + tabs[0].lang + "\n" + tabs[0].code + "```\n";
    }

    const items = tabs.map(t => t.label).join('", "');
    let result = `<Tabs items={["${items}"]}>\n`;
    for (const tab of tabs) {
      result += `<Tab value="${tab.label}">\n`;
      result += "```" + tab.lang + "\n" + tab.code + "```\n";
      result += "</Tab>\n";
    }
    result += "</Tabs>\n";
    return result;
  });

  return content;
}

function transformTabs(content) {
  // Transform <Tabs>\n<Tab title="...">...</Tab>\n</Tabs> to Fumadocs format
  content = content.replace(/<Tabs>\s*\n([\s\S]*?)<\/Tabs>/g, (match, inner) => {
    const tabTitles = [];
    const tabContents = [];

    const tabRegex = /<Tab title="([^"]*)">\s*\n([\s\S]*?)<\/Tab>/g;
    let m;
    while ((m = tabRegex.exec(inner)) !== null) {
      tabTitles.push(m[1]);
      tabContents.push(m[2]);
    }

    if (tabTitles.length === 0) return match;

    // If only one tab remains (e.g., after JS removal), unwrap it
    if (tabTitles.length === 1) {
      return tabContents[0];
    }

    const items = tabTitles.map(t => `"${t}"`).join(", ");
    let result = `<Tabs items={[${items}]}>\n`;
    for (let i = 0; i < tabTitles.length; i++) {
      result += `<Tab value="${tabTitles[i]}">\n${tabContents[i]}</Tab>\n`;
    }
    result += "</Tabs>\n";
    return result;
  });

  return content;
}

function transformCallouts(content) {
  // <Note> -> <Callout type="info">
  content = content.replace(/<Note>/g, '<Callout type="info">');
  content = content.replace(/<\/Note>/g, "</Callout>");

  // <Warning> -> <Callout type="warn">
  content = content.replace(/<Warning>/g, '<Callout type="warn">');
  content = content.replace(/<\/Warning>/g, "</Callout>");

  // <Tip> -> <Callout type="info">
  content = content.replace(/<Tip>/g, '<Callout type="info">');
  content = content.replace(/<\/Tip>/g, "</Callout>");

  // <Info> -> <Callout type="info">
  content = content.replace(/<Info>/g, '<Callout type="info">');
  content = content.replace(/<\/Info>/g, "</Callout>");

  return content;
}

function transformCards(content) {
  // <CardGroup cols={...}> -> <Cards>
  content = content.replace(/<CardGroup[^>]*>/g, "<Cards>");
  content = content.replace(/<\/CardGroup>/g, "</Cards>");

  // <Card title="..." icon="..." href="..."> -> <Card title="..." href="...">
  content = content.replace(/<Card\s+([^>]*)>/g, (match, attrs) => {
    const titleMatch = attrs.match(/title="([^"]*)"/);
    const hrefMatch = attrs.match(/href="([^"]*)"/);

    let newAttrs = "";
    if (titleMatch) newAttrs += ` title="${titleMatch[1]}"`;
    if (hrefMatch) newAttrs += ` href="${hrefMatch[1]}"`;

    return `<Card${newAttrs}>`;
  });

  return content;
}

function transformAccordions(content) {
  // <AccordionGroup> -> <Accordions>
  content = content.replace(/<AccordionGroup>/g, "<Accordions>");
  content = content.replace(/<\/AccordionGroup>/g, "</Accordions>");

  return content;
}

function transformBanner(content) {
  // <Banner title="..." href="...">content</Banner> -> <Callout type="info">content</Callout>
  content = content.replace(/<Banner[^>]*>([\s\S]*?)<\/Banner>/g, '<Callout type="info">$1</Callout>');
  return content;
}

function transformIcons(content) {
  // Replace <Icon icon="check" color="#005c00" iconType="solid" /> with ✓
  content = content.replace(/<Icon\s+icon="check"[^/]*\/>/g, "✓");
  // Replace <Icon icon="x" color="#ff0000" iconType="solid" /> with ✗
  content = content.replace(/<Icon\s+icon="x"[^/]*\/>/g, "✗");
  return content;
}

function removeNoZoom(content) {
  content = content.replace(/\s*noZoom/g, "");
  return content;
}

function rewriteLinks(content) {
  // Rewrite internal links from Mintlify paths to Fumadocs routes
  for (const [from, to] of Object.entries(LINK_MAP)) {
    // Match markdown links [text](path) and href="path"
    const escaped = escapeRegex(from);
    content = content.replace(new RegExp(`\\]\\(${escaped}\\)`, "g"), `](${to})`);
    content = content.replace(new RegExp(`href="${escaped}"`, "g"), `href="${to}"`);
  }
  return content;
}

function cleanupEmptyLines(content) {
  // Remove excessive blank lines (more than 2 consecutive)
  content = content.replace(/\n{4,}/g, "\n\n\n");
  return content;
}

// ─── Main Migration ──────────────────────────────────────────────────────────

function migrateFile(sourcePath, destPath) {
  const fullSource = join(SOURCE_DIR, sourcePath);
  const fullDest = join(OUTPUT_DIR, destPath);

  if (!existsSync(fullSource)) {
    console.warn(`  SKIP (not found): ${sourcePath}`);
    return;
  }

  let content = readFileSync(fullSource, "utf-8");

  // Normalize line endings first
  content = content.replace(/\r\n/g, "\n");

  // Step 1: Transform frontmatter
  content = transformFrontmatter(content);

  // Step 2: Remove JavaScript content
  content = removeJavaScriptSections(content);
  content = removeJavaScriptTabs(content);
  content = removeJsCodeGroupBlocks(content);

  // Step 3: Transform components
  content = transformCodeGroup(content);
  content = transformTabs(content);
  content = transformCallouts(content);
  content = transformCards(content);
  content = transformAccordions(content);
  content = transformBanner(content);
  content = transformIcons(content);
  content = removeNoZoom(content);

  // Step 4: Rewrite links
  content = rewriteLinks(content);

  // Step 5: Cleanup
  content = cleanupEmptyLines(content);

  // Write output
  const dir = dirname(fullDest);
  mkdirSync(dir, { recursive: true });
  writeFileSync(fullDest, content, "utf-8");
  console.log(`  OK: ${sourcePath} -> ${destPath}`);
}

function writeMetaFiles() {
  for (const [dir, meta] of Object.entries(META_FILES)) {
    const fullPath = join(OUTPUT_DIR, dir, "meta.json");
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, JSON.stringify(meta, null, 2) + "\n", "utf-8");
    console.log(`  META: ${dir || "root"}/meta.json`);
  }
}

// ─── Execute ─────────────────────────────────────────────────────────────────

console.log("Migrating Chonkie docs from Mintlify to Fumadocs...\n");
console.log(`Source: ${SOURCE_DIR}`);
console.log(`Output: ${OUTPUT_DIR}\n`);

console.log("--- Migrating files ---");
for (const [src, dest] of Object.entries(FILE_MAP)) {
  migrateFile(src, dest);
}

console.log("\n--- Writing meta.json files ---");
writeMetaFiles();

console.log("\nDone! Run 'pnpm dev' to preview.");
