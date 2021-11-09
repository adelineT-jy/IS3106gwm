import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from '@mui/lab/AdapterMoment';


import { Account, Register, Login, Logout } from './components/account';
import { Header, Footer } from './components/template';
import Chat from './components/chat';
import Posts from './components/posts';
import Requests from './components/requests';
import Parties from './components/party';
import AdminPosts from './components/adminPosts';
import AdminTools from './components/adminTools';
import AdminUsers from './components/adminUsers';
import { PageNotFound, Unauthorised } from './components/unauthorised';


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


                        <RedirectUnauthorised exact path={`/account`} component={Account} />
                        <RedirectUnauthorised exact path={`/account/chats`} component={Chat} />

                        <Route exact path="/posts"><Posts request={true} /></Route> {/*Need to set request default as true before implementing redirect*/}
                        <RedirectUnauthorised exact path={`/party`} component={Parties} />
                        <RedirectUnauthorised exact path={`/requests`} component={Requests} />

                        <Route exact path="/admin" component={AdminPosts} /> {/*Need to set localStorage admin=true before redirect*/}
                        <Route exact path="/admin/tools" component={AdminTools} />
                        <Route exact path="/admin/users" component={AdminUsers} />

                        <Route component={PageNotFound} />
                    </Switch>
                    <Footer />
                </React.Fragment>
            </LocalizationProvider>
        )
    }
}

export default App;
