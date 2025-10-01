import { createStep } from "@mastra/core";
import { safeParse, z } from "zod/v4";
import { asciiStoryPlannerAgent, AsciiStoryPlanOutput } from "../agents/asciiStoryPlannerAgent";

export const asciiStoryPlannerStep = createStep({
    id: "ascii-story-planner",
    inputSchema: z.object({
        prompt: z.string(),
    }),
    outputSchema: z.array(
        z.object({
            prompt: z.string(),
            index: z.number(),
        })
    ),
    execute: async ({ inputData }) => {
        const response = await asciiStoryPlannerAgent.generateVNext(
            [
                {
                    role: "user",
                    content: JSON.stringify({ prompt: inputData.prompt }),
                },
            ],
            {
                structuredOutput: { schema: AsciiStoryPlanOutput },
            }
        );

        const { object } = response;
        const { success, data } = safeParse(AsciiStoryPlanOutput, object);
        if (!success) {
            throw new Error("Failed to parse asciimatics story plan output");
        }
        console.log("Story planner token usage: ", response.usage);


        return data.beats.map((b, i) => ({ prompt: b, index: i }));
    },
});


