# Agent Handoff: Snakepit.dev V1

## Objective

Ship a premium static landing page for Snakepit.dev that demonstrates the consulting capability instead of merely describing it.

## Source rationale

The site should use a controlled/declarative generative UI pattern:

- Controlled: visual components are pre-built and brand-safe.
- Declarative: selected profile data generates the canvas content.
- No open-ended raw HTML because it is too inconsistent for a public brand surface.

## Files to edit first

- `index.html`: copy, sections, links
- `src/styles.css`: brand system and responsive design
- `src/app.js`: profile data, simulator assumptions, assessment scoring
- `assets/snakepit-mark.svg`: logo mark

## Future V2

Move from static controlled/declarative demo to real agentic flow:

```text
Next.js
  -> CopilotKit / AG-UI
  -> AI Ops Agent
  -> LiteLLM Gateway
  -> Claude / OpenAI / OpenRouter / Ollama
  -> Langfuse traces and evals
```

## V1 acceptance checklist

- Page loads with no build step
- Logo and favicon display
- Profile selector updates canvas
- Token simulator updates estimates
- Scorecard updates score
- Contact links route to correct email or booking page
- Mobile layout is readable
