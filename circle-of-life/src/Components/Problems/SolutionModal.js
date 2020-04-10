import "./ProblemModal.scss";
import { withQuestionAuthorization } from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../../Common/Firebase";
import { connect } from "react-redux";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import uuid from "react-uuid";
import axios from "axios";

const Title = ({ todoCount }) => {
  return (
    <div>
      <div className="modalHeader">
        <h1>Add Solutions</h1>
        <p>
          Create solutions for the problems you have identified within your bad
          segments.
        </p>
        <p>
          For example, if one of your problems is your unhappy with your weight
          - a solution could be to join a gym.
        </p>
      </div>
    </div>
  );
};

const TodoForm = ({ addSolution, name, addedProblems }) => {
  const [valueObject, setValueObject] = useState();
  const [inputValue, setInputValue] = useState();

  let problemId;
  const getProblemId = e => {
    const { name, id } = e.target;
    problemId = id;
  };

  const resetValueObject = () => {
    setValueObject({ ...valueObject, [name]: "" });
    setValueObject();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValueObject({ ...valueObject, [name]: value });
    setInputValue(value);
  };
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addSolution(inputValue, problemId);
        setValueObject("");
      }}
    >
      <p>{name}</p>
      {addedProblems[0] &&
        addedProblems[0].map((e, i) => (
          <div id="form" key={i}>
            {e.problem}
            <textarea
              onChange={handleChange}
              name={i}
              value={i.valueObject}
              className="form-control col-md-12"
              id="solution"
              ref={node => {
                input = node;
              }}
            ></textarea>
            <input
              id={e.id}
              type="submit"
              name={i}
              value="Add"
              onClick={i => getProblemId(i)}
            />
          </div>
        ))}
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
      newSolutionArray: [],
      problem: "",
      inputValue: "",
      solutionArray: [],
      solutionObject: {},
      key: "",
      userObject: {},
      addedProblems: []
    };
  }

  // Lifecycle method
  componentDidMount() {
    axios
      .get(`/api/circles/${this.props.match.params.id}`)
      .then(res => this.setState({ userObject: res.data }))
      .then(() => {
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
          }
        }
      });
    this.setState({ key: this.props.problemName });
  }

  getProblemArraysIndex = id => {
    let index;
    if (this.state.userObject.problemArray) {
      index = this.state.addedProblems[0].findIndex(x => x.id === id);
      return index;
    }
  };

  getSolution = sol => {
    const solution = { id: uuid(), solution: sol };
    return solution;
  };

  // Add todo handler
  addSolution = (val, problemId) => {
    console.log("problemId:", problemId);
    // Assemble data
    let selectedProblem;
    const solution = this.getSolution(val);
    this.setState({ newSolutionArray: solution });
    const data = { ...this.state.userObject };
    const addedProblems = { ...this.state.addedProblems };
    let index = this.getProblemArraysIndex(problemId);
    let key = this.state.key;
    if (problemId) {
      console.log("problemId:", problemId);
      selectedProblem = addedProblems[0].filter(e => {
        return e.id === problemId;
      });
      console.log("selectedProblem:", selectedProblem[0]);
    }
    selectedProblem[0].solution.push(solution);
    data.problemArray.map(obj => {
      if (key === Object.keys(obj).toString()) {
        obj[key] = addedProblems[0];
      }
    });
    this.setState({ data: data });
  };

  saveSolutions = () => {
    if (this.props) {
      this.props.firebase.auth.currentUser.getIdToken(true).then(idToken => {
        axios
          .put(`/api/circles/${this.props.match.params.id}`, this.state.data, {
            headers: { Authorization: `Bearer ${idToken}` }
          })
          .then(() =>
            this.props.history.push(`/circles/${this.props.match.params.id}`)
          );
      });
      this.props.closeHandler(null);
    }
  };

  // Handle remove
  handleRemove = id => {
    // Filter all todos except the one to be removed
    const remainder = this.state.newSolutionArray.filter(todo => {
      if (todo.id !== id) return todo;
    });
    // Update state with filter
    // axios.delete(this.apiUrl + "/" + id).then(res => {
    this.setState({ newSolutionArray: remainder });
    // });
  };

  cancelSolution = () => {
    this.props.closeHandler(null);
    this.resetAll();
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

  resetAll = () => {
    this.setState({ inputValue: "" });
    this.setState({ problem: "" });
    this.setState({ solutionArray: [] });
    this.setState({ solutionObject: {} });
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
          <Title todoCount={this.state.newSolutionArray.length} />
          <TodoForm
            addedProblems={this.state.addedProblems}
            addSolution={this.addSolution}
            name={this.state.key}
          />
          <TodoList
            todos={this.state.newSolutionArray}
            remove={this.handleRemove}
            addedProblems={this.state.addedProblems}
          />
        </div>
        <DialogActions>
          <Button onClick={this.cancelSolution} color="primary">
            Cancel
          </Button>
          <Button
            onClick={this.saveSolutions}
            disabled={this.state.newSolutionArray.length === 0}
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
