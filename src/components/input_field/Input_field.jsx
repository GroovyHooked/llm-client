import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInput,
  setConversationHistory,
  askModelToHandleData,
} from "../../state_management/actions";
import { Mediaqueries } from "../../utils/mediaQueries";
import sendIcon from "../../assets/send.png";
import "./input_field.css";

export const InputField = () => {
  const dispatch = useDispatch();
  const promptContent = useSelector((state) => state.promptContent);
  const conversationHistory = useSelector((state) => state.conversationHistory);

  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);
  const divRef = useRef(null);
  const screenSize = Mediaqueries();

  const handleInputOnEnter = (text) => {
    dispatch(setConversationHistory(conversationHistory, "user", text));
    dispatch(setUserInput(text));
    dispatch(askModelToHandleData(true));
  };

  const handleInputChange = (event) => {
    const { current: textArea } = textareaRef;
    const { current: inputDiv } = divRef;
    textArea.style.height = `${Math.min(textArea.scrollHeight, 120)}px`;
    setInputText(event.target.value);
    textArea.style.height = textArea.value ? textArea.style.height : `20px`;
    inputDiv.style.height = textArea.style.height > `75px` ? `${Math.min(textArea.scrollHeight + 40, 150)}px` : `85px`;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.shiftKey) {
        setInputText((oldText) => `${oldText}\r\n`);
      } else {
        resetInputField();
      }
    }
  };

  const handleSendClick = () => {
    resetInputField();
  }

  const resetInputField = () => {
    const { current: textArea } = textareaRef;
    const { current: inputDiv } = divRef;
    handleInputOnEnter(inputText);
    setInputText("");
    textArea.style.height = `20px`;
    inputDiv.style.height = `85px`;
  }

  const insertNewlines = (str, wordsPerLine = 6) => {
    const words = str.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines.join("\n");
  };

  useEffect(() => {
    const { current: textArea } = textareaRef;
    const { current: inputDiv } = divRef;
    if (promptContent) {
      setInputText(insertNewlines(promptContent, 12));
      textArea.style.height = `120px`;
      inputDiv.style.height = `138px`;
    }
  }, [promptContent]);

  return (
    <div
      ref={divRef}
      className={
        screenSize.isLarge
          ? "input-field input-field-large"
          : "input-field input-field-small"
      }
    >
      <div className="textarea-wrapper">
        <textarea
          type="text"
          ref={textareaRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Send a message"
        />
      </div>
      <button className="btn btn-send" onClick={handleSendClick}>
        <img src={sendIcon} className="send-icon" alt="send" />
      </button>
    </div>
  );
};