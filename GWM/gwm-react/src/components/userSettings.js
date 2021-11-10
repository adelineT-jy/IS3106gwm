import React, {useState, useEffect} from "react"; 
import {Box, Grid, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Tabs, Tab} from "@mui/material";
import {Switch, Route, useRouteMatch, Link} from "react-router-dom";
import {DatePicker} from "@mui/lab";
import moment from "moment";

import Api from "../helpers/Api.js";



export default function Settings() {

    let { path, url } = useRouteMatch(); 
    const [value, setValue] = useState(`${path}`);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box display="flex" justifyContent="center" sx={{ height: "85vh", padding: "5vh" }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} md={3}>
                            <Paper sx={{height: "80vh", padding: "4vh"}}>
                                <Typography variant="h6" sx={{paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                    Settings
                                </Typography>

                                <Tabs orientation="vertical" value={value} onChange={handleChange} variant='fullWidth' sx={{float: "left"}}>
                                    <Tab label="Profile" value={path} to={path} component={Link} sx={{fontWeight:"600", color: 'black', "&.Mui-selected": {color:"red"}, "&.hover": {color: "red", opacity: 1} }} />
                                    <Tab label="Cards" value={`${path}/cards`} to={`${path}/cards`} component={Link}  sx={{fontWeight:"600", color: "black", "&.Mui-selected": {color:"red"}}} />
                                </Tabs>
                            </Paper>
                        </Grid>

                        <Grid item xs={9} md={9}>
                            <Switch>
                                <Route exact path={`${path}/cards`} component={CardSettings}/>
                                <Route exact path={path} component={ProfileSettings}/>
                            </Switch>
           
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 
        </Box>
    );
}

export function CardSettings() {
    return (
        <Paper sx={{height: "80vh", padding: "4vh"}}>
            giao
            <Typography>What is going on</Typography>
        </Paper>
    );
}

export function ProfileSettings() {
    const uId =
      window.localStorage.user === undefined
        ? 0 : JSON.parse(window.localStorage.user).userId;
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState(moment("1990-01-01 00:00:00").toDate());
    const [gender, setGender] = useState(1);
    const [reload, setReload] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        Api.getUser(uId)
        .then((response) => response.json())
        .then((tempUser) => {
            const {email, username, dob, gender} = tempUser;
            setUsername(username);
            setEmail(email);
            setDob(moment(dob, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
            setGender(gender);
            setUser(tempUser);
            console.log(user);
        })
    },[reload]);

    const handleEdit = (event) => {
        event.preventDefault();
        console.log("editing user");
        const user = {userId: uId, email: email, username: username, dob: dob, gender: gender}
        console.log(user);
        Api.updateUserProfile(uId, user)
            .then((response) => {
                if(response.ok) {
                    console.log("ok");
                    return response.json();
                } else {
                    alert("Edit cannot be made");
                }
            }).then((tempUser) => {
                console.log(tempUser);
                setUser(tempUser);
            });

    }

    return (
        <Paper sx={{height: "80vh", padding: "4vh"}}>
            <Typography variant="h6" sx={{ paddingLeft: "1vh", paddingBottom: "2vh" }}>
                Profile Settings
            </Typography>
            <Grid container spacing={1}>
                <Grid xs={2} md={2} sx={{padding: "5vh", paddingLeft: "5vh"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} xm={12}>
                            <Typography variant="body1" sx={{ fontWeight: "500", paddingTop: "1vh", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={12} xm={12}>
                            <Typography variant="body1" sx={{ fontWeight: "500", paddingTop: "1vh", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                Username
                            </Typography>
                        </Grid>
                        <Grid item xs={12} xm={12}>
                            <Typography variant="body1" sx={{ fontWeight: "500", paddingTop: "1vh", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                Gender
                            </Typography>
                        </Grid>
                        <Grid item xs={12} xm={12}>
                            <Typography variant="body1" sx={{ fontWeight: "500", paddingTop: "3.5vh", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                Birthday
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={10} md={10} sx={{padding: "5vh"}}>
                    <Grid container spacing={3}>
                        <Grid item xs={8} xm={8}>
                            <TextField id="outlined-basic" size="small" label="Email"
                            value={email} required fullWidth
                            onChange={(event) => setEmail(event.target.value)} />
                        
                        </Grid>
                        <Grid item xs={8} xm={8}>
                            <TextField id="outlined-basic" size="small" label="username"
                            value={username} required fullWidth
                            onChange={(event) => setUsername(event.target.value)}/>
                        </Grid>
                        
                        <Grid item xs={8} xm={8}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={gender}
                                    onChange={(event) => setGender(event.target.value)}>
                                    <MenuItem value={0}>Female</MenuItem>
                                    <MenuItem value={1}>Male</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8} xm={8}>
                            <DatePicker
                                dateFormate="dd/MM/yyyy"
                                value={dob}
                                size="small"
                                label="Birthday"
                                onChange={(dob) => {
                                    setDob(dob);
                                }}
                                selected={dob}
                                renderInput={(params) => <TextField required {...params}/>}
                                />
                        </Grid>
                        <Grid item xs={8} xm={8}>
                            <Button color="secondary" variant="contained" onClick={handleEdit} sx={{float: "right"}}>
                                Confirm Edit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}