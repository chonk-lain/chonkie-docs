import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import { notFound, redirect } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    redirect("/docs/chonkie/common/welcome");
  }

  const slug = params.slug.join("/");
  if (slug === "chonkie/common") redirect("/docs/chonkie/common/welcome");
  if (slug === "chonkie/oss") redirect("/docs/chonkie/oss/quick-start");

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["chonkie", "common"] },
    { slug: ["chonkie", "oss"] },
    ...source.generateParams(),
  ];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  if (!params.slug || params.slug.length === 0) {
    return { title: "Documentation", description: "Chonkie Documentation" };
  }
  const page = source.getPage(params.slug);
  if (!page) notFound();
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
