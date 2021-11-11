import React, { useEffect, useRef } from "react";
import { padding, styled } from "@mui/system";
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
  CardContent,
  Button,
  Stack,
  TextField,
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
  const [selected, setSelected] = React.useState(0);
  const [oId, setoId] = React.useState(0);
  const [ownerName, setOwnerName] = React.useState(0);

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

/*  useEffect(() => {
    if (oId > 0) {
      fetch(`http://localhost:8080/Gwm-war/webresources/users/${oId}`)
        .then((response) => response.json())
        .then((data) => setOwnerName(data))
        .catch((error) => console.log(error));
    }
  }, [oId]);*/

  const card = (
    <React.Fragment>
      <Card>
        <CardContent xs={8} md={10} sx={{ bgcolor: "#1e1e1e", height: "80%" }}>
          {dataChatMsg.map((msg) =>
            msg.msgOwnerId === uId
              ? msgRight(msg.message, msg.dateTime)
              : msgLeft(msg.message, msg.dateTime)
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ bottom: "20px" }}>
          {fullWidthTextField()}
        </CardContent>
      </Card>
    </React.Fragment>
  );

  function fullWidthTextField() {
    return (
      <Box
        sx={{
          maxWidth: "100%",
          float: "bottom",
        }}
      >
        <TextField fullWidth label="New Message" id="fullWidth" />
      </Box>
    );
  }

  function msgLeft(mes, date) {
    return (
      <div>
        <Stack
          direction="column"
          justifyContent="flex start"
          alignItems="flex-start"
          padding={1.5}
          xs={3}
          md={5}
        >
          {concatMessage(mes, date)}
        </Stack>
        <div style={{alignContent: "float-right"}}>{ownerName}</div>
      </div>
    );
  }

  function msgRight(mes, date) {
    return (
      <Stack
        direction="column"
        justifyContent="flex start"
        alignItems="flex-end"
        colour="#ffb6c1"
        padding={1.5}
        xs={3}
        md={5}
      >
        {concatMessage(mes, date)}
      </Stack>
    );
  }

  function concatMessage(mes, date) {
    var time = moment(date, "YYYY-MM-DD HH:mm:ss").format("hh:mm a");
    return (
      <Item>
        <div>
          <div style={{ fontWeight: "bold" }}>{mes}</div>
          <div style={{ float: "right" }}>{time}</div>
        </div>
      </Item>
    );
  }

  function concatHeader(name, date) {
    var time =
      date === undefined
        ? `no message`
        : moment(date, "YYYY-MM-DD HH:mm:ss").format("L");
    return (
      <div>
        <div style={{ fontWeight: "bold" }}> &nbsp;&nbsp; {name}</div>
        <div
          style={{ float: "right", fontWeight: "lighter", fontSize: "small" }}
        >
          {time} &nbsp;&nbsp;
        </div>
      </div>
    );
  }

  function filterUser(chat, date) {
    var person = chat.filter((u) => u.userId !== uId);
    return concatHeader(person[0].username, date);
  }

  return (
    <Grid container>
      <Grid item xs={3} md={2} className="d-flex flex-column">
        <Box sx={{ bgcolor: "#EBEBEB", minHeight: "80vh" }}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "#EBEBEB",
              position: "relative",
              overflow: "auto",
              maxHeight: "100%",
            }}
          >
            <List>
              {dataChat.map((chat, index) => (
                <ListItem key={chat.chatId} disablePadding>
                  <ListItemButton
                    type="button"
                    className="flex-grow-1 p-2 border-bottom"
                    sx={{ "&.Mui-selected": { color: "red" } }}
                    onClick={() => {
                      setiChatIndex(chat.chatId);
                      setSelected(index);
                    }}
                  >
                    <ListItemText
                      primary={
                        chat.party === 1
                          ? concatHeader(chat.name, chat.lastMsgTime)
                          : filterUser(chat.users, chat.lastMsgTime)
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
