import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from "url";
import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

dotenv.config();
const app = express();
app.use(express.json())

const __dirname = path.dirname(fileURLToPath(import.meta.url)) + "/src/";
const mistralVersion1 = "mistral-7b-instruct-v0.1.Q2_K.gguf"
const mistralVersion2 = "mistral-7b-instruct-v0.2.Q2_K.gguf"
const llamaVersion2 = "llama-2-7b-chat.Q4_K_M.gguf"

const createModelSession = async (modelFile) => {
  const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", modelFile)
  });
  const context = new LlamaContext({ model });
  const session = new LlamaChatSession({ context });
  return session;
}

let mistralSession = await createModelSession(mistralVersion2);
let llamaSession = await createModelSession(llamaVersion2);

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`Current URL: ${currentUrl}`);
  res.json({ currentUrl });
})

app.post('/local-model', async (req, res) => {
  const { messages, model } = req.body;
  if (model === 'llama') {
    try {
      const answer = await llamaSession.prompt(messages);
      return res.json({ answer }); 
    } catch (error) {
      console.error(`Erreur d'exécution: ${error.message}`);
      res.status(500).json({ error: 'Une erreur s\'est produite' });
      return error;
    }
  }
  if (model === 'mistral') {
    try {
      const answer = await mistralSession.prompt(messages);
      return res.json({ answer }); 
    } catch (error) {
      console.error(`Erreur d'exécution: ${error.message}`);
      res.status(500).json({ error: 'Une erreur s\'est produite' });
      return error;
    }
  }
});

const port = 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
