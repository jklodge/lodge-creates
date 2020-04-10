import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withFirebase } from "./Common/Firebase";
import SignUpPage from "./Components/Auth/SignUp";
import SignInPage from "./Components/Auth/SignIn";
// import { AuthUserContext } from "../Session";
import { withAuthentication } from "./Components/Session";
import "bootstrap/dist/css/bootstrap.min.css";

import * as ROUTES from "./Constants/routes";

import Nav from "./Common/Nav";
import "./App.scss";
import Account from "./Components/Auth/Account";
import QuestionPage from "./Components/Questions/QuestionPage";
import StartPage from "./Components/Questions/StartPage";
import ResultsContainer from "./Components/Results/ResultsContainer";
import Generator from "./Components/Results/Generator";
import PasswordForgetPage from "./Components/Auth/PasswordForget";
import { HomeContainer } from "./Components/Home/HomeContainer";

import { Footer } from "./Components/Footer/footer";

class App extends Component {
  componentDidMount() {}
  //TODO - Create if user is signed in and has number of circle 1 go to this page

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          {this.props.authUser && this.props.authUser.numberOfCircles >= 1 ? (
            <Switch>
              <Route path={ROUTES.RESULTS} exact component={ResultsContainer} />
              <Route path={ROUTES.ACCOUNT} component={Account} />
              <Route path={ROUTES.QUESTIONS} component={QuestionPage} />
              <Route path={ROUTES.GENERATOR} component={Generator} />
              <Route path="/" component={HomeContainer} />
              <Route path={ROUTES.ACCOUNT} component={Account} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          ) : this.props.authUser ? (
            <Switch>
              <Route exact path={ROUTES.START} component={StartPage} />
              <Route path={ROUTES.ACCOUNT} component={Account} />
              <Route path={ROUTES.QUESTIONS} component={QuestionPage} />
              <Route path={ROUTES.RESULTS} component={ResultsContainer} />
              <Route path={ROUTES.GENERATOR} component={Generator} />
              <Route path="/" component={HomeContainer} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          ) : (
            <Switch>
              <Route path={ROUTES.QUESTIONS} component={QuestionPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route path="/" component={HomeContainer} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route render={() => <Redirect to="/" />} />
              {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
              {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
            </Switch>
          )}
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default compose(
  withFirebase,
  withAuthentication,
  connect(mapStateToProps)
)(App);
