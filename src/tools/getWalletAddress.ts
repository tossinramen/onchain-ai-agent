import { Address } from "viem";
import { createViemWalletClient } from "../viem/createViemWalletClient";
import { ToolConfig } from "./allTools.js";

export const getWalletAddressTool: ToolConfig<{}> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_wallet_address',
            description: 'Get the AI bot\'s connected wallet address',
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    },
    handler: async () => {
        const walletClient = createViemWalletClient();
        const [address] = await walletClient.getAddresses(); 
        return address as Address;
    }
};
