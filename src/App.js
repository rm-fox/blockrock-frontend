
import React, { useState } from 'react';
import { InfuraProvider } from '@ethersproject/providers';
import { Contract, Wallet } from 'ethers';
// import dotenv from 'dotenv';

// dotenv.config();


function App() {
    const [txHash, setTxHash] = useState('');

    const handleRunScript = async () => {
        try {
            // Create a provider
            const provider = new InfuraProvider('goerli', process.env.REACT_APP_INFURA_PROJECT_ID);
            
            // Create a signer
            const wallet = new Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
            
            // Define the contract address and ABI
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            const abi = [
                {
                    "inputs": [],
                    "name": "run",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ];
            
            // Create a contract instance
            const contract = new Contract(contractAddress, abi, wallet);
            
            // Call the 'run' function on the contract
            const tx = await contract.run();
            
            // Set the transaction hash
            setTxHash(tx.hash);
            console.log('Transaction Hash:', tx.hash);
        } catch (error) {
            console.error('Error running script:', error);
        }
    };

    return (
        <div className="App">
            <h1>Call SwapScript Contract</h1>
            <button onClick={handleRunScript}>Run Script</button>
            {txHash && <p>Transaction Hash: {txHash}</p>}
        </div>
    );
}

export default App;
