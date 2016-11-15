.DEFAULT_GOAL := build

test: unit jest
	
unit:
	mocha --compilers js:babel-core/register tests/

jest:
	./node_modules/jest/bin/jest.js 

build:
	# Just compile ES6
	babel es6 -d es5

pushversion:
	git add --all
	git commit -m "Build version $(VERSION)"
	git tag $(VERSION)
	git push
	git push --tags

deploy: build pushversion
