import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../../../Common/Firebase";

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    if (!this.props.user) {
      this.setState({ loading: true });

      this.props.firebase
        .user(this.props.match.params.id)
        .on("value", snapshot => {
          this.props.onSetUser(snapshot.val(), this.props.match.params.id);

          this.setState({ loading: false });
        });
    }
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.props.user.email);
  };

  render() {
    const { user } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <p>
              <strong>ID:</strong> {user.uid}
            </p>
            <p>
              <strong>E-Mail:</strong> {user.email}
            </p>
            <p>
              <strong>name:</strong> {user.name}
            </p>
            <p>
              <button type="button" onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: "USER_SET", user, uid })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserItem);
