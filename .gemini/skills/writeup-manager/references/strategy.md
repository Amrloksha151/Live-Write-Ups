# Lab Strategy: Engineering Critical Thinking

This guide defines how to design interactive labs that challenge security professionals through high-fidelity decision-making and branching consequences.

## Core Philosophy: Problem Over Quiz
A lab is a problem to solve. If the user feels like they are taking a multiple-choice test, the lab has failed. They should feel like they are "at the console" making tactical choices.

## 1. High-Fidelity Decision Design

### Plausible Alternatives
Never include "obviously wrong" or "joke" answers. Every choice in a `<DecisionPoint>` must be a valid technical action that an engineer might realistically consider.
- **Context**: You find a potential SQL injection point on a high-traffic production DB.
- **Bad Choices**: "Ignore it", "Drop the database", "Call support".
- **Lab-First Choices**: 
  - `SELECT sleep(10)` (Time-based probe - risky on high traffic).
  - `OR 1=1` (Boolean-based probe - noisy, might break UI).
  - `UNION SELECT @@version` (Direct extraction - most efficient but easily caught by WAF).

### The Correct Path
The "Correct" choice must be the one that best fits the **Constraints** defined in the scenario (e.g., "Must remain undetected", "Time is of the essence", "Limited bandwidth").

## 2. Branching Consequences

Instead of simple "Correct/Incorrect" feedback, use consequences to drive the narrative.

### The "Failure" Branch
When a user makes a sub-optimal or wrong choice, show the technical consequence:
- **Alerted**: "The WAF detected your boolean probe. The target IP is now being monitored more closely. (+20% Difficulty)".
- **Connection Reset**: "The service crashed due to your payload. You've lost your current session."
- **Dead End**: "Your choice led to a locked account. You must find another way in."

## 3. Knowledge Notes & Idioms
Use `<KnowledgeNote>` to provide essential context without interrupting the lab's flow.
- **Idioms**: Explain terms like "Living off the Land" or "LotL".
- **Protocols**: Briefly define `ASN`, `BGP`, or `JWT` structure.
- **Goal**: Support the user's critical thinking by ensuring they have the technical vocabulary needed to solve the problem.

## 4. Discovery via Analysis
Encourage users to "look at the data" before deciding.
- Use `LiveLogExplorer` to force them to find an IP or a User-Agent.
- Use `Terminal` output that they must interpret to find a hidden flag or file path.

## 5. Lab Progression
1. **The Brief**: Set the scenario, constraints, and objective.
2. **The Probe**: Data collection and analysis (Log/Terminal components).
3. **The Pivot**: Making the critical decision (DecisionPoint with consequences).
4. **The Breach/Fix**: Executing the solution or implementing the mitigation.
5. **The Debrief**: Summarize the skill earned.
