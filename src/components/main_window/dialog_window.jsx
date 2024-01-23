/* eslint-disable react/prop-types */
import { useEffect, useRef, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import "./dialog_window.css";
import { Spinner } from "../spinner/spinner.jsx";


export const DialogWindow = () => {
  const lastInputFromUser = useSelector((state) => state.lastInputFromUser);
  const modelOutput = useSelector((state) => state.lastOutputFromModel);
  const modelVersion = useSelector((state) => state.modelVersion);
  const shouldCleaChatInterface = useSelector((state) => state.shouldCleaChatInterface);
  const isModelHandlingData = useSelector((state) => state.isModelHandlingData);
  const screenSize = Mediaqueries();
  const md = useMemo(() => new MarkdownIt(), []);

  const [messages, setMessages] = useState([]);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    if (shouldCleaChatInterface) {
      setMessages([]);
    }
  }, [shouldCleaChatInterface]);

  useEffect(() => {
    if (lastInputFromUser) {
      setMessages((prevMessages) => [...prevMessages, { type: 'user', content: lastInputFromUser }]);
    }
  }, [lastInputFromUser]);

  useEffect(() => {
    if (modelOutput) {
      const htmlContent = md.render(modelOutput);
      setMessages((prevMessages) => [...prevMessages, { type: 'model', content: htmlContent }]);
    }
  }, [modelOutput]);

  return (
    <div
      className={screenSize.isLarge ? "dialog-div dialog-div-large" : "dialog-div dialog-div-small"}
    >
      <div className="display-model">{capitalizeFirstLetter(modelVersion)}</div>
      <div className="dialog">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`} dangerouslySetInnerHTML={{ __html: message.content }}></div>
        ))}
      </div>
      {isModelHandlingData && <Spinner />}
    </div>
  );
};


