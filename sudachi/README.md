# sudachi bundle

since vercel/lambda has a limit of 50MB, we need to compress everything together.

```sh
# build
docker-compose run --rm -T bundler tar -czvf - dist > dist.tar.gz

# extract
tar -xvzf dist.tar.gz

# run
echo "テクノロジーの力であらゆる投資判断を支援する" | ./dist/sudachi-wrapper.sh
テクノロジー    名詞,普通名詞,一般,*,*,*        テクノロジー
の      助詞,格助詞,*,*,*,*     の
力      名詞,普通名詞,一般,*,*,*        力
で      助詞,格助詞,*,*,*,*     で
あらゆる        連体詞,*,*,*,*,*        あらゆる
投資    名詞,普通名詞,サ変可能,*,*,*    投資
判断    名詞,普通名詞,サ変可能,*,*,*    判断
を      助詞,格助詞,*,*,*,*     を
支援    名詞,普通名詞,サ変可能,*,*,*    支援
する    動詞,非自立可能,*,*,サ行変格,終止形-一般        為る
EOS
```


## references

- https://github.com/WorksApplications/sudachi.rs
- https://github.com/emk/rust-musl-builder
- https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#function-configuration-deployment-and-execution
