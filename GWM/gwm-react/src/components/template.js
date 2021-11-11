import React, { useState } from "react";
import {
    Switch,
    Route,
    Link,
    useHistory,
    useRouteMatch,
} from "react-router-dom";

import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Stack,
    Tab,
    Tabs,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Description from "@mui/icons-material/Description";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import CleanHands from "@mui/icons-material/CleanHands";
import Home from "@mui/icons-material/Home";
import PermIdentity from "@mui/icons-material/PermIdentity";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import Chat from "@mui/icons-material/Chat";

import logo from "../images/gwm.jpg";
import { AccountCircle } from "@mui/icons-material";

function Logo() {
    return (
        <>
            <Avatar src={logo} />
            <Typography id="title" sx={{ flexGrow: 1 }}>
                Game With Me
            </Typography>
        </>
    );
}

export function NavTabs() {
    const routeMatch = useRouteMatch([
        "/posts",
        "/party",
        "/requests",
        "/account",
        "/",
    ]);
    const currentTab = routeMatch?.path;

    return (
        <Box sx={{ width: "50%", alignItems: "center", p: 0 }}>
            <Tabs value={currentTab} centered>
                <Tab
                    icon={<Description />}
                    label="Posts"
                    value="/posts"
                    to="/posts"
                    component={Link}
                    sx={{ color: "primary.main", p: 0 }}
                />
                <Tab
                    icon={<PeopleAlt />}
                    label="Parties"
                    value="/party"
                    to="/party"
                    component={Link}
                    sx={{ color: "primary.main" }}
                />
                <Tab
                    icon={<CleanHands />}
                    label="Requests"
                    value="/requests"
                    to="/requests"
                    component={Link}
                    sx={{ color: "primary.main" }}
                />
                <Tab
                    icon={<AccountCircle />}
                    label="Account"
                    value="/account"
                    to="/account"
                    component={Link}
                    sx={{ color: "primary.main" }}
                />
            </Tabs>
        </Box>
    );
}
export function AdminTabs() {
    const routeMatch = useRouteMatch([
        "/admin/tools",
        "/admin/users",
        "/admin/posts",
    ]);
    const currentTab = routeMatch?.path;

    return (
        <Box sx={{ width: "50%", alignItems: "center", textAlign: "right" }}>
            <Tabs value={currentTab} centered>
                <Tab
                    icon={<Home />}
                    label="Home"
                    value="/admin/posts"
                    to="/admin/posts"
                    component={Link}
                    sx={{ color: "primary.main" }}
                />
                <Tab
                    icon={<AdminPanelSettings />}
                    label="Tools"
                    value="/admin/tools"
                    to="/admin/tools"
                    component={Link}
                    sx={{ color: "primary.main" }}
                />
                <Tab
                    icon={<PermIdentity />}
                    label="Users"
                    value="/admin/users"
                    to="/admin/users"
                    component={Link}
                    sx={{ color: "primary.main" }}
                />
            </Tabs>
        </Box>
    );
}

function GuestMenu() {
    return (
        <Toolbar>
            <Logo />
            <Button href="/login" variant="contained" color="secondary">
                Login
            </Button>
            <Button href="/register" variant="text">
                Register
            </Button>
        </Toolbar>
    );
}

function AdminMenu() {
    return (
        <Toolbar>
            <Logo />
            <AdminTabs />
            <Typography
                variant="h6"
                sx={{ flexGrow: 1, color: "white" }}
                align="center"
            >
                {window.localStorage.admin !== undefined &&
                    JSON.parse(window.localStorage.admin).email}
                &nbsp; (
                {window.localStorage.admin !== undefined &&
                    JSON.parse(window.localStorage.admin).userId}
                ) &nbsp;
            </Typography>
            <Button variant="text" href="/logout">
                Sign out
            </Button>
        </Toolbar>
    );
}

function UserMenu() {
    const history = useHistory();

    return (
        <Toolbar>
            <Logo />
            <NavTabs />
            <Typography
                variant="h6"
                sx={{ flexGrow: 1, color: "white" }}
                align="center"
            >
                <Tooltip title="Account Settings">
                    <IconButton onClick={() => history.push("/account/settings")}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                    </IconButton>
                </Tooltip>
                Welcome back,{" "}
                {window.localStorage.user !== undefined &&
                    JSON.parse(window.localStorage.user).username}
            </Typography>
            <Button variant="text" href="/logout">
                Sign out
            </Button>
        </Toolbar>
    );
}

const CheckUnauthorised = ({ ...props }) => (
    <Route
        {...props}
        render={(props) =>
            window.localStorage.getItem("user") ? <UserMenu /> : <GuestMenu />
        }
    />
);

const CheckUnauthorisedAdmin = ({ ...props }) => (
    <Route
        {...props}
        render={(props) =>
            window.localStorage.getItem("admin") ? <AdminMenu /> : <GuestMenu />
        }
    />
);

export function Header() {
    return (
        <header>
            <Box sx={{ bgcolor: "black", flexGrow: 1 }}>
                <AppBar sx={{ bgcolor: "black" }} position="static">
                    <Switch>
                        <CheckUnauthorised exact path="/posts" />
                        <CheckUnauthorised exact path="/party" />
                        <CheckUnauthorised exact path="/requests" />
                        <CheckUnauthorised path="/account" />

                        <CheckUnauthorisedAdmin exact path="/admin/posts" />
                        <CheckUnauthorisedAdmin exact path="/admin/tools" />
                        <CheckUnauthorisedAdmin exact path="/admin/users" />

                        <Route exact path="/admin" />

                        <Route component={GuestMenu} />
                    </Switch>
                </AppBar>
            </Box>
        </header>
    );
}

export function Footer() {
    return (
        <footer>
            <Box
                sx={{
                    bgcolor: "#111",
                    color: "white",
                    pt: 1,
                    minHeight: "11vh",
                    position: "static",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    mt: 1,
                }}
            >
                <p>
                    <strong>Copyright &copy; 2021</strong> Game With Me
                    Production
                </p>
                <p>All rights reserved.</p>
            </Box>
        </footer>
    );
}
