import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import { Table } from "./Components/Table";
import axios from "axios";
import Search from "./Components/Search";
import { DropDown } from "./Components/DropDown";
import { initialState, reducer } from "./store/reducer";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pros, setPros] = useState([]);
  const [pagination, setPagination] = useState([]);


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

    axios
      .post(
        "https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/",
        obj
      )
      .then(jsonResponse => {
        if (jsonResponse.data.response.pros) {
          setPros(jsonResponse.data.response.pros);
          setPagination(jsonResponse.headers);
          console.log('header',jsonResponse.headers.getAll('x-total-count'))
          dispatch({
            type: "SEARCH_PROS_SUCCESS",
            payload: jsonResponse.data.response.pros
          });
        } else {
          dispatch({
            type: "SEARCH_PROS_FAILURE",
            error: "Unable to find your category within that location"
          });
        }
      });
  };

  useEffect(() => {});

  return (
    <div className="App">
      <Search search={search} />
      <DropDown selectedCat={selectedCat} />
      <button
        disabled={!state.postcode || !state.category}
        onClick={handleClick}
      >
        Find company
      </button>
      {pros ? <Table pros={pros} /> : <span></span>}
    </div>
  );
};

export default App;
