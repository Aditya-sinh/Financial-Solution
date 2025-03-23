// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { 
    ISuperfluid,
    ISuperToken,
    ISuperTokenFactory
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RupyaXToken {
    event NewSuperToken(address indexed _contractAddress);
    mapping(address => address) public superTokenRegistry;
    
    ISuperfluid private _host;

    constructor(address _sfHost) {
        _host = ISuperfluid(_sfHost);
    }

    function createRupyaXToken(ERC20 underlyingToken) public returns (ISuperToken mkrSuperToken) {
        string memory name = string(abi.encodePacked('Rupya ', underlyingToken.name()));
        string memory symbol = string(abi.encodePacked(underlyingToken.symbol(), 'x'));
        ISuperTokenFactory factory = _host.getSuperTokenFactory();
        ISuperToken superToken = factory.createERC20Wrapper(
            underlyingToken,
            ISuperTokenFactory.Upgradability.FULL_UPGRADABLE, // Fixed spelling
            name,
            symbol
        );
        
        superTokenRegistry[address(underlyingToken)] = address(superToken);
        emit NewSuperToken(address(superToken));
        
        return superToken;
    }

    function getSuperToken(address underlyingToken) external view returns (address) {
        return superTokenRegistry[underlyingToken];
    }
}