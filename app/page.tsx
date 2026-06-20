import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <img
        src="https://raw.githubusercontent.com/chonkie-inc/chonkie/main/docs/assets/logo/chonkie_logo_br_transparent_bg.png"
        alt="Chonkie"
        width={400}
        className="mb-8"
      />
      <p className="text-lg text-fd-muted-foreground mb-6">
        The lightweight ingestion library for fast, efficient and robust RAG
        pipelines
      </p>
      <Link
        href="/docs"
        className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
      >
        Get Started
      </Link>
    </main>
  );
}
