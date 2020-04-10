import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../../Common/Firebase";
import * as ROUTES from "../../Constants/routes";
import { compose } from "recompose";
import { connect } from "react-redux";

import "./SignUp.scss";

const SignUpPage = () => (
  <div className="signUpContainer">
    <div className="topUpLinks">
      <h1>Create account</h1>
    </div>
    <div className="signInLinks">
      <SignUpForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  name: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  dob: "",
  gender: "",
  error: null
};

class SignUpFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { name, email, passwordOne, gender, dob } = this.state;
    console.log("name", name);
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          name,
          email,
          gender,
          dob
        });
      })
      .then(res => {
        console.log("res:", res);
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
    const {
      name,
      email,
      passwordOne,
      passwordTwo,
      dob,
      gender,
      error
    } = this.state;
    // const isInvalid =
    //   passwordOne !== passwordTwo ||
    //   passwordOne === "" ||
    //   email === "" ||
    //   name === "" ||
    //   gender === "" ||
    //   dob === "";
    return (
      <React.Fragment>
        <div className="signForm">
          <h3>Sign up with email</h3>
          <form onSubmit={this.onSubmit}>
            <span>Name</span>
            <input
              name="name"
              value={name}
              onChange={this.onChange}
              type="text"
              required
            />
            <span>Email</span>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              required
            />
            <span>Password</span>
            <input
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              required
            />
            <span>Confirm password</span>
            <input
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              required
            />
            <span>Date of birth</span>
            <input
              type="date"
              name="dob"
              onChange={this.onChange}
              value={dob}
              required
            />
            <span>Gender</span>
            <select
              name="gender"
              onChange={this.onChange}
              value={gender}
              required
            >
              <option value=" " defaultValue>
                {" "}
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="terms">
              <p>
                By creating an account, you agree to Circle Of Life's Terms &
                Conditions.
              </p>
              <p>
                To learn more about how Circle Of Life collects, uses, shares
                and protects your personal data, please read Circle Of Life's
                Privacy Policy.
              </p>
            </div>
            <div className="buttonContainer">
              <button
                onClick={this.handleClick}
                className="signButton"
                // disabled={isInvalid}
                type="submit"
              >
                Create account
              </button>
            </div>
            {error && <span>{error.message}</span>}
            <Link to={ROUTES.SIGN_IN}>Already have an account? Log in</Link>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);

const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: "USER_SET", user, uid })
});

const SignUpForm = compose(
  withRouter,
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
