import { createWorkflow } from "@mastra/core";
import { z } from "zod";
import { asciiCodeGeneratorStep } from "./steps/asciiCodeGeneratorStep";
import { asciiVisualizeStep } from "./steps/asciiVisualizeStep";
import { asciiStoryPlannerStep } from "./steps/asciiStoryPlannerStep";




export const createAsciiWorkflow = createWorkflow({
    id: "asciimatics-workflow",
    inputSchema: z.object({
        prompt: z
            .string()
            .describe(
                "High-level description of the terminal visualization (e.g., 'show animated banner with stars background that says Data Pipelines')."
            ),
    }),
    outputSchema: z.array(
        z.object({
            python: z.string(),
            index: z.number().optional(),
            coordinates: z.array(
                z.object({
                    name: z.string(),
                    x: z.number(),
                    y: z.number(),
                    notes: z.string().optional(),
                })
            ),
        })
    ),
})
    .then(asciiStoryPlannerStep)
    .foreach(asciiVisualizeStep, { concurrency: 10 })
    .foreach(asciiCodeGeneratorStep, { concurrency: 10 })
    .commit();



export const asciiWorkflow = createWorkflow({
        id: "asciimatics-workflow",
        inputSchema: z.array(z.object({
            prompt: z.string(),
        })),
        outputSchema: z.array(z.object({
            python: z.string(),
            index: z.number().optional(),
        })),
    }).foreach(createAsciiWorkflow)
    .commit();