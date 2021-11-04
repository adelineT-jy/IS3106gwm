import React, { useEffect } from 'react';

import { Grid, IconButton, TextField, ListItemButton, ListItemIcon, ListItemText, List, Divider, Box } from '@mui/material';
import { Search, Inbox, Drafts } from '@mui/icons-material';
import PropTypes from 'prop-types';



function ChatBox() {

    return ( <
        Box sx = {
            { bgcolor: '#bde1ff', height: '70vh' } } >
        <
        h1 > Chatbox < /h1> <
        /Box>
    )
}

/*export default function Chat() {

    return (
        <Box sx={{ bgcolor: '#e3f2fd', height: '70vh', display: 'flex' }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <h1>Chat</h1>
                    <p>Chat side bar</p>
                </Grid>
                <Grid item xs={6} md={8}>
                    <ChatBox />
                </Grid>
            </Grid>
        </Box>
    )
}*/

propTypes = {
    chatList: PropTypes.array,
};
defaultProps = {
    chatList: [],
};

function Fet


export default function SelectedListItem(prop) {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [chatList, setChatList] = React.useState([]);

    console.log(query);
    useEffect(() => {
        async function fetchChatList() {
            try {

                const response = await fetch('http://localhost:8080/Gwm-war/webresources/posts/?query=${query}`');
                const responseJSON = await response.json();
                console.log(responseJSON);
                setChatList(responseJSON);
            }

        }
    })

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return ( <
        Box sx = {
            { width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '70vh', display: 'flex' } } >
        <
        List component = "chatroom"
        aria - label = "All Chats" >
        <
        ListItemButton selected = { selectedIndex === 0 }
        onClick = {
            (event) => handleListItemClick(event, 0) } >
        <
        ListItemText > < /ListItemText> <
        /ListItemButton> <
        ListItemButton selected = { selectedIndex === 1 }
        onClick = {
            (event) => handleListItemClick(event, 1) } >
        <
        ListItemIcon >
        <
        DraftsIcon / >
        <
        /ListItemIcon> <
        ListItemText primary = "Drafts" / >
        <
        /ListItemButton> <
        /List> <
        Divider / >
        <
        List component = "nav"
        aria - label = "secondary mailbox folder" >
        <
        ListItemButton selected = { selectedIndex === 2 }
        onClick = {
            (event) => handleListItemClick(event, 2) } >
        <
        ListItemText primary = "Trash" / >
        <
        /ListItemButton> <
        ListItemButton selected = { selectedIndex === 3 }
        onClick = {
            (event) => handleListItemClick(event, 3) } >
        <
        ListItemText primary = "Spam" / >
        <
        /ListItemButton> <
        /List> <
        /Box>
    );


}

function Chats() {
    const [query, setQuery] = React.useState("");
    const [chats, setChats] = React.useState([]);

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        console.log(query);
        try {
            fetch(`http://localhost:8080/Gwm-war/webresources/chats/uid?uid=${query}`, {
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
                    setChats(data);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return ( <
        Box sx = {
            { bgcolor: '#e3f2fd', minHeight: '70vh' } } >

        <
        Grid container spacing = { 2 }
        sx = {
            { padding: '1em', width: '100%' } } >
        <
        Grid item xs = { 12 }
        sx = {
            { display: 'flex', justifyContent: 'center' } } >
        <
        TextField id = "outlined-basic"
        label = "Search for Posts"
        variant = "filled"
        value = { query }
        onChange = {
            (e) => setQuery(e.target.value) }
        onKeyDown = { handleKeyDown }
        sx = {
            { minWidth: '60%' } }
        /> <
        IconButton color = "primary"
        component = "span"
        onClick = { handleSubmit }
        sx = {
            { height: '60px', width: '60px' } } >
        <
        Search / >
        <
        /IconButton> <
        /Grid> {
            chats.map((post) => < Chat {...chats }
                    />)
                } <
                /Grid> <
                /Box>
        )
    }