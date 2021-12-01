import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import TextField from '@mui/material/TextField'
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function ListViewSelectorBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

      
    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }
    if (store.currentList){
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    // container
                    // spacing={0}
                    // direction="column"
                    // alignItems="center"
                    // justifyContent="center"
                    // style={{ minHeight: '100vh' }}
                >
                <AppBar position="static">
                        <div id = "list-selector-toolbar">
                            <div id="disabled-edit-icons">
                                <Toolbar>
                                        <HomeOutlinedIcon id = "disabled-view-selector" fontSize = "large" disabled="true"/>
                                        <PeopleOutlineIcon id = "disabled-view-selector" fontSize = "large" disabled="true"/>
                                        <PersonOutlinedIcon id = "disabled-view-selector" fontSize = "large" disabled="true"/>
                                        <FunctionsOutlinedIcon id = "disabled-view-selector" fontSize = "large" disabled="true"/>
                                        <TextField  sx={{ m: 1, width: '50ch' }} label="Search" variant="filled" disabled="true"/>
                                        <div id = "list-selector-sortby">
                                            <Typography fontSize = "20px" disabled="true">Sort By</Typography>
                                        </div>
                                        <SortIcon id = "disabled-view-selector" fontSize = "large" disabled="true"></SortIcon>
                                </Toolbar>
                            </div>
                        </div>
                </AppBar>
                {
                    menu
                }
                </Grid>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                // container
                // spacing={0}
                // direction="column"
                // alignItems="center"
                // justifyContent="center"
                // style={{ minHeight: '100vh' }}
            >
            <AppBar position="static">
                    <div id = "list-selector-toolbar">
                    <Toolbar>
                            <HomeOutlinedIcon id = "enabled-view-selector" fontSize = "large"/>
                            <PeopleOutlineIcon id = "enabled-view-selector" fontSize = "large"/>
                            <PersonOutlinedIcon id = "enabled-view-selector" fontSize = "large"/>
                            <FunctionsOutlinedIcon id = "enabled-view-selector" fontSize = "large"/>
                            <TextField  sx={{ m: 1, width: '50ch' }} label="Search" variant="filled"/>
                            <div id = "list-selector-sortby">
                                <Typography fontSize = "20px">Sort By</Typography>
                            </div>
                            <SortIcon id = "enabled-view-selector" onClick = {()=>handleSortMenuOpen} fontSize = "large"></SortIcon>
                    </Toolbar>
                    </div>
            </AppBar>
            {
                menu
            }
            </Grid>
        </Box>
    );
}