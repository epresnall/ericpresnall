# Continue this work on the MacBook (desktop Claude Code)

## First time on this Mac — one copy-paste

Open Terminal and paste this whole line:

    git clone https://github.com/epresnall/ericpresnall.git ~/ericpresnall && cd ~/ericpresnall && git checkout claude/content-org-script-strategy-3u4743

(If the clone asks for a GitHub login and that's a hassle, install GitHub
Desktop, sign in, clone `epresnall/ericpresnall` from there, then run the
`git checkout` part in Terminal inside the folder.)

Then either:
- open the **Claude desktop app → Code tab → open the `ericpresnall` folder**, or
- run `claude` in Terminal inside that folder.

Say anything — even just **"what's next?"** The session auto-loads `AGENTS.md`,
which points it at the canonical task list in
`docs/PLAN-knowledge-library-and-content-engine.md`.

## Already cloned? Just sync

    cd ~/ericpresnall && git fetch origin && git checkout claude/content-org-script-strategy-3u4743 && git pull

## How the surfaces stay connected

- **The repo is the shared brain.** Web sessions (claude.ai/code), the desktop
  app, and mobile all read and write the same plan doc; every session pushes
  its updates, so the next session — on any surface — starts current.
- The original web session stays available at claude.ai/code in any browser.
- Once the Notion second brain exists (Task 1), it becomes the second shared
  home for context that isn't code-adjacent.
