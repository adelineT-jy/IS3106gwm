import React from 'react';

import Box from '@mui/material/Box';

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

export default function Home() {
    return (
        <Box sx={{ height: '90vh'}}>
            <Listing />
        </Box>
    )
}