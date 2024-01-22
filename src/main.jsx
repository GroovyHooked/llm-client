import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { ChatInterface } from './index.jsx'
import store from './state_management/store.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChatInterface />
  </Provider>,
)

