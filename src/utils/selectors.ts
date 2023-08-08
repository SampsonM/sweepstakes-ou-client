import { useSelector } from "react-redux"
import { RootState } from "./store"
import { UserData } from "../slices/user.slice"
import { InitialState } from "../slices/app.slice"
import { Group } from "../slices/group.slice"

export const appStateSelector = (): InitialState => useSelector((state: RootState) => state.app)

export const userDataSelector = (): UserData => useSelector((state: RootState) => state.app.userData)

export const selectedGroupNameSelector = (): string => useSelector((state: RootState) => state.app.selectedGroupName)

export const groupSelector = (name: string): Group => useSelector((state: RootState) => {
	const group = state.app.userData.groups.find(
		({ groupName }) => groupName === name,
	)
	return group	|| { id: '', groupName: '', members: [], rounds: [], isOwner: false }
})
