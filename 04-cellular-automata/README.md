# 04 — Cellular Automata

Examples exploring cellular automata, from the simplest possible version up to Conway's Game of Life.

Open `index.html`.

## Four sketches in this folder

`index.html` links one `<script>` tag — comment out whichever one you're not using and uncomment another to switch between them:
```html
<script src="sketch.js"></script>
<!-- <script src="sketch_binary.js"></script> -->
<!-- <script src="sketch_simple_game_of_life.js"></script> -->
<!-- <script src="sketch_game_of_life.js"></script> -->
```

- **`sketch.js`** — **start here.** The simplest possible cellular automaton: a single row of cells, each either on or off, following an explicit rule table ("Rule 30"). Press SPACE for a new random starting row. Covered in full below.
- **`sketch_binary.js`** — the exact same 1D automaton and the exact same rule, just packed into a single number (30) instead of an 8-line rule table, read with a bit-shift instead of a chain of if-statements. Same output, more compact code — worth a look once `sketch.js` makes sense, purely to see the same idea written two ways.
- **`sketch_simple_game_of_life.js`** — a jump up to two dimensions: Conway's Game of Life on a small random grid, press SPACE to re-randomize. Same "neighbors decide the next state" idea as `sketch.js`, just a 2D grid and a richer rule (counting up to 8 neighbors instead of just left/right).
- **`sketch_game_of_life.js`** — Conway's, seeded with a specific famous pattern (a glider gun) instead of randomness, so you can watch the same rules produce controlled, repeating motion rather than a random outcome.

---

## `sketch.js` — Elementary Cellular Automata

### What is a cellular automaton?
A system made of many simple cells. Picture a single row of cells, each one either off or on:

```
□ □ ■ □ ■ ■ □      or, the same thing:      0 1 1 0 0 1 0
```

Every generation (step), each cell looks at itself and its two neighbors — left, center, right — and a **rule** decides what that cell becomes next. The new row replaces the old one, and each row gets drawn one below the last, so the whole canvas becomes a visual history of every generation so far.

The important idea: no cell knows the whole picture. No cell has a goal. No cell is trying to create a pattern. Whatever pattern appears is just what falls out of one tiny rule, applied identically, everywhere, over and over. That's **emergence** — complex, global behavior from simple, local rules.

### The rule — "Rule 30"
A rule is just a list of answers, one for every possible 3-cell neighborhood. There are exactly 8 possible neighborhoods (each of the 3 cells is either 0 or 1, so 2×2×2 = 8):

| neighborhood | next state |
|---|---|
| 1 1 1 | 0 |
| 1 1 0 | 0 |
| 1 0 1 | 0 |
| 1 0 0 | 1 |
| 0 1 1 | 1 |
| 0 1 0 | 1 |
| 0 0 1 | 1 |
| 0 0 0 | 0 |

That specific table is "Rule 30" — it produces a chaotic, organic-looking pattern despite being fully deterministic (the same starting row always produces the exact same result). Different tables = completely different worlds, using this exact same mechanism.

### Controls
- **SPACE** — generates a new random starting row (same rule, new beginning).
- Uncomment the `randomizeRule()` line inside `keyPressed()` for a completely new rule too, not just a new starting row.

### Reading the code
- `cells` holds the current generation; `nextCells` is where the next one gets calculated.
- `rule` is the 8-answer table above, written out explicitly.
- `applyRule(left, center, right)` looks up the answer for one specific neighborhood — one line per case, matching the table directly, no hidden math.
- `createNextGeneration()` builds the whole next row before replacing the current one — every cell needs to see the *same* snapshot of its neighbors, not a mix of old and already-updated ones.
- The first and last cells in each row have a missing neighbor (nothing to one side) — kept simply off, for this version.

### Try this
1. Press space several times. Notice some starting rows produce neat, repeating triangles, some produce total chaos, and some die out to a blank row almost immediately — same rule every time, different starting condition.
2. Look at `sketch_binary.js` next to this one — same table, same output, packed into a single number instead of 8 lines.

---

## `sketch_binary.js` — the compact version

Because there are only 8 possible neighborhoods, the whole rule can be packed into a single number instead of an 8-item table — "Rule 30" is literally the number 30, written in binary as `00011110`. Looking up an answer becomes one bit-shift instead of 8 if-statements: shorter, and genuinely faster (one shift and mask vs. checking up to 8 conditions in sequence) — though at this scale, the difference is invisible. Same controls, same output as `sketch.js`.

---

## `sketch_simple_game_of_life.js` and `sketch_game_of_life.js` — into two dimensions

Both run Conway's Game of Life — same underlying idea as `sketch.js` (neighbors decide the next state), just a 2D grid instead of one row, and a richer rule:

1. A live cell with **fewer than 2** live neighbors dies (loneliness).
2. A live cell with **2 or 3** live neighbors survives.
3. A live cell with **more than 3** live neighbors dies (overcrowding).
4. A dead cell with **exactly 3** live neighbors becomes alive (birth).

**`sketch_simple_game_of_life.js`** starts from a small random grid — press SPACE to throw it away and start over with a fresh one, same rule, often a very different outcome.

**`sketch_game_of_life.js`** starts instead from a specific, famous seeded pattern: a **glider gun** (a structure that periodically spits out **gliders** — small 5-cell patterns that appear to "move" diagonally, even though no cell actually moves — each step, the shape just regenerates itself one position over). Unlike a random grid, which usually dies out or freezes within a few seconds, a glider gun keeps producing new movement indefinitely, which is why it's a good demo pattern.