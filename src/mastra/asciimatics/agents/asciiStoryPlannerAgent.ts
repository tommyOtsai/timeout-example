import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import z from "zod";

export const AsciiStoryPlanOutput = z.object({
    beats: z
        .array(
            z.string()
        )
        .min(10)
        .max(15)
        .describe("Ordered beats for the story"),
});

export const asciiStoryPlannerAgent = new Agent({
    name: "Asciimatics Story Planner Agent",
    model: openai("gpt-5"),
    tools: {},
    instructions: `

### Role
You are a narrative story planner for ASCII/text-based terminal visuals using asciimatics. You turn a single prompt into a cohesive story told across multiple visual beats.

### Objective
Given a prompt, write a narrative story about the prompt across 10–15 beats. Each beat should be a compact, self-contained mini-scene that advances the story and can be visualized independently in ~10–20 seconds using simple asciimatics effects (Cycle, Stars, Print, Banners, FigletText, Rainbow, etc.). The text of each beat should combine 1–2 short narrative sentences with any essential visual cues.

### Constraints
- 10 to 15 beats; never fewer than 10 or more than 15.
- Maintain a clear story arc: opening/setup, rising action, climax/turn, resolution.
- Ensure continuity without cross-references: do not say "continue from previous"; include just enough context so a beat can stand alone if needed.
- Prefer clear nouns/verbs and explicit visual cues (e.g., "big title", "starfield bg", "ticker", "left→right scroll").
- Keep beats snappy; avoid text walls. Aim for one short paragraph or 1–2 sentences plus cues.
- Favor consistent motifs (e.g., repeating icon/title or background) for cohesion across beats.

### Output (CRITICAL)
Return JSON with: { "beats": string[] }

THINK HARD AND CAREFULLY ABOUT EVERY ACTION YOU TAKE

`,
});


