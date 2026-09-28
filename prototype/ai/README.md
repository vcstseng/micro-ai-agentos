# AI solution-design contracts

This directory reserves the interfaces needed if AgentOS later moves from a static demonstration to an AI-backed prototype.

## Boundary

Nothing in this directory is currently executed by the demo. The current UI uses deterministic fixtures and explicitly simulated AI behaviour. These files are a design contract, not evidence of a live LLM, retrieval system, external tool connection or deployed autonomous agent.

## Intended sequence

```text
Business context + source records
  -> model prompt and structured output
  -> deterministic schema / policy / evidence checks
  -> owner decision
  -> explicitly authorised operation
```

## Directory responsibilities

- `prompts/`: model instructions for bounded business tasks.
- `schemas/`: required structured input and output fields.
- `tools/`: future tool-call input/output contracts; never credentials or client secrets.
- `workflows/`: orchestration, hand-off and human-approval boundaries.
- `knowledge/`: merchant context, metric definitions and operating policies.
- `evaluation/`: test cases, grounding rules and insufficient-evidence handling.

All future changes must preserve the rule that an Owner approval permits a specific operation; it does not itself prove that an external operation completed.
