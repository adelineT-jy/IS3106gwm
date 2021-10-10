import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div class="header">
                <h1>Game With Me</h1>
                <div class="d-flex flex-row-reverse bd-highlight">
                    <div class="p-2 bd-highlight">
                        <NavLink to="/register">Sign Up</NavLink>
                    </div>
                    <div class="p-2 bd-highlight">
                        <NavLink to="/login">Sign In</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;