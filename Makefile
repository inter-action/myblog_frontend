
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: 

lint:
	eslint src
	eslint -c build-scripts/.eslintrc.json build-scripts

test:
	NODE_ENV=test ava


clean: 
	rm -rf build/*
	mkdir -p build


dev:
	webpack-dev-server --config webpack.config.dev.js

# BABEL_ENV=production, shall babel_env missing, node_env should be refered.
prod: clean
	NODE_ENV=production webpack --config webpack.config.prod.js
	
# https://www.npmjs.com/package/http-server
serve_prod:
	http-server ./build -p 8081

prettier:
	prettier "{src,__{tests,mocks}__}/**/*.js" --write
	prettier "{src,__{tests,mocks}__}/**/*.scss" --write
