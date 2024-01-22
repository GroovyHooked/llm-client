import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./WebPage.css";
import { Sidebar } from "./components/Sidebar/sidebar.jsx";
import { DialogWindow } from "./components/main_window/dialog_window.jsx";
import { InputField } from "./components/InputField/Input_field.jsx";
import { sendMessage, communicateWithLlama, communicateWithMistral } from "./utils/communication.js";
import { prompts } from "./utils/prompts.js";
import {
  setUserContent,
  setModelResponse,
  setDialogContent,
  handleModelResponse,
  setModelVersion,
  clearDiscussion,
  setTempInputValue,
  setTempValue,
  setTokenValue,
  setMaxTokens,
  setPromptCategory,
  setPromptContent,
} from "./state_management/action_creator.js";


export const WebPage = () => {
  const dispatch = useDispatch();

  const userContent = useSelector((state) => state.userContent);
  const gptResponse = useSelector((state) => state.gptResponse);
  const dialogContent = useSelector((state) => state.dialogContent);
  const needToHandleResponse = useSelector(
    (state) => state.needToHandleResponse
  );
  const modelVersion = useSelector((state) => state.modelVersion);
  const shouldClearDiscussion = useSelector(
    (state) => state.shouldClearDiscussion
  );
  const tempInputValue = useSelector((state) => state.tempInputValue);
  const tempValue = useSelector((state) => state.tempValue);
  const tokenValue = useSelector((state) => state.tokenValue);
  const maxTokens = useSelector((state) => state.maxTokens);
  const promptCategory = useSelector((state) => state.promptCategory);
  const promptContent = useSelector((state) => state.promptContent);


  const retreivePromptContent = (e) => {
    prompts[promptCategory].forEach((element) => {
      if (e.target.value === element.title) {
        dispatch(setPromptContent(element.content));
      }
    });
  };

  const handleInputEnter = (text) => {
    dispatch(dispatch(setDialogContent(dialogContent, "user", text)))
    dispatch(setUserContent(text))
    dispatch(handleModelResponse(true))
  };

  const changeModel = (model) => {
    if (model.target.className === "gpt3-model") {
      dispatch(setModelVersion("gpt-3.5-turbo"))
      dispatch(setMaxTokens(4096))
    } else if (model.target.className === "gpt4-model") {
      dispatch(setModelVersion("gpt-4"))
      dispatch(setMaxTokens(8192))
    } else if (model.target.className === "llama"){
      dispatch(setModelVersion("llama"))
      dispatch(setMaxTokens(508))
    } else if (model.target.className === "mistral"){
      dispatch(setModelVersion("mistral"))
      dispatch(setMaxTokens(508))
    }
  };

  const clearDialog = () => {
    dispatch(clearDiscussion(true))
    setTimeout(() => {
      dispatch(clearDiscussion(false))
    }, 1000);
  };

  async function handleLlamaResponse(){
    try {
      const response = await communicateWithLlama(dialogContent)
      dispatch(handleModelResponse(false))
      dispatch(setModelResponse(response))
      dispatch(setDialogContent(dialogContent, "assistant", response))
    } catch(erro){
      console.error(error)
    }
  }

  async function handleMistralResponse(){
    try {
      const response = await communicateWithMistral(dialogContent)
      dispatch(handleModelResponse(false));
      dispatch(setModelResponse(response));
      dispatch(setDialogContent(dialogContent, "assistant", response));
    } catch(error){
      console.error(error)
    }
  }

  const handleGPTresponse = async (text) => {
    try {
      const response = await sendMessage(
        text,
        modelVersion,
        tempValue,
        tokenValue
      );
      dispatch(handleModelResponse(false));
      dispatch(setModelResponse(response));
      dispatch(dispatch(setDialogContent(dialogContent, "assistant", response)))
    } catch (error) {
      console.error(error);
    }
  };

  const modelHandlers = {
    "gpt-3.5-turbo": handleGPTresponse,
    "gpt-4": handleGPTresponse,
    "llama": handleLlamaResponse,
    "mistral": handleMistralResponse
  };

  useEffect(() => {
    if (dialogContent.length > 0 && needToHandleResponse) {
      const handler = modelHandlers[modelVersion];
  
      if (handler) {
        handler(dialogContent);
      }
    }
  }, [dialogContent, needToHandleResponse, modelVersion]);

  useEffect(() => {
    dispatch(setTempValue(Math.round(tempInputValue * 0.01 * 100) / 100))
  }, [tempInputValue]);

  return (
    <>
      <Sidebar
        changeModel={changeModel}
        clearDialog={clearDialog}
        tempValue={tempValue}
        tempInputValue={tempInputValue}
        tempInputValueSetter={(value) => {
          dispatch(setTempInputValue(value));
        }}
        tokenValue={tokenValue}
        tokenValueSetter={(value) => {
          dispatch(setTokenValue(value));
        }}
        maxTokens={maxTokens}
        promptCategory={promptCategory}
        setPromptCategory={(value) => {
          dispatch(setPromptCategory(value));
        }}
        retreivePromptContent={retreivePromptContent}
      />
      <DialogWindow
        userContent={userContent}
        gptContent={gptResponse}
        modelVersion={modelVersion}
        shouldClearDiscussion={shouldClearDiscussion}
        needToHandleResponse={needToHandleResponse}
      />
      <InputField onEnter={handleInputEnter} promptContent={promptContent} />
    </>
  );
};

