LEARN_MAIN_TS := $(sort $(wildcard learn/*/main.ts))

TS_SOURCES := \
	code-types.ts \
	top-actions.ts \
	learn/learn-shared.ts \
	$(LEARN_MAIN_TS)

GENERATED_JS := \
	code-types.js \
	top-actions.js \
	learn/learn-shared.js \
	$(LEARN_MAIN_TS:.ts=.js)

CLEAN_FILES := $(GENERATED_JS) *.tsbuildinfo

LEARN_TEMPLATE := learn/chapter-template.html
LEARN_TEMPLATE_GENERATOR := learn/generate-chapter-indexes.js

TSC_BIN := node_modules/.bin/tsc
TSC := $(TSC_BIN)
TSC_FLAGS := --target ES2020 --lib DOM,ES2020 --module none --pretty false --skipLibCheck --noEmitOnError

.PHONY: build compile-ts generate-learn-html deps clean

build: generate-learn-html compile-ts

compile-ts: $(TSC_BIN)
	$(TSC) $(TSC_FLAGS) $(TS_SOURCES)

generate-learn-html: $(LEARN_TEMPLATE_GENERATOR) $(LEARN_TEMPLATE)
	node $(LEARN_TEMPLATE_GENERATOR)

deps: $(TSC_BIN)

$(TSC_BIN): package-lock.json
	npm ci

clean:
	rm -f $(CLEAN_FILES)
