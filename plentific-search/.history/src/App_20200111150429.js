import React, { useState, useEffect } from "react";
import "./App.css";
import { Table } from "./Components/Table";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [state, setState] = useState({
    categorys: [],
    pros: [],
    search: ""
  });

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
      );
      return result;
    }
    fetchData().then(result => setState({ categorys: result.name }));
    // .then(result => setState({}));
    console.log("useEffect hook is called", state);
  }, []);
  return (
    <div className="App">
      {/* <Header text="HOOKED" /> */}
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <ProsTable key={`${index}-${pros.Title}`} pros={pros} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
