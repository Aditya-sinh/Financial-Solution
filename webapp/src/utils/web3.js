import { ethers } from "ethers";
import contractAddresses from "./contracts/addresses";
import RupyaTokenABI from "./contracts/RupyaTokenABI.json";

const getBlockchain = async () => {
    if (!window.ethereum) {
        console.error("MetaMask is not installed!");
        return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = await provider.getSigner();
    const rupyaToken = new ethers.Contract(contractAddresses.rupyaToken, RupyaTokenABI.abi, signer);

    return { provider, signer, rupyaToken };
};

export default getBlockchain;
