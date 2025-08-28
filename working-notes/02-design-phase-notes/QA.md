# Questions & Answers about Design Documents

## 1. Why do we remove 'architecture-outline.md'?

We replaced architecture-outline.md with 04-tech-feasibility-check.md to increase the speed of our learning loop  and reduce waste, which are core principles of the Lean methodology.

Here’s the thinking:

  1. Problem with the Old `architecture-outline`: It was a heavyweight document that encouraged significant upfront technical planning. It asked for detailed API designs, data models, and phased implementation plans before we had validated our core business assumption. This is a classic trap: it leads to premature optimization and creates a solution that engineers can become attached to, making it harder to pivot or discard if the experiment fails. It front-loads effort on how to build something, when the real question is if we should be building it at all.

  2. Purpose of the New `tech-feasibility-check`: This new template is intentionally lightweight. It's not a plan; it's a quick gut-check that should take an engineer less than 15 minutes. Its only job is to answer two questions:

      * "Can we build a 'good enough' prototype for this experiment quickly and safely?"
      * "Is this a small experiment (less than 3 days), or is it secretly a large project in disguise?"
