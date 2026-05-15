# Lab Toolkit: Interactive Components

Use these components to build immersive, data-driven security labs.

## 1. KnowledgeNote (Inline Tooltips)
Provide technical context for terms, idioms, or protocols without breaking immersion.

```mdx
<KnowledgeNote term="LFI" definition="Local File Inclusion: An attack where an intruder tricks a web application into exposing or running files on the web server.">
  ... text with LFI ...
</KnowledgeNote>
```

## 2. LiveLogExplorer (Data Analysis)
Force the user to analyze raw logs to find anomalies or targets.

```mdx
<LiveLogExplorer 
  title="Nginx Access Logs" 
  data={[
    { time: "10:45:01", ip: "192.168.1.1", request: "GET /index.html", status: 200 },
    { time: "10:45:05", ip: "10.0.0.5", request: "POST /login", status: 403 },
    { time: "10:46:12", ip: "192.168.1.1", request: "GET /admin?file=../../etc/passwd", status: 200 }
  ]}
  filterBy="status"
/>
```

## 3. CommandBuilder (Payload Construction)
Interactive component for building complex commands.

```mdx
<CommandBuilder
  base="nmap"
  options={[
    { flag: "-sV", label: "Version Detection", desc: "Identify service versions" },
    { flag: "-T4", label: "Aggressive Timing", desc: "Faster, but noisier" },
    { flag: "--script=vuln", label: "Vuln Scan", desc: "Run vulnerability scripts" }
  ]}
  target="10.10.10.123"
/>
```

## 4. ConsequenceBanner (Branching Feedback)
Display the technical result of a sub-optimal choice.

```mdx
<ConsequenceBanner 
  type="alerted" 
  title="Detection Triggered" 
  message="Your loud scan tripped the internal IDS. The security team is now actively monitoring this subnet."
/>
```

## 5. Terminal Simulator (Interpretive Output)
For showing tool results that require analysis.

```mdx
<div class="terminal glass bg-black/80 rounded-lg p-4 font-space-mono text-sm border border-frost/20">
  <div class="text-neon-green">$ curl -I http://target.local</div>
  <div class="text-frost mt-2">
    HTTP/1.1 200 OK<br/>
    Date: Fri, 15 May 2026 14:00:00 GMT<br/>
    Server: Apache/2.4.41 (Ubuntu)<br/>
    <span class="text-neon-magenta">X-Debug-Mode: Enabled</span><br/>
    Content-Type: text/html; charset=UTF-8
  </div>
</div>
```

> [!IMPORTANT]
> **MDX Keyword Safety**: Always use markdown code blocks (```) for any snippet containing `import` or `export` keywords.
