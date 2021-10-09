import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Account from './components/account';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
      </Switch>
    )
  }
}

export default App;
