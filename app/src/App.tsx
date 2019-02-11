import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './config/stack.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href={data.ServerlessStackHelloWorldApiEndpoint + 'hello-go'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Stack ref: <span>{data.ServerlessStackHelloWorldApiEndpoint}</span>
          </a>
        </header>
      </div>
    );
  }
}

export default App;
