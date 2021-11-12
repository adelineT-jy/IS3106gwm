import React, { Fragment, useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Typography,
    Paper,
    Link,
    Modal,
} from "@mui/material";
import Api from "../helpers/Api.js";
import lol from "../images/lol.jpeg"
import dota from "../images/dota.jpeg"
import cs from "../images/cs.jpeg"
import logo from "../images/gwm.jpg"

export const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 450,
    boxShadow: 12,
    bgcolor: "background.paper",
    padding: 4,
    borderRadius: "3px",
    border: '1px solid #000',
};

export default function UserView(props) {
    const { uId } = props;
    const [user, setUser] = useState({ username: "Loading", followers: [], following: [] });
    const [openModal, setOpenModal] = useState(false);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [exp, setExp] = useState([]);
    const [reload, setReload] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    const currentUId = window.localStorage.user === undefined
        ? 0
        : JSON.parse(window.localStorage.user).userId;

    useEffect(() => {
        Api.getUser(uId)
        .then((response) => response.json())
        .then((tempUser) => {
            setUser(tempUser);
        });

        Api.getUserFollowers(uId)
        .then((response) => response.json())
        .then((tempUsers) => {
            setFollowers(tempUsers);
            if (tempUsers.filter(u => u.userId === currentUId).length > 0) {
                setIsFollowing(true);
            }
        });

        Api.getUserFollowings(uId)
        .then((response) => response.json())
        .then((tempUsers) => {
            setFollowing(tempUsers);
        });

        Api.getUserExperiences(uId)
        .then((response) => response.json())
        .then((tempExp) => {
            setExp(tempExp);
        });
      }, [reload, currentUId, uId]);

      

    const handleOpen = (event) => {
        event.preventDefault();
        setOpenModal(true);
    };

    const handleClose = (event) => {
        setOpenModal(false);
    };

    const submitFollow = () => {
        Api.addFollowing(currentUId, uId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Follow failed");
            }
        })
        .then((response) => {
            setIsFollowing(true);
            setReload(reload + 1);
        });
    };

    const submitUnfollow = () => {
        Api.unfollow(currentUId, uId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Cannot unfollow");
            }
        })
        .then((response) => {
            setIsFollowing(false);
            setReload(reload + 1);
        });
    }

    return (
        <>
            <Link color="secondary" underline="hover" onClick={handleOpen}>
                {user.username}
            </Link>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <Box sx={modalStyle} centered>
                    <List sx={{ width: "100%" }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.username}
                                secondary={`Gender: ${user.gender === 0 ? "F" : "M"}`}
                            />
                        </ListItem>
                        <ListItem>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={2}
                            >
                                <Chip label={user.isAvailable ? "Available" : "Busy"} color={user.isAvailable ? "success" : "warning"}/>
                            </Stack>
                        </ListItem>
                    </List>
                    <Button
                        sx={{ width: "50%" }}
                        onClick={submitFollow}
                        color="info"
                        variant="contained"
                    >
                        Follow
                    </Button>
                </Box> */}
                <Box sx={modalStyle} centered>
                    <Grid container spacing={2}>
                        <Paper sx={{ width: "100vh", padding: "2vh"}}>
                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ fontWeight:"500", paddingBottom: "4vh", paddingLeft: "1vh"}}>
                                    Profile
                                </Typography>
                                <Grid container spacing={8}>
                                    <Grid item xs={2} md={2} >
                                        <Avatar alt="Profile Pic" src={logo}
                                                sx={{width: "10vh", height: "10vh"}}/>
                                    </Grid>
                                    <Grid item xs={10} md={10}>
                                        {!isFollowing ? 
                                            (<Button variant="contained" size="small" 
                                                endIcon={<AddIcon/>} color="secondary" 
                                                sx={{float: "right"}}
                                                onClick={() => submitFollow()}>
                                                Follow
                                            </Button>) :
                                            (<Button variant="contained" size="small" 
                                                endIcon={<AddIcon/>} color="secondary" 
                                                sx={{float: "right"}}
                                                onClick={() => submitUnfollow()}>
                                                Unfollow
                                            </Button>)}
                                        <Typography variant="h6" sx={{fontWeight: "500"}}>
                                        {user.username}
                                        </Typography>
                                        <Typography variant="body1" sx={{ paddingTop: "2vh"}}>
                                            Gender: <b>{user.gender === 0 ? "F" : "M"}</b>
                                        </Typography>
                                        <Typography variant="body1" sx={{ paddingTop: "2vh"}}>
                                            Followers: <b>{followers.length}</b> &nbsp; Following: <b>{following.length}</b>
                                        </Typography>
                                        <Typography variant="body1" sx={{ paddingTop: "2vh"}}>
                                            Ratings: <b>coming soon</b>
                                            <StarIcon sx={{color: "#f2bd0c", paddingBottom:"0.5vh"}} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <hr/>
                                <Typography variant="body1" sx={{ fontWeight:"500", paddingBottom: "4vh", paddingLeft: "1vh"}}>
                                    Experiences
                                </Typography>

                                {exp.map((eachExp) => (
                                <Fragment key={eachExp.game.gameId}>
                                <Grid item xs={12} md={12} key={eachExp.experienceId}>
                                    <Card sx={{maxWidth: "40vh"}}>
                                    <CardMedia
                                        component="img"
                                        height="120"
                                        image={eachExp.game.gameName === "Dota 2" ? dota : (eachExp.game.gameName === "League of Legends" ? lol : cs)}
                                        alt="Game"/>
                                    <CardContent sx={{paddingLeft: "4vh", paddingBottom: "1vh"}}>
                                        <Typography gutterBottom variant="body1" component="div">
                                            <b>{eachExp.game.gameName}</b>
                                        </Typography>
                                        <Typography variant="body1">
                                            <b>Ranking:</b> {eachExp.ranking}
                                        </Typography>
                                        <Typography variant="body1">
                                            <b>Profile Link:</b> {eachExp.profileLink}
                                        </Typography>
                                    </CardContent>
                                    </Card>
                                </Grid>
                             </Fragment>
                            ))}
                            {exp.length === 0 ? <Typography variant="body1" sx={{paddingLeft: "1vh"}}> No Experiences added</Typography>: null}
                            </Grid>
                        </Paper>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}
