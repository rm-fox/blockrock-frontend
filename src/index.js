import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import './index.css';
import 'swiper/css/bundle';
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";


// Components
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "Example React UI Dapp",
          url: window.location.href,
        },
        alchemyAPIKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        // Other options.
      }}
    >
      <App />
    </MetaMaskUIProvider>
  </React.StrictMode>
);
