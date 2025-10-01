import { createStep } from "@mastra/core";
import { safeParse, z } from "zod/v4";
import { asciiCodegenAgent, AsciiCodegenOutput } from "../agents/asciiCodegenAgent";

export const asciiCodeGeneratorStep = createStep({
    id: "ascii-code-generator",
    inputSchema: z.object({
        visualization: z
            .string()
            .describe("Visualization plan string describing the asciimatics scene/effects to implement"),
        index: z.number(),
    }),
    outputSchema: z.object({
        python: z.string(),
        index: z.number(),
        coordinates: z.array(
            z.object({
                name: z.string(),
                x: z.number(),
                y: z.number(),
                notes: z.string().optional(),
            })
        ),
    }),
    execute: async ({ inputData }) => {
        const response = await asciiCodegenAgent.generateVNext(
            [
                {
                    role: "user",
                    content: JSON.stringify(inputData, null, 2),
                },
            ],
            {
                structuredOutput: { schema: AsciiCodegenOutput },
            }
        );

        const { object } = response;
        const { success, data } = safeParse(AsciiCodegenOutput, object);
        if (!success) {
            throw new Error("Failed to parse asciimatics code generator output");
        }

        console.log("Code gen token usage: ", response.usage);

        return { python: data.python, index: inputData.index, coordinates: data.coordinates };
    },
});


