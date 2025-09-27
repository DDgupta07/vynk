# Vynk NFT Contract

This directory contains the smart contract for minting NFTs from the Vynk drawing app.

## Contract Features

- **ERC-721 Standard**: Full NFT compatibility
- **Metadata Storage**: Stores AI scores, prompts, and feedback
- **Public Minting**: Users can mint their own NFTs
- **Owner Minting**: Contract owner can mint on behalf of users
- **Data Retrieval**: Query NFT data including scores and timestamps

## Deployment Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile Contract
```bash
npm run compile
```

### 3. Start Local Hardhat Node
```bash
npm run node
```

### 4. Deploy to Local Network
In a new terminal:
```bash
npm run deploy
```

### 5. Deploy to Sepolia Testnet
```bash
# Set environment variables
export SEPOLIA_URL="your-sepolia-rpc-url"
export PRIVATE_KEY="your-private-key"
export ETHERSCAN_API_KEY="your-etherscan-api-key"

# Deploy
npm run deploy:sepolia
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# For Sepolia deployment
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key

# For frontend
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...your_deployed_contract_address
```

## Contract Address

After deployment, update the `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` environment variable with your deployed contract address.

## Testing

### Mint an NFT
```bash
# Update the contract address in scripts/mint.ts first
npm run mint
```

## Contract ABI

The contract ABI is automatically generated in `artifacts/contracts/VynkNFT.sol/VynkNFT.json` after compilation.

## Functions

### Public Functions
- `publicMint(tokenURI, prompt, creativity, promptAdherence, artisticQuality, overall, feedback)` - Mint an NFT
- `getNFTData(tokenId)` - Get NFT metadata
- `totalSupply()` - Get total number of minted NFTs

### Owner Functions
- `mintNFT(to, tokenURI, prompt, creativity, promptAdherence, artisticQuality, overall, feedback)` - Mint NFT to specific address

## Events

- `NFTMinted(tokenId, to, prompt, creativity, promptAdherence, artisticQuality, overall)` - Emitted when an NFT is minted
