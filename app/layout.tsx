import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.chonkie.ai"),
  title: "Chonkie Documentation",
  description:
    "The lightweight ingestion library for fast, efficient and robust RAG pipelines",
  icons: {
    icon: "https://www.chonkie.ai/chonkies/chonkie_icon.svg",
  },
  openGraph: {
    title: "Chonkie Documentation",
    description:
      "The lightweight ingestion library for fast, efficient and robust RAG pipelines",
    siteName: "Chonkie",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider search={{ options: { type: "static" } }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
