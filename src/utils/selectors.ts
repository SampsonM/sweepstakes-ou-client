import { useSelector } from "react-redux"
import { RootState } from "./store"
import { UserData } from "../slices/user.slice"
import { InitialState } from "../slices/app.slice"

export const appStateSelector = (): InitialState => useSelector((state: RootState) => state.app)

export const userDataSelector = (): UserData => useSelector((state: RootState) => state.app.userData)

export const selectedGroupNameSelector = (): string => useSelector((state: RootState) => state.app.selectedGroupName)
