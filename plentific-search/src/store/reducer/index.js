export const initialState = {
  loading: true,
  pros: [],
  postcode: "",
  category: 0,
  pagination: 0,
  errorMessage: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        postcode: action.postcode
      };
    case "CATEGORY_REQUEST":
      return {
        ...state,
        category: action.category
      };
      case "PAGINATION_SET":
      return {
        ...state,
        pagination: action.pagination
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
