import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import { Avatar, Button, Card, CardActions, CardContent, Chip, Container, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';

import { Post } from './posts';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    boxShadow: 24,
    bgcolor: '#ffacbb',
    padding: 4,
    borderRadius: '3px',
};

const UserCard = (user) => {
    return (
        <Grid item xs={6} sm={4} md={3} key={user.userId}>
            <Card sx={{ bgcolor: '#e3f2fd' }} variant="outlined">
                <CardContent>
                    <Stack alignItems="center" spacing={1}>
                        <Avatar />
                        <Typography variant="body1">
                            {user.username}
                        </Typography>
                        <Typography variant="body2">
                            User ID: {user.userId}
                        </Typography>
                        <Stack direction="row" spacing={1}><Chip color={user.isAvailable ? "success" : "error"}
                            label={user.isAvailable ? "Available" : "Busy"} />
                            <Chip color={user.isCreator ? "info" : "secondary"}
                                label={user.isAvailable ? "Party Creator" : "Member"} /></Stack>

                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}

export const Party = (party) => {
    const uId = JSON.parse(window.localStorage.user).userId;
    const [games, setGames] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [gameId, setGameId] = React.useState(0);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [requestPrice, setRequestPrice] = React.useState(0);
    const [requestQty, setRequestQty] = React.useState(0);


    const handleOpen = () => {
        if (games.length === 0) {
            fetch(`http://localhost:8080/Gwm-war/webresources/party/games`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong');
                    }
                })
                .then((data) => {
                    setGames(data);
                    setGameId(data[0].gameId);
                });
        }
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    const createPost = () => {
        console.log('haha');
    }

    return (
        <Card sx={{ maxWidth: '800' }}>
            <Modal open={openModal} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">Create a Post</Typography>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Title"
                        value={title} onChange={(e) => setTitle(e.target.value)}>Post Title</TextField>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Description"
                        value={description} onChange={(e) => setDescription(e.target.value)}>Post Description</TextField>
                    <FormControl fullWidth variant="outlined" color="primary">
                        <InputLabel id="label">Game</InputLabel>
                        <Select label="Game" labelId="label" onChange={(e) => setGameId(e.target.value)}>
                            {games.map((game) => <MenuItem value={game.gameId}>{game.gameName}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button sx={{ width: '50%' }} onClick={handleClose} color="error" variant="contained">
                        Cancel
                    </Button>
                    <Button sx={{ width: '50%' }} onClick={createPost} color="success" variant="contained">
                        Create a Post
                    </Button>
                </Box>
            </Modal>

            <CardContent>
                <Typography variant="h5" component="div">
                    Party Id: {party.partyId}
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                    Party Invite Link: <Button color="primary" variant="filled" href={`https://${party.inviteLink}`} onClick={() => {
                        var otherWindow = window.open();
                        otherWindow.opener = null;
                        otherWindow.location = `https://${party.inviteLink}`;
                    }}>{party.inviteLink}</Button>
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Created by {party.partyOwner.username}
                </Typography>
                <Chip sx={{ margin: '2px' }} label={`Party created on ${party.partyStartTime.substring(0, 10)} at ${party.partyStartTime.substring(11, 16)}`} color="secondary" />
                <Typography sx={{ mt: 4 }} variant="body1">
                    Party Members
                </Typography>
                <Grid container spacing={2}>
                    {
                        party.users.map((user) => <UserCard {...user} isCreator={party.partyOwner === user} />)
                    }
                </Grid>
                <Typography sx={{ mt: 4 }} variant="body1">
                    Posts
                </Typography>
                <Grid container spacing={2}>
                    {
                        party.post === undefined
                            ? <Grid item xs={6} sm={4} key={1}>
                                <Typography variant="body2">You have no posts</Typography>
                                <Button sx={{ width: '50%' }} onClick={handleOpen} color="success" variant="contained">
                                    Create a Post
                                </Button>
                            </Grid>
                            : <Post {...party.post} />}
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained">Button</Button>
            </CardActions>
        </Card>
    )
}

export function Parties() {
    const [parties, setParties] = React.useState([]);
    const uId = JSON.parse(window.localStorage.user).userId;

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleSubmit = () => {
        try {
            fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/party`, {
                crossDomain: true
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong');
                    }
                })
                .then((data) => {
                    data[0].post = undefined;
                    setParties(data);
                    console.log(data);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box sx={{ bgcolor: '#e3f2fd', minHeight: '70vh', padding: 3 }}>
            <Container maxwidth="md">
                <h1>Party</h1>
                {
                    parties.map((party) => <Party key={party.partyId} {...party} />)
                }
            </Container>
        </Box>
    )
}