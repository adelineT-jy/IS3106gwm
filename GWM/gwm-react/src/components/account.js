import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DatePicker } from "@mui/lab";

import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Paper,
    TextField,
    Typography,
    Select,
    Stack,
} from "@mui/material";

export function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    let history = useHistory();

    const handleRegister = (event) => {
        event.preventDefault();
        const user = {
            email: email,
            username: username,
            password: password,
            gender: gender,
            dob: dob,
        };
        fetch(`http://localhost:8080/Gwm-war/webresources/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            crossDomain: true,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } else {
                  return response.json();
                }
            })
            .then((data) => {
                if (data !== undefined) {
                    window.localStorage.setItem("user", JSON.stringify(data));
                    history.push("/posts");
                }
            })
            .catch((error) => {
                alert(error);
            });
    };
    return (
        <Box
            component="form"
            onSubmit={handleRegister}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            sx={{ height: "85vh", paddingRight: "11vh" }}
        >
            <Paper sx={{ width: "60vh", height: "75vh" }}>
                <Typography
                    variant="h6"
                    sx={{ padding: "5vh", paddingBottom: "3vh" }}
                >
                    Register
                </Typography>
                <Grid container spacing={2} display="flex">
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            value={email}
                            required
                            autoFocus
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            value={username}
                            required
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            required
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 195 }}>
                            <InputLabel id="demo-simple-select-helper-label">
                                Gender
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={gender}
                                label="Gender"
                                onChange={(event) =>
                                    setGender(event.target.value)
                                }
                            >
                                <MenuItem value={0}>Female</MenuItem>
                                <MenuItem value={1}>Male</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <DatePicker
                            label="Date of Birth"
                            value={dob}
                            onChange={(newDob) => {
                                setDob(newDob);
                            }}
                            inputProps={{
                              readOnly: true,
                             }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const handleLogin = (event) => {
        event.preventDefault();
        fetch(
            `http://localhost:8080/Gwm-war/webresources/users/login/${username}/${password}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                crossDomain: true,
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((data) => {
                window.localStorage.setItem("user", JSON.stringify(data));
                history.push("/posts");
            })
            .catch((error) => alert(error));
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            sx={{ height: "85vh" }}
        >
            <Paper sx={{ width: "45vh", height: "55vh" }}>
                <Stack
                    spacing={2}
                    sx={{ justifyContent: "center", margin: "8vh" }}
                >
                    <Typography variant="h6">Login</Typography>

                    <TextField
                        id="outlined-basic"
                        label="Username"
                        value={username}
                        required
                        autoFocus
                        onChange={(event) => setUsername(event.target.value)}
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
                    <Link
                        href="/register"
                        fontSize="small"
                        color="secondary"
                        fontWeight="bold"
                    >
                        Create an account
                    </Link>
                </Stack>
            </Paper>
        </Box>
    );
}

export function Logout() {
    const history = useHistory();
    window.localStorage.clear();

    useEffect(() => {
        setTimeout(function () {
            history.push("/");
        }, 3000);
    });

    return (
        <Box sx={{ minHeight: "83vh" }}>
            <Container>
                <h1>You have logged out.</h1>
                <p>You will be redirected in 3 seconds</p>
            </Container>
        </Box>
    );
}
