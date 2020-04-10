import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import "./Account.scss";

const AccountPage = ({ authUser }) => (
  <div className="accountPage">
    <h1>Account</h1>
    <p className="accountTitle">Name</p>
    <input
      className="accountInput"
      name="name"
      value={authUser.name}
      type="name"
      readOnly
    />
    <p className="accountTitle">Email</p>
    <input
      className="accountInput"
      name="email"
      value={authUser.email}
      type="email"
      readOnly
    />
    <p className="accountTitle">Date of Birth</p>
    <input
      className="accountInput"
      name="dob"
      value={authUser.dob}
      type="dob"
      readOnly
    />
    <p className="accountTitle">Gender</p>
    <input
      className="accountInput"
      name="gender"
      value={authUser.gender}
      type="gender"
      readOnly
    />
    {/* <PasswordForgetForm />
    <PasswordChangeForm /> */}
    {/* <LoginManagement authUser={authUser} /> */}
  </div>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const condition = authUser => !!authUser;
export default compose(
  connect(mapStateToProps),
  // withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
