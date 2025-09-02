// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Calcu {
    int private res;
    address public own;

    constructor() {
        own = msg.sender;
    }

    event Calculation(address indexed sender, string action, int num);

    modifier isOwner() {
        require(msg.sender == own, "Caller is not the owner.");
        _;
    }

    // Update res with result and emit event
    function addTwo(int _a, int _b) public isOwner {
        res = _a + _b;
        emit Calculation(msg.sender, "add", res);
    }

    function subTwo(int _a, int _b) public isOwner {
        res = _a - _b;
        emit Calculation(msg.sender, "subtract", res);
    }

    function multiTwo(int _a, int _b) public isOwner {
        res = _a * _b;
        emit Calculation(msg.sender, "multiply", res);
    }

    function diviTwo(int _a, int _b) public isOwner {
        require(_b != 0, "Cannot divide by zero.");
        res = _a / _b;
        emit Calculation(msg.sender, "divide", res);
    }

    function getRes() public view returns (int) {
        return res;
    }

    function reset() public isOwner {
        res = 0;
        emit Calculation(msg.sender, "reset", 0);
    }
}
