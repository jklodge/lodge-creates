import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../../Common/Firebase";
import * as ROUTES from "../../Constants/routes";
import "./PasswordChange.scss";

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email: "",
  error: null
};

const forgotText = {
  color: "white",
  textAlign: "center"
};
class PasswordForgetFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <form className="passwordChange" onSubmit={this.onSubmit}>
        <h1>Reset Password</h1>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <p>
          We will send a link to your email address which will let you reset
          your password
        </p>
        <button className="resetButton" disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const PasswordForgetLink = () => (
  <p>
    <Link style={forgotText} to={ROUTES.PASSWORD_FORGET}>
      Forgot Password?
    </Link>
  </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
