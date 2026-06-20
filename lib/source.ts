import { loader } from "fumadocs-core/source";
import { docs } from "collections/server";
import { docs as chonkiejsDocs } from "collections/chonkiejs/server";

export const source = loader(
  {
    chonkie: docs.toFumadocsSource({ baseDir: "chonkie" }),
    chonkiejs: chonkiejsDocs.toFumadocsSource({ baseDir: "chonkiejs" }),
  },
  {
    baseUrl: "/docs",
  },
);
