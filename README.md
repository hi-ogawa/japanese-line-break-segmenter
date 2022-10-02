# japanese-line-break-segmenter

Segment Japanese sentences into chunks where line-break is appropriate. \
[sudachi.rs](https://github.com/WorksApplications/sudachi.rs) is used to analyze sentences (nodejs binding is found in [`sudachi.js`](https://github.com/hi-ogawa/japanese-line-break-segmenter/blob/master/sudachi.js/README.md)). \
Inspired by [Budou](https://github.com/google/budou).

![image](https://user-images.githubusercontent.com/4232207/193416298-6ae52988-d8e4-4616-a75e-8ee0be9a1f2a.png)

```sh
# development
npm -C sudachi.js run build # TODO: pre-build or publish since this is too slow initially
pnpm i
npm run dev

# deploy
vercel --version # Vercel CLI 25.2.3
vercel projects add line-break-segmenter-hiro18181
vercel link -p line-break-segmenter-hiro18181
npm run build
npm run deploy:production

# api example
curl https://line-break-segmenter-hiro18181.vercel.app/api/segment --data-binary 'テクノロジーの力であらゆる投資判断を支援する' | jq -r '.text'
テクノロジーの
力で
あらゆる投資判断を
支援
する
```
