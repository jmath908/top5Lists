import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography, Box, TextField, Button, Paper } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Grid from '@mui/material/Grid'
import ListViewSelectorBar from './ListViewSelectorBar'
import { styled } from '@mui/material/styles';


/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
    let editItems = "";
    if (store.currentList) {
        editItems = 
            // <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
            //     {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
            //     }
            // </List>;
    }
    function handleSave(){

    }
    function handlePublish(){
        //do check:
        // no duplicate
        // no blanks
        if(checkPublishable()){
            
        }
        
    }
    function checkPublishable(list){

    }
    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        l:5,
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
            <Box  sx={{ ...commonStyles, borderRadius: 4, bgcolor: "lavender",p:1,  flexGrow: 1}} >
                
                    <TextField id="outlined-basic" defaultValue={store.currentList.name} variant="outlined" sx={{paddingLeft:3}} />
                    <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "navy", }} >
                        <Grid container spacing={2} sx={{p:2}}>
                            <Grid item xs={1}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, alignItems: "center"}}>
                                <Typography variant="h4">1.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue={editItems[0]} fullWidth>{editItems[0]}</TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, alignItems: "center"}}>
                                <Typography variant="h4">2.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue={editItems[1]} fullWidth>{editItems[1]}</TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, alignItems: "center"}}>
                                <Typography variant="h4">3.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue={editItems[2]} fullWidth>{editItems[2]}</TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box alignItems sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, }} >
                                <Typography variant="h4">4.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue={editItems[3]} fullWidth>{editItems[3]}</TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, alignItems: "center"}}>
                                <Typography variant="h4">5.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue={editItems[4]} fullWidth></TextField>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                <Button id="save-publish-buttons" sx={{ left: "65%" }} variant="contained" onClick={()=>handleSave()}>Save</Button>
                <Button id="save-publish-buttons" sx={{ left: "70%" }} variant="contained" onClick={()=>handlePublish()}>Publish</Button>
                
            </Box>
            {/* {editItems} */}
        </div>
    )
}

export default WorkspaceScreen;