# sudachi nodejs binding

## todo

- improve build time on CI
- explore wasm binding (and run it on browser)

## example

```js
const { SudachiJs } = require("./index.js");
const sudachi = SudachiJs.create(
  "../sudachi/dist/resources/sudachi.json",
  "../sudachi/dist/resources",
  "../sudachi/dist/resources/system.dic"
);
console.log(sudachi.run("仮想通貨の確定申告もこれで安心"));
// [
//   {
//     surface: '仮想',
//     partOfSpeech: [ '名詞', '普通名詞', 'サ変可能', '*', '*', '*' ],
//     normalizedForm: '仮想'
//   },
//   {
//     surface: '通貨',
//     partOfSpeech: [ '名詞', '普通名詞', '一般', '*', '*', '*' ],
//     normalizedForm: '通貨'
//   },
//   {
//     surface: 'の',
//     partOfSpeech: [ '助詞', '格助詞', '*', '*', '*', '*' ],
//     normalizedForm: 'の'
//   },
//   {
//     surface: '確定',
//     partOfSpeech: [ '名詞', '普通名詞', 'サ変可能', '*', '*', '*' ],
//     normalizedForm: '確定'
//   },
//   {
//     surface: '申告',
//     partOfSpeech: [ '名詞', '普通名詞', 'サ変可能', '*', '*', '*' ],
//     normalizedForm: '申告'
//   },
//   {
//     surface: 'も',
//     partOfSpeech: [ '助詞', '係助詞', '*', '*', '*', '*' ],
//     normalizedForm: 'も'
//   },
//   {
//     surface: 'これ',
//     partOfSpeech: [ '代名詞', '*', '*', '*', '*', '*' ],
//     normalizedForm: '此れ'
//   },
//   {
//     surface: 'で',
//     partOfSpeech: [ '助詞', '格助詞', '*', '*', '*', '*' ],
//     normalizedForm: 'で'
//   },
//   {
//     surface: '安心',
//     partOfSpeech: [ '名詞', '普通名詞', 'サ変形状詞可能', '*', '*', '*' ],
//     normalizedForm: '安心'
//   }
// ]
```

## references

- https://github.com/napi-rs/napi-rs
