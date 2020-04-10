import React, { Component } from "react";
import { compose } from "recompose";
import axios from "axios";
import { connect } from "react-redux";
import { withFirebase } from "../../Common/Firebase";
import { withAuthorization } from "../Session";
import * as ROUTES from "../../Constants/routes";
import Spinner from "../../shared/assets/spin.gif";

import "./ResultsPage.scss";
import { CircleTable } from "./CircleTable";

let namesArray;
let choicesArray;
let valuesArray;
let choiceTable;

class ResultsPage extends Component {
  chartRef = React.createRef();
  state = {
    backgroundColor: [],
    isLoading: true,
    circleObject: {},
    choiceObject: {},
    data: {},
    key: "profile"
  };

  componentDidMount() {
    axios
      .get(`/api/circles/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
      .then(() => this.getColours())
      .then(() => {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
      });
  }

  resultsLoaded = () => {
    this.setState({ loading: false });
  };
  restartQuestions = () => {
    this.props.history.push(ROUTES.QUESTIONS);
  };

  getColours = () => {
    if (this.state.data && this.state.data.numberOfCircles > 0) {
      valuesArray = Object.values(this.state.data.circleObject);
      choiceTable = Object.entries(this.state.data.choiceObject);

      if (valuesArray) {
        choicesArray = valuesArray.map(x => {
          return x[1];
        });
        namesArray = valuesArray.map(x => {
          return x[0];
        });
      }

      if (choicesArray) {
        for (let i = 0; i < choicesArray.length; i++) {
          switch (choicesArray[i]) {
            case "Good":
              choicesArray[i] = "#42c8b5";
              break;
            case "Bad":
              choicesArray[i] = "#f55050";
              break;
            case "Neutral":
              choicesArray[i] = "#f48b3b";
              break;
            default:
              break;
          }
          this.state.backgroundColor.push(choicesArray[i]);
        }
        return {
          loading: this.state.data.numberOfCircles
        };
      }
      return null;
    }
  };

  render() {
    return (
      <div className="resultsPage">
        {!this.state.isLoading ? (
          <div>
            {valuesArray ? (
              namesArray ? (
                <div className="circleContainer">
                  <ul className="circle">
                    {namesArray.map((names, i) => (
                      <li key={i}>
                        <div
                          className="label"
                          style={{
                            background: this.state.backgroundColor[i]
                          }}
                        >
                          <h4>{namesArray[i]}</h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <CircleTable choiceTable={choiceTable} />
                </div>
              ) : null
            ) : null}
            <p className="redo" onClick={this.restartQuestions}>
              Redo your questions
            </p>
          </div>
        ) : (
          <div className="loader">
            <img src={Spinner} alt="loading..." />
          </div>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser => dispatch({ type: "AUTH_USER_SET", authUser })
});

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withAuthorization(condition)
)(ResultsPage);
