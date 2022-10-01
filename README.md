# japanese-line-break-segmenter

Segment Japanese sentences into chunks where line-break is appropriate.
[sudachi.rs](https://github.com/WorksApplications/sudachi.rs) is used to analyze sentences.
Inspired by [Budou](https://github.com/google/budou).

```sh
# development
pnpm i
make sudachi
npm run dev

# deploy
vercel --version # Vercel CLI 25.2.3
vercel projects add line-break-segmenter-hiro18181
vercel link -p line-break-segmenter-hiro18181
npm run build
npm run deploy:production

# example
curl https://line-break-segmenter-hiro18181.vercel.app/api/segment --data-binary 'テクノロジーの力であらゆる投資判断を支援する' | jq -r '.text'
テクノロジーの
力で
あらゆる投資判断を
支援
する
```
