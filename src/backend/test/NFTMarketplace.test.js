const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace",()=>{
    let deployer,addr1,addr2,nft,marketplace;
    const feePercent = 1;
    beforeEach(async ()=>{
        const NFT = await  ethers.getContractFactory("NFT");
        const Marketplace = await  ethers.getContractFactory("Marketplace");
        [deployer,addr1,addr2] = await ethers.getSigners();
        nft=await NFT.deploy();
        marketplace=await Marketplace.deploy(feePercent);
    })

    describe("Deployment",()=>{
        it("Should track Name and Symbol of NFT collection",async ()=>{
            expect(await nft.name()).to.equal("Verbwire NFT")
            expect(await nft.symbol()).to.equal("VNFT")
        })

        it("Should track feecount and feepercent of NFT collection",async ()=>{
            expect(await marketplace.feePercent()).to.equal(feePercent)
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
        })
    })

    describe("Deployment",()=>{
        it("Should track each Minted NFT",async ()=>{
            await nft.connect(addr1).mint(URI);
            expect(await nft.tokenURI(1)).to.equal(URI);
        })
    })
})