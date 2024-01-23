import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInput,
  setconversationHistory,
  setIsModelHandlingData,
} from "../../state_management/actions.js";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import sendIcon from "../../assets/send.png";
import "./input_field.css";

// eslint-disable-next-line react/prop-types
export const InputField = () => {
  const dispatch = useDispatch();

  const promptContent = useSelector((state) => state.promptContent);
  const conversationHistory = useSelector((state) => state.conversationHistory);

  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);
  const divRef = useRef(null);
  const screenSize = Mediaqueries();

  const handleInputOnEnter = (text) => {
    dispatch(dispatch(setconversationHistory(conversationHistory, "user", text)))
    dispatch(setUserInput(text))
    dispatch(setIsModelHandlingData(true))
  };

  const handleInputChange = (event) => {
    const textArea = textareaRef.current;
    const inputDiv = divRef.current;
    textArea.style.height = `${Math.min(textArea.scrollHeight, 120)}px`;
    setInputText(event.target.value);
    if (!textArea.value) textArea.style.height = `20px`;
    if (textArea.style.height > `75px`) {
      inputDiv.style.height = `${Math.min(textArea.scrollHeight + 40, 150)}px`;
    }
    if (!textArea.value) inputDiv.style.height = `85px`;
  };

  const handleKeyPress = (event) => {
    const textArea = textareaRef.current;
    const inputDiv = divRef.current;
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      setInputText((oldText) => `${oldText}\r\n`);
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleInputOnEnter(inputText);
      setInputText("");
      textArea.style.height = `20px`;
      inputDiv.style.height = `85px`;
    }
  };

  const handleSendClick = () => {
    const textArea = textareaRef.current;
    const inputDiv = divRef.current;
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
    const textArea = textareaRef.current;
    const inputDiv = divRef.current;
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
        ></textarea>
      </div>
      <button className="btn btn-send" onClick={handleSendClick}>
        <img src={sendIcon} className="send-icon"></img>
      </button>
    </div>
  );
};
