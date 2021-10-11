import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

export default function Header() {
    return (
        <Box sx={{ bgcolor: '#64b5f6', height: '20vh' }}>
            <Grid container spacing={2}>
                <Grid item xs={8} md={9}>
                    <h1>Game With Me</h1>
                </Grid>
                <Grid item xs={4} md={3}>
                    <Stack spacing={2} direction="row">
                        <Button variant="text" href="/login">Sign In</Button>
                        <Button variant="text" href="/register">Sign Up</Button>
                    </Stack>
                </Grid>
            </Grid>
            
        </Box>
    );
}