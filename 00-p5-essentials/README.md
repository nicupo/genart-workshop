# 00 — p5.js Essentials

## Objective
Get comfortable with the two functions every p5.js sketch is built from — `setup()` and `draw()` — the coordinate system, basic shapes, and how naming things as variables (instead of hardcoding numbers) lets you change a sketch's behavior without hunting through code.

By the end of this chapter you'll have one shape ("breathing" in size and color) driven entirely by variables you understand line by line.

## How to run
Open `index.html` in a browser. No build step, no install — just double-click the file or drag it into a browser tab.

## What's inside
- `index.html` — page shell, links `style.css` and `sketch.js`
- `sketch.js` — the p5.js code
- `style.css` — minimal page styling (canvas border, layout)

## Key concepts covered
- `setup()` runs once; `draw()` runs continuously (~60 times/sec)
- Coordinate system: (0,0) is top-left, x grows right, y grows **down**
- Basic shapes (`ellipse`), fill/stroke, `noStroke()`
- Variables driving shape properties instead of magic numbers
- `frameCount` as p5's built-in animation clock
- `sin()` for smooth oscillation between -1 and 1
- `map()` — rescaling a value from one range into another (used here to drive color from the same oscillation driving size)
- `saveCanvas()` - export the current canvas as a PNG image file

## Try this
1. Change `circleSize`'s base value (100) to 200. What happens?
2. Change the oscillation speed constant (0.05) to something else — does it affect size or speed?
3. Add a second circle, offset from the first, with its own oscillation.
4. Replace `frameCount` with `mouseX` — make the mouse control the circle instead of time. (This is the bridge into Chapter 01.)

## Next
Chapter 01 — Randomness: same skeleton, same habit of naming variables, but the clock gets replaced with pure randomness instead of your mouse.