import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../Common/Firebase";
import { connect } from "react-redux";
import { withQuestionAuthorization } from "../Session";
import "./Generator.scss";
import * as ROUTES from "../../Constants/routes";

class Generator extends Component {
  chartRef = React.createRef();
  state = {
    backgroundColor: [],
    loading: false,
    circleObject: {},
    choiceObject: { good: [], neutral: [], bad: [] },
    good: [],
    bad: [],
    neutral: []
  };

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        this.props.history.push({
          pathname: ROUTES.RESULTS,
          state: {
            circleObject: this.state.circleObject,
            choiceObject: this.state.choiceObject
          }
        });
      }, 5000);
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ circleObject: this.props.location.state.circleObject });
      let good = this.state.good;
      let neutral = this.state.neutral;
      let bad = this.state.bad;
      var circleObject = { ...this.props.location.state.circleObject };
      var choiceObject = { ...this.state.choiceObject };
      Object.values(circleObject).map(e => {
        switch (e[1]) {
          case "Good":
            if (!good.includes(e[0])) {
              good.splice(good.length, 0, e[0]);
            }
            break;
          case "Neutral":
            if (!neutral.includes(e[0])) {
              neutral.splice(neutral.length, 0, e[0]);
            }
            break;
          case "Bad":
            if (!bad.includes(e[0])) {
              bad.splice(bad.length, 0, e[0]);
            }
            break;
          default:
            break;
        }
        choiceObject.good = good;
        choiceObject.neutral = neutral;
        choiceObject.bad = bad;
        this.setState({ choiceObject: choiceObject });
        this.setState({ loading: true });
        return choiceObject;
      });
    }
  }

  render() {
    return (
      <div className="generator">
        <h1>Generatoring your results page</h1>
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
)(Generator);
