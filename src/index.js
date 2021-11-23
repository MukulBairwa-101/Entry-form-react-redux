import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from "./serviceWorker";
import {createStore} from "redux"
import {Provider} from "react-redux"
import formReducer from "./reducers/formReducer"
import { composeWithDevTools } from 'redux-devtools-extension'

if (localStorage.getItem("Listdata") == null) {
  localStorage.setItem("Listdata", JSON.stringify([]))   
}
let initialState ={
  currentIndex : -1,
  list : JSON.parse(localStorage.getItem("Listdata"))
}
const store =createStore(formReducer,initialState, composeWithDevTools()) 

ReactDOM.render(
  <Provider store ={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();