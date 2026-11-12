import type { Module } from "../../types";
import { t } from "../helpers";
import { ifElse } from "./ifElse";
import { forLoop } from "./forLoop";
import { whileLoop } from "./whileLoop";
import { nestedLoops } from "./nestedLoops";

export const module3: Module = {
  id: "m3",
  number: 3,
  title: t("সিদ্ধান্ত ও লুপ", "Decisions and loops"),
  description: t(
    "if/elif/else, ternary, for, range, while, break, continue, নেস্টেড লুপ।",
    "if/elif/else, ternary, for, range, while, break, continue, nested loops.",
  ),
  ready: true,
  topics: [ifElse, forLoop, whileLoop, nestedLoops],
};
