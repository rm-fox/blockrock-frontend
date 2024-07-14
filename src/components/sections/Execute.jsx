import React from 'react';
import Container from "../utils/Container";
import SectionTitle from "../utils/SectionTitle";

const Execute = () => {
  return (
    <section id="about" className="bg-gray-900 text-white min-h-full p-4">
      <Container>
        {/* Uncomment this if you need a section title */}
        {/* <SectionTitle title="Dynamic Risk Pools">
          Currently trending dynamically adjusting risk pools
        </SectionTitle> */}
        <main className="flex flex-col lg:flex-row justify-center items-center gap-7">
          {/* Plot Section */}
          <div className="flex flex-col bg-gray-800 p-4 rounded-lg flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-bold">GTRUMP</span>
                <span>•</span>
                <span>5m</span>
                <span>•</span>
                <span>Pump</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-green-500 px-4 py-2 rounded text-white">Buy</button>
                <button className="bg-gray-700 px-4 py-2 rounded text-white">Sell</button>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded text-center text-lg mb-2">
              O 0.0000001172 H 0.000001441 L 0.0000001082 C 0.000001234 + 5.35%
            </div>
            <div className="bg-gray-600 h-64 rounded">
              {/* Placeholder for the chart */}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col bg-gray-500 p-4 rounded-lg w-full lg:w-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold">HRSK</h1>
                <p>Ticker: HRSK</p>
              </div>
              <div className="text-green-400">Market cap: $17,835.45</div>
            </div>
            <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <w3m-onramp-widget />
                
              
              </div>
            </div>
          </div>
        </main>
      </Container>
    </section>
  );
};

export default Execute;
