import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col, Div, ThemeProvider } from 'atomize';

import Home from './components/home';
import Account from './components/account';
import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const theme = {
  grid: {
    containerWidth: {
      xs: "540px",
      sm: "720px",
      md: "960px",
      lg: "1156px",
      xl: "1156px"
    },
    gutterWidth: "12px",
  }
};

class App extends Component {
  render() {
    return (
      <div class="container">
        <Switch>
          <Route exact path="/">
            <Header/>
            <Home />
          </Route>
          <Route exact path="/account">
            <Header/>
            <Account />
          </Route>
        </Switch>

      </div>
    )
  }
}

export default App;
