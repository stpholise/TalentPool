import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSlice';
import appSlice from './AppSlice';
import jobSlice from './JobSlice';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage   from 'redux-persist/lib/storage/session';


const persistConfig = {
    key: 'Job_portfolio',
    storage ,
}

const rootReducer = combineReducers({
    users: userSlice,
    app: appSlice,
    jobSlice: jobSlice,
})

export const store = configureStore({
 reducer: persistReducer(persistConfig, rootReducer),
 middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
        serializableCheck: {
            ignoredActions:['persist/PERSIST', 'persist/REHYDRATE']
        }
    })
 }
})

export const persistor = persistStore( store )

export type RootState = ReturnType<typeof store.getState>;