# 1. Playwright Test Agents — Planner, Generator & Healer

> **Module goal:** By the end of this section you will have installed the three official Playwright Test Agents into a real project, produced a test plan with the **Planner**, turned that plan into runnable specs with the **Generator**, and repaired a deliberately broken test with the **Healer** — end to end, from scratch.

---

## 1.1. What you will build

You will take an existing (or brand new) Playwright project and add an agentic layer on top of it:

```
Your app  ──►  🎭 planner   ──►  specs/*.md        (human-readable test plan)
                   │
                   ▼
               🎭 generator ──►  tests/*.spec.ts   (runnable Playwright tests)
                   │
                   ▼
               🎭 healer    ──►  fixed tests / justified skips
```

Three agents, three distinct jobs:

| Agent | Job | Input | Output |
| --- | --- | --- | --- |
| 🎭 **planner** | Explores the live app and writes down *what* should be tested | A prompt + a seed test (+ optional PRD) | `specs/<feature>.md` |
| 🎭 **generator** | Turns the reviewed plan into *executable* tests, verifying locators live in the browser | `specs/<feature>.md` | `tests/<scenario>.spec.ts` |
| 🎭 **healer** | Runs a failing test, diagnoses it, patches it, re-runs until green | A failing test name | A passing test, or a skipped test if the app is genuinely broken |

**The important mental model:** these agents are *definitions* (instructions + tools) that Playwright writes into your repo. They do not contain an AI model. The intelligence comes from **your** AI client — VS Code + Copilot, Claude Code, Codex, or OpenCode. Playwright supplies the expertise; your client supplies the brain.

---

## 1.2. Prerequisites

Do not skip this section. Roughly 80% of "the agents don't show up" problems trace back to a missed prerequisite.

| Requirement | Minimum | How to check |
| --- | --- | --- |
| Node.js | 20.x LTS or newer | `node -v` |
| Playwright | **1.56.0+** (agents were introduced in 1.56) | `npx playwright --version` |
| VS Code | **1.105+** (released 9 Oct 2025) | `Code → About Visual Studio Code` |
| VS Code Playwright extension | Latest | Extensions panel → *Playwright Test for VSCode* |
| An AI client with an active model | Copilot / Claude Code / Codex / OpenCode | Open the chat panel and send "hi" |
| Browsers installed | — | `npx playwright install` |

> ⚠️ **The agents will install successfully even if you have no AI model connected — and then do absolutely nothing when prompted.** Confirm your chat client responds *before* you blame the agent setup.

---

## 1.3. Step 1 — Pre-check your environment

Run these first, every time you start this module.

```sh
# 1. Node version
node -v

# 2. Current Playwright version in this project
npx playwright --version

# 3. Latest published Playwright version
npm view playwright version
```

If your local version is behind the latest, upgrade. Agent definitions ship *inside* the Playwright package, so an old Playwright means old, less capable agents.

```sh
npm install -D @playwright/test@latest
npx playwright install
```

Verify the upgrade landed:

```sh
npx playwright --version
```

> 📌 **Rule to memorise:** *Every time you upgrade Playwright, re-run `init-agents`.* New releases ship new tools and sharper instructions, and your existing agent files will not pick them up automatically.

---

## 1.4. Step 2 — Have a working Playwright project

The agents **extend** a Playwright project; they do not create one. If you already have a project (you do, if you have been following this course), skip to §1.5.

### 1.4.1. Creating one from scratch

```sh
mkdir playwright-agents-practice
cd playwright-agents-practice
npm init playwright@latest
```

Accept the defaults: TypeScript, a `tests/` folder, a GitHub Actions workflow, and browser download.

### 1.4.2. Minimum viable `playwright.config.ts`

The agents read your config to learn *where* tests live and *what URL* to open. Make sure `baseURL` is set — the planner cannot explore an app it cannot find.

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://demo.playwright.dev/todomvc',  // ← your app under test
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Uncomment if your app runs locally:
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
```

> 🧪 **Practice app suggestion:** use `https://demo.playwright.dev/todomvc` for your first run. It is small, stable, and fully accessible — which means the generator produces clean role-based locators and you get to see the agents at their best before you point them at something messy.

---

## 1.5. Step 3 — Install the agent definitions

This is the single command at the heart of the module. Run it **from your project root**.

### 1.5.1. Pick the loop that matches your AI client

