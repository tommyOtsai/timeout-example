
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { asciiWorkflow, createAsciiWorkflow } from './asciimatics/asciiWorkflow';
import { createManimGameWorkflow } from './manim/manimWorkflow';


export const mastra = new Mastra({
  workflows: { createAsciiWorkflow, asciiWorkflow, createManimGameWorkflow },
  agents: { },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
