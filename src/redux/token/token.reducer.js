const initialState = {
  accessToken: null,
};

export const TokenReducer = (state = initialState, action) => {
  return {
    ...state,
    accessToken: action.payload,
  };
};
