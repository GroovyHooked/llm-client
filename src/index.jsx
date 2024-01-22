import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "./components/sidebar/sidebar.jsx";
import { DialogWindow } from "./components/main_window/dialog_window.jsx";
import { InputField } from "./components/input_field/Input_field.jsx";
import { sendToOpenAiApi, sendToLocalModel } from "./utils/communication.js";
import {
  setModelResponse,
  setDialogContent,
  handleModelResponse,
} from "./state_management/actions.js";


export const ChatInterface = () => {

  const dispatch = useDispatch();

  const dialogContent = useSelector((state) => state.dialogContent);
  const needToHandleResponse = useSelector(
    (state) => state.needToHandleResponse
  );
  const modelVersion = useSelector((state) => state.modelVersion);
  const tempValue = useSelector((state) => state.tempValue);
  const tokenValue = useSelector((state) => state.tokenValue);

  async function handleLocalModelResponse(modelName) {
    try {
      const response = await sendToLocalModel(dialogContent, modelName)
      dispatch(handleModelResponse(false))
      dispatch(setModelResponse(response))
      dispatch(setDialogContent(dialogContent, "assistant", response))
    } catch (error) {
      console.error(error)
    }
  }

  const handleGPTresponse = async (text) => {
    try {
      const response = await sendToOpenAiApi(
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
    "llama": () => handleLocalModelResponse("llama"),
    "mistral": () => handleLocalModelResponse("mistral"),
  };

  useEffect(() => {
    if (dialogContent.length > 0 && needToHandleResponse) {
      const handler = modelHandlers[modelVersion];
      if (handler) {
        handler(dialogContent);
      }
    }
  }, [dialogContent, needToHandleResponse, modelVersion]);

  return (
    <>
      <Sidebar />
      <DialogWindow />
      <InputField />
    </>
  );
};

