import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Box, FormControl, Link, InputLabel, Select, MenuItem, Typography, Paper, Grid, Avatar, Button, IconButton, Card, CardMedia, CardContent, CardActions, Modal, TextField} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import Api from "../helpers/Api.js";
import UserView, { modalStyle } from "./userView";

import lol from "../images/lol.jpeg"
import dota from "../images/dota.jpeg"
import cs from "../images/cs.jpeg"
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
        <Box sx={{ minHeight: "80vh" }}>
        <Typography variant="h1">Home</Typography>
      </Box>
    );
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    minHeight: 350,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

//Profile Page
export function Account() {
    const uId = window.localStorage.user === undefined
        ? 0
        : JSON.parse(window.localStorage.user).userId;

    //users attributes
    const [user, setUser] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [exp, setExp] = useState([]);
    
    //handle edit exp
    const [openModal, setOpenModal] = useState(false);
    const [expId, setExpId] = useState("");
    const [ranking, setRanking] = useState("");
    const [profileLink, setProfileLink] = useState("");
    const [reloadExp, setReloadExp] = useState(0);

    //add exp
    const [openAddExpModal, setOpenAddExpModal] = useState(false); 
    const [selectedGameId, setSelectedGameId] = useState(0);
    const [selectedGame, setSelectedGame] = useState("");
    const [games, setGames] = useState([]);

    //view followings 
    const [openFollowingModal, setOpenFollowingModal] = useState(false); 
    const [openFollowersModal, setOpenFollowersModal] = useState(false); 

    const [reload, setReload] = useState(0);
    let history = useHistory();
    
    function isUserFollowing(userId) {
            var result = following.filter(function (u) {
                return u.userId === userId;
            });
            if (result.length > 0) {
                return true;
            }
            return false;
        }


    const handleClose = () => {
        setOpenModal(false);
        setOpenAddExpModal(false);
        setOpenFollowingModal(false);
        setOpenFollowersModal(false);
        setRanking("");
        setProfileLink("");
        setSelectedGame("");
        
    };

    //load profile
    useEffect(() => {
        Api.getUser(uId)
        .then((response) => response.json())
        .then((tempUser) => {
            setUser(tempUser);
            // console.log(user);
        });

        Api.getUserFollowers(uId)
        .then((response) => response.json())
        .then((tempUsers) => {
            // console.log("followers:")
            setFollowers(tempUsers);
            // console.log(followers);
        });

        Api.getUserFollowings(uId)
        .then((response) => response.json())
        .then((tempUsers) => {
            // console.log("followings:")
            setFollowing(tempUsers);
            // console.log(followers);
        });
      }, [reload, uId]);

      //load experience
      useEffect(() => {
        Api.getUserExperiences(uId)
        .then((response) => response.json())
        .then((tempExp) => {
            // console.log(tempExp);
            setExp(tempExp);
        })
      }, [reloadExp, uId]);

      //load games
      useEffect(() => {
          Api.getAllGames()
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  alert("Retrieve games failed");
              }
          }).then((tempGames) => {
                setGames(tempGames);
                // console.log(games);
          }) 
      }, [openAddExpModal])
      
      //handle selectedGame
      useEffect(() => {
         setSelectedGame(games.filter((game => game.gameId === selectedGameId)));
      }, [selectedGameId, games])


    function handleEditExp(exp) {
        setExpId(exp.experienceId);
        setRanking(exp.ranking);
        setProfileLink(exp.profileLink);
        setOpenModal(true);
    }

    const submitEditexp = (event) => {
        event.preventDefault();
        const newExp = {
            experienceId:  expId,
            ranking: ranking,
            profileLink: profileLink
        }
        Api.editUserExperiences(uId, newExp)
        .then((response) => response.json())
        .then((tempExp) => {
            handleClose();
            setReloadExp(reloadExp + 1);
        });
    }

    const submitDeleteExp = (event) => {
        event.preventDefault();
        // console.log("delete" + expId);
        Api.deleteUserExperience(uId, expId)
        .then((response) => {
            if (response.ok) {
                return response.json;
            } else {
                alert("Delete failed");
            }
        })
        .then((response) => {
            handleClose();
            setReloadExp(reloadExp + 1);
        });
    }

    const submitAddExp = (event) => {
        event.preventDefault();
        // console.log("adding to game" + selectedGameId);
        const addExp = {
            ranking: ranking,
            profileLink: profileLink
        }
        Api.addUserExperience(uId, selectedGameId, addExp)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Adding Experience failed, experience for this game exists!");
            }
        }).then((data) => {
            handleClose();
            setReloadExp(reloadExp + 1);
        });
    }
    

    const submitFollow = (followId) => {
        console.log(uId + "" + followId);
        Api.addFollowing(uId, followId)
        .then((response) => {
            if (response.ok) {
                return response.json;
            } else {
                alert("Cannot follow");
            }
        })
        .then((response) => {
            isUserFollowing(followId);
            setReload(reload + 1);
        });
    }

    const submitUnfollow = (unfollowId) => {
        Api.unfollow(uId, unfollowId)
        .then((response) => {
            if (response.ok) {
                return response.json;
            } else {
                alert("Cannot unfollow");
            }
        })
        .then((response) => {
            setReload(reload + 1);
        });
    }

    return (
      <Box justifyContent="center" sx={{ minHeight: "110vh", padding: "5vh" }}>

        <Modal open={openModal} onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style} display="flex">
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <IconButton onClick={handleClose} sx={{float:"right"}}>
                            <CloseRoundedIcon/>
                        </IconButton>
                        <Typography variant="h6">Edit Experience</Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="outlined-basic"
                            label="Ranking"
                            value={ranking}
                            size="small"
                            fullWidth
                            required
                            onChange={(event) => setRanking(event.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="outlined-basic"
                            label="Profile Link"
                            size="small"
                            fullWidth
                            value={profileLink}
                            onChange={(event) => setProfileLink(event.target.value)}
                            />
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <IconButton onClick={submitDeleteExp}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Button onClick={submitEditexp} color="secondary" variant="contained" sx={{float:"right"}}>
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>

        <Modal open={openAddExpModal} onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style} display="flex">
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <IconButton onClick={handleClose} sx={{float:"right"}}>
                            <CloseRoundedIcon/>
                        </IconButton>
                        <Typography variant="h6">Add Experience</Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FormControl size="small" sx={{ width: "35vh"}}>
                            <InputLabel id="demo-simple-select-helper-label">
                                Game
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedGame.gameName}
                                label="Game"
                                onChange={(event) => {
                                    // console.log("chosengame:" + event.target.value);
                                    setSelectedGameId(event.target.value);
                                }}
                            >
                                {games.map((game) => (
                                     <MenuItem key={game.gameName} value={game.gameId}>{game.gameName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="outlined-basic"
                            label="Ranking"
                            value={ranking}
                            size="small"
                            fullWidth
                            error
                            required
                            onChange={(event) => setRanking(event.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="outlined-basic"
                            label="Profile Link"
                            size="small"
                            fullWidth
                            error
                            value={profileLink}
                            onChange={(event) => setProfileLink(event.target.value)}
                            />
                    </Grid>
                    <Grid item xs={4} md={4}>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Button onClick={submitAddExp} color="secondary" variant="contained" sx={{float:"right"}}>
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>

        <Modal open={openFollowingModal} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <IconButton onClick={handleClose} sx={{float:"right"}}>
                            <CloseRoundedIcon/>
                        </IconButton>
                        <Typography variant="h6">Following</Typography>
                        <hr/>
                    </Grid>
                    <Grid item xs={12} sx={{padding: "2vh"}}>
                        {(following.map((user) => (
                            <Fragment key={user.userId}>
                            <Grid container spacing={1} display="flex-end" justifyContent="center" alignItems="flex-end">
                                <Grid item xs={3} md={3}>
                                    <Avatar alt={user.username}/>
                                </Grid>
                                <Grid item xs={5} md={5}>
                                    <Typography variant="body1" sx={{fontWeight:500, color: "black"}}>
                                        <UserView uId={user.userId}/>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Button size="small" color="secondary" 
                                        variant="contained" onClick={() => submitUnfollow(user.userId)}>
                                        Unfollow
                                    </Button>
                                </Grid>
                            </Grid>
                            <hr/>
                            </Fragment>
                        )))}
                    </Grid>
                </Grid>
            </Box>
        </Modal>

        <Modal open={openFollowersModal} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <IconButton onClick={handleClose} sx={{float:"right"}}>
                            <CloseRoundedIcon/>
                        </IconButton>
                        <Typography variant="h6">Followers</Typography>
                        <hr/>
                    </Grid>
                    <Grid item xs={12} sx={{padding: "2vh"}}>
                        {(followers.map((user) => (
                            <Fragment key={user.userId}>
                            <Grid key={user.username} container spacing={1} display="flex-end" justifyContent="center" alignItems="flex-end">
                                <Grid item xs={3} md={3}>
                                    <Avatar alt={user.username}/>
                                </Grid>
                                <Grid item xs={5} md={5}>
                                    <Typography variant="body1" sx={{fontWeight:500}}>
                                        <UserView uId={user.userId}/>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                 {!isUserFollowing(user.userId) ? 
                                    (<Button variant="contained" size="small" 
                                            color="secondary" 
                                            sx={{float: "right"}}
                                            onClick={() => submitFollow(user.userId)}>
                                            Follow
                                        </Button>)
                                 
                                    :( <Button variant="contained" size="small" 
                                            color="secondary" 
                                            sx={{float: "right"}}
                                            onClick={() => submitUnfollow(user.userId)}>
                                            Unfollow
                                        </Button>) }
                                </Grid>
                            </Grid>
                            <hr/>
                            </Fragment>
                        )))}
                    </Grid>
                </Grid>
            </Box>
        </Modal>




        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{fontWeight: "500", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                        My Profile
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{height: "33vh", padding: "5vh"}}>
                    <Grid container spacing={10}>
                    <Grid item xs={2} md={2} >
                        <Avatar alt="Profile Pic" src={logo}
                                sx={{width: "18vh", height: "18vh"}}/>
                    </Grid>
                    <Grid item xs={10} md={10}>
                        <Button variant="contained" endIcon={<SettingsIcon/>} color="secondary" sx={{float: "right"}}  onClick={()=> {history.push("/account/settings")}}>
                            Settings
                        </Button>
                        <Typography variant="h5" sx={{fontWeight: "500"}}>
                           {user.username}
                        </Typography>
                        <Typography variant="body1" sx={{ paddingTop: "2vh"}}>
                            Gender: <b>{user.gender === 0 ? "F" : "M"}</b>
                        </Typography>
                        

                        <Link component="button" variant="body1" onClick={() => {setReload(reload + 1); setOpenFollowersModal(true);}}>
                            <Typography sx={{ paddingTop: "2vh", color: "black"}}>
                                Followers: <b>{followers.length}</b> &nbsp; 
                            </Typography>
                        </Link>

                        <Link component="button" variant="body1" onClick={() => {setReload(reload + 1); setOpenFollowingModal(true);}}>
                            <Typography sx={{ paddingTop: "2vh", color: "black"}}>
                                Following: <b>{following.length}</b>
                            </Typography>
                        </Link>


                        {/* <Typography variant="body1" sx={{ paddingTop: "2vh"}}>
                            Ratings: <b>5 coming soon</b>
                            <StarIcon sx={{color: "#f2bd0c", paddingBottom:"0.5vh"}} />
                        </Typography> */}
                    </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{padding: "5vh"}}>
                    <Grid container spacing={1}>
                        <Grid item xs={8} md={8}>
                            <Typography variant="h5" sx={{ fontWeight:"500", paddingBottom: "4vh", paddingLeft: "1vh"}}>
                                Experiences
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Button variant="contained" color="secondary" sx={{float: "right"}} size="small" onClick={() => setOpenAddExpModal(true)}>
                                Add Experience
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{paddingLeft: "9vh"}}>
                            {exp.map((eachExp) => (
                                <Fragment key={eachExp.game.gameId}>
                                <Grid item xs={4} md={4} key={eachExp.experienceId}>
                                    <Card sx={{maxWidth: "53vh"}}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={eachExp.game.gameName === "Dota 2" ? dota : (eachExp.game.gameName === "League of Legends" ? lol : cs)}
                                        alt="Game"/>
                                    <CardContent sx={{paddingLeft: "4vh", paddingBottom: "1vh"}}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {eachExp.game.gameName}
                                        </Typography>
                                        <Typography variant="body1">
                                            <b>Ranking:</b> {eachExp.ranking}
                                        </Typography>
                                        <Typography variant="body1">
                                            <b>Profile Link:</b> {eachExp.profileLink}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{float:"right", paddingTop: "0vh"}}>
                                        <Button variant="contained" color="secondary" size="small" onClick={() => handleEditExp(eachExp)}>
                                            Edit
                                        </Button>
                                    </CardActions>
                                    </Card>
                                </Grid>
                             </Fragment>
                            ))}
                            {exp.length === 0 ? 
                                <Typography variant="body1" sx={{paddingLeft: "0vh"}}> 
                                    Add experiences now to show others how pro you are!
                                </Typography> 
                                : null}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
      </Box>
    );
  }
  