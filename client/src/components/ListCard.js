import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Top5Item from './Top5Item.js'
import ListComment from './ListComment'
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Typography, List } from '@mui/material';
import Menu from '@mui/material/Menu';
import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';

import { borders } from '@mui/system';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    
    const [editActive, setEditActive] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [likeOrDislike, setLikeOrDislike] = useState(null);
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

    async function likelist(id, amt){
        await store.listLike(id, amt);              
    }
    async function dislikelist(id, amt){
        await store.listDislike(id, amt);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }
    
    let thumbsUp = !(likeOrDislike==="liked")?<ThumbUpOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListLike(event, idNamePair._id)}}/>:<ThumbUpIcon id = "list-card-element" onClick = {(event)=>{handleListLike(event, idNamePair._id)}}/>;
    let thumbsDown = !(likeOrDislike==="disliked")?<ThumbDownOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListDislike(event, idNamePair._id)}}/>:<ThumbDownIcon id = "list-card-element" onClick = {(event)=>{handleListDislike(event, idNamePair._id)}}/>;
    async function handleListLike(event, id){
        //if list was already disliked, undo dislike (-1 dislike & +1 like)
        if(likeOrDislike==="disliked"){
            await likelist(id, 1);
            await dislikelist(id, -1);       
            setLikeOrDislike("liked");
            thumbsUp = <ThumbUpIcon id = "list-card-element" onClick = {(event)=>{handleListLike(event, idNamePair._id)}}/>;
            thumbsDown = <ThumbDownOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListDislike(event, idNamePair._id)}}/>;
        }
        //if list was already liked, undo like (-1 like)
        else if(likeOrDislike==="liked"){
            new Promise((resolve, reject) => {
                resolve('ok')
                store.listLike(id, -1)});              
            setLikeOrDislike(null);
            thumbsUp = <ThumbUpOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListLike(event, idNamePair._id)}}/>;
            thumbsDown = <ThumbDownOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListDislike(event, idNamePair._id)}}/>;
        }
        else{
            new Promise((resolve, reject) => {
                resolve('ok')
                store.listLike(id, 1)});              
            setLikeOrDislike("liked");
            thumbsUp = <ThumbUpIcon id = "list-card-element" onClick = {(event)=>{handleListLike(event, idNamePair._id)}}/>;
            thumbsDown = <ThumbDownOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListDislike(event, idNamePair._id)}}/>;

        }
    }

    async function handleListDislike(event, id){
        //if list was already liked, undo like (-1 like & +1 dislike)
        if(likeOrDislike==="liked"){
            await likelist(id, -1);
            await dislikelist(id, 1);            
            setLikeOrDislike("disliked");
            thumbsUp = <ThumbUpOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListLike(event, idNamePair._id)}}/>;
            thumbsDown = <ThumbDownIcon id = "list-card-element" onClick = {(event)=>{handleListDislike(event, idNamePair._id)}}/>;
        }
        //if list was already disliked, undo dislike (-1 dislike)
        else if(likeOrDislike==="disliked"){
            new Promise((resolve, reject) => {
                resolve('ok')
                store.listDislike(id, -1)});            
            setLikeOrDislike(null);
            thumbsUp = <ThumbUpOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListLike(event, idNamePair._id)}}/>;
            thumbsDown = <ThumbDownOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListDislike(event, idNamePair._id)}}/>;
        }
        else{
            new Promise((resolve, reject) => {
                resolve('ok')
                store.listDislike(id, 1)});            
            setLikeOrDislike("disliked");
            thumbsUp = <ThumbUpOutlinedIcon id = "list-card-element" onClick = {(event)=>{handleListLike(event, idNamePair._id)}}/>;
            thumbsDown = <ThumbDownIcon id = "list-card-element" onClick = {(event)=>{handleListDislike(event, idNamePair._id)}}/>;
        }
    }

    let editItems=idNamePair.clist;

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

    function handleToggleExpansion(event, id) {
        event.stopPropagation();
        toggleExpansion(event,id);
    }

    async function toggleExpansion(event,id) {
        let newExpansion = !expanded;
        if (newExpansion) {
            if(idNamePair.published){
                store.listView(id);
            }
            editItems=idNamePair.clist;
        }
        setExpanded(newExpansion);
    }
    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
      };
      const commonStyles2 = {
        bgcolor: 'gold',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
      };
    //for thumbsup/thumbsdown icon
    // if user clicks like, it will change to darkened thumb
    // if user clicks dislike, it will undo the like
    // if user does not want to vote, they can return the thumb to neutral
    // user should have knowledge of what lists they have liked
   
    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let comments = "";
    if(expanded&&idNamePair.published){
    
    comments = 
    <div>
            <Grid item xs={12}>
                    <Box>
                        <List sx={{ width: '90%', left: '0%' }}>
                        {
                            idNamePair.comments.map((item) => (
                                <ListComment
                                    username={item.username}
                                    comment={item.comment}
                                />
                            ))
                        }
                        </List>
                    </Box>
                </Grid>
        

        {<TextField variant="outlined" label=" Add comment"  sx={{paddingLeft:0}} onKeyPress= {(event) => {
                    if (event.key === 'Enter') {
                    console.log('Enter key pressed: ', event.target.value);
                    store.addComment( idNamePair._id, event.target.value,  idNamePair.username);
                    }
                    }}
        />}
        </div>
            
    }
    else{
        <div>
            <Grid item xs={12}>
                    <Box>
                        <List sx={{ width: '90%', left: '0%' }}>
                        {
                            idNamePair.comments.map((item) => (
                                <ListComment
                                    username={item.username}
                                    comment={item.comment}
                                />
                            ))
                        }
                        </List>
                    </Box>
                </Grid>
        </div>
    }
    let bgc = "white";
    if(idNamePair.published == true){
        bgc = "lavendar";
    }
    let injectExpansion;
    if(expanded){
        injectExpansion =             
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
                    <Typography >{editItems[3]}</Typography>
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

    }
    else{
        injectExpansion = <div></div>
    }
    let cardElement
    if(idNamePair.published == true){
    cardElement =
        <div id = "list-card-nonediting">
            <Box sx={{borderRadius: 4, bgcolor: "lavender", borderColor: 'text.primary', border: 5}}>
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
                        <div  style={{background:"lavender"}}>{thumbsUp}{idNamePair.likes} </div>
                    </Grid>
                    <Grid item xs={2} sx={{fontSize: '20px'}}>
                        <div style={{background:"lavender"}}>{thumbsDown}{idNamePair.dislikes} </div>
                    </Grid> 
                    <Grid item xs={2}>
                        <div style={{background:"lavender"}}>
                            <DeleteOutlinedIcon id = "list-card-element" onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }}></DeleteOutlinedIcon> 
                        </div>
                    </Grid>
                    <Grid item xs = {6}>
                        {injectExpansion} 
                    </Grid>
                    <Grid item xs = {6} >
                        <div >
                            {comments}  
                        </div>
                    </Grid>
                                 
                    <Grid item xs={0}>
                        <div > By: </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div id="author" style={{color:"blue", }}> {idNamePair.username} </div>
                    </Grid>
                   
                    <Grid item xs={8}>
                        <div id = "list-card-element" style={{color:"green"}}> Published on {idNamePair.publishedTime.substring(0,10)} </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div> Views: {idNamePair.views} </div>
                    </Grid>
                    <Grid item xs={2} >
                    <div style={{background:"lavender"}}>
                             <KeyboardArrowDownIcon id = "list-card-element" onClick = {(event)=>{handleToggleExpansion(event, idNamePair._id)}}></KeyboardArrowDownIcon> 
                             </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    }
    else{
        cardElement =
            <div id = "list-card-nonediting">
                <Box sx={{borderRadius: 4, bgcolor: bgc, borderColor: 'text.primary', border: 5}}>
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
                            <div  style={{background:"white"}}>{thumbsUp}0 </div>
                        </Grid>
                        <Grid item xs={2} sx={{fontSize: '20px'}}>
                            <div style={{background:"white"}}>{thumbsDown}0 </div>
                        </Grid> 
                        <Grid item xs={2}>
                            <div style={{background:"white"}}>
                                <DeleteOutlinedIcon id = "list-card-element" onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }}></DeleteOutlinedIcon> 
                            </div>
                        </Grid>
                        <Grid item xs = {6}>
                            {injectExpansion} 
                        </Grid>
                        <Grid item xs = {6} >
                            <div >
                                {comments}  
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
                            <div id = "list-card-element" style={{color:"red"}}> Edit </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>  </div>
                        </Grid>
                        <Grid item xs={2} >
                        <div style={{background:"white"}}>
                                 <KeyboardArrowDownIcon id = "list-card-element" onClick = {(event)=>{handleToggleExpansion(event, idNamePair._id)}}></KeyboardArrowDownIcon> 
                                 </div>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        }
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