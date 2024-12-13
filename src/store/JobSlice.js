 import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
    job: {  },
    created: '', 
    location: {}, 
    description: '', 
    redirect_url: '',
    title: '',
    category: {},
    company:'', 
    contract_type: '',
    salary_min: '',
    salary_max: '',
 }

 const jobSlice = createSlice({
    name: 'jobSlice',
    initialState,
    reducers: {
        
        updateJob: (state, action) => {
            state.job.jobs = state.job.jobs.map((job) => job.id === action.payload.id ? action.payload : job)
        },
        setJob: (state, action) => {
            state.job = action.payload
            state.created = action.payload.created
            state.location = action.payload.location
            state.description = action.payload.description
            state.redirect_url = action.payload.redirect_url
            state.title = action.payload.title
            state.category = action.payload.category
            state.company = action.payload.company
            state.contract_type = action.payload.contract_type
            state.salary_min = action.payload.salary_min
            state.salary_max = action.payload.salary_max
        },
        clearJobState: () => initialState
    }
 })

 const { actions, reducer } = jobSlice
 export const { 
    addJobs, 
    updateJob, 
    setJob, 
    clearJobState } = actions
 export default reducer
 
 