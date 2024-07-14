import Nav from "./components/sections/Nav"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
// import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";

export const App = () => {
  return (
    <div className="App">
      <Hero />
      <About />
    </div>
  );
};

export default App;
