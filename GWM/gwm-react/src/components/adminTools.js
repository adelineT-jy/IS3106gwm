import React, { useEffect } from 'react';

import { Box, Modal, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    boxShadow: 24,
    bgcolor: '#ffacbb',
    padding: 4,
    borderRadius: '3px',
};

function PartyManager() {
    return (
        <h1>Party Manager</h1>
    )
}

function GameManager() {
    const [query, setQuery] = React.useState("");
    const [games, setGames] = React.useState([]);
    const [createGameModal, setCreateGameModal] = React.useState(false);
    const [editGameModal, setEditGameModal] = React.useState(false);
    const [gameId, setGameId] = React.useState(0);
    const [gameName, setGameName] = React.useState("");
    const [gameDesc, setGameDesc] = React.useState("");
    const [gameURL, setGameURL] = React.useState("");
    const [reload, setReload] = React.useState(0);

    useEffect(() => {
        try {
            fetch(`http://localhost:8080/Gwm-war/webresources/admin/game/query?name=${query}`, {
                crossDomain: true
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Please enter Game Name as search condition');
                    }
                })
                .then((data) => {
                    setGames(data);
                });
        } catch (e) {
            console.log(e);
        }
    }, [query]);

    const handleClose = () => {
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
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(handleClose)
            .then(setReload(reload + 1))
    }

    function openEditGameModal(game) {
        setGameId(game.gameId);
        setGameName(game.gameName);
        setGameDesc(game.gameDescription);
        setGameURL(game.gameDownloadLink);
        setEditGameModal(true);
    }

    function editGame() {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameName: gameName,
                gameDescription: gameDesc,
                gameDownloadLink: gameURL
            })
        };
        fetch(`http://localhost:8080/Gwm-war/webresources/admin/game/${gameId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            }).then(setQuery(query + " "))
        handleClose()
    }

    return (
        <div>
            <Modal open={createGameModal} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">Create a Game</Typography>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Title"
                        value={gameName} onChange={(e) => setGameName(e.target.value)} />
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Description"
                        value={gameDesc} onChange={(e) => setGameDesc(e.target.value)} />
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Game Download Link"
                        value={gameURL} onChange={(e) => setGameURL(e.target.value)} />
                    <Button sx={{ width: '50%' }} onClick={handleClose} color="error" variant="contained">
                        Cancel
                    </Button>
                    <Button sx={{ width: '50%' }} onClick={createGame} color="success" variant="contained">
                        Create
                    </Button>
                </Box>
            </Modal>

            <Modal open={editGameModal} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">Edit</Typography>
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Title"
                        value={gameName} onChange={(e) => setGameName(e.target.value)} />
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Description"
                        value={gameDesc} onChange={(e) => setGameDesc(e.target.value)} />
                    <TextField sx={{ width: '100%', mt: 1, mb: 1 }} variant="outlined" placeholder="Game Download Link"
                        value={gameURL} onChange={(e) => setGameURL(e.target.value)} />
                    <Button sx={{ width: '50%' }} onClick={handleClose} color="error" variant="contained">
                        Cancel
                    </Button>
                    <Button sx={{ width: '50%' }} onClick={editGame} color="success" variant="contained">
                        Edit
                    </Button>
                </Box>
            </Modal>

            <h1>Game Manager</h1>
            <TextField id="outlined-basic" placeholder="Search" variant="filled" value={query}
                onChange={(e) => setQuery(e.target.value)} sx={{ minWidth: '100%' }} />
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
                                    {game.gameId}
                                </TableCell>
                                <TableCell align="right">{game.gameName}</TableCell>
                                <TableCell align="right">{game.gameDescription}</TableCell>
                                <TableCell align="right">{game.gameDownloadLink}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => openEditGameModal(game)} color="warning" variant="contained">
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

export function AdminTools() {
    return (
        <div className='container'>
            <PartyManager />
            <GameManager />
        </div>
    )
}