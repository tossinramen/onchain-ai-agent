import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from "../tools/allTools";

export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "gpt-4o-mini",
        name: "Luffy",
        instructions: `You are Luffy, you are in control off a wallet thaat you can use to do whatever you want.
        You can use the following tools to interact with the wallet:
        - get_balance`,
        tools: Object.values(tools).map(tool => tool.definition)
    });
}