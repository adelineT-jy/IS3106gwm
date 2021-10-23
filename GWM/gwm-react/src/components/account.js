import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

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
    const [username, setUsername] = React.useState([]);

    // function handleSubmit() {
//     console.log(query);
//     try {
//         fetch(`http://localhost:8080/Gwm-war/webresources/users/login`, {
//             crossDomain: true
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Something went wrong');
//                 }
//             })
//             .then((data) => {
//                 setPosts(data);
//             });
//     } catch (e) {
//         console.log(e);
//     }
// }

    return (
        <Box component="form" display="flex" alignItems="center" justifyContent="center" 
        sx={{height: '80vh' }}>
            <div>
                <h5>Login</h5> 
                    <p>
                        <TextField id="outlined-basic" label="Username" value={username}/>
                    </p>
                    <p>
                        <TextField id="outlined-password-input" label="Password"
                        type="password" autoComplete="current-password"/>
                    </p>
                    <Button color="secondary" variant="contained">
                        Login
                    </Button>
            </div>
        </Box>
    )
}

export function Logout() {
    return (
        <Box sx={{height: '70vh' }}>
            <h1>You have logged out</h1>
        </Box>
    )
}