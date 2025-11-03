import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment...");

  // Get the deployer's address
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Define the initial supply (1 million tokens with 18 decimals)
  const initialSupply = ethers.parseUnits("1000000", 18);
  console.log("Initial supply:", ethers.formatUnits(initialSupply, 18), "tokens");

  // Deploy the contract
  console.log("\nDeploying RaylsToken contract...");
  const RaylsToken = await ethers.getContractFactory("RaylsToken");
  const token = await RaylsToken.deploy(initialSupply);

  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  console.log("\n✅ RaylsToken deployed successfully!");
  console.log("Contract address:", tokenAddress);
  console.log("Transaction hash:", token.deploymentTransaction()?.hash);

  // Verify deployment
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  const ownerBalance = await token.balanceOf(deployer.address);

  console.log("\n📋 Contract Details:");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Total Supply:", ethers.formatUnits(totalSupply, decimals));
  console.log("Owner Balance:", ethers.formatUnits(ownerBalance, decimals));
  console.log("Owner Address:", deployer.address);

  console.log("\n🎉 Deployment completed!");
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
