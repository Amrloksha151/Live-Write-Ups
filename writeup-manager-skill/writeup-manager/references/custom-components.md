# Custom Interactive Components

When `<DecisionPoint>` is too simple, you can define custom components directly in the MDX file using Astro/JSX syntax.

## Design Principles
- **Style Alignment**: Use `glass`, `glass-lg`, `neon-*`, and `font-*` classes.
- **Interactivity**: Use `client:load` for any component requiring JS-based interactivity.
- **Feedback**: Always provide a clear "Success" or "Failure" state.

## 1. Terminal Simulator
Perfect for command injection or tool output analysis.

```mdx
<div class="terminal glass bg-black/80 rounded-lg p-4 font-space-mono text-sm border border-frost/20">
  <div class="flex gap-2 mb-3">
    <div class="w-3 h-3 rounded-full bg-red-500"></div>
    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
    <div class="w-3 h-3 rounded-full bg-green-500"></div>
  </div>
  <div class="text-neon-green">$ nmap -sV target.local</div>
  <div class="text-frost mt-2">
    Starting Nmap 7.80...<br/>
    Nmap scan report for target.local (10.10.10.5)<br/>
    Host is up (0.012s latency).<br/>
    PORT   STATE SERVICE VERSION<br/>
    80/tcp open  http    Apache httpd 2.4.41<br/>
  </div>
</div>
```

## 2. Vulnerability Scanner (Simplified)
Simulate a scanning tool with a "Scan" button that reveals results.

```mdx
<div class="scanner-box glass-lg p-6 rounded-xl border-l-4 border-neon-cyan">
  <div class="flex items-center gap-3 mb-4 text-neon-cyan">
    <LucideIcon name="search" class="w-5 h-5" />
    <span class="font-display font-bold uppercase tracking-wider">VulnScanner v1.0</span>
  </div>
  <p class="text-sm text-frost/70 mb-4">Click to analyze the target's headers for misconfigurations.</p>
  <button class="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan rounded hover:bg-neon-cyan/40 transition-all font-bold">
    Run Analysis
  </button>
</div>
```

## 3. Log Inspector
Used for forensic analysis stages.

```mdx
<div class="log-viewer bg-dark-bg border border-frost/10 rounded overflow-hidden">
  <div class="bg-dark-surface px-3 py-1 text-xs font-bold text-frost/50 flex justify-between">
    <span>/var/log/nginx/access.log</span>
    <span>ASCII Text</span>
  </div>
  <pre class="p-3 text-xs text-frost/80 leading-relaxed font-space-mono whitespace-pre-wrap">
192.168.1.105 - - [15/May/2026:10:45:01 +0000] "GET /admin HTTP/1.1" 403 562
192.168.1.105 - - [15/May/2026:10:45:05 +0000] "POST /login HTTP/1.1" 200 1205
<span class="text-neon-magenta bg-neon-magenta/10">192.168.1.105 - - [15/May/2026:10:46:12 +0000] "GET /debug?file=../../etc/passwd HTTP/1.1" 200 2401</span>
  </pre>
</div>
```

## 4. Configuration Editor (Read-only Highlight)
Highlighting misconfigurations in YAML/JSON/XML.

```mdx
<div class="config-snippet glass p-4 rounded-lg">
  <p class="text-xs font-bold text-neon-orange mb-2">Detected: Insecure Default Config</p>
  <pre class="text-sm font-space-mono">
{
  "api": {
    "version": "v2",
    <span class="bg-neon-orange/20 text-neon-orange">"debug_mode": true,</span>
    "auth_required": false
  }
}
  </pre>
</div>
```
