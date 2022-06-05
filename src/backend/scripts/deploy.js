const { ethers } = require("hardhat");
const WETH_RINKEBY_ADDRESS = '0xc778417E063141139Fce010982780140Aa0cD5Ab'

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy contracts here:
  const NFT = await  ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  const MarketPlace = await  ethers.getContractFactory("Marketplace");
  const marketPlace = await MarketPlace.deploy(1);
  const WETH = await  ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();
  const PaymentProcessor = await  ethers.getContractFactory("PaymentProcessor");
  const paymentProcessor = await PaymentProcessor.deploy(marketPlace.address, WETH_RINKEBY_ADDRESS);
  const CarFactory = await  ethers.getContractFactory("CarFactory");
  const carFactory = await CarFactory.deploy();
  // await paymentProcessor.faucet()
  console.log(nft);
  console.log(`NFT Address : ${nft.address} , NFT ABI : ${nft.interface}`);
  console.log(`marketPlace Address : ${marketPlace.address} , marketPlace ABI : ${marketPlace.interface}`);
  console.log(`weth Address : ${weth.address} , weth ABI : ${weth.interface}`);
  console.log(`carFactory Address : ${carFactory.address} , carFactory ABI : ${carFactory.interface}`);
  console.log(`paymentProcessor Address : ${paymentProcessor.address} , paymentProcessor ABI : ${paymentProcessor.interface}`);

  // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
  saveFrontendFiles(nft,"NFT");
  saveFrontendFiles(marketPlace,"Marketplace");
  saveFrontendFiles(weth,"WETH");
  saveFrontendFiles(carFactory,"CarFactory");
  saveFrontendFiles(paymentProcessor,"PaymentProcessor");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
