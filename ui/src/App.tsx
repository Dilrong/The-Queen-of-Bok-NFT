import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import queenOfBokNFT from "./utils/QueenOfBokNFT.json";
import bokImage from "./assets/bokNFT.png";

const CONTRACT_ADDRESS = "0xb212892cd1124eCb4eE4EE43EcbC4e6C0B7728eB";

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account)

      setupEventListener()
    } else {
      console.log("No authorized account found")
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);

      setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, queenOfBokNFT.abi, signer);

        connectedContract.on("NewNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, queenOfBokNFT.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.mintNFT({
          gasLimit: 3000000,
          value: ethers.utils.parseEther("0.1"),
        });

        await nftTxn.wait();
        console.log(nftTxn);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="text-xl text-slate-50 bg-red-500 hover:bg-red-400 font-bold py-4 px-24 rounded mt-4 font-noto">
      Connect to Wallet
    </button>
  );

  const renderMintUI = () => (
    <button onClick={askContractToMintNft} className="text-xl text-slate-50 bg-yellow-500 hover:bg-yellow-400 font-bold py-4 px-24 rounded mt-4 font-noto">
      Mint Bok
    </button>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 text-center">
      <div className="container xl flex flex-col">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-7xl text-slate-50 font-bold tracking-wider font-noto">Queen Of Bok</h1>
          <p className="text-slate-50 font-noto pt-4">No Utility</p>
          <p className="text-indigo-600 font-noto pt-1">Mint Price <b>1ETH</b></p>
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          <img className="w-96 h-96 rounded" src={bokImage} alt="bok NFT Image" />
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          {currentAccount.length !== 0 ? <p className="text-green-500 text-sm font-noto">Wallet connection complete</p> : <p className="text-red-500 text-sm font-noto">Wallet not connected.</p>}
          <p className="text-slate-50 font-noto">{currentAccount}</p>
        </div>
        <div className="flex justify-center">
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
        </div>
      </div>
    </div>
  )
}

export default App
