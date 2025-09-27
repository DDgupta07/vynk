# 🎨 Vynk – Draw to Earn, Meme to Own 🌀

**Vynk** is an AI-powered creative playground on **EVM** that transforms doodles into NFTs and memes into onchain culture.
Every day, users receive a quirky drawing prompt, sketch in-browser, and compete for rewards through **AI scoring, leaderboards, NFT minting, and prediction markets**.

---

## ✨ Features

* **Daily Prompts** → AI-generated, meme-worthy challenges (e.g., *“jellyfish DJ in Tokyo”*).
* **In-Browser Canvas** → Draw directly in the dApp, no tools required.
* **AI Scoring (Next.js Routes)** → Gemini Vision judges creativity + relevance.
* **Onchain Leaderboards** → Rankings boosted by token staking multipliers.
* **NFT Minting** → Top submissions minted into **EVM-native NFTs**.
* **Prediction Markets** → Bet tokens on leaderboard outcomes.
* **AI Roasts & Virality** → X (Twitter) bot roasts + spreads art submissions.

---

## 💰 Token Utility

* **Staking** → Lock tokens to boost leaderboard multipliers.
* **Betting** → Onchain wagers on leaderboard outcomes.
* **Rewards** → Token payouts for winners & viral content.
* **NFT Minting** → Mint art as **ERC-721 NFTs**.
* **Governance** → Token holders vote on prompts + upgrades.

---

## 🧩 User Journey

**Prompt Discovery**

* User sees daily prompt via Vynk dApp or X bot.

**Drawing & Submission**

* Open canvas → sketch → connect wallet (Sepolia) → submit.

**AI Scoring**

* Submission sent to `/api/score`.
* Gemini Vision scores creativity, quality, and fit.

**Staking & Boosts**

* User stakes tokens → amplify leaderboard ranking.

**Leaderboard Competition**

* Scores + staking multipliers decide top spots.
* Spectators place bets on leaderboard outcomes.

**Minting & Rewards**

* Top-ranked art → minted as **NFTs** on Sepolia.
* Rewards distributed from smart contracts.

**Social Amplification**

* X bot roasts/praises submissions.
* Top art showcased on NFT marketplaces (OpenSea testnet).

---

## 🛠 Tech Stack

* **Frontend** → Next.js + Tailwind + Wagmi + RainbowKit
* **AI** → Gemini Vision for scoring
* **API** → Next.js Routes (`/api/score`, `/api/prompt`, `/api/tweet`)
* **Smart Contracts** → Solidity (leaderboard, staking, prediction, minting)
* **Storage** → IPFS + NFT metadata (ERC-721)
* **Social Bot** → X (Twitter) API + AI roast generator

---

## 📂 Repository Structure

```
vynk/
│── contracts/           # Solidity smart contracts (EVM)
│   ├── Leaderboard.sol
│   ├── Staking.sol
│   ├── Prediction.sol
│   └── NFTMint.sol
│── frontend/            # Next.js frontend + API routes
│   ├── pages/
│   │   ├── index.tsx    # Main UI (drawing + wallet)
│   │   └── api/
│   │       ├── score.ts # AI scoring
│   │       ├── prompt.ts# Daily prompt fetch
│   │       └── tweet.ts # X bot
│── docs/                # Whitepaper + diagrams
└── README.md            # Project overview
```

---

## ⚙️ Setup & Deployment

### **Prerequisites**

* Node.js v18+
* Hardhat / Foundry
* Wallet (Metamask with Sepolia ETH)
* API keys: Gemini Vision + X API

### **Steps**

```bash
# Clone Repo
git clone https://github.com/DDgupta07/vynk.git
cd vynk

# Deploy Contracts to Sepolia
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

# Run Next.js App
cd frontend
npm install
npm run dev
```

---

## 🚀 Hackathon MVP Scope

✅ Daily Prompt Bot (X + dApp login)
✅ In-browser Drawing Canvas (Next.js)
✅ AI Scoring via Gemini Vision (`/api/score`)
✅ Leaderboard Smart Contract (staking + rewards)
✅ NFT Minting Flow (ERC-721 on Sepolia)

---

## 🏆 Hackathon Goal

Deliver a working demo of **Vynk**:

* Users draw → submit → stake → mint NFTs.
* AI scoring + leaderboard contracts live on Sepolia.
* X bot drives community engagement & virality.
