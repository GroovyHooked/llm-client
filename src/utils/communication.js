export const sendMessage = async (messages, model, temperature, max_tokens) => {
  console.log({messages, model, temperature, max_tokens})
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
    // console.log({ data });
    const text = data.choices[0].message.content;
    return text;
  } catch (error) {
    console.error(error);
    return "An error occurred";
  }
};
