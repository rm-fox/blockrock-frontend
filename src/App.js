// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { ethers } from 'ethers';

// function App() {
//     const [txHash, setTxHash] = useState('');

//     const handleRunScript = async () => {
//         try {
//             const provider = new ethers.providers.InfuraProvider('goerli', process.env.REACT_APP_INFURA_PROJECT_ID);
//             const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
//             const abi = [
//                 {
//                     "inputs": [],
//                     "name": "run",
//                     "outputs": [],
//                     "stateMutability": "nonpayable",
//                     "type": "function"
//                 }
//             ];
//             const contract = new ethers.Contract(contractAddress, abi, provider);
//             const signer = provider.getSigner();
//             const tx = await contract.connect(signer).run();
//             setTxHash(tx.hash);
//             console.log('Transaction Hash:', tx.hash);
//         } catch (error) {
//             console.error('Error running script:', error);
//         }
//     };

//     return (
//         <div className="App">
//             <h1>Interacting with SwapScript Contract</h1>
//             <button onClick={handleRunScript}>Run Script</button>
//             {txHash && <p>Transaction Hash: {txHash}</p>}
//         </div>
//     );
// }

// export default App;


import React, { useState } from 'react';
import { InfuraProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';

function App() {
    const [txHash, setTxHash] = useState('');

    const handleRunScript = async () => {
        try {
            const provider = new InfuraProvider('goerli', process.env.REACT_APP_INFURA_PROJECT_ID);
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
            const contract = new Contract(contractAddress, abi, provider);
            const signer = provider.getSigner();
            const tx = await contract.connect(signer).run();
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
