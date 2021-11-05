import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { Account, Register, Login, Logout } from './components/account';
import { Header, Footer } from './components/template';
import Chat from './components/chat';
import Posts from './components/posts';
import Requests from './components/requests';
import Parties from './components/party';
import { PostManager, AdminTools, UserManager } from './components/admin';
import PageNotFound from './components/unauthorised';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                    <Header />
                    <Switch>
                        <Route exact path="/"><Posts request={false}/></Route>
                        
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/logout" component={Logout} />

                        <Route exact path="/account" component={Account} />
                        <Route exact path="/account/chats" component={Chat} />

                        <Route exact path="/posts"><Posts request={true}/></Route>
                        <Route exact path="/party" component={Parties} />
                        <Route exact path="/requests" component={Requests} />

                        <Route exact path="/admin" component={PostManager} />
                        <Route exact path="/admin/tools" component={AdminTools} />
                        <Route exact path="/admin/users" component={UserManager} />

                        <Route component={PageNotFound} />
                    </Switch>
                    <Footer/>
            </React.Fragment>
        )
    }
}

export default App;
