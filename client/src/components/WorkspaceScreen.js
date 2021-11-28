import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography, Box, TextField  } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Grid from '@mui/material/Grid'
import ListViewSelectorBar from './ListViewSelectorBar'

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        
      };
    return (
        // <div id="top5-workspace">
        //     <div id="workspace-edit">
        //         <div id="edit-numbering">
        //             <div className="item-number"><Typography variant="h3">1.</Typography></div>
        //             <div className="item-number"><Typography variant="h3">2.</Typography></div>
        //             <div className="item-number"><Typography variant="h3">3.</Typography></div>
        //             <div className="item-number"><Typography variant="h3">4.</Typography></div>
        //             <div className="item-number"><Typography variant="h3">5.</Typography></div>
        //         </div>
        //         {editItems}
        //     </div>
        // </div>
        <div id="workspace-home">
            <ListViewSelectorBar />
            <div >
            <Box  sx={{ ...commonStyles, borderRadius: 4, bgcolor: "lavender" }} >
                <Grid
                >
                    <TextField id="outlined-basic" defaultValue={store.currentList.name} variant="outlined" />
                    <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "navy" }} >
                    <Grid xs={1}>
                        <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                        <Typography variant="h3">1.</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={1}>
                        <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                        <Typography variant="h3">2.</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={1}>
                        <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                        <Typography variant="h3">3.</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={1}>
                        <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                        <Typography variant="h3">4.</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={1}>
                        <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                        <Typography variant="h3">5.</Typography>
                        </Box>

                    </Grid>
                    </Box>
                </Grid>
            </Box>
            </div>
        </div>
    )
}

export default WorkspaceScreen;