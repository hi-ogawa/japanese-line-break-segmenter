import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { MorphemeJs, SudachiJs } from "@hiogawa/sudachi.js";
import tar from "tar";
import { tinyassert } from "./tinyassert";
import type { Token } from "./types";

const RESOURCES_TAR_PATH = path.resolve(
  process.cwd(),
  "sudachi.js/resources.tar.gz"
);
const RESOURCES_PATH = path.resolve(
  process.env["VERCEL"] ? os.tmpdir() : process.cwd(),
  "sudachi.js/resources"
);

let sudachi: SudachiJs | undefined = undefined;

export async function getSudachi(): Promise<SudachiJs> {
  if (!fs.existsSync(RESOURCES_PATH)) {
    const cwd = path.resolve(RESOURCES_PATH, "..");
    await fs.promises.mkdir(cwd, { recursive: true });
    await tar.x({
      file: RESOURCES_TAR_PATH,
      C: cwd,
    });
  }
  sudachi ??= SudachiJs.create(
    RESOURCES_PATH + "/sudachi.json",
    RESOURCES_PATH,
    RESOURCES_PATH + "/system.dic"
  );
  return sudachi;
}

export async function run(source: string): Promise<MorphemeJs[]> {
  const sudachi = await getSudachi();
  return sudachi.run(source);
}

export function morphmeToToken(m: MorphemeJs): Token {
  const tags = m.partOfSpeech;
  const pos = tags[0];
  tinyassert(pos);
  return {
    text: m.surface,
    pos,
    tags,
  };
}
