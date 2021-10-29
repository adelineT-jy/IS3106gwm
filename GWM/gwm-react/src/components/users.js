import React, { useEffect } from 'react';

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';



export function Users() {
    const [query, setQuery] = React.useState("");
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleSubmit = () => {
        try {
            fetch(`http://localhost:8080/Gwm-war/webresources/users/query?name=${query}`, {
                crossDomain: true
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Please enter username as search condition');
                    }
                })
                .then((data) => {
                    setUsers(data);
                });
        } catch (e) {
            console.log(e);
        }
    }

    function BanUnban(props) {
        const { userId, isAvailable } = props.user

        function banUser(userId) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Ban User' })
            };
            fetch(`http://localhost:8080/Gwm-war/webresources/admin/ban/${userId}`, requestOptions)
                .then(handleSubmit)
        }

        function unbanUser(userId) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Unban User' })
            };
            fetch(`http://localhost:8080/Gwm-war/webresources/admin/unban/${userId}`, requestOptions)
                .then(handleSubmit)

        }

        if (isAvailable)
            return (
                <Button
                    variant="contained"
                    onClick={() => {
                        const confirmBox = window.confirm(
                            "Are you sure you want to ban this user?"
                        )
                        if (confirmBox === true) {
                            banUser(userId);
                        }
                    }}> Ban
                </Button>
            )
        else {
            return (
                <Button
                    variant="contained"
                    onClick={() => {
                        const confirmBox = window.confirm(
                            "Are you sure you want to unban this user?"
                        )
                        if (confirmBox === true) {
                            unbanUser(userId);
                        }
                    }}> Unban
                </Button>
            )
        }
    }

    return (
        <div className="container">
            <h1>Users Manager</h1>
            <TextField id="outlined-basic" placeholder="Search" variant="filled" value={query}
                onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSubmit} sx={{ minWidth: '100%' }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>userId</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Email Address</TableCell>
                            <TableCell align="right">Wallet Amount</TableCell>
                            <TableCell align="right">Ban / Unban</TableCell>
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
                                <TableCell align="right">{user.username} (popover to display user profile)</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.wallet}</TableCell>
                                <TableCell align="right"><BanUnban user={user} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}