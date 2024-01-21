import dotenv from 'dotenv';
import express from 'express';
import { execa } from 'execa'
import { fileURLToPath } from "url";
import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

dotenv.config();
const app = express();
app.use(express.json())

let __dirname = path.dirname(fileURLToPath(import.meta.url));
__dirname = __dirname + "/src/";
// const modelVersion1 = "mistral-7b-instruct-v0.1.Q2_K.gguf"
const modelVersion2 = "mistral-7b-instruct-v0.2.Q2_K.gguf"

const createMistralSession = async (modelPath) => {
  const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", modelPath)
  });
  const context = new LlamaContext({ model });
  const session = new LlamaChatSession({ context });
  return session;
}

let session = await createMistralSession(modelVersion2);

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

app.get('/reset', async (req, res) => {
  session = await createMistralSession(modelVersion2);
  console.log('Session reset');
})


app.post('/api', async (req, res) => {
  const { messages, model } = req.body;
  if (model === 'llama') {
    const command = '/Users/thomascariot/dev/llama.cpp/main';
    const args = [
      '-m',
      '/Users/thomascariot/dev/llama.cpp/models/llama-2-7b-chat.Q4_K_M.gguf',
      '-n',
      '1024',
      '-ngl',
      '1',
      '-p',
      messages,
    ];

    try {
      const { stdout } = await execa(command, args);
      return res.json({ stdout }); 
    } catch (error) {
      console.error(`Erreur d'exécution: ${error.message}`);
      res.status(500).json({ error: 'Une erreur s\'est produite' });
      return error;
    }
  }
});

app.post('/mistralai', async (req, res) => {
  const { messages, model } = req.body;
  if (model === 'mistral') {
    try {
      const answer = await session.prompt(messages);
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
