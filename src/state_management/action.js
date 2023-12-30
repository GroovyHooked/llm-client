export const setUserContent = (text) => ({
    type: 'SET_USER_CONTENT',
    payload: text
})

export const setModelResponse = (text) => ({
    type: 'SET_MODEL_RESPONSE',
    payload: text,
})

export const setDialogContent = (dialogContent, role, content) => ({
    type: 'SET_DIALOG_CONTENT',
    payload: [...dialogContent, { role, content }],
})

export const handleModelResponse = (bol) => ({ 
    type: 'HANDLE_MODEL_RESPONSE',
    payload: bol
});

export const setModelVersion = (model) => ({
    type: 'SET_MODEL_VERSION',
    payload: model
})

export const clearDiscussion = (bol) => ({
    type: 'CLEAR_DISCUSSION',
    payload: bol
})

export const setTempInputValue = (temp) => ({
    type: 'TEMP_INPUT_VALUE',
    payload: temp
})

export const setTempValue = (temp) => ({
    type: 'TEMP_VALUE',
    payload: temp
})

export const setTokenValue = (num) => ({
    type: 'TOKEN_VALUE',
    payload: num
})

export const setMaxTokens = (max) => ({
    type: 'MAX_TOKENS',
    payload: max
})

export const setPromptCategory = (category) => ({
    type: 'SET_PROMPT_CATGEGORY',
    payload: category
})

export const setPromptContent = (content) => ({
    type: 'SET_PROMPT_CONTENT',
    payload: content
})