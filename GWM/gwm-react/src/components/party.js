import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import { Avatar, Button, Card, CardActions, CardContent, Chip, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';

import { Post } from './posts';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    boxShadow: 24,
    bgcolor: '#ffffff',
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
    const [requestSign, setRequestSign] = React.useState(0);
    const [requestPrice, setRequestPrice] = React.useState(0);
    const [requestQty, setRequestQty] = React.useState(1);

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
        if (party.post !== undefined) {
            setTitle(party.post.title);
            setDescription(party.post.description);
            setGameId(party.post.game.gameId);
            setRequestQty(party.post.requestQty);
            setRequestPrice(Math.abs(party.post.requestPrice));
            setRequestSign(party.post.requestPrice === 0 ? 0 : party.post.requestPrice / requestPrice);
        }
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleRequestQty = (e) => {
        if (e.target.value > 0) {
            setRequestQty(e.target.value);
        }
    }

    const handleRequestPrice = (e) => {
        if (e.target.value > 0) {
            setRequestPrice(e.target.value);
        }
    }

    const savePost = () => {
        const post = { title: title, userId: uId, description: description, requestPrice: requestSign * requestPrice, requestQty: requestQty };
        const editString = party.post === undefined ? "" : `/post/${party.post.postId}`;
        const requestOptions = {
            method: party.post === undefined ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        };
        fetch(`http://localhost:8080/Gwm-war/webresources/party/${party.partyId}${editString}/users/${uId}/games/${gameId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request cannot be made');
                }
            })
            .catch((error) => {
                console.log(error)
            });
        window.location.reload(false);
    }

    const deletePost = () => {
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(`http://localhost:8080/Gwm-war/webresources/party/${party.partyId}/post/${party.post.postId}/deleteBy/${uId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request cannot be made');
                }
            })
            .catch((error) => {
                console.log(error)
            });
        window.location.reload(false);
    }

    return (
        <Card sx={{ maxWidth: '800' }}>
            <Modal open={openModal} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">{party.post === undefined ? "Create a " : "Edit your "} Post</Typography>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Title"
                        value={title} onChange={(e) => setTitle(e.target.value)}>Post Title</TextField>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Description"
                        value={description} onChange={(e) => setDescription(e.target.value)}>Post Description</TextField>
                    <FormControl fullWidth variant="outlined" color="primary">
                        <InputLabel id="label">Game</InputLabel>
                        <Select value={gameId} label="Game" labelId="label" onChange={(e) => setGameId(e.target.value)}>
                            {games.map((game) => <MenuItem key={game.gameId} value={game.gameId}>{game.gameName}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Typography variant="body2">Number of members needed</Typography>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} type="number" variant="outlined" placeholder="Requested Quantity"
                        value={requestQty} onChange={handleRequestQty}>How many players do you need?</TextField>
                    <Stack direction="row" spacing={1}>
                        <Button sx={{ width: '33%' }} onClick={() => setRequestSign(1)} color="error" variant="contained">
                            Pay to join
                        </Button>
                        <Button sx={{ width: '33%' }} onClick={() => { setRequestSign(0); setRequestPrice(0) }} color="info" variant="contained">
                            Make it free
                        </Button>
                        <Button sx={{ width: '33%' }} onClick={() => setRequestSign(-1)} color="success" variant="contained">
                            Offer to join
                        </Button>
                    </Stack>
                    <TextField disabled={requestSign === 0} sx={{ width: '100%', mt: 1, mb: 2 }} type="number" variant="outlined" placeholder="Requested Price"
                        value={requestPrice} onChange={handleRequestPrice} InputProps={{
                            startAdornment: <InputAdornment position="start">You will {requestSign >= 0 ? "earn" : "offer"}</InputAdornment>,
                            endAdornment: <InputAdornment position="start"> Gratitude</InputAdornment>,
                        }} />
                    <Button sx={{ width: '50%' }} onClick={handleClose} color="error" variant="contained">
                        Cancel
                    </Button>
                    <Button sx={{ width: '50%' }} onClick={savePost} color="success" variant="contained">
                        Save Post
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
                        party.users.map((user) => <UserCard key={user.userId} {...user} isCreator={party.partyOwner === user} />)
                    }
                </Grid>
                <Typography sx={{ mt: 4 }} variant="body1">
                    Posts
                </Typography>
                <Grid container spacing={2}>
                    {
                        party.post === undefined
                            ? <Grid item xs={6} sm={4}>
                                <Typography variant="body2">You have no posts</Typography>

                            </Grid>
                            : <Post {...party.post} request={false} />}
                </Grid>
                <Stack spacing={1}>
                    <Button sx={{ width: '50%' }} onClick={handleOpen} color={party.post === undefined ? "success" : "warning"} variant="contained">
                        {party.post === undefined ? "Create a " : "Edit your "} Post
                    </Button>
                    {party.post === undefined ? null :
                        <Button sx={{ width: '50%' }} onClick={deletePost} color="error" variant="contained">
                            Delete your Post
                        </Button>
                    }
                </Stack>
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
                    setParties(data);
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