import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Home from './components/home';
import { Account, Register, Login, Logout } from './components/account';
import { Header, Footer } from './components/template';
import Chat from './components/chat';
import { Posts, Requests } from './components/posts';
import { Parties } from './components/party';
import { Users } from './components/users';
import AdminPosts from './components/admin';
import { AdminTools } from './components/adminTools';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md" sx={{ boxSizing: 'content-box' }}>
                    <Header sx={{ minHeight: '20vh' }} />
                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/logout" component={Logout} />

                        <Route exact path="/account" component={Account} />
                        <Route exact path="/account/chats" component={Chat} />

                        <Route exact path="/posts" component={Posts} />
                        <Route exact path="/party" component={Parties} />
                        <Route exact path="/requests" component={Requests} />

                        <Route exact path="/users" component={Users} />

                        <Route exact path="/admin" component={AdminPosts} />
                        <Route exact path="/admin/tools" component={AdminTools} />
                    </Switch>
                    <Footer sx={{ maxHeight: '10vh' }} />
                </Container>
            </React.Fragment>
        )
    }
}

export default App;
