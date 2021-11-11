import React, { useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import Box from "@mui/material/Box";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Modal,
    Paper,
    Popover,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { Check, Close, Search } from "@mui/icons-material";

import UserView, { modalStyle } from "./userView";

export const Post = (post) => {
    const uId =
        window.localStorage.user === undefined
            ? 0
            : JSON.parse(window.localStorage.user).userId;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [gamePopover, setGamePopover] = React.useState(null);

    const [openModal, setOpenModal] = React.useState(false);
    const [text, setText] = React.useState("");

    let history = useHistory();

    const handleClose = () => {
        setAnchorEl(null);
        setOpenModal(false);
    };

    function handleGamePopover(event, game) {
        setAnchorEl(event.currentTarget);
        setGamePopover(
            <Card sx={{ padding: 1 }}>
                <Stack spacing={1}>
                    <Typography variant="h6">{game.gameName}</Typography>
                    <Typography variant="body2">
                        {game.gameDescription}
                    </Typography>
                    <Button
                        color="primary"
                        variant="filled"
                        onClick={() => {
                            var otherWindow = window.open();
                            otherWindow.opener = null;
                            otherWindow.location = `${game.gameDownloadLink}`;
                        }}
                    >
                        Download Link
                    </Button>
                </Stack>
            </Card>
        );
    }

    function submitRequest(post) {
        const req = { text: text };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
        };
        fetch(
            `http://localhost:8080/Gwm-war/webresources/posts/${post.postId}/request/${uId}`,
            requestOptions
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Request cannot be made");
                }
            })
            .then(() => {
                handleClose();
                history.push("./requests");
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <Grid item xs={12} sm={6} md={4} key={post.postId}>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                transformOrigin={{ vertical: "center", horizontal: "center" }}
            >
                {gamePopover}
            </Popover>

            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} centered>
                    <Typography variant="h6">
                        Please append any additional information to your request
                    </Typography>
                    <TextField
                        sx={{ width: "100%", mt: 1, mb: 1 }}
                        variant="outlined"
                        placeholder="Type your request here!"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    >
                        Request Text
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
                        onClick={() => submitRequest(post)}
                        color="success"
                        variant="contained"
                    >
                        Request to Join
                    </Button>
                </Box>
            </Modal>

            <Card sx={{ maxWidth: "400px" }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                        Post Id: {post.postId}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        Created by <UserView uId={post.userId} /> on{" "}
                        {post.postDate.slice(0, 10)} at{" "}
                        {post.postDate.slice(11, 16)}
                    </Typography>
                    <Typography sx={{ mb: 4 }} variant="body1">
                        {post.description}
                    </Typography>

                    <Chip
                        sx={{ margin: "2px" }}
                        label={post.game.gameName}
                        color="info"
                        onClick={(e) => handleGamePopover(e, post.game)}
                    />
                    <Chip
                        sx={{ margin: "2px" }}
                        label={`Looking for ${post.requestQty}`}
                        color="secondary"
                    />
                    <Chip
                        sx={{ margin: "2px" }}
                        label={post.isAvailable ? "Available" : "Busy"}
                        color={post.isAvailable ? "success" : "error"}
                        icon={post.isAvailable ? <Check /> : <Close />}
                    />
                    <Chip
                        sx={{ margin: "2px" }}
                        label={
                            post.requestPrice === 0
                                ? "Free"
                                : post.requestPrice > 0
                                ? `Costs G${post.requestPrice}`
                                : `Pays  G${-post.requestPrice}`
                        }
                        color={post.requestPrice === 0 ? "info" : "warning"}
                    />
                </CardContent>
                {post.request && post.userId !== uId && post.isAvailable ? (
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button variant="filled" onClick={setOpenModal}>
                            Create a Request
                        </Button>
                    </CardActions>
                ) : null}
            </Card>
        </Grid>
    );
};

export default function Posts(props) {
    const [query, setQuery] = useState("");
    const [posts, setPosts] = useState([]);
    const [reload, setReload] = useState(0);
    const { request = true } = props;

    const [mode, setMode] = useState(0);

    const handleChange = (event, newValue) => {
        setMode(newValue);
    };

    useEffect(() => {
        const queryPath =
            mode === 0
                ? `query?query=${query}`
                : `searchPost?username=${query}`;
        fetch(`http://localhost:8080/Gwm-war/webresources/posts/${queryPath}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong");
                }
            })
            .then((data) => setPosts(data.filter((post) => !post.hidden)))
            .catch((error) => alert(error));
    }, [reload, query, mode]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        setReload(reload + 1);
    };

    return (
        <Box sx={{ bgcolor: "#e3f2fd", minHeight: "80vh", p: 1 }}>
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
                            Search for Posts
                        </Typography>
                        <Tabs
                            orientation="vertical"
                            value={mode}
                            onChange={handleChange}
                            variant="fullWidth"
                            sx={{ float: "left" }}
                        >
                            <Tab
                                label="By Post Name"
                                value={0}
                                sx={{
                                    fontWeight: "600",
                                    color: "black",
                                    "&.Mui-selected": { color: "red" },
                                    "&.hover": { color: "red", opacity: 1 },
                                }}
                            />
                            <Tab
                                label="By Username"
                                value={1}
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
                    <TextField
                        id="outlined-basic"
                        label="Search for Posts"
                        variant="filled"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        sx={{ minWidth: "60%", mb: 4 }}
                    />
                    <IconButton
                        color="secondary"
                        component="span"
                        onClick={handleSubmit}
                        sx={{ height: "60px", width: "60px" }}
                    >
                        <Search />
                    </IconButton>
                    <Grid container spacing={1}>
                        {posts.map((post) => (
                            <Post
                                key={post.postId}
                                {...post}
                                request={request}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
