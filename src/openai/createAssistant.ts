import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";

export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "gpt-4o-mini",
        name: "Luffy",
        instructions: `...`,
        tools: []
    })
}