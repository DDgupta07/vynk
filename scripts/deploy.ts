const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying VynkNFT contract...");

  const VynkNFT = await ethers.getContractFactory("VynkNFT");
  const vynkNFT = await VynkNFT.deploy();

  await vynkNFT.waitForDeployment();

  const address = await vynkNFT.getAddress();
  console.log("VynkNFT deployed to:", address);

  // Verify the contract on Etherscan (optional)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contract on Etherscan...");
    try {
      await vynkNFT.deploymentTransaction()?.wait(6); // Wait for 6 confirmations
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified on Etherscan!");
    } catch (error) {
      console.log("Verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
