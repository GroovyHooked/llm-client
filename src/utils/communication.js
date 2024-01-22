export const sendToOpenAiApi = async (messages, model, temperature, max_tokens) => {
  //console.log({ messages, model, temperature, max_tokens })
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens
      }),
    });
    const data = await response.json();
    const text = data.choices[0].message.content;
    return text;
  } catch (error) {
    console.error(error);
    return "An error occurred";
  }
};

export const sendToLocalModel = async (dialogContent, model) => {
  let message = '';

  if(model === 'llama') {
    message = dialogContent[dialogContent.length - 1].content
  }
  if(model === 'mistral') {
  // Patern: <s>[INST] Instruction [/INST] Model answer</s>[INST] Follow-up instruction [/INST]
    if(dialogContent.length === 1) {
      message = `<s>[INST]${dialogContent[dialogContent.length - 1].content}[/INST]`
    } else {
      message = `<s>[INST]${dialogContent[dialogContent.length - 3].content}[/INST]${dialogContent[dialogContent.length - 2].content}</s>[INST]${dialogContent[dialogContent.length - 1].content}[/INST]` 
    }
  }
  return fetch('http://localhost:3000/local-model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: message,
      model: model,
      temperature: 0,
      max_tokens: 10,
    }),
  }).then(response => response.json())
    .then(data => {
      return data.answer
    })
    .catch(error => console.error(error));
}