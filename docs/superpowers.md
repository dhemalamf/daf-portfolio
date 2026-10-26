# Superpowers in this repository

This project vendors [obra/superpowers](https://github.com/obra/superpowers) —
a software-development workflow packaged as agent skills — so every coding agent
that opens the repo works from the same process: brainstorm → plan → TDD →
review → finish.

## Provenance

| | |
|---|---|
| Upstream | https://github.com/obra/superpowers |
| Version | v7.0.1 |
| Commit | `2ce8aa15d05bd57213e6f746f953aafb7ded7a8b` (2026-10-21) |
| License | MIT — Copyright (c) 2025 Jesse Vincent (see `THIRD_PARTY_NOTICES.md`) |
| Vendored on | 2026-10-26 |

The `skills/` tree is copied to `.claude/skills/` with **one mechanical change**:
the upstream plugin namespace prefix is stripped from prose (`superpowers:brainstorming`
becomes `brainstorming`), because project-scoped skills have no plugin namespace.
No other edits. Keep it that way so future updates are a copy plus one `sed`, not
a merge. Project-specific rules belong in `CLAUDE.md` / `AGENTS.md`, never in the
skill files.

## What was installed

```
.claude/
├── settings.json                     # SessionStart hook registration
├── hooks/
│   └── superpowers-session-start     # injects using-superpowers at session start
└── skills/                           # 15 skills, 84 files (upstream copy)
    ├── using-superpowers/            # bootstrap: how and when to use skills
    ├── brainstorming/                # spec before code
    ├── writing-plans/                # plan from an approved spec
    ├── executing-plans/              # inline plan execution
    ├── subagent-driven-development/  # plan execution via subagents
    ├── test-driven-development/      # red/green/refactor
    ├── systematic-debugging/         # root cause before fixes
    ├── requesting-code-review/
    ├── receiving-code-review/
    ├── verification-before-completion/
    ├── finishing-a-development-branch/
    ├── using-git-worktrees/
    ├── dispatching-parallel-agents/
    ├── writing-skills/
    └── diagnosing-superpowers/
```

Skills are siblings on purpose: several skills reference each other with
relative paths such as `../subagent-driven-development/scripts/…`. Do not
flatten or rename the directories.

## How it runs

1. Claude Code starts a session and fires the `SessionStart` hook
   (`startup|clear|compact`), which pipes the full text of
   `using-superpowers` into the model context via
   `hookSpecificOutput.additionalContext`.
2. `using-superpowers` tells the model to invoke a matching skill before any
   response or action.
3. The model reads `.claude/skills/<skill>/SKILL.md` and follows its checklist.

Without step 1 the skills are inert — they sit on disk and never fire. That is
why the hook, not just the files, is part of the install.

Skill bodies originally referred to siblings as `superpowers:<name>`; that
plugin prefix is stripped in this install, so the name is the directory under
`.claude/skills/`.

## Verifying the install

```bash
# 1. The hook must emit valid JSON with non-empty additionalContext.
.claude/hooks/superpowers-session-start | python3 -m json.tool | head -20

# 2. All 15 skills must have parseable frontmatter with a description.
grep -L '^description:' .claude/skills/*/SKILL.md   # prints nothing when healthy

# 3. The project still builds.
npm run build
```

A live end-to-end check in Claude Code: start a session, send
`Let's add a contact form that actually sends email`, and confirm the agent
invokes `brainstorming` before writing code.

### Operational notes

- Claude Code asks you to approve a project hook the first time it sees one.
  Approve it, or review it with `/hooks` — without approval the skills stay
  inert.
- The hook is a bash script. On Windows, run Claude Code from Git Bash or WSL;
  if the shebang cannot be executed, change `command` in
  `.claude/settings.json` to
  `bash "$CLAUDE_PROJECT_DIR/.claude/hooks/superpowers-session-start"`.
- Hook output must be JSON on stdout and nothing else. If you edit the script,
  re-run the verification command and check that it still parses.


## Updating

```bash
git clone --depth 1 https://github.com/obra/superpowers.git /tmp/superpowers
rsync -a --delete --exclude '.git' /tmp/superpowers/skills/ .claude/skills/
# strip the plugin namespace prefix (the only local modification; on Linux
# GNU sed, drop the empty '' argument)
find .claude/skills -name '*.md' -exec sed -i '' 's/superpowers:\([a-z-]\)/\1/g' {} +
# then update the version/commit table above and re-run the verification steps
```

Review the diff before committing: upstream changes skill behavior, and skill
content shapes how every agent works in this repo.

## Using it from other harnesses

The skills are plain `SKILL.md` files, so any agent that can read files can use
them. `AGENTS.md` is the entry point for Codex, Cursor, Copilot, Gemini CLI, and
DSH; it points at `using-superpowers` and the task-to-skill table. Harnesses
with hooks (Claude Code) get the bootstrap automatically; harnesses without them
need the agent to read the bootstrap file first.

For DSH specifically, the global skill directory is `~/.dsh/skills/*.md` (flat
files, not nested `SKILL.md` trees), so these do not load there. Use `AGENTS.md`
when working in DSH.

## Scope

Upstream rejects project-specific content in core. Anything this project needs
that is not general-purpose (e.g. "always run `npm run build` before claiming
success") lives in `CLAUDE.md` / `AGENTS.md`, not in `.claude/skills/`.
