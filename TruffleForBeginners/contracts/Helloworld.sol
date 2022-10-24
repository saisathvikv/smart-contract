// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Helloworld {
    string public message;
    address public owner;
    constructor (string memory _message){
        owner = msg.sender;
        message = _message;
    }
    // methdo for setting the message
    function setMessage(string memory _message) public {
        // message can be only set by the owner
        require(owner == msg.sender);
        message = _message;
    }
    function returnHello() public pure returns(string memory){
        return "Helloworld";
    }
}