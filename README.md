# Python KP1 — learning site (Bangla + English)

A frontend-only site that teaches Python from zero to OOP for the Python KP1 test
automation qualification. React + Vite + TypeScript + Tailwind. No backend.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

Import the folder or repository in Vercel. It detects Vite on its own
(build command `npm run build`, output folder `dist`). `vercel.json` sends every URL to
`index.html`, so links like `/topic/operators` work after a page reload.

## Where the content lives

All content is typed data. You can change it without touching any UI code.

```
src/data/
  index.ts           the list of all modules, in order
  helpers.ts         L(code, bnComment, enComment) and t(bn, en)
  module1/ … module8/
    index.ts         the module (title, description, topic order)
    <topic>.ts       one topic each: sections, practice, quiz
  mixed/
    mixed12.ts …     the four "Mixed challenges" pages (after Modules 2, 4, 6, 8)
src/types.ts         the shape of all content (Section, PracticeTask, QuizQuestion …)
```

- Terminal commands and plain files use `lang: "shell"` (no Python colours, not run by the checker).
- Code is written once. Each line can carry a Bangla and an English comment:
  `L("x = 5", "x এ 5 রাখি", "store 5 in x")`. An empty code string makes a comment-only
  line, which is useful for `↑` arrow labels.
- Section types: `text`, `code`, `table`, `analogy`, `callout`, `stepper`, `mistakes`,
  `summary`.
- Text supports `**bold**`, `` `code` ``, `- bullet` lines and blank-line paragraphs.

## Checking the content

```bash
npm run check:content
```

`npm run check:structure` checks that every topic has 4 easy, 5 medium, 3 hard and 1 QA task,
a quiz, a common-mistakes table and a summary, and that Bangla text is really translated.

`npm run check:content` runs every code example, every practice solution (using its sample input) and every
"common mistake" snippet through real Python. It reports any output that differs from
what the data files say, and any code line without a comment. It needs `python` on your PATH.
