/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import "./dialog_window.css";
import { Loader } from "../loader/loader.jsx";

export const DialogWindow = () => {
  const dialogRef = useRef(null);
  const dialogContainerRef = useRef(null); // Reference to the parent container
  const userContent = useSelector((state) => state.userContent);
  const gptContent = useSelector((state) => state.gptResponse);
  const modelVersion = useSelector((state) => state.modelVersion);

  const shouldCleaChatInterface = useSelector(
    (state) => state.shouldCleaChatInterface
  );
  const needToHandleResponse = useSelector(
    (state) => state.needToHandleResponse
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
    if (userContent) {
      dialogRef.current.innerHTML += `<div class="message user" >${userContent}</div>`;
      scrollToBottom();
    }
  }, [userContent]);

  useEffect(() => {
    if (gptContent) {
      const htmlContent = md.render(gptContent);
      dialogRef.current.innerHTML += `<div class="message gpt">
                                        ${htmlContent}
                                      </div></div>`;
    }
    scrollToBottom();
  }, [gptContent]);

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
      {needToHandleResponse && <Loader />}
    </div>
  );
};
