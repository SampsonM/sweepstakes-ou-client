import { configureStore, combineReducers } from '@reduxjs/toolkit'
import appReducer from '../slices/app.slice'
import { userApi } from '../slices/user.slice'
import { groupApi } from '../slices/group.slice'
import { eventsApi } from '../slices/events.slice'
import { roundsApi } from '../slices/rounds.slice'

const rootReducer = combineReducers({
  app: appReducer,
  [groupApi.reducerPath]: groupApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [roundsApi.reducerPath]: roundsApi.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(userApi.middleware, groupApi.middleware, eventsApi.middleware, roundsApi.middleware)

    return __DEV__ ? defaultMiddleware : defaultMiddleware
  },
})

export type RootState = ReturnType<typeof rootReducer>

export default store
