import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <img src="/icon.svg" alt="Chonkie" width={24} height={24} />
        <span>Chonkie</span>
      </>
    ),
  },
  githubUrl: "https://github.com/chonkie-inc/chonkie",
  links: [
    {
      text: "Discord",
      url: "https://discord.gg/Q6zkP8w6ur",
    },
  ],
};
