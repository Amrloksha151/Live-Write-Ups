---
name: writeup-manager
description: Generates interactive security labs in MDX format. Transforms narratives into problem-solving experiences with branching consequences and critical thinking challenges. Supports `writeups new [content/link]`.
---

# Writeup Manager Skill (Lab-First Edition)

This skill transforms security narratives into immersive **Labs**. The goal is not to test knowledge via quizzes, but to build skills through active problem-solving and critical thinking.

## The Mission: Labs, Not Exams
Every writeup must feel like a mission. Users should earn skills by navigating technical challenges, interpreting raw data, and making high-stakes decisions.

## Workflow

### 1. Content Ingestion & Scenario Mapping
Retrieve the core narrative. Instead of just "Stages", map out the **Scenario**:
- **Constraints**: What are the rules? (e.g., Stealth-only, no automated scanners).
- **Objectives**: What is the win condition?
- **Knowledge Gaps**: Identify terms or idioms that need `<KnowledgeNote>` tooltips.

### 2. Asset Management (Local First)
**NEVER use remote URLs for images.**
- If a cover image URL is provided or found, you MUST download it locally using `run_shell_command` with `curl`.
- **Location**: Save to `src/content/writeups/[slug]-cover.[ext]`.
- **Reference**: Use the relative local path `./[slug]-cover.[ext]` in the MDX frontmatter.

### 3. Analysis & Consequence Mapping
Identify critical "forks in the road". For every major action, determine:
- **Optimal Path**: The most efficient/correct technical move.
- **Plausible Alternatives**: Other technically valid but less optimal moves.
- **Consequences**: What happens if they choose wrong? (e.g., "Alerted", "Connection Reset", "Dead End").

### 3. Interactive Lab Design
Replace simple quizzes with immersive interactions:
- **Discovery**: Use `LiveLogExplorer` or `Terminal` simulators for data gathering.
- **Exploitation**: Use `CommandBuilder` for constructing payloads.
- **Critical Decisions**: Use `<DecisionPoint>` for high-fidelity technical choices with branching consequences.

### 4. Code Generation
Generate the MDX file following the project's strict standards:
- **Location**: `src/content/writeups/[slug].mdx`.
- **Structure**: Use `<Stage>` for linear progression, but frame each as a sub-scenario.
- **Interactivity**: Must include at least one advanced component (Log Explorer, Command Builder) per lab.
- **Notes**: Add `<KnowledgeNote>` for complex terms to aid learning without breaking immersion.

### 5. Validation
- **No Abstract Questions**: Ensure all decision points are technically grounded and plausible.
- **Linear with Branches**: Ensure the lab has a clear "Correct Path" but meaningful "Failure States".
- **Keyword Safety**: (Standard MDX keyword safety rules apply).

## References
- **[strategy.md](references/strategy.md)**: Engineering high-fidelity decisions and consequences.
- **[custom-components.md](references/custom-components.md)**: Toolkit for lab-specific interactions.
- **[templates.md](references/templates.md)**: The "Lab Blueprint".
