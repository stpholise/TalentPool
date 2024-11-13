import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    genMenu: false,   
    isLogedin: false, 
    isModalOpen: false,    
}
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleGenMenu: (state) => {
            state.genMenu = !state.genMenu;          
        },
        toggleIsLogedin: (state) => {
            state.isLogedin = !state.isLogedin;
        },
        logUserOut: (state) => {
            state.isLogedin = false;
        },
        closeAll: (state) => {
            state.genMenu = false;
        },
        modalIsOpen: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
        modalIsClose: (state) => {
            state.isModalOpen = false;
        },
       clearAppState: ()=>initialState
    }
})

export const {
    toggleGenMenu,
    toggleIsLogedin,
    logUserOut,
    closeAll,
    modalIsOpen,
    modalIsClose,
    clearAppState
  } = appSlice.actions;

 

  export default appSlice.reducer