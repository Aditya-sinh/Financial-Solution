// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import {
    ISuperfluid,
    ISuperToken,
    ISuperTokenFactory
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract USDCXToken {
    
    event NewSuperToken(address _contractAddress);
    mapping (address => address) superTokenRegistry;
    
    ISuperfluid private _host; //  Mumbai host: 0xEB796bdb90fFA0f28255275e16936D25d3418603
    
    constructor(address _sfHost) {
        
        _host = ISuperfluid(_sfHost); // Superfluid host address
        
    }
    
    function createUSDCXToken(ERC20 mkrToken) public returns (ISuperToken mkrSuperToken) {
        
        string memory name = string(abi.encodePacked('USDC ', mkrToken.name()));
        string memory symbol = string(abi.encodePacked(mkrToken.symbol(), 'x'));
        
        ISuperTokenFactory factory = _host.getSuperTokenFactory();
        mkrSuperToken = factory.createERC20Wrapper(mkrToken,ISuperTokenFactory.Upgradability.FULL_UPGRADABLE,name,symbol);
    
        superTokenRegistry[address(mkrToken)] = address(mkrSuperToken);
        emit NewSuperToken(address(mkrSuperToken));
        
    }
    
    function getSuperToken(ERC20 unwrappedToken) public view returns (address superTokenAddress) {
        
        superTokenAddress = superTokenRegistry[address(unwrappedToken)];
        
    }
    
}