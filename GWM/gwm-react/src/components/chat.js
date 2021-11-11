import React, { useEffect, useRef } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { palette, styled } from "@mui/system";
import ChatMessages from "./chatMessages";
import moment from "moment";

import {
  List,
  Grid,
  Box,
  ListItemButton,
  ListItem,
  ListItemText,
  Paper,
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "flex-start",
  color: theme.palette.text.secondary,
  borderRadius: 5,
  Gap: 10,
}));

export default function Chat() {
  const [dataChat, setDataChat] = React.useState([]);
  const [reload, setReload] = React.useState(0);
  const [dataChatMsg, setDataChatMsg] = React.useState([]);
  const [iChatIndex, setiChatIndex] = React.useState(0);

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

  function FilterUser(chat) {
    var person = chat.filter((u) => u.userId !== uId);
    console.log(iChatIndex);
    return person[0].username;
  }

  useEffect(() => {
    if (iChatIndex > 0) {
      fetch(
        `http://localhost:8080/Gwm-war/webresources/chats/message/${iChatIndex}`
      )
        .then((response) => response.json())
        .then((data) => setDataChatMsg(data))
        .catch((error) => console.log(error));
    }
  }, [reload, iChatIndex]);

  function OutlinedCard() {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }

  const card = (
    <React.Fragment>
      <CardContent xs={8} md={10} sx={{ bgcolor: "#1e1e1e", height: "100%" }}>
        {dataChatMsg.map((msg) => (
          <Stack
            direction="column"
            justifyContent="flex start"
            alignItems="flex-start"
            padding={1}
          >

              <Item>{msg.message}
                {moment(msg.dateTime, "YYYY-MM-DD HH:mm:ss").format("hh:mm a")}
            </Item>
          </Stack>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Grid container>
      <Grid item xs={3} md={2} className="d-flex flex-column">
        <Box sx={{ bgcolor: "#EBEBEB", minHeight: "80vh" }}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "#EBEBEBr",
              position: "relative",
              overflow: "auto",
              maxHeight: 800,
            }}
          >
            <List>
              {dataChat.map((chat) => (
                <ListItem key={chat.chatId} disablePadding>
                  <ListItemButton
                    type="button"
                    className="flex-grow-1 p-2 border-bottom"
                    onClick={() => setiChatIndex(chat.chatId)}
                  >
                    <ListItemText
                      primary={
                        chat.party === 1
                          ? `${chat.name}`
                          : `${FilterUser(chat.users)}`
                      }
                      seconday={
                        chat.lastMsgTime === undefined
                          ? ``
                          : `${chat.lastMsgTime}`
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </List>
        </Box>
      </Grid>
      <Grid item xs={8} md={10}>
        {card}
      </Grid>
    </Grid>
  );
}
