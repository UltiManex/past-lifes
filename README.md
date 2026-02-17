# Past Lifes

Past Lifes is a lightweight text-and-image strategy simulator where each run places the player in a different historical (or speculative) scenario. Through branching choices, players accrue clues and Echo Shards to uncover who they were in a prior life.

## Features

- New randomized scenario each run
- Choice-driven trait system that shapes final identity reveal
- Variable-ratio random reinforcement rewards (Echo Shards)
- Save/load using localStorage
- Endings for discovery or death
- Mobile-friendly single-page interface

## Run (Windows, macOS, Linux)

No Python is required.

1. Open a terminal in the project folder.
2. Run:

```bash
npm run start
```

3. Open `http://localhost:4173` in your browser.

## Quick checks

```bash
npm run check
```

## Why your command failed on Windows

You tried `python3 -m http.server 4173`, but your machine doesn't have Python installed/in PATH. This project now includes a Node-based server (`npm run start`), so you can run it with the Node setup you already have.
