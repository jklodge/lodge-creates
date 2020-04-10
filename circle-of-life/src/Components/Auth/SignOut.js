import React from "react";

import { withFirebase } from "../../Common/Firebase";

const SignOutButton = ({ firebase }) => {
  return (
    <a href="/" onClick={firebase.doSignOut}>
      Sign Out
    </a>
  );
};

export default withFirebase(SignOutButton);
