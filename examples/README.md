# Examples

This directory contains example scripts demonstrating Foxr functionality.

## test-chrome-context.js

Demonstrates how to use the Chrome context in Firefox to access internal Firefox APIs like `Services.appinfo.version`.

### Usage

```bash
# First, build the project
yarn start build

# Then run the example
node examples/test-chrome-context.js
```

This example shows:
- Launching Firefox with the `-remote-allow-system-access` flag (automatically added in v0.10.2+)
- Setting the context to Chrome
- Accessing `Services.appinfo.version` from the Firefox chrome context
- Resetting the context back to content
- Verifying content context still works

### Requirements

- Firefox must be installed on your system
- Update the `executablePath` in the script to point to your Firefox binary
