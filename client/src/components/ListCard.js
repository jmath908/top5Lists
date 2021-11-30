import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { borders } from '@mui/system';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '5rem',
        height: '5rem',
      };
      
    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <div id = "list-card-nonediting">
            <Box sx={{borderRadius: 0, display: 'flex'}}>
                <Grid container spacing={0.5} 
                    id={idNamePair._id}
                    key={idNamePair._id}
                    sx={{ marginTop: '0px', display: 'flex', p: 0 }}
                    style={{ width: '100%' }}
                    button
                    >
                    <Grid item xs={6} sx={{fontSize: '20px'}}>
                        <Box><div id="list-name">{idNamePair.name}</div></Box>
                    </Grid>
                    <Grid item xs={2} sx={{fontSize: '20px', left: "5px"}}>
                        <div style={{background:"white"}}><ThumbUpOutlinedIcon/> {idNamePair.dislikes} </div>
                    </Grid>
                    <Grid item xs={2} sx={{fontSize: '20px'}}>
                        <div style={{background:"white"}}><ThumbDownOutlinedIcon/> {idNamePair.likes} </div>
                    </Grid> 
                    <Grid item xs={2}>
                        <div style={{background:"white"}}>
                             <DeleteOutlinedIcon></DeleteOutlinedIcon> 
                             </div>
                    </Grid>
                    <Grid item xs={0}>
                        <div > By: </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div id="author" style={{color:"blue", }}> {idNamePair.username} </div>
                    </Grid>
                   
                    <Grid item xs={8} onClick={(event) => {
                        handleLoadList(event, idNamePair._id)
                    }}>
                        <div style={{color:"red"}}> Edit </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div> Views: {idNamePair.views} </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div> <KeyboardArrowDownIcon/> </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
                // <ListItem
                //     id={idNamePair._id}
                //     key={idNamePair._id}
                //     sx={{ marginTop: '15px', display: 'flex', p: 1 }}
                //     style={{ width: '100%' }}
                //     button
                //     onClick={(event) => {
                //         handleLoadList(event, idNamePair._id)
                //     }
                //     }
                //     style={{
                //         fontSize: '48pt'
                //     }}
                // >
                //         <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                //         <Box sx={{ p: 1 }}>
                //             <IconButton onClick={handleToggleEdit} aria-label='edit'>
                //                 <EditIcon style={{fontSize:'48pt'}} />
                //             </IconButton>
                //         </Box>
                //         <Box sx={{ p: 1 }}>
                //             <IconButton onClick={(event) => {
                //                 handleDeleteList(event, idNamePair._id)
                //             }} aria-label='delete'>
                //                 <DeleteIcon style={{fontSize:'48pt'}} />
                //             </IconButton>
                //         </Box>
                // </ListItem>
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;