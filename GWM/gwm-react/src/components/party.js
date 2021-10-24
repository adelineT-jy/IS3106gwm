import React from 'react';

import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';

export const dummyParty = {
    chat: {},
    inviteLink: "gamewithme.com/1",
    partyStartTime: "2021-10-21T16:00:00Z[UTC]",
    partyEndTime: "2021-10-21T17:00:00Z[UTC]",
    partyId: 1,
    partyOwner: {
        userId: 1
    },
    requestQty: 1,
    review: [],
    users: [{
        userId: 1
    },]
};

export const Party = (party) => {
    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                    Party Id: {party.partyId}
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                    Party Invite Link: {party.partyInviteLink}
                </Typography>
                <Typography variant="h5" component="div">
                    This is a party
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Created by user{party.partyOwner.userId}
                </Typography>
                <Typography sx={{ mb: 4 }} variant="body1">
                    {party.description}
                </Typography>

                <Chip sx={{ margin: '2px' }} label="test" color="secondary" />
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button>Join Party</Button>
            </CardActions>
        </Card>
    )
}

export function Parties() {

    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh', padding: 3 }}>
            <h1>Party</h1>
            <Party {...dummyParty} />
        </Box>
    )
}