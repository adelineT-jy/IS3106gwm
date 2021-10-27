import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import { Avatar, Button, Card, CardActions, CardContent, Chip, Container, Grid, Link, Stack, Typography } from '@mui/material';

import { Post } from './posts';

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
    return (
        <Card sx={{ maxWidth: '800' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Party Id: {party.partyId}
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                    Party Invite Link: <a href={`https://${party.inviteLink}`} target='_blank'>{party.inviteLink}</a>
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
                    <Post {...party.post} />
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
            fetch(`http://localhost:8080/Gwm-war/webresources/party/parties/${uId}`, {
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
                    parties.map((party) => <Party {...party} />)
                }
            </Container>
        </Box>
    )
}