```sh
# VS Code + GitHub Copilot  ← what we use in this course
npx playwright init-agents --loop=vscode

# Claude Code
npx playwright init-agents --loop=claude

# Codex
npx playwright init-agents --loop=codex

# OpenCode
npx playwright init-agents --loop=opencode
```

The `--loop` flag decides **which file format** the agent definitions are written in. It is not a feature switch — all three agents are the same regardless of loop. Choose the one your team actually uses.

### 1.5.2. What just got created

Before you run the command, commit your work. After it, run:

```sh
git status
```

…and read every single new file. This is a teaching moment, not a formality. Broadly, you will see:

| Loop | Where definitions land | Format |
| --- | --- | --- |
| `vscode` | `.github/chatmodes/` | `*.chatmode.md` (one per agent) |
| `claude` | `.claude/agents/` | `*.md` subagent definitions |
| `codex` / `opencode` | Client-specific config directory | Markdown agent definitions |

Plus, in most setups, a **seed test** at `tests/seed.spec.ts`.

> 📖 **Homework for your students:** open one of the generated definition files and read it. It is plain Markdown — a system prompt plus a list of MCP tools the agent may call. Nothing is hidden. Once students see that an "AI agent" is a Markdown file with instructions, the mystique disappears and the debugging skill appears.

### 1.5.3. Expected project structure

```
playwright-e2e-tests/
├── .github/
│   └── chatmodes/              # 🎭 agent definitions (generated — do not hand-edit)
├── specs/                      # 🎭 planner output lands here
│   └── basic-operations.md
├── tests/
│   ├── seed.spec.ts            # environment bootstrap for the agents
│   └── add-valid-todo.spec.ts  # 🎭 generator output lands here
├── playwright.config.ts
└── package.json
```

If `specs/` does not exist, the planner creates it on first run.

---

## 1.6. Step 4 — Configure the seed test (the step everyone skips)

The **seed test** is the most under-appreciated part of this entire workflow, and it is where the difference between a hobby setup and a professional one shows.

### 1.6.1. What it does

The planner *runs* your seed test before exploring. That single run performs your global setup, project dependencies, fixtures, hooks, and authentication. It also serves as the **style template** — the generator imitates its imports and structure in every test it writes.

### 1.6.2. Minimal seed

```ts
// tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('/');
});
```

### 1.6.3. Realistic seed with custom fixtures

This is what you want in a real project — the agents inherit your login, your fixtures, and your conventions:

```ts
// tests/seed.spec.ts
import { test, expect } from '../fixtures';   // your project's custom fixtures

test('seed', async ({ loggedInPage }) => {
  // Everything the agents need to reach the app in an authenticated state
  await loggedInPage.goto('/dashboard');
});
```

> 🔐 **Auth-gated apps:** the planner can only explore what it can reach. If your app requires login, that login **must** happen in the seed test (or in global setup that the seed triggers). Otherwise the planner writes you a beautiful test plan for your login page and nothing else.

---

## 1.7. Step 5 — Verify the agents are available

**In VS Code:**

1. Reload the window — `Cmd/Ctrl + Shift + P` → *Developer: Reload Window*.
2. Open the Copilot Chat panel.
3. Open the **chat mode dropdown** (the mode selector at the bottom of the chat input).
4. You should now see `🎭 planner`, `🎭 generator`, and `🎭 healer` listed.

**In Claude Code:** run `/agents` and confirm the three Playwright agents appear in the list.

If they do not appear: see the troubleshooting table in §1.12.

---

## 1.8. Step 6 — Run the 🎭 planner

Select the **planner** chat mode. Attach `tests/seed.spec.ts` to the chat context (or name it explicitly in the prompt).

### 1.8.1. Prompt template

```
Using tests/seed.spec.ts as the seed, explore the application and generate
a test plan for the core todo operations: adding, completing, editing,
deleting, and filtering todos.

Save the plan to specs/basic-operations.md.
```

### 1.8.2. What happens

The planner opens a real browser, drives the app, and observes actual behaviour. It is not guessing from your source code — it is *using your product*.

### 1.8.3. Output

A Markdown file, e.g. `specs/basic-operations.md`:

```markdown
# TodoMVC Application - Basic Operations Test Plan

## Application Overview
...

## Test Scenarios

### 1. Adding New Todos
**Seed:** `tests/seed.spec.ts`

#### 1.1 Add Valid Todo
**Steps:**
1. Click in the "What needs to be done?" input field
2. Type "Buy groceries"
3. Press Enter key

**Expected Results:**
- Todo appears in the list with unchecked checkbox
- Counter shows "1 item left"
- Input field is cleared and ready for next entry
```

