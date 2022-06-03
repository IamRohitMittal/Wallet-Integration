
import logo from './logo.png';
import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import MarketplaceAddress from '../contractsData/MarketPlace-address.json';
import MarketplaceAbi from '../contractsData/Marketplace.json';
import NFTAddress from '../contractsData/NFT-address.json';
import NFTAbi from '../contractsData/NFT.json';
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
import { Spinner } from 'react-bootstrap'

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});


  const loadContracts = async (signer) => {
    const marketplace = await ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    setMarketplace(marketplace);
    const nft = await ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  }

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    setAccount(accounts[1]);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(await provider.getBlockNumber())
    const signer = provider.getSigner();

    loadContracts(signer);
  }
  return (
    <BrowserRouter>
    {console.log(`loading : ${loading}`)}
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
          ) : null//(
            // <Routes>
            //   <Route path="/" element={
            //     <Home marketplace={marketplace} nft={nft} />
            //   } />
            //   <Route path="/create" element={
            //     <Create marketplace={marketplace} nft={nft} />
            //   } />
            //   <Route path="/my-listed-items" element={
            //     <MyListedItems marketplace={marketplace} nft={nft} account={account} />
            //   } />
            //   <Route path="/my-purchases" element={
            //     <MyPurchases marketplace={marketplace} nft={nft} account={account} />
            //   } />
            // </Routes>
          //)
        }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
