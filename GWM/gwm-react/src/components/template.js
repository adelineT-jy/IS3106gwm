import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Description from '@mui/icons-material/Description';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import CleanHands from '@mui/icons-material/CleanHands';
import Home from '@mui/icons-material/Home';
import PermIdentity from '@mui/icons-material/PermIdentity';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import Chat from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import logo from "../images/gwm.jpg"
import { AccountCircle } from '@mui/icons-material';

export function NavTabs() {
    const routeMatch = useRouteMatch(['/posts', '/party', '/requests', '/account', '/']);
    const currentTab = routeMatch?.path;

    return (
        <Box sx={{ width: '100%', alignItems: 'center', textAlign: 'right' }}>
            <Tabs value={currentTab} centered>
                <Tab icon={<Description />} label="Posts" value="/posts" to="/posts" component={Link} sx={{ color: 'primary.main' }} />
                <Tab icon={<PeopleAlt />} label="Parties" value="/party" to="/party" component={Link} sx={{ color: 'primary.main' }} />
                <Tab icon={<CleanHands />} label="Requests" value="/requests" to="/requests" component={Link} sx={{ color: 'primary.main' }} />
                <Tab icon={<AccountCircle />} label="Account" value="/account" to="/account" component={Link} sx={{ color: 'primary.main' }} />
            </Tabs>
        </Box>
    );
}
export function AdminTabs() {
    const routeMatch = useRouteMatch(['/admin/tools', '/admin/users', '/admin/posts']);
    const currentTab = routeMatch?.path;

    return (
        <Box sx={{ width: '50%', alignItems: 'center', textAlign: 'right' }}>
            <Tabs value={currentTab} centered>
                <Tab icon={<Home />} label="Home" value="/admin/posts" to="/admin/posts" component={Link} sx={{ color: 'primary.main' }} />
                <Tab icon={<AdminPanelSettings />} label="Tools" value="/admin/tools" to="/admin/tools" component={Link} sx={{ color: 'primary.main' }} />
                <Tab icon={<PermIdentity />} label="Users" value="/admin/users" to="/admin/users" component={Link} sx={{ color: 'primary.main' }} />
            </Tabs>
        </Box>
    );
}


function GuestMenu() {
    return (
        <Toolbar>
            <Avatar src={logo} />
            <Typography id="title" sx={{ flexGrow: 1 }}>
                Game With Me
            </Typography>
            <Button href="/login" variant="contained" color="secondary">Login</Button>
            <Button href="/register" variant="text">Register</Button>
        </Toolbar>
    )
}

function AdminMenu() {
    return (
        <Toolbar>
            <Avatar src={logo} />
            <Typography id="title" sx={{ flexGrow: 1 }}>
                Game With Me
            </Typography>
            <AdminTabs />
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }} align="center">
                {window.localStorage.admin !== undefined && JSON.parse(window.localStorage.admin).email}
                &nbsp;
                ({window.localStorage.admin !== undefined && JSON.parse(window.localStorage.admin).userId})
                &nbsp;
            </Typography>
            <Button variant="text" href="/logout">Sign out</Button>
        </Toolbar>
    )
}

function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Toolbar>
            <Avatar src={logo} />
            <Typography id="title" sx={{ flexGrow: 1 }}>
                Game With Me
            </Typography>
            <NavTabs />
            <Box sx={{ display: 'flex', alignItems: 'right', textAlign: 'right', width: '10%' }}>
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar sx={{ width: 32, height: 32 }} />
                    <Link to="/account#profile"> My Profile</Link>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Description fontSize="small" />
                    </ListItemIcon>
                    <Link to="/account#posts">  My Past Posts </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PeopleAlt fontSize="small" />
                    </ListItemIcon>
                    <Link to="/account#parties">  My Past Parties </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Chat fontSize="small" />
                    </ListItemIcon>
                    <Link to="/account/chats">  My Chats </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Link to="/logout"> Sign out </Link>
                </MenuItem>
            </Menu>
        </Toolbar>
    );
}

const CheckUnauthorised = ({ ...props }) => (
    <Route
        {...props}
        render={(props) =>
            window.localStorage.getItem('user') ? (
                <UserMenu />
            ) : (
                <GuestMenu />
            )}
    />
);

const CheckUnauthorisedAdmin = ({ ...props }) => (
    <Route
        {...props}
        render={(props) =>
            window.localStorage.getItem('admin') ? (
                <AdminMenu />
            ) : (
                <GuestMenu />
            )}
    />
);

export function Header() {
    return (
        <header>
            <Box sx={{ bgcolor: 'black', flexGrow: 1 }}>
                <AppBar sx={{ bgcolor: 'black' }} position="static">
                    <Switch>
                        <CheckUnauthorised exact path="/posts" />
                        <CheckUnauthorised exact path="/party" />
                        <CheckUnauthorised exact path="/requests" />
                        <CheckUnauthorised path="/account" />

                        <CheckUnauthorisedAdmin expact path="/admin/posts" />
                        <CheckUnauthorisedAdmin expact path="/admin/tools" />
                        <CheckUnauthorisedAdmin expact path="/admin/users" />

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
            <Box sx={{ bgcolor: '#111', color: 'white', pt: 1, minHeight: '11vh', position: 'static', bottom: 0, left: 0, right: 0, mt: 1 }}>
                <p><strong>Copyright &copy; 2021</strong> Game With Me Production</p>
                <p>All rights reserved.</p>
            </Box>
        </footer>
    );
}