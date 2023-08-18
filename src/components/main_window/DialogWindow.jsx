/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import "./dialogWindow.css";

export const DialogWindow = ({
  userContent,
  gptContent,
  modelVersion,
  shouldClearDiscussion,
}) => {
  const dialogRef = useRef(null);
  const screenSize = Mediaqueries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const md = new MarkdownIt();

  useEffect(() => {
    if (shouldClearDiscussion) {
      dialogRef.current.innerHTML = "";
    }
  }, [modelVersion, shouldClearDiscussion]);

  useEffect(() => {
    if (userContent) {
      dialogRef.current.innerHTML += `<div class="message user" >${userContent}</div>`;
    }
  }, [userContent]);

  useEffect(() => {
    if (gptContent) {
      const htmlContent = md.render(gptContent);
      dialogRef.current.innerHTML += `<div class="message gpt">
                                        ${htmlContent}
                                      </div></div>`;
    }
  }, [gptContent]);

  return (
    <div
      className={
        screenSize.isLarge
          ? "dialog-div dialog-div-large"
          : "dialog-div dialog-div-small"
      }
    >
      <div className="display-model">{modelVersion}</div>
      <div className="dialog" ref={dialogRef}></div>
    </div>
  );
};
