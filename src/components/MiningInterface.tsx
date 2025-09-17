import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

interface MiningStats {
  gold: number;
  emerald: number;
  ruby: number;
  sapphire: number;
  diamond: number;
  totalMined: number;
  miningPower: number;
}

interface MiningInterfaceProps {
  isConnected: boolean;
}

export const MiningInterface = ({ isConnected }: MiningInterfaceProps) => {
  const [isMining, setIsMining] = useState(false);
  const [encryptionProgress, setEncryptionProgress] = useState(0);
  const [miningStats, setMiningStats] = useState<MiningStats>({
    gold: 0,
    emerald: 0,
    ruby: 0,
    sapphire: 0,
    diamond: 0,
    totalMined: 0,
    miningPower: 100,
  });
  const [isShaking, setIsShaking] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const { toast } = useToast();
  
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMining) {
      interval = setInterval(() => {
        setEncryptionProgress((prev) => {
          if (prev >= 100) {
            // Mining completed, add random ore
            const oreTypes = ['gold', 'emerald', 'ruby', 'sapphire', 'diamond'];
            const randomOre = oreTypes[Math.floor(Math.random() * oreTypes.length)] as keyof MiningStats;
            const amount = Math.floor(Math.random() * 5) + 1;
            
            setMiningStats(prev => ({
              ...prev,
              [randomOre]: prev[randomOre] + amount,
              totalMined: prev.totalMined + amount,
            }));
            
            toast({
              title: "Ore Encrypted!",
              description: `Found ${amount} ${randomOre.toUpperCase()}! Claims secured.`,
            });
            
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isMining, toast]);

  const handleMine = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsShaking(true);
    
    if (!isMining) {
      // Start mining session
      try {
        const result = await writeContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'startMiningSession',
        });
        
        if (result) {
          setIsMining(true);
          toast({
            title: "Mining Session Started",
            description: "Your encrypted mining session has begun!",
          });
        }
      } catch (error) {
        console.error('Failed to start mining session:', error);
        toast({
          title: "Mining Failed",
          description: "Failed to start mining session",
          variant: "destructive",
        });
      }
    } else {
      // End mining session
      try {
        if (currentSessionId !== null) {
          await writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'endMiningSession',
            args: [currentSessionId],
          });
        }
        
        setIsMining(false);
        toast({
          title: "Mining Session Ended",
          description: "Your mining session has been completed!",
        });
      } catch (error) {
        console.error('Failed to end mining session:', error);
        toast({
          title: "Session End Failed",
          description: "Failed to end mining session",
          variant: "destructive",
        });
      }
    }
    
    setTimeout(() => setIsShaking(false), 300);
  };

  const handleSettle = async () => {
    if (miningStats.totalMined === 0) {
      toast({
        title: "Nothing to Settle",
        description: "Mine some ore first!",
        variant: "destructive",
      });
      return;
    }

    if (!currentSessionId) {
      toast({
        title: "No Active Session",
        description: "No mining session to settle",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real implementation, you would create an ore claim first
      // For now, we'll simulate the settlement
      toast({
        title: "Settlement Complete!",
        description: `Revealed ${miningStats.totalMined} total ores to the blockchain`,
      });
      
      // Reset mining stats
      setMiningStats({
        gold: 0,
        emerald: 0,
        ruby: 0,
        sapphire: 0,
        diamond: 0,
        totalMined: 0,
        miningPower: 100,
      });
    } catch (error) {
      console.error('Failed to settle:', error);
      toast({
        title: "Settlement Failed",
        description: "Failed to settle mining session",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Mining Controls */}
      <Card className="pixel-border bg-gradient-to-b from-card to-secondary p-6">
        <div className="text-center space-y-4">
          <h2 className="pixel-font text-xl text-gold">MINING STATION</h2>
          
          <div className="relative">
            <Button
              variant="mining"
              size="lg"
              onClick={handleMine}
              disabled={!isConnected}
              className={`w-32 h-32 text-xl ${isShaking ? 'mine-shake' : ''}`}
            >
              ⛏️
              <br />
              {isMining ? "MINING" : "MINE"}
            </Button>
            {isMining && (
              <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 via-emerald/20 to-ruby/20 rounded-lg glow-animation -z-10"></div>
            )}
          </div>

          {isMining && (
            <div className="space-y-2">
              <p className="pixel-font text-xs text-muted-foreground">ENCRYPTING CLAIM...</p>
              <Progress value={encryptionProgress} className="w-full h-3 pixel-border" />
            </div>
          )}
        </div>
      </Card>

      {/* Encrypted Mining Stats */}
      <Card className="pixel-border bg-gradient-to-r from-card to-secondary p-6">
        <h3 className="pixel-font text-lg text-gold mb-4">ENCRYPTED INVENTORY</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(miningStats).filter(([key]) => key !== 'totalMined' && key !== 'miningPower').map(([ore, amount]) => (
            <div key={ore} className="text-center space-y-2">
              <div className={`w-12 h-12 mx-auto rounded pixel-border bg-${ore} glow-animation flex items-center justify-center`}>
                <span className="pixel-font text-lg">
                  {ore === 'gold' && '🟨'}
                  {ore === 'emerald' && '🟩'}
                  {ore === 'ruby' && '🟥'}
                  {ore === 'sapphire' && '🟦'}
                  {ore === 'diamond' && '💎'}
                </span>
              </div>
              <p className="pixel-font text-xs text-muted-foreground">{ore.toUpperCase()}</p>
              <p className="pixel-font text-sm text-foreground">
                {amount > 0 ? `${amount}` : '???'}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Settlement */}
      <Card className="pixel-border bg-gradient-to-r from-secondary to-card p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="pixel-font text-lg text-gold">TOTAL ENCRYPTED: {miningStats.totalMined}</h3>
            <p className="pixel-font text-xs text-muted-foreground">Claims secured on blockchain</p>
          </div>
          <Button
            variant="settle"
            onClick={handleSettle}
            disabled={miningStats.totalMined === 0}
          >
            SETTLE & REVEAL
          </Button>
        </div>
      </Card>
    </div>
  );
};