// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RaylsToken
 * @dev Implementation of a basic ERC20 token with mint and burn capabilities
 * This is an example token for the Rayls blockchain
 */
contract RaylsToken is ERC20, ERC20Burnable, Ownable {
    /**
     * @dev Constructor that gives the deployer all of the initial supply
     * @param initialSupply The initial supply of tokens (in wei, i.e., with 18 decimals)
     */
    constructor(uint256 initialSupply) ERC20("Rayls Test Token", "RYLSTEST") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Creates new tokens and assigns them to the specified address
     * Can only be called by the contract owner
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint (in wei)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Returns the number of decimals used for token amounts
     * @return The number of decimals (18)
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
