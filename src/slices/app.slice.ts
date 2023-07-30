/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserData } from './user.slice'
import { Group } from './group.slice'

// ------------------------------------
// Constants
// ------------------------------------

type AuthData = {
  loggedIn: boolean;
  checked: boolean;
  userData: UserData;
}

type InitialState = {
  checked: boolean;
  loggedIn: boolean;
  userData: UserData;
  selectedGroupName: string;
}

export const initialState: InitialState = {
  checked: false,
  loggedIn: false,
  userData: {
    user: {
      id: '',
      picture: '',
      fullName: '',
    },
    groups: [],
  },
  selectedGroupName: '',
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    authenticate: (state, { payload }: PayloadAction<AuthData>) => {
      state.loggedIn = payload.loggedIn
      state.checked = payload.checked
      state.userData = payload.userData
    },
    logout: (state) => {
      state.loggedIn = false
      state.userData = initialState.userData
    },
    setGroups: (state, { payload }: PayloadAction<Group[]>) => {
      state.userData.groups = payload
    },
    setSelectedGroup(state, { payload }) { 
      state.selectedGroupName = payload
    }
  },
})

export const { actions } = appSlice
export const { authenticate, logout, setGroups, setSelectedGroup } = appSlice.actions

export default appSlice.reducer
