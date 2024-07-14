import Nav from "./components/sections/Nav"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import Execute from "./components/sections/Execute"
// import { useSDK } from "@metamask/sdk-react";
// import React, { useState } from "react";
import { useWeb3Modal } from '@web3modal/ethers/react'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'


import React, { useState, useEffect } from 'react';
// import Web3Modal from '@web3modal/react';  // Ensure you have the correct import
import { ethers, BrowserProvider } from 'ethers';
// const ethers = require("ethers")
// import { createWeb3Modal } from '@web3modal/react';



import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
// import { Web3Modal } from "@web3modal/ethers";
// import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
// import { BrowserProvider, Contract, formatUnits } from 'ethers'
// 1. Your WalletConnect Cloud project ID
const projectId = '3e99bc6f9148c6f789be1164b6424e85'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create a metadata object
const metadata = {
  name: 'test',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})


const modal = createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
    auth: {
      email: true, // default to true
      socials: ['google', 'x', 'github', 'discord', 'apple'],
      showWallets: true, // default to true
      walletFeatures: true // default to true
    }
  }),
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})


// export function ConnectButton() {
//   // 4. Use modal hook
//   const { open } = useWeb3Modal()

//   return (
//     <>
//       <button onClick={() => open()}>Open Connect Modal</button>
//       <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
//     </>
//   )
// }


function Components() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()

}


export const App = () => {
  const { isConnected } = useWeb3ModalAccount();

  return (
    <div className="App">
      <Hero />
      {isConnected ? <About /> : null}
      <About />
    </div>
  );
};

export default App;
