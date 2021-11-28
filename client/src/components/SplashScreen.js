// import AccountCircle from '@mui/icons-material/AccountCircle';
// import AppBar from '@mui/material/AppBar';
 import Box from '@mui/material/Box';
 import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import createMuiTheme from '@mui/core';
import ThemeProvider from '@mui/core';
import { borders } from '@mui/system';
import AuthContext from '../auth'



export default function SplashScreen() {
    return (
        <Box sx={{ width: '100%' }}       
        >
            
            <Grid container spacing={0}>
                <div id="splash-screen">
                    <div id = "splash-screen-intro">
                        <Box  sx={{
                            color: "black",
                            width: 350,
                            height: 50,
                            '&:hover': {
                            },
                        }}
                        >
                           Welcome to the Top 5 Lister! This is an application that allows you to create a top 5 list for anything you desire. Your list will then affect a community list, an aggregation of all user-lists. 
                        </Box>
                    </div>
                    <br></br>

                    <Box></Box>
                    <div id = "splash-screen-navigation">
                        <Box  sx={{
                            '&:hover': {
                            opacity: [0.1, 0.2, 1.0],
                            },
                        }}
                        >
                            <Button variant="contained"><Link to='/login/'>Sign-in</Link></Button><br></br>
                            <Button variant="contained"><Link to='/register/'>Sign-up</Link></Button><br></br>
                            <Button variant="contained">Guest mode</Button>
                        </Box>
                    </div>
                    <br></br>                    
                </div>

            </Grid>
            <Box><em><div id="creator-label">Made by Joshua Mathew</div></em></Box>

        </Box>
    )
}