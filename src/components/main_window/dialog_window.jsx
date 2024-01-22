/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import "./dialog_window.css";
import { Loader } from "../loader/loader.jsx";

export const DialogWindow = () => {
  const dialogRef = useRef(null);
  const dialogContainerRef = useRef(null); // Reference to the parent container
  const lastInputFromUser = useSelector((state) => state.lastInputFromUser);
  const modelOutput = useSelector((state) => state.lastOutputFromModel);
  const modelVersion = useSelector((state) => state.modelVersion);

  const shouldCleaChatInterface = useSelector(
    (state) => state.shouldCleaChatInterface
  );
  const isModelHandlingData = useSelector(
    (state) => state.isModelHandlingData
  );
  const screenSize = Mediaqueries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const md = new MarkdownIt();

  const scrollToBottom = () => {
    dialogContainerRef.current.scrollTop =
      dialogContainerRef.current.scrollHeight;
    const lastMessage = dialogContainerRef.current.querySelector(
      ".message:last-child"
    );
    if (lastMessage) {
      lastMessage.focus();
    }
  };

  useEffect(() => {
    if (shouldCleaChatInterface) {
      dialogRef.current.innerHTML = "";
    }
  }, [modelVersion, shouldCleaChatInterface]);

  useEffect(() => {
    if (lastInputFromUser) {
      dialogRef.current.innerHTML += `<div class="message user" >${lastInputFromUser}</div>`;
      scrollToBottom();
    }
  }, [lastInputFromUser]);

  useEffect(() => {
    if (modelOutput) {
      const htmlContent = md.render(modelOutput);
      dialogRef.current.innerHTML += `<div class="message gpt">
                                        ${htmlContent}
                                      </div></div>`;
    }
    scrollToBottom();
  }, [modelOutput]);

  return (
    <div
      className={
        screenSize.isLarge
          ? "dialog-div dialog-div-large"
          : "dialog-div dialog-div-small"
      }
      ref={dialogContainerRef} // Set the ref for the parent container
    >
      <div className="display-model">{modelVersion[0].toUpperCase() + modelVersion.slice(1)}</div>
      <div className="dialog" ref={dialogRef}></div>
      {isModelHandlingData && <Loader />}
    </div>
  );
};
