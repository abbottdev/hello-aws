import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Endpoints from './config/endpoints';

class App extends Component<{Endpoints: Endpoints}, {results: string, hasResults: boolean}> {

  constructor(props: any) {
    super(props);
        
    this.state = { results: "", hasResults: false};
  }

  invokeNodeJsLambda = () => {
    let url = this.props.Endpoints.ApiEndpointUrl + 'hello-world-js';

    this.setState({
      results: "",
      hasResults: false
    }, () => {
      axios.post(url).then(data => {
        debugger;
        this.setState({
          results: JSON.stringify(data.data),
          hasResults: true
        })
      }).catch(r => console.log(r));
    });
  }
  
  invokeGoLangLambda = () => {
    let url = this.props.Endpoints.ApiEndpointUrl + 'hello-world-go';

    this.setState({
      results: "",
      hasResults: false
    }, () => {
      axios.post(url).then(data => { 
        this.setState({
          results: JSON.stringify(data.data),
          hasResults: true
        })
      }).catch(r => console.log(r));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Click on the button to invoke a web request using an AWS Lambda
          </p>
          <div onClick={this.invokeGoLangLambda} style={{ cursor: 'pointer', width: 200, backgroundColor: 'DimGrey', padding: 10, margin: 10 }}>
            Go Lang
          </div>
          <div onClick={this.invokeNodeJsLambda} style={{ cursor: 'pointer', width: 200, backgroundColor: 'DimGrey', padding: 10, margin: 10 }}>
            NodeJs
          </div><br />
          <div style={{display: (this.state.hasResults ? "inline" : "none")}}>
            <span>Results:</span><br />
            <pre>{this.state.results}</pre>
          </div>
          <p>
            Api Role ARN: <br /><small>{this.props.Endpoints.ApiRoleArn}</small>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
