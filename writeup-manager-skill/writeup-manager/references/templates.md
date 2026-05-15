# MDX Templates & Styling Guidelines

All generated writeups must follow these structural and aesthetic standards.

## Frontmatter Schema
Every MDX file MUST start with this frontmatter:

```yaml
---
title: "A Compelling Security Title"
description: "A concise 1-2 sentence summary of the attack/defense path."
publishedAt: YYYY-MM-DD
author: "Agent"
tags: ["web", "network", "etc"]
difficulty: "beginner" | "intermediate" | "advanced" | "expert"
platform: "Source Platform (e.g., HTB, THM, Custom)"
category: "Security Domain"
coverImage: "./path-to-cover.svg" # Optional
coverAlt: "Description of the cover"
readingTime: 5 # Integer
draft: false
---
```

## Component Usage

### 1. Stages
Wrap every major section in a `<Stage>` component.

```mdx
import Stage from '../../components/writeup/Stage.astro';

<Stage title="Reconnaissance" description="Initial discovery and port scanning">
  ## Finding the Entry Point
  ... markdown content ...
</Stage>
```

### 2. Decision Points
Use `<DecisionPoint>` for interactive multiple-choice questions.

```mdx
import DecisionPoint from '../../components/writeup/DecisionPoint.astro';

<DecisionPoint
  question="The WAF is blocking single quotes. How do you pivot?"
  chosen="Use double encoding or Unicode normalization"
  reason="Double encoding often bypasses filters that only decode once."
  alternatives={["Switch to a different tool", "Give up on this endpoint", "Try a different browser"]}
/>
```

## Styling Guidelines (Tailwind)

### Typography
- **Headings**: Use `font-display` (e.g., `h2.font-display`).
- **Body**: Use `font-inter`.
- **Code**: Use `font-space-mono`.

### Colors & UI
- **Neon Cyan**: `text-neon-cyan` / `border-neon-cyan`.
- **Neon Magenta**: `text-neon-magenta` / `border-neon-magenta`.
- **Neon Green**: `text-neon-green` / `border-neon-green`.
- **Glass Effects**: Use `glass` or `glass-lg` classes on containers.

### Icons
Use `LucideIcon.astro` for all iconography.

```mdx
import LucideIcon from '../../components/ui/LucideIcon.astro';

<LucideIcon name="shield-alert" class="w-6 h-6 text-neon-magenta" />
```

## Full Example Template

```mdx
---
title: "Interactive Bypass Walkthrough"
description: "Learn how to bypass strict WAF filters using normalization."
publishedAt: 2026-05-15
author: "SecurityAgent"
tags: ["web", "bypass"]
difficulty: "intermediate"
platform: "Lab"
category: "Web Security"
coverAlt: "Abstract WAF bypass illustration"
readingTime: 10
draft: false
---

import DecisionPoint from '../../components/writeup/DecisionPoint.astro';
import Stage from '../../components/writeup/Stage.astro';
import LucideIcon from '../../components/ui/LucideIcon.astro';

<Stage title="Initial Analysis" description="Probing the target environment">

## Target Overview

The target application is a legacy CMS behind a modern WAF.

<DecisionPoint
  question="What is the most effective way to identify the WAF type?"
  chosen="Analyze the HTTP response headers and error page fingerprints"
  reason="Many WAFs leak their identity in custom headers like X-WAF or specific error HTML patterns."
  alternatives={["Brute force all endpoints", "Run a heavy Nessus scan", "Check the WHOIS records"]}
/>

</Stage>
```
