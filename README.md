# AI Domain Data Validate (GitHub Action)

Validate a `domain-profile.json` file against the AI Domain Data Standard v0.1 using the `aidd` CLI. Fails the workflow if the file is missing or invalid.

## Usage

```yaml
name: Validate AI Domain Data

on:
  push:
    branches: [main]
  pull_request:

jobs:
  validate-ai-domain-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate domain-profile.json
        uses: ai-domain-data/ai-domain-data-validate-action@v0.1.0
        with:
          path: domain-profile.json
```

The action installs the latest `@ai-domain-data/cli` package at runtime and executes:

```
npx @ai-domain-data/cli aidd validate --path=<path>
```

## Inputs

| Name | Description | Default |
| --- | --- | --- |
| `path` | Path to the `domain-profile.json` file to validate. Relative to the repository root. | `domain-profile.json` |

## Outputs

No outputs. The action exits non-zero if validation fails. CLI errors are printed in the workflow logs.

## Requirements

- Node.js 20+ runner (the action uses the Node 20 runtime).
- Internet access to install `@ai-domain-data/cli` from npm.

## License

MIT © Dylan Larson

