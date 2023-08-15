import { useState, useEffect } from "react";
import "./WebPage.css";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { DialogWindow } from "./components/main_window/DialogWindow.jsx";
import { InputField } from "./components/InputField/InputField.jsx";
import { sendMessage } from "./utils/communication.js";
import { prompts } from "./utils/prompts.js";

const initVersion = "gpt-3.5-turbo";

export const WebPage = () => {
  const [userContent, userContentSetter] = useState("");
  const [gptResponse, gptResponseSetter] = useState("");
  const [dialogContent, dialogContentSetter] = useState([]);
  const [needToHandleResponse, needToHandleResponseSetter] = useState(false);
  const [modelVersion, modelVersionSetter] = useState(initVersion);
  const [shoudlClearDiscussion, shoudlClearDiscussionSetter] = useState(false);
  const [tempInputValue, tempInputValueSetter] = useState(0);
  const [tempValue, tempValueSetter] = useState(0);
  const [tokenValue, tokenValueSetter] = useState(1000)
  const [maxTokens, maxTokensSetter] = useState(4096)
  const [promptCategory, setPromptCategory] = useState('');
  const [promptContent, promptContentSetter] = useState('')

  const retreivePromptContent = (e) => {
    prompts[promptCategory].forEach(element => {
      if(e.target.value === element.title){
        promptContentSetter(element.content);
      }
    });
  };

  useEffect(() => {
    tempValueSetter(Math.round(tempInputValue * 0.01 * 100) / 100);
  }, [tempInputValue])

  useEffect(() => {
    if (dialogContent.length > 0 && needToHandleResponse) {
      handleGPTresponse(dialogContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogContent, needToHandleResponse]);

  const handleGPTresponse = async (text) => {
    try {
      const response = await sendMessage(text, modelVersion, tempValue, tokenValue);
      needToHandleResponseSetter(false);
      gptResponseSetter(response);
      dialogContentSetter((prevContent) => [
        ...prevContent,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputEnter = (text) => {
    dialogContentSetter((prevContent) => [
      ...prevContent,
      { role: "user", content: text },
    ]);
    userContentSetter(text);
    needToHandleResponseSetter(true);
  };

  const changeModel = (model) => {
    if (model.target.className === "gpt3-model") {
      modelVersionSetter("gpt-3.5-turbo");
      maxTokensSetter(4096)
    } else if (model.target.className === "gpt4-model") {
      modelVersionSetter("gpt-4");
      maxTokensSetter(8192)
    }
  };

  const clearDialog = () => {
    shoudlClearDiscussionSetter(true);
    dialogContentSetter([]);
    setTimeout(() => {
      shoudlClearDiscussionSetter(false);
    }, 100);
  };

  return (
    <>
      <Sidebar
        changeModel={changeModel}
        clearDialog={clearDialog}
        tempValue={tempValue}
        tempInputValue={tempInputValue}
        tempInputValueSetter={tempInputValueSetter}
        tokenValue={tokenValue}
        tokenValueSetter={tokenValueSetter}
        maxTokens={maxTokens}
        promptCategory={promptCategory}
        setPromptCategory={setPromptCategory}
        retreivePromptContent={retreivePromptContent}
      />
      <DialogWindow
        userContent={userContent}
        gptContent={gptResponse}
        modelVersion={modelVersion}
        shoudlClearDiscussion={shoudlClearDiscussion}
      />
      <InputField 
        onEnter={handleInputEnter} 
        promptContent={promptContent}
        />
    </>
  );
};
