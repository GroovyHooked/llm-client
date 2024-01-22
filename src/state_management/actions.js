import * as types from './action_types.js';

export const setUserContent = (text) => ({
    type: types.SET_USER_CONTENT,
    payload: text
})

export const setModelResponse = (text) => ({
    type: types.SET_MODEL_RESPONSE,
    payload: text,
})

export const setDialogContent = (dialogContent, role, content) => ({
    type: types.SET_DIALOG_CONTENT,
    payload: [...dialogContent, { role, content }],
})

export const handleModelResponse = (bol) => ({
    type: types.HANDLE_MODEL_RESPONSE,
    payload: bol
})

export const setModelVersion = (model) => ({
    type: types.SET_MODEL_VERSION,
    payload: model
})

export const clearDiscussion = (bol) => ({
    type: types.CLEAR_DISCUSSION,
    payload: bol
})

export const setTempInputValue = (temp) => ({
    type: types.TEMP_INPUT_VALUE,
    payload: temp
})

export const setTempValue = (temp) => ({
    type: types.TEMP_VALUE,
    payload: temp
})

export const setTokenValue = (num) => ({
    type: types.TOKEN_VALUE,
    payload: num
})

export const setMaxTokens = (max) => ({
    type: types.MAX_TOKENS,
    payload: max
})

export const setPromptCategory = (category) => ({
    type: types.SET_PROMPT_CATGEGORY,
    payload: category
})

export const setPromptContent = (content) => ({
    type: types.SET_PROMPT_CONTENT,
    payload: content
})