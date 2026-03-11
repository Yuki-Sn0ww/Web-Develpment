import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import countReducer from './navbarcount/navbarCountSlice'

export const store = configureStore({
    reducer: {
        counter : counterReducer,
        navbarCount : countReducer
    },
})