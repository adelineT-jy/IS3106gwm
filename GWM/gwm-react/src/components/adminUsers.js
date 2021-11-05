import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, IconButton, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Paper } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Search } from '@mui/icons-material';

export default function AdminUsers() {
    const [reload, setReload] = React.useState(0);
    const [query, setQuery] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('userId');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
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
    }, [reload]);

    const handleSubmit = () => {
        setReload(reload + 1);
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

        if (isAvailable) {
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
        }
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

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        {
            id: 'userId',
            numeric: false,
            label: 'User Id',
        },
        {
            id: 'username',
            numeric: true,
            label: 'Username',
        },
        {
            id: 'email',
            numeric: true,
            label: 'Email Address',
        },
        {
            id: 'wallet',
            numeric: true,
            label: 'Wallet Amount ($)',
        },
        {
            id: 'ban',
            numeric: true,
            label: 'Ban / Unban',
        },
    ]

    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    return (
        <Box sx={{ minHeight: '80vh', width: '100%' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <h1>User Manager</h1>
                </div>
                <TextField id="outlined-basic" placeholder="Search" variant="filled" value={query}
                    onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} sx={{ minWidth: '95%' }} />
                <IconButton color='default' component="span" onClick={handleSubmit} sx={{ height: '60px', width: '60px' }}>
                    <Search />
                </IconButton>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={users.length}
                            />
                            <TableBody>
                                {stableSort(users, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={user.userId}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {user.userId}
                                                </TableCell>
                                                <TableCell align="right">{user.username}</TableCell>
                                                <TableCell align="right">{user.email}</TableCell>
                                                <TableCell align="right">{user.wallet}</TableCell>
                                                <TableCell align="right"><BanUnban user={user} /></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        showFirstButton
                        showLastButton
                    />
                </Paper>
            </div>
        </Box >
    )
}