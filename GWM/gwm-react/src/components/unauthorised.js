import React from 'react'
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export function PageNotFound() {
    return (
        <Box sx={{bgcolor: '#e3f2fd', minHeight: '80vh' }}>
            <h1>404 - Not Found!</h1>
            <Link to="/">
                Go Home
            </Link>
        </Box>
    );
}

export function Unauthorised() {
    return (
        <Box sx={{bgcolor: '#e3f2fd', minHeight: '80vh' }}>
            <h1>Please login to access this page!</h1>
            <Link to="/login">
                Login
            </Link>
        </Box>
    );
}