import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from '@mui/lab/AdapterMoment';


import { Register, Login, Logout } from './components/account';
import { Account } from './components/users';
import { Header, Footer } from './components/template';
import Chat from './components/chat';
import Posts from './components/posts';
import Requests from './components/requests';
import Parties from './components/party';
import { AdminLogin } from './components/admin';
import AdminPosts from './components/adminPosts';
import AdminTools from './components/adminTools';
import AdminUsers from './components/adminUsers';
import { PageNotFound, Unauthorised } from './components/unauthorised';
import Settings from './components/userSettings';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
    render() {
        const RedirectUnauthorised = ({ component: Component, ...props }) => (
            <Route
                {...props}
                render={(props) =>
                    window.localStorage.getItem('user') ? (
                        <Component {...props} />
                    ) : (
                        <Route component={Unauthorised} />
                    )}
            />
        );

        const RedirectUnauthorisedAdmin = ({ component: Component, ...props }) => (
            <Route
                {...props}
                render={(props) =>
                    window.localStorage.getItem('admin') ? (
                        <Component {...props} />
                    ) : (
                        <Route component={Unauthorised} />
                    )}
            />
        );

        return (
            <LocalizationProvider dateAdapter={DateAdapter}>
                <React.Fragment>
                    <CssBaseline />
                    <Header />
                    <Switch>
                        <Route exact path="/"><Posts request={false} /></Route>

                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/logout" component={Logout} />

                        {/* users */}
                        <RedirectUnauthorised path={`/account/settings`} component={Settings} />
                        {/* <RedirectUnauthorised exact path={`/account/settings/cards`} component={Settings} /> */}
                        <RedirectUnauthorised exact path={`/account`} component={Account} />


                        <RedirectUnauthorised exact path={`/posts`} component={Posts} />
                        <RedirectUnauthorised exact path={`/party`} component={Parties} />
                        <RedirectUnauthorised exact path={`/requests`} component={Requests} />
                        <RedirectUnauthorised exact path={`/chats`} component={Chat} />
                        {/*<RedirectUnauthorised path={`/account/chats/message`} component={Settings} />*/}

                        {/* admin */}
                        <Route exact path="/admin" component={AdminLogin} />
                        <RedirectUnauthorisedAdmin exact path="/admin/posts" component={AdminPosts} />
                        <RedirectUnauthorisedAdmin exact path="/admin/tools" component={AdminTools} />
                        <RedirectUnauthorisedAdmin exact path="/admin/users" component={AdminUsers} />

                        <Route component={PageNotFound} />
                    </Switch>
                    <Footer />
                </React.Fragment>
            </LocalizationProvider>
        )
    }
}

export default App;