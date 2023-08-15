/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Mediaqueries } from "../../utils/mediaQueries.js";
import { prompts } from "../../utils/prompts.js";
import burgerMenu from "../../assets/menu.png";
import closeMenu from "../../assets/close.png";
import "./sidebar.css";

export const Sidebar = ({
  changeModel,
  clearDialog,
  tempValue,
  tempInputValue,
  tempInputValueSetter,
  tokenValue,
  tokenValueSetter,
  maxTokens,
  promptCategory,
  setPromptCategory,
  retreivePromptContent
}) => {
  const screenSize = Mediaqueries();
  const buttonRef = useRef(null);
  const [isDiscussionsOpen, isDiscussionsOpenSetter] = useState(false);
  const closeOrOpenDiscussions = () => {
    if (isDiscussionsOpen) {
      isDiscussionsOpenSetter(false);
      buttonRef.current.classList.remove("open");
    } else {
      isDiscussionsOpenSetter(true);
      buttonRef.current.classList.add("open");
    }
  };

  return (
    <div className={screenSize.isLarge ? "" : "side-bar"}>
      <button
        onClick={closeOrOpenDiscussions}
        className="btn btn-burger"
        ref={buttonRef}
      >
        {!screenSize.isLarge ? (
          <img
            src={isDiscussionsOpen ? closeMenu : burgerMenu}
            className={isDiscussionsOpen ? "close-menu" : "burger-menu"}
          ></img>
        ) : null}
      </button>

      {screenSize.isLarge ? (
        <Discussions
          changeModel={changeModel}
          clearDialog={clearDialog}
          tempValue={tempValue}
          tempInputValue={tempInputValue}
          tempInputValueSetter={tempInputValueSetter}
          tokenValue={tokenValue}
          tokenValueSetter={tokenValueSetter}
          maxTokens={maxTokens}
          promptCategory={promptCategory}
          setPromptCategory={setPromptCategory}
          retreivePromptContent={retreivePromptContent}
        />
      ) : isDiscussionsOpen ? (
        <Discussions
          changeModel={changeModel}
          clearDialog={clearDialog}
          tempValue={tempValue}
          tempInputValue={tempInputValue}
          tempInputValueSetter={tempInputValueSetter}
          tokenValue={tokenValue}
          tokenValueSetter={tokenValueSetter}
          maxTokens={maxTokens}
          promptCategory={promptCategory}
          setPromptCategory={setPromptCategory}
          retreivePromptContent={retreivePromptContent}
        />
      ) : null}
    </div>
  );
};

const Discussions = ({
  changeModel,
  clearDialog,
  tempValue,
  tempInputValueSetter,
  tempInputValue,
  tokenValue,
  tokenValueSetter,
  maxTokens,
  promptCategory,
  setPromptCategory,
  retreivePromptContent
}) => {
  return (
    <div className="discussions">
      <button className="new-discussion" onClick={clearDialog}>
        New chat
      </button>
      <WhichModel changeModel={changeModel} />
      <Temperature
        tempValue={tempValue}
        tempInputValueSetter={tempInputValueSetter}
        tempInputValue={tempInputValue}
      />
      <MaxToken
        tokenValue={tokenValue}
        tokenValueSetter={tokenValueSetter}
        maxTokens={maxTokens}
      />
      <Prompts
        promptCategory={promptCategory}
        setPromptCategory={setPromptCategory}
        retreivePromptContent={retreivePromptContent}
      />
    </div>
  );
};

const WhichModel = ({ changeModel }) => {
  return (
    <div className="which-model">
      <button className="gpt3-model" onClick={changeModel}>
        GPT3
      </button>
      <button className="gpt4-model" onClick={changeModel}>
        GPT4
      </button>
    </div>
  );
};

const Temperature = ({ tempValue, tempInputValueSetter, tempInputValue }) => {
  const handleInputTempValue = (e) => {
    tempInputValueSetter(e.target.valueAsNumber);
  };

  return (
    <div className="temperature-wrapper">
      <input
        type="range"
        id="temperature"
        min="0"
        max="200"
        value={tempInputValue}
        className="temperature"
        onChange={handleInputTempValue}
      />
      <label htmlFor="temperature">Temperature: {tempValue}</label>
    </div>
  );
};

const MaxToken = ({ tokenValue, tokenValueSetter, maxTokens }) => {
  const handleInputTokenValue = (e) => {
    tokenValueSetter(e.target.valueAsNumber);
  };

  return (
    <div className="tokens-wrapper">
      <input
        type="range"
        id="tokens"
        min="0"
        max={maxTokens}
        step="8"
        value={tokenValue}
        className="tokens"
        onChange={handleInputTokenValue}
      />
      <label htmlFor="tokens">Max tokens: {tokenValue}</label>
    </div>
  );
};

const Prompts = ({ promptCategory, setPromptCategory, retreivePromptContent }) => {
  const handleSelectPrompts = (e) => {
    setPromptCategory(e.target.value);
  };


  return (
    <div className="prompts">
      <select onChange={handleSelectPrompts} className="select-prompt">
        <option value="">Select a category</option>
        {Object.keys(prompts).map((key) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
      {promptCategory ? (
        <div className="sub-prompts">
          {prompts[promptCategory].map((subCat, index) => (
            <div key={index} className="sub-prompt">
              <button
                className="btn-prompt-title"
                onClick={retreivePromptContent}
                value={subCat.title}
              >
                {subCat.title}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
