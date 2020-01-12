import React, { useState, useEffect } from "react";
import "./App.css";
// import { Table } from "./Components/Table";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Search from "./Components/Search";
import { DropDown } from "./Components/DropDown";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [category, setCategory] = useState([]);
  const [postcode, setPostcode] = useState([]);
  const [searchObject, setObject] = useState({});
  // const [state, setState] = useState({
  //   categorys: [],
  //   pros: [],
  //   search: ""
  // });

  const search = searchValue => {
    console.log(searchValue);
    setPostcode(searchValue);
    setLoading(true);
    setErrorMessage(null);

    // fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    //   .then(response => response.json())
    //   .then(jsonResponse => {
    //     if (jsonResponse.Response === "True") {
    //       setCategory(jsonResponse.Search);
    //       setLoading(false);
    //     } else {
    //       setErrorMessage(jsonResponse.Error);
    //       setLoading(false);
    //     }
    //   });
  };

  const selectedCat = selectedCat => {
    console.log(selectedCat);
    setCategory(selectedCat);
    if (postcode && category) {
      const obj = { categort_id: category, postcode: postcode };
      setObject(obj);
    }
    // fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    //   .then(response => response.json())
    //   .then(jsonResponse => {
    //     if (jsonResponse.Response === "True") {
    //       setCategory(jsonResponse.Search);
    //       setLoading(false);
    //     } else {
    //       setErrorMessage(jsonResponse.Error);
    //       setLoading(false);
    //     }
    //   });
  };

  useEffect(() => {
    if (postcode && category) {
      const obj = { categort_id: category, postcode: postcode };
      console.log(obj);
      axios
        .post(
          "https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/",
          obj
        )
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  });

  return (
    <div className="App">
      {/* <Header text="HOOKED" /> */}
      <Search search={search} />
      <DropDown selectedCat={selectedCat} />
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
