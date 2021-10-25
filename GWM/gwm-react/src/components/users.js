import React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function Users() {
    const [users, setUsers] = React.useState([]);

    try {
        fetch(`http://localhost:8080/Gwm-war/webresources/users`, {
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
                setUsers(data);
            });
    } catch (e) {
        console.log(e);
    }

    return (
        <Box sx={{ bgcolor: '#e3f2fd', minHeight: '70vh' }}>
            <div className="container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>userId</TableCell>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">Email Address</TableCell>
                                <TableCell align="right">Wallet Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.userId}
                                    </TableCell>
                                    <TableCell align="right">{user.username}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.wallet}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box >
    )
}