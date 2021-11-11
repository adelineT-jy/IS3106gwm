import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Collapse,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    List,
    MenuItem,
    Modal,
    Paper,
    Select,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Post } from "./posts";
import { Request } from "./requests";
import UserView, { modalStyle } from "./userView";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

const UserCard = (user) => {
    return (
        <Grid item xs={6} sm={4} md={3} key={user.userId}>
            <Card sx={{ bgcolor: "#e3f2fd" }} variant="outlined">
                <CardContent>
                    <Stack alignItems="center" spacing={1}>
                        <Avatar />
                        <Typography variant="body1">
                            <UserView uId={user.userId} />
                        </Typography>
                        <Typography variant="body2">
                            User ID: {user.userId}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                color={user.isAvailable ? "success" : "error"}
                                label={user.isAvailable ? "Available" : "Busy"}
                            />
                            <Chip
                                color={user.isCreator ? "info" : "secondary"}
                                label={
                                    user.isCreator ? "Party Creator" : "Member"
                                }
                            />
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
};

export const Party = (party) => {
    const uId = JSON.parse(window.localStorage.user).userId;
    const [games, setGames] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [gameId, setGameId] = React.useState(0);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [requestSign, setRequestSign] = React.useState(0);
    const [requestPrice, setRequestPrice] = React.useState(0);
    const [requestQty, setRequestQty] = React.useState(1);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleOpen = () => {
        if (games.length === 0) {
            fetch(`http://localhost:8080/Gwm-war/webresources/party/games`)
                .then((response) => response.json())
                .then((data) => {
                    const availableGames = data.filter((game) => !game.hidden);
                    setGames(availableGames);
                    setGameId(
                        availableGames.length === 0
                            ? null
                            : availableGames[0].gameId
                    );
                });
        }
        if (party.post !== undefined) {
            setTitle(party.post.title);
            setDescription(party.post.description);
            setGameId(party.post.game.gameId);
            setRequestQty(party.post.requestQty);
            setRequestPrice(Math.abs(party.post.requestPrice));
            setRequestSign(
                party.post.requestPrice === 0
                    ? 0
                    : party.post.requestPrice / requestPrice
            );
        }
        setOpenModal(true);
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setGameId(1);
        setRequestQty(0);
        setRequestPrice(0);
        setRequestSign(0);
        setOpenModal(false);
    };

    const handleRequestQty = (e) => {
        if (e.target.value >= 0) {
            setRequestQty(e.target.value);
        }
    };

    const handleRequestPrice = (e) => {
        if (e.target.value > 0) {
            setRequestPrice(e.target.value);
        }
    };

    const savePost = () => {
        if (!window.confirm('Are you sure you want to save this post?')) return;
        const post = {
            title: title,
            userId: uId,
            description: description,
            requestPrice: requestSign * requestPrice,
            requestQty: requestQty,
        };
        const editString =
            party.post === undefined ? "" : `/post/${party.post.postId}`;
        const requestOptions = {
            method: party.post === undefined ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        };
        fetch(
            `http://localhost:8080/Gwm-war/webresources/party/${party.partyId}${editString}/users/${uId}/games/${gameId}`,
            requestOptions
        )
            .then(() => {
                handleClose();
                party.setReload(party.reload + 1);
            })
            .catch((error) => alert(error));
    };

    const deletePost = () => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        fetch(
            `http://localhost:8080/Gwm-war/webresources/party/${party.partyId}/post/${party.post.postId}/deleteBy/${uId}`,
            { method: "DELETE" }
        )
            .then(() => {
                handleClose();
                party.setReload(party.reload + 1);
            })
            .catch((error) => alert(error));
    };

    const acceptRequest = (rId) => {
        if (!window.confirm('Are you sure you want to accept this request?')) return;
        fetch(
            `http://localhost:8080/Gwm-war/webresources/party/${party.partyId}/user/${uId}/acceptRequest/${rId}`,
            { method: "PUT" }
        )
            .then(() => party.setReload(party.reload + 1))
            .catch((error) => alert(error));
    };

    const rejectRequest = (rId) => {
        if (!window.confirm('Are you sure you want to reject this request?')) return;
        fetch(
            `http://localhost:8080/Gwm-war/webresources/party/${party.partyId}/user/${uId}/rejectRequest/${rId}`,
            { method: "PUT" }
        )
            .then(() => party.setReload(party.reload + 1))
            .catch((error) => alert(error));
    };

    const endParty = () => {
        if (!window.confirm('Are you sure you want to end this party?')) return;
        fetch(
            `http://localhost:8080/Gwm-war/webresources/party/${party.partyId}/user/${uId}/end`,
            { method: "PUT" }
        )
            .then(() => party.setReload(party.reload + 1))
            .catch((error) => alert(error));
    };

    const deleteParty = () => {
        if (!window.confirm('Are you sure you want to delete this party?')) return;
        fetch(
            `http://localhost:8080/Gwm-war/webresources/party/${party.partyId}/user/${uId}/delete`,
            { method: "DELETE" }
        )
            .then(() => party.setReload(party.reload + 1))
            .catch((error) => alert(error));
    };

    return (
        <Card sx={{ maxWidth: "800", mb: 2 }} raised>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">
                        {party.post === undefined ? "Create a " : "Edit your "}{" "}
                        Post
                    </Typography>
                    <TextField
                        sx={{ width: "100%", mt: 1, mb: 1 }}
                        variant="outlined"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                        Post Title
                    </TextField>
                    <TextField
                        sx={{ width: "100%", mt: 1, mb: 1 }}
                        variant="outlined"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                        Post Description
                    </TextField>
                    <FormControl fullWidth variant="outlined" color="primary">
                        <InputLabel id="label">Game</InputLabel>
                        <Select
                            value={gameId}
                            label="Game"
                            labelId="label"
                            onChange={(e) => setGameId(e.target.value)}
                        >
                            {games.map((game) => (
                                <MenuItem key={game.gameId} value={game.gameId}>
                                    {game.gameName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="body2">
                        Number of members needed
                    </Typography>
                    <TextField
                        sx={{ width: "100%", mt: 1, mb: 1 }}
                        type="number"
                        variant="outlined"
                        placeholder="Requested Quantity"
                        value={requestQty}
                        onChange={handleRequestQty}
                    >
                        How many players do you need?
                    </TextField>
                    <Stack direction="row" spacing={1}>
                        <Button
                            sx={{ width: "33%" }}
                            onClick={() => setRequestSign(1)}
                            color="error"
                            variant="contained"
                        >
                            Pay to join
                        </Button>
                        <Button
                            sx={{ width: "33%" }}
                            onClick={() => {
                                setRequestSign(0);
                                setRequestPrice(0);
                            }}
                            color="info"
                            variant="contained"
                        >
                            Make it free
                        </Button>
                        <Button
                            sx={{ width: "33%" }}
                            onClick={() => setRequestSign(-1)}
                            color="success"
                            variant="contained"
                        >
                            Be paid to join
                        </Button>
                    </Stack>
                    <TextField
                        disabled={requestSign === 0}
                        sx={{ width: "100%", mt: 1, mb: 2 }}
                        type="number"
                        variant="outlined"
                        placeholder="Requested Price"
                        value={requestPrice}
                        onChange={handleRequestPrice}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    You will{" "}
                                    {requestSign >= 0 ? "earn $ " : "offer $ "}
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        sx={{ width: "50%" }}
                        onClick={handleClose}
                        color="error"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{ width: "50%" }}
                        onClick={savePost}
                        color="success"
                        variant="contained"
                    >
                        Save Post
                    </Button>
                </Box>
            </Modal>

            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                        Party Id: {party.partyId}
                    </Typography>
                    {party.mode === "current" &&
                    party.partyOwner.userId === uId ? (
                        <Stack spacing={2} direction="row">
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={endParty}
                            >
                                End party
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={deleteParty}
                            >
                                Delete party
                            </Button>
                        </Stack>
                    ) : null}
                </Stack>
                <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                    Discord Link:{" "}
                    <Button
                        color="primary"
                        variant="filled"
                        href={`${party.inviteLink}`}
                        onClick={() => {
                            var otherWindow = window.open();
                            otherWindow.opener = null;
                            otherWindow.location = `https://${party.inviteLink}`;
                        }}
                    >
                        {party.inviteLink}
                    </Button>
                </Typography>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    Created by <UserView uId={party.partyOwner.userId} />
                </Typography>
                <Chip
                    sx={{ margin: "2px" }}
                    label={`Party created on ${party.partyStartTime.substring(
                        0,
                        10
                    )} at ${party.partyStartTime.substring(11, 16)}`}
                    color="info"
                />
                {party.mode === "ended" ? (
                    <Chip
                        sx={{ margin: "2px" }}
                        label={`Party ended on ${party.partyEndTime.substring(
                            0,
                            10
                        )} at ${party.partyEndTime.substring(11, 16)}`}
                        color="secondary"
                    />
                ) : null}
            </CardContent>
            <CardActions sx={{ p: 2 }} onClick={handleExpandClick}>
                <Typography variant="button">
                    View {expanded ? "Less" : "More"}
                </Typography>
                <ExpandMore expand={expanded}>
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography sx={{ mt: 4 }} variant="body1">
                        Party Members
                    </Typography>
                    <Grid container spacing={2}>
                        {party.users.map((user) => (
                            <UserCard
                                key={user.userId}
                                {...user}
                                isCreator={
                                    party.partyOwner.userId === user.userId
                                }
                            />
                        ))}
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={4}>
                            <Typography sx={{ mt: 4 }} variant="body1">
                                Posts
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                            <Typography sx={{ mt: 4 }} variant="body1">
                                Requests
                            </Typography>
                        </Grid>
                        {party.post === undefined ? (
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    You have no posts or requests
                                </Typography>
                            </Grid>
                        ) : (
                            <Post {...party.post} request={false} />
                        )}
                        <Grid item xs={6} sm={8}>
                            <List>
                                {party.post === undefined ||
                                party.post.request.length === 0 ? (
                                    <Typography variant="body2">
                                        Your post has no requests
                                    </Typography>
                                ) : party.partyOwner.userId === uId ? (
                                    party.post.request.map((request) => {
                                        return (
                                            <Request
                                                key={request.requestId}
                                                {...request}
                                                acceptRequest={() =>
                                                    acceptRequest(
                                                        request.requestId
                                                    )
                                                }
                                                cancelRequest={() =>
                                                    rejectRequest(
                                                        request.requestId
                                                    )
                                                }
                                            />
                                        );
                                    })
                                ) : (
                                    party.post.request.map((request) => {
                                        return (
                                            <Request
                                                key={request.requestId}
                                                {...request}
                                            />
                                        );
                                    })
                                )}
                            </List>
                        </Grid>
                    </Grid>
                    {party.partyOwner.userId === uId ? (
                        <Stack spacing={1}>
                            <Button
                                sx={{ width: "50%" }}
                                onClick={handleOpen}
                                color={
                                    party.post === undefined
                                        ? "success"
                                        : "warning"
                                }
                                variant="contained"
                            >
                                {party.post === undefined
                                    ? "Create a "
                                    : "Edit your "}{" "}
                                Post
                            </Button>
                            {party.post === undefined ? null : (
                                <Button
                                    sx={{ width: "50%" }}
                                    onClick={deletePost}
                                    color="error"
                                    variant="contained"
                                >
                                    Delete your Post
                                </Button>
                            )}
                        </Stack>
                    ) : null}
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default function Parties() {
    const [parties, setParties] = useState([]);
    const uId =
        window.localStorage.user === undefined
            ? 0
            : JSON.parse(window.localStorage.user).userId;
    const [reload, setReload] = useState(0);

    const [mode, setMode] = useState("current");

    const handleChange = (event, newValue) => {
        setParties([]);
        setMode(newValue);
    };

    const [inviteLink, setInviteLink] = React.useState("");

    const [openModal, setOpenModal] = React.useState(false);

    const handleOpen = () => setOpenModal(true);

    const handleClose = () => setOpenModal(false);

    const createParty = () => {
        if (!window.confirm('Are you sure you want to create this party?')) return;
        const requestOptions = {
            crossDomain: true,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inviteLink: inviteLink }),
        };
        fetch(
            `http://localhost:8080/Gwm-war/webresources/party/${uId}/create`,
            requestOptions
        )
            .then(() => {
                handleClose();
                setReload(reload + 1);
            })
            .catch((error) => alert(error));
    };

    useEffect(() => {
        let filterMode;
        switch (mode) {
            case "hidden":
                filterMode = (party) => party.hidden;
                break;

            case "current":
                filterMode = (party) =>
                    !party.hidden && party.partyEndTime === undefined;
                break;

            case "ended":
                filterMode = (party) =>
                    !party.hidden && party.partyEndTime !== undefined;
                break;

            default:
                filterMode = (party) => false;
        }
        if (uId > 0) {
            fetch(
                `http://localhost:8080/Gwm-war/webresources/users/${uId}/party`
            )
                .then((response) => response.json())
                .then((data) => {
                    setParties(data.filter(filterMode));
                })
                .catch((error) => alert(error));
        }
    }, [reload, uId, mode]);

    return (
        <Box sx={{ bgcolor: "#e3f2fd", minHeight: "80vh", padding: 1 }}>
            <Grid container spacing={3} sx={{ m: 0, width: "100%" }}>
                <Grid
                    item
                    xs={4}
                    md={3}
                    sx={{ alignItems: "left", justifyContent: "left" }}
                >
                    <Paper
                        sx={{
                            height: "100%",
                            minHeight: "80vh",
                            padding: "4vh",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ paddingLeft: "1vh", paddingBottom: "2vh" }}
                        >
                            Parties
                        </Typography>
                        <Tabs
                            orientation="vertical"
                            value={mode}
                            onChange={handleChange}
                            variant="fullWidth"
                            sx={{ float: "left" }}
                        >
                            <Tab
                                label="Ongoing parties"
                                value={"current"}
                                sx={{
                                    fontWeight: "600",
                                    color: "black",
                                    "&.Mui-selected": { color: "red" },
                                    "&.hover": { color: "red", opacity: 1 },
                                }}
                            />
                            <Tab
                                label="Hidden parties"
                                value={"hidden"}
                                sx={{
                                    fontWeight: "600",
                                    color: "black",
                                    "&.Mui-selected": { color: "red" },
                                    "&.hover": { color: "red", opacity: 1 },
                                }}
                            />
                            <Tab
                                label="Ended parties"
                                value={"ended"}
                                sx={{
                                    fontWeight: "600",
                                    color: "black",
                                    "&.Mui-selected": { color: "red" },
                                    "&.hover": { color: "red", opacity: 1 },
                                }}
                            />
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={8} md={9}>
                    <Paper
                        sx={{
                            height: "100%",
                            minHeight: "80vh",
                            padding: "4vh",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="left"
                            sx={{ mb: 1 }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleOpen}
                            >
                                Create Party
                            </Button>
                        </Stack>
                        {parties.length === 0 ? (
                            <Typography sx={{ mt: 2 }}>
                                You have no {mode} parties
                            </Typography>
                        ) : (
                            parties.map((party) => (
                                <Party
                                    key={party.partyId}
                                    {...party}
                                    reload={reload}
                                    setReload={setReload}
                                    mode={mode}
                                />
                            ))
                        )}
                    </Paper>
                </Grid>
                <Modal open={openModal} onClose={handleClose}>
                    <Box sx={modalStyle} centered>
                        <Typography variant="h6">
                            Create a party and add your party invite link here.
                        </Typography>
                        <TextField
                            sx={{ width: "100%", mt: 1 }}
                            variant="outlined"
                            placeholder="Invite Link"
                            value={inviteLink}
                            onChange={(e) => setInviteLink(e.target.value)}
                        >
                            Party Invite Link
                        </TextField>
                        <Button
                            sx={{ width: "50%" }}
                            onClick={handleClose}
                            color="error"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{ width: "50%" }}
                            onClick={createParty}
                            color="success"
                            variant="contained"
                        >
                            Create
                        </Button>
                    </Box>
                </Modal>
            </Grid>
        </Box>
    );
}
