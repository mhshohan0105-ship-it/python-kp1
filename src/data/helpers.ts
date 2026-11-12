import type { CodeLine, T } from "../types";

/** One code line with a Bangla and an English comment. */
export const L = (c: string, bn?: string, en?: string): CodeLine => ({ c, bn, en });

/** A bilingual text. */
export const t = (bn: string, en: string): T => ({ bn, en });
