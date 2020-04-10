import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "./SignUp";
import { withFirebase } from "../../Common/Firebase";
import { PasswordForgetLink } from "../../Components/Auth/PasswordForget";
import * as ROUTES from "../../Constants/routes";

import "./SignIn.scss";

const SignInPage = () => (
  <div className="signInPage">
    <div className="topTitles">
      <h1>Log in</h1>
    </div>

    <SignInForm />
    <div className="bottomLinks">
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>
);
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};
class SignInFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.START);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <form className="signForm" onSubmit={this.onSubmit}>
        <span>Email</span>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
        />
        <span>Password</span>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
        />
        <div className="buttonContainer">
          <button className="signButton" disabled={isInvalid} type="submit">
            Sign In
          </button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export { SignInForm };
