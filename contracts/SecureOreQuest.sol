// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureOreQuest is SepoliaConfig {
    using FHE for *;
    
    struct MiningSession {
        euint32 sessionId;
        euint32 goldOre;
        euint32 emeraldOre;
        euint32 rubyOre;
        euint32 sapphireOre;
        euint32 diamondOre;
        euint32 totalMined;
        euint32 miningPower;
        bool isActive;
        bool isSettled;
        address miner;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct OreClaim {
        euint32 claimId;
        euint32 goldAmount;
        euint32 emeraldAmount;
        euint32 rubyAmount;
        euint32 sapphireAmount;
        euint32 diamondAmount;
        euint32 totalValue;
        bool isRevealed;
        address claimer;
        uint256 timestamp;
    }
    
    struct MinerStats {
        euint32 totalSessions;
        euint32 totalOresMined;
        euint32 reputation;
        bool isVerified;
    }
    
    mapping(uint256 => MiningSession) public miningSessions;
    mapping(uint256 => OreClaim) public oreClaims;
    mapping(address => MinerStats) public minerStats;
    mapping(address => euint32) public minerReputation;
    
    uint256 public sessionCounter;
    uint256 public claimCounter;
    
    address public owner;
    address public verifier;
    
    // Mining rewards configuration
    euint32 public constant GOLD_REWARD = FHE.asEuint32(10);
    euint32 public constant EMERALD_REWARD = FHE.asEuint32(15);
    euint32 public constant RUBY_REWARD = FHE.asEuint32(20);
    euint32 public constant SAPPHIRE_REWARD = FHE.asEuint32(25);
    euint32 public constant DIAMOND_REWARD = FHE.asEuint32(50);
    
    event MiningSessionStarted(uint256 indexed sessionId, address indexed miner);
    event OreMined(uint256 indexed sessionId, uint8 oreType, uint32 amount);
    event MiningSessionEnded(uint256 indexed sessionId, address indexed miner);
    event OreClaimCreated(uint256 indexed claimId, address indexed claimer);
    event OreClaimRevealed(uint256 indexed claimId, address indexed claimer);
    event MinerReputationUpdated(address indexed miner, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function startMiningSession() public returns (uint256) {
        uint256 sessionId = sessionCounter++;
        
        miningSessions[sessionId] = MiningSession({
            sessionId: FHE.asEuint32(0), // Will be set properly later
            goldOre: FHE.asEuint32(0),
            emeraldOre: FHE.asEuint32(0),
            rubyOre: FHE.asEuint32(0),
            sapphireOre: FHE.asEuint32(0),
            diamondOre: FHE.asEuint32(0),
            totalMined: FHE.asEuint32(0),
            miningPower: FHE.asEuint32(100), // Base mining power
            isActive: true,
            isSettled: false,
            miner: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + 3600 // 1 hour session
        });
        
        // Update miner stats
        minerStats[msg.sender].totalSessions = FHE.add(minerStats[msg.sender].totalSessions, FHE.asEuint32(1));
        
        emit MiningSessionStarted(sessionId, msg.sender);
        return sessionId;
    }
    
    function mineOre(
        uint256 sessionId,
        externalEuint32 oreType,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(miningSessions[sessionId].miner == msg.sender, "Only session miner can mine");
        require(miningSessions[sessionId].isActive, "Session is not active");
        require(block.timestamp <= miningSessions[sessionId].endTime, "Session has ended");
        
        // Convert external encrypted values to internal
        euint32 internalOreType = FHE.fromExternal(oreType, inputProof);
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update ore counts based on type (simplified logic)
        // In a real implementation, you would use FHE comparison operations
        // For now, we'll add to totalMined
        miningSessions[sessionId].totalMined = FHE.add(miningSessions[sessionId].totalMined, internalAmount);
        
        // Update miner stats
        minerStats[msg.sender].totalOresMined = FHE.add(minerStats[msg.sender].totalOresMined, internalAmount);
        
        emit OreMined(sessionId, 0, 0); // Values will be decrypted off-chain
    }
    
    function endMiningSession(uint256 sessionId) public {
        require(miningSessions[sessionId].miner == msg.sender, "Only session miner can end session");
        require(miningSessions[sessionId].isActive, "Session is not active");
        
        miningSessions[sessionId].isActive = false;
        
        emit MiningSessionEnded(sessionId, msg.sender);
    }
    
    function createOreClaim(
        uint256 sessionId,
        externalEuint32 goldAmount,
        externalEuint32 emeraldAmount,
        externalEuint32 rubyAmount,
        externalEuint32 sapphireAmount,
        externalEuint32 diamondAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(miningSessions[sessionId].miner == msg.sender, "Only session miner can create claim");
        require(!miningSessions[sessionId].isActive, "Session must be ended first");
        require(!miningSessions[sessionId].isSettled, "Session already settled");
        
        uint256 claimId = claimCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalGold = FHE.fromExternal(goldAmount, inputProof);
        euint32 internalEmerald = FHE.fromExternal(emeraldAmount, inputProof);
        euint32 internalRuby = FHE.fromExternal(rubyAmount, inputProof);
        euint32 internalSapphire = FHE.fromExternal(sapphireAmount, inputProof);
        euint32 internalDiamond = FHE.fromExternal(diamondAmount, inputProof);
        
        // Calculate total value using FHE operations
        euint32 totalValue = FHE.add(
            FHE.add(
                FHE.add(
                    FHE.add(
                        FHE.mul(internalGold, GOLD_REWARD),
                        FHE.mul(internalEmerald, EMERALD_REWARD)
                    ),
                    FHE.mul(internalRuby, RUBY_REWARD)
                ),
                FHE.mul(internalSapphire, SAPPHIRE_REWARD)
            ),
            FHE.mul(internalDiamond, DIAMOND_REWARD)
        );
        
        oreClaims[claimId] = OreClaim({
            claimId: FHE.asEuint32(0), // Will be set properly later
            goldAmount: internalGold,
            emeraldAmount: internalEmerald,
            rubyAmount: internalRuby,
            sapphireAmount: internalSapphire,
            diamondAmount: internalDiamond,
            totalValue: totalValue,
            isRevealed: false,
            claimer: msg.sender,
            timestamp: block.timestamp
        });
        
        // Mark session as settled
        miningSessions[sessionId].isSettled = true;
        
        emit OreClaimCreated(claimId, msg.sender);
        return claimId;
    }
    
    function revealOreClaim(uint256 claimId) public {
        require(oreClaims[claimId].claimer == msg.sender, "Only claimer can reveal");
        require(!oreClaims[claimId].isRevealed, "Claim already revealed");
        
        oreClaims[claimId].isRevealed = true;
        
        // Update miner reputation based on revealed value
        // In a real implementation, you would decrypt and update reputation
        minerReputation[msg.sender] = FHE.add(minerReputation[msg.sender], FHE.asEuint32(10));
        
        emit OreClaimRevealed(claimId, msg.sender);
    }
    
    function updateMinerReputation(address miner, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(miner != address(0), "Invalid miner address");
        
        minerReputation[miner] = reputation;
        minerStats[miner].reputation = reputation;
        
        emit MinerReputationUpdated(miner, 0); // Value will be decrypted off-chain
    }
    
    function verifyMiner(address miner, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify miners");
        require(miner != address(0), "Invalid miner address");
        
        minerStats[miner].isVerified = isVerified;
    }
    
    function getMiningSessionInfo(uint256 sessionId) public view returns (
        address miner,
        uint8 totalMined,
        bool isActive,
        bool isSettled,
        uint256 startTime,
        uint256 endTime
    ) {
        MiningSession storage session = miningSessions[sessionId];
        return (
            session.miner,
            0, // FHE.decrypt(session.totalMined) - will be decrypted off-chain
            session.isActive,
            session.isSettled,
            session.startTime,
            session.endTime
        );
    }
    
    function getOreClaimInfo(uint256 claimId) public view returns (
        uint8 goldAmount,
        uint8 emeraldAmount,
        uint8 rubyAmount,
        uint8 sapphireAmount,
        uint8 diamondAmount,
        uint8 totalValue,
        bool isRevealed,
        address claimer,
        uint256 timestamp
    ) {
        OreClaim storage claim = oreClaims[claimId];
        return (
            0, // FHE.decrypt(claim.goldAmount) - will be decrypted off-chain
            0, // FHE.decrypt(claim.emeraldAmount) - will be decrypted off-chain
            0, // FHE.decrypt(claim.rubyAmount) - will be decrypted off-chain
            0, // FHE.decrypt(claim.sapphireAmount) - will be decrypted off-chain
            0, // FHE.decrypt(claim.diamondAmount) - will be decrypted off-chain
            0, // FHE.decrypt(claim.totalValue) - will be decrypted off-chain
            claim.isRevealed,
            claim.claimer,
            claim.timestamp
        );
    }
    
    function getMinerStats(address miner) public view returns (
        uint8 totalSessions,
        uint8 totalOresMined,
        uint8 reputation,
        bool isVerified
    ) {
        MinerStats storage stats = minerStats[miner];
        return (
            0, // FHE.decrypt(stats.totalSessions) - will be decrypted off-chain
            0, // FHE.decrypt(stats.totalOresMined) - will be decrypted off-chain
            0, // FHE.decrypt(stats.reputation) - will be decrypted off-chain
            stats.isVerified
        );
    }
    
    function getMinerReputation(address miner) public view returns (uint8) {
        return 0; // FHE.decrypt(minerReputation[miner]) - will be decrypted off-chain
    }
    
    // Emergency functions for owner
    function emergencyPause() public {
        require(msg.sender == owner, "Only owner can pause");
        // Implementation for emergency pause
    }
    
    function emergencyUnpause() public {
        require(msg.sender == owner, "Only owner can unpause");
        // Implementation for emergency unpause
    }
    
    function withdrawFunds() public {
        require(msg.sender == owner, "Only owner can withdraw");
        // Implementation for withdrawing contract funds
    }
}
