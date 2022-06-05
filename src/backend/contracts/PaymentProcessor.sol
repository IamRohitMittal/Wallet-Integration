//SPDX-license-identifier : MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PaymentProcessor{
    address public adminAddress;
    IERC20 public weth;

    event PaymentDone(
        address buyer,
        uint amount
    );
    
    constructor(address _adminAddress, address _WETHAddress){
        adminAddress=_adminAddress;
        weth=IERC20(_WETHAddress);
    }
    function pay(uint _amount) public{
        weth.transferFrom(msg.sender, adminAddress, _amount);
        emit PaymentDone(msg.sender, _amount);
    }
}