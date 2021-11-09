import React, { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Box, Typography, Paper, Grid, Avatar, Button} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Api from "../helpers/Api.js";

import logo from "../images/gwm.jpg"

export default function Users() {
    return (
        <Box sx={{ minHeight: '80vh' }}>
            
        </Box >
    )
}

//current profile
export function UserProfile() {
    return ( 
        <Box sx={{ height: "80vh" }}>
        <Typography variant="h1">Home</Typography>
      </Box>
    );
}



//Profile Page
export function Account() {
    console.log("rendering");
    const uId =
      window.localStorage.user === undefined
        ? 0
        : JSON.parse(window.localStorage.user).userId;

    console.log("User id: " + uId);
    //users attributes
    const [user, setUser] = useState([]);

    const [cId, setCId] = useState(null);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [parties, setParties] = useState([]);
  
    const [name, setName] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
  
    const [reload, setReload] = useState(0);

    let history = useHistory();


    useEffect(() => {
        Api.getUser(uId)
        .then((response) => response.json())
        .then((tempUser) => {
            setUser(tempUser);
            console.log(user);
        });

        Api.getUserFollowers(uId)
        .then((response) => response.json())
        .then((tempUsers) => {
            console.log("followers:")
            setFollowers(tempUsers);
            console.log(followers);
        });

        Api.getUserFollowings(uId)
        .then((response) => response.json())
        .then((tempUsers) => {
            console.log("followings:")
            setFollowing(tempUsers);
            console.log(followers);
        });
      }, [reload]);
  
    const addCard = () => {
      const card = {
        cardNum: cardNumber,
        name: name,
        cvv: cvv,
        expDate: expiryDate,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
        crossDomain: true,
      };
      fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/cards`, {
        requestOptions,
      })
        .then((response) => response.json())
        .then((tempUser) => {
          setUser(tempUser);
        });
    };
  
    const deleteCard = () => {
      const requestOptions = {
        method: "DELETE",
        crossDomain: true,
      };
      fetch(
        `http://localhost:8080/Gwm-war/webresources/users/${uId}/cards/${cId}`,
        {
          requestOptions,
        }
      )
        .then((response) => response.json())
        .then((tempUser) => {
          setUser(tempUser);
        });
    };
  
    const getUserFollowing = () => {
      fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/following`)
        .then((response) => response.json())
        .then((follow) => setFollowing(follow));
    };
    
    const getParties = () => {
      fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/party`)
        .then((response) => response.json())
        .then((tempParties) => setParties(tempParties));
    };
  
    return (
      <Box display="flex" justifyContent="center" sx={{ height: "100vh", padding: "5vh" }}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ paddingLeft: "1vh", paddingBottom: "2vh" }}>
                        My Profile
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{height: "30vh", padding: "5vh"}}>
                    <Grid container spacing={10}>
                    <Grid item xs={2} md={2} >
                        <Avatar alt="Profile Pic" src={logo}
                                sx={{width: "18vh", height: "18vh"}}/>
                    </Grid>
                    <Grid item xs={10} md={10}>
                        <Button variant="contained" endIcon={<SettingsIcon/>} color="secondary" sx={{float: "right"}}>
                            Settings
                        </Button>
                        <Typography variant="h5" sx={{fontWeight: "500"}}>
                           {user.username}
                        </Typography>
                        <Typography variant="body1" sx={{ paddingTop: "2vh"}}>
                            Followers: <b>{followers.length}</b> &nbsp; Following: <b>{following.length}</b>
                        </Typography>
                        <Typography variant="body1" sx={{ paddingTop: "2vh"}}>
                            Ratings: <b>5 to be completed</b> 
                        </Typography>
                    </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{height: "40vh"}}>
                    <Typography variant="h6" sx={{ padding: "4vh", paddingBottom: "3vh" }}>
                        Reviews
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
      </Box>
    );
  }
  