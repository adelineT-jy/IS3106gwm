import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, Chip, Grid, IconButton, Link, Popover, Stack, TextField, Typography } from '@mui/material';
import Search from '@mui/icons-material/Search';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

function Request() {
    return (
        <h4>Request</h4>
    )
}

function Post() {
    return (
        <p>This is a post</p>
    )
}

function Listing() {
    return (
        <div>
            <h3>This is a listing</h3>
            <Post />
        </div>
    )
}

export function Posts() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [query, setQuery] = React.useState("");
    const [posts, setPosts] = React.useState([]);
    const [gamePopover, setGamePopover] = React.useState(null);

    useEffect(() => {
        handleSubmit();
    }, []);

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

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleSubmit() {
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
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                {gamePopover}
            </Popover>
            <Grid container spacing={3} sx={{ margin: '10px' }}>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <TextField id="outlined-basic" label="Search for Posts" variant="standard" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <IconButton color="primary" component="span" onClick={handleSubmit}>
                        <Search />
                    </IconButton>
                </Grid>
                {
                    posts.map((post) =>
                        <Grid item xs={6} sm={4} md={3} key={post.postId}>
                            <Card sx={{ minWidth: 275 }}>
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
                                    <Button size="small">Request to Join</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
            <Listing />
            <Request />
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