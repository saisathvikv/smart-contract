### Installation of truffle and contract creation

- Create TruffleForBeginners directory and init the project
```sh
truffle init
```
- Create a Migrations and HelloWorld contract
- Helloworld.sol
```sh
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Helloworld {
    string public message;

    function returnHello() public pure returns(string memory){
        return "Helloworld";
    }
}
```
- Migrations.sol
```sh
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner;
  uint256 public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
```
- Create 1_initial_migrations.js and 2_helloworld_migration.js
- 1_initial_migrations.js
```sh
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
```
- 2_helloworld_migrations.js
```sh
const Helloworld = artifacts.require("Helloworld");

module.exports = function(deployer) {
  deployer.deploy(Helloworld);
};
```
- For performing migrations we need to run
```sh
truffle develop
migrate
truffle(develop)> instance.returnHello()
'Helloworld'
truffle(develop)> 
```

### Migrations Deployment and interaction between contracts

- Add constructor, setMessage Helloworld contract
```sh
Helloworld.sol
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
```
- Deploy and interact with the contract.
```sh
HelloworldPermanent.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract HelloworldPermanent {
    string public message;
    constructor (string memory _message){
        message = _message;
    }
}
```
- Update 2_helloworld_migration.js to interact with HelloworldPermanent.js
```sh
const Helloworld = artifacts.require("Helloworld");
const HelloworldPermanent = artifacts.require("HelloworldPermanent");
module.exports = function(deployer) {
  deployer.deploy(Helloworld,"helloworld constructor").then(async ()=>{
    let instance = await Helloworld.deployed();
    let message = await instance.message();
    return deployer.deploy(HelloworldPermanent,message);
  });
};
```
- Interact using console
```sh
truffle(develop)> let instance = await HelloworldPermanent.deployed()
undefined
truffle(develop)> instance.message()
'helloworld constructor'
truffle(develop)> 
```

## Testing contract
- Create test files for helloworld_test.js
```sh
helloworld_test.js
const Helloworld = artifacts.require('Helloworld')
contract("Helloworld", (accounts)=>{
    it("Test constructor", async ()=>{
        let instance = await Helloworld.deployed();
        let message = await instance.message();
        assert.equal(message, "helloworld constructor");
    })
    it("return hello method", async ()=>{
        let instance = await Helloworld.deployed();
        let message = await instance.returnHello();
        assert.equal(message, "Helloworld");
    })
    it("check for owner test case", async()=>{
        let instance = await Helloworld.deployed();
        let owner = await instance.owner();
        assert.equal(owner, accounts[0]);
    })
    it("set message method verification test case", async ()=>{
        let instance = await Helloworld.deployed();
        await instance.setMessage("new message using set message method");
        let message = await instance.message();
        assert.equal(message, "new message using set message method");
    })
})
```
- Run test using truffle test
```sh
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.
  Contract: Helloworld
    ✔ Test constructor
    ✔ return hello method
    ✔ check for owner test case
    ✔ set message method verification test case (83ms)
  4 passing (209ms)
```

##Deploy to Testnet & Mainnet
We can use goerli testnet for deployment. 
- Install @truffle/hdwallet-provider which is a wallet for truffle
- Generate mnemonic 
- Configure testnet inside truffle-config.js
