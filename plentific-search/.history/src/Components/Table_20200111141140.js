import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { useInput } from "./hooks/input-hook";

export const Table = () => {
  const [state, setState] = useState({
    data: []
  });
  const { reset: resetSearchInput } = useInput("");

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(state.search);
    const { reset: resetSearchInput } = useInput("");
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
      );
      return result;
    }
    fetchData().then(result => setState({ data: result.data }));
    // .then(result => setState({}));
    console.log("useEffect hook is called", state);
  }, []);
  <div>
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input
          type="text"
          value={search}
          onChange={e => setState({ search: e.target.value })}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div>;
  console.log("state.data", Object.values(state.data));
  return state.data.length === 0 ? (
    "no data to display"
  ) : (
    <MaterialTable
      title="Your site"
      columns={[
        { title: "id", field: "id" },
        { title: "Name", field: "name" },
        { title: "Postcode", field: "postcode" },
        { title: "Review rating", field: "rating" }
      ]}
      data={state.data}
      // editable={{
      //   onRowAdd: newData =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve();
      //         const data = [...state.data];
      //         data.push(newData);
      //         setState({ ...state, data });
      //       }, 600);
      //     }),
      //   onRowUpdate: (newData, oldData) =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve();
      //         const data = [...state.data];
      //         data[data.indexOf(oldData)] = newData;
      //         setState({ ...state, data });
      //       }, 600);
      //     }),
      //   onRowDelete: oldData =>
      //     new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve();
      //         const data = [...state.data];
      //         data.splice(data.indexOf(oldData), 1);
      //         setState({ ...state, data });
      //       }, 600);
      //     })
      // }}
    />
  );
};
