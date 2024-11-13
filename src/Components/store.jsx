// import {configureStore, createSlice } from '@reduxjs/toolkit';

// const siteSlice = createSlice({
//     name:'siteslice',
//     initialState:{
//         genMenu: false,
//         socialModal: false,
//         skillModal: false,
//     },
//     reducer: {
//         toggleGenMenu: (state) => {
//             state.genMenu = !state.genMenu;
//         },
      
//         toggleSocialModal: (state) => {
//             state.socialModal = !state.socialModal;
//         },
//         toggleSkillModal: (state) => {
//             state.skillModal = !state.skillModal;
//         },
//         closeSocialModal: (state) => {
//             state.socialModal = false;
//         },
//         closeSkillModal: (state) => {
//             state.skillModal = false
//         },
//         closeAll: (state) => {
//             state.genMenu = false;
//             state.skillModal = false  
//         },
//     }
// })





// const countSlice = createSlice({
//     name: 'count',
//     initialState: {
//         genMenu: false,
//         sliderValue: 80,
//         social: [
//             { socialLink: 'https://www.facebook.com', socialTitle: 'Facebook' },
//             { socialLink: 'https://www.twitter.com', socialTitle: 'Twitter' },
//             { socialLink: 'https://www.linkedin.com', socialTitle: 'LinkedIn' },
//             { socialLink: 'https://www.github.com', socialTitle: 'Github' },
//             { socialLink: 'https://www.instagram.com', socialTitle: 'Instagram' },
//             { socialLink: 'https://www.dribble.com', socialTitle: 'Dribble' },
//         ],
//         skills: [
//             {skillTitle: 'UI/UX Design', skillProficiency: 90, skillChecked: true},
//             {skillTitle: 'JavaScript', skillProficiency: 80, skillChecked: false},
//             {skillTitle: 'HTML 5', skillProficiency: 80, skillChecked: true},
//             {skillTitle: 'CSS 3', skillProficiency: 80, skillChecked: true},
//             {skillTitle: 'Bootstrap', skillProficiency: 80, skillChecked: false},
//         ],
//         profileModal: false,
//         user: {
//             name: 'Genesis Anosike',
//             occupation: 'UI/UX Designer',
//             email:'anosikegenesis@gmail.com',
//             location: 'Lagos, Nigeria',
//             phone: '0801 - 234 - 5678',
//         },
//         userReset: {
//             name: '',
//             occupation: '',
//             email:'',
//             location: '',
//             phone: '',
//         },
//         selectedSocial: null,
//         newSocial: { socialLink: '', socialTitle: ''},
//         resetSkill: { skillTitle: '', skillProficiency: '', skillChecked: false },
//         currentSkillProficiency: 0,
//         newSkill: { skillTitle: '', skillProficiency: '', skillChecked: false },
        
//     },
//     reducers: {
//         toggleGenMenu: (state) => {
//             state.genMenu = !state.genMenu;
           
//         },
//         setSliderValue: (state, action) => {
//             state.sliderValue = action.payload;
//         },
//         closeAll: (state) => {
//             state.genMenu = false;
//         },
//         addNewSocial: (state, action) => {
//             console.log({'setSocial': action.payload})
//             console.log({'social': state.social})
//             const newPayload = [...action.payload]
//             state.social = newPayload;
//         },
//         removeASocial: (state, action) => {
//             const { index } = action.payload;
//             state.social = state.social.filter((_, i) => i !== index)
//         },
//         setNewSocial: (state, action) => {
//             state.social = action.payload;
//         },    
//         addNewSkill: (state, action) =>{
//             state.skill = action.payload;
//         },
//         resetUserForm: (state) => {
//             state.userReset =  {
//                 name: '',
//                 occupation: '',
//                 email:'',
//                 location: '',
//                 phone: '',
//             }
//         },
//         handleNameChange: (state, action) => {
//             state.userReset.name = action.payload;
//         },
//         handleEmailChange: ( state, action) => {
//             state.userReset.email = action.payload;
//         }, 
//         handleOccupationChange: (state, action) => {
//             state.userReset.occupation = action.payload
//         },
//         handlePhoneChange: (state, action) => {
//             state.userReset.phone = action.payload
//         },
//         handleLocationChange: (state, action) => {
//             state.userReset.location = action.payload
//         },
//         handleUserUpdate: (state, action) => {
//             state.user = action.payload
//         },
//         setSkill: (state, action) => {
//             state.skill = action.payload;
//             state.newSkill.skillTitle = action.payload
//             console.log({'action.payload set skill': action.payload})
//         },
//         setProficiency: (state, action) => { 
//             state.currentSkillProficiency = action.payload;
//             state.newSkill.skillProficiency = action.payload;
//             console.log({'action.payload skill proficiency': action.payload}) 
//         },        
//         addSkill: (state) => {
//             const advanceSkill = {  skillProficiency :state.currentSkillProficiency, skillTitle: state.newSkill.skillTitle }
//             state.skills = [...state.skills, advanceSkill]
//             console.log({'state.skill': state.skills})
//         },
//         resetSkill: (state) => {
//             state.currentSkillProficiency = '';
//             state.newSkill.skillTitle= '';
//         }, 
//         removeSkill: (state, action) => {
//             const updatedSkills = state.skills.filter((_, i)=> i !== action.payload)
//             state.skills = [...updatedSkills]
//         }
//     }
// })

// export const {
//     toggleGenMenu,
//     setSliderValue,
//     closeAll,
//     addNewSocial,
//     handleNameChange,
//     handleEmailChange,
//     handleOccupationChange,
//     handlePhoneChange,
//     handleLocationChange,
//     handleUserUpdate,
//     setProficiency,
//     setSkill,
//     addSkill,
//     resetSkill,
//     removeSkill,
//     resetUserForm
//   } = countSlice.actions;

 

// const store = configureStore({
//     reducer:{
//         count: countSlice.reducer,
//         siteslice: siteSlice.reducer,
//     }
// })

// export default store;