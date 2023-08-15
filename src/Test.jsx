import {  useEffect, useCallback, useReducer } from 'react';
import "./WebPage.css";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { DialogWindow } from "./components/main_window/DialogWindow.jsx";
import { InputField } from "./components/InputField/InputField.jsx";
import { sendMessage } from "./utils/communication.js";
import { prompts } from "./utils/prompts.js";

const MODEL_NAMES = {
  GPT3: 'gpt-3.5-turbo',
  GPT4: 'gpt-4',
};

const TOKEN_VALUES = {
  GPT3: 4096,
  GPT4: 8192,
};

const initialState = {
  userContent: "",
  gptResponse: "",
  dialogContent: [],
  needToHandleResponse: false,
  modelVersion: MODEL_NAMES.GPT3,
  shouldClearDiscussion: false,
  tempInputValue: 0,
  tempValue: 0,
  tokenValue: 1000,
  maxTokens: 4096,
  promptCategory: '',
  promptContent: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_CONTENT':
      return { ...state, userContent: action.payload };
    // Add other cases for other actions
    default:
      return state;
  }
}

export const WebPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const retrievePromptContent = useCallback((e) => {
    const promptContent = prompts[state.promptCategory].find(element => e.target.value === element.title)?.content;
    dispatch({ type: 'SET_PROMPT_CONTENT', payload: promptContent });
  }, [state.promptCategory]);

  useEffect(() => {
    dispatch({ type: 'SET_TEMP_VALUE', payload: Math.round(state.tempInputValue * 0.01 * 100) / 100 });
  }, [state.tempInputValue]);

  useEffect(() => {
    if (state.dialogContent.length > 0 && state.needToHandleResponse) {
      handleGPTresponse(state.dialogContent);
    }
  }, [state.dialogContent, state.needToHandleResponse]);

  const handleGPTresponse = useCallback(async (text) => {
    try {
      const response = await sendMessage(text, state.modelVersion, state.tempValue, state.tokenValue);
      dispatch({ type: 'SET_NEED_TO_HANDLE_RESPONSE', payload: false });
      dispatch({ type: 'SET_GPT_RESPONSE', payload: response });
      dispatch({ type: 'SET_DIALOG_CONTENT', payload: [...state.dialogContent, { role: "assistant", content: response }] });
    } catch (error) {
      console.error(error);
      // Dispatch an action to set an error state here
    }
  }, [state.modelVersion, state.tempValue, state.tokenValue, state.dialogContent]);

  const handleInputEnter = useCallback((text) => {
    dispatch({ type: 'SET_DIALOG_CONTENT', payload: [...state.dialogContent, { role: "user", content: text }] });
    dispatch({ type: 'SET_USER_CONTENT', payload: text });
    dispatch({ type: 'SET_NEED_TO_HANDLE_RESPONSE', payload: true });
  }, [state.dialogContent]);

  const changeModel = useCallback((model) => {
    const modelVersion = model.target.className === "gpt3-model" ? MODEL_NAMES.GPT3 : MODEL_NAMES.GPT4;
    const maxTokens = model.target.className === "gpt3-model" ? TOKEN_VALUES.GPT3 : TOKEN_VALUES.GPT4;
    dispatch({ type: 'SET_MODEL_VERSION', payload: modelVersion });
    dispatch({ type: 'SET_MAX_TOKENS', payload: maxTokens });
  }, []);

  const clearDialog = useCallback(() => {
    dispatch({ type: 'SET_SHOULD_CLEAR_DISCUSSION', payload: true });
    dispatch({ type: 'SET_DIALOG_CONTENT', payload: [] });
    setTimeout(() => {
      dispatch({ type: 'SET_SHOULD_CLEAR_DISCUSSION', payload: false });
    }, 100);
  }, []);

  return (
    <>
      <Sidebar
        changeModel={changeModel}
        clearDialog={clearDialog}
        tempValue={state.tempValue}
        tempInputValue={state.tempInputValue}
        tempInputValueSetter={(value) => dispatch({ type: 'SET_TEMP_INPUT_VALUE', payload: value })}
        tokenValue={state.tokenValue}
        tokenValueSetter={(value) => dispatch({ type: 'SET_TOKEN_VALUE', payload: value })}
        maxTokens={state.maxTokens}
        promptCategory={state.promptCategory}
        setPromptCategory={(value) => dispatch({ type: 'SET_PROMPT_CATEGORY', payload: value })}
        retrievePromptContent={retrievePromptContent}
      />
      <DialogWindow
        userContent={state.userContent}
        gptContent={state.gptResponse}
        modelVersion={state.modelVersion}
        shouldClearDiscussion={state.shouldClearDiscussion}
      />
      <InputField 
        onEnter={handleInputEnter} 
        promptContent={state.promptContent}
      />
    </>
  )}