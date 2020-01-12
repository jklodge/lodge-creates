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
    dispatch({
      type: "SEARCH_REQUEST",
      postcode: searchValue
    });
  };

  const selectedCat = selectedCat => {
    dispatch({
      type: "CATEGORY_REQUEST",
      category: selectedCat
    });

    console.log(state);

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

  const handleClick = () => {
    const obj = {
      category_id: state.category,
      location: state.postcode
    };
    console.log("obj", obj);

    axios
      .post(
        "https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/",
        obj
      )
      .then(jsonResponse => {
        console.log("js", jsonResponse.data);
        console.log("js", jsonResponse.data.response.pros);
        if (jsonResponse.data.code === 0) {
          dispatch({
            type: "SEARCH_PROS_SUCCESS",
            payload: jsonResponse.data.response.pros
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
        console.log(state);
      });
  };

  useEffect(() => {});

  return (
    <div className="App">
      {/* <Header text="HOOKED" /> */}
      <Search search={search} />
      <DropDown selectedCat={selectedCat} />
      <button
        disabled={!state.postcode || !state.category}
        onClick={handleClick}
      >
        Find company
      </button>
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
