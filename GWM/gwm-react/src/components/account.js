import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

export function Account() {
    return (
        <Box sx={{ height: '70vh' }}>
            <h1>Account</h1>
        </Box>
    )
}

export function Register() {
    return (
        <Box sx={{ height: '70vh' }}>
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
    const [error, setError] = useState("");
    let history = useHistory(); 


    const handleLogin = (event) => {
        event.preventDefault();
        try {
            fetch(`http://localhost:8080/Gwm-war/webresources/users/login/${username}/${password}`, {
                method: 'GET',
                headers:{'Content-Type': 'application/json'},
                crossDomain: true
            })
                .then((response) => {
                    if (response.status == 200) {
                        console.log("login success");
                        return response.json();
                    } else {
                        response.json().then(function(e){
                            alert(e.error);
                            //setError(e.error);
                        })
                    }
                })
                .then((data) => {
                    console.log(data);
                    window.localStorage.setItem("user", JSON.stringify(data));
                    history.push("/posts");
                })
        } catch (e) {
            console.log(e.message);
        }
    }
    

    return (
        <Container maxwidth="xs" sx={{ bgcolor: 'white' }}>
            <Box component="form" onSubmit={handleLogin} 
                display="flex" alignItems="center" justifyContent="center" textAlign="center"
                sx={{ height: '80vh' }}>
                <Stack spacing={2} sx={{ justifyContent: 'center' }}>
                    <Typography variant="h6">Login</Typography>
                    
                    <TextField id="outlined-basic" label="Username" value={username}
                        required autoFocus
                        onChange={(event) => setUsername(event.target.value)} />
                    
                    <TextField id="outlined-password-input" label="Password" required
                        type="password" autoComplete="current-password" value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                    
                    <Button color="secondary" variant="contained" type="submit">
                        Login
                    </Button>
                    <Link href="/register" fontSize="small" color="secondary" fontWeight="bold">Create an account</Link>
                </Stack>
            </Box>
        </Container>
    )
}

export function Logout() {
    return (
        <Box sx={{ height: '70vh' }}>
            <h1>You have logged out</h1>
        </Box>
    )
}