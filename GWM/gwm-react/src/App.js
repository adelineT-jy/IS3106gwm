import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Home from './components/home';
import { Account, Register, Login } from './components/account';
import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
    render() {
        return (
        <React.Fragment>
            <CssBaseline />
                <Container maxWidth="md">
                    <Header sx={{height:'20vh'}} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/account" component={Account} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
            </Container>
        </React.Fragment>
        )
    }
}

export default App;
