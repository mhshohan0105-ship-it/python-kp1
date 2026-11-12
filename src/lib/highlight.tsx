import type { ReactNode } from "react";

// A tiny Python syntax highlighter (no external library needed).

const KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class", "continue",
  "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in",
  "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
]);

const BUILTINS = new Set([
  "print", "input", "int", "float", "str", "bool", "type", "len", "range", "list", "tuple", "dict",
  "set", "frozenset", "bytearray", "bytes", "sum", "max", "min", "abs", "round", "sorted", "filter",
  "map", "isinstance", "open", "super", "id", "enumerate", "zip", "any", "all", "repr", "object",
  "self", "divmod", "pow",
]);

const TOKEN = new RegExp(
  [
    String.raw`(#.*$)`, // 1 comment
    String.raw`((?:[fFrRbB]{1,2})?(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))`, // 2 string
    String.raw`(\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?j?\b)`, // 3 number
    String.raw`([A-Za-z_][A-Za-z0-9_]*)`, // 4 name
    String.raw`(\s+)`, // 5 space
    String.raw`([^\sA-Za-z0-9_#"']+|.)`, // 6 punctuation / other
  ].join("|"),
  "gm",
);

export function highlightPython(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(code)) !== null) {
    if (m[0] === "") {
      TOKEN.lastIndex++;
      continue;
    }
    const k = i++;
    if (m[1]) out.push(<span key={k} className="tok-comment">{m[1]}</span>);
    else if (m[2]) out.push(<span key={k} className="tok-string">{m[2]}</span>);
    else if (m[3]) out.push(<span key={k} className="tok-number">{m[3]}</span>);
    else if (m[4]) {
      const w = m[4];
      const after = code.slice(TOKEN.lastIndex);
      if (KEYWORDS.has(w)) out.push(<span key={k} className="tok-keyword">{w}</span>);
      else if (BUILTINS.has(w)) out.push(<span key={k} className="tok-builtin">{w}</span>);
      else if (/^\s*\(/.test(after)) out.push(<span key={k} className="tok-func">{w}</span>);
      else out.push(w);
    } else out.push(m[0]);
  }
  return out;
}
