export const processDataWithBackend = async (conversationHistory, model, temperature, max_tokens) => {
  let messages

  if(model === 'llama') {
    messages = conversationHistory[conversationHistory.length - 1].content
  }
  if(model === 'mistral') {
  // Patern: <s>[INST] Instruction [/INST] Model answer</s>[INST] Follow-up instruction [/INST]
    if(conversationHistory.length === 1) {
      messages = `<s>[INST]${conversationHistory[conversationHistory.length - 1].content}[/INST]`
    } else {
      messages = `<s>[INST]${conversationHistory[conversationHistory.length - 3].content}[/INST]${conversationHistory[conversationHistory.length - 2].content}</s>[INST]${conversationHistory[conversationHistory.length - 1].content}[/INST]` 
    }
  }
  if(model === 'gpt-3.5-turbo' || model === 'gpt-4') {
    messages = conversationHistory
  }
  return fetch('http://localhost:3000/local-model', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      model,
      temperature,
      max_tokens,
    }),
  }).then(response => response.json())
    .then(data => {
      return data.answer
    })
    .catch(error => console.error(error));
}