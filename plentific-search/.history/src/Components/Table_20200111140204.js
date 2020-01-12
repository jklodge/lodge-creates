import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";

export const Table = () => {
  const [state, setState] = useState({
    data: []
  });

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
    <input>
      <form onSubmit={this.handleSubmit} className="form-container">
        <h1>Sign up</h1>
        <div className={`form-group `}>
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            className={`form-control `}
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            onBlur={this.checkInput}
            required
          />
        </div>
      </form>
    </input>
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
