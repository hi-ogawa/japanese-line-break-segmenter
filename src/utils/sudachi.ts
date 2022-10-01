import child_process from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import tar from "tar";
import { tinyassert } from "./tinyassert";
import type { Token } from "./types";

//
// prepare sudachi cli
//

const SRC_PATH = path.resolve(process.cwd(), "sudachi/dist.tar.gz");
const DIST_PATH = path.resolve(
  process.env["VERCEL"] ? os.tmpdir() : process.cwd(),
  "sudachi/dist"
);
const SUDACHI_COMMAND = `${DIST_PATH}/sudachi-wrapper.sh`;

export async function setup() {
  if (!fs.existsSync(DIST_PATH)) {
    const cwd = path.resolve(DIST_PATH, "..");
    await fs.promises.mkdir(cwd, { recursive: true });
    await tar.x({
      file: SRC_PATH,
      C: cwd,
    });
  }
}

//
// sudachi cli wrapper (TODO: to save resouce, reuse single sudachi process cf. https://github.com/hi-ogawa/mecab-segmenter/pull/2)
//

export async function run(source: string): Promise<Token[]> {
  const { stdout } = await execCommand(SUDACHI_COMMAND, source);
  const lines = stdout.split("\n").slice(0, -2);
  return lines.map((line) => {
    const [text, rawTags] = line.split("\t");
    tinyassert(text);
    tinyassert(rawTags);
    const tags = rawTags.split(",");
    const [pos] = tags;
    tinyassert(pos);
    return {
      text,
      pos,
      tags,
    };
  });
}

//
// utils
//

async function execCommand(
  command: string,
  stdin: string
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const proc = child_process.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
    if (!proc.stdin) {
      reject(new Error("stdin not available"));
      return;
    }
    Readable.from(stdin).pipe(proc.stdin);
  });
}
