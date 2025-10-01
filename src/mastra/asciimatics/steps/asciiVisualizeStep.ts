import { createStep } from "@mastra/core";
import { safeParse, z } from "zod/v4";
import { asciiVisualizeAgent, AsciiVisualizationOutput } from "../agents/asciiVisualizeAgent";

export const asciiVisualizeStep = createStep({
    id: "ascii-visualize",
    inputSchema: z.object({
        prompt: z.string(),
        index: z.number(),
    }),
    outputSchema: z.object({
        visualization: z.string(),
        index: z.number(),
    }),
    execute: async ({ inputData }) => {
        const response = await asciiVisualizeAgent.generateVNext(
            [
                {
                    role: "user",
                    content: JSON.stringify({ prompt: inputData.prompt }),
                },
            ],
            {
                structuredOutput: { schema: AsciiVisualizationOutput },
            }
        );

        const { object } = response;
        const { success, data } = safeParse(AsciiVisualizationOutput, object);
        if (!success) {
            throw new Error("Failed to parse asciimatics visualization output");
        }
        console.log("Visualize token usage: ", response.usage);

        return { visualization: data.visualization, index: inputData.index };
    },
});


