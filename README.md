# llm-client

## Project Description
llm-client is a chat interface that leverages various models to generate responses to user input. It features two API-based models, GPT-3 and GPT-4, provided by OpenAI, along with two local models, Llama 2 and Mistral. The local models run using the node-llama-cpp library, enabling the execution of large language models on a local machine.

## Installation
To install the project, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.

## Adding OpenAI API Key
To integrate your OpenAI API key into the project, perform the following steps:
1. Create a .env file in the project's root directory.
2. Add the following line: OPENAI_API_KEY=<YOUR_API_KEY>

## Adding local models
To include local models in the project, follow these steps:
1. Download the models from Hugging face ([Mistral](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q2_K.gguf?download=true) [Llama2](https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf?download=true))
2. Create a new directory named `models` inside the `/src` directory of the project
3. Move the downloaded models into the 'model' directory

## Usage
To interact with the chat interface, follow these steps:
1. Start the development server by running `npm run dev`.
2. Open your web browser and navigate to [http://localhost:5173](http://localhost:5173).
3. Enter your messages in the input field and press Enter.
4. The chat interface will display the AI-generated responses in the dialog window.

## Additional Notes
- Make sure you have Node.js installed on your machine before running the project.
- The API-based models, GPT-3 and GPT-4, require an internet connection to function properly.
- The local models, Llama 2 and Mistral, run on your local machine using the `node-llama-cpp` library.
- Feel free to explore and modify the code to suit your needs.

That's it! You're now ready to install, configure, and use the chat interface project. Enjoy chatting with AI!
