const { expect } = require("chai");
const { ethers } = require("hardhat");
const { it } = require("mocha");

//testes unitários

describe("isDeployed", () => {
    it("Should return contract address", async () => {
      const TokenFactory = await ethers.getContractFactory("TokenPower");
      const TokenDeploy = await TokenFactory.deploy(1);
      await TokenDeploy.deployed();
  
      const deployAddress = await TokenDeploy.address;
      //console.log("Contract Address: " + deployAddress);
    })
  });

  describe("isBalanceWorth", () => {
    

    it("Should return balance of some wallet", async () => {
        const supply = 1000;
        const [Owner] = await ethers.getSigners();

        const TokenFactory = await ethers.getContractFactory("TokenPower");
        const TokenDeploy = await TokenFactory.deploy(supply);
        await TokenDeploy.deployed();
  
      expect(await TokenDeploy.balanceOf(Owner.address)).to.equal(supply);
      
    })

  })
  
  describe("aboutSupply", () => {
    const supply = 1000;
    it("Should return totalSupply", async () => {
      const TokenFactory = await ethers.getContractFactory("TokenPower");
      const TokenDeploy = await TokenFactory.deploy(supply);
      await TokenDeploy.deployed();
  
      expect(await TokenDeploy.totalSupply()).to.equal(supply);
      //console.log("Total Supply: " + await TokenDeploy.totalSupply());
    })
  
    it("Should return owner balance equal to totalSupply", async () => {
      const [Owner] = await ethers.getSigners();
  
      const TokenFactory = await ethers.getContractFactory("TokenPower", Owner);
      const TokenDeploy = await TokenFactory.deploy(supply);
      await TokenDeploy.deployed();
  
      expect(await TokenDeploy.balanceOf(Owner.address)).to.equal(supply);
      //console.log("Balance of Owner: " + await TokenDeploy.balanceOf(Owner.address));
    })
  })
  
  describe("isTransfer", () => {
    it("Should return value of trade in new wallet", async () => {
      const supply = 1000;
      const trade = 100;
      
      const [Owner, userWallet] = await ethers.getSigners();
    
      const TokenFactory = await ethers.getContractFactory("TokenPower", Owner);
      const TokenDeploy = await TokenFactory.deploy(supply);
      await TokenDeploy.deployed();
  
      await TokenDeploy.transfer(userWallet.address, trade);
  
      //console.log("OwnerWallet Balance: " + await TokenDeploy.balanceOf(userWallet.address));
      //console.log("Wallet1 Balance: " + await TokenDeploy.balanceOf(Owner.address));
     
      expect(await TokenDeploy.balanceOf(userWallet.address)).to.equal(trade);
      expect(await TokenDeploy.balanceOf(Owner.address)).to.equal(supply - trade);
  
    })

    describe("transferStatus", async () => {

        it("Should return transfer enabled", async () => {
            const supply = 1000;

            const TokenFactory = await ethers.getContractFactory("TokenPower");
            const TokenDeploy = await TokenFactory.deploy(supply);
            await TokenDeploy.deployed();
    
            expect(await TokenDeploy.statusTransfer()).to.equal(true);
        })

        it("Should return the value that was send to new wallet with transfer enable", async () => {
            const supply = 1000;

            const [Owner, Wallet1] = await ethers.getSigners();
            const trade = 100;

            const TokenFactory = await ethers.getContractFactory("TokenPower");
            const TokenDeploy = await TokenFactory.deploy(supply);
            await TokenDeploy.deployed();

            expect(await TokenDeploy.statusTransfer()).to.equal(true);
            await TokenDeploy.transfer(Wallet1.address, trade);
            expect(await TokenDeploy.balanceOf(Wallet1.address)).to.equal(trade);
            expect(await TokenDeploy.balanceOf(Owner.address)).to.equal(supply - trade);
        });

        it("Should return transfer disabled", async () => {
            const supply = 1000;

            const TokenFactory = await ethers.getContractFactory("TokenPower");
            const TokenDeploy = await TokenFactory.deploy(supply);
            await TokenDeploy.deployed();

            await TokenDeploy.pausable();

            expect(await TokenDeploy.statusTransfer()).to.equal(false);
        })

        it("Should return exception by transfer disable", async () => {
            const supply = 1000;

            const [Owner, Wallet1] = await ethers.getSigners();

            const trade = 100;

            const TokenFactory = await ethers.getContractFactory("TokenPower");
            const TokenDeploy = await TokenFactory.deploy(supply);
            await TokenDeploy.deployed();

            await TokenDeploy.pausable();

            expect(await TokenDeploy.statusTransfer()).to.equal(false);
            await expect(TokenDeploy.transfer(Wallet1.address, trade)).to.be.revertedWith("Can't transfer, Transfer Status is Disabled!");
        })

});

})

describe("BurnToken", async () => {
    it("should return supply burned", async() => {
        const supply = 1000;

        const [Owner, Wallet1] = await ethers.getSigners();

        const trade = 100;
        const Burned = 70;

        const TokenFactory = await ethers.getContractFactory("TokenPower");
        const TokenDeploy = await TokenFactory.deploy(supply);
        await TokenDeploy.deployed();

        await TokenDeploy.transfer(Wallet1.address, trade);
        expect(await TokenDeploy.totalSupply()).to.equal(supply-Burned);
    })
})

describe("MintToken", async () => {
    it("should return mint of token", async() => {
        const supply = 1000;

        const [Owner, Wallet1] = await ethers.getSigners();

        const trade = 1000;
        const Burned = 700;

        const minToken = 333;
        const TokenFactory = await ethers.getContractFactory("TokenPower");
        const TokenDeploy = await TokenFactory.deploy(supply);
        await TokenDeploy.deployed();

        await TokenDeploy.transfer(Wallet1.address, trade);
        expect(await TokenDeploy.totalSupply()).to.equal(minToken);
    })
})



