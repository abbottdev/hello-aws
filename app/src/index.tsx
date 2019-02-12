import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Endpoints from './config/endpoints';


const endpoints = import(`./config/stack.${process.env.NODE_ENV}.json`)
  .then(json => {
    let endpoints = json as Endpoints;

    ReactDOM.render(<App Endpoints={endpoints} />, document.getElementById('root'));
  });
 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
