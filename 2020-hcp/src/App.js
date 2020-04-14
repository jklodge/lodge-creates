import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import ComingSoon from "./Components/ComingSoon";

function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">Dr Uche 2020 HCP</header>
      <Home />
      <ComingSoon />
      <Footer />
    </div>
  );
}

export default App;
