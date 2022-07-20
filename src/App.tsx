import React, { useState } from 'react';
import './App.css';
import giftLogo from './assets/icons/gift-box.png';
import { NftInterface } from './models/Nft.interface';
import Axios from 'axios';
import Web3 from 'web3';
import { NFTMetadata } from './models/NftMetadata.model';
import furkanNftAbi from './assets/blockchain/abi/furkan.nft.abi.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BSC_TESTNET_CHAIN_ID, EXPLORE_URL, FURKANFT_CONTRACT_ADDRESS } from './base/base';

export enum State {
  IDLE,
  LOADING,
  COMPLETED
}

function App() {

  let explorerURL:string = EXPLORE_URL;
  let contractAddress: string = FURKANFT_CONTRACT_ADDRESS;

  
  
  const [currentState, setCurrentState ] = useState(State.IDLE);
  const [nft, setNft ] = useState<NftInterface>({});


  async function getData(url:string) {
    const result = await Axios.get(url);
    return result.data;
  }

   async function onMint(){
    try {

      if (typeof window.ethereum === 'undefined') {
        toast.info("Please install Metamask Wallet to you browser!");
        return 0;
      }

      setCurrentState(State.LOADING);

      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.requestAccounts();
      const account = accounts[0];
      const currentChainId = await web3.eth.net.getId();
      
      if(account[0] === undefined){

      setCurrentState(State.IDLE);
        return 0;
      }

      if(currentChainId !== BSC_TESTNET_CHAIN_ID){
        toast.info("Please connect 'BSC Testnet' first!");
        setCurrentState(State.IDLE);
        return 0;
      }
  
      const minterContract = new web3.eth.Contract(furkanNftAbi as any, contractAddress);
      const NFTMetaDataURL = await minterContract.methods.contractURI().call();
  
      const tx = await minterContract.methods.mintItem(
        account,
        NFTMetaDataURL
      ).send( {
        from: account,
        contractAddress: contractAddress,
      }, (error:Error, txHash:any) => { })
      .on( 'error', (e:any) => {
        console.log( e );
      } )
      .on( 'transactionHash', (txHash:any) => console.log(txHash) );
      
      const data: NFTMetadata = await getData(NFTMetaDataURL);
      
      console.log(data);
      let responseNft : NftInterface = {};

      responseNft.transaction = tx;
      responseNft.metaDataURL = NFTMetaDataURL;
      responseNft.image = data.image;

      setNft(responseNft);
      console.log(nft);

      setCurrentState(State.COMPLETED);

      toast("Congratulations!");

    } catch (error) {
      toast.error('Something went wrong!')
      setCurrentState(State.IDLE);
      throw error;
    }
  }

  return (
    <div className="App">
    <ToastContainer />
      <p className='title'>#FURKANFT</p>
      <h1>Get Your NFT Here!</h1>
        { <div className='nft-container' style={{ backgroundImage: 'url(' + ( currentState === State.COMPLETED ? nft.image : giftLogo ) + ')' }}
        ></div> }
        { currentState !== State.LOADING  ?
          <button className='mint-button' onClick={ () => {
            setNft({});
            onMint();
          } }>{ currentState === State.COMPLETED ? 'Mint Again?' : 'Mint Now!'}</button>
          :
          <p>Loading...</p>
        }
        { currentState === State.COMPLETED && (
          <>
            <a className='link-button' href={explorerURL + nft.transaction?.events.Transfer.transactionHash} target='_blank'>View Transaction</a>
            <a className='link-button' href={nft.metaDataURL} target='_blank'>View Metadata</a> 
          </>
        ) }
    </div>
  );
}

export default App;