### 1.8.4. ✋ Review gate — do not skip

**Read the plan before generating anything.** This is your cheapest possible intervention point: fixing a wrong sentence in Markdown costs seconds; fixing forty wrong generated tests costs an afternoon.

Check for:

- [ ] Scenarios that are missing entirely (the planner only sees what your seed and data made reachable)
- [ ] Expected results that describe a *bug* as if it were correct behaviour
- [ ] Business rules the planner had no way to know — edit them in by hand
- [ ] Scenarios you do not want automated (delete them now)

Edit the Markdown freely. It is yours. The plan is the specification, and it should outlive any individual generated test.

---

## 1.9. Step 7 — Run the 🎭 generator

Switch to the **generator** chat mode and attach the plan file.

### 1.9.1. Prompt template

```
Generate Playwright tests from specs/basic-operations.md.
Follow the style and imports of tests/seed.spec.ts.
Write the tests into tests/.
```

To generate a single scenario instead of the whole plan:

```
Generate a test for scenario 1.1 from specs/basic-operations.md.
```

> 💡 **Reference scenarios by number, not by name.** In a long plan, names collide and the agent picks the wrong one. `1.1` is unambiguous.

### 1.9.2. Output

```ts
// spec: specs/basic-operations.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Adding New Todos', () => {
  test('Add Valid Todo', async ({ page }) => {
    // 1. Click in the "What needs to be done?" input field
    const todoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
    await todoInput.click();

    // 2. Type "Buy groceries"
    await todoInput.fill('Buy groceries');

    // 3. Press Enter key
    await todoInput.press('Enter');

    // Expected Results:
    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('1 item left')).toBeVisible();
    await expect(todoInput).toHaveValue('');
  });
});
```

Note the traceability header comments linking the test back to its spec and seed, and the numbered comments mapping each line back to a plan step. Teach your students to preserve these — they are what makes an agent-generated suite auditable six months later.

### 1.9.3. What the generator does differently from codegen

`npx playwright codegen` records *your* clicks. The generator *performs* the scenario itself, checks each locator resolves in the live DOM, and prefers role-based locators — falling back to CSS only when the app offers no semantic hooks. Generated tests may still contain initial errors. That is expected and by design: the healer's job is next.

---

## 1.10. Step 8 — Run the tests

```sh
npx playwright test

# Watch it happen
npx playwright test --headed

# Interactive, best for teaching
npx playwright test --ui

# Just one file
npx playwright test tests/add-valid-todo.spec.ts
```

Then open the report:

```sh
npx playwright show-report
```

Some tests will probably fail on the first run. Good — that is the setup for the next step.

---

## 1.11. Step 9 — Run the 🎭 healer

Switch to the **healer** chat mode.

### 1.11.1. Prompt template

```
The test "Add Valid Todo" in tests/add-valid-todo.spec.ts is failing.
Diagnose and fix it.
```

### 1.11.2. What the healer does

1. Replays the failing steps in a real browser
2. Inspects the live UI, page snapshot, and console output
3. Identifies the true cause — broken locator, strict-mode violation, timing, wrong data
4. Proposes a patch
5. Re-runs until the test passes or a guardrail stops the loop

### 1.11.3. The critical lesson for your students

> **The healer does not paper over real bugs.** If the checkout button genuinely stopped working, the healer is designed to **skip the test and flag it** rather than rewrite the assertion to make the failure disappear.

This is the single most important professional habit in this module. When a healer proposes a patch, the reviewer must answer one question: *did the test break, or did the product break?* An agent that "fixes" a test by weakening an assertion has just deleted a bug report. Read every healer diff with that question in mind.

### 1.11.4. Practice exercise — break it on purpose

Teach the healer by sabotaging a green test:

```ts
// Change a working locator to something wrong:
const todoInput = page.getByRole('textbox', { name: 'Add a new task' });   // ← wrong name
```

Run the suite, watch it fail, then ask the healer to fix it. Students see the full diagnose → patch → verify loop on a failure whose cause they already know — which is exactly how you build trust in a tool.

---

