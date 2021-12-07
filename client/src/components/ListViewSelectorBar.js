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

    const handleSort1 = () => {
        handleMenuClose();
        store.setCurrentOrder("new");
        store.loadAllIdNamePairs("");
    }
    const handleSort2 = () => {
        handleMenuClose();
        store.setCurrentOrder("old");
    }
    const handleSort3 = () => {
        handleMenuClose();
        store.setCurrentOrder("views");
    }
    const handleSort4 = () => {
        handleMenuClose();
        store.setCurrentOrder("likes");
    }
    const handleSort5 = () => {
        handleMenuClose();
        store.setCurrentOrder("dislikes");
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
            <MenuItem onClick={()=>handleSort1()}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={()=>handleSort2()}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={()=>handleSort3()}>Views</MenuItem>
            <MenuItem onClick={()=>handleSort4()}>Likes</MenuItem>
            <MenuItem onClick={()=>handleSort5()}>Dislikes</MenuItem>
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
    let view = store.currentView;
    if(view==="all"){
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
                            <HomeOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>store.loadIdNamePairs()}/>
                            <PeopleOutlineIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("all", "", "new"); store.setCurrentView("all")} }/>
                            <PersonOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("user", "", "new") ; store.setCurrentView("user")}}/>
                            <FunctionsOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("community", "", "new") ; store.setCurrentView("community")}}/>
                            <TextField  sx={{ m: 1, width: '50ch' }} label="Search" variant="filled" onChange = {(event)=> {store.loadAllIdNamePairs("all", event.target.value, "new");}}/>
                            <div id = "list-selector-sortby">
                                <Typography fontSize = "20px">Sort By</Typography>
                            </div>
                            <SortIcon id = "enabled-view-selector" size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit" onClick = {handleSortMenuOpen} fontSize = "large"></SortIcon>
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
    if(view==="user"){
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
                                    <HomeOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>store.loadIdNamePairs()}/>
                                    <PeopleOutlineIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("all", "", "new"); store.setCurrentView("all")} }/>
                                    <PersonOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("user", "", "new") ; store.setCurrentView("user")}}/>
                                    <FunctionsOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("community", "", "new") ; store.setCurrentView("community")}}/>
                                    <TextField  sx={{ m: 1, width: '50ch' }} label="Search" variant="filled" onChange = {(event)=> {store.loadAllIdNamePairs("user", event.target.value, "new");}}/>
                                    <div id = "list-selector-sortby">
                                        <Typography fontSize = "20px">Sort By</Typography>
                                    </div>
                                    <SortIcon id = "enabled-view-selector" size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit" onClick = {handleSortMenuOpen} fontSize = "large"></SortIcon>
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
    else{
        return(
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
                                <HomeOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>store.loadIdNamePairs()}/>
                                <PeopleOutlineIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("all", "", "new"); store.setCurrentView("all")} }/>
                                <PersonOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("user", "", "new") ; store.setCurrentView("user")}}/>
                                <FunctionsOutlinedIcon id = "enabled-view-selector" fontSize = "large" onClick = {()=>{store.loadAllIdNamePairs("community", "", "new") ; store.setCurrentView("community")}}/>
                                <TextField  sx={{ m: 1, width: '50ch' }} label="Search" variant="filled" onChange = {(event)=> {store.loadAllIdNamePairs("user", event.target.value, "new");}}/>
                                <div id = "list-selector-sortby">
                                    <Typography fontSize = "20px">Sort By</Typography>
                                </div>
                                <SortIcon id = "enabled-view-selector" size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    color="inherit" onClick = {handleSortMenuOpen} fontSize = "large"></SortIcon>
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
}