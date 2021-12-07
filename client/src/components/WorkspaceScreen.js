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
    let list = store.currentList.items;
    console.log(list);
    if(list.length!==6){
        list.unshift(store.currentList.name);
    }
    console.log(list);
    let editItems = "";
    if (store.currentList) {
        editItems = store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
        console.log(store.currentList.items);
    }

    function handleSave(){
        //now update the items
            //now update the items
        handleUpdateItems();
        //store.changeListName(store.currentList._id, list[0]);
        handleChangeListName();
        //now set list to published
        console.log(store.currentList._id);
        console.log(store.currentList);
        store.closeCurrentList();
    }
    function handlePublish(){
        // do check:
        // no duplicate
        // no blanks
        //store.listLike(store.currentList._id,1);
        if(checkPublishable()){
            //update the list
            //start with list-name: need listId and new name
            console.log(list);
            //now update the items
            handleUpdateItems();
            handleChangeListName();
            //now set list to published
            handleDBPublish();
            console.log(store.currentList._id);
            console.log(store.currentList);
            store.closeCurrentList();
        }
        
    }
    async function handleUpdateItems(){
        await store.updateItems(list.splice(1));

    }
    async function handleChangeListName(){
        await store.changeListName(store.currentList._id, list[0]);

    }
    async function handleDBPublish (){
        await store.listPublish(store.currentList._id);

    }
    function checkPublishable(){
        console.log(list);
        if(list[0].length===0||list[0]===" "||!list[0][0].match(/^[a-z0-9]+$/i)){
            return false;
        }
        if(list[1].length===0||list[1]===" "||!list[1][0].match(/^[a-z0-9]+$/i)){
            return false;
        }
        if(list[2].length===0||list[2]===" "||!list[2][0].match(/^[a-z0-9]+$/i)){
            return false;
        }
        if(list[3].length===0||list[3]===" "||!list[3][0].match(/^[a-z0-9]+$/i)){
            return false;
        }
        if(list[4].length===0||list[4]===" "||!list[4][0].match(/^[a-z0-9]+$/i)){
            return false;
        }
        if(list[5].length===0||list[5]===" "||!list[5][0].match(/^[a-z0-9]+$/i)){
            return false;
        }
        return true;
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
                
                    <TextField id="outlined-basic" defaultValue = {store.currentList.name} variant="outlined" sx={{paddingLeft:3}} onChange = {(event)=>{list[0]=event.target.value}} />
                    <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "navy", }} >
                        <Grid container spacing={2} sx={{p:2}}>
                            <Grid item xs={1}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, alignItems: "center"}}>
                                <Typography variant="h4">1.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue = {store.currentList.items[1]} onChange = {(event)=>{list[1]=event.target.value; console.log(list)}} fullWidth>{store.currentList.items[0]}</TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, alignItems: "center"}}>
                                <Typography variant="h4">2.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue = {store.currentList.items[2]} onChange = {(event)=>{list[2]=event.target.value; console.log(list)}} fullWidth>{store.currentList.items[1]}</TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, alignItems: "center"}}>
                                <Typography variant="h4">3.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue = {store.currentList.items[3]} onChange = {(event)=>{list[3]=event.target.value; console.log(list)}} fullWidth>{store.currentList.items[2]}</TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box alignItems sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, }} >
                                <Typography variant="h4">4.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue = {store.currentList.items[4]}  onChange = {(event)=>{list[4]=event.target.value; console.log(list)}} fullWidth>{store.currentList.items[3]}</TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" , height: 55, alignItems: "center"}}>
                                <Typography variant="h4">5.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "gold" }}>
                                <TextField defaultValue = {store.currentList.items[5]} onChange = {(event)=>{list[5]=event.target.value; console.log(list)}} fullWidth></TextField>
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