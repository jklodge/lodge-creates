import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../Common/Firebase";
import { connect } from "react-redux";
import { withQuestionAuthorization } from "../Session";
import axios from "axios";
import "./Checklist.scss";

class Checklist extends Component {
  chartRef = React.createRef();
  state = {
    backgroundColor: [],
    loading: false,
    data: {}
  };

  componentDidUpdate() {}

  componentDidMount() {
    axios
      .get(`/api/circles/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
      .then(res => console.log(this.state.data));
  }
  render() {
    let problemArray;
    if (this.state.data.problemArray) {
      console.log(this.state.data.problemArray);
      problemArray = this.state.data.problemArray;
    }
    return (
      <div className="Checklist">
        <div className="checklistHeader">
          <p>Solutions</p>
          <p>Completed</p>
        </div>
        {problemArray &&
          problemArray.map((key, i) => (
            <div className="solutionContainer" key={i}>
              <p className="problemTitle">{Object.keys(key)}</p>
              {Object.values(key)[0].map((solutionObject, i) => (
                <div key={i} className="solution">
                  {solutionObject.solution.length <= 0
                    ? null
                    : solutionObject.solution.map(solution => (
                        <p key={solution.id} className="solutionText">
                          {solution.solution}
                        </p>
                      ))}
                </div>
              ))}
            </div>
          ))}
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
)(Checklist);
