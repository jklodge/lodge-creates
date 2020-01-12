import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
// import { Table } from "./Components/Table";
import axios from "axios";
import Search from "./Components/Search";
import { DropDown } from "./Components/DropDown";
import { initialState, reducer } from "./store/reducer";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pros, setPros] = useState([]);

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
        if (jsonResponse.data.response.pros) {
          console.log("js", jsonResponse.data.response.pros);
          const pros = jsonResponse.data.response.pros;
          dispatch({
            type: "SEARCH_PROS_SUCCESS",
            payload: pros
          });
        } else {
          dispatch({
            type: "SEARCH_PROS_FAILURE",
            error: "Unable to find your category within that location"
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
      <ProTable pros={pros} />
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
