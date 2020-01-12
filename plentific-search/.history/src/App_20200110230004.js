import React from "react";
import "./App.css";
import { Table } from "./Components/Table";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Route exact path="/" render={Table.render} />
      </Router> */}

      <Table />
    </div>
  );
}

export default App;
