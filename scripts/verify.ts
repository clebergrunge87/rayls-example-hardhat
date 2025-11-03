import { run } from "hardhat";
import { ethers } from "hardhat";

async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0xfe76a93F4c6c73f1827CD11493003A1caed6f465";

  // Constructor arguments (must match exactly what was used during deployment)
  const initialSupply = ethers.parseUnits("1000000", 18);

  console.log("Verifying contract at:", contractAddress);
  console.log("Constructor arguments:", initialSupply.toString());
  console.log("\nStarting verification process...\n");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [initialSupply],
    });
    console.log("\n✅ Contract verified successfully!");
    console.log("You can now view your contract on the block explorer.");
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("\nℹ️ Contract is already verified!");
      console.log("Check the block explorer to view the verified contract.");
    } else {
      console.error("\n❌ Verification failed:");
      console.error(error.message);
      console.log("\n💡 Troubleshooting tips:");
      console.log("1. Ensure the contract address is correct");
      console.log("2. Verify constructor arguments match deployment");
      console.log("3. Check that block explorer API is configured correctly");
      console.log("4. Wait a few more blocks and try again");
      console.log("\nManual verification command:");
      console.log(`npx hardhat verify --network rayls ${contractAddress} "${initialSupply.toString()}"`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
