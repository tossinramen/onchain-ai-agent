import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { tools } from "../tools/allTools";

export async function handleRunToolCalls(run: Run, client: OpenAI, thread: Thread): Promise<Run> {
    const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls;
    if (!toolCalls) return run;
    const toolOutputs = await Promise.all(
        toolCalls.map(async (tool) =>  {
            const toolConfig = tools[tool.function.name]; // get all of tool calls ai requested
            if (!toolConfig) {
                console.error(`Tool ${tool.function.name} not found`);
                return null;
            }
            try{
                const args = JSON.parse(tool.function.arguments); // get arguemtns requiered
                const output = await toolConfig.handler(args);// run function for each iteration
                return {
                    tool_call_id: tool.id,
                    output: String(output)
                };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    tool_call_id: tool.id,
                    output: `Error: ${errorMessage}`
                };
            }

        })
    );
    const validOutputs = toolOutputs.filter(Boolean) as OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput[];
    if (validOutputs.length === 0 ) return run;
    return client.beta.threads.runs.submitToolOutputsAndPoll(
        thread.id,
        run.id,
        { tool_outputs: validOutputs }
    );
}