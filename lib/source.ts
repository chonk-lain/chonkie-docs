import { loader } from "fumadocs-core/source";
import { docs } from "collections/server";
import { docs as chonkiejsDocs } from "collections/chonkiejs/server";
import { icons } from "lucide-react";
import { createElement } from "react";

export const source = loader(
  {
    chonkie: docs.toFumadocsSource({ baseDir: "chonkie" }),
    chonkiejs: chonkiejsDocs.toFumadocsSource({ baseDir: "chonkiejs" }),
  },
  {
    baseUrl: "/docs",
    icon(icon) {
      if (icon && icon in icons)
        return createElement(icons[icon as keyof typeof icons]);
    },
  },
);
