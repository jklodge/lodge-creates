import React, { useState, useEffect } from "react";
import "./App.css";
// import { Table } from "./Components/Table";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Search from "./Components/Search";
import DropDown from "./Components/DropDown";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [category, setCategory] = useState([]);
  // const [state, setState] = useState({
  //   categorys: [],
  //   pros: [],
  //   search: ""
  // });

  // const search = searchValue => {
  //   console.log(searchValue);
  //   setLoading(true);
  //   setErrorMessage(null);

  //   fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
  //     .then(response => response.json())
  //     .then(jsonResponse => {
  //       if (jsonResponse.Response === "True") {
  //         setCategory(jsonResponse.Search);
  //         setLoading(false);
  //       } else {
  //         setErrorMessage(jsonResponse.Error);
  //         setLoading(false);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await axios(
  //       "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
  //     );
  //     return result;
  //   }
  //   fetchData().then(result => setState({ categorys: result.name }));
  //   // .then(result => setState({}));
  //   console.log("useEffect hook is called", state);
  // }, []);
  return (
    <div className="App">
      {/* <Header text="HOOKED" /> */}
      {/* <Search search={search} /> */}
      <DropDown />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <p></p>
          // movies.map((movie, index) => (
          //   <ProsTable
          //     key={`${index}-${pros.Title}`}
          //     categorys={categorys}
          //   />
          //   <CategoryDropdown
          //     key={`${index}-${pros.Title}`}
          //     categorys={categorys}
          //   />
          // ))
        )}
      </div>
    </div>
  );
};

export default App;
