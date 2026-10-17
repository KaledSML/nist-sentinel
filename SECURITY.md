# Security Policy

NIST Sentinel is a client-side prototype: no backend, no accounts and no network requests. Even so, security reports are welcome.

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Use GitHub's private reporting instead: go to the **Security** tab of this repository and click **Report a vulnerability**.

Helpful details to include:

- What you found and where (file, function or screen)
- Steps to reproduce it
- The impact you think it has
- Your browser and version

This is a personal project maintained in my spare time, so I can't promise fixed response times. I will do my best to acknowledge a report within a few days and to credit you in the fix if you want.

## Supported versions

Only the latest version on the `main` branch (and the live demo) receives fixes.

## Scope

**In scope**

- Cross-site scripting (XSS) or HTML injection through notes or audit details
- Ways to bypass the Content Security Policy
- Spreadsheet formula injection in the Excel export
- Tampered `LocalStorage` data that breaks the app or runs code
- Tampered files in `vendor/`

**Out of scope**

- Anyone with access to your browser profile reading `LocalStorage` (data is stored unencrypted by design, see the README)
- Vulnerabilities inside third-party libraries (Chart.js, SortableJS, ExcelJS); please report those to their maintainers
- Missing HTTP headers such as `frame-ancestors`, which can't be set through `<meta>` on GitHub Pages
- Social engineering and physical access attacks

## Known limitations

These are tracked in the README roadmap:

- Stored notes and exports are not encrypted.
- `frame-ancestors` (anti-clickjacking) can't be set through `<meta>` on GitHub Pages.
