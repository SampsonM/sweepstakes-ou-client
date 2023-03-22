import { useSelector } from "react-redux"
import { RootState } from "./store"

export const appStateSelector = () => useSelector((state: RootState) => state.app)
