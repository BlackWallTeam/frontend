import {createSlice, createSelector, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../..';

interface ISidebarSlice{
    name?: string;
    active?: boolean;
}

const initialState: ISidebarSlice = {
    name: '',
    active: false
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setName(state, payload: PayloadAction<string>) {
            state.name = payload.payload;
        },
        setActive(state, payload: PayloadAction<boolean>) {
            state.active = payload.payload;
        }
    }
})

export default sidebarSlice.reducer;

export const {setName, setActive} = sidebarSlice.actions;

export const getActive = createSelector((store: RootState) => store.sidebar.active, (a) => a)
