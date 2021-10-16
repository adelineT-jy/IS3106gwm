import React from 'react';

import Box from '@mui/material/Box';

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
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
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