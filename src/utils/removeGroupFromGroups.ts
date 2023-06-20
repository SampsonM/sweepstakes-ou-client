import { Group } from "../slices/group.slice"

export const removeGroupFromGroups = (groupName: string, groups: Group[]) => {
	return groups.filter((group) => group.groupName !== groupName)
}
