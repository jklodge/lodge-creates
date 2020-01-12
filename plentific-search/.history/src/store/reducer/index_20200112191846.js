export const initialState = {
  loading: true,
  pros: [],
  postcode: "",
  category: 0,
  errorMessage: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        postcode: action.searchValue
      };
    case "CATEGORY_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        postcode: action.searchValue
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
