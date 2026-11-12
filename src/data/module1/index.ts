import type { Module } from "../../types";
import { t } from "../helpers";
import { projectSetup } from "./projectSetup";
import { comments } from "./comments";

export const module1: Module = {
  id: "m1",
  number: 1,
  title: t("সেটআপ ও প্রথম প্রোগ্রাম", "Setup and first program"),
  description: t(
    "Python, VS Code, টার্মিনাল, pip, requirements.txt, ভার্চুয়াল এনভায়রনমেন্ট আর কমেন্ট।",
    "Python, VS Code, terminal, pip, requirements.txt, virtual environment and comments.",
  ),
  ready: true,
  topics: [projectSetup, comments],
};
