const Helloworld = artifacts.require("Helloworld");
const HelloworldPermanent = artifacts.require("HelloworldPermanent");
module.exports = function(deployer) {
  deployer.deploy(Helloworld,"helloworld constructor").then(async ()=>{
    let instance = await Helloworld.deployed();
    let message = await instance.message();
    return deployer.deploy(HelloworldPermanent,message);
  });
};