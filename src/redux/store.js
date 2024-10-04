
// src/redux/store.js

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Ensure this is correctly installed
import rootReducer from './reducer'; // Adjust the import based on your structure


const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Applying middleware
);

export default store; // Exporting as default