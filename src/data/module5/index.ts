import type { Module } from "../../types";
import { t } from "../helpers";
import { functionsBasics } from "./functionsBasics";
import { returnVsPrint } from "./returnVsPrint";
import { argumentsScope } from "./argumentsScope";
import { argsKwargs } from "./argsKwargs";
import { lambdaSortedFilterMap } from "./lambdaSortedFilterMap";

export const module5: Module = {
  id: "m5",
  number: 5,
  title: t("ফাংশন, args, kwargs, lambda", "Functions, args, kwargs, lambda"),
  description: t(
    "def, return বনাম print, ডিফল্ট আর্গুমেন্ট, scope, *args, **kwargs, lambda, sorted, filter, map।",
    "def, return vs print, default arguments, scope, *args, **kwargs, lambda, sorted, filter, map.",
  ),
  ready: true,
  topics: [functionsBasics, returnVsPrint, argumentsScope, argsKwargs, lambdaSortedFilterMap],
};
