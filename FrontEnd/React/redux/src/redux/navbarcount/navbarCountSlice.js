import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value : 0
}

const navbarCountSlice = createSlice({
    name : 'navbarCount',
    initialState,
    reducers : {
        navincrement : (state) => {
            state.value += 1
        },
        navdecrement : (state) =>{
            state.value -= 1
        },
        navmultiply : (state) => {
            state.value *= 2
        },
    }
})

export const { navincrement, navdecrement, navmultiply } = navbarCountSlice.actions

export default navbarCountSlice.reducer