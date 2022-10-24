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