import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Paper, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function Account() {
    return (
        <Box sx={{ height: '70vh' }}>
            <h1>Account</h1>
        </Box>
    )
}

export function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    let history = useHistory(); 

    const handleRegister = (event) => {
        event.preventDefault();
        const user = {email: email, 
            username: username, 
            password: password, 
            gender: gender};
        try {
            fetch(`http://localhost:8080/Gwm-war/webresources/users`, {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(user),
                crossDomain: true
            })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("login success");
                        return response.json();
                    } else {
                        response.json().then(function(e){
                            alert(e.error);
                            setError(e.error);
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
        <Box component="form" onSubmit={handleRegister}
                display="flex" alignItems="center" justifyContent="center" textAlign="center"
                sx={{ height: '85vh', paddingRight: '11vh'}}>
            <Paper sx={{width: '60vh', height: '60vh'}}>
                <Typography variant="h6" sx={{padding: "5vh", paddingBottom: "3vh"}}>Register</Typography>
                <Grid container spacing={2} display="flex">
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" label="Email" value={email}
                        required autoFocus
                        onChange={(event) => setEmail(event.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" label="Username" value={username}
                        required 
                        onChange={(event) => setUsername(event.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-password-input" label="Password" required
                        type="password" autoComplete="current-password" value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 195 }}>
                            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={gender}
                            label="Gender"
                            onChange={(event) => setGender(event.target.value)}
                            >
                            <MenuItem value={0}>Female</MenuItem>
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Rather Not Say</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={6} md={8}>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button color="secondary" variant="contained" type="submit">
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
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
                    if (response.status === 200) {
                        console.log("login success");
                        return response.json();
                    } else {
                        response.json().then(function(e){
                            alert(e.error);
                            setError(e.error);
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
            <Box component="form" onSubmit={handleLogin}
                display="flex" alignItems="center" justifyContent="center" textAlign="center"
                sx={{ height: '85vh'}}>
                <Paper sx={{width: '45vh', height: '55vh'}}>
                <Stack spacing={2} sx={{ justifyContent: 'center', margin: '8vh'}}>
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
                </Paper>
            </Box>

    )
}

export function Logout() {
    window.localStorage.removeItem("user");

    return (
        <Box sx={{ height: '70vh' }}>
            <h1>You have logged out</h1>
        </Box>
    )
}