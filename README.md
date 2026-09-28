# AgentOS

Static portfolio prototype for an AI-assisted micro-retail operating workspace.

## Current scope

The included prototype demonstrates a small retail business scenario: **沐光手作小舖 / Muguang Handmade Shop**. It is a local HTML/CSS/JavaScript demo with fixed fixtures and simulated AI interactions. It does not connect to live LLMs, Instagram, LINE, spreadsheets, or external business systems.

## Repository layout

```text
prototype/          Static GitHub Pages site
  css/              Existing styles plus future style modules
  js/               Existing UI/runtime plus future feature modules
  fixtures/         Fixed demo data, copy and business contracts
  ai/               AI solution-design contracts (not live AI)
  tests/            Runnable smoke test
  assets/           Reserved for local visual assets
docs/               Product and implementation documentation
.github/workflows/  GitHub Pages deployment workflow
```

### Active source versus reserved modules

The working prototype is intentionally preserved inside `prototype/` without changing its runtime files:

- Active today: `css/styles.css`, `css/corrections.css`, `css/vnext.css`, `css/v3.css`, `fixtures/data.js`, `js/core.js`, `js/app.js`.
- Reserved for the next implementation pass: the named CSS, fixture and JavaScript modules below. They are intentionally not linked from `index.html` yet, so this repository remains a faithful copy of the current working demo.
- The `prototype/ai/` directory documents future AI integration boundaries. It does not contain a live model client, API key, RAG pipeline, external tool connection or deployed agent.

When implementation resumes, migrate responsibility deliberately into the reserved modules instead of creating a competing second data source.

## Run locally

Open `prototype/index.html` directly in a browser.

To run the existing deterministic smoke test, use Node.js:

```bash
node prototype/tests/smoke-test.js
```

## GitHub Pages

The included workflow deploys the contents of `prototype/` when changes are pushed to the `main` branch. In the GitHub repository settings, choose **GitHub Actions** as the Pages source if GitHub does not enable it automatically.
