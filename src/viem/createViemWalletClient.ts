import { createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { abstractTestnet } from 'viem/chains'
import { eip712WalletActions } from 'viem/zksync'
export function createViemWalletClient() {
    
    const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
    return createWalletClient({
        account,
        chain: abstractTestnet,
        transport: http()
}).extend(eip712WalletActions())
}