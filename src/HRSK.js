import React, { useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract, Wallet } from 'ethers';

function HRSK() {
    const [txHash, setTxHash] = useState('');
    const [txStatus, setTxStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRunScript = async () => {
        setTxStatus('');  // Reset status and error message
        setErrorMessage('');
        
        try {
            // Create a provider for the Sepolia testnet using Alchemy
            const provider = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);

            // const provider = new JsonRpcProvider(`https://sepolia.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);
            
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
            setTxStatus('Transaction sent. Waiting for confirmation...');

            // Wait for the transaction to be mined
            const receipt = await tx.wait();

            // Check the transaction status
            if (receipt.status === 1) {
                setTxStatus('Transaction confirmed!');
                console.log('Transaction Receipt:', receipt);
            } else {
                setTxStatus('Transaction failed.');
                console.error('Transaction failed:', receipt);
            }
        } catch (error) {
            setErrorMessage('Error running script: ' + error.message);
            console.error('Error running script:', error);
        }
    };

    return (
        <div className="HRSK">
            <h1>Call SwapScript Contract</h1>
            <button onClick={handleRunScript}>Run Script</button>
            {txHash && <p>Transaction Hash: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>}
            {txStatus && <p>Status: {txStatus}</p>}
            {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
        </div>
    );
}

export default HRSK;


