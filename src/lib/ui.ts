import type { Lang, Level, Status, T, Txt } from "../types";

/** Pick the right language from a bilingual text. */
export function tr(x: Txt | undefined, lang: Lang): string {
  if (x === undefined) return "";
  return typeof x === "string" ? x : x[lang];
}

/** All interface words (menus, buttons, labels) in both languages. */
export const UI = {
  siteName: { bn: "পাইথন KP1", en: "Python KP1" },
  tagline: { bn: "শূন্য থেকে OOP — সহজ ভাষায়", en: "From zero to OOP — in simple words" },
  dashboard: { bn: "ড্যাশবোর্ড", en: "Dashboard" },
  learn: { bn: "শিখি", en: "Learn" },
  practice: { bn: "প্র্যাকটিস", en: "Practice" },
  quiz: { bn: "মিনি কুইজ", en: "Mini quiz" },
  prev: { bn: "আগের টপিক", en: "Previous topic" },
  next: { bn: "পরের টপিক", en: "Next topic" },
  minutes: { bn: "মিনিট", en: "min" },
  copy: { bn: "কপি", en: "Copy" },
  copied: { bn: "কপি হয়েছে!", en: "Copied!" },
  output: { bn: "আউটপুট", en: "Output" },
  errorOutput: { bn: "এরর (Error)", en: "Error" },
  showHint: { bn: "হিন্ট দেখাও", en: "Show hint" },
  hideHint: { bn: "হিন্ট লুকাও", en: "Hide hint" },
  showSolution: { bn: "সমাধান দেখাও", en: "Show solution" },
  hideSolution: { bn: "সমাধান লুকাও", en: "Hide solution" },
  sampleInput: { bn: "নমুনা ইনপুট", en: "Sample input" },
  expectedOutput: { bn: "প্রত্যাশিত আউটপুট", en: "Expected output" },
  whyWorks: { bn: "কেন এটা কাজ করে", en: "Why this works" },
  testValues: { bn: "যেসব মান টেস্ট করবে", en: "Values to test" },
  input: { bn: "ইনপুট", en: "Input" },
  expected: { bn: "প্রত্যাশিত ফল", en: "Expected result" },
  reason: { bn: "কারণ", en: "Reason" },
  tryFirst: {
    bn: "আগে নিজে চেষ্টা করো। আটকে গেলে হিন্ট দেখো। তারপরও না পারলে সমাধান দেখো — এতে লজ্জার কিছু নেই।",
    en: "Try it yourself first. Stuck? Look at the hint. Still stuck? Open the solution — that is completely fine.",
  },
  stepperNext: { bn: "পরের ধাপ ▶", en: "Next step ▶" },
  stepperPrev: { bn: "◀ আগের", en: "◀ Back" },
  stepperReset: { bn: "আবার শুরু", en: "Reset" },
  step: { bn: "ধাপ", en: "Step" },
  of: { bn: "/", en: "of" },
  variables: { bn: "ভেরিয়েবলের মান", en: "Variable values" },
  noVars: { bn: "এখনো কোনো ভেরিয়েবল নেই", en: "No variables yet" },
  notStartedStepper: { bn: "“পরের ধাপ” চাপো, কোড চলা শুরু হবে।", en: "Press “Next step” to start running the code." },
  finished: { bn: "প্রোগ্রাম শেষ ✔", en: "Program finished ✔" },
  mistakeCol: { bn: "ভুল কোড", en: "Mistake" },
  errorCol: { bn: "এরর মেসেজ", en: "Error message" },
  whyCol: { bn: "কেন হয়", en: "Why it happens" },
  fixCol: { bn: "ঠিক কোড", en: "Fix" },
  commonMistakes: { bn: "সাধারণ ভুলগুলো", en: "Common mistakes" },
  rememberOneLine: { bn: "এক লাইনে মনে রাখো", en: "Remember in one line" },
  realLife: { bn: "বাস্তব জীবনের উদাহরণ", en: "Real life example" },
  tip: { bn: "টিপস", en: "Tip" },
  warning: { bn: "সাবধান", en: "Careful" },
  qa: { bn: "QA / টেস্ট অটোমেশনে কাজে লাগে", en: "Useful in QA / test automation" },
  question: { bn: "প্রশ্ন", en: "Question" },
  correct: { bn: "সঠিক! 🎉", en: "Correct! 🎉" },
  wrong: { bn: "ঠিক হয়নি।", en: "Not quite." },
  nextQuestion: { bn: "পরের প্রশ্ন", en: "Next question" },
  seeScore: { bn: "স্কোর দেখো", en: "See score" },
  yourScore: { bn: "তোমার স্কোর", en: "Your score" },
  retry: { bn: "আবার চেষ্টা করো", en: "Try again" },
  scoreGreat: { bn: "দারুণ! তুমি টপিকটা ভালো বুঝেছ।", en: "Great! You understood this topic well." },
  scoreOk: { bn: "ভালো! ভুলগুলোর ব্যাখ্যা আবার পড়ে নাও।", en: "Good! Re-read the explanations of the ones you missed." },
  scoreLow: { bn: "সমস্যা নেই। Learn ট্যাবটা আরেকবার পড়ে আবার চেষ্টা করো।", en: "No problem. Read the Learn tab once more and try again." },
  search: { bn: "টপিক খুঁজো…", en: "Search topics…" },
  noResults: { bn: "কিছু পাওয়া যায়নি", en: "Nothing found" },
  status: { bn: "অবস্থা", en: "Status" },
  overall: { bn: "সামগ্রিক অগ্রগতি", en: "Overall progress" },
  topicsDone: { bn: "টপিক শেষ", en: "topics done" },
  comingSoon: { bn: "শীঘ্রই আসছে", en: "Coming soon" },
  comingSoonBody: {
    bn: "এই অংশের কনটেন্ট এখনো লেখা হচ্ছে। আপাতত মডিউল ১–৫ দিয়ে শেখো।",
    en: "This part is still being written. Learn with Modules 1–5 for now.",
  },
  module: { bn: "মডিউল", en: "Module" },
  startHere: { bn: "এখান থেকে শুরু করো", en: "Start here" },
  continueLearning: { bn: "চালিয়ে যাও", en: "Continue" },
  menu: { bn: "মেনু", en: "Menu" },
  dark: { bn: "ডার্ক মোড", en: "Dark mode" },
  light: { bn: "লাইট মোড", en: "Light mode" },
  notFound: { bn: "পেজটি পাওয়া যায়নি।", en: "Page not found." },
  goHome: { bn: "ড্যাশবোর্ডে ফিরে যাও", en: "Back to dashboard" },
  tasks: { bn: "টি টাস্ক", en: "tasks" },
  questions: { bn: "টি প্রশ্ন", en: "questions" },
  resetProgress: { bn: "অগ্রগতি মুছে ফেলো", en: "Reset progress" },
  resetConfirm: { bn: "সব অগ্রগতি মুছে যাবে। নিশ্চিত?", en: "All progress will be cleared. Are you sure?" },
  howToUse: { bn: "কীভাবে ব্যবহার করবে", en: "How to use this site" },
  howToUseBody: {
    bn: "১. প্রতিটি টপিকে আগে **শিখি** ট্যাব পড়ো।\n২. তারপর **প্র্যাকটিস** ট্যাবে সব টাস্ক নিজে VS Code-এ লিখে চালাও।\n৩. শেষে মিনি কুইজ দাও।\n৪. উপরের ড্রপডাউনে নিজের অবস্থা সেট করো — এখানে অগ্রগতি দেখা যাবে।",
    en: "1. In every topic, read the **Learn** tab first.\n2. Then open **Practice** and type every task yourself in VS Code and run it.\n3. Finish with the mini quiz.\n4. Set your status in the dropdown at the top — your progress shows up here.",
  },
} satisfies Record<string, T>;

