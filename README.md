# llm-client

## Project Description
This project is a chat interface that utilizes various models to generate responses to user input. It includes two API-based models, GPT-3 and GPT-4, provided by OpenAI, as well as two local models, Llama 2 and Mistral, which run using the `node-llama-cpp` library. The `node-llama-cpp` library enables running a large langage model on a local machine.

## Installation
To install the project, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.

## Adding OpenAI API Key
To add your OpenAI API key to the project, follow these steps:
1. Create a `.env` file in the project root directory.
2. Add this line: `OPENAI_API_KEY=<YOUR_API_KEY>`

## Usage
To use the chat interface, follow these steps:
1. Start the development server by running `npm run dev`.
2. Open your web browser and navigate to [http://localhost:5173](http://localhost:3000).
3. Interact with the chat interface by entering your messages in the input field and pressing Enter.
4. The chat interface will display the AI-generated responses in the dialog window.

## Additional Notes
- Make sure you have Node.js installed on your machine before running the project.
- The API-based models, GPT-3 and GPT-4, require an internet connection to function properly.
- The local models, Llama 2 and Mistral, run on your local machine using the `node-llama-cpp` library. You can download those models on [Hugging face](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q2_K.gguf?download=true)
- Feel free to explore and modify the code to suit your needs.

That's it! You're now ready to install, configure, and use the chat interface project. Enjoy chatting with AI!
