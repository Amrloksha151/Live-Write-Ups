---
name: writeup-manager
description: Generates interactive security writeups in MDX format from URLs or raw text. Use when you need to transform a security narrative, attack summary, or walkthrough into an interactive training experience with stages and decision points. Supports `writeups new [content/link]`.
---

# Writeup Manager Skill

This skill transforms standard security writeups, walkthroughs, and attack narratives into interactive training modules.

## Triggering the Skill
The primary trigger is `writeups new [content/link]`.
- If a **link** is provided, use `web_fetch` to retrieve the content.
- If **text** is provided, process it directly.

## Workflow

### 1. Content Ingestion
Retrieve the core narrative. It does not need to be a "known" article; any technical security description is valid.

### 2. Analysis & Structuring
Deconstruct the narrative into logical **Stages**.
- **Reconnaissance**: Information gathering.
- **Discovery**: Identifying vulnerabilities.
- **Exploitation**: Chaining and executing the attack.
- **Mitigation**: Remediation steps.

### 3. Interactive Design
For each stage, identify critical "forks in the road" where a trainee should make a choice.
- Use `<DecisionPoint>` for standard multiple-choice reasoning (Refer to `references/strategy.md` for framing).
- Design custom inline components (Refer to `references/custom-components.md`) for more immersive scenarios (e.g., log analysis, terminal output).

### 4. Code Generation
Generate the MDX file following the project's strict standards:
- **Location**: `src/content/writeups/[slug].mdx`.
- **Styling**: Must use Tailwind, `font-display`, `font-inter`, and neon color palette (`neon-cyan`, `neon-magenta`, `neon-green`).
- **Components**: Wrap content in `<Stage>` and use `LucideIcon.astro` for visuals.
- **Reference**: Follow the structure in `references/templates.md`.

### 5. Validation
Ensure all imports are correct and the frontmatter matches the `src/content/config.ts` schema.

## References
- **[strategy.md](references/strategy.md)**: How to write effective "Decision Points".
- **[templates.md](references/templates.md)**: MDX structure and styling guidelines.
- **[custom-components.md](references/custom-components.md)**: Snippets for advanced interactive elements.
