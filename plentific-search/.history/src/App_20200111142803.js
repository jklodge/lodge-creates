import React from "react";
import "./App.css";
import { Table } from "./Components/Table";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [state, setState] = useState({
    data: [],
    search: ""
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
  return (
    <div className="App">
      {/* <Router>
        <Route exact path="/" render={Table.render} />
      </Router> */}

      <Table />
    </div>
  );
};

export default App;
