import type { Topic } from "../../types";
import { L, t } from "../helpers";

export const projectSetup: Topic = {
  id: "project-setup",
  title: t("প্রজেক্ট তৈরি ও সেটআপ", "Building a project"),
  estimatedMinutes: 60,
  sections: [
    {
      type: "text",
      title: t("আমরা কী কী সেটআপ করবো?", "What are we going to set up?"),
      body: t(
        "কোড লেখার আগে কম্পিউটারটাকে তৈরি করতে হয়। এই টপিকে ধাপে ধাপে করবো:\n- **Python interpreter** ইনস্টল করা\n- **VS Code** (কোড লেখার এডিটর) সেটআপ\n- **টার্মিনাল** থেকে প্রোগ্রাম চালানো\n- **pip** দিয়ে লাইব্রেরি ইনস্টল\n- **virtual environment** (প্রতিটি প্রজেক্টের আলাদা ঘর)\n- **requirements.txt** (প্রজেক্টের বাজারের লিস্ট)\n\nএকবার ঠিকমতো শিখলে প্রতিটি নতুন প্রজেক্ট ৫ মিনিটে শুরু করতে পারবে।",
        "Before writing code we prepare the computer. In this topic we go step by step:\n- install the **Python interpreter**\n- set up **VS Code** (the code editor)\n- run programs from the **terminal**\n- install libraries with **pip**\n- create a **virtual environment** (a separate room for each project)\n- write **requirements.txt** (the project's shopping list)\n\nLearn it properly once, and every new project takes 5 minutes to start.",
      ),
    },
    {
      type: "analogy",
      emoji: "🗣️",
      title: t("Interpreter হলো দোভাষী", "The interpreter is a translator"),
      body: t(
        "তুমি বাংলায় কথা বলো, একজন জাপানি শুধু জাপানি বোঝে। মাঝে একজন **দোভাষী** লাগবে যে তোমার কথা লাইন ধরে ধরে অনুবাদ করে দেবে।\n\nকম্পিউটার বোঝে শুধু 0 আর 1। আমরা লিখি Python। **Python interpreter** হলো সেই দোভাষী — তোমার `.py` ফাইল লাইন ধরে পড়ে কম্পিউটারকে বুঝিয়ে দেয়।\n\nআর **VS Code** হলো তোমার খাতা-কলম — যেখানে সুন্দর করে লিখবে। খাতা নিজে কিছু চালায় না; চালায় দোভাষী (interpreter)।",
        "You speak Bangla, and a Japanese person understands only Japanese. You need a **translator** in the middle who translates you line by line.\n\nThe computer understands only 0 and 1. We write Python. The **Python interpreter** is that translator — it reads your `.py` file line by line and explains it to the computer.\n\n**VS Code** is your notebook and pen — where you write neatly. The notebook runs nothing by itself; the translator (interpreter) does.",
      ),
    },

    // -------------------------------------------------- Step 1 install
    {
      type: "text",
      title: t("ধাপ ১: Python ইনস্টল করা", "Step 1: Install Python"),
      body: t(
        "- **python.org/downloads** থেকে সর্বশেষ Python 3 ডাউনলোড করো।\n- **Windows:** ইনস্টলারের প্রথম পেজে নিচে **\"Add python.exe to PATH\"** টিক দাও। এটা ভুলে গেলে টার্মিনাল Python খুঁজে পাবে না!\n- **Mac:** ইনস্টলার চালাও; টার্মিনালে কমান্ড হবে `python3`।\n\nইনস্টল শেষে একটা **নতুন** টার্মিনাল খুলে চেক করো:",
        "- Download the latest Python 3 from **python.org/downloads**.\n- **Windows:** on the first installer screen tick **\"Add python.exe to PATH\"** at the bottom. If you forget, the terminal cannot find Python!\n- **Mac:** run the installer; the terminal command is `python3`.\n\nAfter installing, open a **new** terminal and check:",
      ),
    },
    {
      type: "code",
      lang: "shell",
      lines: [
        L("python --version", "কোন Python ভার্সন আছে দেখো (Mac: python3 --version)", "show the installed Python version (Mac: python3 --version)"),
        L("pip --version", "pip-ও সাথে চলে আসে", "pip comes with it"),
      ],
      output: "Python 3.12.4\npip 24.0 from C:\\Users\\you\\AppData\\Local\\Programs\\Python\\Python312\\Lib\\site-packages\\pip (python 3.12)",
      note: t("তোমার ভার্সন নম্বর আলাদা হতে পারে — 3.10 বা তার বেশি হলেই চলবে।", "Your version number may differ — anything 3.10 or newer is fine."),
    },

    // -------------------------------------------------- Step 2 VS Code
    {
      type: "text",
      title: t("ধাপ ২: VS Code সেটআপ", "Step 2: Set up VS Code"),
      body: t(
        "- **code.visualstudio.com** থেকে VS Code ইনস্টল করো।\n- বাঁ দিকের **Extensions** (চারটা চৌকো আইকন) থেকে Microsoft-এর **\"Python\"** এক্সটেনশন ইনস্টল করো।\n- **File → Open Folder** দিয়ে প্রজেক্ট ফোল্ডার খোলো (একটা ফাইল না, পুরো ফোল্ডার)।\n- **Interpreter বাছাই:** `Ctrl+Shift+P` চাপো → লেখো **Python: Select Interpreter** → তালিকা থেকে Python বাছো। (পরে venv বানালে এখানে `.venv` টা বাছবে।)\n- টার্মিনাল খুলতে: **View → Terminal** অথবা `` Ctrl+` ``।",
        "- Install VS Code from **code.visualstudio.com**.\n- In **Extensions** on the left (the four-squares icon), install the **\"Python\"** extension by Microsoft.\n- Use **File → Open Folder** to open the project folder (the whole folder, not one file).\n- **Choose the interpreter:** press `Ctrl+Shift+P` → type **Python: Select Interpreter** → pick Python from the list. (Once you create a venv, pick `.venv` here.)\n- To open a terminal: **View → Terminal** or `` Ctrl+` ``.",
      ),
    },

    // -------------------------------------------------- Step 3 first program
    {
      type: "text",
      title: t("ধাপ ৩: প্রথম প্রোগ্রাম", "Step 3: Your first program"),
      body: t(
        "ডেস্কটপে `kp1-project` নামে একটা ফোল্ডার বানাও, VS Code-এ খোলো, তারপর `main.py` নামে একটা ফাইল বানাও। ফাইলের নামের শেষে **`.py`** অবশ্যই থাকবে — এটা দেখে সবাই বোঝে এটা Python ফাইল।",
        "Create a folder named `kp1-project` on the desktop, open it in VS Code, then create a file called `main.py`. The name must end with **`.py`** — that is how everyone knows it is a Python file.",
      ),
    },
    {
      type: "code",
      file: "main.py",
      lines: [
        L('print("Hello, KP1!")', "পর্দায় একটা লাইন লেখো", "write one line on the screen"),
        L('print("I am learning Python")', "আরেকটা লাইন", "another line"),
      ],
      output: "Hello, KP1!\nI am learning Python",
    },

    // -------------------------------------------------- Step 4 terminal
    {
      type: "text",
      title: t("ধাপ ৪: টার্মিনাল থেকে চালানো", "Step 4: Run it from the terminal"),
      body: t(
        "VS Code-এর ▶ বোতাম দিয়েও চালানো যায়, কিন্তু টেস্ট অটোমেশনে (CI সার্ভারে) সবসময় টার্মিনাল থেকে চালানো হয়। তাই টার্মিনাল শিখে নাও।\n\nটার্মিনাল সবসময় একটা **বর্তমান ফোল্ডারে** থাকে। Python ফাইলটা খুঁজবে **সেই ফোল্ডারে**। তাই আগে `cd` দিয়ে ঠিক ফোল্ডারে যাও।",
        "You can also run with VS Code's ▶ button, but in test automation (on CI servers) code is always run from a terminal. So learn the terminal.\n\nThe terminal is always \"standing\" in a **current folder**. Python looks for the file **in that folder**. So first go to the right folder with `cd`.",
      ),
    },
    {
      type: "code",
      lang: "shell",
      lines: [
        L("cd Desktop/kp1-project", "প্রজেক্ট ফোল্ডারে ঢোকো (cd = change directory)", "go into the project folder (cd = change directory)"),
        L("dir", "ফোল্ডারে কী আছে দেখো (Mac/Linux: ls)", "list what is in the folder (Mac/Linux: ls)"),
        L("python main.py", "interpreter-কে বলো main.py চালাতে", "ask the interpreter to run main.py"),
      ],
      output: "Hello, KP1!\nI am learning Python",
    },
    {
      type: "code",
      lang: "shell",
      title: t("ভুল ফোল্ডারে থাকলে কী হয়", "What happens in the wrong folder"),
      lines: [L("python main.py", "Desktop-এ দাঁড়িয়ে চালালাম, অথচ ফাইল kp1-project-এ", "run from Desktop, but the file is in kp1-project")],
      isError: true,
      output: "python: can't open file 'C:\\Users\\you\\Desktop\\main.py': [Errno 2] No such file or directory",
      note: t(
        "এরর পড়ো: Python খুঁজেছে `Desktop\\main.py` — অর্থাৎ ভুল ফোল্ডারে। `[Errno 2] No such file or directory` মানে \"এমন ফাইল নেই\"। সমাধান: `cd kp1-project`।",
        "Read the error: Python looked for `Desktop\\main.py` — the wrong folder. `[Errno 2] No such file or directory` means \"no such file\". Fix: `cd kp1-project`.",
      ),
    },

    // -------------------------------------------------- Step 5 pip
    {
      type: "text",
      title: t("ধাপ ৫: pip — লাইব্রেরি ইনস্টল", "Step 5: pip — installing libraries"),
      body: t(
        "অন্যরা অনেক দরকারি কোড লিখে **লাইব্রেরি (package)** হিসেবে শেয়ার করেছে: যেমন `requests` (API কল), `pytest` (টেস্ট), `selenium` (ব্রাউজার অটোমেশন)।\n\n**pip** হলো Python-এর প্লে স্টোর। যেভাবে প্লে স্টোর থেকে অ্যাপ নামাও, সেভাবে pip দিয়ে লাইব্রেরি নামাও।",
        "Other people wrote a lot of useful code and shared it as **libraries (packages)**: for example `requests` (API calls), `pytest` (tests), `selenium` (browser automation).\n\n**pip** is Python's Play Store. Just as you download apps from the Play Store, you download libraries with pip.",
      ),
    },
    {
      type: "code",
      lang: "shell",
      lines: [
        L("pip install requests", "requests লাইব্রেরি ইনস্টল করো", "install the requests library"),
        L("pip install pytest==8.3.3", "নির্দিষ্ট ভার্সন ইনস্টল (== দিয়ে)", "install an exact version (with ==)"),
        L("pip list", "কী কী ইনস্টল আছে তার তালিকা", "list everything installed"),
        L("pip show requests", "একটা লাইব্রেরির বিস্তারিত (ভার্সন ইত্যাদি)", "details of one library (version etc.)"),
        L("pip uninstall requests", "মুছে ফেলো (y চেপে নিশ্চিত করো)", "remove it (confirm with y)"),
      ],
    },
    {
      type: "code",
      file: "check_requests.py",
      title: t("ইনস্টল হওয়া লাইব্রেরি ব্যবহার", "Using an installed library"),
      noRun: true,
      lines: [
        L("import requests", "লাইব্রেরিটা প্রোগ্রামে আনো", "bring the library into the program"),
        L('response = requests.get("https://httpbin.org/get")', "একটা ওয়েবসাইটে GET রিকোয়েস্ট পাঠাও", "send a GET request to a website"),
        L("print(response.status_code)", "সার্ভারের উত্তর কোড — 200 মানে ঠিক আছে", "the server's status code — 200 means OK"),
      ],
      output: "200",
      note: t("`import` না করলে লাইব্রেরি ব্যবহার করা যায় না। ইনস্টল একবার (pip), import প্রতিটি ফাইলে।", "You cannot use a library without `import`. Install once (pip), import in every file."),
    },

    // -------------------------------------------------- Step 6 venv
    {
      type: "text",
      title: t("ধাপ ৬: Virtual environment (venv)", "Step 6: Virtual environment (venv)"),
      body: t(
        "সমস্যাটা: প্রজেক্ট A-তে লাগে `selenium 3`, প্রজেক্ট B-তে লাগে `selenium 4`। সব লাইব্রেরি যদি পুরো কম্পিউটারে একটা জায়গায় ইনস্টল হয়, তাহলে একটা আরেকটাকে নষ্ট করবে।\n\nসমাধান: প্রতিটি প্রজেক্টের জন্য একটা **আলাদা ছোট Python ঘর** — এটাকে বলে **virtual environment**। প্রজেক্টের ভেতরে `.venv` নামে একটা ফোল্ডার হয়, তার ভেতরে ওই প্রজেক্টের লাইব্রেরিগুলো থাকে।",
        "The problem: project A needs `selenium 3`, project B needs `selenium 4`. If all libraries go into one place on the whole computer, one breaks the other.\n\nThe fix: a **separate small Python room** for each project — called a **virtual environment**. A folder named `.venv` is created inside the project, and that project's libraries live inside it.",
      ),
    },
    {
      type: "analogy",
      emoji: "🍱",
      title: t("আলাদা টিফিন বক্স", "Separate tiffin boxes"),
      body: t(
        "দুই ভাইয়ের টিফিন এক বক্সে দিলে বড় ভাইয়ের ঝাল তরকারি ছোট ভাইয়ের মিষ্টির সাথে মিশে যাবে। তাই মা দুটো **আলাদা বক্স** দেন।\n\nvenv হলো প্রতিটি প্রজেক্টের আলাদা টিফিন বক্স। একটার লাইব্রেরি আরেকটায় মেশে না।",
        "If two brothers' lunch goes into one box, the elder brother's spicy curry mixes with the younger one's sweets. So mother gives **two separate boxes**.\n\nA venv is each project's own tiffin box. One project's libraries never mix with another's.",
      ),
    },
    {
      type: "code",
      lang: "shell",
      lines: [
        L("python -m venv .venv", "প্রজেক্টের ভেতরে .venv নামে নতুন environment বানাও", "create a new environment named .venv in the project"),
        L(".venv\\Scripts\\activate", "Windows: চালু (activate) করো", "Windows: activate it"),
        L("source .venv/bin/activate", "Mac/Linux: চালু করার কমান্ড", "Mac/Linux: the activate command"),
        L("pip install requests", "এবার ইনস্টল হবে শুধু এই প্রজেক্টের .venv-এ", "now it installs only into this project's .venv"),
        L("deactivate", "কাজ শেষে বন্ধ করো", "switch it off when done"),
      ],
    },
    {
      type: "code",
      lang: "shell",
      title: t("চালু হয়েছে কীভাবে বুঝবো?", "How do I know it is active?"),
      lines: [L("(.venv) C:\\Users\\you\\Desktop\\kp1-project>", "প্রম্পটের শুরুতে (.venv) দেখা গেলে venv চালু আছে", "(.venv) at the start of the prompt means the venv is active")],
      note: t(
        "PowerShell-এ \"running scripts is disabled on this system\" এরর এলে একবার চালাও: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, তারপর আবার activate করো।",
        "If PowerShell says \"running scripts is disabled on this system\", run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, then activate again.",
      ),
    },

    // -------------------------------------------------- Step 7 requirements
    {
      type: "text",
      title: t("ধাপ ৭: requirements.txt", "Step 7: requirements.txt"),
      body: t(
        "তোমার প্রজেক্ট টিমমেট বা CI সার্ভারে চালাতে হলে তাদেরও একই লাইব্রেরি একই ভার্সনে লাগবে। কী কী লাগবে তার তালিকা রাখা হয় **requirements.txt** ফাইলে।\n\n- `pip freeze > requirements.txt` → তোমার venv-এ যা আছে সব লিখে ফাইল বানায়।\n- `pip install -r requirements.txt` → ফাইলে যা আছে সব একসাথে ইনস্টল করে।",
        "To run your project on a teammate's computer or a CI server, they need the same libraries in the same versions. The list is kept in a **requirements.txt** file.\n\n- `pip freeze > requirements.txt` → writes everything in your venv into the file.\n- `pip install -r requirements.txt` → installs everything in the file in one go.",
      ),
    },
    {
      type: "analogy",
      emoji: "📝",
      title: t("বাজারের লিস্ট", "The shopping list"),
      body: t(
        "মা বাজারের লিস্ট লিখে দিলেন: \"চাল ৫ কেজি, ডাল ১ কেজি\"। যে-ই বাজারে যাক, একই জিনিস একই পরিমাণে আনবে।\n\nrequirements.txt হলো প্রজেক্টের বাজারের লিস্ট: `requests==2.32.3` মানে \"requests, ঠিক 2.32.3 ভার্সন\"।",
        "Mother writes a shopping list: \"rice 5 kg, lentils 1 kg\". Whoever goes to the market brings the same things in the same amounts.\n\nrequirements.txt is the project's shopping list: `requests==2.32.3` means \"requests, exactly version 2.32.3\".",
      ),
    },
    {
      type: "code",
      lang: "shell",
      file: "requirements.txt",
      lines: [
        L("requests==2.32.3", "API টেস্টের জন্য, ঠিক এই ভার্সন", "for API tests, exactly this version"),
        L("pytest==8.3.3", "টেস্ট চালানোর জন্য", "to run tests"),
        L("selenium>=4.20", "4.20 বা নতুন যেকোনো ভার্সন", "4.20 or any newer version"),
      ],
    },
    {
      type: "code",
      lang: "shell",
      title: t("নতুন কম্পিউটারে প্রজেক্ট চালানোর পুরো রেসিপি", "The full recipe to run a project on a new computer"),
      lines: [
        L("cd kp1-project", "১. প্রজেক্ট ফোল্ডারে ঢোকো", "1. go into the project folder"),
        L("python -m venv .venv", "২. নতুন venv বানাও", "2. create a new venv"),
        L(".venv\\Scripts\\activate", "৩. চালু করো (Mac: source .venv/bin/activate)", "3. activate it (Mac: source .venv/bin/activate)"),
        L("pip install -r requirements.txt", "৪. লিস্টের সব লাইব্রেরি ইনস্টল", "4. install everything on the list"),
        L("python main.py", "৫. চালাও", "5. run it"),
      ],
    },
    {
      type: "table",
      title: t("একটা সাধারণ প্রজেক্টের গঠন", "A typical project structure"),
      headers: [t("ফাইল / ফোল্ডার", "File / folder"), t("কাজ", "Purpose"), t("গিটে রাখবো?", "Put in git?")],
      codeCols: [0],
      rows: [
        ["main.py", t("মূল প্রোগ্রাম", "the main program"), t("হ্যাঁ", "yes")],
        ["tests/", t("টেস্ট ফাইলগুলো", "test files"), t("হ্যাঁ", "yes")],
        ["requirements.txt", t("লাইব্রেরির তালিকা", "list of libraries"), t("হ্যাঁ", "yes")],
        [".venv/", t("ইনস্টল হওয়া লাইব্রেরি (অনেক বড়)", "installed libraries (very big)"), t("না — requirements.txt থেকে আবার বানানো যায়", "no — rebuild it from requirements.txt")],
        [".gitignore", t("গিট কোন ফাইল উপেক্ষা করবে (.venv লেখো)", "files git should ignore (write .venv)"), t("হ্যাঁ", "yes")],
      ],
    },
    {
      type: "callout",
      variant: "qa",
      title: t("\"আমার কম্পিউটারে তো চলে!\"", "\"But it works on my machine!\""),
      body: t(
        "QA-তে সবচেয়ে পরিচিত বাক্য। কারণ প্রায়ই: অন্য Python ভার্সন, কোনো লাইব্রেরি ইনস্টল নেই, বা অন্য ভার্সন। venv + requirements.txt এই সমস্যা দূর করে — CI সার্ভার (GitHub Actions, Jenkins) প্রতিবার ঠিক এই রেসিপি চালিয়ে টেস্ট রান করে।",
        "The most famous sentence in QA. The usual reasons: a different Python version, a missing library, or a different library version. venv + requirements.txt removes this problem — a CI server (GitHub Actions, Jenkins) runs exactly this recipe before every test run.",
      ),
    },
    {
      type: "mistakes",
      items: [
        {
          mistake: "python --version",
          error: "'python' is not recognized as an internal or external command,\noperable program or batch file.",
          why: t("ইনস্টলের সময় \"Add python.exe to PATH\" টিক দেওয়া হয়নি, বা টার্মিনাল পুরনো।", "\"Add python.exe to PATH\" was not ticked during install, or the terminal is old."),
          fix: "# reinstall with \"Add python.exe to PATH\" ticked,\n# then open a NEW terminal\npy --version",
        },
        {
          mistake: "import requests",
          error: "ModuleNotFoundError: No module named 'requests'",
          noRun: true,
          why: t("লাইব্রেরি ইনস্টল হয়নি, অথবা venv চালু না করে চালানো হয়েছে।", "The library is not installed, or the venv is not active."),
          fix: ".venv\\Scripts\\activate\npip install requests",
        },
        {
          mistake: "python main.py   # in the wrong folder",
          error: "python: can't open file '...\\main.py': [Errno 2] No such file or directory",
          why: t("টার্মিনাল অন্য ফোল্ডারে দাঁড়িয়ে আছে।", "The terminal is standing in another folder."),
          fix: "cd kp1-project\npython main.py",
        },
        {
          mistake: ".venv\\Scripts\\activate   # in PowerShell",
          error: "... running scripts is disabled on this system.",
          why: t("PowerShell-এর নিরাপত্তা সেটিং স্ক্রিপ্ট আটকে দেয়।", "PowerShell's security setting blocks scripts."),
          fix: "Set-ExecutionPolicy -Scope CurrentUser RemoteSigned",
        },
        {
          mistake: "pip install requirements.txt",
          error: "ERROR: Could not find a version that satisfies the requirement requirements.txt",
          why: t("`-r` ছাড়া pip ভাবে \"requirements.txt\" নামে একটা লাইব্রেরি খুঁজতে হবে।", "Without `-r` pip looks for a library named \"requirements.txt\"."),
          fix: "pip install -r requirements.txt",
        },
        {
          mistake: "main.txt   # saved without .py",
          error: t("VS Code রঙ দেখায় না, ▶ বোতাম কাজ করে না", "VS Code shows no colours, the ▶ button does nothing"),
          why: t("ফাইলের নাম `.py` দিয়ে শেষ হতে হবে।", "The file name must end with `.py`."),
          fix: "main.py",
        },
      ],
    },
    {
      type: "summary",
      body: t(
        "Python (PATH টিকসহ) + VS Code ইনস্টল করো → প্রজেক্ট ফোল্ডারে `python -m venv .venv` → activate → `pip install ...` → `pip freeze > requirements.txt` → চালাও `python main.py` (ঠিক ফোল্ডারে দাঁড়িয়ে)।",
        "Install Python (with PATH ticked) + VS Code → in the project folder `python -m venv .venv` → activate → `pip install ...` → `pip freeze > requirements.txt` → run `python main.py` (from the right folder).",
      ),
    },
  ],

  practice: [
    {
      id: "ps-1",
      level: "easy",
      lang: "shell",
      title: t("ভার্সন চেক", "Check the versions"),
      task: t("টার্মিনাল খুলে Python আর pip এর ভার্সন দেখো। দুটো ভার্সন নম্বর খাতায় লিখে রাখো।", "Open a terminal and check the Python and pip versions. Write both version numbers in your notebook."),
      hint: t("`--version` দুটো ড্যাশ দিয়ে। Mac-এ `python3`।", "`--version` has two dashes. On Mac use `python3`."),
      expectedOutput: "Python 3.12.4\npip 24.0 from ... (python 3.12)",
      solution: [
        L("python --version", "Python-এর ভার্সন", "the Python version"),
        L("pip --version", "pip-এর ভার্সন আর কোন Python-এর সাথে যুক্ত", "pip's version and which Python it belongs to"),
      ],
      explanation: t("দুটোই চললে PATH ঠিক আছে। pip-এর লাইনের শেষে `(python 3.12)` দেখায় এটা কোন Python-এর pip।", "If both work, PATH is fine. The end of pip's line, `(python 3.12)`, shows which Python this pip belongs to."),
    },
    {
      id: "ps-2",
      level: "easy",
      title: t("প্রথম প্রোগ্রাম", "First program"),
      task: t("`hello.py` ফাইল বানাও যেটা তিনটা লাইন প্রিন্ট করে: তোমার নাম, তোমার শহর, আর `Ready for KP1!`। টার্মিনাল থেকে চালাও।", "Create `hello.py` that prints three lines: your name, your city, and `Ready for KP1!`. Run it from the terminal."),
      hint: t("তিনটা আলাদা `print()`। চালাতে `python hello.py`।", "Three separate `print()` calls. Run with `python hello.py`."),
      expectedOutput: "Nadia\nChattogram\nReady for KP1!",
      solution: [
        L('print("Nadia")', "নাম", "name"),
        L('print("Chattogram")', "শহর", "city"),
        L('print("Ready for KP1!")', "শেষ লাইন", "last line"),
      ],
      explanation: t("প্রতিটি print নতুন লাইনে লেখে। ফাইল সেভ (Ctrl+S) করতে ভুলো না — সেভ না করলে পুরনো কোড চলে।", "Each print writes a new line. Don't forget to save (Ctrl+S) — unsaved changes don't run."),
    },
    {
      id: "ps-3",
      level: "easy",
      lang: "shell",
      title: t("ফোল্ডারে ঢুকে চালাও", "Go into the folder and run"),
      task: t("টার্মিনালে হোম ফোল্ডার থেকে শুরু করে `Desktop/kp1-project` এ ঢোকো, ফাইলের তালিকা দেখো, তারপর `main.py` চালাও।", "Starting from your home folder in the terminal, go into `Desktop/kp1-project`, list the files, then run `main.py`."),
      hint: t("`cd`, তারপর `dir` (Windows) বা `ls` (Mac), তারপর `python main.py`।", "`cd`, then `dir` (Windows) or `ls` (Mac), then `python main.py`."),
      expectedOutput: "main.py\nHello, KP1!\nI am learning Python",
      solution: [
        L("cd Desktop/kp1-project", "প্রজেক্ট ফোল্ডারে যাও", "go to the project folder"),
        L("dir", "ফাইল দেখো (Mac: ls)", "list files (Mac: ls)"),
        L("python main.py", "চালাও", "run it"),
      ],
      explanation: t("Python ফাইল খোঁজে টার্মিনালের বর্তমান ফোল্ডারে। `dir`/`ls` দিয়ে আগে নিশ্চিত হও ফাইলটা আছে।", "Python looks for the file in the terminal's current folder. Use `dir`/`ls` to make sure the file is there first."),
    },
    {
      id: "ps-4",
      level: "easy",
      lang: "shell",
      title: t("pip দিয়ে ইনস্টল", "Install with pip"),
      task: t("`requests` লাইব্রেরি ইনস্টল করো, তারপর `pip show requests` দিয়ে ভার্সন দেখো।", "Install the `requests` library, then check its version with `pip show requests`."),
      hint: t("`pip install নাম`।", "`pip install name`."),
      expectedOutput: "Name: requests\nVersion: 2.32.3\nSummary: Python HTTP for Humans.\n...",
      solution: [
        L("pip install requests", "লাইব্রেরি নামাও", "download the library"),
        L("pip show requests", "বিস্তারিত দেখো", "show the details"),
      ],
      explanation: t("pip ইন্টারনেট (PyPI) থেকে লাইব্রেরি নামায়। `pip show` বলে কোন ভার্সন কোথায় ইনস্টল হলো।", "pip downloads libraries from the internet (PyPI). `pip show` tells which version was installed and where."),
    },
    {
      id: "ps-5",
      level: "medium",
      lang: "shell",
      title: t("venv বানাও আর চালু করো", "Create and activate a venv"),
      task: t("`kp1-project` ফোল্ডারে `.venv` নামে virtual environment বানাও, চালু করো, আর প্রমাণ করো যে চালু হয়েছে।", "In `kp1-project`, create a virtual environment named `.venv`, activate it, and prove it is active."),
      hint: t("চালু হলে প্রম্পটের শুরুতে `(.venv)` আসে। `where python` (Windows) / `which python` (Mac) দেখাবে .venv-এর ভেতরের Python।", "When active, the prompt starts with `(.venv)`. `where python` (Windows) / `which python` (Mac) shows the Python inside .venv."),
      expectedOutput: "(.venv) C:\\...\\kp1-project> where python\nC:\\...\\kp1-project\\.venv\\Scripts\\python.exe\nC:\\...\\Python312\\python.exe",
      solution: [
        L("python -m venv .venv", "environment বানাও", "create the environment"),
        L(".venv\\Scripts\\activate", "চালু করো (Mac: source .venv/bin/activate)", "activate (Mac: source .venv/bin/activate)"),
        L("where python", "কোন python চলবে? প্রথম লাইনটা চলে", "which python will run? the first line wins"),
      ],
      explanation: t("চালু করার পর তালিকার প্রথম python হলো `.venv`-এর ভেতরের টা। এখন pip যা ইনস্টল করবে সব এই প্রজেক্টের ভেতরে থাকবে।", "After activating, the first python in the list is the one inside `.venv`. Everything pip installs now stays inside this project."),
    },
    {
      id: "ps-6",
      level: "medium",
      lang: "shell",
      title: t("requirements.txt বানাও", "Create requirements.txt"),
      task: t("venv চালু রেখে `requests` আর `pytest` ইনস্টল করো। তারপর `requirements.txt` বানাও আর ফাইলে কী লেখা হলো দেখো।", "With the venv active, install `requests` and `pytest`. Then create `requirements.txt` and look at what was written."),
      hint: t("`pip freeze > requirements.txt` তারপর `type requirements.txt` (Mac: `cat`)।", "`pip freeze > requirements.txt` then `type requirements.txt` (Mac: `cat`)."),
      expectedOutput: "certifi==2024.8.30\ncharset-normalizer==3.4.0\nidna==3.10\niniconfig==2.0.0\npackaging==24.2\npluggy==1.5.0\npytest==8.3.3\nrequests==2.32.3\nurllib3==2.2.3",
      solution: [
        L("pip install requests pytest", "দুটো একসাথে ইনস্টল", "install both at once"),
        L("pip freeze > requirements.txt", "> মানে আউটপুট ফাইলে লেখো", "> means write the output into a file"),
        L("type requirements.txt", "ফাইলটা দেখো (Mac: cat requirements.txt)", "show the file (Mac: cat requirements.txt)"),
      ],
      explanation: t("শুধু দুটো ইনস্টল করলেও তালিকায় আরো নাম আসে — এরা requests/pytest-এর নিজেদের দরকারি লাইব্রেরি (dependencies)।", "You installed only two, yet more names appear — these are the libraries that requests/pytest themselves need (dependencies)."),
    },
    {
      id: "ps-7",
      level: "medium",
      title: t("কোন Python চলছে?", "Which Python is running?"),
      noRun: true,
      task: t("একটা প্রোগ্রাম লেখো যেটা প্রিন্ট করে: কোন Python ফাইল চলছে (`sys.executable`), আর venv-এর ভেতরে চলছে কি না।", "Write a program that prints which Python executable is running (`sys.executable`) and whether it runs inside a venv."),
      hint: t("venv-এর ভেতরে `sys.prefix` আর `sys.base_prefix` আলাদা হয়।", "Inside a venv, `sys.prefix` and `sys.base_prefix` are different."),
      expectedOutput: "C:\\Users\\you\\Desktop\\kp1-project\\.venv\\Scripts\\python.exe\nInside venv: True",
      solution: [
        L("import sys", "sys মডিউল Python নিজের তথ্য দেয়", "the sys module gives information about Python itself"),
        L("print(sys.executable)", "চলমান python.exe-এর পুরো ঠিকানা", "full path of the running python.exe"),
        L('print("Inside venv:", sys.prefix != sys.base_prefix)', "দুটো আলাদা হলে venv চালু", "if they differ, a venv is active"),
      ],
      explanation: t("VS Code-এ ভুল interpreter বাছাই করলে প্রথম লাইনে .venv থাকবে না — তখন \"No module named\" এরর আসবে।", "If the wrong interpreter is selected in VS Code, the first line won't contain .venv — and you will get \"No module named\" errors."),
    },
    {
      id: "ps-8",
      level: "medium",
      lang: "shell",
      title: t("ModuleNotFoundError ঠিক করো", "Fix a ModuleNotFoundError"),
      task: t("নতুন টার্মিনালে `python check_requests.py` চালালে এলো `ModuleNotFoundError: No module named 'requests'`। অথচ তুমি গতকাল ইনস্টল করেছিলে। কীভাবে ঠিক করবে?", "In a new terminal, `python check_requests.py` gives `ModuleNotFoundError: No module named 'requests'`. But you installed it yesterday. How do you fix it?"),
      hint: t("নতুন টার্মিনালে venv নিজে থেকে চালু হয় না।", "A venv is not active automatically in a new terminal."),
      expectedOutput: "200",
      solution: [
        L(".venv\\Scripts\\activate", "আগে venv চালু করো — লাইব্রেরি ওখানেই আছে", "first activate the venv — the library lives there"),
        L("python check_requests.py", "এবার চলবে", "now it runs"),
      ],
      explanation: t("লাইব্রেরি venv-এ ইনস্টল ছিল, কিন্তু টার্মিনাল চালাচ্ছিল সিস্টেমের Python। এরর পড়লেই বোঝা যায়: সমস্যা ইনস্টলে না, কোন Python চলছে তাতে।", "The library was in the venv, but the terminal ran the system Python. The error tells you: the problem is not the install, it is which Python runs."),
    },
    {
      id: "ps-9",
      level: "medium",
      title: t("প্রজেক্ট ইনফো কার্ড", "Project info card"),
      task: t("একটা প্রোগ্রাম লেখো যেটা নিচের মতো একটা কার্ড প্রিন্ট করে। লাইনগুলো `\"=\" * 24` দিয়ে বানাও।", "Write a program that prints a card like the one below. Make the lines with `\"=\" * 24`."),
      hint: t("লেখাকে সংখ্যা দিয়ে গুণ করলে সেটা ততবার পাশাপাশি লেখা হয়।", "Multiplying text by a number repeats it that many times."),
      expectedOutput: "========================\nProject: kp1-project\nPython: 3.12\nVenv: .venv\n========================",
      solution: [
        L('print("=" * 24)', "২৪টা = চিহ্ন", "24 = signs"),
        L('print("Project: kp1-project")', "প্রজেক্টের নাম", "project name"),
        L('print("Python: 3.12")', "ভার্সন", "version"),
        L('print("Venv: .venv")', "venv ফোল্ডার", "venv folder"),
        L('print("=" * 24)', "নিচের লাইন", "bottom line"),
      ],
      explanation: t("`\"=\" * 24` হাতে ২৪বার = টাইপ করার চেয়ে নিরাপদ — গুনতে ভুল হয় না।", "`\"=\" * 24` is safer than typing = 24 times — no counting mistakes."),
    },
    {
      id: "ps-10",
      level: "hard",
      lang: "shell",
      title: t("নতুন ল্যাপটপে প্রজেক্ট", "Project on a new laptop"),
      task: t("তোমার টিমমেট গিট থেকে প্রজেক্ট নামিয়েছে। ফোল্ডারে আছে `main.py` আর `requirements.txt`, কিন্তু `.venv` নেই। শূন্য থেকে চালানোর সব কমান্ড ক্রমানুসারে লেখো।", "Your teammate downloaded the project from git. The folder has `main.py` and `requirements.txt`, but no `.venv`. Write every command, in order, to run it from scratch."),
      hint: t("৫টা ধাপ: ফোল্ডারে ঢোকা, venv বানানো, চালু করা, লিস্ট থেকে ইনস্টল, চালানো।", "5 steps: enter the folder, create venv, activate, install from the list, run."),
      expectedOutput: "Successfully installed ... requests-2.32.3 pytest-8.3.3 ...\nHello, KP1!",
      solution: [
        L("cd kp1-project", "১. ফোল্ডারে ঢোকো", "1. enter the folder"),
        L("python -m venv .venv", "২. নিজের venv বানাও (গিটে venv থাকে না)", "2. create your own venv (git has no venv)"),
        L(".venv\\Scripts\\activate", "৩. চালু করো", "3. activate it"),
        L("pip install -r requirements.txt", "৪. লিস্টের সব লাইব্রেরি", "4. every library on the list"),
        L("python main.py", "৫. চালাও", "5. run it"),
      ],
      explanation: t("ক্রমটা গুরুত্বপূর্ণ: activate-এর আগে install করলে লাইব্রেরি সিস্টেম Python-এ চলে যাবে।", "The order matters: installing before activating puts the libraries into the system Python."),
    },
    {
      id: "ps-11",
      level: "hard",
      title: t("লাইব্রেরি আছে কি না চেক", "Check whether a library exists"),
      task: t("`importlib.util.find_spec(name)` কোনো মডিউল পাওয়া গেলে একটা বস্তু দেয়, না পেলে `None`। এটা দিয়ে প্রিন্ট করো `json` আর `not_a_real_lib` ইনস্টল আছে কি না।", "`importlib.util.find_spec(name)` returns an object if a module is found, otherwise `None`. Use it to print whether `json` and `not_a_real_lib` are installed."),
      hint: t("`find_spec(\"json\") is not None` → True/False।", "`find_spec(\"json\") is not None` → True/False."),
      expectedOutput: "json installed: True\nnot_a_real_lib installed: False",
      solution: [
        L("import importlib.util", "মডিউল খোঁজার টুল", "the tool to look for modules"),
        L('print("json installed:", importlib.util.find_spec("json") is not None)', "json Python-এর সাথেই আসে → True", "json ships with Python → True"),
        L('print("not_a_real_lib installed:", importlib.util.find_spec("not_a_real_lib") is not None)', "এমন কিছু নেই → None → False", "no such thing → None → False"),
      ],
      explanation: t("টেস্ট শুরুর আগে এভাবে এনভায়রনমেন্ট চেক করলে পরে রহস্যময় এররের বদলে পরিষ্কার মেসেজ দেওয়া যায়।", "Checking the environment like this before tests start lets you give a clear message instead of a mysterious error later."),
    },
    {
      id: "ps-12",
      level: "hard",
      lang: "shell",
      title: t("ভার্সন পিন ও আপগ্রেড", "Pin and upgrade versions"),
      task: t("`requests` এর পুরনো ভার্সন `2.31.0` ইনস্টল করো, ভার্সন দেখো, তারপর সর্বশেষ ভার্সনে আপগ্রেড করো আর requirements.txt আপডেট করো।", "Install the older `requests` version `2.31.0`, check the version, then upgrade to the latest and update requirements.txt."),
      hint: t("`==` দিয়ে নির্দিষ্ট ভার্সন, `--upgrade` দিয়ে সর্বশেষ।", "`==` for an exact version, `--upgrade` for the latest."),
      expectedOutput: "Version: 2.31.0\nVersion: 2.32.3",
      solution: [
        L("pip install requests==2.31.0", "নির্দিষ্ট পুরনো ভার্সন", "an exact older version"),
        L("pip show requests", "দেখাবে Version: 2.31.0", "shows Version: 2.31.0"),
        L("pip install --upgrade requests", "সর্বশেষ ভার্সনে নাও", "move to the latest version"),
        L("pip show requests", "দেখাবে নতুন ভার্সন", "shows the new version"),
        L("pip freeze > requirements.txt", "লিস্ট আপডেট করো, নাহলে টিম পুরনোটাই পাবে", "update the list, or the team keeps the old one"),
      ],
      explanation: t("আপগ্রেডের পর freeze না করলে তোমার কম্পিউটার আর টিমের কম্পিউটারে আলাদা ভার্সন চলবে — \"works on my machine\" বাগ।", "If you don't freeze after upgrading, your computer and the team's run different versions — a \"works on my machine\" bug."),
    },
    {
      id: "ps-13",
      level: "qa",
      lang: "shell",
      title: t("এনভায়রনমেন্ট চেকলিস্ট টেস্ট", "Environment checklist test"),
      task: t("একটা টেস্ট প্রজেক্ট CI সার্ভারে ফেল করছে কিন্তু তোমার ল্যাপটপে পাস করছে। প্রতিটি সম্ভাব্য কারণের জন্য কোন কমান্ড চালাবে, আর expected vs actual কী দেখলে কারণটা ধরা পড়বে — নিচের টেবিল দেখে কমান্ডগুলো চালাও।", "A test project fails on the CI server but passes on your laptop. For each possible cause, which command do you run, and which expected vs actual result reveals it? Run the commands from the table."),
      hint: t("একই কমান্ড দুই জায়গায় চালিয়ে ফল মেলাও।", "Run the same command in both places and compare."),
      boundary: [
        { input: "python --version", expected: "3.12.x (both)", why: t("CI-তে 3.8 থাকলে নতুন সিনট্যাক্স ভাঙে", "with 3.8 on CI, newer syntax breaks") },
        { input: "pip show pytest", expected: "Version: 8.3.3 (both)", why: t("আলাদা ভার্সন = আলাদা আচরণ", "different version = different behaviour") },
        { input: "pip freeze", expected: "same as requirements.txt", why: t("হাতে ইনস্টল করা কিন্তু লিস্টে নেই", "installed by hand but missing from the list") },
        { input: "dir / ls", expected: "main.py, tests/ visible", why: t("ভুল ফোল্ডার থেকে চালানো", "running from the wrong folder") },
      ],
      expectedOutput: "Python 3.12.4\nName: pytest\nVersion: 8.3.3",
      solution: [
        L("python --version", "Python ভার্সন মেলাও", "compare the Python version"),
        L("pip show pytest", "লাইব্রেরির ভার্সন মেলাও", "compare the library version"),
        L("pip freeze", "পুরো তালিকা requirements.txt-এর সাথে মেলাও", "compare the full list with requirements.txt"),
      ],
      explanation: t("টেস্টার শুধু \"ফেল করেছে\" বলে না — **expected** (আমার মেশিনে যা) আর **actual** (CI-তে যা) পাশাপাশি রেখে পার্থক্য বের করে। এনভায়রনমেন্টও টেস্ট ডেটার মতো।", "A tester does not just say \"it failed\" — they put the **expected** (my machine) and the **actual** (CI) side by side and find the difference. The environment is test data too."),
    },
  ],

  quiz: [
    {
      question: t("Python interpreter-এর কাজ কী?", "What does the Python interpreter do?"),
      options: [t("কোড সুন্দর করে লেখায় সাহায্য করে", "Helps you write code neatly"), t("Python কোড পড়ে কম্পিউটারকে দিয়ে চালায়", "Reads Python code and makes the computer run it"), t("লাইব্রেরি ডাউনলোড করে", "Downloads libraries"), t("ফাইল সেভ করে", "Saves files")],
      correctIndex: 1,
      explanation: t("Interpreter হলো দোভাষী। লেখার কাজ VS Code-এর, ডাউনলোড pip-এর।", "The interpreter is the translator. Writing is VS Code's job, downloading is pip's."),
    },
    {
      question: t("requirements.txt থেকে সব লাইব্রেরি ইনস্টলের কমান্ড কোনটা?", "Which command installs everything from requirements.txt?"),
      options: ["pip install requirements.txt", "pip install -r requirements.txt", "pip freeze requirements.txt", "python requirements.txt"],
      correctIndex: 1,
      explanation: t("`-r` মানে \"এই ফাইল পড়ে ইনস্টল করো\"।", "`-r` means \"read this file and install\"."),
    },
    {
      question: t("venv কেন ব্যবহার করি?", "Why do we use a venv?"),
      options: [t("কোড দ্রুত চালাতে", "To run code faster"), t("প্রতিটি প্রজেক্টের লাইব্রেরি আলাদা রাখতে", "To keep each project's libraries separate"), t("ইন্টারনেট ছাড়া চালাতে", "To run without internet"), t("ফাইল লুকাতে", "To hide files")],
      correctIndex: 1,
      explanation: t("আলাদা টিফিন বক্স — এক প্রজেক্টের ভার্সন আরেকটাকে নষ্ট করে না।", "Separate tiffin boxes — one project's versions never break another's."),
    },
    {
      question: t("venv চালু আছে কীভাবে বুঝবে?", "How can you tell a venv is active?"),
      options: [t("প্রম্পটের শুরুতে (.venv) দেখা যায়", "(.venv) appears at the start of the prompt"), t("VS Code লাল হয়ে যায়", "VS Code turns red"), t("pip কাজ করা বন্ধ করে", "pip stops working"), t("কিছুই বোঝা যায় না", "You cannot tell")],
      correctIndex: 0,
      explanation: t("activate করার পর প্রম্পটে `(.venv)` আসে।", "After activating, the prompt shows `(.venv)`."),
    },
    {
      question: t("`ModuleNotFoundError: No module named 'requests'` এর সবচেয়ে সম্ভাব্য কারণ?", "The most likely cause of `ModuleNotFoundError: No module named 'requests'`?"),
      options: [t("কোডে টাইপো", "A typo in the code"), t("লাইব্রেরি ইনস্টল নেই বা venv চালু নেই", "The library is not installed or the venv is not active"), t("ইন্টারনেট বন্ধ", "Internet is off"), t("ফাইলের নাম ভুল", "Wrong file name")],
      correctIndex: 1,
      explanation: t("Python যে environment-এ চলছে সেখানে requests নেই।", "requests is not in the environment Python is running in."),
    },
    {
      question: t("কোনটা গিটে রাখা উচিত না?", "Which one should NOT go into git?"),
      options: ["main.py", "requirements.txt", ".venv/", "tests/"],
      correctIndex: 2,
      explanation: t(".venv অনেক বড় আর requirements.txt থেকে আবার বানানো যায়।", ".venv is huge and can be rebuilt from requirements.txt."),
    },
    {
      question: t("`python main.py` দিলে `[Errno 2] No such file or directory` এলো। প্রথমে কী চেক করবে?", "`python main.py` says `[Errno 2] No such file or directory`. What do you check first?"),
      options: [t("Python আবার ইনস্টল", "Reinstall Python"), t("টার্মিনাল ঠিক ফোল্ডারে আছে কি না", "Whether the terminal is in the right folder"), t("pip আপগ্রেড", "Upgrade pip"), t("কম্পিউটার রিস্টার্ট", "Restart the computer")],
      correctIndex: 1,
      explanation: t("Python ফাইল খোঁজে বর্তমান ফোল্ডারে। `dir`/`ls` দিয়ে দেখো, `cd` দিয়ে ঠিক করো।", "Python looks in the current folder. Check with `dir`/`ls`, fix with `cd`."),
    },
    {
      question: t("`requests==2.32.3` লাইনের মানে কী?", "What does the line `requests==2.32.3` mean?"),
      options: [t("requests-এর যেকোনো ভার্সন", "Any version of requests"), t("ঠিক 2.32.3 ভার্সন", "Exactly version 2.32.3"), t("2.32.3 বা নতুন", "2.32.3 or newer"), t("requests মুছে ফেলো", "Remove requests")],
      correctIndex: 1,
      explanation: t("`==` মানে ঠিক এই ভার্সন। `>=` মানে এটা বা নতুন।", "`==` means exactly this version. `>=` means this or newer."),
    },
  ],
};
