import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

export function Account() {
    return (
        <Box sx={{height: '70vh' }}>
            <h1>Account</h1>
        </Box>
    )
}

export function Register() {
    return (
        <Box sx={{height: '70vh' }}>
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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState([]);
    const [error, setError] = useState("");

    function handleLogin() {
    try {
        fetch(`http://localhost:8080/Gwm-war/webresources/users/login/${username}/${password}`, {
            method: 'GET',
            crossDomain: true
        })
            .then((response) => {
                if (response.ok) {
                    console.log("login success");
                    return response.json();
                } else {
                    console.log(response);
                    setError("response");
                    throw new Error('Something went wrong');
                }
            })
            .then((data) => {
                console.log(data);
                setUser(data);
                sessionStorage.set('user', JSON.stringify((user)));
            });
    } catch (e) {
        console.log(e);
    }
}

    return (
        <Container maxwidth="sm" sx={{bgcolor:'white'}}>
        <Box component="form" display="flex" alignItems="center" justifyContent="center" textAlign="center" 
        sx={{height: '80vh'}}>
            <Stack spacing={2} sx={{justifyContent: 'center'}}>
                    <Typography variant="h6">Login</Typography>
                    <TextField id="outlined-basic" label="Username" value={username} 
                    onChange={(event) => setUsername(event.target.value)}/>
                    <TextField id="outlined-password-input" label="Password"
                    type="password" autoComplete="current-password" value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                    <Button color="secondary" variant="contained" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button variant="text" color="secondary" fontSize="small">Create an account</Button>
            </Stack>
        </Box>
        </Container>
    )
}

export function Logout() {
    return (
        <Box sx={{height: '70vh' }}>
            <h1>You have logged out</h1>
        </Box>
    )
}