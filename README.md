<div align="center">

![Logo](https://raw.githubusercontent.com/Amrloksha151/Live-Write-Ups/main/public/logo.png)
# Live Write Ups
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-000000?style=for-the-badge&logo=mdx&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI-Powered-00C853?style=for-the-badge)

![Responsive](https://img.shields.io/badge/Responsive-Design-38B2AC?style=for-the-badge)
![Dark Mode](https://img.shields.io/badge/Dark-Mode-111827?style=for-the-badge)

![License](https://img.shields.io/badge/license-LWU--NC%201.0-red)
![Non-Commercial](https://img.shields.io/badge/usage-non--commercial-orange)

</div>
This project started just as a personal tool that would help me in my security skills via interactive writeups that are made using mdx. This idea was inspired from a similar paid website so I decided to make my own then I wanted to publish it to everyone! Now anyone can contribute with new writeups or components to the codebase, <em>hope you enjoy it!</em>
<img width="1920" height="1280" alt="Live Write Ups" src="https://github.com/user-attachments/assets/5a926f49-af20-48d7-8db0-c3fc384db227" />

## Usage
The idea is simple you open the ![website](https://writeups.amrloksha151.top) scroll down to the writeups, choose the writeup you like then start <strong>learning!</strong>
<img width="1870" height="1091" alt="Usage" src="https://github.com/user-attachments/assets/e20dfd97-3cf1-44ee-bf65-ca87052fa761" />

## Contributing

Contributions are welcome across the following scopes. Every PR **must** state its scope, type, and include a short description of what was done.

**PR title format:** `[Scope] Type: Short description`
**Example:** `[Writeup] Addition: Add SQL injection writeup`

---

### Scopes

**`[Writeup]`** — Add or edit writeups in `src/content/`. Write them manually or use the installed Gemini skill (`writeup-manager`).

**`[Component]`** — Add new MDX components or edit existing ones in `src/components/`. New components should be reusable and include a usage example.

**`[UI]`** — Visual or layout changes. Must preserve the project's design identity — PRs that significantly alter the look and feel may not be merged.

**`[Skill]`** — Edit the existing `writeup-manager` Gemini skill or add a new skill for another agent under `.gemini/skills/`.

**`[Misc]`** — Documentation, file organization, config, or tooling.

---

### Steps

1. Fork the repo using the **Fork** button on GitHub.
2. Clone your fork locally:
```bash
   git clone https://github.com/your-username/Live-Write-Ups.git
   cd Live-Write-Ups
```
3. Install dependencies:
```bash
   npm install
```
4. Make your changes.
5. Verify the build passes before pushing:
```bash
   npm run build
```
6. Commit and push to your fork:
```bash
   git add .
   git commit -m "[Scope] Type: Short description"
   git push
```
7. Open a Pull Request from your fork to `main` with a clear title and a brief description of what was done.

---

### Rules

- One scope per PR — split multi-scope changes into separate PRs.
- PR type must be one of: **Addition**, **Deletion**, or **Refactor**.
- PRs without a clear title and description will not be reviewed.
- All contributions must respect the project's non-commercial license.

## License

This project is licensed under the LWU-NC v1.0 License.

Personal, educational, and research use are permitted.
Commercial use is prohibited without explicit permission.
