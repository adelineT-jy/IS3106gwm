import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Modal, Typography, Button, FormControlLabel, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Paper, Grid, Switch } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    boxShadow: 24,
    bgcolor: '#C0C0C0',
    padding: 4,
    borderRadius: '3px',
};

function PartyManager() {
    const [reload, setReload] = React.useState(0);
    const [query, setQuery] = React.useState("");
    const [parties, setParties] = React.useState([]);
    const [viewUsersModal, setViewUsersModal] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('partyId');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        fetch(`http://localhost:8080/Gwm-war/webresources/party/query?username=${query}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong when searching for parties');
                }
            })
            .then((data) => { setParties(data); })
            .catch((error) => alert(error));
    }, [reload, query]);

    const handleSubmit = () => {
        setReload(reload + 1);
    }

    const openViewUsersModal = (user) => {
        setUsers(user);
        setViewUsersModal(true);
        console.log(users);
    }

    const handleClose = () => {
        setReload(reload + 1);
        setViewUsersModal(false);
    };

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
            id: 'partyId',
            numeric: false,
            label: 'Party Id',
        },
        {
            id: 'created by',
            numeric: true,
            label: 'Created By',
        },
        {
            id: 'start',
            numeric: true,
            label: 'Start Time',
        },
        {
            id: 'end',
            numeric: true,
            label: 'End Time',
        },
        {
            id: 'postId',
            numeric: true,
            label: 'Post Id',
        },
        {
            id: 'users',
            numeric: true,
            label: 'Party Users',
        },
        {
            id: 'hide',
            numeric: true,
            label: 'Hide / Unhide',
        },
    ]

    function EnhancedTableHead(props) {
        const { order, orderBy, onRequestSort } = props;
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
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
    };

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - parties.length) : 0;

    function HideUnhide(props) {
        const { partyId, hidden } = props.party

        function hideParty(partyId) {
            fetch(`http://localhost:8080/Gwm-war/webresources/party/hide/${partyId}`, { method: 'PUT' }).then(handleSubmit)
        }

        function unhideParty(partyId) {
            fetch(`http://localhost:8080/Gwm-war/webresources/party/unhide/${partyId}`, { method: 'PUT' }).then(handleSubmit)
        }

        if (!hidden) {
            return (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        const confirmBox = window.confirm(
                            "Are you sure you want to hide this party?"
                        )
                        if (confirmBox === true) {
                            hideParty(partyId);
                        }
                    }}> Hide
                </Button>
            )
        }
        else {
            return (
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                        const confirmBox = window.confirm(
                            "Are you sure you want to unhide this party?"
                        )
                        if (confirmBox === true) {
                            unhideParty(partyId);
                        }
                    }}> Unhide
                </Button>
            )
        }
    }

    return (
        <div className="container">
            <Modal open={viewUsersModal} onClose={handleClose}>
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">Users in the party</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Id</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Email Address</TableCell>
                                    <TableCell align="right">Gender</TableCell>
                                    <TableCell align="right">DOB</TableCell>
                                    <TableCell align="right">Wallet Amount ($)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{user.userId}</TableCell>
                                        <TableCell align="right">{user.username}</TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                        <TableCell align="right">{user.gender === 0 ? 'Female' : 'Male'}</TableCell>
                                        <TableCell align="right">{user.dob.slice(0, 10)}</TableCell>
                                        <TableCell align="right">{user.wallet}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Party Manager</h1>
            </div>
            <TextField id="outlined-basic" placeholder="Search Username" variant="filled" value={query}
                onChange={(e) => setQuery(e.target.value)} sx={{ minWidth: '100%' }} margin='normal' autoFocus />
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={parties.length}
                        />
                        <TableBody>
                            {stableSort(parties, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((party) => {
                                    return (
                                        <TableRow hover key={party.partyId} >
                                            <TableCell component="th" scope="row">{party.partyId}</TableCell>
                                            <TableCell align="right">{party.partyOwner.username}</TableCell>
                                            <TableCell align="right">{party.partyStartTime.slice(0, 10)} {party.partyStartTime.slice(11, 16)}</TableCell>
                                            <TableCell align="right">
                                                {party.partyEndTime !== undefined ? party.partyEndTime.slice(0, 10) : 'nil'}&nbsp;
                                                {party.partyEndTime !== undefined && party.partyEndTime.slice(11, 16)}
                                            </TableCell>
                                            <TableCell align="right">{party.post !== undefined ? party.post.postId : 'nil'}</TableCell>
                                            <TableCell align="right">
                                                <Button onClick={() => openViewUsersModal(party.users)} color="secondary" variant="outlined">
                                                    All Users
                                                </Button>
                                            </TableCell>
                                            <TableCell align="right"><HideUnhide party={party} /></TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={8} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={parties.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton
                    showLastButton
                />
            </Paper>
        </div >
    )
}

function GameManager() {
    const [reload, setReload] = React.useState(0);
    const [query, setQuery] = React.useState("");
    const [games, setGames] = React.useState([]);
    const [createGameModal, setCreateGameModal] = React.useState(false);
    const [editGameModal, setEditGameModal] = React.useState(false);
    const [gameId, setGameId] = React.useState(0);
    const [gameName, setGameName] = React.useState("");
    const [gameDesc, setGameDesc] = React.useState("");
    const [gameURL, setGameURL] = React.useState("");
    const [hidden, setHidden] = React.useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/Gwm-war/webresources/admin/game/query?name=${query}`, { crossDomain: true })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong when creating Game');
                }
            })
            .then((data) => {
                setGames(data);
            });
    }, [reload, query]);

    const handleClose = () => {
        setReload(reload + 1);
        setCreateGameModal(false);
        setEditGameModal(false);
    };


    const openCreateGameModal = () => {
        setCreateGameModal(true);
    }

    function createGame() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameName: gameName,
                gameDescription: gameDesc,
                gameDownloadLink: gameURL
            })
        };
        fetch(`http://localhost:8080/Gwm-war/webresources/admin/game`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    setReload(reload + 1);
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(handleClose())
            .catch((error) => alert(error))
    }

    function openEditGameModal(game) {
        setGameId(game.gameId);
        setGameName(game.gameName);
        setGameDesc(game.gameDescription);
        setGameURL(game.gameDownloadLink);
        setHidden(game.hidden);
        setEditGameModal(true);
    }

    function editGame() {
        const requestOptions = {
            crossDomain: true,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameName: gameName,
                gameDescription: gameDesc,
                gameDownloadLink: gameURL,
                hidden: hidden
            })
        };
        fetch(`http://localhost:8080/Gwm-war/webresources/admin/game/${gameId}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
            })
            .then(handleClose())
            .catch((error) => alert(error))
    }

    return (
        <div className="container">
            <Modal open={createGameModal} onClose={handleClose}>
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">Create a Game</Typography>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Title"
                        onChange={(e) => setGameName(e.target.value)} />
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Description"
                        onChange={(e) => setGameDesc(e.target.value)} />
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Game Download Link"
                        onChange={(e) => setGameURL(e.target.value)} />
                    <Button sx={{ width: '50%' }} onClick={handleClose} color="error" variant="contained">
                        Cancel
                    </Button>
                    <Button sx={{ width: '50%' }} onClick={createGame} color="success" variant="contained">
                        Create
                    </Button>
                </Box>
            </Modal>

            <Modal open={editGameModal} onClose={handleClose}>
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">Edit Game</Typography>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Title" multiline
                        value={gameName} onChange={(e) => setGameName(e.target.value)} />
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Description" multiline
                        value={gameDesc} onChange={(e) => setGameDesc(e.target.value)} />
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Game Download Link" multiline
                        value={gameURL} onChange={(e) => setGameURL(e.target.value)} />
                    <FormControlLabel control={<Switch checked={hidden} onChange={() => setHidden(!hidden)} />} label="Hide Game" />
                    <br />
                    <Button sx={{ width: '50%' }} onClick={handleClose} color="error" variant="contained">
                        Cancel
                    </Button>
                    <Button sx={{ width: '50%' }} onClick={editGame} color="success" variant="contained">
                        Edit
                    </Button>
                </Box>
            </Modal>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Game Manager</h1>
            </div>
            <TextField id="outlined-basic" placeholder="Search Game Name" variant="filled" value={query}
                onChange={(e) => setQuery(e.target.value)} sx={{ minWidth: '100%' }} margin='normal' />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>gameId</TableCell>
                            <TableCell align="right">Game Name</TableCell>
                            <TableCell align="right">Game Description</TableCell>
                            <TableCell align="right">Game Download Link</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.map((game) => (
                            <TableRow
                                key={game.gameId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {game.gameId} {game.hidden && '(hidden)'}
                                </TableCell>
                                <TableCell align="right">{game.gameName}</TableCell>
                                <TableCell align="right">{game.gameDescription}</TableCell>
                                <TableCell align="right">{game.gameDownloadLink}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => openEditGameModal(game)} color="warning" variant="outlined">
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justifyContent="flex-end">
                <Button onClick={openCreateGameModal} color="secondary" variant="contained" sx={{ mt: 1 }}>
                    Add a Game
                </Button>
            </Grid>
        </div>
    )
}

export default function AdminTools() {
    return (
        <Box sx={{ minHeight: '81vh' }}>
            <PartyManager />
            <GameManager />
        </Box>
    )
}