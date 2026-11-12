import { Fragment, type ReactNode } from "react";

/**
 * Very small "markdown-lite" renderer used for all content text.
 * Supports:
 *   **bold**, `inline code`
 *   blank line  -> new paragraph
 *   "- item"    -> bullet list
 *   single newline inside a paragraph -> line break
 */
function inline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    const k = `${keyBase}-${i}`;
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={k}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`") && p.length > 1)
      return (
        <code key={k} className="inline-code">
          {p.slice(1, -1)}
        </code>
      );
    return <Fragment key={k}>{p}</Fragment>;
  });
}

export function RichText({ text, className = "" }: { text: string; className?: string }) {
  // Split into paragraphs, then group consecutive "- " lines into bullet lists.
  const groups: { list: boolean; lines: string[] }[] = [];
  text.split(/\n\s*\n/).forEach((block) => {
    let current: { list: boolean; lines: string[] } | null = null;
    for (const line of block.split("\n")) {
      const isItem = line.trim().startsWith("- ");
      if (!current || current.list !== isItem) {
        current = { list: isItem, lines: [] };
        groups.push(current);
      }
      current.lines.push(isItem ? line.trim().slice(2) : line);
    }
  });
  return (
    <div className={`rich space-y-3 ${className}`}>
      {groups.map((g, gi) =>
        g.list ? (
          <ul key={gi} className="list-disc space-y-1 pl-6">
            {g.lines.map((l, li) => (
              <li key={li}>{inline(l, `${gi}-${li}`)}</li>
            ))}
          </ul>
        ) : (
          <p key={gi}>
            {g.lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {inline(l, `${gi}-${li}`)}
              </Fragment>
            ))}
          </p>
        ),
      )}
    </div>
  );
}

/** Inline-only version (no paragraphs) for table cells and short labels. */
export function InlineText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {inline(l, String(i))}
        </Fragment>
      ))}
    </>
  );
}
