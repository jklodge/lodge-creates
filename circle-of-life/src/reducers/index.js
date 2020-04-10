import { combineReducers } from "redux";
import sessionReducer from "./session";
import userReducer from "./user";
import questionReducer from "./question";
import messageReducer from "./message";
const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  questionState: questionReducer,
  messageState: messageReducer
});
export default rootReducer;
