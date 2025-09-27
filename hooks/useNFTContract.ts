"use client"

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

// Contract ABI - this would be generated from the contract
const VYNK_NFT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "tokenURI", "type": "string"},
      {"internalType": "string", "name": "prompt", "type": "string"},
      {"internalType": "uint256", "name": "creativity", "type": "uint256"},
      {"internalType": "uint256", "name": "promptAdherence", "type": "uint256"},
      {"internalType": "uint256", "name": "artisticQuality", "type": "uint256"},
      {"internalType": "uint256", "name": "overall", "type": "uint256"},
      {"internalType": "string", "name": "feedback", "type": "string"}
    ],
    "name": "publicMint",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getNFTData",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "prompt", "type": "string"},
          {"internalType": "uint256", "name": "creativity", "type": "uint256"},
          {"internalType": "uint256", "name": "promptAdherence", "type": "uint256"},
          {"internalType": "uint256", "name": "artisticQuality", "type": "uint256"},
          {"internalType": "uint256", "name": "overall", "type": "uint256"},
          {"internalType": "string", "name": "feedback", "type": "string"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
        ],
        "internalType": "struct VynkNFT.NFTData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Contract address - replace with your deployed contract address
const VYNK_NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export interface NFTData {
  prompt: string
  creativity: number
  promptAdherence: number
  artisticQuality: number
  overall: number
  feedback: string
  timestamp: number
}

export function useNFTContract() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { toast } = useToast()
  const [isMinting, setIsMinting] = useState(false)

  // Get total supply
  const { data: totalSupply } = useReadContract({
    address: VYNK_NFT_ADDRESS as `0x${string}`,
    abi: VYNK_NFT_ABI,
    functionName: 'totalSupply',
  })

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const mintNFT = async (
    tokenURI: string,
    prompt: string,
    creativity: number,
    promptAdherence: number,
    artisticQuality: number,
    overall: number,
    feedback: string
  ) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to mint an NFT",
        variant: "destructive",
      })
      return
    }

    if (VYNK_NFT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      toast({
        title: "Contract not deployed",
        description: "NFT contract address not configured",
        variant: "destructive",
      })
      return
    }

    setIsMinting(true)

    try {
      await writeContract({
        address: VYNK_NFT_ADDRESS as `0x${string}`,
        abi: VYNK_NFT_ABI,
        functionName: 'publicMint',
        args: [tokenURI, prompt, creativity, promptAdherence, artisticQuality, overall, feedback],
      })

      toast({
        title: "Transaction submitted",
        description: "Your NFT minting transaction has been submitted",
      })
    } catch (err) {
      console.error('Minting error:', err)
      toast({
        title: "Minting failed",
        description: "Failed to mint NFT. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsMinting(false)
    }
  }

  const getNFTData = async (tokenId: number): Promise<NFTData | null> => {
    try {
      // This would need to be implemented with useReadContract
      // For now, return null
      return null
    } catch (err) {
      console.error('Error fetching NFT data:', err)
      return null
    }
  }

  return {
    mintNFT,
    getNFTData,
    totalSupply: totalSupply?.toString() || "0",
    isMinting: isMinting || isPending || isConfirming,
    isConfirmed,
    error,
    contractAddress: VYNK_NFT_ADDRESS,
  }
}
