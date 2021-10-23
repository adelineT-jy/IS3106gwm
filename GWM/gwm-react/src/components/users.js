    import React from 'react';

    import Box from '@mui/material/Box';

    export function Profile() {
        return (
            <Box sx={{height: '70vh' }}>
                <h1>Someone's account here</h1>
            </Box>
        )
    }

    export function Users() {
        return (
            <Box sx={{height: '70vh' }}>
                <Profile />
            </Box >
        )
    }