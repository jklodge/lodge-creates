import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../Common/Firebase";
import { connect } from "react-redux";
import { withQuestionAuthorization } from "../Session";
import "./Tabs.scss";

class Tabs extends Component {
  state = {
    activeIndex: this.props.defaultIndex || 0
  };

  Tab = ({ children }) => <div>{children}</div>;

  render() {
    // this.props.children is just data™, so we can iterate our
    // children, map them to new children, even inspect their props
    let tabs = React.Children.map(this.props.children, (child, index) => {
      // which helps us decide which one is active
      return (
        <button
          // 3. provides a way to change that state
          onClick={() => this.setState({ activeIndex: index })}
        >
          {/* you can inspect and render the prop of a child*/}
          <p>{child.props.label}</p>
        </button>
      );
    });
    return (
      <div className="Tab">
        <div className="Header">
          <h1>
            Hi{" "}
            <span style={{ textTransform: "capitalize" }}>
              {this.props.authUser.name}
            </span>
          </h1>
          <p>Welcome to the Circle of LIfe</p>
        </div>

        <div className="tabs">{tabs}</div>
        {/* Children is Just Data™ (it's an array) so we can
            access the the one we want based on state
            and render it here */}
        {this.props.children[this.state.activeIndex]}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser => dispatch({ type: "AUTH_USER_SET", authUser })
});

export default compose(
  withFirebase,
  connect(null, mapDispatchToProps),
  withQuestionAuthorization(condition)
)(Tabs);
