# Examples

This directory contains example scripts demonstrating Foxr functionality.

## test-chrome-context.js

Demonstrates how to use the Chrome context in Firefox to access internal Firefox APIs like `Services.appinfo.version`.

### Usage

```bash
# First, build the project
yarn start build

# Then run the example (uses /usr/bin/firefox by default)
node examples/test-chrome-context.js

# Or specify a custom Firefox path via environment variable
FIREFOX_PATH=/path/to/firefox node examples/test-chrome-context.js
```

This example shows:
- Launching Firefox with the `-remote-allow-system-access` flag (automatically added in v0.10.2+)
- Setting the context to Chrome
- Accessing `Services.appinfo.version` from the Firefox chrome context
- Resetting the context back to content
- Verifying content context still works

### Requirements

- Firefox must be installed on your system
- By default, the script looks for Firefox at `/usr/bin/firefox`
- You can override this by setting the `FIREFOX_PATH` or `FIREFOX_BIN` environment variable
