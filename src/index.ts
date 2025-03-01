import OpenAI from "openai";
import { createAssistant } from "./openai/createAssistant";



async function main(){
    const client = new OpenAI();
    const assistant = await createAssistant(client);
    console.log("Hello, world!")
}

main();