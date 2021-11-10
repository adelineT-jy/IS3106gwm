import React, { useEffect } from "react";
import { palette, styled } from "@mui/system";
import {
  List,
  Grid,
  Box,
  ListItemButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MenuList, MenuItem } from "@mui/material";
import { Search, Inbox, Drafts, StarTwoTone } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function Chat() {
  const [dataChat, setDataChat] = React.useState([]);
  const [reload, setReload] = React.useState(0);
  const [name, setName] = React.useState("");

  const uId =
    window.localStorage.user === undefined
      ? 0
      : JSON.parse(window.localStorage.user).userId;

  useEffect(() => {
    if (uId > 0) {
      fetch(`http://localhost:8080/Gwm-war/webresources/chats/${uId}`)
        .then((response) => response.json())
        .then((data) => setDataChat(data))
        .catch((error) => console.log(error));
    }
  }, [reload, uId]);

  function filterUser(chatUsers){
    var person = chatUsers.filter(u => u.userId !== uId);
    console.log(person[0].username);
    return person[0].username;
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <Box sx={{ bgcolor: "#EBEBEB", minHeight: "80vh" }}>
          <Grid container md={6}></Grid>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "#EBEBEBr",
              position: "relative",
              overflow: "auto",
              maxHeight: 800,
              "& ul": { padding: 0 },
            }}
          >
            <List key="chatBar" reload={reload} setReload={setReload}>
              <ul>
                {dataChat.map((chat) => (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        key={chat.chatId}
                        {...chat}
                        primary={
                          chat.party === true ? `${chat.name}` : `${filterUser(chat.users)}`
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </ul>
            </List>
          </List>
        </Box>
      </Grid>
      <Grid item xs={8}>
        ssss
      </Grid>
    </Grid>
  );
}
