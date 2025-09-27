const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Minting NFT with account:", deployer.address);

  // Replace with your deployed contract address
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  const VynkNFT = await ethers.getContractFactory("VynkNFT");
  const vynkNFT = VynkNFT.attach(contractAddress);

  // Example NFT data
  const tokenURI = "https://example.com/metadata.json";
  const prompt = "A beautiful sunset over mountains";
  const creativity = 8;
  const promptAdherence = 9;
  const artisticQuality = 7;
  const overall = 8;
  const feedback = "Great artwork with excellent creativity!";

  console.log("Minting NFT...");
  const tx = await vynkNFT.publicMint(
    tokenURI,
    prompt,
    creativity,
    promptAdherence,
    artisticQuality,
    overall,
    feedback
  );

  const receipt = await tx.wait();
  console.log("NFT minted! Transaction hash:", receipt?.hash);

  // Get the token ID from the event
  const event = receipt?.logs.find(log => {
    try {
      const parsed = vynkNFT.interface.parseLog(log);
      return parsed?.name === "NFTMinted";
    } catch {
      return false;
    }
  });

  if (event) {
    const parsed = vynkNFT.interface.parseLog(event);
    const tokenId = parsed?.args[0];
    console.log("Token ID:", tokenId.toString());
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
