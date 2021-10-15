import React from 'react';

import Box from '@mui/material/Box';

function RequestManager() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '20vh' }}>
            <h1>Request Manager</h1>
        </Box>
    )
}

function PartyManager() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '20vh' }}>
            <h1>Party Manager</h1>
        </Box>
    )
}

function UserManager() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '20vh' }}>
            <h1>User Manager</h1>
        </Box>
    )
}

export function AdminTools() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
            <RequestManager />
            <PartyManager />
            <UserManager />
        </Box>
    )
}