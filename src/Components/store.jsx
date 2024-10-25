import {configureStore, createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
    name: 'count',
    initialState: {
        genMenu: false,
        show: false,
        available: false,
        profileMenu:false,
        sliderValue: 80,
        socialModal: false,
        skillModal: false,
    },
    reducers: {
        toggleGenMenu: (state) => {
            state.genMenu = !state.genMenu;
           
        },
        toggleProfileMenu: (state) => {
            state.profileMenu = !state.profileMenu
            console.log('state.profileMenu')
        },
        handleAvailability: (state) => {
            state.available = !state.available
            console.log('state.available')
        },
        handleShow: (state) => {
            state.show = !state.show;
            
        },
        setSliderValue: (state, action) => {
            state.sliderValue = action.payload;
        },
        toggleSocialModal: (state) => {
            state.socialModal = !state.socialModal;
        },
        closeSocialModal: (state) => {
            state.socialModal = false;
        },
        toggleSkillModal: (state) => {
            console.log({'toggleSkillModal': state.skillModal})
            state.skillModal = !state.skillModal;
        },
        closeSkillModal: (state) => {
            console.log({'close skilModal': state.skillModal})
            state.skillModal = false
        },
        closeAll: (state) => {
            state.genMenu = false;
            state.profileMenu = false;
            state.available = false;
            state.show = false;
            state.skillModal = false
            console.log('closeAll')
        },
        
    }
})

export const {
    toggleGenMenu,
    toggleProfileMenu,
    handleAvailability,
    handleShow,
    setSliderValue,
    toggleSocialModal,
    closeSocialModal,
    toggleSkillModal,
    closeSkillModal,
    closeAll,
   
  } = countSlice.actions;

const store = configureStore({
    reducer:{
        count: countSlice.reducer
    }
})

export default store;