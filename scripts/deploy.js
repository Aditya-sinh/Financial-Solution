const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    // Deploy RupyaToken
    const RupyaToken = await hre.ethers.getContractFactory("RupyaToken");
    const rupyaToken = await RupyaToken.deploy();
    await rupyaToken.waitForDeployment();
    console.log(`✅ RupyaToken deployed at: ${await rupyaToken.getAddress()}`);

    // Deploy USDCToken
    const USDCToken = await hre.ethers.getContractFactory("USDCToken");
    const usdcToken = await USDCToken.deploy();
    await usdcToken.waitForDeployment();
    console.log(`✅ USDCToken deployed at: ${await usdcToken.getAddress()}`);

    // Deploy USDCXToken (Requires USDCToken Address)
    const USDCXToken = await hre.ethers.getContractFactory("USDCXToken");
    const usdcxToken = await USDCXToken.deploy(await usdcToken.getAddress());
    await usdcxToken.waitForDeployment();
    console.log(`✅ USDCXToken deployed at: ${await usdcxToken.getAddress()}`);

    // Deploy RupyaXToken (Requires RupyaToken Address)
    const RupyaXToken = await hre.ethers.getContractFactory("RupyaXToken");
    const rupyaXToken = await RupyaXToken.deploy(await rupyaToken.getAddress());
    await rupyaXToken.waitForDeployment();
    console.log(`✅ RupyaXToken deployed at: ${await rupyaXToken.getAddress()}`);

    // Deploy Lend
    const Lend = await hre.ethers.getContractFactory("Lend");
    const lend = await Lend.deploy(await rupyaToken.getAddress());
    await lend.waitForDeployment();
    console.log(`✅ Lend contract deployed at: ${await lend.getAddress()}`);

    // Deploy LendBorrow
    const LendBorrow = await hre.ethers.getContractFactory("LendBorrow");
    const lendBorrow = await LendBorrow.deploy(
      await rupyaToken.getAddress(), 
      await usdcToken.getAddress() // Add the missing parameter(s)
    );
  // Pass RupyaToken address    
    await lendBorrow.waitForDeployment();
    console.log(`✅ LendBorrow contract deployed at: ${await lendBorrow.getAddress()}`);

    // Deploy Stake
    const Stake = await hre.ethers.getContractFactory("Stake");
    const stake = await Stake.deploy(await rupyaToken.getAddress());
    await stake.waitForDeployment();
    console.log(`✅ Stake contract deployed at: ${await stake.getAddress()}`);

    // Deploy SimpleStorage
    const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.waitForDeployment();
    console.log(`✅ SimpleStorage contract deployed at: ${await simpleStorage.getAddress()}`);

    // Deploy User (Requires an IPFS hash as constructor argument)
    const User = await hre.ethers.getContractFactory("User");
    const initialIPFSHash = "QmExampleHash"; // Replace this with an actual IPFS hash
    const user = await User.deploy(initialIPFSHash);
    await user.waitForDeployment();
    console.log(`✅ User contract deployed at: ${await user.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
