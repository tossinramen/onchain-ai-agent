import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { handleRunToolCalls } from "./handleRunToolCall.js";

export async function performRun(run: Run, client: OpenAI, thread:Thread) {
    while (run.status === "requires_action") {
        run = await handleRunToolCalls(run, client, thread);
    }
    if (run.status === 'failed'){
        const errorMessage = `Encountered an error: ${run.last_error?.message || 'Unknown error'}`;
        console.error('Run failed', run.last_error);
        await client.beta.threads.messages.create(thread.id, {
            role: 'assistant',
            content: errorMessage
        });
        
    }
}