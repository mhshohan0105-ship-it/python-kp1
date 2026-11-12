import type { Module } from "../../types";
import { t } from "../helpers";
import { mixed34 } from "../mixed/mixed34";
import { indexSlice } from "./indexSlice";
import { stringMethods } from "./stringMethods";
import { stringFormatting } from "./stringFormatting";
import { dataStructures } from "./dataStructures";

export const module4: Module = {
  id: "m4",
  number: 4,
  title: t("স্ট্রিং ও কালেকশন", "Strings and collections"),
  description: t(
    "ইনডেক্সিং, স্লাইসিং, স্ট্রিং মেথড, f-string, list, tuple, set, frozenset, dict, bytearray।",
    "Indexing, slicing, string methods, f-strings, list, tuple, set, frozenset, dict, bytearray.",
  ),
  ready: true,
  topics: [indexSlice, stringMethods, stringFormatting, dataStructures, mixed34],
};
