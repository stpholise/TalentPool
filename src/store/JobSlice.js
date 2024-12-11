 import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
    job: {},
 }

 const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        
        updateJob: (state, action) => {
            state.job.jobs = state.job.jobs.map((job) => job.id === action.payload.id ? action.payload : job)
        },
        setJob: (state, action) => {
            state.job = action.payload
            console.log(action.payload)
            console.log(state.job)
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
 
 