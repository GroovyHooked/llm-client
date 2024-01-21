/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import "./dialogWindow.css";
import { Loader } from "../loader/loader.jsx";

export const DialogWindow = ({
  userContent,
  gptContent,
  modelVersion,
  shouldClearDiscussion,
  needToHandleResponse,
}) => {
  const dialogRef = useRef(null);
  const dialogContainerRef = useRef(null); // Reference to the parent container

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
    if (shouldClearDiscussion) {
      dialogRef.current.innerHTML = "";
    }
  }, [modelVersion, shouldClearDiscussion]);

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
