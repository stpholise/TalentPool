 import { createSlice } from '@reduxjs/toolkit';
interface Category {
  __CLASS__?: string;
  tag: string;
  label: string;
}

interface Company {
  __CLASS__?: string;
  display_name: string;
}

interface Location{
  __CLASS__?: string;
  display_name: string;
  area: string[];
}

interface Job {
  __CLASS__?: string;
  title: string;
  company: Company;
  created?: string;
  redirect_url: string;
  id: string;
  location: Location;
  description: string;
  salary_min: number;
  salary_max: number;
  salary_is_predicted?: string;
  contract_time?: string;
  contract_type?: string;
  category?: Category;
  latitude?: number;
  longitude?: number;
}

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

interface JobState {
  job: Partial<Job>;
  created: string;
  location: Partial<Location>;
  description: string;
  redirect_url: string;
  title: string;
  category: Partial<Category>;
  company: string | Company;
  contract_type: string;
  salary_min: string | number;
  salary_max: string | number;
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
            console.log('url', action.payload.redirect_url)
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
 
 