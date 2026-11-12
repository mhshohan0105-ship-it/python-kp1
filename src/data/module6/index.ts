import type { Module } from "../../types";
import { t } from "../helpers";
import { exceptions } from "./exceptions";
import { files } from "./files";
import { jsonTopic } from "./json";
import { xmlTopic } from "./xml";
import { mixed56 } from "../mixed/mixed56";

export const module6: Module = {
  id: "m6",
  number: 6,
  title: t("এক্সেপশন ও ফাইল", "Exceptions and files"),
  description: t(
    "try/except, raise, ফাইল পড়া-লেখা, JSON, XML।",
    "try/except, raise, reading and writing files, JSON, XML.",
  ),
  ready: true,
  topics: [exceptions, files, jsonTopic, xmlTopic, mixed56],
};
