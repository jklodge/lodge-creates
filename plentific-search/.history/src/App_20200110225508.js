import React from "react";
import "./App.css";
import { Table } from "@material-ui/core";
import ReactDOM from "react-dom";

function App() {
  return (
    <div className="App">
      <Route
        exact
        path="/an-outrageously-awesome-endpoint"
        render={Table.render}
      />
      {/* <Table /> */}
    </div>
  );
}

export default App;
