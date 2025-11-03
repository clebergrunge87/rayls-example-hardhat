# Contract Verification Guide

Complete guide for verifying your smart contracts on the Rayls blockchain.

## Table of Contents

- [What is Contract Verification?](#what-is-contract-verification)
- [Why Verify?](#why-verify)
- [Quick Start](#quick-start)
- [Verification Methods](#verification-methods)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## What is Contract Verification?

Contract verification is the process of publishing your Solidity source code to a block explorer, which then compiles it and confirms that it matches the deployed bytecode on the blockchain.

Once verified:
- ✅ Anyone can read your contract's source code
- ✅ Users can interact with your contract via the block explorer UI
- ✅ The blockchain community can audit your code for security
- ✅ Your project gains trust and transparency

---

## Why Verify?

### Transparency & Trust
Users can see exactly what your contract does before interacting with it.

### Security
The community can audit your code for vulnerabilities and best practices.

### Ease of Use
Block explorers provide a web interface to read/write to verified contracts without writing code.

### Industry Standard
All professional blockchain projects verify their contracts. It's expected by users and investors.

---

## Quick Start

### Option 1: Deploy and Verify in One Step (Recommended)

```bash
npm run deploy:verify
```

This deploys your contract and automatically verifies it on the block explorer.

### Option 2: Verify After Deployment

If you already deployed your contract:

1. Edit `scripts/verify.ts` and replace the contract address:
   ```typescript
   const contractAddress = "0xYourActualContractAddress";
   ```

2. Run verification:
   ```bash
   npm run verify
   ```

### Option 3: Manual Command

```bash
npx hardhat verify --network rayls <CONTRACT_ADDRESS> "<CONSTRUCTOR_ARGS>"
```

**Example for RaylsToken:**
```bash
npx hardhat verify --network rayls 0xYourAddress "1000000000000000000000000"
```

---

## Verification Methods

### Method 1: Automated Verification Script

**File:** `scripts/deploy-and-verify.ts`

This script:
1. Deploys your contract
2. Waits for 5 block confirmations
3. Automatically verifies on the block explorer
4. Handles errors gracefully

**Run:**
```bash
npm run deploy:verify
```

**Features:**
- Automatic error handling
- Clear progress messages
- Fallback manual verification command on failure
- Complete deployment + verification in one command

### Method 2: Separate Verification Script

**File:** `scripts/verify.ts`

Use this when you've already deployed and want to verify later.

**Steps:**
1. Update contract address in `scripts/verify.ts`
2. Ensure constructor arguments match deployment
3. Run: `npm run verify`

### Method 3: Direct Hardhat Command

For quick verifications without scripts:

```bash
npx hardhat verify --network rayls \
  --contract contracts/RaylsToken.sol:RaylsToken \
  0xYourContractAddress \
  "1000000000000000000000000"
```

**When to use:**
- Quick one-off verifications
- Testing verification setup
- When scripts don't work

### Method 4: Flatten and Manual Verification

If automated verification fails, use manual verification via the block explorer:

**Step 1: Flatten the contract**
```bash
npm run flatten
```

This creates `RaylsToken-flattened.sol` with all dependencies in one file.

**Step 2: Clean up the flattened file**
- Open `RaylsToken-flattened.sol`
- Remove duplicate SPDX license identifiers (keep only the first one)
- Save the file

**Step 3: Manual verification on block explorer**
1. Go to the Rayls block explorer
2. Find your contract address
3. Click "Verify & Publish" (or similar)
4. Fill in the form:
   - Compiler version: `0.8.20`
   - Optimization: `Enabled`
   - Runs: `200`
   - Paste the flattened source code
   - Enter constructor arguments (ABI-encoded)

**Constructor Arguments Encoding:**

For 1,000,000 tokens (1M × 10^18):
```
0x00000000000000000000000000000000000000000000d3c21bcecceda1000000
```

To get ABI-encoded constructor arguments:
```typescript
import { ethers } from "hardhat";
const initialSupply = ethers.parseUnits("1000000", 18);
console.log(initialSupply.toString()); // Raw value
```

---

## Configuration

### 1. Environment Setup

Add to your `.env` file:

```env
PRIVATE_KEY=0xYourPrivateKey
```

### 2. Hardhat Configuration

Your `hardhat.config.ts` should include:

```typescript
etherscan: {
  apiKey: {
    rayls: "no-api-key-needed",
  },
  customChains: [
    {
      network: "rayls",
      chainId: 123123, // Must match your network config
      urls: {
        apiURL: "https://devnet-explorer.rayls.com/api",
        browserURL: "https://devnet-explorer.rayls.com"
      }
    }
  ]
}
```

**Note:** Rayls block explorer does not require an API key for contract verification.

---

## Troubleshooting

### Error: "Already Verified"

**Cause:** Contract is already verified on the explorer.

**Solution:** This is actually success! Check the block explorer to confirm.

---

### Error: "Constructor Arguments Mismatch"

**Cause:** The arguments you provided don't match what was used during deployment.

**Solution:**
1. Find your deployment transaction on the block explorer
2. Check the input data to see constructor arguments
3. Use the exact same values for verification

**For RaylsToken Example:**
- If you deployed with 1M tokens: `"1000000000000000000000000"`
- If you deployed with 5M tokens: `"5000000000000000000000000000"`

**Helper to get correct format:**
```typescript
import { ethers } from "hardhat";
const supply = ethers.parseUnits("1000000", 18);
console.log(supply.toString()); // Use this value
```

---

### Error: "Compiler Version Mismatch"

**Cause:** The Solidity compiler version doesn't match.

**Solution:**
- Check `hardhat.config.ts` → `solidity.version`
- Use the exact version: `0.8.20` (not `^0.8.20` or `0.8.x`)
- Ensure the version matches what was used during compilation

---

### Error: "Optimization Settings Mismatch"

**Cause:** Optimizer settings don't match deployment.

**Solution:**
Check your `hardhat.config.ts`:
```typescript
optimizer: {
  enabled: true,  // Must match
  runs: 200,     // Must match
}
```

Use these same settings when verifying manually.

---

### Error: "Network Not Supported"

**Cause:** The verification plugin doesn't recognize the network.

**Solution:**
Ensure `customChains` is configured in `hardhat.config.ts`:
```typescript
customChains: [
  {
    network: "rayls",
    chainId: 123123, // Must match networks.rayls.chainId
    urls: {
      apiURL: "https://explorer.rayls.com/api",
      browserURL: "https://explorer.rayls.com"
    }
  }
]
```

---

### Error: "Timeout" or "Connection Error"

**Cause:** Cannot connect to the block explorer API.

**Solution:**
1. Verify the explorer URLs are correct
2. Check if the explorer is operational
3. Try again after a few minutes
4. Verify your internet connection

---

### Error: "Contract Not Found"

**Cause:** Contract address doesn't exist or isn't deployed yet.

**Solution:**
1. Verify the contract address is correct
2. Check the transaction was confirmed on-chain
3. Wait a few more blocks and try again
4. Ensure you're using the correct network

---

## Best Practices

### 1. Verify Immediately After Deployment

Don't wait! Verify right after deploying while you have all the information fresh.

```bash
npm run deploy:verify  # Deploy and verify together
```

### 2. Document Constructor Arguments

Keep a record of what arguments you used:

```typescript
// deployment-log.txt
Contract: RaylsToken
Address: 0xabcd...
Initial Supply: 1000000 tokens (1000000000000000000000000 wei)
Deployer: 0x1234...
Timestamp: 2025-01-15 10:30:00
Network: Rayls Devnet
```

### 3. Test on Testnet First

Always deploy and verify on testnet before mainnet:
1. Verify the process works
2. Confirm explorer URLs are correct
3. Test the complete verification flow

### 4. Use Automated Scripts

Avoid manual commands when possible:
- Less prone to human error
- Easier to reproduce
- Better for CI/CD pipelines

### 5. Keep Config Consistent

Never change `hardhat.config.ts` after deployment:
- Compiler version
- Optimization settings
- Any other compilation settings

### 6. License Your Code

Always include a license identifier in your contracts:
```solidity
// SPDX-License-Identifier: MIT
```

This tells users how they can use your code.

### 7. Verify All Deployed Contracts

If you deploy multiple contracts, verify them all:
- Token contracts
- Factory contracts
- Proxy contracts
- Implementation contracts (for upgradeable contracts)

### 8. Save Verification URLs

After successful verification, save the block explorer URL:
```
https://explorer.rayls.com/address/0xYourContractAddress
```

Share this with your users and community.

---

## Additional Commands

### Verify Specific Contract

If you have multiple contracts in one file:
```bash
npx hardhat verify --network rayls \
  --contract contracts/RaylsToken.sol:RaylsToken \
  0xAddress \
  "args"
```

### List Supported Networks

```bash
npx hardhat verify --list-networks
```

### Check Verification Status

Visit your contract on the block explorer:
```
https://explorer.rayls.com/address/0xYourContractAddress
```

Look for:
- ✅ Green checkmark = Verified
- ❌ No checkmark = Not verified

---

## Summary

**Quick Verification:**
```bash
# Deploy and verify in one command
npm run deploy:verify

# Or verify existing contract
npm run verify  # After editing scripts/verify.ts
```

**Manual Verification:**
```bash
# Flatten contract
npm run flatten

# Upload RaylsToken-flattened.sol to block explorer
```

**Verification Checklist:**
- [ ] Contract is deployed and confirmed
- [ ] Explorer URLs are correct in config
- [ ] Constructor arguments are documented
- [ ] Compiler version matches
- [ ] Optimization settings match

---

## Resources

- [Hardhat Verification Plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify)
- [Etherscan Verification Guide](https://docs.etherscan.io/tutorials/verifying-contracts-programmatically)
- [Rayls Documentation](https://docs.rayls.com) (check for explorer-specific instructions)

---

**Questions?** Check the main [README.md](README.md) or [Troubleshooting](README.md#troubleshooting) section.
