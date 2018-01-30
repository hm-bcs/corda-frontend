import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

import GetRequests from './components/getRequests.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Look at that swirly swirl!</h1>
        </header>
        <div>
          <GetRequests/>
        </div>
      </div>
    );
  }
}

export default App;
