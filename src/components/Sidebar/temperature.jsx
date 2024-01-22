import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTempInputValue, setTempValue } from "../../state_management/actions.js";

export const Temperature = () => {
    const dispatch = useDispatch();
    const tempValue = useSelector((state) => state.tempValue);
    const tempInputValue = useSelector((state) => state.tempInputValue);
  
    const handleInputTempValue = (e) => {
      dispatch(setTempInputValue(e.target.valueAsNumber));
    };
  
    useEffect(() => {
      dispatch(setTempValue(Math.round(tempInputValue * 0.01 * 100) / 100))
    }, [tempInputValue]);
    
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