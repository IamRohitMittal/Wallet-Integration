//SPDX-license-identifier : MIT
pragma solidity ^0.8.4;

contract Car{
    address public owner;
    string public model;
    constructor(string memory _model, address _owner) payable{
        owner=_owner;
        model=_model;
    }
}

contract CarFactory{
    Car[] public cars;
    function create(string memory _model) public{
        Car car = new Car(_model, address(this));
        cars.push(car);
    }

    function createAndSendEther(string memory _model, address _owner) public payable{
        Car car = (new Car){value:msg.value}(_model, _owner);
        cars.push(car);
    }

    
}