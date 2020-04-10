import React, { Component } from "react";
import "./StartPage.scss";
import { withAuthorization } from "../Session";
import { withFirebase } from "../../Common/Firebase";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../Constants/routes";

class StartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <div className="startPage">
        <p className="registering">Thank you for registering...</p>
        <h1>Lets get started</h1>
        <div className="startPara">
          <p>
            Congratulations on taking the first step towards improving how you
            feel about your life.
          </p>
          <p>
            In the next section of the app you will be asked twelve questions.
          </p>
          <p>
            We encourage you to take your time to think about each question and
            answer it honestly and openly.
          </p>
          <p>Your data is confidential and will not be shared. </p>
        </div>
        <div className="buttonContainer">
          <button
          // disabled={!this.props.questions}
          // style={{
          //   background: this.props.questions
          //     ? "#b666d2"
          //     : "rgba(182,102,210, 0.3)"
          // }}
          >
            <Link to={ROUTES.QUESTIONS}>Start</Link>
          </button>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(StartPage);
