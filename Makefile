# auto generate phony targets
.PHONY: $(shell grep --no-filename -E '^([a-zA-Z_-]|/)+:' $(MAKEFILE_LIST) | sed 's/:.*//')

clean:
	rm -rf dist .vercel/output

vercel-copy-files:
	mkdir -p .vercel/output/functions/index.func/sudachi.js
	cp -f sudachi.js/resources.tar.gz .vercel/output/functions/index.func/sudachi.js
	mkdir -p .vercel/output/functions/index.func/node_modules/@hiogawa/sudachi.js
	cp -f node_modules/@hiogawa/sudachi.js/{package.json,index.js,index.linux-x64-gnu.node} .vercel/output/functions/index.func/node_modules/@hiogawa/sudachi.js
	cp -f misc/vercel/config.json .vercel/output/config.json
	cp -f misc/vercel/.vc-config.json .vercel/output/functions/index.func/.vc-config.json
