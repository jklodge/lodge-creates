export const initialState = {
  loading: true,
  pros: [],
  errorMessage: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FIRST_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_PROS_SUCCESS":
      return {
        ...state,
        loading: false,
        pros: action.payload
      };
    case "SEARCH_PROS_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };

    default:
      return state;
  }
};
