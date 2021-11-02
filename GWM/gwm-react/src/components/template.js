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

export function NavTabs() {
    const routeMatch = useRouteMatch(['/posts', '/party', '/requests']);
    const currentTab = routeMatch?.path;

    return (
        <Box sx={{ width: '100%', alignItems: 'center', textAlign: 'right' }}>
            <Tabs value={currentTab} centered>
                <Tab icon={<Description />} label="Posts" value="/posts" to="/posts" component={Link} sx={{ color: 'primary.main' }} />
                <Tab icon={<PeopleAlt />} label="Ongoing Parties and Posts" value="/party" to="/party" component={Link} sx={{ color: 'primary.main' }} />
                <Tab icon={<CleanHands />} label="Ongoing Requests" value="/requests" to="/requests" component={Link} sx={{ color: 'primary.main' }} />
            </Tabs>
        </Box>
    );
}
export function AdminTabs() {
    const routeMatch = useRouteMatch(['/admin/tools', '/admin/users', '/admin']);
    const currentTab = routeMatch?.path;

    return (
        <Box sx={{ width: '100%', alignItems: 'center', textAlign: 'right' }}>
            <Tabs value={currentTab} centered>
                <Tab icon={<Home />} label="Home" value="/admin" to="/admin" component={Link} sx={{ color: 'primary.main' }} />
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
            <AdminTabs/>
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
            <NavTabs/>
            <Box sx={{ display: 'flex', alignItems: 'right', textAlign: 'right', width: '100%' }}>
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
                    <Link to="/account#posts">  My Posts </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PeopleAlt fontSize="small" />
                    </ListItemIcon>
                    <Link to="/account#parties">  My Parties </Link>
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

export function Header() {
    return (
        <header>
            <Box sx={{ bgcolor: 'black', flexGrow: 1 }}>
                <AppBar sx={{ bgcolor: 'black' }} position="static">
                   <Switch>
                        <Route exact path="/" component={GuestMenu} />
                        <Route exact path="/login" component={GuestMenu} />
                        <Route exact path="/register" component={GuestMenu} />
                        <Route exact path="/logout" component={GuestMenu} />

                        <Route path="/admin" component={AdminMenu} />

                        <Route path="/" component={UserMenu} />
                    </Switch>
                </AppBar>
            </Box>
        </header>
    );
}

export function Footer() {
    return (
        <footer>
            <Box sx={{ bgcolor: '#111', color: 'white', mt: 5, pt: 1, bottom: 0, left: 0, right: 0, position: 'absolute' }}>
                <p><strong>Copyright &copy; 2021</strong> Game With Me Production</p>
                <p>All rights reserved.</p>
            </Box>
        </footer>
    );
}