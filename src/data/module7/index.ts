import type { Module } from "../../types";
import { t } from "../helpers";
import { classes } from "./classes";
import { methods } from "./methods";
import { principles } from "./principles";

export const module7: Module = {
  id: "m7",
  number: 7,
  title: t("অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং (OOP)", "Object oriented programming (OOP)"),
  description: t(
    "ক্লাস, অবজেক্ট, মেথড, ইনহেরিটেন্স, এনক্যাপসুলেশন, পলিমরফিজম, অ্যাবস্ট্রাকশন, Page Object Model।",
    "Classes, objects, methods, inheritance, encapsulation, polymorphism, abstraction, Page Object Model.",
  ),
  ready: true,
  topics: [classes, methods, principles],
};
