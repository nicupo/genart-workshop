# 05 — Reaction-Diffusion

## Objective
Understand reaction-diffusion — two virtual chemicals spreading across a grid and reacting with each other — as a continuous, "analog" sibling to cellular automata. Same neighbor-based logic as CA, but instead of on/off cells, every cell holds a smoothly-varying amount of two chemicals. Tune four parameters live with the keyboard and watch the pattern's entire personality change.

## How to run
Open `index.html` in a browser.

## Key concepts covered
- Two chemicals (A and B), each stored as its own grid of amounts, not just a single on/off state per cell
- The **Laplacian** — a weighted average of a cell and its neighbors, measuring how different a cell is from what surrounds it. This is what "diffusion" actually means: smoothing differences out, a little, every frame.
- The **reaction** — how much of chemical A gets converted into chemical B, depending on how much of both are already present at that cell
- **Feed rate** and **kill rate** — how fast A is replenished and how fast B is removed; these two numbers, together with how fast each chemical diffuses, decide everything about the resulting pattern (spots, stripes, maze-like shapes, or nothing at all)
- Computing an entire "next" grid before swapping it in — same reasoning as the cellular automata sketches: every cell needs to update based on the *current* state of its neighbors, not a mix of old and already-updated ones
- Drawing directly to pixels (`loadPixels()` / `updatePixels()`) instead of shapes, since we're rendering a smooth field rather than discrete cells
- A `switch` statement handling multiple keyboard keys — a clean lookup table ("for THIS key, do THIS") instead of a long chain of `if` conditions

## Keyboard controls
Each parameter has a dedicated "up" key and "down" key:

| Parameter | Up | Down |
|---|---|---|
| Feed rate | `f` | `r` |
| Kill rate | `k` | `i` |
| Diffusion of chemical A | `a` | `q` |
| Diffusion of chemical B | `b` | `g` |

Current values print to the browser console (View → Developer Tools) every time you press a key, so you can note down a combination you like.

## Try this
1. Let it run 10-15 seconds before touching anything — watch the pattern grow out from the seeded square in the center.
2. Press `f` a few times, then `k` a few times. Find a feed/kill combination that looks nothing like the default — note the numbers down if you find one you like.
3. Try setting diffusion of B much lower than diffusion of A (or vice versa, using `q`/`a` and `g`/`b`) — this ratio is what decides whether you get spots, stripes, or maze-like patterns.

## Next
Personalization — take what you've learned across these chapters and start shaping your own piece for the group composite.