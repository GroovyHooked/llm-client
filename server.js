import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from "url";
import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";
import axios from 'axios';

dotenv.config();
const app = express();
app.use(express.json())

const __dirname = path.dirname(fileURLToPath(import.meta.url)) + "/src/";
const mistralVersion01 = "mistral-7b-instruct-v0.1.Q2_K.gguf"
const mistralVersion02 = "mistral-7b-instruct-v0.2.Q2_K.gguf"
const llamaVersion2 = "llama-2-7b-chat.Q4_K_M.gguf"

const createModelSession = async (modelFile) => {
  const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", modelFile)
  });
  const context = new LlamaContext({ model });
  const session = new LlamaChatSession({ context });
  return session;
}

let mistralSession = await createModelSession(mistralVersion02);
let llamaSession = await createModelSession(llamaVersion2);

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/local-model', async (req, res) => {
  const { messages, model, temperature, max_tokens } = req.body;
  if (model === 'llama') fetchLocalModel(llamaSession, messages, res)
  if (model === 'mistral') fetchLocalModel(mistralSession, messages, res);
  if (model === "gpt-3.5-turbo" || model === "gpt-4") {
    const answer = await fetchOpenAi(messages, model, temperature, max_tokens);
    return res.json({ answer });
  }
});

async function fetchOpenAi(messages, model, temperature, max_tokens) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  };
  const requestData = {
    model,
    messages,
    temperature,
    max_tokens,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, { headers })
    const data = await response.data;
    const answer = data.choices[0].message.content;
    return answer;
  } catch (error) {
    console.error(error);
    return "An error occurred";
  }
}

async function fetchLocalModel(session, messages, res) {
  try {
    const answer = await session.prompt(messages);
    return res.json({ answer });
  } catch (error) {
    console.error(`Erreur d'exécution: ${error.message}`);
    res.status(500).json({ error: 'Une erreur s\'est produite' });
    return error;
  }
}

const port = 3000
app.listen(port, () => console.log(`Server running on port ${port}`))