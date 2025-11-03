# Quick Start Guide

Get up and running with the Rayls Hardhat example in 5 minutes!

## Prerequisites

- Node.js v18+ installed
- A wallet with Rayls devnet tokens

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Edit .env and add your private key
# PRIVATE_KEY=0xYourPrivateKeyHere
```

## Verify Setup

```bash
# Compile contracts
npm run compile

# Run tests
npm test
```

Expected: All tests should pass ✅

## Deploy to Rayls

```bash
# Deploy to Rayls devnet
npm run deploy
```

You should see output like:

```
✅ RaylsToken deployed successfully!
Contract address: 0xabcd...ef01
```

**Save the contract address!** You'll need it to interact with your token.

## Next Steps

1. **Check your balance:**
   ```bash
   npx hardhat run scripts/check-balance.ts --network rayls
   ```

2. **Interact with your token:**
   - Edit `scripts/interact.ts`
   - Replace `0xYOUR_CONTRACT_ADDRESS_HERE` with your deployed contract address
   - Run: `npx hardhat run scripts/interact.ts --network rayls`

3. **Add network to MetaMask:**
   - See [METAMASK_SETUP.md](METAMASK_SETUP.md) for detailed instructions

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile smart contracts |
| `npm test` | Run test suite |
| `npm run deploy` | Deploy to Rayls devnet |
| `npm run deploy:verify` | Deploy and verify on Rayls |
| `npm run verify` | Verify already deployed contract |
| `npm run flatten` | Flatten contract for manual verification |
| `npx hardhat console --network rayls` | Interactive console |
| `npx hardhat clean` | Clean artifacts and cache |

## Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Review the [Troubleshooting](README.md#troubleshooting) section
- Verify your `.env` configuration

## Project Structure

```
contracts/         → Smart contracts (.sol files)
scripts/          → Deployment and interaction scripts
test/             → Test files
hardhat.config.ts → Hardhat configuration
```

---

**Ready to build on Rayls! 🚀**
