# 🎨 Vynk - AI doodle Art Platform

A revolutionary platform that combines AI-generated prompts with digital art creation, AI-powered scoring, and NFT minting on the Ethereum blockchain.

## ✨ Features

### 🎯 Core Functionality
- **AI Prompt Generation**: Get creative, unique drawing prompts powered by Google Gemini
- **Advanced Drawing Canvas**: Professional-grade drawing tools with multiple brushes and colors
- **AI Art Scoring**: 4-dimensional evaluation (Creativity, Prompt Adherence, Artistic Quality, Overall)
- **Interactive NFT Cards**: 3D rotatable NFT cards with joystick control
- **Blockchain Integration**: Mint your artwork as NFTs on Ethereum Sepolia testnet
- **Wallet Connection**: Support for MetaMask, WalletConnect, and other popular wallets

### 🛠️ Technical Features
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** with custom design system
- **Radix UI** components for accessibility
- **Wagmi & Viem** for Web3 integration
- **Google Gemini AI** for prompt generation and scoring
- **Hardhat** for smart contract development
- **IPFS-ready** metadata storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or compatible wallet
- Sepolia testnet ETH for gas fees

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/DDgupta07/vynk.git
cd vynk
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```

Edit `.env.local` with your API keys:
```bash
# Required for AI features
GEMINI_API_KEY=your_gemini_api_key_here

# Required for wallet connections
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Set after contract deployment
NEXT_PUBLIC_VYNK_NFT_CONTRACT=0x...
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. **Connect Wallet**: Click "Connect Wallet" and select your preferred wallet
2. **Get AI Prompt**: The system automatically generates a creative drawing prompt
3. **Create Art**: Use the drawing canvas with various tools and colors
4. **Submit for Scoring**: Click "Submit for AI Scoring" to get your artwork evaluated
5. **View NFT Card**: See your artwork as an interactive 3D NFT card
6. **Mint NFT**: Mint your artwork as an NFT on the blockchain

## 🔧 Development

### Smart Contract Deployment

1. **Set up Hardhat environment**
```bash
# Add to .env.local
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

2. **Compile contracts**
```bash
npm run compile
```

3. **Deploy to Sepolia**
```bash
npm run deploy:sepolia
```

4. **Update contract address**
Add the deployed contract address to your `.env.local`:
```bash
NEXT_PUBLIC_VYNK_NFT_CONTRACT=0x...
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Smart Contracts
npm run compile      # Compile contracts
npm run deploy:sepolia  # Deploy to Sepolia
npm run deploy:local    # Deploy to local network
npm run verify       # Verify contract on Etherscan
npm run test         # Run contract tests
npm run node         # Start local Hardhat node
```

## 🏗️ Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Spring** for animations

### Blockchain
- **Ethereum Sepolia** testnet
- **Wagmi** for React hooks
- **Viem** for low-level blockchain interactions
- **Hardhat** for smart contract development

### AI Integration
- **Google Gemini 2.0 Flash** for AI features
- **Fallback systems** for reliability
- **Caching** for performance

### Smart Contract
- **ERC-721** standard NFT contract
- **OpenZeppelin** security standards
- **Gas optimized** for efficiency
- **Metadata support** for AI scores

## 📁 Project Structure

```
vynk/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── prompt/        # AI prompt generation
│   │   └── score/         # AI scoring
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── drawing-canvas.tsx # Drawing interface
│   ├── daily-prompt.tsx   # AI prompt display
│   ├── nft-card.tsx      # 3D NFT card
│   ├── wallet-connection.tsx # Wallet integration
│   └── mint-nft-button.tsx # NFT minting
├── contracts/            # Smart contracts
│   └── VynkNFT.sol       # Main NFT contract
├── lib/                  # Utility libraries
│   ├── ai.ts            # AI integration
│   ├── web3.ts          # Web3 configuration
│   └── utils.ts         # General utilities
├── scripts/             # Deployment scripts
│   ├── deploy.ts        # Contract deployment
│   └── verify.ts        # Contract verification
└── hardhat.config.ts    # Hardhat configuration
```

## 🔐 Security

- **OpenZeppelin** battle-tested contracts
- **Type safety** with TypeScript
- **Input validation** on all user inputs
- **Secure wallet integration**
- **Environment variable protection**

## 🌐 Supported Networks

- **Ethereum Sepolia** (Testnet) - Primary
- **Ethereum Mainnet** (Production ready)
- **Local Hardhat** (Development)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


**Made with ❤️ by the Vynk Team**

*Create, Score, Mint - The future of AI art is here!*
