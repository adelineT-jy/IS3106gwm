import React from "react";

import { IconButton, ListItem, ListItemText, Stack } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

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
                        <IconButton edge="end" onClick={request.acceptRequest}>
                            <Check />
                        </IconButton>
                        <IconButton edge="end" onClick={request.rejectRequest}>
                            <Close />
                        </IconButton>
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