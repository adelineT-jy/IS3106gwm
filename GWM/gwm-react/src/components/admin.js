import React from "react";
import { useHistory } from "react-router-dom";

import { Box, Button, Paper, TextField, Typography, Stack, } from "@mui/material";

export function AdminLogin() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    let history = useHistory();

    const handleLogin = (event) => {
        event.preventDefault();
        fetch(
            `http://localhost:8080/Gwm-war/webresources/admin/login/${email}/${password}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                crossDomain: true,
            }
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((data) => {
                window.localStorage.setItem("admin", JSON.stringify(data));
                history.push("/admin/posts");
            })
            .catch((error) => {
                alert(error)
            });
    }

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            sx={{ minHeight: "89vh" }}
        >
            <Paper sx={{ width: "45vh", height: "55vh" }}>
                <Stack spacing={2} sx={{ justifyContent: "center", margin: "8vh" }}>
                    <Typography variant="h6">Administrator Login</Typography>

                    <TextField
                        id="outlined-basic"
                        label="Email"
                        value={email}
                        required
                        autoFocus
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        required
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Button color="secondary" variant="contained" type="submit">
                        Login
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}