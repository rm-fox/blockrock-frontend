import React from 'react';

function App() {
    const handleClick = () => {
        window.location.href = '/HRSK';  // Navigates to the /HRSK route
    };

    return (
        <div className="App">
            <h1>Call SwapScript Contract</h1>
            <button onClick={handleClick}>Go to Other Page</button>
        </div>
    );
}

export default App;
