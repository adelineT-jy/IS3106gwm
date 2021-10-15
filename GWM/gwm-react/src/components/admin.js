import React from 'react';

import Box from '@mui/material/Box';

function AdminPost() {
    return (
        <p>This is a post</p>
    )
}

function AdminListing() {
    return (
        <div>
            <h3>This is a listing</h3>
            <AdminPost />
        </div>
    )
}

export default function AdminPosts() {
    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh' }}>
            <AdminListing />
        </Box>
    )
}