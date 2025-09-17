import { Address } from 'viem';

// Contract address on Sepolia testnet
export const CONTRACT_ADDRESS: Address = '0x0000000000000000000000000000000000000000'; // Replace with actual deployed address

// Contract ABI (simplified version)
export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "miner",
        "type": "address"
      }
    ],
    "name": "MiningSessionStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "oreType",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      }
    ],
    "name": "OreMined",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "miner",
        "type": "address"
      }
    ],
    "name": "MiningSessionEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "claimId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "claimer",
        "type": "address"
      }
    ],
    "name": "OreClaimCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "claimId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "claimer",
        "type": "address"
      }
    ],
    "name": "OreClaimRevealed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "startMiningSession",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      }
    ],
    "name": "endMiningSession",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "claimId",
        "type": "uint256"
      }
    ],
    "name": "revealOreClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      }
    ],
    "name": "getMiningSessionInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "miner",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "totalMined",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isSettled",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "claimId",
        "type": "uint256"
      }
    ],
    "name": "getOreClaimInfo",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "goldAmount",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "emeraldAmount",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "rubyAmount",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "sapphireAmount",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "diamondAmount",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "totalValue",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isRevealed",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "claimer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "miner",
        "type": "address"
      }
    ],
    "name": "getMinerStats",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "totalSessions",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "totalOresMined",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "reputation",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
