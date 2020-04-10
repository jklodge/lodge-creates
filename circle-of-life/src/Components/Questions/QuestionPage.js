import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import LinearProgress from "@material-ui/core/LinearProgress";
import Modal from "@material-ui/core/Modal";

import { withFirebase } from "../../Common/Firebase";
import { withQuestionAuthorization } from "../Session";

import QuestionButtons from "./QuestionButtons";
import * as ROUTES from "../../Constants/routes";
import "./QuestionPage.scss";
import { questionData } from "../Home/question-data";
import axios from "axios";

const NextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

const HelpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className="helpIcon"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className="closeIcon"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

class QuestionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      open: false,
      questionTitle: "How do you feel about you",
      questionName: "",
      questionHelper: "",
      questionNumber: 0,
      optionSelected: false,
      buttonValue: "",
      selectedValue: "",
      circleObject: {},
      choiceObject: { good: [], neutral: [], bad: [] },
      good: [],
      bad: [],
      neutral: [],
      completed: 8.3,
      data: []
    };
  }
  componentDidMount() {
    console.log("ques");
    console.log(this.props);

    if (!this.state.questions) {
      this.setState({ loading: true });
    }
    axios.get("/api/circles/").then(res => {
      this.setState({ data: res.data });
    });

    this.getPageContent();
    this.setState({ loading: false });
  }

  // this.props.history.push({
  //   pathname: `/results/${this.state.data._id}`,
  //   state: { data: this.state.data }
  // })

  data = () => {
    return {
      response: "No data yet..."
    };
  };

  componentWillUnmount() {}

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getPageContent = () => {
    if (this.state.questionNumber === 11) {
      this.setState({ buttonValue: "Submit" });
    }
    if (this.state.questionNumber <= 11) {
      this.setState({
        questionTitle: "How do you feel about your"
      });
      this.setState({
        questionName: questionData[this.state.questionNumber]
      });
      this.setState({
        questionHelper: questionData[this.state.questionNumber]
      });
    }
  };

  chooseOption = e => {
    e.persist();
    this.setState({ optionSelected: true });
    this.setState({ selectedValue: e.target.value });
  };

  nextPage = () => {
    async function getToken(firebase) {
      const token = await firebase.auth.currentUser.getIdToken();
      return token;
    }
    if (this.state.selectedValue) {
      if (this.state.questionNumber < 12) {
        var circleObject = { ...this.state.circleObject };
        let selectedArray = [
          `${this.state.questionName}`,
          `${this.state.selectedValue}`
        ];
        circleObject[this.state.questionNumber] = selectedArray;
        this.setState({ circleObject });
        this.setState({ selectedValue: "" });
      }
      if (this.state.questionNumber === 11) {
        setTimeout(() => {
          this.submitCircle();
        }, 500);
      } else if (this.state.questionNumber < 11) {
        this.setState({ questionNumber: this.state.questionNumber + 1 });
        setTimeout(() => {
          this.getPageContent();
        }, 100);
      } else {
        return false;
      }
      this.setState({ optionSelected: false });
    }
  };

  submitCircle = () => {
    if (this.props.authUser) {
      // if (this.props.authUser) {
      let good = this.state.good;
      let neutral = this.state.neutral;
      let bad = this.state.bad;
      var circleObject = { ...this.state.circleObject };
      var choiceObject = { ...this.state.choiceObject };
      Object.values(circleObject).map(e => {
        switch (e[1]) {
          case "Good":
            if (!good.includes(e[0])) {
              good.splice(good.length, 0, e[0]);
            }
            break;
          case "Neutral":
            if (!neutral.includes(e[0])) {
              neutral.splice(neutral.length, 0, e[0]);
            }
            break;
          case "Bad":
            if (!bad.includes(e[0])) {
              bad.splice(bad.length, 0, e[0]);
            }
            break;
          default:
            break;
        }
        choiceObject.good = good;
        choiceObject.neutral = neutral;
        choiceObject.bad = bad;
        this.setState({ choiceObject: choiceObject });
        this.setState({ loading: true });
        return choiceObject;
      });

      const data = {
        user: this.props.authUser.uid,
        circleObject: this.state.circleObject,
        numberOfCircles: this.state.data.length + 1,
        choiceObject: choiceObject,
        _id: `circle_${this.state.data.length + 1}`,
        timeStamp: Date.now()
      };
      if (this.props.firebase.auth.currentUser) {
        this.props.firebase.auth.currentUser.getIdToken(true).then(idToken => {
          axios
            .post("/api/circles", data, {
              headers: { Authorization: `Bearer ${idToken}` }
            })
            .then(() =>
              this.props.history.push(`/circles/${data._id}`, data._id)
            )
            .catch(err => console.error(err));
        });
      }
    }
  };
  goBack = () => {
    if (this.state.questionNumber > 1) {
      this.setState({ questionNumber: this.state.questionNumber - 1 });
      setTimeout(() => {
        this.setState({ selectedValue: "" });
        this.getPageContent();
      }, 100);
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="QuestionPage">
        <div className="progressBar">
          <h3>Question {this.state.questionNumber + 1}</h3>
          <LinearProgress
            variant="determinate"
            value={this.state.completed * (this.state.questionNumber + 1)}
            color="primary"
          />
        </div>
        {loading && <div>Are you sitting in a quiet place...</div>}
        <div className="questionContainer">
          <p>{this.state.questionTitle}</p>
          <h1>{this.state.questionName}?</h1>
          <div onClick={this.handleOpen} className="help">
            <HelpIcon />
          </div>
        </div>
        <QuestionButtons chooseOption={this.chooseOption} />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className="Modal"
        >
          <div className="modalTextBox">
            <HelpIcon />
            <div onClick={this.handleClose} className="closeIcon">
              <CloseIcon />
            </div>
            <p id="simple-modal-description">{this.state.questionHelper}</p>
          </div>
        </Modal>
        {this.state.questionNumber === 11 ? (
          <button
            disabled={!this.state.selectedValue}
            onClick={this.nextPage}
            className="submitButton"
            style={{
              background:
                this.state.selectedValue !== ""
                  ? "#b666d2"
                  : "rgba(182,102,210, 0.3)"
            }}
          >
            Are you ready to complete?
          </button>
        ) : (
          <div
            disabled={!this.state.selectedValue}
            onClick={this.nextPage}
            className="nextButtonContainer"
          >
            <NextIcon />
            <button
              style={{
                background:
                  this.state.selectedValue !== ""
                    ? "#b666d2"
                    : "rgba(182,102,210, 0.3)"
              }}
              className="nextButton"
            ></button>
          </div>
        )}
        {this.state.questionNumber >= 1 ? (
          <button
            disabled={this.state.questionNumber <= 1}
            className="backButton"
            onClick={this.goBack}
          >
            Back
          </button>
        ) : null}
      </div>
    );
  }
}
const condition = authUser => !!authUser;

const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser => dispatch({ type: "AUTH_USER_SET", authUser })
});

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withQuestionAuthorization(condition)
)(QuestionPage);
