import { ethers } from "hardhat";

async function main() {
  console.log("Checking account balance...\n");

  // Get the account from environment
  const [account] = await ethers.getSigners();

  console.log("Account address:", account.address);

  // Get balance
  const balance = await ethers.provider.getBalance(account.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");

  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log("\nNetwork information:");
  console.log("Name:", network.name);
  console.log("Chain ID:", network.chainId.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
