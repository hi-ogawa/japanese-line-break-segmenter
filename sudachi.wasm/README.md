# sudachi wasm binding

```sh
# build
npm i
npm run dev
SUDACHI_WASM_EMBED_DICTIONARY=../../sudachi.rs/resources/system.dic npm run dev:embed

# example
node example.js テクノロジーの力であらゆる投資判断を支援する # throws without "embed_dictionary" feature
node example.js テクノロジーの力であらゆる投資判断を支援する ../sudachi.rs/resources/system.dic
```

<details>

<summary>example output</summary>

```json
[
  {
    "surface": "テクノロジー",
    "part_of_speech": ["名詞", "普通名詞", "一般", "*", "*", "*"],
    "normalized_form": "テクノロジー"
  },
  {
    "surface": "の",
    "part_of_speech": ["助詞", "格助詞", "*", "*", "*", "*"],
    "normalized_form": "の"
  },
  {
    "surface": "力",
    "part_of_speech": ["名詞", "普通名詞", "一般", "*", "*", "*"],
    "normalized_form": "力"
  },
  {
    "surface": "で",
    "part_of_speech": ["助詞", "格助詞", "*", "*", "*", "*"],
    "normalized_form": "で"
  },
  {
    "surface": "あらゆる",
    "part_of_speech": ["連体詞", "*", "*", "*", "*", "*"],
    "normalized_form": "あらゆる"
  },
  {
    "surface": "投資",
    "part_of_speech": ["名詞", "普通名詞", "サ変可能", "*", "*", "*"],
    "normalized_form": "投資"
  },
  {
    "surface": "判断",
    "part_of_speech": ["名詞", "普通名詞", "サ変可能", "*", "*", "*"],
    "normalized_form": "判断"
  },
  {
    "surface": "を",
    "part_of_speech": ["助詞", "格助詞", "*", "*", "*", "*"],
    "normalized_form": "を"
  },
  {
    "surface": "支援",
    "part_of_speech": ["名詞", "普通名詞", "サ変可能", "*", "*", "*"],
    "normalized_form": "支援"
  },
  {
    "surface": "する",
    "part_of_speech": [
      "動詞",
      "非自立可能",
      "*",
      "*",
      "サ行変格",
      "終止形-一般"
    ],
    "normalized_form": "為る"
  }
]
```

</details>

## references

- https://rustwasm.github.io/wasm-bindgen/examples/without-a-bundler.html
- https://rustwasm.github.io/wasm-pack/book/quickstart.html
