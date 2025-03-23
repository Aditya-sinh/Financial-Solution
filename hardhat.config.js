require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20" }, // Keep the latest version
      { version: "0.6.12" }, // Add a compatible version for SimpleStorage
      { version: "0.5.16" }  // Add older versions if needed
    ]
  },
  
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};