export const STATUS_LABEL: Record<Status, T> = {
  not_started: { bn: "শুরু হয়নি", en: "Not started" },
  learning: { bn: "শিখছি", en: "Learning" },
  practice_left: { bn: "প্র্যাকটিস বাকি", en: "Practice left" },
  done: { bn: "ডান", en: "Done" },
};

export const STATUS_STYLE: Record<Status, string> = {
  not_started: "bg-slate-100 text-slate-700 ring-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600",
  learning: "bg-sky-100 text-sky-800 ring-sky-300 dark:bg-sky-900/50 dark:text-sky-200 dark:ring-sky-700",
  practice_left: "bg-amber-100 text-amber-800 ring-amber-300 dark:bg-amber-900/40 dark:text-amber-200 dark:ring-amber-700",
  done: "bg-emerald-100 text-emerald-800 ring-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200 dark:ring-emerald-700",
};

export const LEVEL_LABEL: Record<Level, T> = {
  easy: { bn: "সহজ", en: "Easy" },
  medium: { bn: "মাঝারি", en: "Medium" },
  hard: { bn: "কঠিন", en: "Hard" },
  qa: { bn: "QA স্টাইল", en: "QA style" },
};

export const LEVEL_STYLE: Record<Level, string> = {
  easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
  hard: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200",
  qa: "bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200",
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
/** Show numbers in Bangla digits when the language is Bangla. */
export function num(n: number | string, lang: Lang): string {
  const s = String(n);
  return lang === "bn" ? s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]) : s;
}
