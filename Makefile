TS_SOURCES := \
	code-types.ts \
	top-actions.ts \
	learn/learn-shared.ts \
	learn/overview/overview.ts \
	learn/tensors/tensors.ts \
	learn/forward-line/forward-line.ts \
	learn/learning-line/learning-line.ts \
	learn/learning-quad/learning-quad.ts

GENERATED_JS := \
	code-types.js \
	top-actions.js \
	learn/learn-shared.js \
	learn/overview/overview.js \
	learn/tensors/tensors.js \
	learn/forward-line/forward-line.js \
	learn/learning-line/learning-line.js \
	learn/learning-quad/learning-quad.js

CLEAN_FILES := $(GENERATED_JS) *.tsbuildinfo

TSC_BIN := node_modules/.bin/tsc
TSC := $(TSC_BIN)
TSC_FLAGS := --target ES2020 --lib DOM,ES2020 --module none --pretty false --skipLibCheck --noEmitOnError

.PHONY: build compile-ts deps clean

build: compile-ts

compile-ts: $(TSC_BIN)
	$(TSC) $(TSC_FLAGS) $(TS_SOURCES)

deps: $(TSC_BIN)

$(TSC_BIN): package-lock.json
	npm ci

clean:
	rm -f $(CLEAN_FILES)
