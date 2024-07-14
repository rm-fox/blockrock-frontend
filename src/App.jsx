import Nav from "./components/sections/Nav"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"

// import { useSDK } from "@metamask/sdk-react";
// import React, { useState } from "react";

// export const App = () => {
//   const [account, setAccount] = useState<string | undefined>();
//   const { sdk, connected, connecting, provider, chainId } = useSDK();

//   const connect = async () => {
//     try {
//       const accounts = await sdk?.connect();
//       setAccount(accounts?.[0]);
//     } catch (err) {
//       console.warn("failed to connect..", err);
//     }
//   };

//   return (
//     <div className="App">
//       <button style={{ padding: 10, margin: 10 }} onClick={connect}>
//         Connect
//       </button>
//       {connected && (
//         <div>
//           <>
//             {chainId && `Connected chain: ${chainId}`}
//             <p></p>
//             {account && `Connected account: ${account}`}
//           </>
//         </div>
//       )}
//       <>
//       <Hero />
//       <About />
//       {/* <WalletConnect /> */}

//       </>
//     </div>
    
//   );
// };

import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";

// export const App = () => {
//   const [account, setAccount] = useState();
//   const { sdk, connected, connecting, provider, chainId } = useSDK();

//   const connect = async () => {
//     try {
//       const accounts = await sdk?.connect();
//       setAccount(accounts?.[0]);
//     } catch (err) {
//       console.warn("failed to connect..", err);
//     }
//   };

//   return (
//     <div className="App">
//       <button style={{ padding: 10, margin: 10 }} onClick={connect}>
//         Connect
//       </button>
//       {connected && (
//         <div>
//           <>
//             {chainId && "Connected chain: ${chainId}"}
//             <p></p>
//             {account && "Connected account: ${account}"}
//           </>
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useState } from "react";

export const App = () => {
  return (
    <div className="App">
      <Hero />
      <About />
    </div>
  );
};

// const App = () => {
//   return (
//     <>
//       <Hero />
//       <About />
//       {/* <WalletConnect /> */}

//     </>
//   )
// }

export default App
