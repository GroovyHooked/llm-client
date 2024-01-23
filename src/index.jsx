import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "./components/sidebar/sidebar.jsx";
import { DialogWindow } from "./components/main_window/dialog_window.jsx";
import { InputField } from "./components/input_field/Input_field.jsx";
import { processDataWithBackend } from "./utils/communication.js";
import {
  setModelOutput,
  setConversationHistory,
  askModelToHandleData,
} from "./state_management/actions.js";


export const ChatInterface = () => {

  const dispatch = useDispatch();

  const conversationHistory = useSelector((state) => state.conversationHistory);
  const isModelHandlingData = useSelector(
    (state) => state.isModelHandlingData
  );
  const modelVersion = useSelector((state) => state.modelVersion);
  const tempValue = useSelector((state) => state.tempValue);
  const tokenValue = useSelector((state) => state.tokenValue);

  async function handleModelResponse(text, model, temp, token){
    try {
      const response = await processDataWithBackend(text, model, temp, token)
      dispatch(askModelToHandleData(false))
      dispatch(setModelOutput(response))
      dispatch(setConversationHistory(text, "assistant", response))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (conversationHistory.length > 0 && isModelHandlingData) {
      handleModelResponse(conversationHistory, modelVersion, tempValue, tokenValue)
    }
  }, [conversationHistory, isModelHandlingData]);

  return (
    <>
      <Sidebar />
      <DialogWindow />
      <InputField />
    </>
  );
};

