export const sendMessage = async (messages, model, temperature, max_tokens) => {
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

export const communicateWithLlama = async (dialogContent) => {
  console.log({ dialogContent: dialogContent[dialogContent.length - 1].content });
  return await fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: dialogContent[dialogContent.length - 1].content,
      model: 'llama',
      temperature: 0,
      max_tokens: 300,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log({ data })
      return data.stdout
    })
    .catch(error => console.error(error));
}

export const communicateWithMistral = async (dialogContent) => {
  // Patern: <s>[INST] Instruction [/INST] Model answer</s>[INST] Follow-up instruction [/INST]
  let message = '';
  if(dialogContent.length === 1) {
    message = `<s>[INST]${dialogContent[dialogContent.length - 1].content}[/INST]`
  } else {
    message = `<s>[INST]${dialogContent[dialogContent.length - 3].content}[/INST]${dialogContent[dialogContent.length - 2].content}</s>[INST]${dialogContent[dialogContent.length - 1].content}[/INST]` 
  }

  return fetch('http://localhost:3000/mistralai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: `<s>[INST]${dialogContent[dialogContent.length - 1].content}[/INST]`,
      model: 'mistral',
      temperature: 0,
      max_tokens: 10,
    }),
  }).then(response => response.json())
    .then(data => {
      return data.answer
    })
    .catch(error => console.error(error));
}