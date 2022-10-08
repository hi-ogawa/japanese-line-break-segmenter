import * as fs from "node:fs";
import { initSync, Tokenizer } from "./sudachi_wasm.js";

async function main() {
  const [input, dictionaryPath] = process.argv.slice(2);
  if (!input) {
    console.error(
      "usage: node example.js <japanese-sentence> (<dictionary-file>)"
    );
    process.exit(1);
  }

  // compile wasm
  const wasmSource = await fs.promises.readFile("./sudachi_wasm_bg.wasm");
  const wasmModule = await WebAssembly.compile(wasmSource);

  // initialize wasm
  initSync(wasmModule);

  // load dictionary if given
  let dictionary = undefined;
  if (dictionaryPath) {
    dictionary = new Uint8Array(await fs.promises.readFile(dictionaryPath));
  }

  // tokenize
  const tokenizer = Tokenizer.create(dictionary);
  const morphemes = tokenizer.run(input, "C");
  console.log(JSON.stringify(morphemes, null, 2));
}

main();
