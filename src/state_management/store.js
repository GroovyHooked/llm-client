import { createStore } from 'redux';
import reducer from './reducer.js'

// Check if brower is Chrome
const isChrome = /Chrome/.test(window.navigator.userAgent) && /Google Inc/.test(window.navigator.vendor);
// Enable Redux DevTools Extension if browser is Chrome
const composeEnhancers = isChrome ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : () => {}; 

const store = createStore(
    reducer,
    composeEnhancers(),
    );

export default store