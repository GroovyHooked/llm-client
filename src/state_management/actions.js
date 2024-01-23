import {
    SET_USER_INPUT,
    SET_MODEL_OUPUT,
    SET_DIALOG_CONTENT,
    HANDLE_MODEL_STATUS,
    SET_MODEL_VERSION,
    CLEAR_DISCUSSION,
    TEMP_INPUT_VALUE,
    TEMP_VALUE,
    TOKEN_VALUE,
    MAX_TOKENS,
    SET_PROMPT_CATGEGORY,
    SET_PROMPT_CONTENT,
} from './action_types.js';

export const setUserInput = (text) => ({
    type: SET_USER_INPUT,
    payload: text
})

export const setModelOutput = (text) => ({
    type: SET_MODEL_OUPUT,
    payload: text,
})

export const setconversationHistory = (conversationHistory, role, content) => ({
    type: SET_DIALOG_CONTENT,
    payload: [...conversationHistory, { role, content }],
})

export const setIsModelHandlingData = (bol) => ({
    type: HANDLE_MODEL_STATUS,
    payload: bol
})

export const setModelVersion = (model) => ({
    type: SET_MODEL_VERSION,
    payload: model
})

export const clearChatInterface = (bol) => ({
    type: CLEAR_DISCUSSION,
    payload: bol
})

export const setTempInputValue = (temp) => ({
    type: TEMP_INPUT_VALUE,
    payload: temp
})

export const setTempValue = (temp) => ({
    type: TEMP_VALUE,
    payload: temp
})

export const setTokenValue = (num) => ({
    type: TOKEN_VALUE,
    payload: num
})

export const setMaxTokens = (max) => ({
    type: MAX_TOKENS,
    payload: max
})

export const setPromptCategory = (category) => ({
    type: SET_PROMPT_CATGEGORY,
    payload: category
})

export const setPromptContent = (content) => ({
    type: SET_PROMPT_CONTENT,
    payload: content
})