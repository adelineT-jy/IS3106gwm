import React, { useEffect } from "react";

import { Paper, Box, Grid} from "@mui/material";
import { MenuList, MenuItem } from "@mui/material";
import { Search, Inbox, Drafts } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function Chat() {
  const [dataChat, setDataChat] = React.useState([]);
  const uId = window.localStorage.user === undefined ? 0 : JSON.parse(window.localStorage.user).userId;



  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <MenuList></MenuList>

      <Box sx={{ bgcolor: "#e3f2fd", height: "70vh", display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <h1>Chat</h1>
            <p>Chat side bar</p>
          </Grid>
          <Grid item xs={6} md={8}>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
