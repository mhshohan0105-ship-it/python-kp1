import type { Topic } from "../../types";
import { L, t } from "../helpers";

export const dataTypes: Topic = {
  id: "data-types",
  title: t("ডেটা টাইপ", "Data types"),
  estimatedMinutes: 50,
  sections: [
    // ---------------------------------------------------------------- intro
    {
      type: "text",
      title: t("ডেটা টাইপ কী?", "What is a data type?"),
      body: t(
        "তুমি ইতিমধ্যে ভেরিয়েবল আর `print()` জানো। যেমন `age = 25`।\n\nকিন্তু খেয়াল করো — সব তথ্য একরকম না। কেউ বয়স বলে **২৫**, কেউ ওজন বলে **৬২.৫ কেজি**, কেউ নাম বলে **\"রহিম\"**, কেউ বলে দোকান খোলা **হ্যাঁ/না**।\n\nPython-এর কাছে প্রতিটি মানের একটা **ধরন (type)** থাকে। ধরন দেখে Python ঠিক করে ওই মান দিয়ে কী কী করা যায়। যেমন দুটো সংখ্যা যোগ করা যায়, কিন্তু একটা নাম আর একটা সংখ্যা যোগ করা যায় না।",
        "You already know variables and `print()`. For example `age = 25`.\n\nBut notice — not all information is the same kind. Someone tells their age as **25**, weight as **62.5 kg**, name as **\"Rahim\"**, or says the shop is open: **yes/no**.\n\nIn Python every value has a **type**. The type tells Python what you can do with that value. You can add two numbers, but you cannot add a name and a number.",
      ),
    },
    {
      type: "analogy",
      emoji: "🏪",
      title: t("মুদি দোকানের তাক", "The grocery shop shelf"),
      body: t(
        "একটা মুদি দোকানের কথা ভাবো:\n- **ডিম** গুনে বিক্রি হয়: ১২টা, ৩০টা। ভগ্নাংশ নেই → এটা **int** (পূর্ণ সংখ্যা)।\n- **চাল** মেপে বিক্রি হয়: ২.৫ কেজি → এটা **float** (দশমিক সংখ্যা)।\n- প্যাকেটের গায়ে লেখা **নাম**: \"মিনিকেট চাল\" → এটা **str** (লেখা)।\n- দোকান খোলা কি না: **হ্যাঁ / না** → এটা **bool** (True / False)।\n- একটা খালি তাক, যেখানে লেবেল আছে কিন্তু কিছু নেই → এটা **None** (কিছুই নেই)।\n\nদোকানদার জানে কোন জিনিস গুনতে হয়, কোনটা মাপতে হয়। Python-ও টাইপ দেখে বোঝে মানটা দিয়ে কী করতে হবে।",
        "Think about a grocery shop:\n- **Eggs** are counted: 12, 30. No fractions → that is an **int** (whole number).\n- **Rice** is measured: 2.5 kg → that is a **float** (decimal number).\n- The **name** written on a packet: \"Miniket rice\" → that is a **str** (text).\n- Is the shop open? **Yes / No** → that is a **bool** (True / False).\n- An empty shelf that has a label but nothing on it → that is **None** (nothing).\n\nThe shopkeeper knows what to count and what to weigh. Python also looks at the type to know what to do with a value.",
      ),
    },

    // ---------------------------------------------------------------- int
    {
      type: "text",
      title: t("ধাপ ১: int — পূর্ণ সংখ্যা", "Step 1: int — whole numbers"),
      body: t(
        "**int** মানে integer, অর্থাৎ পূর্ণ সংখ্যা। দশমিক বিন্দু নেই। ধনাত্মক, ঋণাত্মক বা শূন্য হতে পারে।\n\nকোনো মানের টাইপ জানতে Python-এ আছে `type()` ফাংশন। এটা আমাদের সবচেয়ে কাজের বন্ধু।",
        "**int** means integer, a whole number. No decimal point. It can be positive, negative or zero.\n\nTo know the type of any value, Python has the `type()` function. It will be our best friend.",
      ),
    },
    {
      type: "code",
      lines: [
        L("eggs = 12", "eggs ভেরিয়েবলে 12 রাখলাম — পূর্ণ সংখ্যা", "store 12 in eggs — a whole number"),
        L("temperature = -3", "ঋণাত্মক সংখ্যাও int", "negative numbers are int too"),
        L("population = 170_000_000", "বড় সংখ্যায় _ দিলে পড়তে সহজ, মান একই", "_ makes big numbers easy to read, value is the same"),
        L("print(eggs)", "eggs-এর মান দেখাও", "show the value of eggs"),
        L("print(type(eggs))", "eggs-এর টাইপ দেখাও", "show the type of eggs"),
        L("print(temperature, population)", "দুটো মান একসাথে, মাঝে স্পেস", "two values together, space between"),
      ],
      output: "12\n<class 'int'>\n-3 170000000",
      note: t(
        "`<class 'int'>` মানে: \"এই মানটা int জাতের\"। `class` শব্দটা নিয়ে এখন ভাবতে হবে না — OOP মডিউলে শিখবো।",
        "`<class 'int'>` means: \"this value is of kind int\". Don't worry about the word `class` now — we learn it in the OOP module.",
      ),
    },

    // ---------------------------------------------------------------- float
    {
      type: "text",
      title: t("ধাপ ২: float — দশমিক সংখ্যা", "Step 2: float — decimal numbers"),
      body: t(
        "যে সংখ্যায় দশমিক বিন্দু (`.`) আছে, সেটাই **float**। ওজন, দাম, তাপমাত্রা, শতাংশ — এসব সাধারণত float।\n\nমনে রাখো: `5` হলো int, কিন্তু `5.0` হলো float। দেখতে একই সংখ্যা, কিন্তু টাইপ আলাদা!",
        "A number with a decimal point (`.`) is a **float**. Weight, price, temperature, percentage — these are usually floats.\n\nRemember: `5` is an int, but `5.0` is a float. Same number to our eyes, different type!",
      ),
    },
    {
      type: "code",
      lines: [
        L("rice_kg = 2.5", "আড়াই কেজি চাল — দশমিক আছে, তাই float", "2.5 kg rice — has a decimal, so float"),
        L("price = 5.0", ".0 থাকলেও float", "even with .0 it is a float"),
        L("print(type(rice_kg))", "টাইপ দেখি", "check the type"),
        L("print(type(price))", "এটাও float", "this is float too"),
        L("print(type(5))", "দশমিক ছাড়া 5 → int", "5 without a decimal → int"),
        L("print(0.1 + 0.2)", "অবাক হবে! নিচে দেখো", "surprise! see below"),
      ],
      output: "<class 'float'>\n<class 'float'>\n<class 'int'>\n0.30000000000000004",
      note: t(
        "`0.1 + 0.2` ঠিক `0.3` হয় না! কম্পিউটার দশমিক সংখ্যা বাইনারিতে রাখে, তাই খুব ছোট একটা ভুল থাকে। টাকা-পয়সার হিসাবে `round(x, 2)` ব্যবহার করো। টেস্টে কখনো float দুটো সরাসরি `==` দিয়ে তুলনা করো না।",
        "`0.1 + 0.2` is not exactly `0.3`! The computer stores decimals in binary, so a tiny error appears. For money, use `round(x, 2)`. In tests, never compare two floats directly with `==`.",
      ),
    },

    // ---------------------------------------------------------------- str
    {
      type: "text",
      title: t("ধাপ ৩: str — লেখা (string)", "Step 3: str — text (string)"),
      body: t(
        "**str** (string) মানে লেখা। নাম, ঠিকানা, মেসেজ, মোবাইল নম্বর — সব str। লেখাকে কোটেশনের ভেতরে রাখতে হয়: `\"...\"` অথবা `'...'` — দুটোই চলে।\n\n**সবচেয়ে গুরুত্বপূর্ণ কথা:** `5` আর `\"5\"` এক জিনিস না! প্রথমটা সংখ্যা, দ্বিতীয়টা লেখা যেটা দেখতে 5-এর মতো।",
        "**str** (string) means text. Name, address, message, phone number — all str. Text must be inside quotes: `\"...\"` or `'...'` — both work.\n\n**The most important thing:** `5` and `\"5\"` are not the same! The first is a number, the second is text that looks like 5.",
      ),
    },
    {
      type: "code",
      lines: [
        L('name = "Rahim"', "ডাবল কোটেশনে লেখা", "text in double quotes"),
        L("city = 'Dhaka'", "সিঙ্গেল কোটেশনেও চলে", "single quotes work too"),
        L('phone = "01712345678"', "ফোন নম্বর str — শুরুর 0 যেন হারিয়ে না যায়", "phone is str — so the leading 0 is not lost"),
        L('a = "5"', "এটা লেখা, সংখ্যা না", "this is text, not a number"),
        L("b = 5", "এটা সংখ্যা", "this is a number"),
        L("print(type(a), type(b))", "দুটোর টাইপ পাশাপাশি", "both types side by side"),
        L("print(a + a)", "দুটো লেখা জোড়া লাগে → 55", "two texts get joined → 55"),
        L("print(b + b)", "দুটো সংখ্যা যোগ হয় → 10", "two numbers get added → 10"),
        L("print(len(name))", "len() লেখার অক্ষর গোনে", "len() counts the characters"),
      ],
      output: "<class 'str'> <class 'int'>\n55\n10\n5",
      note: t(
        "`\"5\" + \"5\"` = `\"55\"` (জোড়া লাগানো), কিন্তু `5 + 5` = `10` (যোগ)। একই `+` চিহ্ন, টাইপ আলাদা বলে কাজ আলাদা।",
        "`\"5\" + \"5\"` = `\"55\"` (joined), but `5 + 5` = `10` (added). Same `+` sign, different work because the types are different.",
      ),
    },

    // ---------------------------------------------------------------- bool
    {
      type: "text",
      title: t("ধাপ ৪: bool — হ্যাঁ অথবা না", "Step 4: bool — yes or no"),
      body: t(
        "**bool** (boolean)-এর মাত্র দুটো মান: `True` আর `False`। লাইটের সুইচের মতো — হয় অন, নয় অফ। মাঝামাঝি কিছু নেই।\n\nসাবধান: প্রথম অক্ষর বড় হাতের — `True`, `False`। `true` লিখলে এরর হবে।\n\nকোনো তুলনা করলে (যেমন `age >= 18`) উত্তর আসে bool হিসেবে।",
        "**bool** (boolean) has only two values: `True` and `False`. Like a light switch — either on or off. Nothing in between.\n\nCareful: the first letter is capital — `True`, `False`. Writing `true` gives an error.\n\nWhen you compare things (like `age >= 18`), the answer comes back as a bool.",
      ),
    },
    {
      type: "code",
      lines: [
        L("is_shop_open = True", "দোকান খোলা: হ্যাঁ", "shop is open: yes"),
        L("has_discount = False", "ডিসকাউন্ট আছে: না", "has discount: no"),
        L("age = 20", "বয়স 20 (int)", "age is 20 (int)"),
        L("can_vote = age >= 18", "তুলনার ফল True/False — সেটা can_vote-এ রাখি", "the comparison result True/False goes into can_vote"),
        L("print(can_vote)", "20 >= 18 সত্য, তাই True", "20 >= 18 is true, so True"),
        L("print(type(is_shop_open))", "টাইপ bool", "type is bool"),
        L("print(True + True)", "True গোনা হয় 1 হিসেবে, False 0 হিসেবে", "True counts as 1, False as 0"),
      ],
      output: "True\n<class 'bool'>\n2",
    },

    // ---------------------------------------------------------------- None
    {
      type: "text",
      title: t("ধাপ ৫: None — কিছুই নেই", "Step 5: None — nothing at all"),
      body: t(
        "**None** মানে \"কোনো মান নেই\"। এটা `0` না, খালি লেখা `\"\"` না, `False`-ও না। এটা একেবারে \"কিছু না\"।\n\nউদাহরণ: পরীক্ষার রেজাল্ট এখনো বের হয়নি। রেজাল্ট 0 না (তাহলে তো ফেল!) — রেজাল্ট এখনো **নেই**। তখন আমরা লিখি `result = None`।\n\nNone-এর টাইপ হলো `NoneType`। পরে ফাংশন শেখার সময় None আবার দেখবো — যে ফাংশন কিছু return করে না, সে None ফেরত দেয়।",
        "**None** means \"no value\". It is not `0`, not the empty text `\"\"`, and not `False`. It is truly \"nothing\".\n\nExample: exam results are not published yet. The result is not 0 (that would mean fail!) — the result simply **does not exist yet**. So we write `result = None`.\n\nThe type of None is `NoneType`. We will meet None again with functions — a function that returns nothing gives back None.",
      ),
    },
    {
      type: "code",
      lines: [
        L("result = None", "রেজাল্ট এখনো নেই", "no result yet"),
        L("print(result)", "None ছাপা হয়", "prints None"),
        L("print(type(result))", "টাইপ NoneType", "type is NoneType"),
        L("print(result is None)", "None কি না চেক করার সঠিক উপায়: is", "the right way to check for None: is"),
        L("result = 78", "রেজাল্ট এলো, এবার int রাখলাম", "the result arrived, now we store an int"),
        L("print(result is None)", "এখন আর None না", "not None anymore"),
      ],
      output: "None\n<class 'NoneType'>\nTrue\nFalse",
    },

    // ---------------------------------------------------------------- table
    {
      type: "table",
      title: t("৫টি মূল টাইপ এক নজরে", "The 5 basic types at a glance"),
      headers: [t("টাইপ", "Type"), t("মানে", "Meaning"), t("উদাহরণ", "Example"), t("বাস্তব জীবনে", "Real life")],
      codeCols: [0, 2],
      rows: [
        ["int", t("পূর্ণ সংখ্যা", "Whole number"), "12, -3, 0", t("ডিমের সংখ্যা, ক্লাসের ছাত্রসংখ্যা", "Number of eggs, students in class")],
        ["float", t("দশমিক সংখ্যা", "Decimal number"), "2.5, 99.99, 5.0", t("চালের ওজন, দাম, তাপমাত্রা", "Weight of rice, price, temperature")],
        ["str", t("লেখা", "Text"), '"Rahim", "017..."', t("নাম, ঠিকানা, ফোন নম্বর", "Name, address, phone number")],
        ["bool", t("হ্যাঁ / না", "Yes / No"), "True, False", t("দোকান খোলা? লগইন সফল?", "Shop open? Login successful?")],
        ["NoneType", t("কিছুই নেই", "Nothing"), "None", t("এখনো আসেনি এমন রেজাল্ট", "A result that has not come yet")],
      ],
    },

    // ---------------------------------------------------------------- dynamic typing stepper
    {
      type: "text",
      title: t("একই ভেরিয়েবলে টাইপ বদলাতে পারে", "The same variable can change type"),
      body: t(
        "Python-এ ভেরিয়েবল একটা **লেবেল লাগানো বাক্স**। বাক্সে আজ সংখ্যা রাখলে কাল লেখাও রাখা যায়। এটাকে বলে **dynamic typing**। নিচের স্টেপারে \"পরের ধাপ\" চাপো আর দেখো বাক্সের ভেতরের মান আর টাইপ কীভাবে বদলায়।",
        "In Python a variable is a **labelled box**. If you put a number in the box today, you can put text in it tomorrow. This is called **dynamic typing**. Press \"Next step\" in the stepper below and watch the value and type inside the box change.",
      ),
    },
    {
      type: "stepper",
      title: t("বাক্সের ভেতর কী আছে?", "What is inside the box?"),
      code: [
        L("x = 10", "x বাক্সে 10", "put 10 in box x"),
        L("print(x, type(x))", "মান আর টাইপ দেখাও", "show value and type"),
        L("x = x + 0.5", "int + float = float", "int + float = float"),
        L("print(x, type(x))", "আবার দেখাও", "show again"),
        L('x = "ten"', "এবার লেখা রাখলাম", "now we store text"),
        L("print(x, type(x))", "শেষবার দেখাও", "show one last time"),
      ],
      steps: [
        { line: 0, vars: { x: "10" }, note: t("`x` নামে একটা বাক্স তৈরি হলো, ভেতরে `10` (int)।", "A box named `x` is created with `10` (int) inside.") },
        { line: 1, vars: { x: "10" }, out: "10 <class 'int'>", note: t("`print` মান আর টাইপ দেখালো। মান বদলায়নি।", "`print` shows the value and the type. Nothing changed.") },
        { line: 2, vars: { x: "10.5" }, note: t("ডান দিক আগে হিসাব হয়: `10 + 0.5 = 10.5`। তারপর ফলটা আবার `x`-এ রাখা হয়। int + float হলে ফল float।", "The right side is calculated first: `10 + 0.5 = 10.5`. Then the result is stored back in `x`. int + float gives a float.") },
        { line: 3, vars: { x: "10.5" }, out: "10.5 <class 'float'>", note: t("এখন `x` একটা float।", "Now `x` is a float.") },
        { line: 4, vars: { x: "'ten'" }, note: t("পুরনো মান ফেলে দিয়ে বাক্সে লেখা `\"ten\"` রাখা হলো।", "The old value is thrown away and the text `\"ten\"` is put in the box.") },
        { line: 5, vars: { x: "'ten'" }, out: "ten <class 'str'>", note: t("একই বাক্স `x`, কিন্তু এখন টাইপ str। Python-এ এটা পুরোপুরি বৈধ।", "Same box `x`, but now the type is str. This is completely valid in Python.") },
      ],
    },

    // ---------------------------------------------------------------- mutable vs immutable
    {
      type: "text",
      title: t("Mutable বনাম Immutable", "Mutable vs immutable"),
      body: t(
        "এই দুটো শব্দ শুনতে কঠিন, কিন্তু মানে খুব সহজ:\n- **Mutable** = যেটা **বদলানো যায়** (ভেতরের জিনিস পাল্টানো যায়)।\n- **Immutable** = যেটা **বদলানো যায় না**। বদলাতে চাইলে নতুন একটা বানাতে হয়।\n\n**Immutable:** `int`, `float`, `str`, `bool`, `None`, `tuple`, `frozenset`\n**Mutable:** `list`, `dict`, `set`, `bytearray`\n\n(list, dict এগুলো মডিউল ৪-এ বিস্তারিত শিখবো। এখানে শুধু তুলনার জন্য list দেখাচ্ছি।)",
        "These two words sound hard but the meaning is very simple:\n- **Mutable** = something that **can be changed** (you can change what is inside).\n- **Immutable** = something that **cannot be changed**. To \"change\" it, you must make a new one.\n\n**Immutable:** `int`, `float`, `str`, `bool`, `None`, `tuple`, `frozenset`\n**Mutable:** `list`, `dict`, `set`, `bytearray`\n\n(We learn list and dict in detail in Module 4. Here a list is shown only for comparison.)",
      ),
    },
    {
      type: "analogy",
      emoji: "🪨",
      title: t("পাথরে খোদাই বনাম হোয়াইটবোর্ড", "Carved stone vs whiteboard"),
      body: t(
        "**str হলো পাথরে খোদাই করা নাম।** \"Rahim\" খোদাই হয়ে গেলে একটা অক্ষর মুছে \"Karim\" করা যায় না। চাইলে **নতুন একটা পাথর** খোদাই করতে হবে।\n\n**list হলো ক্লাসের হোয়াইটবোর্ড।** বোর্ডে লেখা বাজারের লিস্ট থেকে \"আলু\" মুছে \"পেঁয়াজ\" লেখা যায় — বোর্ড একই থাকে, শুধু ভেতরের লেখা বদলায়।",
        "**A str is a name carved in stone.** Once \"Rahim\" is carved, you cannot erase one letter to make \"Karim\". You must carve a **new stone**.\n\n**A list is the classroom whiteboard.** You can erase \"potato\" from the shopping list and write \"onion\" — the board stays the same, only what is written on it changes.",
      ),
    },
    {
      type: "code",
      title: t("list বদলানো যায় (mutable)", "A list can be changed (mutable)"),
      lines: [
        L('bazar = ["alu", "dim", "chal"]', "বাজারের লিস্ট — একটা list", "shopping list — a list"),
        L('bazar[0] = "peyaj"', "০ নম্বর ঘরের জিনিস বদলালাম", "change the item at position 0"),
        L("print(bazar)", "লিস্ট বদলে গেছে", "the list has changed"),
      ],
      output: "['peyaj', 'dim', 'chal']",
    },
    {
      type: "code",
      title: t("str বদলানো যায় না (immutable) — এরর পড়তে শেখো", "A str cannot be changed (immutable) — learn to read the error"),
      lines: [
        L('name = "Rahim"', "লেখা — immutable", "text — immutable"),
        L('name[0] = "K"', "প্রথম অক্ষর বদলাতে চাইলাম → এরর!", "try to change the first letter → error!"),
      ],
      isError: true,
      output:
        "Traceback (most recent call last):\n  File \"main.py\", line 2, in <module>\n    name[0] = \"K\"\n    ~~~~^^^\nTypeError: 'str' object does not support item assignment",
      note: t(
        "**এরর মেসেজ কীভাবে পড়বে (নিচ থেকে উপরে):**\n- শেষ লাইন: `TypeError` → এররের নাম। তারপর কারণ: \"str অবজেক্টে ঘরে মান বসানো যায় না\"।\n- `File \"main.py\", line 2` → কোন ফাইলের কোন লাইনে সমস্যা।\n- তার নিচে সমস্যার লাইনটা নিজেই।\n- `~~~~^^^` → ঠিক কোন অংশে সমস্যা, সেটা আঙুল দিয়ে দেখাচ্ছে।\n\n**ঠিক উপায়:** নতুন লেখা বানাও: `name = \"K\" + name[1:]` → `\"Kahim\"`।",
        "**How to read the error (from the bottom up):**\n- Last line: `TypeError` → the error name. Then the reason: \"you cannot assign to a position in a str\".\n- `File \"main.py\", line 2` → which file and which line has the problem.\n- Below it, the problem line itself.\n- `~~~~^^^` → points exactly at the part that failed.\n\n**The right way:** make a new text: `name = \"K\" + name[1:]` → `\"Kahim\"`.",
      ),
    },
    {
      type: "code",
      title: t("immutable মানে \"নতুন মান তৈরি হয়\"", "Immutable means \"a new value is created\""),
      lines: [
        L('name = "rahim"', "ছোট হাতের নাম", "name in small letters"),
        L("big = name.upper()", "upper() নতুন একটা লেখা বানায়", "upper() makes a NEW text"),
        L("print(name)", "পুরনোটা একই আছে!", "the old one is unchanged!"),
        L("print(big)", "নতুনটা বড় হাতের", "the new one is in capitals"),
      ],
      output: "rahim\nRAHIM",
    },

    // ---------------------------------------------------------------- QA
    {
      type: "callout",
      variant: "qa",
      title: t("টেস্টিংয়ে টাইপ কেন জরুরি", "Why types matter in testing"),
      body: t(
        "API টেস্ট করার সময় সার্ভার হয়তো দাম পাঠালো `\"100\"` (str), অথচ ডকুমেন্টে লেখা `100` (int)। চোখে দুটো একই লাগে, কিন্তু এটা একটা **বাগ**। ভালো টেস্টার মান আর টাইপ দুটোই চেক করে:\n\n`assert type(price) == int`\n\n`assert` মানে \"আমি নিশ্চিত এটা সত্য; না হলে টেস্ট ফেল করাও\"। Expected result (প্রত্যাশিত) আর actual result (আসলে যা এলো) মেলানোই টেস্টিং।",
        "When testing an API, the server might send the price as `\"100\"` (str), while the documentation says `100` (int). They look the same, but this is a **bug**. A good tester checks both the value and the type:\n\n`assert type(price) == int`\n\n`assert` means \"I am sure this is true; if not, fail the test\". Testing is comparing the expected result with the actual result.",
      ),
    },

    // ---------------------------------------------------------------- mistakes
    {
      type: "mistakes",
      items: [
        {
          mistake: 'age = "25"\nprint(age + 1)',
          error: 'TypeError: can only concatenate str (not "int") to str',
          why: t("`\"25\"` লেখা, সংখ্যা না। লেখার সাথে সংখ্যা যোগ হয় না।", "`\"25\"` is text, not a number. You cannot add a number to text."),
          fix: "age = 25\nprint(age + 1)   # 26",
        },
        {
          mistake: "is_paid = true",
          error: "NameError: name 'true' is not defined. Did you mean: 'True'?",
          why: t("bool-এর প্রথম অক্ষর বড় হাতের হতে হয়।", "The first letter of a bool must be a capital."),
          fix: "is_paid = True",
        },
        {
          mistake: 'name = Rahim',
          error: "NameError: name 'Rahim' is not defined",
          why: t("কোটেশন ছাড়া Python ভাবে Rahim একটা ভেরিয়েবলের নাম।", "Without quotes Python thinks Rahim is a variable name."),
          fix: 'name = "Rahim"',
        },
        {
          mistake: 'city = "Dhaka\'',
          error: "SyntaxError: unterminated string literal (detected at line 1)",
          why: t("শুরু আর শেষের কোটেশন একরকম হতে হবে।", "The opening and closing quotes must match."),
          fix: 'city = "Dhaka"',
        },
        {
          mistake: 'name = "Rahim"\nname[0] = "K"',
          error: "TypeError: 'str' object does not support item assignment",
          why: t("str immutable — ভেতরের অক্ষর বদলানো যায় না।", "str is immutable — you cannot change a letter inside it."),
          fix: 'name = "K" + name[1:]',
        },
        {
          mistake: "print(0.1 + 0.2 == 0.3)",
          error: t("কোনো এরর নেই, কিন্তু ফল False! (silent bug)", "No error, but the result is False! (silent bug)"),
          why: t("float-এ খুব ছোট রাউন্ডিং ভুল থাকে।", "Floats have tiny rounding errors."),
          fix: "print(round(0.1 + 0.2, 2) == 0.3)   # True",
        },
      ],
    },

    // ---------------------------------------------------------------- summary
    {
      type: "summary",
      body: t(
        "প্রতিটি মানের একটা টাইপ আছে — **int** (গুনি), **float** (মাপি), **str** (লিখি), **bool** (হ্যাঁ/না), **None** (কিছু নেই); `type()` দিয়ে দেখো, আর মনে রাখো `5` ≠ `\"5\"`।",
        "Every value has a type — **int** (count), **float** (measure), **str** (write), **bool** (yes/no), **None** (nothing); check it with `type()`, and remember `5` ≠ `\"5\"`.",
      ),
    },
  ],

  // ================================================================== PRACTICE
  practice: [
    {
      id: "dt-1",
      level: "easy",
      title: t("নিজের পরিচয়", "Introduce yourself"),
      task: t(
        "চারটা ভেরিয়েবল বানাও: `name` (তোমার নাম, str), `age` (বয়স, int), `height` (উচ্চতা মিটারে, float), `is_student` (bool)। তারপর প্রতিটি আলাদা লাইনে প্রিন্ট করো।",
        "Create four variables: `name` (your name, str), `age` (int), `height` (in metres, float), `is_student` (bool). Then print each on its own line.",
      ),
      hint: t("str কোটেশনে, int-এ দশমিক নেই, float-এ দশমিক আছে, bool হলো True/False (বড় হাতের T/F)।", "str goes in quotes, int has no decimal, float has a decimal, bool is True/False (capital T/F)."),
      expectedOutput: "Rahim\n22\n1.68\nTrue",
      solution: [
        L('name = "Rahim"', "নাম — লেখা, তাই কোটেশন", "name — text, so quotes"),
        L("age = 22", "বয়স — পূর্ণ সংখ্যা", "age — whole number"),
        L("height = 1.68", "উচ্চতা — দশমিক সংখ্যা", "height — decimal number"),
        L("is_student = True", "ছাত্র কি না — হ্যাঁ", "student or not — yes"),
        L("print(name)", "নাম দেখাও", "show name"),
        L("print(age)", "বয়স দেখাও", "show age"),
        L("print(height)", "উচ্চতা দেখাও", "show height"),
        L("print(is_student)", "True/False দেখাও", "show True/False"),
      ],
      explanation: t("প্রতিটি মান তার সঠিক টাইপে রাখা হয়েছে। print প্রতিবার নতুন লাইনে লেখে।", "Each value is stored in its correct type. print writes on a new line every time."),
    },
    {
      id: "dt-2",
      level: "easy",
      title: t("টাইপ চিনে নাও", "Spot the type"),
      task: t(
        "নিচের প্রতিটি মানের টাইপ `type()` দিয়ে প্রিন্ট করো: `45`, `45.0`, `\"45\"`, `False`, `None`।",
        "Print the type of each value using `type()`: `45`, `45.0`, `\"45\"`, `False`, `None`.",
      ),
      hint: t("`print(type(45))` — এভাবে একটা একটা করে।", "`print(type(45))` — one at a time like this."),
      expectedOutput: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>\n<class 'NoneType'>",
      solution: [
        L("print(type(45))", "দশমিক নেই → int", "no decimal → int"),
        L("print(type(45.0))", "দশমিক আছে → float", "has decimal → float"),
        L('print(type("45"))', "কোটেশনে আছে → str", "inside quotes → str"),
        L("print(type(False))", "True/False → bool", "True/False → bool"),
        L("print(type(None))", "None-এর টাইপ NoneType", "the type of None is NoneType"),
      ],
      explanation: t("একই 45 তিনভাবে লেখা যায়, আর তিনটার টাইপ আলাদা। কোটেশন থাকলেই str।", "The same 45 can be written three ways, with three different types. Quotes always mean str."),
    },
    {
      id: "dt-3",
      level: "easy",
      title: t("দোকানের তথ্য", "Shop information"),
      task: t(
        "একটা দোকানের তথ্য রাখো: দোকানের নাম `\"Karim Store\"`, ডিমের সংখ্যা `30`, চালের দাম প্রতি কেজি `68.5`, দোকান খোলা `True`। সব এক লাইনে প্রিন্ট করো।",
        "Store a shop's data: shop name `\"Karim Store\"`, number of eggs `30`, rice price per kg `68.5`, shop open `True`. Print all on one line.",
      ),
      hint: t("print-এর ভেতরে কমা দিয়ে কয়েকটা মান দিলে মাঝে স্পেস দিয়ে এক লাইনে ছাপে।", "Give print several values separated by commas — it prints them on one line with spaces."),
      expectedOutput: "Karim Store 30 68.5 True",
      solution: [
        L('shop = "Karim Store"', "দোকানের নাম — str", "shop name — str"),
        L("eggs = 30", "ডিম গোনা যায় — int", "eggs are counted — int"),
        L("rice_price = 68.5", "দাম দশমিক — float", "price has decimals — float"),
        L("is_open = True", "খোলা — bool", "open — bool"),
        L("print(shop, eggs, rice_price, is_open)", "কমা দিয়ে আলাদা করলে স্পেস বসে", "commas put spaces between values"),
      ],
      explanation: t("print-এ কমা দিলে প্রতিটি মানের মাঝে একটা স্পেস বসে, আর সব এক লাইনে আসে।", "Commas in print put one space between values and keep them on one line."),
    },
    {
      id: "dt-4",
      level: "easy",
      title: t("রেজাল্ট এখনো আসেনি", "The result has not come yet"),
      task: t(
        "`result` ভেরিয়েবলে `None` রাখো এবং প্রিন্ট করো। তারপর `result is None` প্রিন্ট করো। এরপর `result`-এ `85` রাখো আর আবার `result is None` প্রিন্ট করো।",
        "Put `None` in `result` and print it. Then print `result is None`. Then set `result` to `85` and print `result is None` again.",
      ),
      hint: t("None চেক করতে `is` ব্যবহার করো, `==` না।", "Use `is` to check for None, not `==`."),
      expectedOutput: "None\nTrue\nFalse",
      solution: [
        L("result = None", "এখনো কিছু নেই", "nothing yet"),
        L("print(result)", "None ছাপে", "prints None"),
        L("print(result is None)", "হ্যাঁ, None → True", "yes, it is None → True"),
        L("result = 85", "রেজাল্ট এলো", "the result arrived"),
        L("print(result is None)", "এখন 85, None না → False", "now it is 85, not None → False"),
      ],
      explanation: t("`is None` প্রশ্ন করে \"এটা কি একদম কিছুই না?\"। 85 আসার পর উত্তর False।", "`is None` asks \"is this truly nothing?\". After 85 arrives the answer is False."),
    },
    {
      id: "dt-5",
      level: "medium",
      title: t("\"5\" বনাম 5", "\"5\" vs 5"),
      task: t(
        "`a = \"7\"` আর `b = 7` নাও। প্রিন্ট করো: `a + a`, `b + b`, `a * 3`, `b * 3`। প্রতিটার ফল আগে খাতায় অনুমান করো, তারপর চালিয়ে মিলাও।",
        "Take `a = \"7\"` and `b = 7`. Print: `a + a`, `b + b`, `a * 3`, `b * 3`. Guess each result on paper first, then run and compare.",
      ),
      hint: t("লেখার সাথে `*` মানে \"এতবার পাশাপাশি লেখো\"।", "With text, `*` means \"write it this many times side by side\"."),
      expectedOutput: "77\n14\n777\n21",
      solution: [
        L('a = "7"', "লেখা", "text"),
        L("b = 7", "সংখ্যা", "number"),
        L("print(a + a)", "লেখা + লেখা = জোড়া → 77", "text + text = joined → 77"),
        L("print(b + b)", "সংখ্যা + সংখ্যা = যোগ → 14", "number + number = sum → 14"),
        L("print(a * 3)", "লেখা × 3 = তিনবার → 777", "text × 3 = three times → 777"),
        L("print(b * 3)", "সংখ্যা × 3 = গুণ → 21", "number × 3 = multiply → 21"),
      ],
      explanation: t("একই চিহ্ন (`+`, `*`) টাইপ অনুযায়ী আলাদা কাজ করে। এ কারণেই টাইপ জানা জরুরি।", "The same sign (`+`, `*`) does different work depending on the type. That is why knowing the type matters."),
    },
    {
      id: "dt-6",
      level: "medium",
      title: t("মোবাইল নম্বর কেন str?", "Why is a phone number a str?"),
      task: t(
        "`phone_int = 01712345678` লিখে চালাও এবং এরর দেখো। তারপর `phone = \"01712345678\"` লিখে নম্বরটা আর এর দৈর্ঘ্য (`len`) প্রিন্ট করো।",
        "Write `phone_int = 01712345678`, run it and see the error. Then write `phone = \"01712345678\"` and print the number and its length (`len`).",
      ),
      hint: t("শুরুতে 0 দিয়ে int লেখা যায় না। ফোন নম্বর দিয়ে কেউ যোগ-বিয়োগ করে না — তাই এটা লেখা।", "An int cannot start with 0. Nobody adds or subtracts phone numbers — so it is text."),
      expectedOutput: "01712345678\n11",
      solution: [
        L("# phone_int = 01712345678", "এটা চালালে SyntaxError: leading zeros...", "running this gives SyntaxError: leading zeros..."),
        L('phone = "01712345678"', "str হিসেবে রাখলে 0 হারায় না", "as a str the 0 is kept"),
        L("print(phone)", "পুরো নম্বর", "the full number"),
        L("print(len(phone))", "বাংলাদেশি মোবাইল নম্বর 11 ডিজিট", "a Bangladeshi mobile number has 11 digits"),
      ],
      explanation: t(
        "যে \"সংখ্যা\" দিয়ে হিসাব হয় না (ফোন, পোস্ট কোড, NID) সেগুলো str রাখাই নিয়ম। এতে শুরুর 0 থাকে, আর `len()` দিয়ে ডিজিট গোনা যায়।",
        "\"Numbers\" you never calculate with (phone, post code, NID) are stored as str. The leading 0 stays, and `len()` can count the digits.",
      ),
    },
    {
      id: "dt-7",
      level: "medium",
      title: t("float-এর ফাঁদ", "The float trap"),
      task: t(
        "একটা চকলেটের দাম `0.1` টাকা ধরে ৩টা চকলেটের দাম `0.1 + 0.1 + 0.1` প্রিন্ট করো। তারপর `round()` দিয়ে ২ দশমিক ঘরে রাউন্ড করে প্রিন্ট করো।",
        "Pretend one candy costs `0.1` taka. Print the price of 3 candies as `0.1 + 0.1 + 0.1`. Then print it rounded to 2 decimal places with `round()`.",
      ),
      hint: t("`round(মান, 2)` — দ্বিতীয় সংখ্যা হলো কয় ঘর দশমিক রাখবে।", "`round(value, 2)` — the second number is how many decimal places to keep."),
      expectedOutput: "0.30000000000000004\n0.3",
      solution: [
        L("total = 0.1 + 0.1 + 0.1", "তিনটা 0.1 যোগ", "add three 0.1"),
        L("print(total)", "ছোট্ট ভুল দেখা যাবে", "a tiny error shows up"),
        L("print(round(total, 2))", "২ ঘরে রাউন্ড → 0.3", "round to 2 places → 0.3"),
      ],
      explanation: t("float বাইনারিতে পুরোপুরি ঠিকভাবে রাখা যায় না। টাকার হিসাব দেখানোর আগে সবসময় রাউন্ড করো।", "Floats cannot be stored perfectly in binary. Always round money before showing it."),
    },
    {
      id: "dt-8",
      level: "medium",
      title: t("ভোট দেওয়ার যোগ্যতা", "Voting eligibility"),
      task: t(
        "`age = 17` নাও। `can_vote = age >= 18` লিখে `can_vote` আর তার টাইপ প্রিন্ট করো। তারপর `age = 18` করে আবার একই কাজ করো।",
        "Take `age = 17`. Write `can_vote = age >= 18` and print `can_vote` and its type. Then set `age = 18` and do the same again.",
      ),
      hint: t("তুলনার ফল সবসময় bool। age বদলালে can_vote আবার হিসাব করতে হবে।", "A comparison always gives a bool. After changing age you must calculate can_vote again."),
      expectedOutput: "False <class 'bool'>\nTrue <class 'bool'>",
      solution: [
        L("age = 17", "বয়স 17", "age 17"),
        L("can_vote = age >= 18", "17 >= 18? না → False", "17 >= 18? no → False"),
        L("print(can_vote, type(can_vote))", "মান ও টাইপ", "value and type"),
        L("age = 18", "বয়স বদলালাম", "change age"),
        L("can_vote = age >= 18", "আবার হিসাব: 18 >= 18 → True", "calculate again: 18 >= 18 → True"),
        L("print(can_vote, type(can_vote))", "এবার True", "now True"),
      ],
      explanation: t(
        "`>=` মানে \"বড় অথবা সমান\"। 18 নিজেই সীমার ভেতরে — এটাই boundary value। শুধু age বদলালে can_vote নিজে থেকে বদলায় না, তাই আবার লিখতে হয়েছে।",
        "`>=` means \"greater than or equal\". 18 itself is inside the limit — that is the boundary value. Changing age does not update can_vote by itself, so we had to write it again.",
      ),
    },
    {
      id: "dt-9",
      level: "medium",
      title: t("Mutable না Immutable?", "Mutable or immutable?"),
      task: t(
        "একটা list বানাও `marks = [70, 80, 90]`, প্রথম মানটা `75` করো আর প্রিন্ট করো। তারপর `word = \"cat\"` বানিয়ে `word.upper()`-এর ফল আর `word` দুটোই প্রিন্ট করো।",
        "Create a list `marks = [70, 80, 90]`, change the first value to `75` and print it. Then create `word = \"cat\"` and print both `word.upper()` and `word`.",
      ),
      hint: t("list-এ `marks[0] = 75` চলে। str-এর `upper()` নতুন লেখা দেয়, আসলটা বদলায় না।", "`marks[0] = 75` works on a list. A str's `upper()` returns a new text; the original does not change."),
      expectedOutput: "[75, 80, 90]\nCAT\ncat",
      solution: [
        L("marks = [70, 80, 90]", "list — mutable", "list — mutable"),
        L("marks[0] = 75", "ভেতরের মান বদলানো গেল", "the value inside can be changed"),
        L("print(marks)", "বদলানো list", "the changed list"),
        L('word = "cat"', "str — immutable", "str — immutable"),
        L("print(word.upper())", "নতুন লেখা CAT", "a new text CAT"),
        L("print(word)", "আসলটা এখনো cat", "the original is still cat"),
      ],
      explanation: t("list নিজেই বদলায় (mutable)। str কখনো বদলায় না — মেথডগুলো নতুন str ফেরত দেয় (immutable)।", "A list changes itself (mutable). A str never changes — its methods return a new str (immutable)."),
    },
    {
      id: "dt-10",
      level: "hard",
      title: t("বাজারের রসিদ", "Shopping receipt"),
      task: t(
        "ভেরিয়েবল বানাও: `item = \"Rice\"`, `qty = 3` (কেজি), `price = 68.5` (প্রতি কেজি), `paid = False`। মোট দাম `total` হিসাব করো। প্রিন্ট করো: আইটেম, মোট দাম, মোট দামের টাইপ, আর পেমেন্ট হয়েছে কি না।",
        "Create: `item = \"Rice\"`, `qty = 3` (kg), `price = 68.5` (per kg), `paid = False`. Calculate `total`. Print: the item, the total, the type of total, and whether it is paid.",
      ),
      hint: t("int × float = float। print-এ লেখা আর মান কমা দিয়ে মেশাও।", "int × float = float. In print, mix text and values with commas."),
      expectedOutput: "Item: Rice\nTotal: 205.5\nType: <class 'float'>\nPaid: False",
      solution: [
        L('item = "Rice"', "আইটেমের নাম — str", "item name — str"),
        L("qty = 3", "পরিমাণ — int", "quantity — int"),
        L("price = 68.5", "প্রতি কেজি দাম — float", "price per kg — float"),
        L("paid = False", "এখনো পেমেন্ট হয়নি — bool", "not paid yet — bool"),
        L("total = qty * price", "3 × 68.5 = 205.5", "3 × 68.5 = 205.5"),
        L('print("Item:", item)', "লেবেল + মান", "label + value"),
        L('print("Total:", total)', "মোট দাম", "the total"),
        L('print("Type:", type(total))', "int × float → float", "int × float → float"),
        L('print("Paid:", paid)', "bool দেখাও", "show the bool"),
      ],
      explanation: t("একটা int আর একটা float গুণ করলে Python ফল float করে দেয়, যাতে দশমিক না হারায়।", "Multiplying an int by a float gives a float, so no decimals are lost."),
    },
    {
      id: "dt-11",
      level: "hard",
      title: t("এরর খুঁজে ঠিক করো", "Find and fix the errors"),
      task: t(
        "নিচের কোডে ৩টা ভুল আছে। ঠিক করো যাতে প্রত্যাশিত আউটপুট আসে:\n\n`name = Sumi`\n`is_member = true`\n`points = \"50\"`\n`print(name, is_member, points + 10)`",
        "The code below has 3 mistakes. Fix it so the expected output appears:\n\n`name = Sumi`\n`is_member = true`\n`points = \"50\"`\n`print(name, is_member, points + 10)`",
      ),
      hint: t("একটায় কোটেশন নেই, একটায় ছোট হাতের অক্ষর, একটায় সংখ্যা লেখা হিসেবে রাখা।", "One is missing quotes, one has a small letter, one stores a number as text."),
      expectedOutput: "Sumi True 60",
      solution: [
        L('name = "Sumi"', "ভুল ১: লেখার জন্য কোটেশন দরকার", "fix 1: text needs quotes"),
        L("is_member = True", "ভুল ২: True-র T বড় হাতের", "fix 2: True has a capital T"),
        L("points = 50", "ভুল ৩: যোগ করতে হলে int চাই", "fix 3: to add, we need an int"),
        L("print(name, is_member, points + 10)", "এখন 50 + 10 = 60", "now 50 + 10 = 60"),
      ],
      explanation: t(
        "প্রতিটি ভুল আলাদা এরর দেয়: `NameError` (Sumi), `NameError` (true), `TypeError` (\"50\" + 10)। এরর মেসেজের শেষ লাইন পড়লেই বোঝা যায় কোনটা।",
        "Each mistake gives a different error: `NameError` (Sumi), `NameError` (true), `TypeError` (\"50\" + 10). Reading the last line of the error tells you which one.",
      ),
    },
    {
      id: "dt-12",
      level: "hard",
      title: t("টাইপ রিপোর্ট", "Type report"),
      task: t(
        "একটা বিকাশ-স্টাইল অ্যাকাউন্টের তথ্য: `owner = \"Nadia\"`, `balance = 1500.75`, `pin_set = True`, `last_txn = None`, `txn_count = 4`। প্রতিটির নাম, মান আর টাইপের নাম এক লাইনে প্রিন্ট করো। টাইপের নাম পেতে `type(x).__name__` ব্যবহার করো।",
        "A bKash-style account: `owner = \"Nadia\"`, `balance = 1500.75`, `pin_set = True`, `last_txn = None`, `txn_count = 4`. Print the name, value and type name of each on one line. Use `type(x).__name__` to get just the type name.",
      ),
      hint: t("`type(5).__name__` দেয় `'int'` — `<class ...>` ছাড়া শুধু নামটা।", "`type(5).__name__` gives `'int'` — just the name, without `<class ...>`."),
      expectedOutput: "owner Nadia str\nbalance 1500.75 float\npin_set True bool\nlast_txn None NoneType\ntxn_count 4 int",
      solution: [
        L('owner = "Nadia"', "মালিকের নাম", "owner's name"),
        L("balance = 1500.75", "ব্যালেন্সে পয়সা আছে → float", "balance has paisa → float"),
        L("pin_set = True", "পিন সেট করা আছে", "PIN is set"),
        L("last_txn = None", "এখনো কোনো লেনদেন নেই", "no transaction yet"),
        L("txn_count = 4", "লেনদেনের সংখ্যা", "number of transactions"),
        L('print("owner", owner, type(owner).__name__)', "__name__ শুধু টাইপের নাম দেয়", "__name__ gives only the type name"),
        L('print("balance", balance, type(balance).__name__)', "float", "float"),
        L('print("pin_set", pin_set, type(pin_set).__name__)', "bool", "bool"),
        L('print("last_txn", last_txn, type(last_txn).__name__)', "NoneType", "NoneType"),
        L('print("txn_count", txn_count, type(txn_count).__name__)', "int", "int"),
      ],
      explanation: t(
        "`type(x)` একটা ক্লাস ফেরত দেয়; তার `.__name__` হলো ক্লাসের নাম লেখা হিসেবে। টেস্ট রিপোর্টে এভাবে সুন্দর করে টাইপ দেখানো যায়।",
        "`type(x)` returns a class; its `.__name__` is the class name as text. It is a neat way to show types in a test report.",
      ),
    },
    {
      id: "dt-13",
      level: "qa",
      title: t("API রেসপন্সের টাইপ টেস্ট", "Test the types of an API response"),
      task: t(
        "ধরো একটা API থেকে এই মানগুলো এসেছে: `user_id = 101`, `price = \"250\"`, `in_stock = True`, `discount = None`। ডকুমেন্টে লেখা: user_id int, price int, in_stock bool, discount None অথবা float।\n\nপ্রতিটি ফিল্ডের জন্য প্রিন্ট করো `PASS` বা `FAIL` — expected টাইপ আর actual টাইপ মিলিয়ে।",
        "Imagine an API returned: `user_id = 101`, `price = \"250\"`, `in_stock = True`, `discount = None`. The documentation says: user_id int, price int, in_stock bool, discount None or float.\n\nFor each field print `PASS` or `FAIL` — by comparing the expected type with the actual type.",
      ),
      hint: t(
        "`type(user_id) == int` দেয় True বা False। এখনো if শিখিনি, তাই শুধু True/False প্রিন্ট করলেও চলবে — True মানে PASS।",
        "`type(user_id) == int` gives True or False. We have not learned if yet, so printing True/False is fine — True means PASS.",
      ),
      expectedOutput: "user_id PASS: True\nprice PASS: False\nin_stock PASS: True\ndiscount PASS: True",
      boundary: [
        { input: "user_id = 101", expected: "int → PASS", why: t("টাইপ মিলেছে", "type matches") },
        { input: 'price = "250"', expected: "int → FAIL (bug!)", why: t("সংখ্যাটা str হিসেবে এসেছে", "the number came as a str") },
        { input: "in_stock = True", expected: "bool → PASS", why: t("টাইপ মিলেছে", "type matches") },
        { input: "discount = None", expected: "None → PASS", why: t("ডিসকাউন্ট না থাকলে None অনুমোদিত", "None is allowed when there is no discount") },
        { input: "discount = 10.5", expected: "float → PASS", why: t("ডিসকাউন্ট থাকলে float", "float when there is a discount") },
      ],
      solution: [
        L("user_id = 101", "API থেকে আসা মান (actual)", "value from the API (actual)"),
        L('price = "250"', "সন্দেহজনক: কোটেশনে!", "suspicious: in quotes!"),
        L("in_stock = True", "bool", "bool"),
        L("discount = None", "ডিসকাউন্ট নেই", "no discount"),
        L('print("user_id PASS:", type(user_id) == int)', "expected int, actual int → True", "expected int, actual int → True"),
        L('print("price PASS:", type(price) == int)', "expected int, actual str → False = বাগ", "expected int, actual str → False = bug"),
        L('print("in_stock PASS:", type(in_stock) == bool)', "expected bool → True", "expected bool → True"),
        L('print("discount PASS:", discount is None or type(discount) == float)', "None অথবা float হলে ঠিক", "None or float is fine"),
      ],
      explanation: t(
        "টেস্টিং মানে **expected result** (ডকুমেন্টে যা লেখা) আর **actual result** (আসলে যা এলো) মেলানো। `price` দেখতে ঠিক, কিন্তু টাইপ ভুল — এরকম \"চুপচাপ\" বাগ ধরাই QA-র কাজ। পরে `assert` দিয়ে এটা অটোমেট করবো।",
        "Testing means comparing the **expected result** (what the docs say) with the **actual result** (what really came). `price` looks right but has the wrong type — catching such \"silent\" bugs is the QA job. Later we automate this with `assert`.",
      ),
    },
  ],

  // ================================================================== QUIZ
  quiz: [
    {
      question: t("`type(3.0)` কী দেখাবে?", "What does `type(3.0)` show?"),
      options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
      correctIndex: 1,
      explanation: t("দশমিক বিন্দু থাকলেই float, যদিও পরে .0।", "Any decimal point makes it a float, even .0."),
    },
    {
      question: t("নিচের কোনটা str?", "Which of these is a str?"),
      options: ["25", "25.0", '"25"', "True"],
      correctIndex: 2,
      explanation: t("কোটেশনের ভেতরে যা আছে সবই str।", "Anything inside quotes is a str."),
    },
    {
      question: t("এই কোডের আউটপুট কী?", "What is the output of this code?"),
      code: 'print("3" + "4")',
      options: ["7", "34", "\"7\"", "TypeError"],
      correctIndex: 1,
      explanation: t("দুটোই লেখা, তাই জোড়া লাগে: 34।", "Both are text, so they are joined: 34."),
    },
    {
      question: t("এই কোড চালালে কী হবে?", "What happens when you run this?"),
      code: 'print("3" + 4)',
      options: ["7", "34", "TypeError", "None"],
      correctIndex: 2,
      explanation: t("str আর int সরাসরি যোগ করা যায় না → TypeError।", "You cannot add a str and an int directly → TypeError."),
    },
    {
      question: t("কোনটা immutable?", "Which one is immutable?"),
      options: ["list", "dict", "str", "set"],
      correctIndex: 2,
      explanation: t("str বদলানো যায় না; list, dict, set বদলানো যায়।", "str cannot be changed; list, dict and set can."),
    },
    {
      question: t("একটা ভেরিয়েবল None কি না চেক করার সবচেয়ে সঠিক উপায় কোনটা?", "What is the correct way to check if a variable is None?"),
      options: ["x == 0", "x is None", 'x == "None"', "x == False"],
      correctIndex: 1,
      explanation: t("None চেক করতে `is None` ব্যবহার করা হয়। None মানে 0 বা False না।", "Use `is None`. None is not 0 and not False."),
    },
    {
      question: t("`is_open = true` লিখলে কী এরর আসবে?", "What error does `is_open = true` give?"),
      options: ["TypeError", "ValueError", "NameError", t("কোনো এরর না", "No error")],
      correctIndex: 2,
      explanation: t("ছোট হাতের `true` Python চেনে না — ভাবে এটা কোনো ভেরিয়েবলের নাম → NameError।", "Python doesn't know lowercase `true` — it thinks it is a variable name → NameError."),
    },
    {
      question: t("মোবাইল নম্বর রাখার জন্য সবচেয়ে ভালো টাইপ কোনটা?", "Which type is best for storing a mobile number?"),
      options: ["int", "float", "str", "bool"],
      correctIndex: 2,
      explanation: t("নম্বর দিয়ে হিসাব হয় না, আর শুরুর 0 রাখতে হয় — তাই str।", "We never calculate with it and the leading 0 must stay — so str."),
    },
  ],
};
