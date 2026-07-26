# 04 — Cellular Automata

Examples and small exercises exploring grid-based cellular automata.

Open `index.html`.

## What's running here

This is **Conway's Game of Life** — probably the most famous cellular automaton there is. A grid of cells, each one either alive or dead, all updating at the same time based on one simple question: *how many of my 8 neighbors are alive right now?*

That's it. No cell has a plan. No cell knows what the overall pattern looks like. Each one only ever looks at its immediate neighbors.

## The four rules

Every cell, every step, follows exactly these:

1. A live cell with **fewer than 2** live neighbors dies (loneliness).
2. A live cell with **2 or 3** live neighbors survives.
3. A live cell with **more than 3** live neighbors dies (overcrowding).
4. A dead cell with **exactly 3** live neighbors becomes alive (birth).

Four rules. That's the entire engine. Everything you see moving, growing, or dying out on screen comes from just those four lines repeated across the whole grid, every frame.

## What's a "glider"?

A **glider** is a small, specific arrangement of live cells (5 of them) that, under these four rules, ends up shifting one cell diagonally every 4 steps — it looks like it's "moving," even though no cell actually moved. Each step, the pattern just happens to regenerate itself one position over.

A **glider gun** (what this sketch starts with) is a larger, more complex pattern that periodically spits out a new glider, forever, without ever repeating itself back to its starting state. It's a good demo pattern for exactly that reason — unlike a random starting grid (which usually either dies out completely or freezes into static noise within a few seconds), a glider gun keeps producing new movement indefinitely.

## Reading the code

- `grid` holds the current state (1 = alive, 0 = dead) for every cell, stored as one flat list instead of a 2D array — `index(x, y)` converts an (x, y) position into the right spot in that list.
- `countNeighbors(x, y)` checks all 8 surrounding cells and adds up how many are alive.
- `step()` applies the four rules above to every cell at once, writing results into a separate `next` grid — this matters because all cells need to update *simultaneously*, based on the *current* state, not on cells that have already been updated this frame.
- The grid **wraps around at the edges** (the right edge connects to the left, the bottom to the top) — without this, patterns that drift off the edge would just disappear.
- `seedGliderGun()` places the specific starting pattern that produces the glider gun.

Try changing `frameDelay` at the top to speed up or slow down how fast it evolves, or replace `seedGliderGun(10, 10)` in `setup()` with your own pattern — `grid[index(x, y)] = 1` turns any cell on by hand.


## Additional notes:
Breaking it down piece by piece:

**The `pattern` array** is a hardcoded list of `[x, y]` coordinates — the specific 36 cells that need to start "alive" for a Gosper glider gun to emerge. These exact coordinates aren't derived from anything in the code; they're just the known, published layout for this particular pattern (discovered by Bill Gosper in 1970) — the same way you'd hardcode the exact pixel positions of a logo. There's no formula generating them, they're just looked up and typed in.

**The loop:**
```js
for(const [x, y] of pattern){
  grid[index(x + offsetX, y + offsetY)] = 1;
}
```
This walks through every `[x, y]` pair in that list, and for each one, sets that cell to alive (`1`) in the actual grid.

**Why `offsetX`/`offsetY` exist:** the coordinates in `pattern` are relative — written as if the gun starts at position `[0,0]` in the top-left corner. Adding `offsetX`/`offsetY` lets you place that same pattern anywhere on the grid without rewriting all 36 coordinates by hand. That's why `setup()` calls it as `seedGliderGun(10, 10)` — it shifts the whole pattern 10 cells right and 10 cells down from the corner, so it's not sitting flush against the edge where the wrap-around logic might behave oddly on the very first frame.

**Why `index(x + offsetX, y + offsetY)` and not just `x + offsetX + (y + offsetY) * cols`:** it reuses the same `index()` function `step()` uses elsewhere, which already handles the edge-wrapping — keeps the seeding logic consistent with how the rest of the simulation reads/writes the grid, rather than duplicating that math in two places.
- - -