import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Top5Item from './Top5Item.js'
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const StyledMenu = styled((props) => (
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...props}
        />
      ))(({ theme }) => ({
        '& .MuiPaper-root': {
          borderRadius: 6,
          marginTop: theme.spacing(1),
          minWidth: 180,
          color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
          boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          '& .MuiMenu-list': {
            padding: '4px 0',
          },
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: theme.palette.text.secondary,
              marginRight: theme.spacing(1.5),
            },
            '&:active': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity,
              ),
            },
          },
        },
      }));

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
    let editItems = "";
    if (store.currentList) {
        alert("hel")
        editItems = store.currentList.items;
        console.log(editItems);
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
    function handleOpenDropdown(event){

    }
    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
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
            <Box sx={{borderRadius: 4, bgcolor: "white", borderColor: 'text.primary', border: 5}}>
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
                        <div  style={{background:"white"}}><ThumbUpOutlinedIcon id = "list-card-element"/> {idNamePair.dislikes} </div>
                    </Grid>
                    <Grid item xs={2} sx={{fontSize: '20px'}}>
                        <div style={{background:"white"}}><ThumbDownOutlinedIcon id = "list-card-element"/> {idNamePair.likes} </div>
                    </Grid> 
                    <Grid item xs={2}>
                        <div style={{background:"white"}}>
                             <DeleteOutlinedIcon id = "list-card-element"></DeleteOutlinedIcon> 
                             </div>
                    </Grid>
                    {/* Insert the list expansion */}
                    <Grid>
                    <Grid item xs={12}>
                    <Box sx={{ ...commonStyles, borderRadius: 4, bgcolor: "navy", flexGrow: 1}}  >
                        <Grid container spacing={2} sx={{p:2}}>
                            <Grid item xs={1}>
                                <Box sx={{ color: "gold" , alignItems: "center"}}>
                                <Typography>1.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{ color: "gold" }}>
                                <Typography >{editItems[0]}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{color: "gold" , alignItems: "center"}}>
                                <Typography >2.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{color: "gold" }}>
                                <Typography >{editItems[1]}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{color: "gold" , alignItems: "center"}}>
                                <Typography >3.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{color: "gold" }}>
                                <Typography >{editItems[2]}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{color: "gold" , alignItems: "center"}}>
                                <Typography >4.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{color: "gold" }}>
                                <Typography variant="h3">{editItems[3]}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{color: "gold" , alignItems: "center"}}>
                                <Typography >5.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={11}>
                                <Box sx={{color: "gold" }}>
                                <Typography >{editItems[4]}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    </Grid>
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
                        <div id = "list-card-element" style={{color:"red"}}> Edit </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div> Views: {idNamePair.views} </div>
                    </Grid>
                    <Grid item xs={2} >
                    <div style={{background:"white"}}>
                             <KeyboardArrowDownIcon id = "list-card-element" onClick = {(event)=>{handleOpenDropdown()}}></KeyboardArrowDownIcon> 
                             </div>
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