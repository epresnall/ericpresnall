# Continue this work on the MacBook

## The direct transfer — pulls this exact session, conversation and all

In Terminal on the Mac (signed into the same claude.ai account):

    git clone https://github.com/epresnall/ericpresnall.git ~/ericpresnall
    cd ~/ericpresnall
    claude --teleport session_01M8JzoyM7mBjfby5kUi6DzP

Teleport fetches the working branch and loads the full conversation history
into the terminal — it's the same session, continued locally.

Notes:
- If `claude` isn't installed yet: `npm install -g @anthropic-ai/claude-code`
- Must run from a checkout of this repo; uncommitted changes are auto-stashed.
- The desktop app itself can't pull web sessions — teleport is a CLI feature.
  The desktop app and CLI can run side by side on the same folder.

## Future sessions — how anything stays connected

- Any web session at claude.ai/code has an **"Open in CLI"** option that copies
  its `claude --teleport <session-id>` command. Inside any CLI session,
  `/teleport` opens a picker of cloud sessions to pull.
- **The repo is the shared brain regardless of surface.** Every session
  auto-loads `AGENTS.md`, which points to the canonical task list in
  `docs/PLAN-knowledge-library-and-content-engine.md`. Whichever session does
  work updates that doc and pushes; the next session starts current.
- Fresh session without teleport? Open this folder and say "what's next?" —
  the AGENTS.md pointer does the rest.

## Already cloned? Just sync

    cd ~/ericpresnall && git fetch origin && git checkout claude/content-org-script-strategy-3u4743 && git pull
