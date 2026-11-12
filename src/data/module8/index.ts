import type { Module } from "../../types";
import { t } from "../helpers";
import { pep8 } from "./pep8";
import { flake8 } from "./flake8";
import { mixed78 } from "../mixed/mixed78";

export const module8: Module = {
  id: "m8",
  number: 8,
  title: t("ক্লিন কোড", "Clean code"),
  description: t(
    "PEP8, Flake8, আর শেষে একটি মিক্সড ফাইনাল প্রজেক্ট।",
    "PEP8, Flake8 and a final mixed project.",
  ),
  ready: true,
  topics: [pep8, flake8, mixed78],
};
