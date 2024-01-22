const initialState = {
  userContent: "",
  gptResponse: "",
  dialogContent: [],
  needToHandleResponse: false,
  modelVersion: "mistral",
  shouldClearDiscussion: false,
  tempInputValue: 0,
  tempValue: 0,
  tokenValue: 1000,
  maxTokens: 4096,
  promptCategory: "",
  promptContent: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_CONTENT":
      return { ...state, userContent: action.payload };
    case "SET_MODEL_RESPONSE":
      return { ...state, gptResponse: action.payload };
    case "SET_DIALOG_CONTENT":
      return { ...state, dialogContent: action.payload };
    case "HANDLE_MODEL_RESPONSE":
      return { ...state, needToHandleResponse: action.payload };
    case "SET_MODEL_VERSION":
      return { ...state, modelVersion: action.payload };
    case "CLEAR_DISCUSSION":
      action.payload ? state.dialogContent = [] : null;
      return { ...state, shouldClearDiscussion: action.payload  };
    case "TEMP_INPUT_VALUE":
      return { ...state, tempInputValue: action.payload };
    case "TEMP_VALUE":
      return { ...state, tempValue: action.payload };
    case "TOKEN_VALUE":
      return { ...state, tokenValue: action.payload };
    case "MAX_TOKENS":
      return { ...state, maxTokens: action.payload };
    case "SET_PROMPT_CATGEGORY":
      return { ...state, promptCategory: action.payload };
    case "SET_PROMPT_CONTENT":
      return { ...state, promptContent: action.payload };

    default:
      return state;
  }
};

export default reducer;
