// import { execa } from 'execa';

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

// export const sendMessageToLocal = async (message) => {
//   const command = '/Users/thomascariot/dev/llama.cpp/main';
//   const args = [
//     '-m',
//     '/Users/thomascariot/dev/llama.cpp/models/llama-2-7b-chat.Q4_K_M.gguf',
//     '-n',
//     '1024',
//     '-ngl',
//     '1',
//     '-p',
//     message,
//   ];

//   try {
//     const { stdout } = await execa(command, args);
//     console.log(`Sortie : ${stdout}`);
//     return stdout;
//   } catch (error) {
//     console.error(`Erreur d'exécution: ${error.message}`);
//     return error;
//   }
// };


// export const sendMessageToLocal2 = async (message) => {
//   fetch('http://localhost:3000/api', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       messages: [{role: 'system', content: message}],
//       model: 'llama',
//       temperature: 0,
//       max_tokens: 300,
//     }),
//   })
//     .then(response => response.json())
//     .then(data => console.log({data}))
//     .catch(error => console.error(error));
// }
