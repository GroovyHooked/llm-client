// SidebarContent.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearChatInterface } from "../../state_management/actions.js";
import { SwitchModel } from "./switch-model.jsx";
import { Temperature } from "./temperature.jsx";
import { MaxToken } from "./max-token.jsx";
import { Prompts } from "./prompts.jsx";

export const SidebarContent = () => {
  const dispatch = useDispatch();
  const maxTokens = useSelector((state) => state.maxTokens);

  const clearChatMessages = () => {
    dispatch(clearChatInterface(true));
    setTimeout(() => {
      dispatch(clearChatInterface(false));
    }, 1000);
  };

  return (
    <div className="side-bar-content">
      <button className="clear-dialog" onClick={clearChatMessages}>
        New chat
      </button>
      <SwitchModel />
      <Temperature />
      <MaxToken maxTokens={maxTokens} />
      <Prompts />
    </div>
  );
};
