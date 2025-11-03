# Adding Rayls Network to MetaMask

This guide will help you add the Rayls devnet to your MetaMask wallet so you can interact with deployed contracts.

## Prerequisites

- MetaMask browser extension installed ([Download](https://metamask.io/download/))
- A funded account with Rayls devnet tokens

## Steps to Add Rayls Network

### Method 1: Manual Addition

1. **Open MetaMask** and click on the network selector at the top

2. **Click "Add Network"** or "Add a network manually"

3. **Enter the following network details**:

   ```
   Network Name: Rayls Devnet
   RPC URL: https://devnet-rpc.rayls.com
   Chain ID: 123123
   Currency Symbol: RAYLS (or native token symbol)
   Block Explorer URL: ttps://devnet-explorer.rayls.com (Add if available)
   ```
 

4. **Click "Save"** to add the network

5. **Switch to Rayls Network** using the network selector

### Method 2: Programmatic Addition (Advanced)

You can also add the network programmatically using this JavaScript code:

```javascript
async function addRaylsNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0xB5757', // 743111 in hex
        chainName: 'Rayls Devnet',
        rpcUrls: ['https://devnet-rpc.rayls.com'],
        nativeCurrency: {
          name: 'Rayls',
          symbol: 'RAYLS', // Update with correct symbol
          decimals: 18
        },
        blockExplorerUrls: null // Add if available
      }]
    });
    console.log('Rayls network added successfully!');
  } catch (error) {
    console.error('Error adding network:', error);
  }
}
```

## Verifying Chain ID

To verify the correct Chain ID, you can run this command in your terminal:

```bash
curl -X POST https://devnet-rpc.rayls.com \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

Or use this Node.js script:

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://devnet-rpc.rayls.com");
const network = await provider.getNetwork();
console.log("Chain ID:", network.chainId.toString());
console.log("Chain ID (hex):", "0x" + network.chainId.toString(16));
```

## Importing Your Deployment Account

To interact with contracts you've deployed:

1. **Open MetaMask**
2. **Click on the account icon** (top right)
3. **Select "Import Account"**
4. **Paste your private key** (the same one from your `.env` file)
5. **Click "Import"**

**⚠️ Security Warning:**
- Only import accounts in MetaMask that are used for development/testing
- Never import production/mainnet accounts with significant funds
- Consider using a separate browser profile for development

## Getting Test Tokens

To get test tokens for gas fees:

1. Copy your wallet address from MetaMask
2. Visit the Rayls faucet (check Rayls documentation for URL)
3. Paste your address and request tokens
4. Wait for the transaction to complete

## Troubleshooting

### "Chain ID mismatch" error

If you see this error, the Chain ID in MetaMask doesn't match the network:

1. Remove the Rayls network from MetaMask
2. Verify the correct Chain ID using the methods above
3. Re-add the network with the correct Chain ID

### Cannot connect to network

- Verify the RPC URL is correct: `https://devnet-rpc.rayls.com`
- Check if the Rayls devnet is operational
- Try clearing MetaMask cache: Settings → Advanced → Reset

### Transactions not appearing

- Make sure you're connected to the Rayls network in MetaMask
- Check the transaction hash on the block explorer (if available)
- Verify you have enough tokens for gas fees

## Resources

- [MetaMask Documentation](https://docs.metamask.io/)
- [MetaMask Network Addition Guide](https://support.metamask.io/hc/en-us/articles/360043227612)
- Check Rayls official documentation for network details

---

**Note:** Always verify network details from official Rayls documentation before adding to MetaMask.
