//This class is for schema of comment of a list
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import ListViewSelectorBar from './ListViewSelectorBar'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
function ListComment  (props)  {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const { username,comment } = props;

    console.log(username);
    
    const commonStyles = {
        bgcolor: 'gold',
        borderColor: 'black',
        m: 1,
    };
    const commonStyles2 = {
        bgcolor: 'gold',
        borderColor: 'text.primary',
        p: 1,
        border: 1,
        
    };
    let commentCard = 
            <Box sx={{ ...commonStyles2, borderRadius: 4 }} >
                <div id = "comment-username">{username}: </div>
                {comment}
            </Box>
    // let listCard = "";
    // // if (store) {
    // //     listCard = 
    // //     <Box sx={{ ...commonStyles, borderRadius: 4 }} >
    // //         <List sx={{ width: '100%', left: '0%' }}>
    // //         {
                
    // //             store.idNamePairs.map((pair) => (
    // //                 <ListCard
    // //                     key={pair._id}
    // //                     idNamePair={pair}
    // //                     selected={false}
    // //                 />
                    
    // //             ))
                
    // //         }
    // //         </List>
    // //     </Box>
    // // }
    return (
        <div>
            {commentCard}
        </div>)
}

export default ListComment;