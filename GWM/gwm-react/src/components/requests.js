import React, { useEffect, useState } from "react";

import {
    Grid,
    IconButton,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { Box } from "@mui/system";

const statusToColour = {
    PENDING: "#ddddff",
    ACCEPTED: "#ddffdd",
    REJECTED: "#ffdddd",
};

export const Request = (request) => {
    return (
        <ListItem
            sx={{
                border: "solid 1px black",
                bgcolor: statusToColour[request.status],
            }}
            secondaryAction={
                request.status === "PENDING" ? (
                    <Stack spacing={1} direction="row">
                        {request.acceptRequest === undefined ? null : (
                            <IconButton
                                edge="end"
                                onClick={request.acceptRequest}
                            >
                                <Check />
                            </IconButton>
                        )}
                        {request.cancelRequest === undefined ? null : (
                            <IconButton
                                edge="end"
                                onClick={request.cancelRequest}
                            >
                                <Close />
                            </IconButton>
                        )}
                    </Stack>
                ) : null
            }
        >
            <ListItemText
                primary={`Request ${request.requestId} (${request.status})`}
                secondary={request.text}
            />
        </ListItem>
    );
};

export default function Requests() {
    const [requests, setRequests] = useState([]);
    const uId = JSON.parse(window.localStorage.user).userId;
    const [reload, setReload] = useState(0);

    const [mode, setMode] = useState("PENDING");

    const handleChange = (event, newValue) => {
        setMode(newValue);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/Gwm-war/webresources/request/${uId}`, {
            crossDomain: true,
        })
            .then((response) => response.json())
            .then((data) => setRequests(data.filter((req) => req.status === mode)))
            .catch((error) => alert(error));
    }, [reload, uId, mode]);

    const deleteRequest = (rId) => {
        const requestOptions = {
            method: "DELETE",
        };
        fetch(
            `http://localhost:8080/Gwm-war/webresources/request/${uId}/${rId}`,
            requestOptions
        )
            .then(() => setReload(reload + 1))
            .catch((error) => alert(error));
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
                    <Paper sx={{ height: "100%", minHeight: "80vh", padding: "4vh" }}>
                        <Typography
                            variant="h6"
                            sx={{ paddingLeft: "1vh", paddingBottom: "2vh" }}
                        >
                            Requests
                        </Typography>
                        <Tabs
                            orientation="vertical"
                            value={mode}
                            onChange={handleChange}
                            variant="fullWidth"
                            sx={{ float: "left" }}
                        >
                            <Tab
                                label="Pending Requests"
                                value={"PENDING"}
                                sx={{
                                    fontWeight: "600",
                                    color: "black",
                                    "&.Mui-selected": { color: "red" },
                                    "&.hover": { color: "red", opacity: 1 },
                                }}
                            />
                            <Tab
                                label="Accepted Requests"
                                value={"ACCEPTED"}
                                sx={{
                                    fontWeight: "600",
                                    color: "black",
                                    "&.Mui-selected": { color: "red" },
                                    "&.hover": { color: "red", opacity: 1 },
                                }}
                            />
                            <Tab
                                label="Rejected Requests"
                                value={"REJECTED"}
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
                    <Paper sx={{ height: "100%", minHeight: "80vh", padding: "4vh" }}>
                        {requests.length === 0 ? (
                            <Typography variant="body1">
                                You do not have any {mode.toLowerCase()} requests
                            </Typography>
                        ) : (
                            requests.map((request) => (
                                <Request
                                    key={request.requestId}
                                    {...request}
                                    cancelRequest={() =>
                                        deleteRequest(request.requestId)
                                    }
                                />
                            ))
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
