import "./ProblemModal.scss";
import { withQuestionAuthorization } from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../../Common/Firebase";
import { connect } from "react-redux";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import uuid from "react-uuid";
import axios from "axios";

const Title = ({ todoCount }) => {
  return (
    <div>
      <div className="modalHeader">
        <h1>Add problems ({todoCount})</h1>
        <p>Define the problems within your bad segments.</p>
        <p>
          For example, if one of your bad segments is Appearance, what is it
          about your appearance that makes you feel bad.
        </p>
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo, name }) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addTodo(input.value);
        input.value = "";
      }}
    >
      <p>{name}</p>
      <textarea
        className="form-control col-md-12"
        ref={node => {
          input = node;
        }}
      ></textarea>
      <input type="submit" value="Add" />
    </form>
  );
};

const Todo = ({ todo, remove }) => {
  // Each Todo

  return (
    <div className="list-group-item">
      <a key={todo.id} href="#" className="item">
        {todo.problem}
      </a>
      <a
        onClick={() => {
          remove(todo.id);
        }}
      >
        X
      </a>
    </div>
  );
};

const TodoList = ({ todos, remove }) => {
  let todoNode = [];
  // Map through the todos
  if (todos.length > 0) {
    todoNode = todos.map(todo => {
      return <Todo todo={todo} key={todo.id} remove={remove} />;
    });
  }
  return (
    <div className="list-group" style={{ marginTop: "30px" }}>
      {todoNode}
    </div>
  );
};

// Contaner Component
// Todo Id
class TodoApp extends React.Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      newProblemArray: [],
      problem: "",
      inputValue: "",
      problemArray: [],
      problemObject: {},
      key: "",
      userObject: {},
      addedProblems: {}
    };
  }

  // Lifecycle method
  componentDidMount() {
    axios
      .get(`/api/circles/${this.props.match.params.id}`)
      .then(res => this.setState({ userObject: res.data }));
    this.setState({ key: this.props.problemName });
  }
  // Add todo handler
  addTodo = val => {
    // Assemble data
    let key = this.state.key;
    const todo = { id: uuid(), problem: val, solution: [] };
    if (key) {
      let newProblemArray;
      if (this.state.newProblemArray.length > 0) {
        newProblemArray = this.state.newProblemArray;
      } else {
        newProblemArray = [];
      }
      newProblemArray.push(todo);
      this.setState({
        newProblemArray: newProblemArray
      });
    }
  };

  // Handle remove
  handleRemove = id => {
    // Filter all todos except the one to be removed
    const remainder = this.state.newProblemArray.filter(todo => {
      if (todo.id !== id) return todo;
    });
    this.setState({ newProblemArray: remainder });
  };

  cancelProblem = () => {
    this.props.closeHandler(null);
    this.resetAll();
  };

  pushProblem = () => {
    const newArray = this.state.problemArray;
    let newProblemObject = this.state.problemObject;
    newArray.push(this.state.problem);
    this.setState({ problemArray: newArray });
    newProblemObject[this.state.key] = this.state.problemArray;
    this.setState({ problemObject: newProblemObject });
    this.setState({ inputValue: "" });
  };

  getProblemObject = () => {
    let alreadyAddedProblems;
    if (this.state.userObject.problemArray) {
      alreadyAddedProblems = this.state.userObject.problemArray.filter(
        problem => {
          return Object.keys(problem).toString() === this.state.key;
        }
      );
      if (alreadyAddedProblems[0]) {
        this.setState({
          addedProblems: Object.values(alreadyAddedProblems[0])
        });
        return Object.values(alreadyAddedProblems[0]);
      }
    }
  };

  getProblemArraysIndex = () => {
    let index;
    if (this.state.userObject.problemArray) {
      index = this.state.userObject.problemArray.findIndex(
        x => Object.keys(x).toString() === this.state.key
      );
      return index;
    }
  };

  saveProblem = e => {
    let addedProblems = this.getProblemObject();
    let index = this.getProblemArraysIndex();
    let allProblems = [];
    const data = { ...this.state.userObject };
    let dataProblemArray = this.state.userObject.problemArray;
    let problemWithKey = {};
    if (addedProblems) {
      addedProblems = addedProblems[0];
      allProblems = addedProblems.concat(this.state.newProblemArray);
      problemWithKey = {
        [this.state.key]: allProblems
      };
      if (this.state.userObject.problemArray.length === 0) {
        data.problemArray = problemWithKey;
      } else {
        dataProblemArray[index] = problemWithKey;
      }
    }
    if (!addedProblems) {
      problemWithKey = {
        [this.state.key]: this.state.newProblemArray
      };
      if (this.state.userObject.problemArray.length === 0) {
        data.problemArray = problemWithKey;
      } else {
        allProblems = dataProblemArray.push(problemWithKey);
      }
    }

    const value = this.state.inputValue;
    if (value) {
      this.pushProblem();
    }
    this.getProblemObject();
    if (this.props) {
      this.props.firebase.auth.currentUser.getIdToken(true).then(idToken => {
        axios
          .put(`/api/circles/${this.props.match.params.id}`, data, {
            headers: { Authorization: `Bearer ${idToken}` }
          })
          .then(() =>
            this.props.history.push(`/circles/${this.props.match.params.id}`)
          );
      });
      this.props.closeHandler(null);
    }
  };

  resetAll = () => {
    this.setState({ inputValue: "" });
    this.setState({ problem: "" });
    this.setState({ problemArray: [] });
    this.setState({ problemObject: {} });
    this.setState({ key: "" });
  };

  render() {
    // Render JSX
    if (!this.props.open) {
      return null;
    }
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div>
          <Title todoCount={this.state.newProblemArray.length} />
          <TodoForm addTodo={this.addTodo} name={this.state.key} />
          <TodoList
            todos={this.state.newProblemArray}
            remove={this.handleRemove}
          />
          <div>
            {/* {alreadyAddedProblems &&
              alreadyAddedProblems[0].map((e, i) => <p key={i}>{e.problem}</p>)} */}
          </div>
        </div>
        <DialogActions>
          <Button onClick={this.cancelProblem} color="primary">
            Cancel
          </Button>
          <Button
            onClick={this.saveProblem}
            disabled={this.state.newProblemArray.length === 0}
            color="primary"
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
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
)(TodoApp);
