# Third-party libraries (`vendor/`)

These files are bundled locally so the app makes no network requests. They are unmodified copies of the original minified builds.

| File | Library | Version | Source | SHA-256 | Checked against source |
|---|---|---|---|---|---|
| `chart.umd.min.js` | [Chart.js](https://www.chartjs.org) | 4.4.7 | jsDelivr: `https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.js` (per the file header) | `206B6E8BB00FC7BBA2C7EE80CA41DB3E9E05BA7BE0AA35ABEBA9CFD5357F5D0E` | Version and source taken from the file header; hash not yet compared with a fresh download |
| `exceljs.min.js` | [ExcelJS](https://github.com/exceljs/exceljs) | 4.4.0 | jsDelivr: `https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js` | `7E49DA68588E250DBB8BBA190D2CAA8AB3787CC0284BDA1D8B2F805C4DF742C9` | Yes, 2026-10-16 (identical hash) |
| `Sortable.min.js` | [SortableJS](https://github.com/SortableJS/Sortable) | 1.15.0 | jsDelivr: `https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js` | `8A9889AECC2F011E15031FED87EEB35AC75E62655A7B4889BA247EE8EA872474` | Yes, 2026-10-16 (identical hash) |

Hashes were calculated with PowerShell's `Get-FileHash` (SHA-256).

## How to verify

Run this from the root of the repository.

**Windows (PowerShell):**

```powershell
Get-FileHash vendor\* | ForEach-Object { "$($_.Hash)  $(Split-Path $_.Path -Leaf)" }
```

**Mac / Linux:**

```bash
shasum -a 256 vendor/*
```

Compare each result with the table above. If a hash differs, the file has been changed (or it is a different build) and should not be trusted.

To compare against the original source, download the file from the URL in the table and hash it. For example, on Windows:

```powershell
Invoke-WebRequest https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js -OutFile $env:TEMP\check.js
(Get-FileHash $env:TEMP\check.js).Hash
```

## Updating a library

1. Download the new version from its official source (npm, jsDelivr or the project's GitHub releases).
2. Replace the file in `vendor/`.
3. Recalculate the hash and update the table, including the version, the source and the check date.
