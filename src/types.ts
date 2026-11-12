// ============================================================
// Content types. All learning content is plain typed data.
// Edit files in src/data/ — no UI code needs to change.
// ============================================================

export type Lang = "bn" | "en";

/** Text in both languages. */
export interface T {
  bn: string;
  en: string;
}

/** A text that is either the same in both languages (plain string) or bilingual. */
export type Txt = string | T;

/**
 * One line of code with an optional comment in both languages.
 * - c: the code itself (same in both languages)
 * - bn / en: the comment for this line
 * If c is empty, the line is a comment-only line (good for arrows ↑ and labels).
 */
export interface CodeLine {
  c: string;
  bn?: string;
  en?: string;
}

export interface TextSection {
  type: "text";
  title?: T;
  body: T;
}

export interface CodeSection {
  type: "code";
  title?: T;
  lines: CodeLine[];
  /** The exact printed result. Omit only if the code prints nothing. */
  output?: string;
  /** Show the output box as an error (red). */
  isError?: boolean;
  /** Optional note under the output. */
  note?: T;
  /** "shell" for terminal commands and plain files (no Python highlighting, not run by the checker). */
  lang?: CodeLang;
  /** File name or label shown on top of the code block, e.g. "requirements.txt". */
  file?: string;
  /** The checker skips this example (e.g. an infinite loop or a file that does not exist). */
  noRun?: boolean;
}

export type CodeLang = "python" | "shell";

export interface TableSection {
  type: "table";
  title?: T;
  headers: Txt[];
  rows: Txt[][];
  /** Column indexes that should render as code. */
  codeCols?: number[];
  caption?: T;
}

export interface AnalogySection {
  type: "analogy";
  title: T;
  body: T;
  emoji?: string;
}

export interface CalloutSection {
  type: "callout";
  variant: "tip" | "warning" | "qa" | "error";
  title: T;
  body: T;
}

export interface StepperStep {
  /** 0-based index of the line that runs in this step. */
  line: number;
  /** Variable values AFTER this line runs. */
  vars: Record<string, string>;
  /** Text added to the output in this step (one or more lines). */
  out?: string;
  /** Explanation for this step. */
  note: T;
}

export interface StepperSection {
  type: "stepper";
  title: T;
  code: CodeLine[];
  steps: StepperStep[];
}

export interface Mistake {
  mistake: string; // the wrong code
  error: Txt; // exact error message
  why: T;
  fix: string; // the correct code
  /** The checker does not run this mistake (e.g. depends on what is installed). */
  noRun?: boolean;
}

export interface MistakesSection {
  type: "mistakes";
  title?: T;
  items: Mistake[];
}

export interface SummarySection {
  type: "summary";
  body: T;
}

export type Section =
  | TextSection
  | CodeSection
  | TableSection
  | AnalogySection
  | CalloutSection
  | StepperSection
  | MistakesSection
  | SummarySection;

export type Level = "easy" | "medium" | "hard" | "qa";

export interface BoundaryCase {
  input: Txt;
  expected: Txt;
  why?: T;
}

export interface PracticeTask {
  id: string;
  level: Level;
  title: T;
  task: T;
  hint: T;
  sampleInput?: string;
  expectedOutput: string;
  solution: CodeLine[];
  explanation: T;
  /** For QA / boundary tasks: the exact values to test and the expected result. */
  boundary?: BoundaryCase[];
  /** "shell" when the solution is terminal commands. */
  lang?: CodeLang;
  /** The checker skips this task. */
  noRun?: boolean;
}

export interface QuizQuestion {
  question: T;
  /** Optional code shown with the question. */
  code?: string;
  options: Txt[];
  correctIndex: number;
  explanation: T;
}

export interface Topic {
  id: string;
  title: T;
  estimatedMinutes: number;
  /** "mixed" topics have only practice, no Learn content. */
  kind?: "lesson" | "mixed";
  sections: Section[];
  practice: PracticeTask[];
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  number: number;
  title: T;
  description: T;
  /** false while the content is still being written. */
  ready: boolean;
  topics: Topic[];
}

export type Status = "not_started" | "learning" | "practice_left" | "done";
