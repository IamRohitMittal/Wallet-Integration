import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import MarketplaceAddress from '../contractsData/MarketPlace-address.json';
import MarketplaceAbi from '../contractsData/Marketplace.json';
import NFTAddress from '../contractsData/NFT-address.json';
import NFTAbi from '../contractsData/NFT.json';
import PaymentProcessorAddress from '../contractsData/PaymentProcessor-address.json';
import PaymentProcessorAbi from '../contractsData/PaymentProcessor.json';
import WETHAddress from '../contractsData/WETH-address.json';
import WETHAbi from '../contractsData/WETH.json';
import genericErc20Abi from '../contractsData/GenericERC20.json';

import Navigation from './Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Home";
import Create from "./Create";
import MyListedItems from "./MyListedItem";
import MyPurchases from "./MyPurchases";
import Store from "./Store";

import { Spinner } from 'react-bootstrap'

const tokenContractAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [paymentProcessor, setPaymentProcessor] = useState({});
  const [weth, setWETH] = useState({});


  const loadContracts = async (signer) => {
    const mp = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    setMarketplace(mp);
    const nftObject = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nftObject);
    setLoading(false);
  }

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    console.log(account);
    // const balance = await provider.getBalance("ethers.eth")
    // console.log(ethers.utils.formatEther(balance));
    const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
    const contractPaymentProcessor = new ethers.Contract(PaymentProcessorAddress.address, PaymentProcessorAbi.abi, provider);
    const contractWETH = new ethers.Contract(WETHAddress.address, WETHAbi.abi, provider);
    
    setPaymentProcessor(contractPaymentProcessor);
    setWETH(contractWETH);

    console.log(contractPaymentProcessor.address);
    const balance = (await contract.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString();
    // Approve Transaction
    console.log(ethers.utils.formatEther(balance));
    loadContracts(signer)
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home marketplace={marketplace} nft={nft} />
              } />
              <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/store" element={
                <Store paymentProcessor={paymentProcessor} weth={weth} account={account} />
              } />
            </Routes>
          )
        }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
