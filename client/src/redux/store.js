import {configureStore} from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
const store = configureStore({
    reducer: {
        'auth':userSlice
    }
})

export default store;