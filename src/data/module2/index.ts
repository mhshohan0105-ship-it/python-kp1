import type { Module } from "../../types";
import { t } from "../helpers";
import { mixed12 } from "../mixed/mixed12";
import { dataTypes } from "./dataTypes";
import { typeCasting } from "./typeCasting";
import { operators } from "./operators";

export const module2: Module = {
  id: "m2",
  number: 2,
  title: t("পাইথনের মূল বিষয়", "Python basics"),
  description: t(
    "ডেটা টাইপ, টাইপ কাস্টিং আর অপারেটর — সব কিছুর ভিত্তি।",
    "Data types, type casting and operators — the foundation of everything.",
  ),
  ready: true,
  topics: [dataTypes, typeCasting, operators, mixed12],
};
