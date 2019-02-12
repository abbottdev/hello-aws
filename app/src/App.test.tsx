import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Endpoints from './config/endpoints';

it('renders without crashing', async () => {

  let endpoints = await import(`./config/stack.${process.env.NODE_ENV}.json`)
    .then(json => {
      let endpoints = json as Endpoints;

      return endpoints;
    });

  const div = document.createElement('div');
  ReactDOM.render(<App Endpoints={endpoints} />, div);
  ReactDOM.unmountComponentAtNode(div);          
});
