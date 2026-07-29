# 01 — Randomness

## Objective
Understand the difference between `random()` (unpredictable, no relationship between neighboring values) and `noise()` (smooth, nearby inputs produce nearby outputs) — use each to drive a whole *field* of shapes, learn how seeding makes randomness replicable, and get one small conditional (`if/else`) along the way.

## Files
- `sketch.js` + `index.html` + `style.css` — the finished reference version. This is what the repo documents as "Chapter 01."
- `sketch_workshop.js` — the scaffolded, hand-out version used live in the session. Same content, built up step by step: everything past Step 1 starts commented out, uncommented in order as it's taught. Swap `index.html`'s script reference to this file for the live session, or open it directly.

## How to run
Open `index.html` in a browser (points to `sketch.js` by default).

## Key concepts covered
- Looping over a grid (columns × rows) to draw many elements from one set of rules
- `random(min, max)` — independent, unpredictable per call
- `noise(x, y)` — smooth, spatially coherent; nearby cells get similar values
- Scaling noise input (`noiseScale`) to control the "grain" of the pattern
- Seeding (`randomSeed()`, `noiseSeed()`) — making randomness replicable: same seed, same result, every run
- A simple `if/else` conditional — checking a value and branching on it (not the same as the "rule" ingredient from Hour 1 — no formula translating a changing value over time, just a one-time yes/no branch)

## Try this
1. Change `currentSeed` from 42 to any other number, then back to 42 — confirm the exact same pattern returns.
2. Comment out the `noise()` circles, leave only `random()`. Notice the static-like look — no relationship between neighbors.
3. Comment out the `random()` circles, leave only `noise()`. Notice the smooth, organic clustering.
4. Change `noiseScale` from 0.1 to 0.02 — what changes about the pattern's grain?
5. Change the `0.6` threshold in the if-statement to `0.3` or `0.8` — watch how many marked cells appear change.
6. Bonus (brings back Hour 1's "time" ingredient) — add `frameCount` as a third argument to `noise()` to animate the field smoothly over time.

## Next
Hour 3 — Rules in practice: writing an actual neighbor-counting rule and building a cellular automaton.