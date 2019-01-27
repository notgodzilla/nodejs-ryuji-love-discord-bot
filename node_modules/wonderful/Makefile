WORDS=$(shell cat words.txt | sed 's/^.*$$/"&",/g')

.PHONY: build
build: build-js build-python

# All the different languages are below:

.PHONY: build-js
build-js:
	cat index.tmpl.js | sed 's/%WORDS%/$(WORDS)/' > index.js

.PHONY: build-python
build-python:
	mkdir -p wonderful/
	cat init.tmpl.py | sed 's/%WORDS%/$(WORDS)/' > wonderful/__init__.py
