import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import Nav from "./Components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">Dr Uche 2020 HCP</header>
      <Home />
    </div>
  );
}

export default App;
