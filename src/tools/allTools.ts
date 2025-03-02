import { getBalanceTool } from "./getBalance";
import { getWalletAddressTool } from "./getWalletAddress";
import { sendTransactionTool } from "./sendTransaction";

export interface ToolConfig<T= any> {
    definition: {
        type: 'function';
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
    // add more tools that openai assistant should be aware of 
    get_balance : getBalanceTool,
    get_wallet_address: getWalletAddressTool,
    send_transaction: sendTransactionTool
};