import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:{
        name: 'Genesis',
        occupation: 'UI/UX Designer',
        email: 'genesis@gmail.com',
        phone: '0801 - 234 - 5678',
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
            const { index } = action.payload;
            state.social = state.social.filter((_, i) => i !== index)
        },
        setNewSocial: (state, action) => {
            state.social = action.payload;
        },    
        handleUserchange: (state, action) => {
            state.user = action.payload
        },
        addSkill: (state, action) => {
            const { title, proficiency, id } = action.payload;
            const updatedSkills = {  skillProficiency:proficiency, skillTitle:title, id:id  }   
            state.skills = [...state.skills, updatedSkills]
        },
        removeSkill: (state, action) => {
            const updatedSkills = state.skills.filter(({id})=> id !== action.payload)
            state.skills = [...updatedSkills]
        },
        clearUserState: ()=>initialState
    }
})

export const {
    addNewSocial,
    handleUserchange,
    setSkill,
    addSkill,
    removeSkill,
    clearUserState
  } = userSlice.actions;

  export default userSlice.reducer