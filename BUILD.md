# Building the styles (`tailwind.css`)

**You don't need any of this to use or run NIST Sentinel.** The compiled `tailwind.css` is already in the repository, so opening `index.html` is enough.

You only need this guide if you **change the design**, meaning you add or edit Tailwind classes in `index.html`, `app.js` or `report.js`. In that case `tailwind.css` has to be generated again.

## What you need

- The **Tailwind CSS standalone CLI**: a single executable. No Node.js and no `npm install` required.
- The files already in this repo: `tailwind.config.js` (settings) and `input.css` (entry point).

The executable is not included in the repository. Download it once:

1. Go to the **v3.4.17** release page: <https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17>
2. Download the file for your system from its *Assets* list:

   | System | File |
   |---|---|
   | Windows | `tailwindcss-windows-x64.exe` |
   | macOS (Apple Silicon) | `tailwindcss-macos-arm64` |
   | macOS (Intel) | `tailwindcss-macos-x64` |
   | Linux | `tailwindcss-linux-x64` |

3. Put it in the project's root folder, next to `index.html`.

**Which version?** This project was built with **Tailwind CSS v3.4.17**. Stay on version 3.x: version 4 works differently and does not read `tailwind.config.js` the same way. You can check the version of the file you downloaded with `--help` (the first line prints it).

On macOS and Linux, make the file executable once: `chmod +x tailwindcss-*`.

## Rebuild the CSS

Run this from the project's root folder.

**Windows (PowerShell):**

```powershell
.\tailwindcss-windows-x64.exe -i input.css -o tailwind.css --minify
```

**macOS / Linux:**

```bash
./tailwindcss-macos-arm64 -i input.css -o tailwind.css --minify
```

(Use the file name you downloaded.)

While you are editing, add `--watch` to rebuild automatically every time you save:

```powershell
.\tailwindcss-windows-x64.exe -i input.css -o tailwind.css --watch
```

Then reload `index.html` in your browser.

## Things to keep in mind

- **`tailwind.config.js` must list every file that contains Tailwind classes** in its `content` setting: `index.html`, `app.js` and `report.js`. A class that only appears in a file missing from that list will not be generated, and the element will look unstyled.
- **Write classes in full.** Tailwind finds classes by reading the text of your files, so `border-blue-500` works but `border-${color}-500` does not. This is why `COLOR_CLASSES` in `app.js` spells out every color.
- **`custom.css` and `report.css` are plain CSS.** Editing them needs no rebuild.
- **Do not commit the executable.** It is a large binary and anyone can download it from the official releases. Add its name to `.gitignore`, for example `tailwindcss-*`.
- **Don't edit `tailwind.css` by hand.** Your changes would be lost the next time it is generated.
