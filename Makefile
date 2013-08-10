build:
	@make install
	@component build --dev
	@component build --standalone sgHasKey --name sgHasKey --out test

install:
	@component install --dev > /dev/null

test:
	@make build
	@open test/test.html

.PHONY: build install test