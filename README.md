# ⛏️ Secure Ore Quest

> **"Mine in Privacy, Earn in Public"** - The world's first FHE-enabled blockchain mining game

A revolutionary decentralized mining game that combines the excitement of cryptocurrency mining with cutting-edge **Fully Homomorphic Encryption (FHE)** technology. Experience true privacy in mining while maintaining complete transparency in earnings.

![Secure Ore Quest](https://img.shields.io/badge/Status-Live-brightgreen)
![FHE Technology](https://img.shields.io/badge/FHE-Enabled-blue)
![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## ⛏️ Unique Features

### 🔐 **Privacy-First Mining**
- **🔒 Encrypted Mining Sessions**: All mining operations are encrypted using FHE
- **💎 Private Ore Discovery**: Your mining results remain secret until you choose to reveal them
- **🛡️ Zero-Knowledge Proofs**: Prove your mining without revealing sensitive data

### ⛓️ **Blockchain Security**
- **🔗 Immutable Claims**: All mining claims are secured on Ethereum Sepolia testnet
- **📜 Smart Contract Integration**: FHE-enabled contracts for secure computations
- **✨ Transparent Settlement**: Public verification of all revealed earnings

### 🎮 **Gamified Experience**
- **🟨 Gold**: The classic mining reward
- **🟩 Emerald**: Rare green gems
- **🟥 Ruby**: Precious red stones
- **🟦 Sapphire**: Beautiful blue crystals
- **💎 Diamond**: The ultimate mining prize
- **⚡ Real-time Mining**: Interactive mining interface with progress tracking
- **🏆 Reputation System**: Build your mining reputation through consistent performance

### 🔗 **Web3 Integration**
- **🌈 Multi-Wallet Support**: Connect with Rainbow, MetaMask, WalletConnect, and more
- **🚀 Seamless UX**: One-click wallet connection with RainbowKit
- **📱 Cross-Platform**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/secure-ore-quest.git

# Navigate to the project directory
cd secure-ore-quest

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Setup

Create a `.env.local` file:

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

> **Note**: Replace the placeholder values with your actual API keys and project IDs.

## 🎯 How to Play

1. **🔗 Connect Wallet**: Link your Web3 wallet to start your mining journey
2. **⛏️ Start Mining**: Begin an encrypted mining session
3. **💎 Discover Ores**: Mine different types of valuable ores
4. **🔐 Encrypt Claims**: All findings are automatically encrypted
5. **📊 Settle & Reveal**: Choose when to reveal your encrypted earnings

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** with custom pixel-perfect design system
- **shadcn/ui** components for consistent UI/UX

### Blockchain Integration
- **Wagmi v2.9.0** for Ethereum interactions
- **RainbowKit v2.2.8** for wallet connections
- **Viem v2.33.0** for low-level blockchain operations
- **FHE Solidity** for encrypted computations

### Smart Contract Features
```solidity
// FHE-enabled mining session
struct MiningSession {
    euint32 sessionId;
    euint32 goldOre;
    euint32 emeraldOre;
    euint32 rubyOre;
    euint32 sapphireOre;
    euint32 diamondOre;
    euint32 totalMined;
    bool isActive;
    bool isSettled;
    address miner;
}
```

## 📁 Project Structure

```
⛏️ secure-ore-quest/
├── 📁 contracts/              # 🔐 FHE Smart Contracts
│   ├── SecureOreQuest.sol    # ⛏️ Main mining contract
│   └── deploy.js             # 🚀 Deployment scripts
├── 📁 src/
│   ├── 📁 components/        # ⚛️ React Components
│   │   ├── 📁 ui/           # 🎨 shadcn/ui components
│   │   ├── GameHeader.tsx   # 🎮 Game header
│   │   ├── MiningInterface.tsx # ⛏️ Mining interface
│   │   └── WalletConnect.tsx   # 🔗 Wallet connection
│   ├── 📁 lib/              # 🛠️ Utilities & Config
│   │   ├── contract.ts      # 📜 Contract ABI & addresses
│   │   ├── wagmi.ts         # 🔗 Wallet configuration
│   │   └── utils.ts         # 🔧 Helper functions
│   └── 📁 pages/            # 📄 Page components
├── 📄 DEPLOYMENT.md         # 🚀 Vercel deployment guide
└── 📄 README.md             # 📖 This file
```

## 🛠️ Development

### Available Scripts

```bash
🚀 npm run dev          # Start development server
🏗️ npm run build        # Build for production
👀 npm run preview      # Preview production build
🔍 npm run lint         # Run ESLint
⚙️ npm run compile      # Compile smart contracts
🚀 npm run deploy       # Deploy to Sepolia testnet
```

### Smart Contract Development

```bash
📦 npm install              # Install Hardhat dependencies
⚙️ npm run compile          # Compile contracts
🚀 npm run deploy           # Deploy to Sepolia
🏠 npm run deploy:local     # Deploy locally
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Set Environment Variables**: Add all required env vars
3. **Deploy**: Automatic deployment on push to main

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy dist/ folder to your hosting service
```

## 🔧 Configuration

### Network Settings
- **Chain**: Ethereum Sepolia Testnet
- **Chain ID**: 11155111
- **RPC**: Your configured RPC endpoint
- **Explorer**: [Sepolia Etherscan](https://sepolia.etherscan.io/)

### Wallet Support
- 🦊 **MetaMask** - The most popular Web3 wallet
- 🌈 **Rainbow Wallet** - Beautiful and user-friendly
- 🔗 **WalletConnect** - Connect any wallet
- 🏦 **Coinbase Wallet** - Secure and trusted
- 🛡️ **Trust Wallet** - Mobile-first experience

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 🚀 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔄 **Open** a Pull Request

### Development Guidelines
- 📝 Follow TypeScript best practices
- 💬 Use conventional commit messages
- 🧪 Add tests for new features
- 📚 Update documentation as needed

## 📊 Roadmap

### Phase 1: Core Features ✅
- ✅ FHE-enabled smart contracts
- ✅ Wallet integration
- ✅ Basic mining interface
- ✅ Encrypted ore storage

### Phase 2: Enhanced Gameplay 🚧
- 🔄 Mining difficulty adjustments
- 🏆 Leaderboards and competitions
- 🎨 NFT rewards for rare ores
- 👥 Multiplayer mining sessions

### Phase 3: Advanced Features 📋
- 🌉 Cross-chain mining
- 💰 Staking mechanisms
- 🗳️ Governance tokens
- 📱 Mobile app

## 🛡️ Security

- 🔐 **FHE Protection**: All sensitive data encrypted using Zama's FHE technology
- 🔍 **Smart Contract Audits**: Regular security audits of all contracts
- 📖 **Open Source**: Full transparency in code and operations
- 🧪 **Testnet First**: All features tested on Sepolia before mainnet

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 🔐 **Zama** for FHE technology and Solidity libraries
- 🌈 **Rainbow** for wallet connection infrastructure
- 🚀 **Vercel** for deployment platform
- 🎨 **shadcn/ui** for beautiful UI components

## 📞 Support & Community

- 🐛 **GitHub Issues**: [Report bugs or request features](https://github.com/YOUR_USERNAME/secure-ore-quest/issues)
- 💬 **Discord**: Join our community for discussions
- 🐦 **Twitter**: Follow for updates and announcements

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by the Secure Ore Quest team

[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/secure-ore-quest?style=social)](https://github.com/YOUR_USERNAME/secure-ore-quest)
[![Twitter Follow](https://img.shields.io/twitter/follow/secureorequest?style=social)](https://twitter.com/secureorequest)

</div>