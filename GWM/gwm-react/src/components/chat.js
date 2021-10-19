import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function ChatBox() {
    return (
        <Box sx={{ bgcolor: '#bde1ff', height: '70vh' }}>
            <h1>Chatbox</h1>
        </Box>
    )
}

export default function Chat() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh', display: 'flex' }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <h1>Chat</h1>
                    <p>Chat side bar</p>
                </Grid>
                <Grid item xs={6} md={8}>
                    <ChatBox />
                </Grid>
            </Grid>
        </Box>
    )
}