import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../Common/Firebase";
import { connect } from "react-redux";
import { withQuestionAuthorization } from "../Session";
import "./ResultsContainer.scss";
import Tabs from "../Tabs/Tabs";
import ResultsPage from "./ResultsPage";
import ProblemsSolutions from "../Problems/ProblemsSolutions";
import Checklist from "../Checklist/Checklist";

class ResultsContainer extends Component {
  state = { open: false };

  componentDidUpdate() {}

  render() {
    const Tab = ({ children }) => <div>{children}</div>;
    return (
      <div className="ResultsContainer">
        <Tabs defaultIndex={0}>
          <Tab label="Results">
            <ResultsPage />
          </Tab>
          <Tab label="Problems/Solutions">
            <ProblemsSolutions />
          </Tab>
          <Tab label="Checklist">
            <Checklist />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser => dispatch({ type: "AUTH_USER_SET", authUser })
});

export default compose(
  withFirebase,
  connect(null, mapDispatchToProps),
  withQuestionAuthorization(condition)
)(ResultsContainer);
