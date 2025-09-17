# Secure Ore Quest

A decentralized mining game built with React, TypeScript, and blockchain technology. Mine encrypted ores in privacy and reveal your earnings publicly on the blockchain.

## Features

- **Private Mining**: All mining outputs are encrypted until settlement
- **Blockchain Security**: Claims are secured on the blockchain
- **Wallet Integration**: Connect with popular Web3 wallets
- **FHE Technology**: Fully Homomorphic Encryption for secure computations
- **Real-time Mining**: Interactive mining interface with progress tracking

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Blockchain**: Ethereum, FHE (Fully Homomorphic Encryption)
- **Wallet**: RainbowKit, Wagmi, Viem
- **Styling**: Custom pixel-perfect design system

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YunfeiShen/secure-ore-quest.git

# Navigate to the project directory
cd secure-ore-quest

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## How to Play

1. **Connect Wallet**: Connect your Web3 wallet to start mining
2. **Start Mining**: Click the mine button to begin encrypted mining
3. **Collect Ores**: Mine different types of ores (Gold, Emerald, Ruby, Sapphire, Diamond)
4. **Settlement**: Reveal your encrypted earnings on the blockchain

## Smart Contract

The project includes FHE-enabled smart contracts for secure mining operations:

- **Encrypted Storage**: All mining data is encrypted using FHE
- **Private Mining**: Mining results remain private until settlement
- **Blockchain Verification**: All claims are verifiable on-chain

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── GameHeader.tsx  # Game header component
│   ├── MiningInterface.tsx # Mining game interface
│   └── WalletConnect.tsx   # Wallet connection component
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.