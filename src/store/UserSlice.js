import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:{
        name: 'Genesis Anosike',
        occupation: 'UI/UX Designer',
        email: 'genesis@gmail.com',
        phone: '08012345678',
        location: 'Lagos, Nigeria',
        twitter: '@Anosike_UI',
    },
    social: [
        { socialLink: 'https://www.facebook.com', socialTitle: 'Facebook', id: 1, },
        { socialLink: 'https://www.twitter.com', socialTitle: 'Twitter', id: 2, },
        { socialLink: 'https://www.linkedin.com', socialTitle: 'LinkedIn', id: 3, },
        { socialLink: 'https://www.github.com', socialTitle: 'Github', id: 4, },
        { socialLink: 'https://www.instagram.com', socialTitle: 'Instagram', id: 5, },
        { socialLink: 'https://www.dribble.com', socialTitle: 'Dribble', id: 6, },
    ],
    skills: [
        {skillTitle: 'UI/UX Design', skillProficiency: 90, skillChecked: false, id: 1},
        {skillTitle: 'JavaScript', skillProficiency: 80, skillChecked: false, id: 2},
        {skillTitle: 'HTML 5', skillProficiency: 80, skillChecked: false, id: 3},
        {skillTitle: 'CSS 3', skillProficiency: 80, skillChecked: false, id: 4},
        {skillTitle: 'Bootstrap', skillProficiency: 80, skillChecked: false, id: 5},
    ]

}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewSocial: (state, action) => { 
            state.social = action.payload
        },
        removeASocial: (state, action) => {
            state.social = state.social.filter((social) =>  social.id !== action.payload)
        },
        delMultipleSocial:(state, action) => {
            state.social= state.social.filter(
                (item) => !action.payload.includes(item.id)
            )
        },
        setNewSocial: (state, action) => {
            state.social = action.payload;
        },    
        handleUserchange: (state, action) => {
            state.user = action.payload
        },
        addSkill: (state, action) => {   
            state.skills = [...state.skills, action.payload]
        },
        editedSkills: (state, action) => {
            state.skills = state.skills.map((skill) => skill.id === action.payload.id ? action.payload : skill)
        },
        updateSkills: (state, action) => {
            state.skills = action.payload
        },
        removeSkill: (state, action) => {
            const updatedSkills = state.skills.filter(({id})=> id !== action.payload)
            state.skills = [...updatedSkills]
        },
        removeMultipleSkills: (state, action)=>{
            state.skills =  state.skills.filter(
                (item) => !action.payload.includes(item.id)
            );
        },
        clearUserState: ()=>initialState
    }
})

export const {
    addNewSocial,
    delMultipleSocial,
    removeASocial,
    handleUserchange,
    updateSkills,
    removeMultipleSkills,
    editedSkills,
    setSkill,
    addSkill,
    removeSkill,
    clearUserState
} = userSlice.actions;

  export default userSlice.reducer