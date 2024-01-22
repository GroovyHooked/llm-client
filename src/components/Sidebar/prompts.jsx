import { useDispatch, useSelector } from "react-redux";
import { setPromptCategory, setPromptContent } from "../../state_management/actions.js";
import { prompts } from "../../utils/prompts.js";

export const Prompts = () => {
    const dispatch = useDispatch();
    const promptCategory = useSelector((state) => state.promptCategory);
  
    const handleSelectPrompts = (e) => {
      dispatch(setPromptCategory(e.target.value));
    };
  
    const retreivePromptContent = (e) => {
      prompts[promptCategory].forEach((element) => {
        if (e.target.value === element.title) {
          dispatch(setPromptContent(element.content));
        }
      });
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