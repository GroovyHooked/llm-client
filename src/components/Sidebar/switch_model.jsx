import { useDispatch } from "react-redux";
import { setModelVersion, setMaxTokens } from "../../state_management/actions.js";

export const SwitchModel = () => {
    const dispatch = useDispatch();
  
    const changeModel = (e) => {
      if (e.target.className === "gpt3-model") {
        dispatch(setModelVersion("gpt-3.5-turbo"))
        dispatch(setMaxTokens(4096))
      } else if (e.target.className === "gpt4-model") {
        dispatch(setModelVersion("gpt-4"))
        dispatch(setMaxTokens(8192))
      } else if (e.target.className === "llama") {
        dispatch(setModelVersion("llama"))
        dispatch(setMaxTokens(508))
      } else if (e.target.className === "mistral") {
        dispatch(setModelVersion("mistral"))
        dispatch(setMaxTokens(508))
      }
    };
  
    return (
      <div className="swich-model">
        <button className="gpt3-model" onClick={changeModel}>
          GPT3
        </button>
        <button className="gpt4-model" onClick={changeModel}>
          GPT4
        </button>
        <button className="llama" onClick={changeModel}>
          Llama
        </button>
        <button className="mistral" onClick={changeModel}>
          Mistral
        </button>
      </div>
    );
  };
  