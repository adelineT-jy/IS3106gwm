import React, { useEffect } from "react";

import { Container, IconButton, ListItem, ListItemText, Stack } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { Box } from "@mui/system";

const statusToColour = {
    "PENDING": "ddddff",
    "ACCEPTED": "#ddffdd",
    "REJECTED": "#ffdddd",
}

export const Request = (request) => {
    return (
        <ListItem sx={{ border: 'solid 1px black', bgcolor: statusToColour[request.status] }}
            secondaryAction={
                request.status === "PENDING" ?
                    <Stack spacing={1} direction="row">
                        {request.acceptRequest === undefined ? null :
                            <IconButton edge="end" onClick={request.acceptRequest}>
                                <Check />
                            </IconButton>}
                        {request.cancelRequest === undefined ? null :
                            <IconButton edge="end" onClick={request.cancelRequest}>
                                <Close />
                            </IconButton>}
                    </Stack>
                    : null
            }>
            <ListItemText
                primary={`Request ${request.requestId} (${request.status})`}
                secondary={request.text}
            />
        </ListItem>
    )
}

export default function Requests() {
    const [requests, setRequests] = React.useState([]);
    const uId = JSON.parse(window.localStorage.user).userId;

    useEffect(() => {
        handleSubmit();
    }, []);

    const deleteRequest = (rId) => {
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(`http://localhost:8080/Gwm-war/webresources/request/${uId}/${rId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request cannot be made');
                }
            })
            .catch((error) => {
                console.log(error)
            });
        window.location.reload(false);
    }

    const handleSubmit = () => {
        try {
            fetch(`http://localhost:8080/Gwm-war/webresources/request/${uId}`, {
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
                    setRequests(data);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Box sx={{ bgcolor: '#e3f2fd', minHeight: '80vh', padding: 3 }}>
            <Container maxwidth="md">
                <h1>Requests</h1>
                {
                    requests.map((request) => <Request key={request.requestId} {...request}
                        cancelRequest = {() => deleteRequest(request.requestId)}/>)
                }
            </Container>
        </Box>
    )
}