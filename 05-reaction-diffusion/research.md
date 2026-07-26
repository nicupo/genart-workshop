# Summary

The current lesson in 05-reaction-diffusion is not yet a true reaction–diffusion workshop lesson. The existing sketch uses a random draw loop on an offscreen graphics buffer and calls it “reaction–diffusion,” which is misleading and does not teach the core system dynamics the workshop promises to cover.

For a professional generative art workshop, this lesson should introduce the idea that a reaction–diffusion system is a local rule-based simulation where chemicals change state and diffuse across a grid. Students should see feedback, instability, self-organization, and emergent pattern formation rather than a decorative blur.

The missing instructional piece is a clear, simplified model that makes the mechanism legible in under 5–10 minutes while preserving the workshop’s emphasis on emergence and experimentation.

# Key Concepts

- Diffusion: particles or values spread out over space.
- Reaction: local state changes based on neighboring values and rules.
- Activator/inhibitor dynamics: one state promotes growth while another suppresses it.
- Turing patterns: spatial patterns that emerge from instability in a reaction–diffusion system.
- Gray–Scott model: a commonly taught two-component reaction–diffusion model that produces spots, stripes, and organic structures.
- Emergence: complex visual behavior arising from simple local rules.
- Parameter space: small changes in reaction coefficients can entirely change the resulting pattern.
- Iterative simulation: repeated updates on a grid create motion, structure, and unstable forms.

# Historical Context

Reaction–diffusion systems became widely known through Alan Turing’s 1952 paper “The Chemical Basis of Morphogenesis,” which proposed that simple biochemical interactions could generate complex spatial patterns in nature. This was foundational for understanding how pattern formation could emerge without a designer drawing every shape.

In computational art, reaction–diffusion gained visibility through the work of Karl Sims and the broader generative art community in the 1990s. The idea was attractive because it offered a mathematically grounded way to create organisms, textures, and structures that feel alive while remaining computable.

The lesson should frame reaction–diffusion not merely as a visual effect, but as a classic model for self-organization and pattern formation in nonlinear systems.

# Artists & Works

- Alan Turing — foundational theoretical work on morphogenesis and pattern formation.
- Karl Sims — widely cited for reaction–diffusion visual experiments and interactive simulation work.
- Jared Tarbell — known for computational, process-driven, organic visual systems and experiments in pattern formation.
- Vera Molnár — relevant as an example of rule-based, systematic art-making and generative structure.
- Casey Reas — influential in showing how code can produce visual systems with conceptual clarity.

The workshop brief specifically recommends these references, so the lesson should connect the math to the art-historical lineage rather than presenting reaction–diffusion as a mere coding exercise.

# Scientific Background

A basic reaction–diffusion system can be written as a pair of coupled partial differential equations:

$$
\frac{\partial u}{\partial t} = D_u \nabla^2 u + R(u, v)
$$

$$
\frac{\partial v}{\partial t} = D_v \nabla^2 v + S(u, v)
$$

where one variable diffuses more quickly than the other, and the reaction terms define local change. The key effect is that a system that is stable at the local level can become unstable once diffusion is introduced. This instability is what allows patterns to appear.

The Gray–Scott model is one of the most approachable implementations for teaching because it yields a rich parameter space with visually striking outcomes. Typical behavior includes:

- spots
- stripes
- branching or labyrinthine structures
- shifting organic fields

For workshop teaching, the important conceptual point is that the pattern is not drawn by the artist; it emerges from local rules operating repeatedly over a simulation grid.

# p5.js References

Use official and well-established p5.js references to keep the lesson short and focused:

- p5.js Reference: `createGraphics()` — for offscreen drawing buffers.
- p5.js Reference: `pixels`, `loadPixels()`, `updatePixels()` — for direct per-pixel simulation.
- p5.js Reference: `image()` — for drawing the simulation buffer to the canvas.
- p5.js Reference: `blend()` — for compositing and smoothing the visual output.
- p5.js Reference: `noStroke()` and `fill()` — for quick sketching and visual debugging.

The current lesson should be reworked around a small 2D grid so students can understand the data structure behind the visual result. A simple per-pixel or buffer-based update loop is more educational than a random overlay effect.

# Videos

- The Coding Train — “Reaction Diffusion Algorithm” challenge in p5.js.
  - Useful because it translates the concept into an approachable coding workflow and offers a public, beginner-friendly implementation path.
- Karl Sims reaction–diffusion tutorials and demonstrations.
  - Useful because they show the artistic and experimental potential of the system, not just the math.
- General explanatory lectures on Turing patterns and morphogenesis.
  - Useful for linking the simulation back to natural pattern formation, which reinforces the workshop’s focus on emergence.

# Visual References

Source:
- Wikipedia article on reaction–diffusion systems, especially the Gray–Scott and Turing pattern illustrations.
Why it's useful:
- It provides a clean scientific overview and quick visual examples of the kinds of structures that appear in the model.

Source:
- Karl Sims’ reaction–diffusion web experiments and tutorial materials.
Why it's useful:
- They demonstrate how a numerical system can be turned into a visually compelling, exploratory art practice.

Source:
- The Coding Train reaction–diffusion challenge page and source code.
Why it's useful:
- It offers a code-first entry point that matches the workshop’s p5.js audience and teaching style.

# Suggested Improvements

The lesson needs a stronger pedagogical structure before it can be considered workshop-ready:

1. Replace the placeholder blur with a minimal true reaction–diffusion model.
2. Introduce the idea of a simulation grid and neighborhood-based updates.
3. Show the difference between pure diffusion and reaction–diffusion.
4. Add a few simple parameter controls such as diffusion rates or feed/kill values.
5. Emphasize visual emergence over procedural drawing.
6. Keep the sketch compact, ideally under the workshop’s preferred size limit of about 200 lines.
7. Add short explanatory comments that connect the code to the concept being taught.
8. Make the lesson visually rewarding within the first 5–10 minutes.

The biggest missing element is not code complexity; it is conceptual clarity. Students need to understand what the system is doing, not just see a colorful blob.

# Possible Exercises

- Compare a pure diffusion simulation to a reaction–diffusion simulation and discuss what changes.
- Change the diffusion coefficients or reaction parameters and observe how the pattern changes.
- Add a small interaction control, such as mouse movement or a brush effect, to disturb the field.
- Experiment with noise, seed shape, or a small initial pattern and note how the final output differs.
- Build a “parameter explorer” that lets students browse patterns quickly and compare outcomes.
- Ask students to identify the most stable and unstable regions in the output and explain why they emerge.
- Extend the model into a more artistic system by layering thresholding, color mapping, or post-processing.

The most valuable exercise would be one that makes instability visible: start from a small seed and let students watch how symmetry breaks and new structure appears over time.
