import { ethers, run } from "hardhat";

async function main() {
  console.log("Starting deployment...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy the contract
  const initialSupply = ethers.parseUnits("1000000", 18);
  console.log("Initial supply:", ethers.formatUnits(initialSupply, 18), "tokens");

  console.log("\nDeploying RaylsToken contract...");
  const RaylsToken = await ethers.getContractFactory("RaylsToken");
  const token = await RaylsToken.deploy(initialSupply);

  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  console.log("\n✅ RaylsToken deployed successfully!");
  console.log("Contract address:", tokenAddress);
  console.log("Transaction hash:", token.deploymentTransaction()?.hash);

  // Wait for a few block confirmations
  console.log("\n⏳ Waiting for block confirmations...");
  await token.deploymentTransaction()?.wait(5);

  // Verify the contract
  console.log("\n🔍 Verifying contract on block explorer...");
  try {
    await run("verify:verify", {
      address: tokenAddress,
      constructorArguments: [initialSupply],
    });
    console.log("✅ Contract verified successfully!");
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("ℹ️ Contract is already verified!");
    } else {
      console.error("❌ Verification failed:", error.message);
      console.log("\n💡 You can verify manually later using:");
      console.log(`npx hardhat verify --network rayls ${tokenAddress} "${initialSupply.toString()}"`);
    }
  }

  // Display contract details
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

  console.log("\n🎉 Deployment and verification completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Process failed:");
    console.error(error);
    process.exit(1);
  });
