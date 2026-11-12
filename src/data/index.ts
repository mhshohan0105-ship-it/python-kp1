import type { Module, Section, Topic } from "../types";
import { module1 } from "./module1";
import { module2 } from "./module2";
import { module3 } from "./module3";
import { module4 } from "./module4";
import { module5 } from "./module5";
import { module6 } from "./module6";
import { module7 } from "./module7";
import { module8 } from "./module8";

// ============================================================
// All modules in order. Each module lives in its own folder
// (src/data/moduleN/), with one file per topic.
// ============================================================

export const MODULES: Module[] = [module1, module2, module3, module4, module5, module6, module7, module8];

export interface TopicRef {
  module: Module;
  topic: Topic;
  index: number; // position in the flat list
}

export const ALL_TOPICS: TopicRef[] = MODULES.flatMap((m) => m.topics.map((t) => ({ module: m, topic: t, index: 0 }))).map(
  (r, i) => ({ ...r, index: i }),
);

export function findTopic(id: string | undefined): TopicRef | undefined {
  return ALL_TOPICS.find((r) => r.topic.id === id);
}

export function hasContent(t: Topic): boolean {
  return t.sections.length > 0 || t.practice.length > 0;
}

/** Sections that have a title — used in the sidebar and in search. */
export function titledSections(t: Topic): { index: number; section: Section; title: { bn: string; en: string } }[] {
  const out: { index: number; section: Section; title: { bn: string; en: string } }[] = [];
  t.sections.forEach((s, index) => {
    if ("title" in s && s.title && s.type !== "analogy" && s.type !== "callout") out.push({ index, section: s, title: s.title });
  });
  return out;
}
