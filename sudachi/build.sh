#!/bin/bash
set -eu -o pipefail

cd "$(dirname "$0")" > /dev/null

docker-compose build bundler
docker-compose run --rm -T bundler tar -czvf - dist > dist.tar.gz
