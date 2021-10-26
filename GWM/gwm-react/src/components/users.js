import React, { useEffect } from 'react';

import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';



export function Users() {
    const [query, setQuery] = React.useState("");
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        handleSubmit();
    }, [users]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        try {
            console.log(query);
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
                .then(response => response.json())
                
        }

        function unbanUser(userId) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'Ban User' })
            };
            fetch(`http://localhost:8080/Gwm-war/webresources/admin/unban/${userId}`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    setUsers(data);
                });
        }

        if (isAvailable)
            return (
                <button
                    variant="primary"
                    onClick={() => {
                        const confirmBox = window.confirm(
                            "Are you sure you want to ban this user?"
                        )
                        if (confirmBox === true) {
                            banUser(userId);
                        }
                    }}> Ban
                </button>
            )
        else {
            return (
                <button
                    variant="priamry"
                    onClick={() => {
                        const confirmBox = window.confirm(
                            "Are you sure you want to unban this user?"
                        )
                        if (confirmBox === true) {
                            unbanUser(userId);
                        }
                    }}> Unban
                </button>
            )
        }
    }

    return (
        <Box sx={{ bgcolor: '#e3f2fd', minHeight: '70vh' }}>
            <div className="container">
                <TextField id="outlined-basic" label="Enter username to serch for users" variant="filled" value={query}
                    onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} sx={{ minWidth: '60%' }} />
                <IconButton color="secondary" component="span" onClick={handleSubmit} sx={{ height: '60px', width: '60px' }}>
                    <Search />
                </IconButton>
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
        </Box >
    )
}