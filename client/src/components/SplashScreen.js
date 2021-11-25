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



export default function SplashScreen() {
    return (
        <Box sx={{ width: '100%' }}       justifyContent="center"
        >
            <Grid container spacing={0} justify="center">
                <div id="splash-screen">
                    <Grid item xs={6}>
                        <Box sx={{
                                borderColor: 'text.primary',
                                width: 300,
                                height: 300,
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box  sx={{
                            
                            width: 300,
                            height: 300,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        >

                            <br></br>
                            <Button variant="contained"><Link to='/login/'>Sign-in</Link></Button>
                            <br></br>
                            <Button variant="contained"><Link to='/register/'>Sign-up</Link></Button>
                            <br></br>
                            <Button variant="contained">Guest mode</Button>
                        </Box>
                    </Grid>

                </div>
            </Grid>
        </Box>
    )
}