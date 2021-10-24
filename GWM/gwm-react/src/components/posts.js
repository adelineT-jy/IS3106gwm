import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, Chip, Grid, IconButton, Modal, Popover, Stack, TextField, Typography } from '@mui/material';
import Search from '@mui/icons-material/Search';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

import { Party } from './party';
import { dummyParty } from './party';

const dummyPost = {
    postId: 1,
    title: "test",
    userId: 1,
    postDate: "2021-10-22T12:00:00",
    description: "test",
    game: {
        gameName: "LOL",
        gameDescription: "Battle of Wits",
        gameDownloadLink: "https://lol.com",
        gameId: 1
    },
    requestPrice: 1,
    requestQty: 1,
    party: dummyParty,
    isAvailable: true,
}

const dummyPosts = [dummyPost, dummyPost, dummyPost, dummyPost]


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    boxShadow: 24,
    bgcolor: '#ff4655',
    padding: 2
};

function Request() {
    return (
        <h4>Request</h4>
    )
}

const Post = (post) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [gamePopover, setGamePopover] = React.useState(null);

    const [openParty, setOpenParty] = React.useState(false);
    const [partyPopover, setPartyPopover] = React.useState(null);
    const [text, setText] = React.useState("");

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
        setOpenParty(false);
    };

    function handleGamePopover(event, game) {
        setAnchorEl(event.currentTarget);
        setGamePopover(
            <Card sx={{ padding: 1 }}>
                <Stack spacing={1}>
                    <Typography variant="h6">{game.gameName}</Typography>
                    <Typography variant="body2">{game.gameDescription}</Typography>
                    <a href={`https://${game.gameDownloadLink}`} target='_blank'>Download game</a>
                </Stack>
            </Card>
        );
    };

    function handlePartyPopover(party) {
        setPartyPopover(
            <Party {...party} />
        )
        setOpenParty(true);
    }

    function submitRequest(post) {
        let uId;
        try {
            uId = JSON.parse(sessionStorage.user).id;
        }
        catch (e) {
            uId = 0;
            console.log(e);
        }

        const req = { text: text };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req),
        };
        fetch(`http://localhost:8080/Gwm-war/webresources/posts/${post.postId}/request/${uId}`, requestOptions)
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
        handleClose();
    }

    return (
        <Grid item xs={6} sm={4} md={3} lg={2} key={post.postId}>
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                transformOrigin={{ vertical: 'center', horizontal: 'center' }}>
                {gamePopover}
            </Popover>

            <Modal open={openParty} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle} centered>
                    {partyPopover}
                    <TextField sx={{ width: '100%', mt: 1 }} variant="outlined" placeholder="Type your request here!"
                        value={text} onChange={(e) => setText(e.target.value)}>Request Text</TextField>
                    <Button sx={{ width: '100%' }} onClick={() => submitRequest(post)}>
                        Request to Join Party
                    </Button>
                </Box>
            </Modal>

            <Card sx={{ maxWidth: '250px' }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                        Post Id: {post.postId}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Created by user{post.userId} on {post.postDate.slice(0, 10)} at {post.postDate.slice(11, 16)}
                    </Typography>
                    <Typography sx={{ mb: 4 }} variant="body1">
                        {post.description}
                    </Typography>

                    <Chip sx={{ margin: '2px' }} label={post.game.gameName} color="primary" onClick={(e) => handleGamePopover(e, post.game)} />
                    <Chip sx={{ margin: '2px' }} label={`Looking for ${post.requestQty}`} color="secondary" />
                    <Chip sx={{ margin: '2px' }} label={post.isAvailable ? "Available" : "Busy"}
                        color={post.isAvailable ? "success" : "error"}
                        icon={post.isAvailable ? <Check /> : <Close />} />
                    <Chip sx={{ margin: '2px' }} label={post.requestPrice === 0 ? "Free" : `Costs $${post.requestPrice}`}
                        color={post.requestPrice === 0 ? "info" : "warning"} />
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="filled" onClick={() => handlePartyPopover(post.party)}>View Party</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export function Posts() {
    const [query, setQuery] = React.useState("");
    const [posts, setPosts] = React.useState([]);

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        console.log(query);
        try {
            fetch(`http://localhost:8080/Gwm-war/webresources/posts/query?query=${query}`, {
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
                    setPosts(data);
                    setPosts(dummyPosts);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box sx={{ bgcolor: '#e3f2fd', minHeight: '70vh' }}>

            <Grid container spacing={2} sx={{ padding: '1em', width: '100%' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField id="outlined-basic" label="Search for Posts" variant="filled" value={query}
                        onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} sx={{ minWidth: '60%' }} />
                    <IconButton color="primary" component="span" onClick={handleSubmit} sx={{ height: '60px', width: '60px' }}>
                        <Search />
                    </IconButton>
                </Grid>
                {
                    posts.map((post) => <Post {...post} />)
                }
            </Grid>
        </Box>
    )
}

export function Requests() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
            <Request />
        </Box>
    )
}