# Lab Template: High-Fidelity Security Training

Use this template as the blueprint for every generated lab.

```mdx
---
title: "Lab: [Scenario Name]"
description: "Solve [Problem] by [Technique] under [Constraints]."
publishedAt: YYYY-MM-DD
author: "Agent"
tags: ["lab", "critical-thinking", "web"]
difficulty: "intermediate"
platform: "Lab Environment"
category: "Web Security"
coverImage: "./slug-cover.png" # MUST be a local relative path
coverAlt: "Description of the lab scenario cover"
readingTime: 15
draft: false
---

import DecisionPoint from '../../components/writeup/DecisionPoint.astro';
import Stage from '../../components/writeup/Stage.astro';
import LucideIcon from '../../components/ui/LucideIcon.astro';
import KnowledgeNote from '../../components/writeup/KnowledgeNote.astro';
// ... other lab components

<Stage title="The Brief" description="Scenario constraints and objectives">

## The Mission

You are tasked with [Objective]. The target is [Target Details].

**Constraints**:
- [Constraint 1: e.g., Stealth is paramount]
- [Constraint 2: e.g., Limited time window]

<KnowledgeNote term="Living off the Land" definition="Using legitimate system tools for malicious purposes.">
  In this lab, we will be **Living off the Land** to evade detection.
</KnowledgeNote>

</Stage>

<Stage title="Data Analysis" description="Gathering intelligence from the target">

## Examining the Logs

Analyze the following logs to find the entry point.

<LiveLogExplorer 
  title="Access Logs" 
  data={[
    // ... realistic log entries
  ]}
/>

<DecisionPoint
  question="Based on the logs, which IP address shows signs of anomalous behavior?"
  chosen="192.168.1.105 (Repeated 403 errors on /admin)"
  reason="A high volume of 403 Forbidden errors on a sensitive path is a classic indicator of a directory brute-force attempt."
  alternatives={["10.0.0.1 (Regular heartbeat)", "172.16.0.5 (Occasional 404 on favicon.ico)"]}
/>

</Stage>

<Stage title="The Pivot" description="Making the critical tactical choice">

## Constructing the Payload

The target is vulnerable to [Vuln]. How do you proceed given the [Constraint]?

<CommandBuilder
  base="curl"
  options={[
    // ... plausible flags
  ]}
/>

<DecisionPoint
  question="Which exploitation strategy balances speed and stealth?"
  chosen="Blind Time-based injection with a small delay"
  reason="While slower, a 2-second delay is less likely to trigger the rate-limiting alerts than a boolean-based burst."
  alternatives={["Full automated sqlmap scan", "Manual UNION-based extraction"]}
/>

{/* If they choose a wrong path, use ConsequenceBanner in the feedback logic */}

</Stage>

<Stage title="The Debrief" description="Lessons learned and skill mastery">

## Mission Accomplished

You have successfully [Result].

### Skills Earned
- [Skill 1: e.g., Log Forensics]
- [Skill 2: e.g., Stealthy Exploitation]

<LucideIcon name="shield-check" class="w-12 h-12 text-neon-green mx-auto mt-8" />

</Stage>
```
