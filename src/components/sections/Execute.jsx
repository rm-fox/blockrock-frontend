import React from 'react';
import Container from "../utils/Container";
import SectionTitle from "../utils/SectionTitle";
import graph from '../../assets/plotgraph.png';

const cryptoData = [
  { name: 'IWIF', price: '$369.3', sharesPerUnit: '0.1', weight: '20%', marketCap: '$5B' },
  { name: 'EBIP', price: '$1,842', sharesPerUnit: '1.5', weight: '15%', marketCap: '$2B' },
  { name: 'LOLI', price: '$0.50', sharesPerUnit: '50', weight: '10%', marketCap: '$5B' },
  { name: 'sOKI', price: '$860', sharesPerUnit: '2', weight: '8%', marketCap: '$0.2B' },
  { name: 'WOWO', price: '$10.55', sharesPerUnit: '5', weight: '12%', marketCap: '$2B' },
  { name: 'YESM', price: '$714.241', sharesPerUnit: '10', weight: '5%', marketCap: '$1.5B' },
];

const Execute = () => {
  return (
    <section id="about" className="bg-gray-900 text-white min-h-full p-4">
      <Container>
        {/* Uncomment this if you need a section title */}
        {/* <SectionTitle title="Dynamic Risk Pools">
          Currently trending dynamically adjusting risk pools
        </SectionTitle> */}
        <main className="flex flex-col lg:flex-row justify-center items-start gap-7">
          {/* Plot Section */}
          <div className="flex flex-col bg-gray-800 p-4 rounded-lg flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-bold">HRSK</span>
                <span>•</span>
                <span>5m</span>
                <span>•</span>
                <span>High Risk ETF</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-green-500 px-4 py-2 rounded text-white">Buy</button>
                <button className="bg-gray-700 px-4 py-2 rounded text-white">Sell</button>
              </div>
            </div>
            {/* Graph Section */}
            <div className="bg-gray-600 h-64 rounded overflow-hidden mb-4">
              <img src={graph} alt="Graph" className="h-full max-w-none" />
            </div>
            {/* Text Beneath Graph */}
            <div className="text-center text-gray-400 text-m mb-4">
              <p>AI analysis of your previous tolerance to risk suggests HRSK, High Risk ETF. With a daily variance of 0.5 standard deviation, new low cap constituents and social momentum, this ETF is targeted at investors seeking to easily catch the big winners.</p>
            </div>
            {/* Crypto Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700 bg-gray-800 rounded-lg">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-400">Name</th>
                    <th className="px-4 py-2 text-left text-gray-400">Price</th>
                    <th className="px-4 py-2 text-left text-gray-400">Shares per ETF Unit</th>
                    <th className="px-4 py-2 text-left text-gray-400">Weight</th>
                    <th className="px-4 py-2 text-left text-gray-400">Market Cap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {cryptoData.map((crypto, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-4 py-2">{crypto.name}</td>
                      <td className="px-4 py-2">{crypto.price}</td>
                      <td className="px-4 py-2">{crypto.sharesPerUnit}</td>
                      <td className="px-4 py-2">{crypto.weight}</td>
                      <td className="px-4 py-2">{crypto.marketCap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col bg-gray-500 p-4 rounded-lg w-full lg:w-auto">
            <div className="text-center bg-gray-700 p-4 rounded-lg w-full mb-6">
              <h2 className="text-3xl font-extrabold text-yellow-400 mb-2">
                Tailored Recommendation
              </h2>
              <p className="text-xl font-semibold text-white">
                High Risk ETF (HRSK)
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold">HRSK</h1>
                <p>Ticker: HRSK</p>
              </div>
              <div className="text-green-400">Market cap: $172,835,189.45</div>
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
