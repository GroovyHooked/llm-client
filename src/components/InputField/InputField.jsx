import { useEffect, useState, useRef } from "react";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import sendIcon from "../../assets/send.png";
import "./inputField.css";

// eslint-disable-next-line react/prop-types
export const InputField = ({ onEnter, promptContent }) => {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);
  const divRef = useRef(null);
  const screenSize = Mediaqueries();

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
      setInputText((oldText) => `${oldText}\n`);
    } else if (event.key === "Enter") {
      event.preventDefault();
      onEnter(inputText);
      setInputText("");
      textArea.style.height = `20px`;
      inputDiv.style.height = `85px`;
    }
  };

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
      <button className="btn btn-send">
        <img src={sendIcon} className="send-icon"></img>
      </button>
    </div>
  );
};
