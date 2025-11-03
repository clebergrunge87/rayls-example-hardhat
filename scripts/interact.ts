import { ethers } from "hardhat";

async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0xYOUR_CONTRACT_ADDRESS_HERE";

  console.log("Interacting with RaylsToken at:", contractAddress);

  // Get contract instance
  const RaylsToken = await ethers.getContractFactory("RaylsToken");
  const token = RaylsToken.attach(contractAddress);

  // Get current account
  const [account] = await ethers.getSigners();
  console.log("Using account:", account.address);

  // Get token information
  console.log("\n📋 Token Information:");
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();

  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Total Supply:", ethers.formatUnits(totalSupply, decimals));

  // Get balance
  console.log("\n💰 Account Balance:");
  const balance = await token.balanceOf(account.address);
  console.log("Balance:", ethers.formatUnits(balance, decimals), symbol);

  // Example: Uncomment to transfer tokens
  // const recipient = "0xRECIPIENT_ADDRESS";
  // const amount = ethers.parseUnits("100", decimals);
  // const tx = await token.transfer(recipient, amount);
  // await tx.wait();
  // console.log("Transfer completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
