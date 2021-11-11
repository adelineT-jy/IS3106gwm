import React, {useState, useEffect} from "react"; 
import {Box, IconButton, Card, Collapse, Grid, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Tabs, Tab, CardContent, CardHeader, CardActions} from "@mui/material";
import {Switch, Route, useRouteMatch, Link} from "react-router-dom";
import { styled } from '@mui/material/styles';
import {DatePicker} from "@mui/lab";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";

import Api from "../helpers/Api.js";
import MasterCard from "../images/mastercard.png"



export default function Settings() {

    let { path, url } = useRouteMatch(); 
    const [value, setValue] = useState(`${path}`);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box display="flex" justifyContent="center" sx={{ height: "200vh", padding: "5vh" }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} md={3}>
                            <Paper sx={{height: "95vh", padding: "4vh"}}>
                                <Typography variant="h6" sx={{paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                    Settings
                                </Typography>
                                <Tabs orientation="vertical" value={value} onChange={handleChange} variant='fullWidth' sx={{float: "left"}}>
                                    <Tab label="Profile" value={path} to={path} component={Link} sx={{fontWeight:"600", color: 'black', "&.Mui-selected": {color:"red"}, "&.hover": {color: "red", opacity: 1} }} />
                                    <Tab label="Finance" value={`${path}/cards`} to={`${path}/cards`} component={Link}  sx={{fontWeight:"600", color: "black", "&.Mui-selected": {color:"red"}}} />
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

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export function CardSettings() {
    const [user, setUser] = useState([]);
    const [balance, setBalance] = useState("");
    const [reloadWallet, reloadCard] = useState("");
    const [cards, setCards] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const uId =
      window.localStorage.user === undefined
        ? 0 : JSON.parse(window.localStorage.user).userId;
    
    useEffect(() => {
        Api.getUser(uId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Retrieving wallet failed");
            }
            }).then((tempUser) => {
                setBalance(tempUser.wallet);
                setCards(tempUser.cards);
                console.log(cards);
        });

    }, [reloadWallet]);

    //card expand more
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return (
        <Paper sx={{height: "150vh", padding: "5vh"}}>
            <Typography variant="h6" sx={{ paddingLeft: "1vh", paddingBottom: "2vh" }}>
                Finance
            </Typography>
            
            <Grid container spacing={2}>
               
                <Grid item xs={6}>
                    <Card sx={{width: "45vh", height: "35vh", padding: "3vh", paddingTop:"2vh"}}>
                        <CardContent variant="outlined">
                            <Grid container spacing={2}>
                                <Grid item xs={8} md={8}>
                                    <Typography variant="body1" sx={{fontWeight: "550", color: "secondary.main"}}>
                                        Wallet
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <AccountBalanceWalletIcon sx={{float: "right", color:"grey"}}/>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="body1" sx={{fontWeight: "400", color: "#4c524d"}}>
                                        Balance Amount
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h4">
                                        ${balance} 
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} md={7}>
                                </Grid>
                                <Grid item xs={5} md={5}>
                                    <Button variant="outlined" color="error" size="small" sx={{float:"right"}}>
                                        Top up
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Credit Cards
                    </Typography>
                </Grid>
                {cards.map((card) => (
                    <>
                    <Grid item xs={12}>
                        <Card sx={{width: "52vh", padding: "2vh", paddingTop:"2vh", backgroundColor: "#2c2e2d"}}>
                            <CardContent variant="outlined" sx={{paddingBottom:"0"}}>
                                <Grid container spacing={1.2}>
                                    <Grid item xs={8} md={8}>
                                        <CreditCardIcon fontSize="large" sx={{color:"white"}}/>
                                    </Grid>
                                    <Grid item xs={4} md={4} >
                                        <IconButton aria-label="delete" size="large" sx={{float: "right", paddingTop: "0vh", paddingRight: "0vh"}}>
                                            <DeleteIcon fontSize="small" sx={{color: "#a1a6a2"}}/>
                                        </IconButton>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="body1" sx={{fontWeight: "500", color: "white"}}>
                                            {card.cardNum}
                                        </Typography>
                                    </Grid>
                                    <br/>
                                    <br/>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant="body1" sx={{fontWeight: "400", color: "white"}}>
                                            {card.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                    <img src={MasterCard}  width="50" style={{float: "right"}}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions sx={{paddingTop: "0vh"}}>
                                <ExpandMore expand={expanded}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more">
                                    <ExpandMoreIcon size="large" sx={{color: "#fff"}}/>
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent sx={{padding: "1vh", paddingLeft: "2vh", paddingTop: "0vh"}}>
                                    <Typography sx={{color: "#fff", fontWeight: "400"}}>
                                        <b>Cvv:</b> {card.cvv} &nbsp; &nbsp; <b>Exp:</b> {card.expDate}
                                    </Typography>
                                   
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                    </>
                ))}
            </Grid> 

             
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