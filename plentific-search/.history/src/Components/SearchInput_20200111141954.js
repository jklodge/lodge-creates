import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { useInput } from "../Hooks/input-hooks";

export const SearchInput = () => {
  const [state, setState] = useState({
    data: [],
    search: ""
  });

  const { value, bind, reset } = useInput("");

  const handleSubmit = evt => {
    evt.preventDefault();
    reset();
    console.log(state.search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input
          type="text"
          value={state.search}
          onChange={e => setState({ search: e.target.value })}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
