import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { positions } from '@mui/system';

export function Account() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
            <h1>Account</h1>
        </Box>
    )
}

export function Register() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
            <h1>Register</h1>
            <form>
                <label>
                    Login:
                </label>
            </form>
        </Box>
    )
}

export function Login() {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
            <div>
                <h5>Login</h5>
                <form>
                    <p> <TextField
                    id="outlined-required"
                    label="Username"/> </p>
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"/>
                </form>
            </div>
        </Box>
    )
}

export function Logout() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
            <h1>You have logged out</h1>
        </Box>
    )
}