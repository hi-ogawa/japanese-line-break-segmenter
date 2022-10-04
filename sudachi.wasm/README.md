# sudachi wasm binding

- build

```sh
npm i
npm run build
```

- example

```js
const wasmSource = await fs.promises.readFile("./pkg/sudachi_wasm_bg.wasm");
const wasm = await WebAssembly.compile(wasmSource);
const instance = await WebAssembly.instantiate(wasm, { wbg: {} });
console.log(instance.exports.add(1, 2));
```

## references

- https://rustwasm.github.io/wasm-bindgen/examples/without-a-bundler.html
- https://rustwasm.github.io/wasm-pack/book/quickstart.html
