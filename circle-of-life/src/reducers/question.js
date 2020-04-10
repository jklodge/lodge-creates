const INITIAL_STATE = {
  questions: null
};
const applySetQuestions = (state, action) => ({
  ...state,
  questions: action.questions
});

function questionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "QUESTIONS_SET": {
      return applySetQuestions(state, action);
    }

    default:
      return state;
  }
}
export default questionReducer;
