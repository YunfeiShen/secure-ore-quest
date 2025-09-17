import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { useToast } from "@/hooks/use-toast";

interface WalletConnectProps {
  isConnected: boolean;
  onConnect: () => void;
  address?: string;
}

export const WalletConnect = ({ isConnected, onConnect, address }: WalletConnectProps) => {
  const { address: connectedAddress, isConnected: walletConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  // Update parent component when wallet connection changes
  React.useEffect(() => {
    if (walletConnected && connectedAddress) {
      onConnect();
    }
  }, [walletConnected, connectedAddress, onConnect]);

  if (isConnected && connectedAddress) {
    return (
      <Card className="pixel-border bg-gradient-to-r from-card to-secondary p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="pixel-font text-xs text-muted-foreground">WALLET CONNECTED</p>
            <p className="pixel-font text-sm text-gold">
              {connectedAddress?.slice(0, 6)}...{connectedAddress?.slice(-4)}
            </p>
          </div>
          <div className="h-2 w-2 bg-emerald rounded-full ore-sparkle"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="pixel-border bg-gradient-to-r from-card to-secondary p-6 text-center">
      <h3 className="pixel-font text-lg mb-4 text-gold">Connect Wallet to Start Mining</h3>
      <p className="pixel-font text-xs text-muted-foreground mb-6">
        Secure your mining claims on the blockchain
      </p>
      <div className="w-full">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button
                        variant="mining"
                        size="lg"
                        onClick={openConnectModal}
                        className="w-full"
                      >
                        CONNECT WALLET
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={openChainModal}
                        className="w-full"
                      >
                        WRONG NETWORK
                      </Button>
                    );
                  }

                  return (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={openChainModal}
                        className="flex-1"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        onClick={openAccountModal}
                        className="flex-1"
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </Card>
  );
};