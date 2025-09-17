import { useState } from "react";
import { GameHeader } from "@/components/GameHeader";
import { WalletConnect } from "@/components/WalletConnect";
import { MiningInterface } from "@/components/MiningInterface";
import mineBackground from "@/assets/mine-background.png";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress] = useState("0x742d35Cc6634C0532925a3b8D404E6D2e82b4");

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${mineBackground})` }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-background/80"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 space-y-6">
        <GameHeader />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <WalletConnect 
              isConnected={isWalletConnected}
              onConnect={handleWalletConnect}
              address={walletAddress}
            />
            
            {isWalletConnected && (
              <div className="bg-card/90 pixel-border rounded-lg p-4">
                <h3 className="pixel-font text-sm text-emerald mb-2">MINING STATUS:</h3>
                <p className="pixel-font text-xs text-muted-foreground">
                  🔐 All mining outputs are encrypted until settlement
                </p>
                <p className="pixel-font text-xs text-muted-foreground">
                  ⛓️ Claims secured on blockchain
                </p>
                <p className="pixel-font text-xs text-muted-foreground">
                  💎 Reveal earnings during settlement phase
                </p>
              </div>
            )}
          </div>
          
          <div>
            <MiningInterface isConnected={isWalletConnected} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12">
          <p className="pixel-font text-xs text-muted-foreground">
            Powered by Zero-Knowledge Mining Protocol
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
