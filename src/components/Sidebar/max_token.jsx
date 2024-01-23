import { useDispatch, useSelector } from "react-redux";
import { setTokenValue } from "../../state_management/actions.js";

export const MaxToken = () => {
    const dispatch = useDispatch();
    const tokenValue = useSelector((state) => state.tokenValue);
    const maxTokens = useSelector((state) => state.maxTokens);

    const handleInputTokenValue = (e) => {
      dispatch(setTokenValue(e.target.valueAsNumber));
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