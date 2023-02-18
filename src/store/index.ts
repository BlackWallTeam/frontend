import { configureStore } from "@reduxjs/toolkit";
import sidebar from './slices/sidebarSlice'

const store = configureStore({reducer: {sidebar}})

export default store;

export type RootState = ReturnType<typeof store.getState>
