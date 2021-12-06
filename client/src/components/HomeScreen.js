import React, { useContext, useEffect } from 'react'
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
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
        console.log(store.idNamePairs);
    }, []);
    const commonStyles = {
        bgcolor: '#959599',
        borderColor: 'text.primary',
        m: 1,
      };
    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
        <Box sx={{ ...commonStyles, borderRadius: 4 }} >
            <List sx={{ width: '100%', left: '0%' }}>
            {
                
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                    
                ))
                
            }
            </List>
        </Box>
    }
    return (
        <div>
            <div id="top5-list-selector">
                <ListViewSelectorBar />
            
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                    
                </div>
                <div id = "add-button">
                    <AddIcon fontSize="x-large" onClick={()=>handleCreateNewList()}/>Your Lists
                </div>
             </div>
           
        </div>)
}

export default HomeScreen;