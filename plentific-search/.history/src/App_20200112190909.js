import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
// import { Table } from "./Components/Table";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Search from "./Components/Search";
import { DropDown } from "./Components/DropDown";
import { initialState, reducer } from "./store/reducer";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = searchValue => {
    const postcode = searchValue;
    // setPostcode(searchValue);
    // setLoading(true);
    // setErrorMessage(null);
    // console.log(postcode);
    return postcode;

    //   // fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    //   //   .then(response => response.json())
    //   //   .then(jsonResponse => {
    //   //     if (jsonResponse.Response === "True") {
    //   //       setCategory(jsonResponse.Search);
    //   //       setLoading(false);
    //   //     } else {
    //   //       setErrorMessage(jsonResponse.Error);
    //   //       setLoading(false);
    //   //     }
    //   //   });
  };

  const selectedCat = selectedCat => {
    const category = searchValue;
    console.log(category);

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
    return category;
  };

  const handleClick = (searchValue, selectedCat) => {
    console.log("search", search);
    console.log("selectedCat", selectedCat);
    const obj = {
      category_id: selectedCat,
      location: search
    };
    console.log("what", searchValue, selectedCat);
    // setObject(obj);
    console.log("obj", obj);

    // console.log("searchObject", searchObject);
    axios
      .post(
        "https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/",
        obj
      )
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  useEffect(() => {});

  return (
    <div className="App">
      {/* <Header text="HOOKED" /> */}
      <Search search={handleClick} />
      <DropDown selectedCat={handleClick} />
      <button onClick={handleClick}>Find company</button>
      <div className="pros">
        {/* {loading && !errorMessage ? (
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
        )} */}
      </div>
    </div>
  );
};

export default App;
