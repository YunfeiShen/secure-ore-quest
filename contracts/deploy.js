const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SecureOreQuest contract...");

  // Get the contract factory
  const SecureOreQuest = await ethers.getContractFactory("SecureOreQuest");

  // Deploy the contract
  // You'll need to provide a verifier address
  const verifierAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  
  const secureOreQuest = await SecureOreQuest.deploy(verifierAddress);

  await secureOreQuest.waitForDeployment();

  const contractAddress = await secureOreQuest.getAddress();
  console.log("SecureOreQuest deployed to:", contractAddress);

  // Save the contract address for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './contract-address.json',
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract address saved to contract-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
