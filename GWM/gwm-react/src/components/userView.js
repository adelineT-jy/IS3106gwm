import React, { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Stack,
} from "@mui/material";

export const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    boxShadow: 12,
    bgcolor: "#eeeeee",
    padding: 4,
    borderRadius: "3px",
};

export default function UserView(props) {
    const { uId } = props;
    const [user, setUser] = useState({ username: "Loading", followers: [], following: [] });
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/`)
            .then((response) => response.json())
            .then((tempUser) => setUser(tempUser))
            .catch((error) => alert(error));
    }, [uId]);

    const handleOpen = (event) => {
        event.preventDefault();
        setOpenModal(true);
    };

    const handleClose = (event) => {
        setOpenModal(false);
    };

    const submitFollow = () => {
        console.log("Unsupported currently.");
        handleClose();
    };

    return (
        <>
            <Link color="secondary" underline="hover" onClick={handleOpen}>
                {user.username}
            </Link>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} centered>
                    <List sx={{ width: "100%" }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.username}
                                secondary={`Gender: ${user.gender === 0 ? "F" : "M"}`}
                            />
                        </ListItem>
                        <ListItem>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={2}
                            >
                                <Chip label={user.isAvailable ? "Available" : "Busy"} color={user.isAvailable ? "success" : "warning"}/>
                            </Stack>
                        </ListItem>
                    </List>
                    <Button
                        sx={{ width: "50%" }}
                        onClick={submitFollow}
                        color="info"
                        variant="contained"
                    >
                        Follow
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
