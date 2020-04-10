import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withFirebase } from "../../Common/Firebase";
import * as ROUTES from "../../Constants/routes";

const withResultsAuthorization = condition => Component => {
  class withResultsAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.SIGN_IN);
        }
        // else if (!this.props.authUser.circleObjects[0]) {
        //   this.props.history.push(ROUTES.START);
        // }
      });
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return condition(this.props.authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }
  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    questions: Object.keys(state.questionState.questions || {}).map(key => ({
      ...state.questionState.questions[key],
      uid: key
    }))
  });

  return compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps)
  )(withResultsAuthorization);
};
export default withResultsAuthorization;
