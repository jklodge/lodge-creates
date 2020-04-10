import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../Common/Firebase";
import { connect } from "react-redux";
import { withQuestionAuthorization } from "../Session";
import "./ProblemsSolutions.scss";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProblemModal from "./ProblemModal";
import SolutionModal from "./SolutionModal";
import axios from "axios";
let choiceTable;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const getListStyle = isDraggingOver => ({});
class ProblemsSolutions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: [],
      loading: false,
      orderedSegments: [],
      problemObjects: {},
      problems: 0,
      solutions: 0,
      problemModalOpen: false,
      solutionModalOpen: false,
      problemName: "",
      problemIndex: 0,
      data: {},
      orderedObject: {},
      solutionsExist: 0
    };
  }

  updateProblemObjects = variable => {
    this.setState({ problemObjects: variable });
    console.log("variable", variable);
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const orderedSegments = reorder(
      this.state.orderedSegments,
      result.source.index,
      result.destination.index
    );

    this.setState({
      orderedSegments
    });
  };

  // updateOrder = () => {
  //   if (this.state.orderedObject) {
  //     const data = { ...this.state.data };
  //     data.orderedObject = this.state.orderedSegments;
  //     this.props.firebase.auth.currentUser.getIdToken(true).then(idToken => {
  //       axios
  //         .put(`/api/circles/${this.props.match.params.id}`, data, {
  //           headers: { Authorization: `Bearer ${idToken}` }
  //         })
  //         .then(() =>
  //           this.props.history.push(`/circles/${this.props.match.params.id}`)
  //         );
  //     });
  //   }
  // };

  checkIfSolutionsExist = () => {
    var count = 0;
    if (this.state.data.problemArray) {
      Object.values(
        this.state.data.problemArray.map(e => {
          Object.values(e).map(j => {
            if (j.length > 0) {
              j.map(a => {
                if (a.solution.length > 0) {
                  count++;
                  console.log(count);
                  this.setState({ solutionsExist: count });
                }
              });
            }
          });
        })
      );
    }
  };

  handleProblemModalOpen = e => {
    this.setState({ problemModalOpen: true });
    this.setState({ problemName: e.target.id });
  };

  handleProblemModalClose = problemObject => {
    if (problemObject === null) {
      this.setState({ problemModalOpen: false });
    }
  };

  handleSolutionModalOpen = (index, item) => {
    this.setState({ solutionModalOpen: true });
    this.setState({ problemName: item });
    this.setState({ problemIndex: index });
  };

  handleSolutionModalClose = problemObject => {
    if (problemObject === null) {
      this.setState({ solutionModalOpen: false });
    }
  };

  componentDidMount() {
    axios
      .get(`/api/circles/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
      .then(res => console.log(this.state.data))
      .then(() => {
        if (this.state.data.choiceObject) {
          choiceTable = Object.entries(this.state.data.choiceObject);
          if (choiceTable[2][1]) {
            this.setState({ orderedSegments: choiceTable[2][1] });
          } else if (choiceTable[1][1]) {
            this.setState({ orderedSegments: choiceTable[1][1] });
          }
        }
      })
      .then(() => this.checkIfSolutionsExist());
  }

  render() {
    if (this.state.problemModalOpen) {
      return (
        <ProblemModal
          style={{
            backgroundColor: "#ec8c6a",
            height: "100% !important",
            margin: "0",
            width: "100%"
          }}
          open={this.state.problemModalOpen}
          problemName={this.state.problemName}
          problemIndex={this.state.problemIndex}
          closeHandler={this.handleProblemModalClose}
          openHandler={this.handleProblemModalOpen}
          updateProblemObjects={this.updateProblemObjects}
        />
      );
    }
    if (this.state.solutionModalOpen) {
      return (
        <SolutionModal
          style={{
            backgroundColor: "#ec8c6a",
            height: "100% !important",
            margin: "0",
            width: "100%"
          }}
          open={this.state.solutionModalOpen}
          problemName={this.state.problemName}
          problemIndex={this.state.problemIndex}
          closeHandler={this.handleSolutionModalClose}
          openHandler={this.handleSolutionmModalOpen}
          problemObjects={this.state.problemObjects}
        />
      );
    }

    return (
      <div className="ProblemsSolutions">
        <p>
          To improve your Circle Of Life, you should focus on improving your bad
          segments.
        </p>
        <br></br>
        <ul>
          <li>Step 1. Re-order bad segments into priority order.</li>
          <li>Step 2. Define specific problems for bad segments.</li>
          <li>Step 3. Create solutions for the problems identified.</li>
        </ul>
        <h3>Bad segments</h3>
        <div className="draggableList">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                  <List
                    className="segments"
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.orderedSegments
                      ? this.state.orderedSegments.map((item, index) => (
                          <Draggable
                            key={item}
                            draggableId={item}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <ListItem
                                ContainerComponent="li"
                                ContainerProps={{ ref: provided.innerRef }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <ListItemText primary={item} />
                                <ListItemSecondaryAction>
                                  <div className="selectContainer">
                                    <div className="selector">
                                      {this.state.data.problemArray[index] ? (
                                        <div
                                          onClick={this.handleProblemModalOpen}
                                          className="numberCircle"
                                          id={item}
                                          key={index}
                                          name={index}
                                        >
                                          {
                                            Object.values(
                                              this.state.data.problemArray[
                                                index
                                              ]
                                            )[0].length
                                          }
                                        </div>
                                      ) : (
                                        <div
                                          onClick={this.handleProblemModalOpen}
                                          value={item}
                                          id={item}
                                          className="plusCircle"
                                        >
                                          +
                                        </div>
                                      )}
                                      <p>Problems</p>
                                    </div>
                                    <div className="selector">
                                      {this.state.solutionsExist ? (
                                        <div className="circleNumbers">
                                          {this.state.solutionsExist}
                                        </div>
                                      ) : (
                                        <div
                                          onClick={() =>
                                            this.handleSolutionModalOpen(
                                              index,
                                              item
                                            )
                                          }
                                          className="plusCircle"
                                          id={item}
                                          index={index}
                                        >
                                          +
                                        </div>
                                      )}
                                      <p>Solutions</p>
                                    </div>
                                  </div>
                                </ListItemSecondaryAction>
                              </ListItem>
                            )}
                          </Draggable>
                        ))
                      : null}
                    {provided.placeholder}
                  </List>
                </RootRef>
              )}
            </Droppable>
          </DragDropContext>
        </div>
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
)(ProblemsSolutions);
