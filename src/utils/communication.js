const formatMistralMessage = (conversationHistory) => {
  // Mistral Patern: <s>[INST] Instruction [/INST] Model answer</s>[INST] Follow-up instruction [/INST]
  if (conversationHistory.length === 1) {
    return `<s>[INST]${conversationHistory[conversationHistory.length - 1].content}[/INST]`;
  } else {
    return `<s>[INST]${conversationHistory[conversationHistory.length - 3].content}[/INST]${conversationHistory[conversationHistory.length - 2].content}</s>[INST]${conversationHistory[conversationHistory.length - 1].content}[/INST>`;
  }
};

export const processDataWithBackend = async (conversationHistory, model, temperature, max_tokens) => {
  let messages;

  switch (model) {
    case 'llama':
      messages = conversationHistory[conversationHistory.length - 1].content;
      break;
    case 'mistral':
      messages = formatMistralMessage(conversationHistory);
      break;
    case 'gpt-3.5-turbo':
    case 'gpt-4':
      messages = conversationHistory;
      break;
    default:
      throw new Error(`Unsupported model: ${model}`);
  }

  try {
    const response = await fetch('http://localhost:3000/local-model', {
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
    });

    const data = await response.json();

    return data.answer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};