import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Button } from "atomize";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="bootstrap-wrapper"
            id="bootstrap-wrapper"
            onKeyDown={this.onKeyPressed}
            tabIndex="0">
              <h1>hello world</h1>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
