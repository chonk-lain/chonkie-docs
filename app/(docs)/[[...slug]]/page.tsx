import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { redirect } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { PYTHON_INSTALLATION } from "@/lib/constants";

function shouldRedirectToInstallation(slug: string): boolean {
  if (slug === "overview" || slug.startsWith("overview/")) return true;
  if (slug.startsWith("chonkie/common")) return true;
  return false;
}

function resolveLegacyPythonPath(slug: string): string | null {
  if (slug === "chonkie/oss") return PYTHON_INSTALLATION;
  if (slug.startsWith("chonkie/oss/")) {
    return `/python/${slug.slice("chonkie/oss/".length)}`;
  }
  return null;
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    redirect(PYTHON_INSTALLATION);
  }

  const slug = params.slug.join("/");

  if (shouldRedirectToInstallation(slug)) {
    redirect(PYTHON_INSTALLATION);
  }

  const legacyPython = resolveLegacyPythonPath(slug);
  if (legacyPython) redirect(legacyPython);

  if (slug === "python") redirect(PYTHON_INSTALLATION);

  const page = source.getPage(params.slug);
  if (!page) redirect(PYTHON_INSTALLATION);

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      className="!max-w-none w-full md:!px-5 xl:!px-6"
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return [{ slug: [] }, { slug: ["python"] }, ...source.generateParams()];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  if (!params.slug || params.slug.length === 0) {
    return { title: "Documentation", description: "Chonkie Documentation" };
  }

  const slug = params.slug.join("/");
  if (shouldRedirectToInstallation(slug)) {
    redirect(PYTHON_INSTALLATION);
  }

  const page = source.getPage(params.slug);
  if (!page) redirect(PYTHON_INSTALLATION);

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      siteName: "Chonkie",
    },
  };
}
