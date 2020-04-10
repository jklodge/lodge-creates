import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";

import { withAuthorization } from "../Session";
import { UserItem } from "./Users/";
import { UserList } from "./Users/";
// import * as ROLES from "../../Constants/roles";
import * as ROUTES from "../../Constants/routes";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser => authUser != null;

export default compose(
  // withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
