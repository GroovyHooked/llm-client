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
  shoudlClearDiscussion,
}) => {
  useEffect(() => {
    if (shoudlClearDiscussion) {
      dialogRef.current.innerHTML = "";
    }
  }, [modelVersion, shoudlClearDiscussion]);
  const dialogRef = useRef(null);
  const screenSize = Mediaqueries();
  const md = new MarkdownIt();

  useEffect(() => {
    if (!userContent) return;

    dialogRef.current.innerHTML += `<div class="message user" >${userContent}</div>`;
  }, [userContent]);

  useEffect(() => {
    if (!gptContent) return;
    const htmlContent = md.render(gptContent);
    dialogRef.current.innerHTML += `</ReactMarkdown><div class="message gpt">
                                      ${htmlContent}
                                    </div></ReactMarkdown>`;
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
