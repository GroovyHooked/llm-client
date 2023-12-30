import dotenv from 'dotenv';
import express from 'express';
import { execa } from 'execa'

dotenv.config();
const app = express();

app.use(express.json())
// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  //console.log(`Current URL: ${currentUrl}`);
  // res.send(`Current URL: ${currentUrl}`);
  res.json({ currentUrl });
})


app.post('/api', async (req, res) => {
  const { messages, model, temperature, max_tokens } = req.body;
  //console.log(model);
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
      //console.log(`Sortie : ${stdout}`);
      return res.json({ stdout }); // Renvoyer la valeur de stdout dans la réponse JSON
    } catch (error) {
      console.error(`Erreur d'exécution: ${error.message}`);
      res.status(500).json({ error: 'Une erreur s\'est produite' });
      return error;
    }
  } 
});


const port = 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
