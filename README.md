# japanese-line-break-segmenter

Segment Japanese sentence into chunks where line-break is appropriate.
Inspired by [Budou](https://github.com/google/budou).
Using [sudachi.rs](https://github.com/WorksApplications/sudachi.rs).

```sh
# development
pnpm i
npm run sudachi:build
npm run dev

# deploy
vercel --version # Vercel CLI 25.2.3
vercel projects add line-break-segmenter-hiro18181
vercel link -p line-break-segmenter-hiro18181
npm run build
npm run deploy:production

# examples
curl http://localhost:3333/api/segment --data-binary 'テクノロジーの力であらゆる投資判断を支援する'
curl https://line-break-segmenter-hiro18181.vercel.app/api/segment --data-binary 'テクノロジーの力であらゆる投資判断を支援する'
```

## todo

- [ ] port segmenter https://github.com/hi-ogawa/mecab-segmenter/blob/master/src/segmenter.py
- [ ] frontend for demo
- [ ] ci
