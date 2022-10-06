import * as fs from "node:fs";
import { initSync, Tokenizer } from "./sudachi_wasm.js";

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("usage: node example.js <japanese-sentence>");
    process.exit(1);
  }

  // compile wasm
  const wasmSource = await fs.promises.readFile("./sudachi_wasm_bg.wasm");
  const wasmModule = await WebAssembly.compile(wasmSource);

  // initialize wasm
  initSync(wasmModule);

  // tokenize
  const tokenizer = Tokenizer.create();
  const morphemes = tokenizer.run(input, "C");
  console.log(morphemes);
}

main();
