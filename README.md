# Generative Art Workshop

This repository contains the materials for a generative-art workshop organized around **concepts and systems** (not tools).

p5.js is our starting point because it lets us quickly turn ideas into visible behavior, but the same principles can be applied in many environments: code, shaders, hardware, sound, and interactive installations.

---

# Getting started

## Option 1 — Download the workshop files (recommended)

1. Click the green **Code** button above.
2. Choose **Download ZIP**.
3. Unzip the folder.

To run a sketch:

1. Open a lesson folder, for example:

```
00-p5-essentials
```

2. Open:

```
index.html
```

in your browser.

The sketch will run directly.

To edit the sketch:

1. Open:

```
sketch.js
```

in any text editor (VS Code recommended).
2. Make changes.
3. Save.
4. Refresh the browser to see the result.

No installation, build tools, or dependencies are required.

---

## Option 2 — Using VS Code

If you already use VS Code:

1. Open the workshop folder.
2. Open a lesson folder.
3. Edit:

```
sketch.js
```

4. Open:

```
index.html
```

in the browser.
5. Refresh after changes.

For the best editing experience, you can also use VS Code's Live Server extension.

---

## Option 3 — Using Git

If you already use Git:

```bash
git clone https://github.com/nicupo/genart-workshop.git
```

Then open the folder and follow the steps above.

---

# Saving your artwork

Most sketches include a save function.

Press:

```
S
```

to export the current canvas as a PNG image.

This allows your generated work to exist outside the browser.

---

# If something does not work

Check:

- Did you open `index.html` from the correct lesson folder?
- Did you save `sketch.js` before refreshing?
- Did you accidentally rename or move files?

The sketches are designed to run directly in the browser with no setup.

---

# Lesson structure

Each lesson folder follows the same layout:

- `index.html` — page shell, loads p5.js and connects the sketch
- `sketch.js` — the p5.js code for that lesson, heavily commented and written for clarity
- `style.css` — minimal page styling
- `README.md` — objective, key concepts, and experiments to try

Lessons are standalone and can be opened directly in a browser.

---

# Lessons (narrative order)

- `template`
- `00-p5-essentials`
- `01-randomness`
- `02-rules`
- `03-emergence`
- `04-cellular-automata`
- `05-reaction-diffusion`
- `06-interaction`
- `07-sound`
- `08-final-system`

---

# Coverage note

Not every in-person session covers every lesson.

The workshop follows a conceptual path, but the pace depends on the group's experience and available time.

This repository contains the full concept map, so lessons not reached during the workshop remain available for exploration afterwards.