## 1.12. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Agents don't appear in the chat mode dropdown | VS Code below 1.105, or window not reloaded | Update VS Code, then *Developer: Reload Window* |
| `init-agents` is not a known command | Playwright below 1.56 | `npm install -D @playwright/test@latest` |
| Agents appear but do nothing | No AI model connected to your chat client | Sign in to Copilot / configure your model, test with a plain chat message |
| Planner only maps the login page | Auth not handled in the seed test | Move login into `seed.spec.ts` or global setup |
| Planner can't reach the app | `baseURL` missing or app not running | Set `baseURL`; start your dev server or configure `webServer` |
| Generated tests use brittle CSS selectors | App lacks ARIA roles / accessible names | Add semantic markup or `data-testid`; this is an app fix, not an agent fix |
| Healer loops without converging | Scope too broad | Point it at one failing spec file at a time |
| Agents feel dumber after an upgrade | Definitions are stale | Re-run `npx playwright init-agents --loop=<your-loop>` |

---

## 1.13. Best practices to teach alongside the tooling

1. **Keep a human approval gate after every agent.** Review the plan. Review the generated tests. Review the healer's patch. Agent output is a strong first draft, never a merge-ready artifact.
2. **Commit the specs.** `specs/*.md` is your second source of truth. Without it, a reviewer six months from now has only a generated assertion to tell them what the test was *supposed* to prove.
3. **Regenerate agents on every Playwright upgrade.** Put it in your upgrade checklist.
4. **Never auto-commit healer patches in CI.** Agents belong in interactive development. CI runs the *output*.
5. **One spec, one test file, wherever feasible.** Traceability beats cleverness.
6. **Invest in your app's accessibility.** Agents write role-based locators when roles exist. Better ARIA in the app is the highest-leverage way to improve every future generated test.
7. **Verify flakiness before trusting new tests:** `npx playwright test --repeat-each=5`.

---

## 1.14. CI integration

The output is ordinary Playwright — nothing agentic runs in your pipeline.

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]

permissions:
  contents: read          # do NOT grant write — CI must not commit agent patches

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

---

## 1.15. Student assignment

Replicate the full loop on an application of your own choosing:

1. Set up a Playwright project with a correct `baseURL` and a working seed test
2. Install the agents with your preferred loop
3. Plan **one** feature — resist the urge to plan everything at once
4. Review and hand-edit the plan; note in a comment what you changed and why
5. Generate the tests
6. Run them and record how many passed first try
7. Break one test deliberately and heal it
8. Break the *app* (comment out a button handler) and confirm the healer flags it rather than hiding it

**Deliverable:** your `specs/`, `tests/`, and a short write-up answering: *which parts did the agents get right, and which parts still needed a human?*

---

## 1.16. Known limitations (set expectations honestly)

- The planner only observes states reachable under your seed, account, data, and environment. It cannot know a requirement nobody wrote down.
- A plan can omit risk or describe a bug as expected behaviour.
- Live selector verification proves a locator works *today*. It does not prove long-term maintainability or parallel isolation.
- Generated tests may contain initial errors — the official docs acknowledge this openly.
- Agent runs are stateless. No memory between sessions, so prompt clarity and app stability directly determine output quality.

The judgement — *what* to test, whether the plan makes sense, whether a healer skip means the test is wrong or the feature is broken — stays with the engineer. Use the agents to go faster; use your own eyes to go correctly.

---

## 1.17. Command cheat sheet

```sh
node -v                                   # Node version
npx playwright --version                  # installed Playwright
npm view playwright version               # latest published

npm install -D @playwright/test@latest    # upgrade
npx playwright install                    # browsers

npx playwright init-agents --loop=vscode    # VS Code + Copilot
npx playwright init-agents --loop=claude    # Claude Code
npx playwright init-agents --loop=codex     # Codex
npx playwright init-agents --loop=opencode  # OpenCode

npx playwright test                       # run all
npx playwright test --headed              # visible browser
npx playwright test --ui                  # UI mode
npx playwright test --repeat-each=5       # flake check
npx playwright show-report                # HTML report
```

---

## 1.18. References

- [Playwright Test Agents](https://playwright.dev/docs/test-agents) — official documentation
- [Updating Playwright](https://playwright.dev/docs/intro#updating-playwright)
- [Playwright CLI](https://playwright.dev/agent-cli/introduction) — newer token-efficient CLI for coding agents
- [Playwright MCP](https://playwright.dev/mcp/introduction) — the tool layer the agents call
- [Playwright release notes](https://playwright.dev/docs/release-notes)
- [Best Practices](https://playwright.dev/docs/best-practices) · [Locators](https://playwright.dev/docs/locators)

---

*Agents were introduced in Playwright v1.56. This module targets v1.56 or later; run `npm view playwright version` to confirm you are on the current release, and re-run `init-agents` after every upgrade.*
