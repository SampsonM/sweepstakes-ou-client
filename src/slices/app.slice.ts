/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  checked: false,
  loggedIn: false,
  me: {},
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.loggedIn = payload.loggedIn
      state.checked = payload.checked
      state.me = payload.user
    },
    saveMe: (state, { payload }) => {
      state.me = payload.me
    },
    logout: (state) => {
      state.loggedIn = false
      state.me = {}
    },
  },
})

export const { actions } = appSlice
export const { authenticate, saveMe, logout } = appSlice.actions

export default appSlice.reducer
