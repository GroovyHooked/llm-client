import {
  SET_USER_INPUT,
  SET_MODEL_OUPUT,
  SET_DIALOG_CONTENT,
  HANDLE_MODEL_STATUS,
  SET_MODEL_VERSION,
  CLEAR_DISCUSSION,
  TEMP_INPUT_VALUE,
  TEMP_VALUE,
  TOKEN_VALUE,
  MAX_TOKENS,
  SET_PROMPT_CATGEGORY,
  SET_PROMPT_CONTENT,
} from './action_types.js';

const initialState = {
  lastInputFromUser: "",
  lastOutputFromModel: "",
  conversationHistory: [],
  isModelHandlingData: false,
  modelVersion: "mistral",
  shouldCleaChatInterface: false,
  tempInputValue: 0,
  tempValue: 0,
  tokenValue: 1000,
  maxTokens: 4096,
  promptCategory: "",
  promptContent: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INPUT:
      return { ...state, lastInputFromUser: action.payload };
    case SET_MODEL_OUPUT:
      return { ...state, lastOutputFromModel: action.payload };
    case SET_DIALOG_CONTENT:
      return { ...state, conversationHistory: action.payload };
    case HANDLE_MODEL_STATUS:
      return { ...state, isModelHandlingData: action.payload };
    case SET_MODEL_VERSION:
      return { ...state, modelVersion: action.payload };
    case CLEAR_DISCUSSION:
      action.payload ? state.conversationHistory = [] : null;
      return { ...state, shouldCleaChatInterface: action.payload };
    case TEMP_INPUT_VALUE:
      return { ...state, tempInputValue: action.payload };
    case TEMP_VALUE:
      return { ...state, tempValue: action.payload };
    case TOKEN_VALUE:
      return { ...state, tokenValue: action.payload };
    case MAX_TOKENS:
      return { ...state, maxTokens: action.payload };
    case SET_PROMPT_CATGEGORY:
      return { ...state, promptCategory: action.payload };
    case SET_PROMPT_CONTENT:
      return { ...state, promptContent: action.payload };

    default:
      return state;
  }
};

export default reducer;
