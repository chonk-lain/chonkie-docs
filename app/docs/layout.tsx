import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import type { LayoutTab } from "fumadocs-ui/layouts/shared";

const tabs: LayoutTab[] = [
  {
    title: "Chonkie",
    url: "/docs/chonkie/common",
    icon: (
      <img
        src="https://www.chonkie.ai/chonkies/chonkie_icon.svg"
        alt=""
        width={20}
        height={20}
      />
    ),
  },
  {
    title: "Chonkie (Python)",
    url: "/docs/chonkie/oss",
    icon: (
      <img
        src="https://www.chonkie.ai/chonkies/chonkie_icon.svg"
        alt=""
        width={20}
        height={20}
      />
    ),
  },
  {
    title: "ChonkieJS",
    url: "/docs/chonkiejs",
    icon: (
      <div className="relative">
        <img
          src="https://www.chonkie.ai/chonkies/chonkie_icon.svg"
          alt=""
          width={20}
          height={20}
        />
        <span className="absolute -bottom-0.5 -right-1 text-[8px] font-bold leading-none bg-fd-primary text-fd-primary-foreground rounded px-0.5">
          JS
        </span>
      </div>
    ),
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} tabs={tabs} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
