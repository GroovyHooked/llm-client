import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./WebPage.css";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { DialogWindow } from "./components/main_window/DialogWindow.jsx";
import { InputField } from "./components/InputField/InputField.jsx";
import { sendMessage } from "./utils/communication.js";
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
} from "./state_management/action.js";

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

  const communicateWithLlama = async (dialogContent) => {
    console.log({dialogContent: dialogContent[dialogContent.length - 1].content});
    return await fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: dialogContent[dialogContent.length - 1].content,
      model: 'llama',
      temperature: 0,
      max_tokens: 300,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log({data})
      return data.stdout
    })
    .catch(error => console.error(error));
  
  }

  useEffect(() => {
    dispatch(setTempValue(Math.round(tempInputValue * 0.01 * 100) / 100));
  }, [tempInputValue]);

  useEffect(() => {
    if (dialogContent.length > 0 && needToHandleResponse) {
      if(modelVersion === "gpt-3.5-turbo" || modelVersion === "gpt-4"){
        handleGPTresponse(dialogContent);
      }
      if(modelVersion === 'llama'){
        //handleLlamaResponse(dialogContent)
        handleLlamaResponse()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogContent, needToHandleResponse]);

  async function handleLlamaResponse(){
    try {
      const response = await communicateWithLlama(dialogContent)
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
      dispatch(setDialogContent(dialogContent, "assistant", response));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputEnter = (text) => {
    dispatch(setDialogContent(dialogContent, "user", text));
    dispatch(setUserContent(text));
    dispatch(handleModelResponse(true));
  };

  const changeModel = (model) => {
    if (model.target.className === "gpt3-model") {
      dispatch(setModelVersion("gpt-3.5-turbo"));
      dispatch(setMaxTokens(4096));
    } else if (model.target.className === "gpt4-model") {
      dispatch(setModelVersion("gpt-4"));
      dispatch(setMaxTokens(8192));
    } else if (model.target.className === "llama"){
      dispatch(setModelVersion("llama"));
      dispatch(setMaxTokens(508));
    }
  };

  const clearDialog = () => {
    dispatch(clearDiscussion(true));
    dispatch(setDialogContent([]));
    setTimeout(() => {
      dispatch(clearDiscussion(false));
    }, 3000);
  };

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
      />
      <InputField onEnter={handleInputEnter} promptContent={promptContent} />
    </>
  );
};

