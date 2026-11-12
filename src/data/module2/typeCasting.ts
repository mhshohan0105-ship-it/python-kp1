import type { Topic } from "../../types";
import { L, t } from "../helpers";

export const typeCasting: Topic = {
  id: "type-casting",
  title: t("টাইপ কাস্টিং (টাইপ বদলানো)", "Type casting (changing types)"),
  estimatedMinutes: 55,
  sections: [
    {
      type: "text",
      title: t("টাইপ কাস্টিং কী?", "What is type casting?"),
      body: t(
        "আগের টপিকে দেখেছি `\"25\"` (str) আর `25` (int) আলাদা জিনিস। কিন্তু অনেক সময় একটাকে আরেকটায় **বদলাতে** হয়। যেমন ইউজার কিবোর্ডে \"25\" টাইপ করলো, আমাদের সেটা দিয়ে যোগ করতে হবে।\n\nএক টাইপ থেকে আরেক টাইপে বদলানোকেই বলে **type casting** বা **type conversion**।\n\nদুই রকম কাস্টিং আছে:\n- **Implicit (নিজে থেকে):** Python নিজেই বদলে দেয়।\n- **Explicit (আমরা বলে দিই):** আমরা `int()`, `float()`, `str()`, `bool()` লিখে বদলাই।",
        "In the last topic we saw that `\"25\"` (str) and `25` (int) are different. But often we need to **change** one into the other. For example, the user types \"25\" on the keyboard and we need to add with it.\n\nChanging a value from one type to another is called **type casting** or **type conversion**.\n\nThere are two kinds:\n- **Implicit (automatic):** Python changes it by itself.\n- **Explicit (we ask for it):** we write `int()`, `float()`, `str()`, `bool()`.",
      ),
    },
    {
      type: "analogy",
      emoji: "💱",
      title: t("মানি চেঞ্জারের দোকান", "The money changer"),
      body: t(
        "তুমি মানি চেঞ্জারে ১০০ ডলার দিলে, সে তোমাকে টাকা দেয়। **মূল্য একই থাকে, শুধু রূপ বদলায়।**\n\nকিন্তু তুমি যদি একটা **ছেঁড়া কাগজে \"১০০ ডলার\" লিখে** দাও, সে নেবে না — বলবে \"এটা আসল নোট না\"। Python-ও একই কাজ করে: `int(\"25\")` ঠিক আছে, কিন্তু `int(\"পঁচিশ\")` বা `int(\"abc\")` দিলে বলে **ValueError** — \"এই মান দিয়ে বদলানো যায় না\"।",
        "If you give 100 dollars to a money changer, you get taka back. **The value stays the same, only the form changes.**\n\nBut if you hand over a **piece of paper with \"100 dollars\" written on it**, the changer refuses — \"this is not a real note\". Python does the same: `int(\"25\")` is fine, but `int(\"abc\")` gives a **ValueError** — \"this value cannot be converted\".",
      ),
    },

    // ---------------------------------------------------------------- implicit
    {
      type: "text",
      title: t("ধাপ ১: Implicit casting — Python নিজেই বদলায়", "Step 1: Implicit casting — Python changes it for you"),
      body: t(
        "যখন int আর float একসাথে হিসাবে আসে, Python int-টাকে চুপচাপ float বানিয়ে নেয়। কারণ float-এ দশমিক রাখা যায়, তাই কোনো তথ্য হারায় না।\n\nনিয়মটা: **ছোট টাইপ বড় টাইপে উঠে যায়** → `bool` → `int` → `float`।",
        "When an int and a float meet in a calculation, Python quietly turns the int into a float. A float can hold decimals, so no information is lost.\n\nThe rule: **the smaller type is promoted to the bigger type** → `bool` → `int` → `float`.",
      ),
    },
    {
      type: "code",
      lines: [
        L("eggs = 12", "int", "int"),
        L("price = 10.5", "float", "float"),
        L("total = eggs * price", "int × float → Python নিজেই float বানায়", "int × float → Python makes it float"),
        L("print(total, type(total))", "ফল float", "the result is a float"),
        L("print(10 / 2)", "ভাগ (/) সবসময় float দেয়, এমনকি পুরো ভাগ গেলেও", "division (/) always gives a float, even when it divides evenly"),
        L("print(True + 5)", "True → 1 হয়ে যোগ হয়", "True becomes 1 and is added"),
      ],
      output: "126.0 <class 'float'>\n5.0\n6",
    },
    {
      type: "callout",
      variant: "warning",
      title: t("str-এর বেলায় implicit casting হয় না!", "No implicit casting with str!"),
      body: t(
        "Python **কখনো** নিজে থেকে লেখাকে সংখ্যা বা সংখ্যাকে লেখা বানায় না। `\"Age: \" + 25` লিখলে এরর। কারণ Python বুঝতে পারে না তুমি যোগ চাও নাকি জোড়া লাগানো চাও। তাই তোমাকে explicit ভাবে বলতে হবে।",
        "Python **never** turns text into a number (or a number into text) by itself. `\"Age: \" + 25` is an error. Python cannot guess whether you want to add or to join, so you must tell it explicitly.",
      ),
    },

    // ---------------------------------------------------------------- explicit
    {
      type: "text",
      title: t("ধাপ ২: Explicit casting — আমরা বলে দিই", "Step 2: Explicit casting — we tell Python"),
      body: t(
        "চারটা \"কনভার্টার\" ফাংশন মুখস্থ রাখো। টাইপের নামটাই ফাংশনের নাম:\n- `int(x)` → x-কে পূর্ণ সংখ্যা বানাও\n- `float(x)` → x-কে দশমিক সংখ্যা বানাও\n- `str(x)` → x-কে লেখা বানাও\n- `bool(x)` → x-কে True/False বানাও",
        "Remember four \"converter\" functions. The type's name is the function's name:\n- `int(x)` → make x a whole number\n- `float(x)` → make x a decimal number\n- `str(x)` → make x text\n- `bool(x)` → make x True/False",
      ),
    },
    {
      type: "code",
      title: t("int() — পূর্ণ সংখ্যায় বদলানো", "int() — converting to a whole number"),
      lines: [
        L('print(int("25"))', "লেখা \"25\" → সংখ্যা 25", "text \"25\" → number 25"),
        L("print(int(7.9))", "দশমিক অংশ কেটে ফেলে, রাউন্ড করে না!", "it CUTS the decimal part, it does not round!"),
        L("print(int(-7.9))", "এখানেও শুধু কাটে → -7", "here too it just cuts → -7"),
        L("print(int(True))", "True → 1", "True → 1"),
        L('print(int(" 42 "))', "আশেপাশের স্পেস নিজেই বাদ দেয়", "spaces around are ignored"),
      ],
      output: "25\n7\n-7\n1\n42",
      note: t(
        "`int(7.9)` হলো `7`, `8` না! রাউন্ড করতে চাইলে `round(7.9)` লেখো → `8`।",
        "`int(7.9)` is `7`, not `8`! To round, write `round(7.9)` → `8`.",
      ),
    },
    {
      type: "code",
      title: t("float() আর str()", "float() and str()"),
      lines: [
        L('print(float("7.5"))', "লেখা → দশমিক সংখ্যা", "text → decimal number"),
        L("print(float(3))", "int → float, শেষে .0 আসে", "int → float, .0 is added"),
        L("age = 25", "একটা int", "an int"),
        L('print("Age: " + str(age))', "str() দিয়ে লেখা বানিয়ে তারপর জোড়া লাগাও", "make it text with str(), then join"),
        L("print(str(3.5) + \"kg\")", "3.5 → \"3.5\" → \"3.5kg\"", "3.5 → \"3.5\" → \"3.5kg\""),
      ],
      output: "7.5\n3.0\nAge: 25\n3.5kg",
    },

    // ---------------------------------------------------------------- traps
    {
      type: "text",
      title: t("ধাপ ৩: ফাঁদ ১ — int(\"7.5\")", "Step 3: Trap 1 — int(\"7.5\")"),
      body: t(
        "`int(7.5)` চলে (দেয় 7), কিন্তু `int(\"7.5\")` চলে **না**! কেন?\n\n`int()` যখন **লেখা** পায়, তখন সে আশা করে লেখাটা দেখতে একদম পূর্ণ সংখ্যার মতো হবে — শুধু ডিজিট। `\"7.5\"`-এ একটা বিন্দু আছে, তাই সে হার মানে।\n\n**সমাধান:** দুই ধাপে বদলাও — আগে `float`, তারপর `int`:\n`int(float(\"7.5\"))` → `float(\"7.5\")` = `7.5` → `int(7.5)` = `7`",
        "`int(7.5)` works (gives 7), but `int(\"7.5\")` does **not**! Why?\n\nWhen `int()` gets **text**, it expects the text to look exactly like a whole number — only digits. `\"7.5\"` has a dot, so it gives up.\n\n**Fix:** convert in two steps — first `float`, then `int`:\n`int(float(\"7.5\"))` → `float(\"7.5\")` = `7.5` → `int(7.5)` = `7`",
      ),
    },
    {
      type: "code",
      lines: [
        L('price = int("7.5")', "লেখায় বিন্দু আছে → int() পারে না", "the text has a dot → int() cannot do it"),
      ],
      isError: true,
      output:
        "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    price = int(\"7.5\")\nValueError: invalid literal for int() with base 10: '7.5'",
      note: t(
        "এরর পড়ো: `ValueError` মানে **টাইপ ঠিক আছে (str), কিন্তু মানটা ভুল** — \"7.5\" লেখাটা পূর্ণ সংখ্যা না। `base 10` মানে সাধারণ দশভিত্তিক সংখ্যা।",
        "Read the error: `ValueError` means **the type is fine (str), but the value is wrong** — the text \"7.5\" is not a whole number. `base 10` just means normal decimal numbers.",
      ),
    },
    {
      type: "code",
      title: t("সঠিক উপায়", "The right way"),
      lines: [
        L('text = "7.5"', "ইউজারের দেওয়া লেখা", "text from the user"),
        L("price = int(float(text))", "ভেতর থেকে বাইরে: আগে float, তারপর int", "inside out: first float, then int"),
        L("", "          ↑ ধাপ ১: \"7.5\" → 7.5", "          ↑ step 1: \"7.5\" → 7.5"),
        L("", "      ↑ ধাপ ২: 7.5 → 7", "      ↑ step 2: 7.5 → 7"),
        L("print(price)", "7", "7"),
      ],
      output: "7",
    },
    {
      type: "text",
      title: t("ধাপ ৪: ফাঁদ ২ — bool(\"False\")", "Step 4: Trap 2 — bool(\"False\")"),
      body: t(
        "`bool()` কাজ করে খুব সহজ একটা নিয়মে: **\"খালি\" জিনিস False, বাকি সব True।**\n\nFalse হয় শুধু এগুলো: `0`, `0.0`, `\"\"` (খালি লেখা), `None`, `False`, আর খালি list/dict `[]`, `{}`।\n\nতাহলে `bool(\"False\")` কী? `\"False\"` একটা লেখা যাতে ৫টা অক্ষর আছে — খালি না! তাই উত্তর **True**। Python লেখার **মানে** পড়ে না, শুধু দেখে খালি কি না।",
        "`bool()` follows one simple rule: **\"empty\" things are False, everything else is True.**\n\nOnly these are False: `0`, `0.0`, `\"\"` (empty text), `None`, `False`, and empty list/dict `[]`, `{}`.\n\nSo what is `bool(\"False\")`? `\"False\"` is text with 5 letters — not empty! So the answer is **True**. Python does not read the **meaning** of the text; it only checks if it is empty.",
      ),
    },
    {
      type: "analogy",
      emoji: "📦",
      title: t("বাক্সে কিছু আছে কি না", "Is there anything in the box?"),
      body: t(
        "`bool()` একজন ডেলিভারিম্যানের মতো যে শুধু বাক্স ঝাঁকিয়ে দেখে ভেতরে কিছু আছে কি না। বাক্সের গায়ে \"খালি\" লেখা থাকলেও, ভেতরে যদি একটা কাগজ থাকে — সে বলবে \"হ্যাঁ, কিছু আছে\" (True)।",
        "`bool()` is like a delivery man who only shakes the box to see if anything is inside. Even if the box says \"EMPTY\" on it, if there is a piece of paper inside — he says \"yes, something is inside\" (True).",
      ),
    },
    {
      type: "code",
      lines: [
        L("print(bool(0))", "শূন্য → False", "zero → False"),
        L("print(bool(25))", "অন্য যেকোনো সংখ্যা → True", "any other number → True"),
        L("print(bool(-1))", "ঋণাত্মকও True!", "negative is True too!"),
        L('print(bool(""))', "খালি লেখা → False", "empty text → False"),
        L('print(bool(" "))', "একটা স্পেস আছে, খালি না → True", "it has one space, not empty → True"),
        L('print(bool("False"))', "৫ অক্ষরের লেখা → True (ফাঁদ!)", "5-letter text → True (trap!)"),
        L("print(bool(None))", "None → False", "None → False"),
      ],
      output: "False\nTrue\nTrue\nFalse\nTrue\nTrue\nFalse",
    },
    {
      type: "table",
      title: t("Truthy আর Falsy মান", "Truthy and falsy values"),
      headers: [t("Falsy (bool দিলে False)", "Falsy (bool gives False)"), t("Truthy (bool দিলে True)", "Truthy (bool gives True)")],
      codeCols: [0, 1],
      rows: [
        ["0, 0.0", "1, -1, 0.5, 100"],
        ['""', '" ", "0", "False", "abc"'],
        ["None", "[0], [None]"],
        ["False", "True"],
        ["[], {}, ()", "[1, 2], {'a': 1}"],
      ],
      caption: t(
        "লক্ষ্য করো: `\"0\"` আর `\"False\"` লেখা — তাই True। `[0]` list-এ একটা জিনিস আছে — তাই True।",
        "Notice: `\"0\"` and `\"False\"` are text — so True. `[0]` is a list with one item — so True.",
      ),
    },

    // ---------------------------------------------------------------- input
    {
      type: "text",
      title: t("ধাপ ৫: input() সবসময় str দেয়", "Step 5: input() always returns str"),
      body: t(
        "`input()` দিয়ে ইউজারের কাছ থেকে কিছু নেওয়া যায়। ইউজার \"25\" টাইপ করুক বা \"Rahim\" — `input()` **সবসময় str** ফেরত দেয়। কারণ কিবোর্ড থেকে যা আসে সবই অক্ষর।\n\nতাই সংখ্যা দিয়ে হিসাব করতে চাইলে **অবশ্যই** `int()` বা `float()` দিয়ে বদলাতে হবে।\n\n`input(\"Enter age: \")` — ব্র্যাকেটের লেখাটা ইউজারকে দেখানো প্রশ্ন (prompt)।",
        "`input()` takes something from the user. Whether the user types \"25\" or \"Rahim\" — `input()` **always** returns a str. Everything from the keyboard is characters.\n\nSo to calculate with a number you **must** convert it with `int()` or `float()`.\n\n`input(\"Enter age: \")` — the text in the brackets is the question (prompt) shown to the user.",
      ),
    },
    {
      type: "code",
      title: t("ভুল উপায়", "The wrong way"),
      lines: [
        L('age = input("Enter age: ")', "ইউজার 20 লিখলো → age = \"20\" (str!)", "user types 20 → age = \"20\" (str!)"),
        L("print(age + 1)", "str + int → এরর", "str + int → error"),
      ],
      isError: true,
      output:
        "Enter age: 20\nTraceback (most recent call last):\n  File \"main.py\", line 2, in <module>\n    print(age + 1)\n          ~~~~^~~\nTypeError: can only concatenate str (not \"int\") to str",
      note: t(
        "এরর মেসেজ বলছে: \"str-এর সাথে শুধু str জোড়া লাগানো যায় (int না)\"। `~~~~^~~` দেখাচ্ছে সমস্যা `+` চিহ্নে।",
        "The message says: \"you can only join str to str (not int)\". `~~~~^~~` points at the `+` sign.",
      ),
    },
    {
      type: "stepper",
      title: t("ঠিক উপায় — ধাপে ধাপে", "The right way — step by step"),
      code: [
        L('age_text = input("Enter age: ")', "ইউজার লিখলো 20", "the user types 20"),
        L("age = int(age_text)", "str → int", "str → int"),
        L("next_year = age + 1", "এখন যোগ করা যায়", "now we can add"),
        L('print("Next year you will be", next_year)', "ফল দেখাও", "show the result"),
      ],
      steps: [
        { line: 0, vars: { age_text: "'20'" }, out: "Enter age: 20", note: t("ইউজার `20` টাইপ করে Enter চাপলো। `age_text`-এ এলো `'20'` — কোটেশন দেখো, এটা **str**।", "The user typed `20` and pressed Enter. `age_text` got `'20'` — see the quotes, it is a **str**.") },
        { line: 1, vars: { age_text: "'20'", age: "20" }, note: t("`int('20')` লেখাটাকে সংখ্যা `20` বানালো। এবার কোটেশন নেই — এটা **int**।", "`int('20')` turned the text into the number `20`. No quotes now — it is an **int**.") },
        { line: 2, vars: { age_text: "'20'", age: "20", next_year: "21" }, note: t("`20 + 1 = 21`। সংখ্যা + সংখ্যা, কোনো এরর নেই।", "`20 + 1 = 21`. Number + number, no error.") },
        { line: 3, vars: { age_text: "'20'", age: "20", next_year: "21" }, out: "Next year you will be 21", note: t("print কমা দিয়ে লেখা আর সংখ্যা মিশিয়ে দেখালো।", "print mixes the text and the number using a comma.") },
      ],
    },
    {
      type: "code",
      title: t("ছোট করে এক লাইনে", "The short way in one line"),
      lines: [
        L('price = float(input("Price: "))', "input-এর ফল সরাসরি float()-এর ভেতরে", "the result of input goes straight into float()"),
        L("", "            ↑ ধাপ ১: ইউজারের লেখা (str)", "            ↑ step 1: the user's text (str)"),
        L("", "      ↑ ধাপ ২: str → float", "      ↑ step 2: str → float"),
        L("print(price * 2)", "এখন গুণ করা যায়", "now we can multiply"),
      ],
      output: "Price: 99.5\n199.0",
      note: t("ভেতরের ফাংশন আগে চলে, তারপর বাইরেরটা — ঠিক অঙ্কের ব্র্যাকেটের মতো।", "The inner function runs first, then the outer one — just like brackets in maths."),
    },

    // ---------------------------------------------------------------- summary table
    {
      type: "table",
      title: t("কাস্টিং চিট শিট", "Casting cheat sheet"),
      headers: [t("কোড", "Code"), t("ফল", "Result"), t("মন্তব্য", "Note")],
      codeCols: [0, 1],
      rows: [
        ['int("25")', "25", t("ঠিক আছে", "fine")],
        ["int(7.9)", "7", t("কাটে, রাউন্ড করে না", "cuts, does not round")],
        ['int("7.5")', "ValueError", t("ফাঁদ! int(float(...)) লেখো", "trap! use int(float(...))")],
        ['int("abc")', "ValueError", t("সংখ্যার মতো না", "not number-like")],
        ['int("")', "ValueError", t("খালি ইনপুট", "empty input")],
        ['float("7.5")', "7.5", t("ঠিক আছে", "fine")],
        ["float(3)", "3.0", t("শেষে .0", ".0 added")],
        ["str(25)", "'25'", t("জোড়া লাগানোর জন্য", "for joining text")],
        ['bool("False")', "True", t("ফাঁদ! খালি না", "trap! not empty")],
        ['bool("")', "False", t("খালি লেখা", "empty text")],
        ["bool(0)", "False", t("শূন্য", "zero")],
      ],
    },

    {
      type: "callout",
      variant: "qa",
      title: t("ইনপুট টেস্টিং: ইউজার কী কী লিখতে পারে?", "Input testing: what can a user type?"),
      body: t(
        "ধরো একটা ফর্মে বয়স লিখতে হবে, আর কোড `int(input())` ব্যবহার করে। একজন টেস্টার শুধু `25` দিয়ে টেস্ট করে না। সে চেষ্টা করে:\n- `25` → ঠিক আছে\n- `\" 25 \"` (স্পেসসহ) → ঠিক আছে, int() স্পেস বাদ দেয়\n- `25.5` → **ValueError**\n- `abc` → **ValueError**\n- খালি (কিছু না লিখে Enter) → **ValueError**\n- `-5` → এরর না, কিন্তু বয়স ঋণাত্মক হতে পারে না — **লজিক বাগ**!\n\nএকে বলে **negative testing** আর **empty input edge case**। মডিউল ৬-এ `try/except` দিয়ে এগুলো সামলানো শিখবো।",
        "Imagine a form asks for age, and the code uses `int(input())`. A tester does not only test `25`. They try:\n- `25` → fine\n- `\" 25 \"` (with spaces) → fine, int() strips spaces\n- `25.5` → **ValueError**\n- `abc` → **ValueError**\n- empty (press Enter without typing) → **ValueError**\n- `-5` → no error, but age cannot be negative — a **logic bug**!\n\nThis is called **negative testing** and the **empty input edge case**. In Module 6 we learn to handle these with `try/except`.",
      ),
    },

    {
      type: "mistakes",
      items: [
        {
          mistake: 'age = input("Age: ")\nprint(age + 1)',
          error: 'TypeError: can only concatenate str (not "int") to str',
          why: t("input() সবসময় str দেয়।", "input() always returns a str."),
          fix: 'age = int(input("Age: "))\nprint(age + 1)',
        },
        {
          mistake: 'x = int("7.5")',
          error: "ValueError: invalid literal for int() with base 10: '7.5'",
          why: t("লেখা থেকে int() শুধু পূর্ণ সংখ্যা বোঝে।", "From text, int() only understands whole numbers."),
          fix: 'x = int(float("7.5"))   # 7',
        },
        {
          mistake: 'print("Total: " + 500)',
          error: 'TypeError: can only concatenate str (not "int") to str',
          why: t("str আর int সরাসরি জোড়া লাগে না।", "str and int cannot be joined directly."),
          fix: 'print("Total: " + str(500))\nprint("Total:", 500)',
        },
        {
          mistake: 'answer = input("Agree? ")   # user types False\nif bool(answer): ...',
          error: t("এরর নেই, কিন্তু সবসময় True! (silent bug)", "No error, but always True! (silent bug)"),
          why: t("bool() শুধু খালি কি না দেখে, লেখার মানে না।", "bool() only checks for empty, not the meaning."),
          fix: 'agree = answer == "yes"',
        },
        {
          mistake: "print(int(9.99))   # expecting 10",
          error: t("এরর নেই, ফল 9", "No error, the result is 9"),
          why: t("int() দশমিক অংশ কেটে ফেলে।", "int() cuts off the decimal part."),
          fix: "print(round(9.99))   # 10",
        },
        {
          mistake: 'n = int("")',
          error: "ValueError: invalid literal for int() with base 10: ''",
          why: t("ইউজার কিছু না লিখে Enter চাপলে খালি str আসে।", "When the user presses Enter without typing, an empty str comes."),
          fix: 'try:\n    n = int(text)\nexcept ValueError:\n    print("Please type a number")',
        },
      ],
    },
    {
      type: "summary",
      body: t(
        "`input()` সবসময় str দেয় → হিসাবের আগে `int()`/`float()` দিয়ে বদলাও; `int(\"7.5\")` এরর তাই `int(float(\"7.5\"))`; আর `bool()` শুধু দেখে খালি কি না — তাই `bool(\"False\")` হলো True।",
        "`input()` always gives a str → convert with `int()`/`float()` before maths; `int(\"7.5\")` fails so use `int(float(\"7.5\"))`; and `bool()` only checks for empty — so `bool(\"False\")` is True.",
      ),
    },
  ],

  // ================================================================== PRACTICE
  practice: [
    {
      id: "tc-1",
      level: "easy",
      title: t("দুটো সংখ্যার যোগফল", "Sum of two numbers"),
      task: t("ইউজারের কাছ থেকে দুটো পূর্ণ সংখ্যা নাও এবং যোগফল প্রিন্ট করো।", "Take two whole numbers from the user and print their sum."),
      hint: t("প্রতিটি `input()`-কে `int()` দিয়ে মোড়াও। না হলে \"5\" + \"3\" = \"53\" হবে!", "Wrap each `input()` in `int()`. Otherwise \"5\" + \"3\" = \"53\"!"),
      sampleInput: "5\n3",
      expectedOutput: "First number: 5\nSecond number: 3\nSum: 8",
      solution: [
        L('a = int(input("First number: "))', "প্রথম সংখ্যা, str → int", "first number, str → int"),
        L('b = int(input("Second number: "))', "দ্বিতীয় সংখ্যা, str → int", "second number, str → int"),
        L('print("Sum:", a + b)', "এখন সত্যিকারের যোগ", "now a real addition"),
      ],
      explanation: t("int() ছাড়া দুটো লেখা জোড়া লেগে \"53\" হতো। int() দিয়ে বদলানোর পর 5 + 3 = 8।", "Without int() the two texts would join into \"53\". After converting, 5 + 3 = 8."),
    },
    {
      id: "tc-2",
      level: "easy",
      title: t("বয়স থেকে জন্মসাল", "Birth year from age"),
      task: t("ইউজারের বয়স নাও। ২০২৬ সাল ধরে আনুমানিক জন্মসাল প্রিন্ট করো।", "Ask the user's age. Assuming the year is 2026, print the approximate birth year."),
      hint: t("জন্মসাল = 2026 − বয়স।", "Birth year = 2026 − age."),
      sampleInput: "22",
      expectedOutput: "Your age: 22\nYou were born in 2004",
      solution: [
        L('age = int(input("Your age: "))', "বয়স সংখ্যা হিসেবে নিলাম", "take age as a number"),
        L("birth_year = 2026 - age", "বিয়োগ করে জন্মসাল", "subtract to get the birth year"),
        L('print("You were born in", birth_year)', "ফল দেখাও", "show the result"),
      ],
      explanation: t("int() না দিলে `2026 - \"22\"` TypeError দিতো।", "Without int(), `2026 - \"22\"` would give a TypeError."),
    },
    {
      id: "tc-3",
      level: "easy",
      title: t("সংখ্যাকে লেখার সাথে জোড়া", "Join a number with text"),
      task: t(
        "`items = 3` আর `total = 450` আছে। `+` চিহ্ন দিয়ে (কমা না!) এক লাইনে প্রিন্ট করো: `You bought 3 items for 450 taka`",
        "You have `items = 3` and `total = 450`. Using `+` (not commas!) print on one line: `You bought 3 items for 450 taka`",
      ),
      hint: t("প্রতিটি সংখ্যাকে `str()` দিয়ে লেখা বানাও, আর স্পেসগুলো খেয়াল রাখো।", "Turn each number into text with `str()`, and watch the spaces."),
      expectedOutput: "You bought 3 items for 450 taka",
      solution: [
        L("items = 3", "int", "int"),
        L("total = 450", "int", "int"),
        L('print("You bought " + str(items) + " items for " + str(total) + " taka")', "সব অংশ str হলে + দিয়ে জোড়া যায়", "when every part is str, + can join them"),
      ],
      explanation: t("`+` দিয়ে জোড়া লাগাতে হলে সব অংশ str হতে হবে। স্পেস নিজে থেকে বসে না — লেখার ভেতরে দিতে হয়।", "To join with `+`, every part must be a str. Spaces are not added for you — put them inside the text."),
    },
    {
      id: "tc-4",
      level: "easy",
      title: t("bool অনুমান করো", "Guess the bool"),
      task: t(
        "প্রথমে খাতায় অনুমান করো, তারপর প্রিন্ট করো: `bool(0)`, `bool(\"0\")`, `bool(0.0)`, `bool(\"\")`, `bool(\" \")`, `bool(None)`।",
        "Guess on paper first, then print: `bool(0)`, `bool(\"0\")`, `bool(0.0)`, `bool(\"\")`, `bool(\" \")`, `bool(None)`.",
      ),
      hint: t("খালি বা শূন্য → False। কোটেশনের ভেতরে কিছু থাকলে (স্পেস হলেও) → True।", "Empty or zero → False. Anything inside the quotes (even a space) → True."),
      expectedOutput: "False\nTrue\nFalse\nFalse\nTrue\nFalse",
      solution: [
        L("print(bool(0))", "শূন্য → False", "zero → False"),
        L('print(bool("0"))', "\"0\" একটা অক্ষর আছে → True", "\"0\" has one character → True"),
        L("print(bool(0.0))", "দশমিক শূন্য → False", "decimal zero → False"),
        L('print(bool(""))', "খালি লেখা → False", "empty text → False"),
        L('print(bool(" "))', "একটা স্পেস আছে → True", "has one space → True"),
        L("print(bool(None))", "None → False", "None → False"),
      ],
      explanation: t("`\"0\"` সংখ্যা শূন্য না — এটা একটা অক্ষরওয়ালা লেখা। তাই True।", "`\"0\"` is not the number zero — it is text with one character. So True."),
    },
    {
      id: "tc-5",
      level: "medium",
      title: t("দোকানের বিল", "Shop bill"),
      task: t(
        "ইউজারের কাছ থেকে প্রতি কেজি চালের দাম (দশমিক হতে পারে) আর কত কেজি (পূর্ণ সংখ্যা) নাও। মোট দাম প্রিন্ট করো।",
        "Ask the user for the price of rice per kg (may have decimals) and how many kg (whole number). Print the total.",
      ),
      hint: t("দামের জন্য `float()`, কেজির জন্য `int()`।", "Use `float()` for the price and `int()` for the kg."),
      sampleInput: "68.5\n4",
      expectedOutput: "Price per kg: 68.5\nHow many kg: 4\nTotal: 274.0 taka",
      solution: [
        L('price = float(input("Price per kg: "))', "দাম দশমিক হতে পারে → float", "price may be decimal → float"),
        L('kg = int(input("How many kg: "))', "কেজি পূর্ণ সংখ্যা → int", "kg is whole → int"),
        L("total = price * kg", "float × int → float", "float × int → float"),
        L('print("Total:", total, "taka")', "ফল দেখাও", "show the result"),
      ],
      explanation: t("ভুল কনভার্টার বাছলে সমস্যা: দামের জন্য `int(\"68.5\")` দিলে ValueError হতো।", "Choosing the wrong converter causes trouble: `int(\"68.5\")` for the price would be a ValueError."),
    },
    {
      id: "tc-6",
      level: "medium",
      title: t("int(\"7.5\") ফাঁদ এড়াও", "Avoid the int(\"7.5\") trap"),
      task: t(
        "ইউজার একটা নম্বর দেবে যেটা দশমিক হতে পারে (যেমন `7.5`)। নম্বরটার পূর্ণ সংখ্যা অংশ আর রাউন্ড করা মান দুটোই প্রিন্ট করো।",
        "The user enters a number that may be decimal (like `7.5`). Print its whole-number part and its rounded value.",
      ),
      hint: t("`int(float(text))` দেয় কাটা অংশ, `round(float(text))` দেয় রাউন্ড করা মান।", "`int(float(text))` gives the cut part, `round(float(text))` gives the rounded value."),
      sampleInput: "7.8",
      expectedOutput: "Number: 7.8\nWhole part: 7\nRounded: 8",
      solution: [
        L('text = input("Number: ")', "ইউজারের লেখা, যেমন \"7.8\"", "the user's text, e.g. \"7.8\""),
        L("num = float(text)", "আগে float — বিন্দুওয়ালা লেখা float বোঝে", "first float — float understands the dot"),
        L('print("Whole part:", int(num))', "int() দশমিক কেটে ফেলে → 7", "int() cuts the decimal → 7"),
        L('print("Rounded:", round(num))', "round() কাছের পূর্ণ সংখ্যা → 8", "round() goes to the nearest whole → 8"),
      ],
      explanation: t("সরাসরি `int(\"7.8\")` লিখলে ValueError। তাই আগে float, তারপর int বা round।", "Writing `int(\"7.8\")` directly is a ValueError. So first float, then int or round."),
    },
    {
      id: "tc-7",
      level: "medium",
      title: t("বাস ভাড়া ভাগাভাগি", "Splitting the bus fare"),
      task: t(
        "মোট বাস ভাড়া আর কতজন বন্ধু — দুটোই ইউজার দেবে। প্রত্যেকে কত দেবে তা ২ দশমিক ঘরে রাউন্ড করে প্রিন্ট করো।",
        "The user gives the total bus fare and the number of friends. Print how much each pays, rounded to 2 decimal places.",
      ),
      hint: t("`/` সবসময় float দেয়। `round(x, 2)` দিয়ে দুই ঘর রাখো।", "`/` always gives a float. Use `round(x, 2)` to keep two places."),
      sampleInput: "250\n3",
      expectedOutput: "Total fare: 250\nFriends: 3\nEach pays: 83.33",
      solution: [
        L('fare = float(input("Total fare: "))', "ভাড়া — float", "fare — float"),
        L('friends = int(input("Friends: "))', "মানুষ গোনা যায় — int", "people are counted — int"),
        L("each = fare / friends", "250 / 3 = 83.333...", "250 / 3 = 83.333..."),
        L('print("Each pays:", round(each, 2))', "২ ঘরে রাউন্ড", "round to 2 places"),
      ],
      explanation: t("`/` এর ফল implicit ভাবে float হয়। দেখানোর সময় round করলে টাকার মতো দেখায়।", "The result of `/` is implicitly a float. Rounding makes it look like money."),
    },
    {
      id: "tc-8",
      level: "medium",
      title: t("ইনপুটের টাইপ দেখাও", "Show the type of the input"),
      task: t(
        "ইউজার যা খুশি লিখুক। লেখাটা আর তার টাইপ প্রিন্ট করো। তারপর সেটাকে `float`-এ বদলে মান আর টাইপ আবার প্রিন্ট করো।",
        "Let the user type anything. Print it and its type. Then convert it to `float` and print the value and type again.",
      ),
      hint: t("প্রথম টাইপটা সবসময় str হবে — ইউজার যা-ই লিখুক।", "The first type will always be str — no matter what the user types."),
      sampleInput: "42",
      expectedOutput: "Type something: 42\n42 <class 'str'>\n42.0 <class 'float'>",
      solution: [
        L('data = input("Type something: ")', "যা-ই লিখুক, str আসে", "whatever is typed, a str comes"),
        L("print(data, type(data))", "প্রমাণ: str", "proof: str"),
        L("value = float(data)", "str → float", "str → float"),
        L("print(value, type(value))", "এখন float", "now float"),
      ],
      explanation: t("এটা প্রমাণ করে `input()` সবসময় str দেয়, এমনকি ইউজার শুধু ডিজিট লিখলেও।", "This proves `input()` always returns str, even when the user types only digits."),
    },
    {
      id: "tc-9",
      level: "medium",
      title: t("মোবাইল ব্যাটারি", "Mobile battery"),
      task: t(
        "ব্যাটারি এখন কত শতাংশ (int) আর প্রতি ঘণ্টায় কত শতাংশ কমে (float) — ইউজার দেবে। কত ঘণ্টা চলবে প্রিন্ট করো, ১ দশমিক ঘরে।",
        "The user gives the current battery percent (int) and how many percent it drops per hour (float). Print how many hours it will last, to 1 decimal place.",
      ),
      hint: t("ঘণ্টা = ব্যাটারি ÷ প্রতি ঘণ্টায় খরচ।", "Hours = battery ÷ drain per hour."),
      sampleInput: "80\n12.5",
      expectedOutput: "Battery %: 80\nDrain per hour: 12.5\nHours left: 6.4",
      solution: [
        L('battery = int(input("Battery %: "))', "শতাংশ পূর্ণ সংখ্যা", "percent is whole"),
        L('drain = float(input("Drain per hour: "))', "খরচ দশমিক হতে পারে", "drain may be decimal"),
        L("hours = battery / drain", "80 / 12.5 = 6.4", "80 / 12.5 = 6.4"),
        L('print("Hours left:", round(hours, 1))', "১ ঘরে রাউন্ড", "round to 1 place"),
      ],
      explanation: t("int ÷ float → float (implicit casting)। round(x, 1) এক দশমিক ঘর রাখে।", "int ÷ float → float (implicit casting). round(x, 1) keeps one decimal place."),
    },
    {
      id: "tc-10",
      level: "hard",
      title: t("ডেলিভারি চার্জ", "Delivery charge"),
      task: t(
        "একটা কুরিয়ার প্রথম কেজির জন্য ৬০ টাকা আর প্রতি অতিরিক্ত পূর্ণ কেজির জন্য ১৫ টাকা নেয়। ইউজার পার্সেলের ওজন দেবে (যেমন `3.7`)। অতিরিক্ত কেজি হিসাব করো দশমিক কেটে ফেলে, তারপর মোট চার্জ প্রিন্ট করো।\n\n(এখনো if শিখিনি, তাই ধরে নাও ওজন সবসময় ১ কেজি বা বেশি।)",
        "A courier charges 60 taka for the first kg and 15 taka for every extra whole kg. The user gives the parcel weight (e.g. `3.7`). Calculate the extra kg by cutting off the decimal, then print the total charge.\n\n(We have not learned if yet, so assume the weight is always 1 kg or more.)",
      ),
      hint: t("অতিরিক্ত কেজি = `int(weight) - 1`। 3.7 → int → 3 → 3 − 1 = 2 অতিরিক্ত কেজি।", "Extra kg = `int(weight) - 1`. 3.7 → int → 3 → 3 − 1 = 2 extra kg."),
      sampleInput: "3.7",
      expectedOutput: "Weight (kg): 3.7\nExtra kg: 2\nDelivery charge: 90 taka",
      solution: [
        L('weight = float(input("Weight (kg): "))', "ওজন দশমিক → float", "weight is decimal → float"),
        L("extra = int(weight) - 1", "int(3.7)=3, প্রথম কেজি বাদ → 2", "int(3.7)=3, minus the first kg → 2"),
        L("charge = 60 + extra * 15", "60 + 2×15 = 90 (গুণ আগে হয়)", "60 + 2×15 = 90 (multiply happens first)"),
        L('print("Extra kg:", extra)', "অতিরিক্ত কেজি", "extra kg"),
        L('print("Delivery charge:", charge, "taka")', "মোট চার্জ", "total charge"),
      ],
      explanation: t(
        "এখানে int()-এর \"কেটে ফেলা\" স্বভাবটাই আমাদের দরকার ছিল — ৩.৭ কেজিকে ৩ পূর্ণ কেজি ধরা। কোন জায়গায় কাটা আর কোন জায়গায় রাউন্ড চাই, সেটা নিয়ম পড়ে ঠিক করতে হয়।",
        "Here the \"cutting\" behaviour of int() is exactly what we need — 3.7 kg counts as 3 whole kg. Read the business rule to decide whether you need cutting or rounding.",
      ),
    },
    {
      id: "tc-11",
      level: "hard",
      title: t("শতাংশ ডিসকাউন্ট", "Percentage discount"),
      task: t(
        "ইউজার বিলের পরিমাণ আর ডিসকাউন্ট শতাংশ দেবে (দুটোই দশমিক হতে পারে)। ডিসকাউন্টের টাকা আর পরিশোধযোগ্য টাকা প্রিন্ট করো, দুটোই ২ ঘরে রাউন্ড করে।",
        "The user gives the bill amount and discount percent (both may be decimal). Print the discount amount and the amount to pay, both rounded to 2 places.",
      ),
      hint: t("ডিসকাউন্ট = বিল × শতাংশ ÷ 100।", "Discount = bill × percent ÷ 100."),
      sampleInput: "1250\n12.5",
      expectedOutput: "Bill: 1250\nDiscount %: 12.5\nDiscount: 156.25\nTo pay: 1093.75",
      solution: [
        L('bill = float(input("Bill: "))', "বিল", "bill"),
        L('percent = float(input("Discount %: "))', "শতাংশ", "percent"),
        L("discount = bill * percent / 100", "1250 × 12.5 ÷ 100 = 156.25", "1250 × 12.5 ÷ 100 = 156.25"),
        L("to_pay = bill - discount", "1250 − 156.25 = 1093.75", "1250 − 156.25 = 1093.75"),
        L('print("Discount:", round(discount, 2))', "২ ঘরে", "2 places"),
        L('print("To pay:", round(to_pay, 2))', "২ ঘরে", "2 places"),
      ],
      explanation: t("দুটো ইনপুটই float কারণ দশমিক আসতে পারে। হিসাবের পরে শুধু দেখানোর সময় round করি।", "Both inputs are float because decimals may come. We round only when showing the result."),
    },
    {
      id: "tc-12",
      level: "hard",
      title: t("সেকেন্ড থেকে মিনিট-সেকেন্ড", "Seconds to minutes and seconds"),
      task: t(
        "ইউজার একটা ভিডিওর দৈর্ঘ্য সেকেন্ডে দেবে, কিন্তু ভুল করে দশমিক দিতে পারে (যেমন `135.9`)। দশমিক কেটে ফেলে মিনিট আর বাকি সেকেন্ড প্রিন্ট করো।",
        "The user gives a video length in seconds, but may mistakenly add a decimal (e.g. `135.9`). Cut off the decimal and print minutes and remaining seconds.",
      ),
      hint: t("`int(float(text))` তারপর `// 60` আর `% 60`। (এই দুটো অপারেটর পরের টপিকে বিস্তারিত।)", "`int(float(text))` then `// 60` and `% 60`. (These operators are explained in the next topic.)"),
      sampleInput: "135.9",
      expectedOutput: "Seconds: 135.9\n2 min 15 sec",
      solution: [
        L('total = int(float(input("Seconds: ")))', "\"135.9\" → 135.9 → 135", "\"135.9\" → 135.9 → 135"),
        L("minutes = total // 60", "135 এর ভেতর কয়টা পুরো 60? → 2", "how many full 60s in 135? → 2"),
        L("seconds = total % 60", "বাকি থাকে → 15", "the remainder → 15"),
        L('print(minutes, "min", seconds, "sec")', "ফল দেখাও", "show the result"),
      ],
      explanation: t("তিন ধাপের কনভার্শন: str → float → int। তারপর ভাগফল আর ভাগশেষ দিয়ে মিনিট-সেকেন্ড।", "A three-step conversion: str → float → int. Then quotient and remainder give minutes and seconds."),
    },
    {
      id: "tc-13",
      level: "qa",
      title: t("বয়স ইনপুটের টেস্ট কেস", "Test cases for an age input"),
      task: t(
        "একটা ফর্মে কোড আছে: `age = int(input(\"Age: \"))`। প্রতিটি ইনপুটের জন্য **expected result** লেখো, তারপর একটা একটা করে চালিয়ে **actual result** মিলাও। একটা ছোট প্রোগ্রাম লেখো যেটা `int()`-এর ফল বা ValueError-এর মেসেজ দেখায় (মডিউল ৬-এর try/except এখানে একটু আগে দেখে নিচ্ছি)।",
        "A form has the code: `age = int(input(\"Age: \"))`. For each input, write the **expected result**, then run one by one and compare the **actual result**. Write a small program that shows the result of `int()` or the ValueError message (we peek at try/except from Module 6 here).",
      ),
      hint: t("`try:` এর ভেতরে `int(value)`। `except ValueError as e:` এ `e` প্রিন্ট করো।", "Put `int(value)` inside `try:`. In `except ValueError as e:` print `e`."),
      boundary: [
        { input: '"25"', expected: "25", why: t("সাধারণ সঠিক ইনপুট", "normal valid input") },
        { input: '" 25 "', expected: "25", why: t("int() আশেপাশের স্পেস বাদ দেয়", "int() strips surrounding spaces") },
        { input: '"0"', expected: "0", why: t("নিচের সীমা — চলে, কিন্তু ০ বছর বয়স যুক্তিসঙ্গত?", "lower boundary — works, but is age 0 sensible?") },
        { input: '"-5"', expected: "-5", why: t("এরর নেই, কিন্তু লজিক বাগ", "no error, but a logic bug") },
        { input: '"25.5"', expected: "ValueError", why: t("int(\"7.5\") ফাঁদ", "the int(\"7.5\") trap") },
        { input: '"abc"', expected: "ValueError", why: t("সংখ্যা না", "not a number") },
        { input: '""', expected: "ValueError", why: t("খালি ইনপুট", "empty input") },
      ],
      expectedOutput:
        "'25' -> 25\n' 25 ' -> 25\n'0' -> 0\n'-5' -> -5\n'25.5' -> ValueError: invalid literal for int() with base 10: '25.5'\n'abc' -> ValueError: invalid literal for int() with base 10: 'abc'\n'' -> ValueError: invalid literal for int() with base 10: ''",
      solution: [
        L('tests = ["25", " 25 ", "0", "-5", "25.5", "abc", ""]', "টেস্ট ডেটা: ইউজার যা যা লিখতে পারে", "test data: what users might type"),
        L("for value in tests:", "প্রতিটি মান একটা একটা করে (লুপ মডিউল ৩-এ)", "each value one by one (loops in Module 3)"),
        L("    try:", "চেষ্টা করো…", "try…"),
        L("        print(repr(value), \"->\", int(value))", "repr() কোটেশনসহ দেখায়, যাতে স্পেস বোঝা যায়", "repr() shows quotes so spaces are visible"),
        L("    except ValueError as e:", "…এরর হলে এখানে আসো", "…if there is an error, come here"),
        L("        print(repr(value), \"->\", \"ValueError:\", e)", "এররের মেসেজ দেখাও", "show the error message"),
      ],
      explanation: t(
        "এটাই **data-driven testing**-এর ছোট রূপ: টেস্ট ডেটার একটা লিস্ট, আর প্রতিটির জন্য একই কোড চলে। লক্ষ্য করো `\"-5\"` কোনো এরর দেয়নি — কিন্তু বয়স ঋণাত্মক হতে পারে না। এরর না আসা মানেই কোড ঠিক না। এটাকে বলে **silent failure**।",
        "This is a tiny form of **data-driven testing**: a list of test data and the same code runs for each. Notice `\"-5\"` gave no error — but age cannot be negative. No error does not mean correct code. This is a **silent failure**.",
      ),
    },
  ],

  quiz: [
    {
      question: t("`input()` কোন টাইপ ফেরত দেয়?", "What type does `input()` return?"),
      options: ["int", t("ইউজার যা লেখে সেই টাইপ", "whatever the user types"), "str", "float"],
      correctIndex: 2,
      explanation: t("সবসময় str। ইউজার 25 লিখলেও আসে \"25\"।", "Always str. Even if the user types 25, you get \"25\"."),
    },
    {
      question: t("`int(\"7.5\")` চালালে কী হবে?", "What happens with `int(\"7.5\")`?"),
      options: ["7", "8", "7.5", "ValueError"],
      correctIndex: 3,
      explanation: t("লেখা থেকে int() শুধু পূর্ণ সংখ্যার লেখা বোঝে। `int(float(\"7.5\"))` লিখতে হবে।", "From text, int() only accepts whole-number text. Use `int(float(\"7.5\"))`."),
    },
    {
      question: t("`bool(\"False\")` এর মান কী?", "What is `bool(\"False\")`?"),
      options: ["False", "True", "None", "Error"],
      correctIndex: 1,
      explanation: t("লেখাটা খালি না (৫টা অক্ষর), তাই True।", "The text is not empty (5 letters), so True."),
    },
    {
      question: t("`int(9.99)` এর ফল কী?", "What is `int(9.99)`?"),
      options: ["10", "9", "9.99", "ValueError"],
      correctIndex: 1,
      explanation: t("int() দশমিক কাটে, রাউন্ড করে না।", "int() cuts the decimal; it does not round."),
    },
    {
      question: t("`print(3 + 2.0)` কী দেখাবে?", "What does `print(3 + 2.0)` show?"),
      options: ["5", "5.0", "32.0", "TypeError"],
      correctIndex: 1,
      explanation: t("int + float হলে Python implicit ভাবে float বানায়।", "int + float → Python implicitly makes it a float."),
    },
    {
      question: t("কোনটা False দেবে?", "Which one gives False?"),
      options: ['bool(" ")', 'bool("0")', "bool(0.0)", "bool(-1)"],
      correctIndex: 2,
      explanation: t("শুধু শূন্য সংখ্যা False। \" \" আর \"0\" খালি না, -1 শূন্য না।", "Only the number zero is False. \" \" and \"0\" are not empty, -1 is not zero."),
    },
    {
      question: t("`\"Total: \" + 50` ঠিক করার সঠিক উপায় কোনটা?", "What is a correct way to fix `\"Total: \" + 50`?"),
      options: ['"Total: " + str(50)', '"Total: " + int(50)', 'int("Total: ") + 50', '"Total: " + "50" + 0'],
      correctIndex: 0,
      explanation: t("জোড়া লাগাতে দুটোই str হতে হবে, তাই str(50)।", "To join, both must be str, so str(50)."),
    },
    {
      question: t("ইউজার কিছু না লিখে Enter চাপলে `int(input())` কী দেবে?", "If the user just presses Enter, what does `int(input())` give?"),
      options: ["0", "None", "ValueError", "False"],
      correctIndex: 2,
      explanation: t("খালি str `\"\"` কে int বানানো যায় না → ValueError। এটাই empty input edge case।", "An empty str `\"\"` cannot become an int → ValueError. This is the empty input edge case."),
    },
  ],
};
